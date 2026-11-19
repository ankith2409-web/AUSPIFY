# Task 6 — client acceptance review

Reviewed 15–16 November 2026. **Verdict: reviewable case study and working local prototypes, with conditional acceptance.** Secondary user/competitor research is documented. Firsthand research, persona validation and validation of the proposed hospital/traffic workflow remain outstanding. Participant sessions: **0**.

Reference: the full 13-page `UI_UX DEVELOPMENT TASK LIST(1).pdf`; Task 6 workflow p. 11, shared criteria and submission p. 12. The brief requires research but does not prescribe a particular interview count or exclusive file format. Research from other products is not presented as our own participant evidence.

## Seven evaluation criteria

| Criterion | Evidence | Client assessment |
| --- | --- | --- |
| Task Completion | RESEARCH.md, three provisional personas, patient/service journeys, editable board, two prototypes and process/outcomes | Deliverables present; firsthand and operational assumptions remain unvalidated |
| Code Quality | Pure gated state model, escaped dynamic content, retained drafts and seven passing Node tests | Reviewed within local-prototype scope |
| Website Responsiveness | Desktop and direct 390 × 844 px browser checks; earlier 337 px CSS-width check | Case study, patient form and completed state checked without page overflow |
| User Interface Design | Explicit handoff language, labeled forms, visible workspace focus and retained completed details | Internally reviewed; participant comprehension unmeasured |
| Creativity & Implementation | Original coordination interface and recovery study, with existing service capabilities acknowledged | Delivered; no superiority or novelty claim |
| Professional Presentation | Live case study, original SVG, source/evidence register, decisions and actual screenshots | Delivered |
| Project Functionality | Create → accept → dispatch → acknowledge → arrive, plus missing acknowledgement, cross-tab updates and recovery | Passed recorded prototype checks; no real dispatch |

## Actual internal checks

Live URLs: https://auspify-task-06.vercel.app/ and https://auspify-task-06.vercel.app/case-study.html. Chromium-based browser; supported Playwright surface. Final narrow check used a direct 390 px viewport, reset afterward. qa-observations.json contains the final browser assertions.

| Check | Observation | Result |
| --- | --- | --- |
| Page identity/content/overlay | Correct workspace and case study rendered without framework overlay | Pass |
| Patient draft | Sample pickup survives a role switch before submission | Pass |
| Vehicle draft | Sample identifier survives a role switch before dispatch | Pass |
| Action gates | Unsupported, incomplete and duplicate transitions rejected | Pass, automated |
| Normal handoff | Acceptance → dispatch → traffic acknowledgement → arrival | Pass, live and model |
| Arrival without acknowledgement | Completed details remain; no receipt is invented | Pass, live and model |
| Cross-tab update | Patient tab reflects acknowledgement from the other tab | Pass |
| Refresh and reset | Earlier pass checked stored completion/role; explicit clear resets unfinished draft | Pass |
| Patient-state recovery | Back retains pickup; failure retries from review; waiting and no response are distinct | Pass |
| Phone-sized viewport | Case study, intake and completed view have no horizontal page overflow at 390 px | Pass |
| Console | No warnings/errors in the final browser pass | Pass |

Command: `node --test task-06-product-case-study/tests/*` — **7 passed, 0 failed**, rerun after restoring the exact deployed source on Windows. Tests cover the journey, recovery-state separation, direct-call-link presence, invalid input/transitions, prior-state preservation and arrival without an invented acknowledgement. They are engineering checks, not participant sessions.

## Client-impacting revisions

- Arrival previously replaced the patient's completed details with another request form. Details/history now remain until explicit restart.
- Role switches discarded unfinished patient and vehicle entries. Drafts now remain in page memory.
- Arrival alone must not imply a traffic acknowledgement; receipt is derived from a recorded event.
- Narrow case-study navigation/table caused page overflow. Shrinking grid children and wrapping navigation fixed it; the final 390 px check also passed.
- Workspace focus now brings the new heading into view after an action; reset clears an unfinished draft.
- Original editable wireframes and research-to-design reasoning now live inside this project. Provisional personas and absent firsthand research are explicit.

## Actual screenshots

| File | Evidence |
| --- | --- |
| [Patient](screenshots/06-patient.jpg) | Intake after draft recovery |
| [Hospital](screenshots/06-hospital.jpg) | Accepted request and retained vehicle draft |
| [Traffic](screenshots/06-traffic.jpg) | Alert awaiting acknowledgement |
| [Arrival](screenshots/06-arrival.jpg) | Completion without invented receipt |
| [Completed](screenshots/06-completed.jpg) | Full acknowledged handoff |
| [Case study](screenshots/06-case-study.jpg) | Research, personas, wireframes, prototype and limits |
| [Failed send](screenshots/06-failed-send.jpg) | Patient recovery state |
| [No response](screenshots/06-no-response.jpg) | Separate patient recovery state |
| [Mobile intake](screenshots/06-patient-mobile.jpg) | Actual 390 px viewport |
| [Mobile completion](screenshots/06-completed-mobile.jpg) | Actual 390 px viewport |
| [Mobile recovery](screenshots/06-recovery-mobile.jpg) | Actual 390 px viewport |

These are actual internal browser captures with sample data, not physical-device or participant evidence.

## Remaining acceptance gate

Research is currently secondary. The personas and staff roles are hypotheses. Follow USABILITY-TEST.md to collect actual observations and challenge the service premise with authorized staff. No participant-success, satisfaction, response-time, clinical or dispatch improvement is claimed.

Also untested: physical devices, screen readers, other engines, storage-disabled/corrupt-data recovery and unreliable networks. No cross-device service exists. This is a functional UI/UX concept; operational readiness and institutional integration require separate work.

## Submission evidence refresh · 20 November 2026

The demo records arrival and traffic acknowledgement separately, including arrival without acknowledgement. The reset confirmation preserves the handoff if canceled. Firsthand research and participant validation remain outstanding.

The screenshots below were recaptured from the revised prototype. Earlier evidence files are historical.

- [06-arrival.jpg](screenshots/06-arrival.jpg)
- [06-clear-confirmation.jpg](screenshots/06-clear-confirmation.jpg)
- [06-completed-mobile.jpg](screenshots/06-completed-mobile.jpg)
- [06-completed.jpg](screenshots/06-completed.jpg)
