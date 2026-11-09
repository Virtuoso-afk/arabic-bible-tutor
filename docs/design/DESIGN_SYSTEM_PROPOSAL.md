# Design system proposal

**Status:** Three exploratory directions for Mission 00C. No concept, name, palette, font, or component treatment is approved for production.

## Shared design intent

The system should feel like serious educational software with calm, earned moments of encouragement. It begins with Arabic typography and RTL composition. The two learning paths share one product language while retaining explicit labels, tailored exercises, separate rubrics, and separate mastery dimensions.

The proposed implementation model is a small token layer, accessible primitives, and learning-specific components inside the existing Next.js application. It does not require a separate design-system package or microfrontend.

## Concept A — Modern Academy

**Personality:** precise, calm, capable, contemporary.

This direction uses a disciplined grid, deep navy surfaces, clear blue interaction color, and generous white space. Progress appears as evidence and milestones rather than a game score. The design has the lowest visual-learning cost and the clearest route to a durable multi-subject platform.

The shell uses a compact header for public pages and an RTL side rail for desktop learning views; mobile uses a four-item bottom navigation. Cards have quiet borders, one restrained elevation, and clear metadata rows. Primary buttons are solid blue, secondary buttons are outlined, and inputs use persistent labels with inline validation. Progress uses segmented bars and evidence rows. Exercise options are spacious, typographic, and reveal explanatory feedback below the selected response. Completion uses a short check animation and a calm mastery update. Path A uses cyan labels and language-skill diagrams; Path B uses violet labels and source-context diagrams, always with visible path names.

### Concept A palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `surface-canvas` | `#F6F8FC` | `#081120` | Page background |
| `surface-raised` | `#FFFFFF` | `#101C2F` | Cards and panels |
| `text-primary` | `#10213A` | `#F5F8FF` | Main Arabic text |
| `text-muted` | `#5D6B7D` | `#AFC0D8` | Supporting text |
| `action-primary` | `#175CD3` | `#71A7FF` | Links, primary actions, focus companion |
| `accent-a` | `#0E7490` | `#5ED2E6` | Path A accent |
| `accent-b` | `#6D3CC8` | `#C4A3FF` | Path B accent |
| `success` | `#16734A` | `#65D49A` | Confirmed success |
| `warning` | `#9A6700` | `#F5C451` | Attention |
| `danger` | `#B42318` | `#FF8A82` | Destructive/error |
| `border` | `#D9E2EF` | `#2B3B54` | Dividers and boundaries |

**Strengths:** premium product feel, strong scanning, scalable navigation, predictable accessible states, modest CSS complexity.
**Risks:** can feel generic if Arabic composition and learning interactions are treated as decoration; needs a distinct editorial voice and custom learning diagrams.

## Concept B — Learning Quest

**Personality:** energetic, encouraging, directional, social without competition.

This direction turns a course into a route of achievable learning stops. Lime, coral, aqua, and violet accents sit on a dark ink foundation. Goals remain flexible, milestones state what the learner demonstrated, and missed days have neutral recovery language.

The public header is compact and lively; the learner shell centers a responsive course route with a simple rail or bottom navigation around it. Cards use offset color blocks and rounded route markers while retaining a consistent reading grid. Buttons are bold pill-like shapes with text and icon; inputs remain rectangular and familiar so playfulness does not weaken form clarity. Progress uses a navigable route plus a text list of completed, current, and upcoming objectives. Exercise components use move, match, group, and choose patterns with keyboard alternatives. Completion highlights the demonstrated skill and advances the route without streak pressure. Path A uses aqua and word-building motifs; Path B uses coral and evidence-link motifs, backed by explicit labels.

### Concept B palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `surface-canvas` | `#F7F8F0` | `#101828` | Page background |
| `surface-raised` | `#FFFFFF` | `#19243A` | Cards and panels |
| `text-primary` | `#172033` | `#F8FAF2` | Main text |
| `text-muted` | `#5D6675` | `#BCC6D6` | Supporting text |
| `action-primary` | `#5646D8` | `#A99DFF` | Main action |
| `accent-a` | `#0E7C86` | `#65D9DE` | Path A accent |
| `accent-b` | `#C34835` | `#FF917D` | Path B accent |
| `milestone` | `#6C8500` | `#CBEA55` | Route and milestone highlight |
| `success` | `#16734A` | `#6ED5A0` | Confirmed success |
| `warning` | `#8B5D00` | `#F3C45A` | Attention |
| `danger` | `#B42318` | `#FF8A82` | Error |
| `border` | `#DCE2D2` | `#35415A` | Boundaries |

