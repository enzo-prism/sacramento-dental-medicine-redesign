# Design QA: Sacramento Dental Medicine release loop

- Date: 2026-08-25
- Final implementation under test: serialized production build at `http://127.0.0.1:4182`
- Routes: `/`, `/reviews`, `/schedule`
- CSS viewport matrix: `320x844`, `375x844`, `390x844`, `430x844`, `768x900`, `1024x900`, `1440x1024`
- Source visual truth:
  - `audit/e2e-design-qa-2026-08-25/pass-1/03-schedule-mobile-step-1-390.png`
  - `audit/e2e-design-qa-2026-08-25/pass-1/02-mobile-menu-390.png`
- Final implementation screenshots:
  - `audit/e2e-design-qa-2026-08-25/final/home-390.png`
  - `audit/e2e-design-qa-2026-08-25/final/reviews-390.png`
  - `audit/e2e-design-qa-2026-08-25/final/schedule-390.png`
  - `audit/e2e-design-qa-2026-08-25/final/schedule-768.png`
  - `audit/e2e-design-qa-2026-08-25/final/schedule-390-contact-email-valid.png`
  - `audit/e2e-design-qa-2026-08-25/final/schedule-opengraph.png`
- Source and final mobile pixels: `390x844`; density normalization: none.
- Final tablet pixels: `768x900`; density normalization: none.
- Desktop CSS viewport: `1440x1024`; in-app Browser capture pixels: `1375x1024` because the visible Codex panel is narrower than its responsive viewport override. Layout metrics were evaluated at the full `1440` CSS-pixel viewport.

## Current-run comparisons

### Full-view comparison

`audit/e2e-design-qa-2026-08-25/final/comparison-schedule-mobile-pass1-final.png`

The source and final implementation are shown together at the same `390x844`
state. The final route preserves the approved night-band, white scheduler card,
spacing, typography, and first-step hierarchy while adding behavioral hardening
that does not introduce visual drift.

### Focused-region comparison

`audit/e2e-design-qa-2026-08-25/final/comparison-mobile-menu-pass1-final.png`

The menu is shown before and after at the same viewport and open state. The
visual treatment is preserved. The final state visibly moves focus to Care and
adds the underlying dialog, focus-loop, Escape, and scroll-lock behavior.

## Findings and iteration history

### Iteration 1: baseline responsive and journey audit

- P0: none.
- P1: mobile navigation did not move focus into the open drawer or contain
  keyboard focus. Fixed with dialog semantics, initial focus, a Tab loop,
  Escape handling, focus restoration, and scroll-lock cleanup.
- P1: the scheduler trusted hidden visit/date/time values and allowed edits
  while a request was pending. Fixed with server-side visit/date/time
  validation, a pending fieldset, and a disabled Back action while pending.
- P2: the floating mobile CTA duplicated page-level hero CTAs on narrow Home
  and Reviews layouts. Fixed with explicit mobile-CTA stop regions.
- P2: schedule headings and the Reviews distribution grouping had incomplete
  semantics. Fixed with a valid heading hierarchy and labeled group semantics.

### Iteration 2: scheduling, accessibility, and metadata hardening

- P1: scheduling dates were based on the visitor device timezone and could
  drift around Sacramento midnight. Fixed by generating and validating dates
  in `America/Los_Angeles`, refreshing the available days, enforcing future
  business days within the 40-day horizon, and deriving year-inclusive labels.
- P2: focused Phone and Email fields did not announce the shared one-method
  guidance. Fixed by wiring the helper and live status IDs to both inputs.
- P2: direct phone validation accepted overlong values. Fixed with exact
  10-digit US normalization and an optional leading `+1`.
- P2: Formspree and the optional webhook had unbounded waits. Fixed with abort
  timeouts and a non-blocking post-success webhook that cannot reverse a
  Formspree acceptance.
- P2: `/schedule` requested a large social card without emitting route-specific
  Open Graph and X images. Fixed with a dedicated, inspected `1200x630` PNG
  design and complete image metadata.

### Iteration 3: serialized release verification

- A stale-server `ChunkLoadError` was reproduced while parallel agents were
  rewriting `.next`. This was isolated as a build-harness artifact, not a route
  defect. All builds were stopped, the project was rebuilt once, and a fresh
  production server was started on `4182`; `/schedule` then rendered at every
  tested width with no error shell, failed route, or browser log entry.
- No actionable P0/P1/P2 issue remained after the serialized pass.

## Final interaction and layout checks

- All three routes rendered at all seven viewport sizes with zero horizontal
  overflow and the correct title and H1.
- Reviews and Schedule expose `aria-current="page"`; Home section links expose
  `aria-current="location"` after the smooth scroll settles.
- Mobile navigation focuses Care on open, wraps backward to Book online,
  wraps forward to Care, closes on Escape, restores focus to the trigger, and
  releases body scroll lock.
- Scheduler step headings receive focus after each transition. Back restores
  the time step. Urgent care preserves a call-first path.
- Name-only remains disabled; a partial phone remains disabled with recovery
  guidance; name plus phone enables; name plus email enables. No appointment
  request was submitted.
- Post-fix automated accessibility scans returned zero violations on Home,
  Reviews, and Schedule. Final browser warnings/errors: none.
- `/`, `/reviews`, `/schedule`, `/robots.txt`, and `/sitemap.xml` return `200`.
- Schedule Open Graph and X tags include route-specific `1200x630` PNGs with
  dimensions, content type, and descriptive alt text.

## Automated gates

- Unit tests: `24/24` passed.
- ESLint: passed with zero warnings.
- TypeScript: passed with `npx tsc --noEmit`.
- Next.js production build: passed; all 16 static routes generated.
- Production dependency audit: `0` vulnerabilities.
- `git diff --check`: passed.

## Final result

final result: passed
