import { useRef, useState, useCallback, useEffect } from "react";

interface InputPinProps {
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}

export function InputPin({
  length = 4,
  disabled = false,
  autoFocus = true,
  onChange,
  onComplete,
}: InputPinProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [masked, setMasked] = useState<boolean[]>(Array(length).fill(false));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const lastKeyRef = useRef<string | null>(null);
  const clickedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (autoFocus && !disabled) inputRefs.current[0]?.focus();
  }, [autoFocus, disabled]);

  const focusAt = useCallback((index: number) => {
    const el = inputRefs.current[index];
    if (!el) return;
    el.focus();
    el.select();
  }, []);

  const handleClick = useCallback((index: number) => {
    clickedIndexRef.current = index;
    if (values[index]) inputRefs.current[index]?.select();
  }, [values]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const key = e.key;
      const isEmpty = !values[index];

      if (key === "Backspace") {
        if (!isEmpty) {
          setValues((prev) => { const next = [...prev]; next[index] = ""; return next; });
          setMasked((prev) => { const next = [...prev]; next[index] = false; return next; });
        } else if (index > 0) {
          setValues((prev) => { const next = [...prev]; next[index - 1] = ""; return next; });
          setMasked((prev) => { const next = [...prev]; next[index - 1] = false; return next; });
          focusAt(index - 1);
        }
        e.preventDefault();
      }

      if (key === "Delete") {
        if (!isEmpty) {
          setValues((prev) => { const next = [...prev]; next[index] = ""; return next; });
          setMasked((prev) => { const next = [...prev]; next[index] = false; return next; });
        }
        e.preventDefault();
      }

      if (key === "ArrowLeft" && index > 0) focusAt(index - 1);
      if (key === "ArrowRight" && index < length - 1) focusAt(index + 1);

      lastKeyRef.current = key;
    },
    [values, length, focusAt]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const digit = e.target.value.replace(/\D/g, "").slice(-1);
      if (!digit) return;

      const next = [...values];
      next[index] = digit;
      setValues(next);

      setTimeout(() => {
        setMasked((prev) => { const m = [...prev]; m[index] = true; return m; });

        const joined = next.join("");
        onChange?.(joined);

        if (next.every(Boolean)) {
          inputRefs.current[index]?.blur();
          onComplete?.(joined);
          setTimeout(() => {
            setValues(Array(length).fill(""));
            setMasked(Array(length).fill(false));
            focusAt(0);
          }, 300);
        } else if (index < length - 1) {
          focusAt(index + 1);
        }
      }, 100);
    },
    [values, length, onChange, onComplete, focusAt]
  );

  return (
    <div className={`flex gap-3 ${disabled ? "pointer-events-none" : ""}`}>
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={masked[i] ? "•" : val}
          disabled={disabled}
          data-index={i}
          onClick={() => handleClick(i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onChange={(e) => handleChange(e, i)}
          autoComplete="off"
          aria-label={`Dígito ${i + 1} de ${length}`}
          className={[
            "w-14 h-16 text-center text-2xl font-semibold rounded-xl border-2 outline-none",
            "bg-white caret-transparent transition-all duration-150",
            "focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(0,82,204,0.15)]",
            "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
            val ? "border-gray-400 text-gray-800" : "border-gray-200 text-gray-400",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
