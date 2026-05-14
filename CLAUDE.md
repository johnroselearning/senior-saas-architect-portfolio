# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page React portfolio site ("Senior SaaS Architect Portfolio") built for Google AI Studio. Static marketing page — no backend logic, despite the `@google/genai` and `express` dependencies (currently unused in source).

## Commands

- `npm run dev` — Vite dev server on `0.0.0.0:3000`.
- `npm run build` — Production build via Vite.
- `npm run preview` — Serve the built output.
- `npm run lint` — Type-check only (`tsc --noEmit`). There is no ESLint config; this is the only lint gate.
- `npm run clean` — Removes `dist/` and `server.js`.

No test framework is configured.

## Architecture

- **Entry:** `index.html` → `src/main.tsx` → `src/App.tsx`. `App.tsx` composes the page as a vertical stack of section components from `src/components/` (`Navbar`, `Hero`, `ProjectCards`, `TheStack`, `Experience`) plus an inline contact/footer block.
- **UI primitives:** shadcn-style components in `components/ui/` (Button, Card, Badge, Tabs, etc.), configured via `components.json` with style `base-nova`, neutral base color, and Lucide icons. Use the `cn()` helper in `lib/utils.ts` (clsx + tailwind-merge) to compose class names.
- **Styling:** Tailwind v4 via the `@tailwindcss/vite` plugin — config lives in `src/index.css` using `@theme inline` and CSS variables, **not** a `tailwind.config.js`. `tw-animate-css` and `shadcn/tailwind.css` are imported there. Dark theme is the default (slate-950 background, emerald-500 accent); `dark` variant is declared but unused.
- **Animations:** `motion/react` (Framer Motion v12) for entrance animations.
- **Path alias:** `@/*` resolves to the project root (see `vite.config.ts` and `tsconfig.json`). Components import as `@/components/ui/...` and `@/lib/utils`. Note `src/` is *not* under the alias — sibling imports inside `src/components/` use relative paths.

## Environment

- `GEMINI_API_KEY` is injected via Vite's `define` as `process.env.GEMINI_API_KEY` (see `vite.config.ts`). Set it in `.env.local` for local dev. Not currently consumed by any source file.
- `DISABLE_HMR=true` disables HMR and file watching — used by AI Studio during agent edits to prevent flicker. Don't remove the watch/HMR guards in `vite.config.ts`.

## Conventions

- React 19 + TypeScript with `"jsx": "react-jsx"`. No default React import needed.
- Components are default-exported function components.
- `allowImportingTsExtensions` is on — `.tsx` extensions in imports are valid.
