# Roadmap

The roadmap advances only after the preceding assumptions are tested. Dates and feature promises are intentionally absent.

## Mission 00A — Foundation and first runnable UI

**Status:** Checkpointed

- Next.js, TypeScript, Tailwind, linting, type checking, build, and browser smoke tests.
- Arabic-first responsive technical prototype with honest preview states.
- Subject-neutral platform concepts and architecture documentation.
- No accounts, database, AI calls, production services, or copyrighted passages.

The Mission 00A interface and provisional “مدار” identity are not approved visual references.

## Mission 00B — Product definition and foundation closeout

**Status:** Complete; pending Maestro review

- Record PD-001, PD-002, and PD-003.
- Specify both initial paths, including learner profiles, outcomes, curriculum boundaries, and shared versus separate capabilities.
- Produce original, teacher-reviewable conceptual sample lessons without reproducing unlicensed passages.
- Specify grounded AI tutoring, editorial review, privacy, safety, evaluation, and progress behavior.
- Define content licensing, provenance, translation, canon, institutional-context, and correction policies.
- Map MVP learner flows, contextual assistance, practice, completion, and recovery states.
- Close the mission with a validated, committed, clean foundation.

Mission 00B specifications:

- [First vertical](FIRST_VERTICAL.md)
- [Conceptual sample lessons](SAMPLE_LESSON.md)
- [AI tutor specification](AI_TUTOR_SPEC.md)
- [Content policy](CONTENT_POLICY.md)
- [Learner flow](LEARNER_FLOW.md)

## Mission 00C — Design exploration and approval

**Status:** Complete; three directions reviewed and PD-004 synthesis direction approved

Explore PD-002 and PD-003 from first principles before implementing a redesign:

- brand and visual identity directions;
- color palettes and semantic design tokens;
- Arabic typography options with licensing and self-hosting implications;
- responsive navigation for mobile, tablet, and desktop;
- landing page and learner onboarding;
- learning dashboard, course discovery, and course detail;
- lesson player, meaningful exercises, feedback, and completion states;
- contextual AI tutor within lesson and source boundaries;
- progress, mastery, achievements, profile, and settings;
- empty, loading, offline, error, and completion states;
- motion and microinteraction guidance, including reduced motion;
- accessibility specifications for color, focus, keyboard, screen reader, and touch behavior.

The exploration must define one shared visual language and lesson framework while preserving separate curricula, assessments, and progress dimensions. Do not implement the redesign until the product owner approves the Mission 00C direction.

**Exit evidence:** approved brand direction, design tokens, Arabic typography and licensing decision, responsive specifications for core surfaces and system states, interaction and motion guidance, and accessibility review.

Mission 00C produced Modern Academy, Learning Quest, and Contemporary Scholar proofs. PD-004 selects a refined A+B hybrid with selected C study components.

## Mission 00C-S — Final hybrid design synthesis

**Status:** Design refinement complete when locally checkpointed; visual execution pending product-owner and Maestro review

- Synthesize PD-004 into one visual language rather than a patchwork of the three explorations.
- Define the provisional identity, semantic tokens, Arabic typography, responsive behavior, component states, content-layer labels, motion, and accessibility requirements.
- Produce standalone landing, dashboard, and interactive lesson proofs at mobile, tablet, and desktop widths.
- Demonstrate separate path progress, course journey, humane achievement, source context, educator guidance, exercise feedback, progressive hints, and contextual tutor behavior.
- Provide a route, component, token, testing, and sequencing handoff for Mission 01A.

**Exit gate:** the product owner and Maestro visually review the Mission 00C-S proof and either approve the execution, request a bounded revision, or pause. No production redesign begins before that review.

## Mission 01A — Approved frontend redesign implementation

**Status:** Subsequent mission; blocked on Mission 00C-S visual review

- Implement only the Mission 00C direction approved by the product owner.
- Build fixture-backed landing, onboarding, dashboard, discovery, course, lesson, tutor, progress, profile, settings, and system-state surfaces within agreed MVP scope.
- Preserve clear separation between the two curricula and assessment models.
- Keep content original or explicitly licensed and integrations local or mocked.

## Mission 01B — Responsive and interaction QA

- Validate Arabic RTL behavior on representative mobile, tablet, and desktop widths.
- Test keyboard, screen reader, contrast, touch targets, reduced motion, loading, offline, error, and recovery behavior.
- Verify interaction states, exercise feedback, progress communication, and subtle celebrations without coercive mechanics.
- Resolve browser and device issues before adding live services.

## Later missions

1. **Grounded content:** approve a licensed content corpus, provenance workflow, editorial roles, citations, and correction process.
2. **AI tutoring:** implement a server-only grounded tutor behind evaluation gates, safety controls, and cost limits.
3. **Authentication:** introduce only the validated learner, educator, guardian, and administrator roles needed by the pilot.
4. **Learning progress:** persist attempts, mastery evidence, remediation, and path-specific progress with explicit privacy and retention rules.
5. **Private pilot:** operate a small, reviewed pilot with support, incident response, learning evaluation, and stop criteria.

Teachers, group classrooms, live voice/video, collaborative whiteboards, payments, and additional subjects remain later hypotheses requiring separate evidence and approval.
