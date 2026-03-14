# Drawer Component — React + TypeScript

A responsive drawer component that works as a **side panel on desktop** and a **swipeable bottom sheet on mobile** — with smooth animations, scroll lock, and full keyboard support.

Built as a React/TypeScript rewrite of a production Vanilla JS component originally developed for **BPI Net Empresas** (Banco BPI's enterprise banking portal).

## Demo

> resize the window below 750px to see the bottom sheet behavior

## Features

- Responsive: side drawer (≥750px) → bottom sheet (<750px)
- Swipe-to-dismiss on touch devices with snap threshold
- ESC key and overlay click to close
- Body scroll lock while open
- CSS transitions with proper enter/exit animation (600ms)
- Clean `isOpen` / `onClose` API — no imperative refs needed

## Usage

```tsx
import { Drawer } from "./components/Drawer";

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>Any content here</p>
      </Drawer>
    </>
  );
}
```

## Architecture

The component is split into focused hooks, each mapping to a specific responsibility from the original class:

| Hook | Replaces | Responsibility |
|---|---|---|
| `useDrawerPosition` | `ResizeObserver` in constructor | Tracks viewport width, returns `"to-right"` or `"to-bottom"` |
| `useDrawerInitialHeight` | `variables.initialHeight` in `init()` | Measures drawer height on mount |
| `useBodyScrollLock` | `document.body.classList.add('lock-body')` | Syncs scroll lock with open state |
| `useDrawerTouch` | `onTouchStart/Move/End` | Handles swipe gesture and snap logic |

## From Vanilla JS to React — key decisions

**State instead of class mutation**

The original used a `MutationObserver` to watch for the `'open'` class being added to the drawer element. In React, `isOpen` is a prop — no observer needed. React re-renders when props change, so the DOM always reflects the current state automatically.

**`useRef` as `this.settings`**

Touch gesture values (`startY`, `startHeight`) need to persist between events without triggering re-renders. `useRef` is the direct equivalent of `this.settings` in the class version — a mutable container that survives renders.

**`useEffect` cleanup as `destroy()`**

Every effect that adds a listener returns a cleanup function. This replaces the manual `_removeEventListeners()` / `destroy()` pattern and guarantees no memory leaks when the component unmounts.

**CSS handles animation, JS handles state**

In the original, `onCloseDrawerWithAnimation()` manually set `style.transform` and used `setTimeout` to clean up classes. Here, CSS transitions handle the animation — JS only toggles the `isClosing` boolean. The `setTimeout` duration (600ms) matches the CSS `transition-duration`.

## Tech

- React 18
- TypeScript
- Vite
- CSS (no external animation library)

## Run locally

```bash
npm install
npm run dev
```
