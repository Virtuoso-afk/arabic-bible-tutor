# Accessibility and inclusive interaction guidelines

**Target:** WCAG 2.2 Level AA for the approved learner experience, verified in Arabic RTL at mobile and desktop sizes. Automated tools support review but do not replace keyboard, screen-reader, zoom, and learner testing.

## Arabic and bidirectional content

- Set `lang="ar"` and `dir="rtl"` at the document level; mark embedded language changes accurately.
- Use logical CSS properties (`margin-inline-start`, `inset-inline-end`) and keep DOM order aligned with reading and focus order.
- Isolate mixed Arabic, Latin, references, and numbers with `bdi`, `dir="auto"`, or explicit language spans. Do not rely on punctuation to resolve bidi order.
- Test headings, controls, numbers, citations, and validation messages with Arabic diacritics and long strings.
- Do not justify Arabic body copy. Use generous line height and a readable measure.
- Provide an accessible name for every icon-only control; keep icons secondary to visible Arabic labels for primary actions.

## Color and visual structure

- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful non-text graphics.
- Test token pairs in every state, including dark theme, disabled controls, selected answers, charts, focus rings, and tutor citations.
- Use text, icon, shape, or position in addition to color for path identity, correctness, progress, and warnings.
- Keep source text, interpretation, and generated explanation visually and programmatically labeled.
- Avoid texture behind reading content. If an approved concept uses paper-like surfaces, the base remains a flat high-contrast color.

## Keyboard and focus

- All functions work with keyboard alone. Visual order, reading order, and focus order match.
- Provide a skip link to the main lesson or page content.
- Use a clearly visible `:focus-visible` indicator with at least 3:1 contrast against adjacent colors and enough area to remain visible at 200% zoom.
- Do not remove focus outlines without a tested replacement.
- Dialogs and tutor sheets move focus to a meaningful heading/control, contain focus while modal, close with Escape when safe, and restore focus to the trigger.
- Arrow-key behavior is reserved for established composite widgets such as tabs and radio groups; Tab reaches the widget once.
- Drag, swipe, hover, or long-press interactions always have a simple pointer and keyboard alternative.

## Touch and responsive behavior

- Target controls are at least 44 × 44 CSS px; 48 × 48 is preferred for common mobile actions.
- Leave spacing between destructive, submit, and navigation targets.
- Support 320 CSS px width and 400% browser zoom without two-dimensional scrolling, except for content whose meaning requires it.
- Support 200% text size without clipped labels or hidden actions.
- Mobile bottom navigation does not obscure content or operating-system safe areas.
- Sticky headers, progress bars, and tutor launchers must not cover focused content.

## Semantics and announcements

- Use one page `h1`, hierarchical headings, native buttons and links, landmarks, lists, fieldsets, and labels before adding ARIA.
- Every lesson activity states its objective and instructions before its controls.
- Associate validation and feedback with the relevant field or answer. Move focus only when needed to resolve an error.
- Announce asynchronous save, offline, tutor, and evaluation states through a restrained live region. Avoid repeated announcements for streaming text.
- Expose progress with a name, current value, and understandable text. A visual ring or route is supplemental.
- Data visualizations include a text summary and accessible values.

## Exercises and assessment

- Do not make speed the only evidence of mastery unless timing is an explicit, reviewed learning objective.
- Ordering, matching, and drag activities need button-based alternatives such as “move before/after” or select-and-place.
- Correctness feedback identifies why an answer works and what to try next. It is not conveyed by red/green alone.
- Permit review before submission when an activity has multiple parts.
- Preserve learner answers through recoverable network failures and warn before discarding work.
- Rubrics use plain language, observable criteria, and a “not enough evidence” state.

## Contextual AI tutor

- The tutor launcher has a clear label and states the lesson context it will use.
- Responses distinguish quoted/licensed source material, source references, reviewed interpretation, and generated explanation.
- Citations are keyboard reachable, understandable out of context, and open without losing the learner's attempt.
- “I do not have enough approved source material” is a valid response state with a next step.
- Streaming output must not trap focus or create continuous screen-reader announcements. Offer a completed response region.
- Reporting an incorrect or harmful answer is accessible and preserves the disputed response for editorial review without requiring the learner to restate it.

## Motion, media, and sensory access

- Respect `prefers-reduced-motion`; remove parallax, route animation, confetti, and nonessential transitions.
- Avoid flashing content and large rapid movement.
- Future audio and video require captions/transcripts, keyboard controls, visible focus, and a text-based learning equivalent.
- Pronunciation feedback, if introduced, must communicate uncertainty and allow another method of demonstrating the objective.
- Sound and haptics are optional, off-able, and never the only completion signal.

## Cognitive access and humane motivation

- Keep one primary next action per learning surface and show estimated effort.
- Use consistent terms for paths, courses, lessons, activities, review, and mastery.
- Explain consequences before switching paths, resetting progress, or clearing a tutor session.
- Break long instructions into short ordered steps and keep the current objective visible.
- Milestones describe demonstrated learning. Avoid public leaderboards, punitive streak loss, scarcity, shame, or deceptive urgency.
- Errors state what happened, what was preserved, and the safest next action.

## Required validation before production approval

1. Test keyboard-only navigation at 390 px and 1440 px.
2. Test VoiceOver/Safari or TalkBack/Chrome on mobile and NVDA/Firefox or NVDA/Chrome on desktop.
3. Test 200% text size, 400% zoom/reflow, dark mode, high-contrast preferences, and reduced motion.
4. Run automated semantic and contrast checks on every core screen and state.
5. Review Arabic reading order, bidi strings, diacritics, and pronunciation content with qualified Arabic readers.
6. Test lesson exercises with disabled learners, including screen-reader and motor-access users, before claiming usability.
7. Record exceptions with owner, impact, workaround, and remediation date; do not silently waive failures.
