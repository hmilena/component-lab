import { DropdownSubmenu, MenuItem } from "../components/DropdownSubmenu";

const MENU_SIMPLES: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", href: "#" },
  { id: "reports", label: "Reports", href: "#" },
  { id: "settings", label: "Settings", href: "#" },
];

const MENU_COM_SUBNIVEIS: MenuItem[] = [
  {
    id: "account",
    label: "Account",
    children: [
      { id: "profile", label: "Profile", href: "#" },
      { id: "security", label: "Security", href: "#" },
      { id: "notifications", label: "Notifications", href: "#" },
    ],
  },
  {
    id: "products",
    label: "Products",
    children: [
      { id: "deposits", label: "Deposits", href: "#" },
      { id: "loans", label: "Loans", href: "#" },
      { id: "insurance", label: "Insurance", href: "#" },
      { id: "investments", label: "Investments", href: "#" },
    ],
  },
  { id: "support", label: "Support", href: "#" },
  { id: "logout", label: "Logout", href: "#" },
];

const features = [
  "Two levels of navigation",
  "Only one submenu open at a time",
  "Active state propagates from children to trigger",
  "Closes on click outside",
  "Closes on ESC key",
  "Closes on leaf item click",
  "Fade + Slide enter animation",
];

export function DropdownSubmenuDemo() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Dropdown Submenu
        </h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Dropdown with two levels of navigation, active state propagation, and
          ESC or outside click closing. A rewrite of the{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono text-xs">
            DropdownSubmenu.js
          </code>{" "}
          originally built for BPI Net Empresas.
        </p>
      </div>

      {/* Demo card */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Demo
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
          <div>
            <p className="text-xs text-gray-400 mb-3">Single level</p>
            <DropdownSubmenu label="Menu" items={MENU_SIMPLES} />
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-3">With submenus</p>
            <div className="flex gap-3">
              <DropdownSubmenu
                label="My Bank"
                items={MENU_COM_SUBNIVEIS}
                defaultActiveId="loans"
              />
              <DropdownSubmenu label="Other menu" items={MENU_SIMPLES} />
            </div>
            <p className="mt-4 text-xs text-gray-400">
              "Loans" is marked as active — the state propagates up to the
              trigger. Open both menus to see them close each other.
            </p>
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
