import { useState } from "react";
import { DrawerDemo } from "./demos/DrawerDemo";
import "./App.css";

const COMPONENTS = [
  { id: "drawer", label: "Drawer" },
  // Adiciona aqui quando criar novos componentes:
  // { id: "cardslider", label: "Card Slider" },
  // { id: "inputpin", label: "Input Pin" },
  // { id: "popover", label: "Popover" },
];

export default function App() {
  const [active, setActive] = useState("drawer");

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar__logo">React Components</div>
        <nav className="sidebar__nav">
          {COMPONENTS.map((c) => (
            <button
              key={c.id}
              className={`sidebar__item ${active === c.id ? "active" : ""}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        {active === "drawer" && <DrawerDemo />}
      </main>
    </div>
  );
}
