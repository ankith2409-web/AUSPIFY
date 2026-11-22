# Task 5 — Form & Field

A fictional homeware shopping prototype: browse, filter, inspect an object, edit a bag and try checkout using sample details.

[Live prototype](https://auspify-task-05.vercel.app/) · [Wireframes](wireframes.svg) · [Design record](DESIGN.md) · [Evaluation](EVALUATION.md) · [Participant protocol](USABILITY-TEST.md)

**Client verdict, 16 November 2026:** reviewable design and working prototype. The task is not fully complete against the brief: participant usability testing has not been conducted. Sessions completed: **0**. Internal browser QA is not participant research.

## Brief coverage

Reference: page 10 of `UI_UX DEVELOPMENT TASK LIST(1).pdf`; shared evaluation criteria and submission instructions on page 12.

| Required workflow | Evidence | Status |
| --- | --- | --- |
| User journeys and wireframes | DESIGN.md journey/recovery map; editable original wireframes.svg | Delivered |
| Listing and detail screens | Six products; photo-style product imagery, filters, sorting and specifications | Delivered |
| Cart and checkout | Quantity/removal, totals, shipping rule, validation and explicit sample confirmation | Delivered |
| Interactive prototypes | Original HTML, CSS and JavaScript, deployed on Vercel | Delivered |
| Conduct usability testing | Ready-to-run USABILITY-TEST.md and empty participant-results.csv | **Actual sessions pending** |

## Review the flow

1. Filter to Decor and sort by price. Open Glass Vase through its image.
2. Add it to the bag; adjust quantity and remove it to inspect recovery.
3. Add an object again, continue to checkout and submit empty fields.
4. Enter sample details, go back to Bag and return. Entries remain in page memory.
5. Submit valid sample details. The confirmation states that no actual order or payment occurred.

The bag persists in browser storage. Checkout details stay only in page memory and clear on confirmation or refresh. No payment, inventory, account or fulfilment service is connected. USD prices, delivery terms and country choices are illustrative.

## Run locally

With Node.js installed, from the repository root:

```sh
npx --yes serve task-05-ecommerce-app -l 8765
```

Open `http://localhost:8765`. From this folder, serve `.` instead. There is no build step or project dependency installation. This avoids relying on the Windows `py` launcher.

Source, editable SVG wireframes and real completed-screen screenshots are included for submission. The brief discusses design tools but does not require an exclusive export format. EVALUATION.md maps all seven criteria to actual evidence and remaining gaps; no inaccessible Figma file is claimed as verified.

Catalog images are generated concept imagery, stored locally as WebP. Each product has a full image and a smaller thumbnail for narrow layouts and the bag.
