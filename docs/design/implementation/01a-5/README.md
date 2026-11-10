# Mission 01A-5 implementation notes

## Scope delivered

Mission 01A-5 adds two operational learner-support routes inside the existing responsive shell:

- `/learn/progress` — static demonstration progress, skill evidence, review suggestions, and compact private achievement examples;
- `/settings/learning` — an unauthenticated example profile with temporary presentation preferences.

The two implemented lesson routes also expose a bounded nine-state contextual tutor demonstration. No backend, authentication, AI provider, or persistence was added.

## Progress fixtures and evidence provenance

The progress page reads the existing typed course and skill fixtures in `lib/learning-demo.ts`. Path A language evidence and Path B source-study evidence render in separate labeled groups. Each item exposes its stable evidence ID. Completion counts course units; evidence indicators describe only the named fixture observations. The interface explicitly says completion is not proficiency or mastery.

Achievement examples have stable IDs, path association, explicit criteria, named evidence IDs, and a visible `demo` status. They are neither awarded nor persisted. Review suggestions name the fixture evidence behind the recommendation and link only to implemented lessons.

Lesson submissions remain inside the mounted lesson reducer. They never enter the progress fixtures, achievements, dashboard, storage, cookies, a server, or a database.

## Preference scope

The settings route uses local React component state for reading text size, line comfort, preview contrast, and an explicit reduced-motion preview control. Enabled controls visibly affect the preview. Reset restores defaults and moves focus to an announced status. A browser refresh or navigation remount restores defaults.

The operating-system reduced-motion preference remains respected by CSS without changing the visible control. Example identity data is labeled as unauthenticated. Email, password, account editing, synchronization, and persistence are disabled and described as future capabilities. No `localStorage`, cookie, credential, or account API exists.

## Contextual tutor-state model

`lib/tutor-states.ts` defines stable IDs and presentation metadata for nine required states:

1. lesson-grounded explanation;
2. progressive hint;
3. valid citation metadata without protected source text;
4. insufficient grounding;
5. source unavailable;
6. educator review required;
7. corrected or disputed explanation;
8. tutor unavailable;
9. authored lesson guidance.

`TutorStatePanel` is an independent deterministic view layered beside the existing lesson player. It derives only from the selected demonstration state and the active authored activity. Every state identifies its content layer and the page explains that all examples are pre-authored, deterministic, and disconnected from an AI service. Path A responses stay language-oriented; Path B responses stay source-literacy-oriented.

Changing tutor states never dispatches to the lesson reducer. Source-unavailable and tutor-unavailable states preserve the mounted exercise selection, while the UI states that reload or navigation resets the lesson. The return action restores authored lesson guidance.

## Accessibility and responsive behavior

- Arabic `lang="ar"` and `dir="rtl"` remain at the document root.
- Native links, radios, checkboxes, selects, progress elements, landmarks, and disabled fields expose their browser semantics.
- Tutor state changes move focus to the announced state region. Preference changes use a polite status; explicit reset restores focus to that status.
- Status meaning uses text and labels in addition to color. Mixed-direction references use `bdi`.
- Controls retain touch-friendly targets, enlarged preview text reflows, and CSS respects `prefers-reduced-motion`.
- Browser checks cover 390, 768, and 1440 CSS pixels with no horizontal overflow or external requests.

## Visual evidence

Production-rendered evidence is stored in `screenshots/`:

- progress at desktop and mobile widths;
- settings at desktop and mobile widths;
- grounded, insufficient-grounding, correction/review, and unavailable tutor states;
- a representative tablet progress view.

Capture with a local production server:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
node docs/design/implementation/01a-5/capture-support.mjs
```

The capture audits Arabic RTL metadata, the expected primary region, focus visibility, horizontal overflow, runtime errors, and unexpected external network requests.

## Visual comparison and deliberate adaptations

The progress page reuses the approved shell, navy learning-context panels, warm surfaces, restrained indigo actions, evidence chips, and visible path ownership from Mission 00C-S and prior production checkpoints. Settings uses the same primitives with a compact two-column desktop composition and stacked mobile flow. Tutor states remain inside the lesson’s existing contextual column instead of becoming a generic chat surface.

The approved proof showed aspirational persisted progress. This checkpoint replaces that implication with an explicit static-demonstration banner and unavailable history/certificate state. Tutor correction and service failures use authored state cards rather than simulated message threads. Preference controls are limited to a local preview because global or durable application preferences require an approved persistence and privacy design.

## Validation notes

The first focused browser run found two test-harness/UI issues: the shell test queried a hidden desktop rail on mobile, and the custom switch thumb intercepted checkbox clicks. The shell assertion now targets the visible navigation and the native switch input sits above its decorative thumb. The first settings implementation also moved focus on every change; focus now remains on the control and moves only after explicit reset. Focused reruns pass. The first visual-capture run stopped after two successful images because the Arabic label `كبير` also partially matched `كبير جدًا`; the capture now requires the exact label and the complete rerun passes. A later full-suite rerun initially could not start because the production capture server still owned port 3000; after stopping that local process, the unchanged command completed with all 66 checks passing.

## Deferred work

Real learner identity, durable preferences, attempt history, mastery calculation, achievement awarding, cross-device sync, licensed source retrieval, educator review workflows, AI generation, citations backed by an approved corpus, and save-failure recovery remain deferred. Real recovery after reload requires an approved persistence layer. Curriculum and educator review of all demonstration content is still required.
