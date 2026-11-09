# Repository conventions

## Scope and architecture

- Keep this repository a small Next.js modular monolith until measured needs justify another service.
- Keep domain language subject-neutral: courses, lessons, activities, resources, tutoring sessions, and progress.
- Use React Server Components by default. Add `"use client"` only when browser state or APIs require it.
- Keep vendor integrations behind server-only adapters. Never expose provider keys or sensitive configuration with `NEXT_PUBLIC_` variables.
- Do not add authentication, payments, databases, analytics, real AI calls, video, or production infrastructure without an explicit mission.

## Product and content safety

- Do not copy Bible passages or other educational content without documented permission.
- Every future resource must carry source, owner, license, language, and permitted-use metadata.
- Never present generated assistance as authoritative teaching or completed functionality.
- Preserve PD-001's separation between Arabic-language learning through Bible materials and Bible study in Arabic. Shared infrastructure must not collapse their curricula, assessments, mastery models, or progress dimensions.

## UI conventions

- Arabic is the default language and RTL is the default direction.
- Use semantic HTML, logical CSS properties, visible keyboard focus, and reduced-motion support.
- Test mobile and desktop widths. Avoid controls that appear interactive when no action exists.
- Reuse design tokens in `app/globals.css` and shared components before introducing one-off styles.
- Do not add external assets, tracking scripts, or remote fonts without reviewing licensing, privacy, performance, and resilience.

## Required checks

Run these before handing off a change:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Playwright uses `/usr/bin/chromium` by default in the cloud environment. Override `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` when Chromium is elsewhere. Add tests for meaningful behavior and accessibility boundaries rather than implementation details.

## Change safety

- Use the committed lockfile and `npm ci` for reproducible installation.
- Never commit secrets, `.env` files, generated build output, or test reports.
- Do not deploy, purchase services, configure production secrets, merge, or push directly to `main` unless a later mission explicitly authorizes it.
- Keep unrelated user changes intact and report every unverified check.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
