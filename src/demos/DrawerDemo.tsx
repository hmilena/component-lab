import { useState } from "react";
import { Drawer } from "./../components/Drawer/Drawer";

const features = [
  "Side panel on desktop (≥ 750px)",
  "Bottom sheet on mobile (< 750px)",
  "Swipe to dismiss on touch",
  "Snap threshold — only closes if dragged more than ⅓",
  "ESC to close",
  "Overlay click to close",
  "Body scroll lock while open",
  "Enter and exit animations (600ms)",
  "ResizeObserver — switches mode without reload",
];

export function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto space-y-10">
      {/* Header */}
      <div>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Side panel on desktop, bottom sheet on mobile. A rewrite of the{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-xs">
            Drawer.js
          </code>{" "}
          originally built for BPI Net Empresas. Resize the window below{" "}
          <strong className="text-gray-700">750px</strong> to see the behavior
          change.
        </p>
      </div>

      {/* Demo card */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer border-0"
            onClick={() => setIsOpen(true)}
          >
            Open Drawer
          </button>
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

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Hello 👋</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">
          This drawer opens as a side panel on desktop and as a bottom sheet on
          mobile — with swipe to dismiss.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Try closing it in three ways: the ✕ button, clicking the overlay, or
          pressing ESC.
        </p>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border-0"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </Drawer>
    </div>
  );
}
