import { useState, useEffect } from "react";
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

// ── Icons ──────────────────────────────────────────────────────────────────
const IconDrawer = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);
const IconCardSlider = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <path d="M18 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
  </svg>
);
const IconInputPin = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);
const IconPopover = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconDropdown = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const IconGallery = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const IconInteractions = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconSkeleton = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="4" rx="2" />
    <rect x="3" y="11" width="10" height="4" rx="2" />
    <rect x="3" y="18" width="14" height="3" rx="1.5" />
  </svg>
);
const IconProgress = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const IconChevronLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconLogo = () => (
  <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    label: "Components",
    items: [
      { id: "drawer", label: "Drawer", Icon: IconDrawer },
      { id: "cardslider", label: "Card Slider", Icon: IconCardSlider },
      { id: "inputpin", label: "Input Pin", Icon: IconInputPin },
      { id: "popover", label: "Popover", Icon: IconPopover },
      { id: "dropdown", label: "Dropdown Submenu", Icon: IconDropdown },
    ],
  },
  {
    label: "Media & Feedback",
    items: [
      { id: "gallery", label: "Gallery & Lightbox", Icon: IconGallery },
      {
        id: "interactions",
        label: "Post Interactions",
        Icon: IconInteractions,
      },
      { id: "skeleton", label: "Skeleton", Icon: IconSkeleton },
      { id: "progress", label: "Reading Progress", Icon: IconProgress },
    ],
  },
];

const CONTENT_LABELS: Record<string, { title: string; subtitle: string }> = {
  drawer: {
    title: "Drawer",
    subtitle: "Animated side panel with touch support",
  },
  cardslider: {
    title: "Card Slider",
    subtitle: "Draggable horizontal card carousel",
  },
  inputpin: { title: "Input Pin", subtitle: "Segmented PIN / OTP input field" },
  popover: { title: "Popover", subtitle: "Positioned floating content panel" },
  dropdown: {
    title: "Dropdown Submenu",
    subtitle: "Nested menu with keyboard navigation",
  },
  gallery: {
    title: "Gallery & Lightbox",
    subtitle: "Image grid with fullscreen lightbox",
  },
  interactions: {
    title: "Post Interactions",
    subtitle: "Likes, rating and reaction controls",
  },
  skeleton: {
    title: "Skeleton",
    subtitle: "Placeholder loading state animations",
  },
  progress: {
    title: "Reading Progress",
    subtitle: "Scroll-linked progress indicator bar",
  },
};

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("drawer");
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { title, subtitle } = CONTENT_LABELS[active];

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
        {/* Header */}
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <div className="sidebar__logo-icon">
              <IconLogo />
            </div>
            <span className="sidebar__logo-text">Components Lab</span>
          </div>
          <button
            className="sidebar__toggle"
            onClick={() => setCollapsed(true)}
            title="Collapse sidebar"
          >
            <IconChevronLeft />
          </button>
        </div>

        {/* Expand button (collapsed state) */}
        <button
          className="sidebar__expand"
          onClick={() => setCollapsed(false)}
          title="Expand sidebar"
        >
          <IconChevronRight />
        </button>

        {/* Nav */}
        <nav className="sidebar__nav">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="sidebar__section-label">{section.label}</div>
              {section.items.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  className={`sidebar__item${active === id ? " active" : ""}`}
                  onClick={() => setActive(id)}
                  data-label={label}
                >
                  <span className="sidebar__item-icon">
                    <Icon />
                  </span>
                  <span className="sidebar__item-label">{label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="main__header">
          <h1 className=" text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="main__subtitle">{subtitle}</p>
        </div>
        <div className="main__content">
          {active === "drawer" && <DrawerDemo />}
          {active === "cardslider" && <CardSliderDemo />}
          {active === "inputpin" && <InputPinDemo />}
          {active === "popover" && <ContentPopoverDemo />}
          {active === "dropdown" && <DropdownSubmenuDemo />}
          {active === "gallery" && <GalleryDemo />}
          {active === "interactions" && <PostInteractionsDemo />}
          {active === "skeleton" && <SkeletonDemo />}
          {active === "progress" && <ReadingProgressBarDemo />}
        </div>
      </main>
    </div>
  );
}
