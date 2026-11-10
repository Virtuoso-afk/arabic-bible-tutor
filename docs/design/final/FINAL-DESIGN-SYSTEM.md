# Final design system proposal

**Status:** PD-004 synthesis candidate for visual approval. Values below are precise enough for Mission 01A handoff but remain reviewable until the visual packet is accepted.

## Identity and visual language

The provisional `نَسَق` mark combines a curved path and two nodes. The visual language uses clean light learning surfaces, a deep navy brand field, blue actions, and sparse lime/coral moments at current milestones. Teal identifies Arabic-language learning and plum identifies Bible study in Arabic. Source and generated-content layers use separate semantic labels.

Avoid photographic stock imagery, mascots, ornamental religious imagery, large decorative gradients, glass effects, and texture behind reading content. Original geometric route diagrams may provide visual interest.

## Semantic color tokens

### Light theme

| Token | Value | Role |
| --- | --- | --- |
| `surface.canvas` | `#F3F6FA` | App background |
| `surface.raised` | `#FFFFFF` | Cards, lesson and dialogs |
| `surface.soft` | `#EEF3F8` | Supporting regions |
| `text.primary` | `#11243A` | Main text |
| `text.muted` | `#5D6B7C` | Secondary text |
| `border.default` | `#D7E0EA` | Card and control boundary |
| `border.strong` | `#B7C4D3` | Selected/hover boundary |
| `brand.navy` | `#0D2940` | Brand field and inverse surfaces |
| `brand.navy-raised` | `#143B59` | Navy surface differentiation |
| `action.primary` | `#2D55C7` | Primary action, link and focus companion |
| `action.primary-hover` | `#2145AD` | Hover/pressed action |
| `path.language` | `#08756E` | Path A indicator |
| `path.language-soft` | `#DFF4F1` | Path A quiet surface |
| `path.study` | `#6C3D99` | Path B indicator |
| `path.study-soft` | `#F0E8F7` | Path B quiet surface |
| `progress.milestone` | `#B5D743` | Earned/current route detail on navy |
| `progress.current` | `#F17C5C` | Current route station and restrained celebration |
| `content.source` | `#925F12` | Source/reference label |
| `content.source-soft` | `#FAF1DC` | Source/reference surface |
| `feedback.success` | `#18724D` | Confirmed success |
| `feedback.success-soft` | `#E1F3E9` | Success explanation surface |
| `feedback.danger` | `#B42318` | Error/destructive action |
| `focus.ring` | `#F3A712` | Three-pixel focus outline |

Measured representative contrast ratios are: primary text on white 15.70:1, muted text on white 5.44:1, white on primary blue 6.49:1, white on navy 14.91:1, teal on teal-soft 4.85:1, plum on plum-soft 6.36:1, source brown on source-soft 4.83:1, and white on success 5.91:1. Mission 01A must test every actual token pairing and interactive state rather than extrapolating from this sample.

### Dark strategy

Dark navy is a brand and focus surface in the first implementation. A user-selectable full dark theme is deferred until its reading, exercise, citation, and chart states are designed and tested. If dark mode enters scope, map semantic roles instead of inverting colors:

| Token | Candidate dark value |
| --- | --- |
| `surface.canvas` | `#081724` |
| `surface.raised` | `#10283B` |
| `surface.soft` | `#18354A` |
| `text.primary` | `#F4F8FB` |
| `text.muted` | `#B5C5D1` |
| `border.default` | `#355166` |
| `action.primary` | `#86A3FF` |
| `path.language` | `#6AD4C8` |
| `path.study` | `#CCA3EB` |
| `content.source` | `#E5C277` |

These dark values are candidates only and require a separate visual and accessibility review.

## Typography

- **Interface/body candidate:** Noto Sans Arabic, self-hosted WOFF2 after exact file/license verification, with Tahoma and Arial fallbacks.
- **Display candidate:** Noto Kufi Arabic at two weights for short headings only. Avoid it for controls and long lesson text.
- **English and Latin fallback:** Inter or a compatible system sans after license/bundle review; use `bdi` for mixed identifiers.
- **Source text:** use the body face initially. Amiri may be tested only with licensed source content and must pass small-size, diacritic, mark collision, and cross-platform tests.

| Role | Mobile | Desktop | Line height |
| --- | --- | --- | --- |
| Display | 41 px / 700 | 72–82 px / 700 | 1.22–1.28 |
| Page H1 | 30 px / 700 | 42 px / 700 | 1.35 |
| Section H2 | 25 px / 700 | 31 px / 700 | 1.45 |
| Card H3 | 17 px / 700 | 20 px / 700 | 1.5 |
| Lesson body | 17 px / 450 | 18 px / 450 | 1.85 |
| UI body | 16 px / 400 | 16 px / 400 | 1.7 |
| Label | 14 px / 650 | 14 px / 650 | 1.5 |
| Caption | 12–13 px / 450 | 12–13 px / 450 | 1.55 |

The proof is rendered at reduced design-proof scale, while Mission 01A must implement the CSS sizes above. Test common Arabic diacritics, stacked marks, proper names, Arabic-Indic and Western numerals, mixed Arabic/English references, and any Quranic annotation glyphs actually required by licensed content. Never normalize a learner's numeral input silently.

## Layout and shape

- Spacing: `4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96` px.
- Mobile gutter: 16 px; tablet: 24 px; desktop: 32 px.
- Reading measure: 38–70 Arabic characters; maximum lesson content width about 760 px.
- Shell maximum: 1320 px; dense dashboards may use 1440 px with a 238 px RTL rail.
- Breakpoints: 480, 768, 1024, 1200, and 1440 px, chosen by composition behavior.
- Radius: 9 px compact controls, 12 px buttons, 15–18 px cards, 22 px feature cards, 30 px hero journey only.
- Elevation: one quiet card shadow and one feature/overlay shadow. Use borders for most grouping.
- Iconography: simple stroked geometry or text-safe symbols paired with visible labels. Mirror directional arrows that follow reading direction.

## Component states

All controls define default, hover, focus-visible, pressed, selected, disabled, loading, success, error, and offline behavior. Focus uses a 3 px `#F3A712` ring with a 3 px offset. Minimum target size is 44 × 44 CSS px; 48 × 48 is preferred for frequent mobile actions.

Answer state uses border, background, icon, and explanatory text. Progress uses position, label, value, and color. Path identity uses path name, icon, label, and accent. Generated content always displays its layer label.

## Motion

- Hover/focus: 120–160 ms.
- Selection/feedback: 160–220 ms.
- Sheet/panel: 220–280 ms.
- Completion mark: one 350–500 ms reveal after meaningful evidence.
- Route movement is user-triggered and runs once. No looping attention motion.
- `prefers-reduced-motion: reduce` removes translation, route drawing, confetti, and smooth scrolling and shows the final state immediately.

## Content-layer labels

| Label | Semantic color | Required meaning |
| --- | --- | --- |
| `مرجع المصدر` | Source brown | Licensed source/reference and provenance |
| `اقتباس من المصدر` | Source brown | Exact permitted quotation, visually distinct and attributed |
| `إرشاد المعلّم` | Teal | Reviewed curriculum or educator guidance |
| `تفسير ضمن المنهج` | Plum | Reviewed interpretation in a declared course context |
| `شرح مولّد تجريبيًا` | Blue | AI-generated assistance, grounded and reviewable |
| `تغذية راجعة على النشاط` | Success green | Deterministic or rubric-based exercise feedback |

The labels remain in the DOM, are not communicated through color alone, and accompany citations or version metadata where applicable.
