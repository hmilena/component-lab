import { useState } from "react";
import { DrawerDemo } from "./demos/DrawerDemo";
import { CardSliderDemo } from "./demos/CardSliderDemo";
import { InputPinDemo } from "./demos/InputPinDemo";
import { ContentPopoverDemo } from "./demos/ContentPopoverDemo";
import { DropdownSubmenuDemo } from "./demos/DropdownSubmenuDemo";
import { GalleryDemo } from "./demos/GalleryDemo";
import { PostInteractionsDemo } from "./demos/PostInteractionsDemo";
import { SkeletonDemo } from "./demos/SkeletonDemo";
import { ReadingProgressBarDemo } from "./demos/ReadingProgressBarDemo";
import "./App.css";

const COMPONENTS = [
  { id: "drawer", label: "Drawer" },
  { id: "cardslider", label: "Card Slider" },
  { id: "inputpin", label: "Input Pin" },
  { id: "popover", label: "Popover" },
  { id: "dropdown", label: "Dropdown Submenu" },
  { id: "gallery", label: "Gallery & Lightbox" },
  { id: "interactions", label: "Post Interactions" },
  { id: "skeleton", label: "Skeleton" },
  { id: "progress", label: "Reading Progress" },
];

export default function App() {
  const [active, setActive] = useState("drawer");

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar__logo">Mia Components Lab</div>
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
        {active === "cardslider" && <CardSliderDemo />}
        {active === "inputpin" && <InputPinDemo />}
        {active === "popover" && <ContentPopoverDemo />}
        {active === "dropdown" && <DropdownSubmenuDemo />}
        {active === "gallery" && <GalleryDemo />}
        {active === "interactions" && <PostInteractionsDemo />}
        {active === "skeleton" && <SkeletonDemo />}
        {active === "progress" && <ReadingProgressBarDemo />}
      </main>
    </div>
  );
}
