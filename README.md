# React Components

Production-grade UI components built with React 18 and TypeScript — each one a rewrite of a Vanilla JS component originally built for enterprise clients in Portugal (Banco BPI, Ericsson, Fidelidade).

The goal was not to recreate the DOM manipulation logic, but to translate the *intent* of each component into idiomatic React: state instead of class mutation, hooks instead of prototype methods, declarative rendering instead of imperative DOM queries.

**[Live demo →](https://hmilena.github.io/ReactComponents)** <!-- update with your actual deploy URL -->

---

## Components

### Drawer
Responsive panel that switches between a side drawer on desktop and a swipeable bottom sheet on mobile.

- `ResizeObserver` drives the layout switch — no media query breakpoints
- Touch gesture handling with snap threshold: only dismisses if the user swipes past ⅔ of the height
- Entry animation uses `requestAnimationFrame` to separate mount from the open class, so the CSS transition always fires correctly
- Body scroll lock synced with component state via `useEffect`
- Closes on ESC, overlay click, or swipe

**Hooks:** `useDrawerPosition` · `useDrawerInitialHeight` · `useBodyScrollLock` · `useDrawerTouch`

---

### Card Slider
Horizontal card slider with drag-to-scroll and animated arrow navigation.

- Drag state (`startX`, `scrollLeft`) stored in `useRef` — persists between events without triggering re-renders
- Arrow scroll uses `setInterval` with configurable `speed`, `distance` and `step` — same animation model as the original
- Arrow disabled state derived from scroll position on each scroll event
- Responsive item count (4 / 3 / 2) driven by `ResizeObserver` on the body

**Hooks:** `useCardSliderDrag` · `useCardSliderScroll` · `useCardSliderItems`

---

### Input Pin
4-digit PIN input with per-field focus management, digit masking, and keyboard navigation.

- Each field is an independent controlled input — value array stored in state
- Digits are masked with `•` after 100ms (same timing as original)
- Backspace clears the current field if filled, or moves focus to the previous field if empty
- Arrow keys navigate between fields
- `onComplete` fires when all fields are filled — supports async validation flows

---

### Content Popover
Floating content panel anchored to a trigger button, rendered via React portal.

- Uses `createPortal` to render at body level — never clipped by `overflow: hidden` ancestors
- Position calculated from `getBoundingClientRect` on each open, scroll, and resize
- Width adapts to available viewport space on smaller screens, with the arrow always pointing to the trigger center
- Multiple instances share a `PopoverContext` — opening one closes all others (replaces the static `instances` array from the original)
- Closes on ESC, outside click, or interaction with any link/button inside

**Hooks:** `usePopoverPosition` · `PopoverContext`

---

### Dropdown Submenu
Two-level navigation dropdown with active state propagation.

- Active state derived from `defaultActiveId` prop and propagated up the tree declaratively — no DOM traversal
- Only one submenu open at a time — controlled by a single `openSubmenuId` state
- Submenu opens to the right of the parent item
- Closes on ESC or outside click

---

## Architecture decisions

**State as source of truth** — the original components used `MutationObserver` to react to class changes on DOM elements. Here, props and state drive everything. React re-renders replace the observer pattern.

**`useRef` for mutable values that don't affect rendering** — drag coordinates, touch positions, timer IDs. The direct equivalent of `this.variables` and `this.settings` in the class-based originals.

**`useEffect` cleanup as `destroy()`** — every effect that registers a listener returns a cleanup function. No manual `removeEventListener` calls scattered across the codebase.

**Hooks as a decomposition tool** — each hook maps to a single responsibility from the original class. The component file stays readable; the logic is testable in isolation.

---

## Stack

React 18 · TypeScript · Vite · CSS (no animation libraries)

## Run locally

```bash
npm install
npm run dev
```
