# PD-004 visual review

**Review target:** approve the exact synthesis, request a bounded revision, or pause before Mission 01A. The screenshots are full-page browser captures of the standalone proof, not production pages.

## Preview

Open [the standalone hybrid proof](previews/pd004-hybrid.html) through a local HTTP server. The proof includes working local navigation, answer selection/checking, progressive hints, and simulated contextual-tutor prompts.

## Rendered evidence

| Screen | Mobile, 390 px | Tablet, 768 px | Desktop, 1440 px |
| --- | --- | --- | --- |
| Landing | [PNG](screenshots/pd004-landing-mobile.png) | [PNG](screenshots/pd004-landing-tablet.png) | [PNG](screenshots/pd004-landing-desktop.png) |
| Dashboard | [PNG](screenshots/pd004-dashboard-mobile.png) | [PNG](screenshots/pd004-dashboard-tablet.png) | [PNG](screenshots/pd004-dashboard-desktop.png) |
| Lesson + feedback/hint | [PNG](screenshots/pd004-lesson-mobile.png) | [PNG](screenshots/pd004-lesson-tablet.png) | [PNG](screenshots/pd004-lesson-desktop.png) |

The lesson captures intentionally show the selected correct answer, first hint, explanatory feedback, and tutor layer so reviewers can assess dense states rather than only an empty exercise.

## Visual inspection findings

### Mobile, 390 px

- Landing hierarchy remains clear; actions stack and both path cards retain outcomes and labels.
- The journey retains four labeled stations without horizontal scrolling.
- Dashboard content becomes one column. Separate path cards and supporting achievements stay distinct.
- Lesson source, objective, educator note, answers, hint, feedback, actions, and tutor follow one DOM/reading order.
- Mobile navigation and lesson utility controls are fixed and require corresponding safe-area and focus-scroll handling in production.
- Long full-page captures show complete content with no horizontal overflow or clipped functional elements.

### Tablet, 768 px

- Landing uses a single wide column rather than compressing a desktop split.
- Dashboard rail collapses to icons; primary learning content stays dominant; supporting cards form a balanced row.
- Lesson removes the outline rail and uses a wide reading column, then a full tutor panel.
- No control or card crosses the viewport boundary, and touch targets remain comfortably spaced.

### Desktop, 1440 px

- Landing balances spacious A hierarchy with B's branded route and energy.
- Dashboard preserves a stable navy rail, dominant continue card, route, separate progress, and supporting column.
- Lesson presents the C-derived content layers without adopting its dense parchment/folio style.
- Activity remains wider than the tutor and outline. Source metadata and feedback stay readable at the same time.

## Automated browser audit

The capture runner checked all nine combinations for:

- `lang="ar"` and `dir="rtl"`;
- only the requested screen visible;
- no document horizontal overflow;
- no visible functional descendant outside the viewport;
- visible screen-specific primary action;
- keyboard focus reaching a visible focus state;
- no page or console errors.

All nine combinations passed after decorative, intentionally clipped background orbs were marked `aria-hidden` and excluded from the functional clipping audit.

The runner also completed a deterministic interaction smoke test covering landing-to-dashboard navigation, dashboard-to-lesson navigation, correct-answer feedback, progressive hint disclosure, and contextual tutor prompt response.

## Manual visual review completed

All nine full-page PNGs were inspected. The review checked RTL composition, copy legibility, hierarchy, card spacing, navigation changes, route labeling, separate path indicators, layer labels, activity states, and tutor context. No source passage, external image, remote font, or third-party interface was used.

## Items requiring later validation

- Exact self-hosted font files, licenses, transfer size, diacritics and platform shaping.
- Manual screen-reader behavior, 200% text, 400% reflow, OS high contrast and actual touch devices.
- Production-size typography; the standalone proof scales interface text to show complete screen systems.
- Full dark theme.
- Arabic educator and learner usability review.
- Licensed source rendering and real citation metadata.
- Final identity/name approval.

## Approval prompt

Record one result:

```text
PD-004 visual execution review
Outcome: [approve synthesis / bounded revision / pause]
Identity: [approve نَسَق for further validation / rename]
Required visual changes:
Dark-mode MVP scope:
Font proof requirements:
Owner and date:
```

Approval permits Mission 01A implementation planning and fixture-backed frontend work. It does not authorize live services, AI, authentication, data storage, licensed-content use, deployment, or production credentials.
