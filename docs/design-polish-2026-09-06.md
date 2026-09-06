# Design and interaction polish — September 6, 2026

The existing palette, typography, verified photography and page structure remain
the design foundation. This pass improves visual cues and interaction quality
without introducing an animation library or changing clinical copy.

## Changes

- Existing service/technology icons now provide consistent visual anchors;
  new-patient information has coverage, payment and family icon cues.
- Directional arrows and 44px link/filter targets clarify navigation.
- Restrained button/link feedback, shared icon treatments, dark-surface focus
  rings, narrow-screen wrapping and forced-color boundaries.
- One responsive eager hero replaces two eager variants. Above-fold content
  never hides during hydration; below-fold reveals fail open without observer
  support, show immediately on keyboard focus, and work in short viewports.
- Reduced motion resets delays as well as durations. No perpetual decorative
  animation or persistent will-change compositing layers.
- Mobile modal contains its Close control, isolates background content and
  cleans up focus/scroll locks when crossing the desktop breakpoint.
- Booking success/reset restores heading focus; expired day selections block
  submission and provide an explicit recovery action.
- Office and doctor image sizes respect their container caps.

## Validation

63 automated tests, ESLint, TypeScript and production build pass. The SEO crawl
passes for all 15 indexable pages plus private/404 behavior. An independent
review found a tall-section reveal threshold issue; it was fixed before release.

Production-build browser checks cover all 16 pages at 320, 390, 768, 1024 and
1440px (80 combinations): no document overflow, missing H1 or broken visible
images. Screenshots inspected for home, services, narrow new-patient content,
mobile navigation and scheduling. Reduced-motion short-screen FAQ keyboard
activation leaves no invisible reveals or transition delays. All six review
filters have correct pressed states and live result counts. Mobile Shift+Tab/Tab
wrap within the dialog; Escape returns focus and restores background access.

Booking UI was tested in a separate local fixture with a two-second stubbed
Server Action: pending controls disable, error preserves retry, success receives
focus, reset focuses the first step, and phone-only/email-only paths enable.
No real appointment was submitted. The fixture is outside the repository and
cannot be included in the release.

## Asset budget

Compared with the previous production build, same gzip methodology:

| Asset | Before | After |
| --- | ---: | ---: |
| JavaScript | 194,997 bytes | 195,397 bytes |
| CSS | 11,604 bytes | 12,063 bytes |
| Fonts (actual bytes) | 70,524 | 70,524 |
| HTML gzip | 29,269 bytes | 33,042 bytes |

The homepage has one eager, high-priority image. The separate Technology image
remains lazy. The icon additions add mostly server-rendered markup; JavaScript
increases by 400 bytes. One cold local mobile run at 390px, 150ms latency,
200KB/s download and 4x CPU throttling observed LCP/FCP of 952ms. This is a
single local lab observation, not a field Core Web Vitals score.

## Evidence limits

Viewport emulation is not testing every physical device or browser. Automated
geometry checks complement visual/keyboard checks; they do not prove complete
WCAG conformance. Production delivery must be matched to the release commit and
checked on the canonical domain after deployment.
