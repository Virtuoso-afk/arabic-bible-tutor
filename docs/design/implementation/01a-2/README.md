# Mission 01A-2 public landing and path entry

## Routes and fixtures

- `/` implements the approved public landing hierarchy.
- `/learn/paths/arabic-language` presents Path A as language acquisition through reviewed, licensed Bible materials.
- `/learn/paths/bible-study` presents Path B as Bible-content study taught in Arabic.

The dynamic path route is statically generated for those two IDs only. Typed original fixtures live in `lib/learning-paths.ts`; they contain no Bible quotation, claimed learner progress, account state, or active AI behavior.

## Components

Mission 01A-2 reuses the 01A-1 `Badge`, `ButtonLink`, `Container`, and `Surface` primitives. It adds the smallest public-specific set:

- `PublicHeader`
- `BrandSymbol`
- `LearningJourney`
- `PathCard`

All production pages are React Server Components. Path switching and back navigation use ordinary local links.

## Comparison with the approved landing proof

The implementation preserves the proof's spacious RTL hero, navy four-station journey, paired teal/plum paths, restrained milestone colors, three-step method region, future-course close, and responsive change from two columns to one. Production typography uses the 16 px baseline and local font stack established in 01A-1.

| Location | Deviation | Reason | Intentional | Visual impact | Owner approval needed |
| --- | --- | --- | --- | --- | --- |
| Header action | Opens the path comparison instead of a dashboard proof | Dashboard implementation belongs to 01A-3 | Yes | Same quiet-action hierarchy; destination copy is explicit | No |
| Hero secondary action | Links to the learning method instead of an unimplemented lesson | A production lesson is outside 01A-2 | Yes | Retains a secondary action without implying a working lesson | No |
| Journey callout | Labels evidence as an illustrative example | No learner state or mastery exists | Yes | Slightly more explicit than the proof | No |
| Path cards | Use larger body text and more descriptive outcomes | Production accessibility requirement | Yes | Cards are taller, especially on mobile | No |
| Path details | Adds two static entry pages beyond the proof canvas | Required working exploration flow | Yes | Extends the approved visual language without changing the landing composition | No |

Final identity validation, self-hosted font proof, licensed curriculum content, and educator review remain unresolved product inputs.

## Capture

Run a local production server, then execute:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
node docs/design/implementation/01a-2/capture-public-pages.mjs
```

The runner captures the landing and both path entries at 390, 768, and 1440 px. It checks RTL metadata, primary heading visibility, keyboard focus, runtime errors, and horizontal overflow before writing each PNG.
