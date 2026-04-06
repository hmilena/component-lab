import { CardSlider } from "../components/CardSlider";

const CARDS = [
  { id: 1, title: "Card 1", color: "#e8f4f8" },
  { id: 2, title: "Card 2", color: "#f8f0e8" },
  { id: 3, title: "Card 3", color: "#f0e8f8" },
  { id: 4, title: "Card 4", color: "#e8f8f0" },
  { id: 5, title: "Card 5", color: "#f8e8e8" },
  { id: 6, title: "Card 6", color: "#f8f8e8" },
  { id: 7, title: "Card 7", color: "#e8e8f8" },
  { id: 8, title: "Card 8", color: "#f0f8e8" },
];

const features = [
  "Mouse drag-to-scroll",
  "Button navigation with animated scroll",
  "Disabled buttons at boundaries",
  "Fade borders to indicate overflow",
  "4 cards on desktop / 3 on tablet / 2 on mobile",
  "ResizeObserver — adapts without reload",
];

export function CardSliderDemo() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Card Slider</h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Horizontal slider with drag-to-scroll, animated navigation buttons, and responsive card
          counts. A rewrite of the{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-xs">
            CardSlider.js
          </code>{" "}
          originally built for BPI Net Empresas.
        </p>
      </div>

      {/* Demo card */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <CardSlider>
            {CARDS.map((card) => (
              <div
                key={card.id}
                className="h-40 rounded-xl flex items-center justify-center font-semibold text-sm text-gray-500 border border-black/5"
                style={{ background: card.color }}
              >
                {card.title}
              </div>
            ))}
          </CardSlider>
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
                <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
                  <path fillRule="evenodd" d="M8.354 2.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L3.5 6.793l4.146-4.147a.5.5 0 01.708 0z" clipRule="evenodd" />
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
