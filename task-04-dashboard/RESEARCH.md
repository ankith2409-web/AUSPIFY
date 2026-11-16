# Task 04 - Research and design decisions

## Question and method

How should an operations user move from a summary to the records that explain it, without losing context or exporting a different selection?

This is desk research, inspection of the existing prototype, and an internal browser walkthrough. No operations staff were interviewed. The workflow and information priorities below are design hypotheses; no measured productivity improvement or user endorsement is claimed.

## Primary-source research

Sources were opened and read on 16 November 2026.

| Source | Relevant guidance, paraphrased | Design inference and implementation |
| --- | --- | --- |
| [GOV.UK Brand Guidelines: Dashboards](https://brand.design-system.service.gov.uk/data/dashboards/) | Dashboards suit high-level indicators. Clear hierarchy and concise guidance help people explore. Accessibility across devices needs attention. | Use four summary cards, then two charts, then recent records. Separate Overview, Incidents, Facilities, and Reports. Label the fixed sample period and explain metric meaning. This is an archived prototype, so no automatic refresh is implied. |
| [W3C WAI: Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/) | Data tables need structural header/data relationships; captions identify their subject, and scope can clarify header direction. | Use native tables with column and row headers and captions. Place wide records in a named, keyboard-focusable horizontal scroll region. Give the chart a readable table alternative. |

These are source-informed design decisions, not claims that those organizations evaluated or endorsed this dashboard. No dashboard template or third-party chart component was copied.

## Information structure

| Section | Question answered | Next action |
| --- | --- | --- |
| Overview | How many sample incidents belong to this period, and what is their distribution? | Inspect records or facility assignments |
| Incidents | Which records match my range, search, and status? | Open detail or export the complete selection |
| Detail | What does this particular record contain? | Return with filters and page preserved |
| Facilities | How many selected-period records are assigned to each sample facility? | Open that facility's records |
| Reports | Exactly which records will be downloaded? | Export all matches as CSV |

The time range applies across all sections. Search and status are shared between Incidents and Reports. Overview and Facilities summarize the complete date cohort; their captions state this scope. A facility action sets a facility search and clears status so its count and results agree.

## One dataset and explicit definitions

The source contains 93 deterministic generated examples (three per January date) plus eight preserved example incident IDs. There is no randomness, current-time dependency, real patient data, or external data request. Record timestamps use fictional local time; no timezone conversion is applied.

| Measure | Definition |
| --- | --- |
| Incidents | Number of records created inside the selected inclusive date range |
| Acceptance rate | Records in Accepted, In progress, or Completed divided by all selected-period records |
| Median response | Median finite sample minutes to provider response; waiting records are excluded |
| Open cases | Selected-period records not marked Completed; this is a cohort count, not a real-time queue |
| Incident volume | Daily counts for 18-24 January, or non-overlapping January date groups 1-7, 8-14, 15-21, 22-28, 29-31 |
| Category distribution | Count and share of the same selected-period records; bar width equals share of the total |
| Facility count | Selected-period records assigned to that named facility; Waiting records are unassigned |
| CSV | All date/search/status matches, in the same newest-first order as the register, independent of pagination |

| Range | Records | Accepted or later | Acceptance rate | Median response | Not completed |
| --- | ---: | ---: | ---: | ---: | ---: |
| 18-24 January | 29 | 25 | 86.2% | 16 minutes | 17 |
| January | 101 | 86 | 85.1% | 16 minutes | 59 |

Monthly groups have different durations; the final group is explicitly labeled as three days. They represent counts, not rates or forecasts. The chart starts at zero and exposes every value as text and a table. Category percentages round independently to one decimal place and can sum to 99.9% or 100.1%.

## Refined after inspection

| Original behavior | Refinement |
| --- | --- |
| Month cards coexisted with a weekly category comparison and unrelated illustrative aggregates | Derive the complete date cohort from the incident records for every summary widget |
| Category bar length used a different denominator from its percentage | Use count / cohort total for the visible percentage and bar |
| Export always downloaded eight examples | Export the full active date/search/status selection; show count and disable empty export |
| A status change dropped keyboard focus to the document body | Restore the changed control; preserve search caret |
| Detail had no current sidebar section | Keep Incidents selected; preserve filters and register page on return |
| Mobile menu lacked Escape recovery | Use a non-modal navigation disclosure with expanded state, Escape, focus return, and outside-focus closing |
| Pagination left the view at the bottom of the new page | Move focus and scroll to the beginning of the new results page |
| Skip link was treated as a hash route | Move focus to the current heading without replacing its section |

## Accessibility and validation scope

Labels, landmarks, focus feedback, text status labels, row/column headers, a skip link, chart text/table alternatives, large controls, contained table overflow, and reduced-motion styles were inspected. The application uses native controls rather than an ARIA application menu or custom select. The mobile navigation is a non-modal disclosure, not a dialog.

Nine automated regressions test fixture integrity, inclusive dates, totals, distributions, median calculation, filtering, CSV quoting, export scope, and safe text interpolation. Twenty-one internal browser checks cover the working interactions and responsive layouts. The downloaded report for January + Completed + Riverside General contained exactly 11 data rows; that actual artifact is preserved in `evidence/`.

No participant usability sessions, screen-reader sessions, real service integration, or full WCAG certification were conducted. These limits do not remove the completed prototype work requested by the brief.
