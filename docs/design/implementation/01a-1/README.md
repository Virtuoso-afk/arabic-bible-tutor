# Mission 01A-1 design-system implementation

## Scope

This checkpoint implements PD-004 semantic tokens, reusable UI primitives, and the responsive Arabic RTL application shell. The `/shell-preview` route is a noindex development surface for inspecting the shell and components. It is not a dashboard or completed product page.

## Components

- `Button` and `ButtonLink`
- `Surface`
- `Badge`
- `ProgressIndicator`
- `FormField`
- `Container`
- `NavigationItem`
- `BrandLockup`
- `AppShell`

The shell uses one typed navigation model. Desktop shows a 238 px sidebar, tablet shows an 82 px icon rail, and mobile shows a safe-area-aware four-item bottom navigation. Destinations that do not exist yet render as disabled items labeled “قريبًا”.

## Typography decision

No font binary or authoritative license file exists in the repository. Mission 01A-1 therefore does not download, bundle, or claim a license for Noto Sans Arabic or Noto Kufi Arabic. Production CSS uses a robust local stack:

```css
font-family: "Noto Sans Arabic", Tahoma, Arial, sans-serif;
```

Display typography prefers locally installed Noto Kufi Arabic and falls back to the body stack. This creates no remote request. Exact WOFF2 files, license texts, Arabic diacritic/glyph coverage, bundle size, and Android/iOS/Windows/macOS rendering must be verified before self-hosting.

## Deliberate boundaries and deviations

- The approved proofs use reduced typography to display entire product canvases. Production tokens use a 16 px UI body baseline.
- Full dark mode remains deferred. Navy is implemented only as a brand/navigation surface.
- The existing Mission 00A root landing page remains intact. Mission 01A-2 will replace public/onboarding surfaces after review.
- The shell preview uses fixture copy and no persistence, authentication, backend, analytics, or AI.

## Screenshot capture

Start the app locally, then run:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
node docs/design/implementation/01a-1/capture-shell.mjs
```

The runner captures 390, 768, and 1440 px views and checks Arabic RTL metadata, focus visibility, navigation mode, browser errors, and horizontal overflow.

## Visual comparison

The implementation follows the approved Mission 00C-S proof in its navy navigation plane, pale canvas, white raised surfaces, teal and plum path identities, restrained lime and coral accents, rounded geometry, and spacious RTL hierarchy. The desktop proof becomes a 238 px sidebar, the tablet proof becomes an 82 px icon rail, and mobile uses the approved bottom-navigation pattern with safe-area padding.

These screenshots exercise the system rather than reproduce an approved dashboard. Fixture cards deliberately expose both path themes, progress, badges, a dark brand surface, form controls, disabled state, and focus behavior in one development route. The 16 px production body baseline is larger than the proof's overview-scale typography, and locally available system fonts replace the proposed Noto files until their binaries and licenses are reviewed.

Review artifacts:

- `screenshots/application-shell-mobile.png` — 390 px
- `screenshots/application-shell-tablet.png` — 768 px
- `screenshots/application-shell-desktop.png` — 1440 px