**Strengths:** visible momentum, memorable route model, natural support for small goals and mastery checkpoints.
**Risks:** more visual density, greater motion/illustration cost, and the highest risk of feeling childish or pressuring if milestones, colors, or streaks are overused.

## Concept C — Contemporary Scholar

**Personality:** reflective, warm, literate, authoritative without austerity.

This direction treats learning as a contemporary reading desk. Parchment surfaces, oxblood and olive accents, folio-like course cards, and marginal notes make sources and interpretation visibly distinct. It gives the Bible-study path a strong source-literacy model while retaining modern controls.

The shell uses an editorial masthead on public pages and a reserved RTL rail around a wide reading desk for lessons. Course cards resemble modern folios with numbered metadata; buttons use oxblood fills or underlined text treatments, while form inputs retain clear boxed boundaries and persistent labels. Progress appears as a chapter index, annotated evidence, and small seals tied to mastery. Exercises place the prompt in the reading column and feedback in an adjacent note on wide screens, stacking them in DOM order on mobile. Completion adds a brief folio mark and summary. Path A uses teal linguistic annotations; Path B uses plum source and interpretation annotations with explicit layer labels.

### Concept C palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `surface-canvas` | `#F5F0E6` | `#171512` | Page background |
| `surface-raised` | `#FFFDF7` | `#24211C` | Cards and reading surfaces |
| `text-primary` | `#2B2520` | `#F8F1E6` | Main text |
| `text-muted` | `#6D6258` | `#C7BBAA` | Supporting text |
| `action-primary` | `#7A2935` | `#F09AAA` | Main action |
| `accent-a` | `#3F6F67` | `#85C8BA` | Path A accent |
| `accent-b` | `#6B3B70` | `#CEA0D2` | Path B accent |
| `annotation` | `#7A651B` | `#E1C96B` | Notes and citations |
| `success` | `#3D704B` | `#8DD29A` | Confirmed success |
| `warning` | `#8A5E14` | `#E8BE67` | Attention |
| `danger` | `#A33A32` | `#EE8B82` | Error |
| `border` | `#D8CDBE` | `#4A4339` | Boundaries |

**Strengths:** distinctive Arabic editorial character, clear source/interpretation layers, calm long-form reading experience.
**Risks:** denser pages and decorative metaphors need careful mobile simplification; paper textures and serif use can reduce contrast or legibility; extending to technical subjects would require disciplined neutral components.

## Recommendation for approval

Approve **Concept A — Modern Academy** as the production foundation. It best balances premium presentation, Arabic readability, accessibility, responsive behavior, maintenance cost, and expansion to future subjects. If the owner approves A, Mission 01A can test two narrowly defined patterns from the other explorations: Concept C's explicit source/interpretation labeling and Concept B's route view for course milestones. Those patterns should use Concept A tokens and should not create a fourth visual direction.

This recommendation is a design-team assessment based on the artifacts in this packet. It is not user-research evidence.

## Semantic token structure

Components consume semantic roles, not raw palette values:

```text
color.surface.canvas / raised / sunken / inverse
color.text.primary / secondary / muted / inverse / link
color.action.primary / primary-hover / secondary / disabled
color.border.default / strong / focus
color.feedback.success / warning / danger / info
color.path.language / scripture-study
color.progress.complete / current / upcoming
```

Each concept maps these roles to tested light and dark values. Path accents apply to small indicators, labels, and diagrams. Text, correctness, progress, and selected state also use words, icons, shape, or position.

## Typography

### Proposed roles

- **Interface and body:** Noto Sans Arabic, with a system Arabic fallback. It is readable at small sizes and includes broad Arabic coverage.
- **Headings and numerals:** Noto Kufi Arabic in restrained weights for navigational and display hierarchy.
- **Source text candidate:** Amiri only for licensed source material after legibility, diacritic positioning, and exact font-file licensing are verified. Interface controls should remain sans serif.

