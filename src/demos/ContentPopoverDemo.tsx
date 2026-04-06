import { ContentPopover, PopoverProvider } from "../components/ContentPopover";

const features = [
  "Portal — renders at body level, never cut off by overflow",
  "Dynamic positioning — stays within the viewport",
  "Closes automatically when another opens (via Context)",
  "Closes on click outside",
  "Closes on ESC key",
  "Closes on click of any link/button inside",
  "Repositions on scroll and resize",
  "Fade + Slide enter animation",
];

export function ContentPopoverDemo() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Content Popover
        </h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Popover with dynamic positioning, body portal, and automatic closing
          between instances. A rewrite of the{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-xs">
            ContentPopover.js
          </code>{" "}
          originally built for BPI Net Empresas.
        </p>
      </div>

      {/* Demo card */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo — open multiple to see them close each other
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <PopoverProvider>
            <div className="flex gap-4 flex-wrap">
              <ContentPopover trigger="Account">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  My Account
                </h3>
                <ul className="space-y-0.5">
                  {["Profile", "Settings", "Security", "Logout"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="block px-1 py-2 text-sm text-gray-600 border-b border-gray-100 last:border-0 hover:text-gray-900 no-underline transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </ContentPopover>

              <ContentPopover trigger="Products">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Products
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Explore our financial products and services available for
                  businesses and individuals.
                </p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg border-0 cursor-pointer hover:bg-blue-700 transition-colors">
                  View all
                </button>
              </ContentPopover>

              <ContentPopover trigger="Support">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Support
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Need help? Our team is available 24/7.
                </p>
              </ContentPopover>
            </div>
          </PopoverProvider>
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
