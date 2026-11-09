# Decisions

This file records decisions that materially shape the foundation. Revisit them when product evidence changes.

## D-001 — Keep the teaching model open

**Status:** Accepted for Mission 00A

**Decision:** Separate subject, learning outcomes, language, and resources. Do not encode “Arabic through the Bible” or “Bible in Arabic” as the platform model.

**Reason:** The primary learner need remains unresolved. Choosing prematurely would distort content, assessment, and tutor behavior.

**Revisit when:** Interviews and a curriculum prototype identify the first learner, outcome, and teacher workflow.

## D-002 — Use a Next.js modular monolith

**Status:** Accepted

**Decision:** Use Next.js App Router with TypeScript strict mode and server components by default.

**Reason:** It gives a small team one maintainable application and a safe future location for server-only AI and data access. Microservices add cost and coordination without current evidence.

**Versions:** Exact stable compatible versions are locked in `package-lock.json`. TypeScript is pinned to 6.0.3 rather than the newer 7.0.2 because the TypeScript ESLint version bundled with Next.js 16.4.5 explicitly does not support the TypeScript 7 compiler API yet. ESLint is likewise pinned to 9.39.5 because Next's current import, React, and accessibility plugins have not declared ESLint 10 compatibility.

## D-003 — Use Tailwind with explicit CSS design tokens

**Status:** Accepted

**Decision:** Use Tailwind CSS for utility generation while defining semantic visual tokens and shared component styles in `app/globals.css`.

**Reason:** The combination provides rapid iteration without scattering brand values through markup. It also makes RTL and accessible states reviewable in one place.

## D-004 — Avoid remote assets and fonts in the foundation

**Status:** Accepted

**Decision:** Use original CSS shapes, inline interface icons, and a system Arabic font stack.

**Reason:** This avoids licensing ambiguity, runtime network dependencies, and avoidable privacy or performance costs. A licensed Arabic typeface can be self-hosted later if research justifies it.

## D-005 — Defer Supabase and AI providers

**Status:** Proposed direction, not implemented

**Decision:** Evaluate Supabase/PostgreSQL for validated persistence needs and integrate AI only through a server-side provider adapter.

**Reason:** Both are plausible low-operations choices, but adding them before user flows and data needs are validated would create configuration and security work without user value.

## D-006 — Treat content rights as domain data

**Status:** Accepted

**Decision:** Every future learning resource must record provenance and permitted use.

**Reason:** Bible translations and educational resources have different copyright terms. The platform must never assume religious text is automatically public domain.

## Open decisions

- Is the first outcome Arabic proficiency, biblical understanding, or a deliberately combined curriculum?
- Who is the first learner, and is a teacher or parent part of the workflow?
- Which Arabic register, dialect support, and accessibility accommodations are required?
- Which Bible translation or original materials can be licensed for the pilot?
- What evidence demonstrates learning progress without overstating mastery?