Other candidates for a short production proof are IBM Plex Sans Arabic, Alexandria, and Readex Pro. Licensing notes are preliminary: these families are commonly distributed under the SIL Open Font License, but Mission 01A must verify the exact downloaded version, license file, redistribution terms, glyph coverage, and performance before bundling. A web-font service is not required.

Self-host only the approved weights and subsets needed by the interface, serve WOFF2 locally, preload at most the critical body face, and use `font-display: swap`. Compare total transferred bytes and layout shift before adding a display or source face. Test Arabic-Indic and Western numerals in dates, percentages, levels, references, and mixed-direction strings; numeral policy should follow content context rather than silently converting user input. Font acceptance must include common Arabic diacritics, stacked marks, ligatures, Quranic annotation characters where licensed source content requires them, and shaping at 14–24 px on Android, iOS, Windows, and macOS. Missing glyphs or mark collisions disqualify a face for that content role.

### Type scale

| Role | Mobile | Desktop | Guidance |
| --- | --- | --- | --- |
| Display | 36/1.25, 700 | 60/1.18, 700 | Landing only; avoid long lines |
| H1 | 32/1.3, 700 | 44/1.25, 700 | One per page |
| H2 | 26/1.35, 700 | 34/1.3, 700 | Major regions |
| H3 | 21/1.45, 650 | 24/1.4, 650 | Card and lesson sections |
| Body large | 18/1.8, 450 | 20/1.8, 450 | Lesson instruction |
| Body | 16/1.75, 400 | 17/1.75, 400 | Interface content |
| Label | 14/1.5, 600 | 14/1.5, 600 | Controls and metadata |
| Caption | 13/1.55, 450 | 13/1.55, 450 | Supporting metadata only |

Arabic text needs generous line height and manual review with diacritics. Paragraph measure should normally remain between 35 and 70 Arabic characters. Latin identifiers and numbers use `bdi` or explicit bidi isolation.

## Layout, shape, and elevation

- Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 96` px; default mobile gutter 16 px, tablet 24 px, desktop 32 px.
- Content widths: 720 px for lesson prose, 1120–1280 px for dashboards, and 1440 px maximum shell canvas.
- Breakpoints describe composition changes rather than devices: 480, 768, 1024, 1200, and 1440 px.
- Radius: 8 px controls, 12 px small cards, 16 px learning panels, and 24 px only for prominent onboarding or celebration surfaces.
- Shadows: two restrained elevations. Boundaries and surface color carry most hierarchy.
- Icons: simple stroked icons with a text label. Directional icons are mirrored only when meaning follows reading direction; media, brand, and universal symbols keep their intrinsic direction.

## Component architecture

1. **Primitives:** button, link, input, choice, tabs, dialog, sheet, tooltip, progress element, status message.
2. **Composition:** app shell, public header, page header, card, section, responsive panel, empty/loading/error state.
3. **Learning:** course card, objective, lesson stepper, activity frame, answer option, feedback, hint, rubric, citation/source panel.
4. **Motivation:** course route, mastery meter, review queue, evidence-backed milestone, completion moment.
5. **Tutor:** contextual launcher, conversation panel, source chip, response layer label, limitation block, correction report.

State is explicit for default, hover, focus-visible, active, selected, disabled, loading, error, success, and offline. Components use logical CSS properties and keep DOM order correct for RTL reading.

## Motion and celebration

- Standard transitions: 120–180 ms for focus/hover and 200–280 ms for panels. Use opacity and transform; avoid layout movement.
- Completion may use a brief check, small color change, or restrained confetti-like marks only after a meaningful result.
- Never animate urgency, missed goals, or loss. Never use an endless attention loop.
- Under `prefers-reduced-motion: reduce`, remove nonessential movement and show the completed visual state immediately.

## Maintenance assessment

| Direction | Initial CSS/component cost | Ongoing content burden | Future-subject fit |
| --- | --- | --- | --- |
| A Modern Academy | Low–medium | Low | High |
| B Learning Quest | High | High: route art and milestone writing | Medium–high with restraint |
| C Contemporary Scholar | Medium–high | Medium: editorial/source metadata | Medium |

All three can be built accessibly. Concept A has the fewest design exceptions and the clearest path to a small maintainable MVP.
