# Task 6 — The Saviour product design case study

A documented emergency-coordination concept with two interactive explorations and explicit evidence limits.

[Live demo](https://auspify-task-06.vercel.app/) · [Live case study](https://auspify-task-06.vercel.app/case-study.html) · [Wireframes](wireframes.svg) · [Research](RESEARCH.md) · [Evaluation](EVALUATION.md)

**Client verdict, 16 November 2026:** reviewable case study and working local prototypes. Secondary user/competitor research is documented. Firsthand research, persona validation and the proposed staff workflow remain unvalidated. No live service readiness or unconditional client acceptance is claimed.

## Brief coverage

Reference: page 11 of `UI_UX DEVELOPMENT TASK LIST(1).pdf`; shared criteria and submission on page 12.

| Required workflow | Evidence | Status |
| --- | --- | --- |
| User and competitor research | Original published user studies, official service descriptions and evidence register | Secondary research delivered; firsthand validation pending |
| Personas and user journeys | Three hypothesis personas; patient/service journeys | Delivered as provisional |
| Wireframes and high fidelity screens | Original editable SVG board and rendered prototypes | Delivered |
| Interactive prototypes | Three-role browser-local demo and patient delivery-state experiment | Delivered |
| Complete process and outcomes | case-study.html, DESIGN.md, EVALUATION.md and internal QA | Documented within concept scope; participant outcomes unmeasured |

The PDF does not explicitly mandate a number of interviews or one exclusive design-file format. This does not justify inventing evidence. Other products' user studies are clearly distinguished from research with this product's users.

## Review the product

1. Create a sample request as Patient.
2. Accept it as Hospital and enter a sample vehicle identifier to dispatch.
3. Acknowledge the route as Traffic control.
4. Mark arrival as Hospital, then return to Patient. The completed details/history remain until an explicit restart.
5. Repeat without acknowledging the route. Arrival must not invent traffic receipt.

`?role=patient`, `?role=hospital` and `?role=traffic` can be opened in separate tabs on the same origin/profile. Browser storage shares updates between these tabs. There is no cross-device service, authentication, GPS, real map, hospital/police integration or actual dispatch. Use sample information only.

`case-study.html#prototype` is a separate memory-only patient experiment for review, failed send, simulated delivery, acceptance and no response. It does not share the role demo's request. It explores recovery beyond the model's successful handoff path.

## Run and verify

From the repository root, with Node.js installed:

```sh
npx --yes serve task-06-product-case-study -l 8766
node --test task-06-product-case-study/tests/*
```

Open `http://localhost:8766`. There is no build step. From this folder, serve `.` and run `node --test tests/*`. Source, editable wireframes and actual screenshots are included for submission. USABILITY-TEST.md and participant-results.csv represent a prepared study with **zero completed participant sessions**.
