# Task 02 — Design specification

## Purpose and hierarchy

Help a first-time visitor understand the concept and explore its proposed request flow. The primary CTA is **Explore the prototype**; the secondary CTA is **See how it works**. Calling 112 is kept visibly distinct because it serves a real emergency need.

## Typography

| Role | Family | Size / treatment |
| --- | --- | --- |
| Hero heading | Georgia / Times New Roman serif | Fluid 52–88 px desktop; 48–68 px mobile; tight display leading. |
| Section headings | Same serif | Fluid 36–57 px; 1.12 line height. |
| Body and navigation | Inter if available, then system sans | 16 px base / 1.5; larger hero introduction; compact UI labels. No external font download required. |
| Actions | System sans | 14 px, weight 750, min 50 px high for hero actions. |
| Supporting labels | System sans | 10–12 px, deliberate hierarchy; not the only source of important status information. |

## Color and spacing

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#102c3a` | Main reading color and footer. |
| Teal | `#087b78` | Main exploratory CTA, state tabs, informative structure. |
| Red | `#c63f3f` | Emergency calling emphasis and prototype warning accents. |
| Muted text | `#52676f` | Supporting explanations. |
| Canvas | `#f8fbfa` | Page surface. |
| Dividers | `#d6e2e1` | Section/component separation. |
| Gutters | 22 px mobile; fluid 4 vw up to 76 px | Align sections consistently. |
| Section padding | Fluid 65–110 px | Separate the main narrative sections. |
| Corners | 4–5 px UI controls | Restrained, consistent treatment. |

## Reusable components

Header/logo, primary and secondary links, phone composition, ordered steps, role columns, preview tabs and panel, closing call-to-action band, footer.

## Responsive behavior

- Above 960 px: split hero and preview, horizontal navigation.
- At or below 960 px: stacked hero/preview, single-column idea section.
- At or below 700 px: menu disclosure, stacked step/role groups, full-width hero actions.
- At 320 px and 375 px: readable document reflow verified; the phone fits its available width.
- Reduced-motion preference disables smooth scrolling.

## Interaction and keyboard behavior

- One selected preview tab is in the Tab sequence. Left/Right arrows wrap between states; Home/End select the first/last.
- Advancing from inside the preview focuses the replacement panel.
- Menu exposes expanded state and controlled navigation ID; Escape closes it and returns focus.
- Source links are kept in the submission documentation. The visitor-facing walkthrough link opens a local bundled prototype.
- All telephone links are explicit and were inspected without placing a call.


