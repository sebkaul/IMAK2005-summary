# IMAK2005 — JSX Overview

Interactive study summaries for the course **IMAK2005 · Industriell mikrobiologi** (industrial microbiology / biotechnology). Each course topic is written as a self-contained React component that renders a styled, readable overview — definitions, key concepts, equations, tables and worked examples — so the whole syllabus can be browsed in one place.

> Content is written in Norwegian; the app shell is in English.

## What's inside

The app is a thin viewer: it auto-discovers every `.jsx` file in `src/` and lists them on an index page. Clicking a topic loads it lazily. The actual material lives in the topic files:

| File | Topic |
|------|-------|
| `A1_Introduksjon` | Introduction to industrial biotechnology — cells as factories, history, scope |
| `A2_Mikrobiell_vekstkinetikk` | Microbial growth kinetics |
| `A3_Industrielle_biologiske_medier` | Industrial biological media |
| `A4_Materialbalanse_og_stokiometri` | Material balance and stoichiometry |
| `A5_A8_Roring_lufttilforsel_og_reaktordesign` | Stirring, aeration and reactor design |
| `A6_A7_A9_Inokulum_nedstromsprosesser_og_biokatalyse` | Inoculum, downstream processing and biocatalysis |
| `A10_Industrielle_bioprosesser` | Industrial bioprocesses |
| `B1_B3_Massebalanser` | Mass balances |
| `B4_B6_Energibalanser` | Energy balances |

The `A…` files cover the conceptual/theory topics; the `B…` files cover the calculation-heavy balance topics. Each page is styled inline (cards, hero header, tables) so it stands on its own.

## How it works

- `index.html` mounts a single React root.
- `src/main.jsx` is the whole app. It uses Vite's `import.meta.glob('./**/*.jsx')` to find every topic file, builds the index, and renders the selected one. Navigation is hash-based (`#A2_Mikrobiell_vekstkinetikk`), so each topic has a shareable URL and the back button works.
- `src/index.css` styles the viewer shell; each topic file ships its own inline styles.

There is no router and no per-topic registration — **dropping a new `.jsx` file with a default export into `src/` makes it appear automatically** on the next reload.

## Tech stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/) (build tool + dev server with HMR)
- [lucide-react](https://lucide.dev/) for icons and [recharts](https://recharts.org/) for charts (used by individual topic pages)

## Requirements

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite 8)
- npm (ships with Node)

## Running it

```bash
npm install      # install dependencies
npm run dev      # start the dev server (HMR) → usually http://localhost:5173
```

### Other scripts

```bash
npm run build    # production build → dist/
npm run preview  # serve the built bundle locally
npm run lint     # run ESLint
```

## Adding a new topic

1. Create a `.jsx` file in `src/` (e.g. `A11_Mitt_tema.jsx`).
2. Give it a default-exported React component.
3. Reload — it shows up on the index automatically. No routing config needed.
