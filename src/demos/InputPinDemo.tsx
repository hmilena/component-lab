import { useState } from "react";
import { InputPin } from "../components/InputPin";

type Status = "idle" | "loading" | "success" | "error";

const features = [
  "Auto-advance on type",
  "Backspace to go back — clears and returns to previous field",
  "Navigation with ← → keys",
  "Mask pattern • after 100ms",
  "onComplete callback when all fields are filled",
  "Disabled state during validation",
  "Auto-reset after completion",
  "Accessible — aria-label on each field",
];

export function InputPinDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleComplete = (value: string) => {
    setStatus("loading");
    setMessage("");

    setTimeout(() => {
      if (value === "1234") {
        setStatus("success");
        setMessage("Correct PIN!");
      } else {
        setStatus("error");
        setMessage(`Incorrect PIN "${value}". Try 1234.`);
      }
      setTimeout(() => setStatus("idle"), 2000);
    }, 800);
  };

  return (
    <div className="mx-auto space-y-10">
      {/* Header */}
      <div>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          PIN input with 4 independent fields, digit masking, keyboard
          navigation, and completion validation. A rewrite of the{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-xs">
            InputPin.js
          </code>{" "}
          originally built for BPI Net Empresas.
        </p>
        <p className="mt-2 text-sm font-semibold text-gray-700">
          Correct PIN:{" "}
          <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono">
            1234
          </code>
        </p>
      </div>

      {/* Demo card */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center gap-5">
          <InputPin
            length={4}
            onComplete={handleComplete}
            disabled={status === "loading" || status === "success"}
          />

          <div className="h-6 flex items-center justify-center">
            {status === "loading" && (
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin" />
                Validating…
              </span>
            )}
            {status === "success" && (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {message}
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-1.5 text-sm text-red-500">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 002 0V7zm-1 6a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {message}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Features
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-xs"
            >
              <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.354 2.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L3.5 6.793l4.146-4.147a.5.5 0 01.708 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
