# Mission 00C review packet

## Executive decision

Mission 00C explored three complete Arabic-first RTL directions at the same three product moments: landing, learner dashboard, and lesson with contextual AI tutor. Each moment was rendered at 390 px and 1440 px, producing 18 review captures.

The recommended direction is **A — Modern Academy**. It combines the strongest responsive hierarchy, accessible interaction foundation, premium tone, and maintainability for a small team. The recommendation is provisional until the product owner records approval.

## What is ready for review

- [Concept comparison and recommendation](CONCEPT_COMPARISON.md)
- [Information architecture](INFORMATION_ARCHITECTURE.md)
- [Screen inventory](SCREEN_INVENTORY.md)
- [Design system proposal](DESIGN_SYSTEM_PROPOSAL.md)
- [Accessibility and motion guidance](ACCESSIBILITY.md)
- Standalone concept previews in [`previews/`](previews/README.md)
- 18 captured viewport artifacts in [`screenshots/`](screenshots/)

## Concept choices

| Choice | Product character | Main trade-off |
| --- | --- | --- |
| **A — Modern Academy** (recommended) | Calm, precise, premium educational software | Needs deliberate Arabic editorial details to remain distinctive |
| **B — Learning Quest** | Energetic course route with meaningful milestones | Higher visual/content cost and greater risk of excessive gamification |
| **C — Contemporary Scholar** | Warm, source-centered contemporary reading environment | Denser mobile experience and narrower fit for future subjects |
| Bounded iteration | Revise a named issue in one concept | Approval should define the exact screen, problem, and acceptance criterion |

## Review sequence

1. Read the three concept summaries and comparative assessment.
2. Open each landing, dashboard, and lesson preview at both target widths, or inspect the captures.
3. Check both paths are clearly distinct without becoming separate products.
4. Check the lesson activity remains primary and the tutor stays contextual.
5. Review typography, density, focus, motion, progress, and system-state guidance.
6. Record one outcome: approve A, approve B, approve C, request a bounded iteration, or pause.

## Approval record template

```text
PD-004 — Mission 00C visual direction
Decision: [A / B / C / bounded revision / paused]
Approved scope:
Required changes before Mission 01A:
Dark-mode scope:
Initial learner age range:
Interface language scope:
Approved borrowed pattern(s), if any:
Decision owner and date:
```

An approval authorizes detailed frontend design and implementation planning for Mission 01A. It does not authorize backend, authentication, real AI, database, payment, deployment, or production credentials.

## Evidence and validation

The capture runner loads each standalone preview through a temporary loopback HTTP server and checks:

- Arabic document language and RTL direction;
- the requested screen is the only visible screen;
- document width fits the 390 px or 1440 px viewport;
- visible descendants are not clipped outside the viewport;
- no browser page or console errors occur.

All 18 required combinations passed. The concepts were also visually inspected at both widths. This evidence establishes artifact layout health; it does not replace production accessibility testing or learner research.

## Boundaries and open decisions

- Concept names and identities (`أفق`, `مسار`, and `رِواق`) are placeholders for comparison, not brand proposals.
- Fonts and licenses require exact-file verification before bundling.
- The initial learner age range, English interface scope, institutional context, and dark-mode MVP scope need owner decisions.
- The lesson examples are conceptual and teacher-reviewable; no source permission is implied.
- Real source-grounded tutor behavior depends on later content, editorial, privacy, evaluation, and AI missions.
- No educator interviews, usability tests, or legal permissions are claimed.

## Recommended Mission 01A gate

Do not start the production redesign until PD-004 records a selected direction and required revisions. After approval, Mission 01A should implement the approved token foundation and the smallest coherent slice: responsive shell, landing, dashboard, one lesson activity, contextual tutor states without real AI, and critical loading/empty/error/completion states. Mission 01B should then perform responsive, interaction, accessibility, and browser QA.
