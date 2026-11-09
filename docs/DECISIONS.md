# Decisions

This file records decisions that materially shape the foundation. Revisit them when product evidence changes.

## D-001 — Keep the teaching model open

**Status:** Superseded by PD-001

**Decision:** Separate subject, learning outcomes, language, and resources. Do not encode “Arabic through the Bible” or “Bible in Arabic” as the platform model.

**Historical reason:** The primary learner need was unresolved during Mission 00A. Choosing prematurely would have distorted content, assessment, and tutor behavior.

**Resolution:** PD-001 approves both paths while preserving their separate educational models. Pilot order and learner profiles remain open.

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

## PD-001 — Support two separate initial learning paths

**Status:** Approved and binding

**Decision:** The first vertical supports two distinct learning paths:

1. **Learn Arabic language using Bible passages.** Arabic-language acquisition is the primary outcome. Bible passages are licensed instructional resources selected for linguistic and pedagogical suitability.
2. **Study the Bible in Arabic with an AI tutor.** Bible knowledge and interpretation within an approved curriculum are the primary outcomes. Arabic is the instructional language.

Both paths share the platform's course, lesson, resource, tutoring-session, and progress infrastructure. They retain separate curricula, teaching strategies, assessment rubrics, mastery models, and learning-progress dimensions. A learner's progress in one path must not imply mastery in the other.

**Reason:** Supporting both approved learner intents avoids forcing one educational model onto materially different goals while preserving a maintainable shared platform.

## PD-002 — Redesign the product experience from scratch

**Status:** Approved and binding

**Decision:** Mission 00A's landing page and provisional “مدار” identity are foundation artifacts, not approved visual references. Mission 00C must explore a complete UX/UI direction from first principles. Implementation begins only after the product owner approves that exploration.

**Reason:** The foundation proved the technical workflow but did not establish the final brand, information architecture, interaction model, or visual system.

## PD-003 — Hybrid premium modern × thoughtfully gamified learning

**Status:** Approved and binding for Mission 00C

**Decision:** Combine the craft, restraint, and cohesion of premium modern educational software with thoughtful gamified learning. The experience must be Arabic-first and natively RTL, mobile-first with equally polished tablet and desktop layouts, and coherent across both initial paths and future subjects.

Gamification must communicate meaningful progress, achievable milestones, mastery, and subtle celebration without pressure, childishness, excessive gradients, or decorative overload. Learning centers on purposeful exercises rather than generic chat. Motion and microinteractions must support comprehension and feedback, respect reduced-motion preferences, and preserve accessible colors, keyboard operation, visible focus, and touch-friendly targets.

**Mission boundary:** Mission 00B records and specifies the product direction. Mission 00C explores the brand, design system, typography and licensing, navigation, core learner surfaces, responsive behavior, accessibility, motion, and system states. No redesign may be implemented until the product owner approves Mission 00C.

**Reason:** This direction can provide a distinctive, credible educational experience with motivating feedback while maintaining professional trust and serving different curricula through one visual language.

## PD-004 — Refined A+B hybrid with selected C study components

**Status:** Approved and binding design direction; exact Mission 00C-S visual execution pending owner and Maestro review

**Decision:** Create one cohesive Arabic-first system from:

- Concept A / Modern Academy for accessible spacious layouts, premium hierarchy, light learning surfaces, responsive navigation, and maintainable component architecture;
- Concept B / Learning Quest for distinctive energy, course journeys, meaningful progress feedback, evidence-backed achievements, and subtle celebration;
- selected Concept C / Contemporary Scholar patterns for long-form reading, source citations, annotations, and explicit distinction among source quotation, interpretation, curriculum guidance, and AI-generated explanation.

The synthesis must feel designed as one product. It must not reproduce the three concepts side by side or carry their conflicting card, color, typography, and layout systems into production. Both initial paths share the visual and course framework while retaining separate curricula, tutor behavior, assessments, rubrics, and progress dimensions.

**Mission boundary:** Mission 00C-S designs and validates the exact synthesis through standalone proofs and implementation documentation. It does not authorize production UI changes. Mission 01A begins only after the product owner and Maestro review the Mission 00C-S visual result.

**Reason:** The approved combination preserves A's trust and scalability, adds B's learner momentum, and uses C's strongest source-literacy treatment without adopting a dense editorial product shell.

## PD-005 — Approve the Mission 00C-S visual execution for frontend implementation

**Status:** Approved and binding for production frontend implementation

**Decision:** The product owner approves the Mission 00C-S `نَسَق` visual execution as the production frontend reference, subject to the established product, accessibility, content, privacy, and security requirements. Mission 01A may implement that system in bounded checkpoints without changing the two-path educational model or treating fixture content as validated curriculum.

Mission 01A-1 is limited to production semantic tokens, an Arabic typography strategy, reusable interface primitives, and the responsive application shell. It does not authorize public-page redesigns, learner flows, live services, persistence, authentication, or AI. The approved Mission 00C-S proofs remain review evidence; implementation differences must be documented rather than silently altering them.

**Reason:** The approved synthesis provides one coherent visual language for both learning paths and sufficient responsive, component, state, motion, and accessibility guidance to begin production implementation in reviewable increments.

## Open decisions

- Which approved learning path should lead the first pilot?
- Who is the first learner, and is a teacher or parent part of the workflow?
- Which Arabic register, dialect support, and accessibility accommodations are required?
- Which Bible translation or original materials can be licensed for the pilot?
- What evidence demonstrates learning progress without overstating mastery?
- Is the provisional Mission 00C-S `نَسَق` identity suitable for naming and trademark validation?
- Does the first MVP require a complete dark theme or only purposeful navy brand surfaces?
