# Mission 01A-3 learner dashboard and course discovery

## Routes

- `/learn` — fixture-backed learner dashboard.
- `/learn/courses` — course discovery for both educational paths plus a truthful future-subject empty state.
- `/learn/courses/[courseId]` — statically generated course details for two explorable demonstrations and two unavailable concepts.

The dashboard's continue and review actions link to real anchors inside the implemented `arabic-sequence` detail page. No route enrolls, starts a lesson, stores progress, or invokes AI.

## Fixture integrity

`lib/learning-demo.ts` centralizes courses, lesson stations, evidence records, separate path progress, the fixture learner, a review recommendation, and an evidence-backed example achievement.

- Course completion is derived from completed lesson counts.
- Skill bars are derived from explicit evidence-ID counts against named demonstration targets.
- Path A evidence IDs never appear in Path B dimensions, and the reverse is also true.
- The example achievement references two Path B evidence IDs.
- All figures are labeled as fixed demonstration data and make no mastery or synchronization claim.

## Components

Mission 01A-3 reuses the 01A-1 shell, tokens, buttons, badges, surfaces, containers, and native progress primitive. It adds:

- `CourseCard`
- `CourseJourney`
- `PathProgressCard`

All pages and components remain server-rendered. No state library or dependency was added.

## Visual comparison and deviations

The dashboard preserves the approved hierarchy: greeting, dominant navy continue card, course route, separate teal/plum progress, review recommendation, private achievement, and supporting evidence. Desktop uses the 238 px sidebar, tablet the 82 px rail, and mobile the existing safe-area bottom navigation.

| Location | Deviation | Reason | Intentional | Visual impact | Owner approval needed |
| --- | --- | --- | --- | --- | --- |
| Continue card | Opens the implemented course-detail lesson summary instead of a lesson player | Lesson interaction is Mission 01A-4 | Yes | Same dominant action; destination wording is more explicit | No |
| Progress cards | Evidence counts replace proof-only percentages | Avoid unsupported mastery claims | Yes | More explanatory text and taller cards | No |
| Supporting column | Weekly time is replaced by fixture evidence and an empty state | No real learner activity or clock data exists | Yes | Keeps the approved three-card rhythm with more honest content | No |
| Review action | Opens the relevant course-detail station | No exercise player exists | Yes | Preserves the review recommendation without an inert control | No |
| Discovery/detail | Extends the visual system beyond the dashboard proof | Required course-browsing scope | Yes | Uses the same surfaces, accents, typography, and shell | No |

Final curriculum ownership, licensed resources, pilot levels, achievement criteria, and persistent progress rules remain unresolved.

## Capture

After building and starting the production server, run:

```bash
node docs/design/implementation/01a-3/capture-learning-pages.mjs
```

The runner captures dashboard and discovery at 390, 768, and 1440 px, plus a representative course detail at 390 and 1440 px. Each capture audits Arabic RTL metadata, heading visibility, keyboard focus, responsive navigation, horizontal overflow, and runtime errors.
