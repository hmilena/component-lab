import { useRef, useState, useCallback, useEffect } from "react";
import "./InputPin.css";

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
    // If field has a value, select it so next key replaces it
    if (values[index]) inputRefs.current[index]?.select();
  }, [values]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const key = e.key;
      const isEmpty = !values[index];

      if (key === "Backspace") {
        if (!isEmpty) {
          // Clear current field
          setValues((prev) => {
            const next = [...prev];
            next[index] = "";
            return next;
          });
          setMasked((prev) => {
            const next = [...prev];
            next[index] = false;
            return next;
          });
        } else if (index > 0) {
          // Field already empty — go back and clear previous
          setValues((prev) => {
            const next = [...prev];
            next[index - 1] = "";
            return next;
          });
          setMasked((prev) => {
            const next = [...prev];
            next[index - 1] = false;
            return next;
          });
          focusAt(index - 1);
        }
        e.preventDefault();
      }

      if (key === "Delete") {
        if (!isEmpty) {
          setValues((prev) => {
            const next = [...prev];
            next[index] = "";
            return next;
          });
          setMasked((prev) => {
            const next = [...prev];
            next[index] = false;
            return next;
          });
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
      // Only allow digits
      const digit = e.target.value.replace(/\D/g, "").slice(-1);
      if (!digit) return;

      const next = [...values];
      next[index] = digit;
      setValues(next);

      // Mask after short delay — same 100ms as the original
      setTimeout(() => {
        setMasked((prev) => {
          const m = [...prev];
          m[index] = true;
          return m;
        });

        const joined = next.join("");
        onChange?.(joined);

        if (next.every(Boolean)) {
          inputRefs.current[index]?.blur();
          onComplete?.(joined);
          // Reset after completion
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
    <div className={`input-pin ${disabled ? "input-pin--disabled" : ""}`}>
      {values.map((val, i) => (
        <div key={i} className="input-pin__field">
          <input
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={masked[i] ? "•" : val}
            disabled={disabled}
            data-index={i}
            className={`input-pin__input ${val ? "has-value" : ""}`}
            onClick={() => handleClick(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onChange={(e) => handleChange(e, i)}
            autoComplete="off"
            aria-label={`Dígito ${i + 1} de ${length}`}
          />
        </div>
      ))}
    </div>
  );
}
