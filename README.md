# مدار — Arabic-first learning platform

Mission 00A establishes a small, runnable foundation for an Arabic-first educational platform. The first vertical will explore Bible-based Arabic learning, but the product still needs to decide whether its primary outcome is teaching Arabic through Bible materials or teaching the Bible in Arabic. The application and domain language intentionally support either direction and future subjects.

The current release is a polished landing-page prototype. It does not include real AI, accounts, a database, paid services, copyrighted passages, or working product actions.

## Technology

- Next.js App Router and React
- TypeScript in strict mode
- Tailwind CSS with shared design tokens
- ESLint and Playwright smoke tests
- System Arabic font stack with no remote asset dependency

Dependencies are pinned exactly and locked in `package-lock.json`. TypeScript 6.0.3 and ESLint 9.39.5 are used because the current Next.js lint stack does not yet support TypeScript 7 or ESLint 10. Supabase/PostgreSQL and server-side AI integration are documented future options; they are not installed or configured.

## Local development

Requirements:

- Node.js 22 or newer
- npm 11 or a compatible npm release
- Chromium for browser tests

Install from the lockfile and start the development server:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript strict-mode check
npm test           # Playwright at mobile and desktop widths
npm run build      # Production build
```

Run every check in sequence with `npm run check`.

The Playwright configuration uses `/usr/bin/chromium` in the cloud workspace. On another machine, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to the local Chromium or Chrome executable before running `npm test`.

## Project structure

```text
app/             App Router pages, metadata, and global design system
components/      Reusable presentational components
docs/            Product vision, decisions, architecture, and roadmap
tests/           Browser smoke tests
AGENTS.md        Engineering, testing, content, and safety conventions
```

Start with [the product vision](docs/PRODUCT_VISION.md), then read [architecture](docs/ARCHITECTURE.md), [decisions](docs/DECISIONS.md), and [roadmap](docs/ROADMAP.md).

## Current boundaries

- All content in the UI is original placeholder copy.
- Preview cards are clearly labelled and contain no fake buttons.
- There are no API routes or environment variables in Mission 00A.
- No deployment target or production service has been selected.

See `AGENTS.md` before making changes. In particular, do not introduce unlicensed passages, browser-exposed provider keys, or speculative infrastructure.
