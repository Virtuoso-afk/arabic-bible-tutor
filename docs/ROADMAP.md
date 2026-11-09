# Roadmap

The roadmap advances only after the preceding assumptions are tested. Dates and feature promises are intentionally absent.

## Mission 00A — Foundation and first runnable UI

- Next.js, TypeScript, Tailwind, linting, type checking, build, and browser smoke tests.
- Arabic-first responsive landing page with honest preview states.
- Subject-neutral product model and architecture documentation.
- No accounts, database, AI calls, production services, or copyrighted passages.

## Recommended Mission 00B — Product and curriculum discovery

- Interview a small set of target learners, Arabic educators, and Bible educators.
- Decide the first learning outcome and define one narrow learner journey.
- Secure or create a tiny licensed sample content set and record provenance.
- Write an assessment rubric and AI-assistance boundaries before building a tutor.
- Test the current Arabic copy, provisional identity, typography, and mobile usability.

**Exit evidence:** one named learner segment, one measurable outcome, one teacher-reviewed sample lesson, documented content rights, and a decision on the first teaching model.

## Mission 01 — Lesson prototype

- Implement a local, fixture-backed course and lesson flow.
- Add semantic domain types for courses, lessons, activities, resources, and progress.
- Test navigation, reading comfort, keyboard access, and lesson completion locally.
- Keep data in versioned fixtures; do not add a database until the shape stabilizes.

## Mission 02 — Persistence and private pilot readiness

- Evaluate Supabase/PostgreSQL against the validated data and privacy requirements.
- Add authentication only for a defined pilot role model.
- Implement resource provenance and license enforcement.
- Add privacy, retention, abuse, and incident-response requirements.

## Mission 03 — Constrained tutoring experiment

- Build a server-only AI gateway behind a feature flag and strict cost limits.
- Ground responses in approved lesson resources and expose citations and uncertainty.
- Evaluate educational quality and safety with teachers before learner access.

## Later possibilities

Teachers, group classrooms, live voice/video, collaborative whiteboards, payments, and multiple subjects remain hypotheses. Each needs its own evidence, risk assessment, and mission; none belongs in the initial MVP by default.
