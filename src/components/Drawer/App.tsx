import { useState } from "react";
import { Drawer } from "./Drawer";

/**
 * App.tsx — Demo
 *
 * Notice how simple the consumer is compared to the vanilla version.
 *
 * Vanilla usage required:
 *   const drawer = new Drawer(element)
 *   drawer.init()
 *   // then manually trigger: drawer.dom.drawer.classList.add('open')
 *
 * React usage:
 *   const [isOpen, setIsOpen] = useState(false)
 *   <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>...</Drawer>
 *
 * All the complexity lives inside the component. The consumer just controls state.
 */
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Drawer Component</h1>
      <p>
        Resize the window below 750px to see it switch from side drawer to
        bottom sheet.
      </p>

      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
          background: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Open Drawer
      </button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Drawer Content</h2>
        <p>This is the drawer content. Try swiping down on mobile.</p>
        <p>Press ESC or click the overlay to close.</p>
      </Drawer>
    </div>
  );
}
