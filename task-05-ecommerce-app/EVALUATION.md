# Task 5 — client acceptance review

Reviewed 15–16 November 2026. **Verdict: reviewable prototype; task completion remains conditional.** The brief explicitly requires usability testing, and no participant sessions have been conducted. A prepared protocol does not satisfy that step. Participants: **0**.

Reference: the full 13-page `UI_UX DEVELOPMENT TASK LIST(1).pdf`; Task 5 workflow p. 10, shared criteria and submission p. 12. Original source, editable wireframes and actual completed-screen screenshots are included. Video is optional.

## Seven evaluation criteria

| Criterion | Evidence | Client assessment |
| --- | --- | --- |
| Task Completion | Journey/recovery map, editable board, listing/detail, bag/checkout and interactive flow | Four design/prototype steps delivered; participant-testing step pending |
| Code Quality | Original dependency-free source, validated stored quantities, centralized totals and in-memory checkout draft; syntax check passed | Reviewed within prototype scope |
| Website Responsiveness | Desktop and direct 390 × 844 px viewport checks; earlier 337 px CSS-width zoom checks | Checked catalog and checkout without horizontal overflow; physical devices untested |
| User Interface Design | Consistent type, clear field labels, visible error borders, focus recovery, shipping policy and 44 px quantity targets | Internally reviewed; customer comprehension unmeasured |
| Creativity & Implementation | Original vector catalog and coherent fictional homeware identity with working interaction states | Delivered; no conversion or uniqueness claims |
| Professional Presentation | README, DESIGN.md, editable SVG, actual screenshots and honest study status | Delivered |
| Project Functionality | Discovery → detail → bag → checkout → sample confirmation and recovery | Passed recorded internal checks |

## Actual internal checks

Live URL: https://auspify-task-05.vercel.app/. Chromium-based browser using the supported browser Playwright surface. The final pass used a direct 390 px viewport, reset afterward. These engineering checks are distinct from human usability testing.

| Check | Observation | Result |
| --- | --- | --- |
| Page identity, meaningful content and no framework error overlay | Correct catalog and interactive screens rendered | Pass |
| Filter/sort | Decor sorted ascending starts with Glass Vase | Pass |
| Image navigation | Product illustration opens the matching detail | Pass |
| Quantity/focus | Quantity and summary update; focus stays on increase | Pass |
| Totals/shipping | Two vases: $192 + $18 = $210; earlier four-vase check made shipping complimentary at $384 | Pass |
| Empty checkout | Required-field errors appear and focus moves to email | Pass |
| Whitespace validation | Earlier pass rejected a whitespace-only first name | Pass |
| Bag → checkout | Sample city/name remain; saved screenshot shows the retained sample email | Pass |
| Sample completion | Explicit no-order/no-payment confirmation and cleared bag | Pass |
| Empty state | Browse recovery remains available | Pass |
| Phone-sized viewport | Catalog and checkout scroll width equal viewport width at 390 px | Pass |
| Console | No warnings/errors in the final browser pass | Pass |

Command: `node --check task-05-ecommerce-app/app.js`. No new unit-test suite is claimed for this task. Exact final browser assertions are saved in qa-observations.json. Earlier cloud-browser inspection redacted email values; draft assertions used non-sensitive sample name/city values and screenshot evidence instead.

## Findings and revisions

Checkout previously discarded entries on a return from the bag. Quantity changes lost keyboard focus. Product artwork was not clickable, shipping policy was less explicit and quantity targets were small. Those issues are corrected. Original wireframes, a user-journey/decision record, a ready study protocol and submission screenshots are now self-contained in the project.

## Actual screenshot evidence

| File | State |
| --- | --- |
| [Catalog](screenshots/05-catalog.jpg) | Six objects and discovery controls |
| [Detail](screenshots/05-detail.jpg) | Glass Vase and shipping rule |
| [Bag](screenshots/05-bag.jpg) | Quantity and correct summary |
| [Checkout](screenshots/05-checkout.jpg) | Retained sample details |
| [Validation](screenshots/05-validation.jpg) | Empty-field recovery |
| [Empty bag](screenshots/05-empty.jpg) | Recovery link |
| [Confirmation](screenshots/05-confirmation.jpg) | Explicit simulation outcome |
| [Mobile catalog](screenshots/05-catalog-mobile.jpg) | Actual 390 px browser viewport |
| [Mobile checkout](screenshots/05-checkout-mobile.jpg) | Actual 390 px browser viewport |

All are actual browser captures using invented sample information. They are not participant observations or physical-phone screenshots.

## Remaining acceptance gate

Conduct the sessions in USABILITY-TEST.md, record actual observations in participant-results.csv, revise observed problems and retest affected tasks. Also untested: screen readers, physical phones, other browser engines, storage-disabled behavior and conflicting simultaneous bag edits. The bag-storage fallback is implemented but not claimed as browser-tested.

A client can review the working prototype now. They should not be told that all workflow requirements are finished or that the design is error-free.

## Submission evidence refresh · 20 November 2026

The checkout fills only empty fields with fictional details, keeps existing entries, and explains that finishing clears the bag. The bag labels the total as including shipping. Participant testing remains outstanding.

The screenshots below were recaptured from the revised prototype. Earlier evidence files are historical.

- [05-bag.jpg](screenshots/05-bag.jpg)
- [05-checkout-mobile.jpg](screenshots/05-checkout-mobile.jpg)
- [05-checkout.jpg](screenshots/05-checkout.jpg)
- [05-validation.jpg](screenshots/05-validation.jpg)
