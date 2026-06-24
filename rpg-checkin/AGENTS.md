# Agent Notes — rpg-checkin

## Project identity
- **Taverna do Dev — RPG Check-in**: a gamified tracker for the **53 study days** of the TabNews clone course.
- Standalone **Vite + React 19** SPA, separate from the **Next.js** app in the parent workspace (`clone-tabnews/` root `package.json` runs `next dev`).
- Do not run the dev server from the repo root; this app lives entirely under `rpg-checkin/`.

## Domain notes
- 53 daily missions map to course days in `src/data/days.js`.
- Each day contains a list of **videos** plus a `dayBonusXp`; the user must mark each video and then manually mark the day complete to claim the bonus.
- `LEVELS` thresholds cap at the total achievable XP (6 000), so level 10 is reachable by completing every day.

## Working in this directory
```bash
cd rpg-checkin
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # preview the dist build
npm run lint       # ESLint only — no tests exist in this package
```

## Toolchain
- **Vite 8** with `@vitejs/plugin-react`.
- **ESLint flat config** (`eslint.config.js`): `js.configs.recommended`, `react-hooks` flat recommended, `react-refresh` vite preset. Lints `**/*.{js,jsx}` and ignores `dist/`.
- ESM everywhere (`"type": "module"`).
- No test runner, no CI config, no pre-commit hooks, no codegen.

## Architecture
- Entry point: `src/main.jsx` mounts `App.jsx` into `index.html#root` under React `StrictMode`.
- Content source of truth: `src/data/days.js` — 53 daily entries, milestones, XP values, and `LEVELS` thresholds.
- State & persistence: `src/hooks/useProgress.js` — XP/level/streak/computation and `localStorage` save/load.
- `src/components/` — UI components (`Header`, `ProgressBar`, `Stats`, `DayGrid`, `Footer`).
- `localStorage` key: `rpg-checkin-progress-v2`. The app auto-migrates legacy data from `rpg-checkin-progress-v1`. Clearing either key resets user progress.
- `index.html` loads Google Fonts (Cinzel, JetBrains Mono, Crimson Pro) and sets `lang="pt-BR"`; UI copy is Portuguese.
