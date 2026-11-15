# Form & Field — design record

## Problem and scope

Design a small e-commerce app whose customer can understand an object and its total cost before trying checkout. This is a fictional catalog and a design hypothesis; no customer interviews or merchant analytics were supplied. The assignment asks for UI/UX and an interactive prototype, so live payment and fulfilment are outside this submission.

## Journey

| Stage | Customer question | Interface response | Recovery |
| --- | --- | --- | --- |
| Browse | Which objects fit my space? | Six cards with category filters and price sorting | Return to all objects; selected filter stays explicit |
| Inspect | What am I buying? | Illustration, description, material, size, price and shipping rule | Shop breadcrumb; image and product name both open details |
| Bag | How many, and what will it cost? | Quantity, line totals, shipping and total | Decrease or remove; empty-state link to collection |
| Checkout | Can I correct my details? | Required labels, local validation and retained page draft | Bag → checkout restores entries; first invalid field receives focus |
| Confirm | Was a real order created? | Explicit sample confirmation and cleared bag | Return to collection |

[Editable low fidelity board](wireframes.svg). The board contains discovery, detail, bag, checkout, validation and confirmation frames. It was created during this audit to make the design structure reviewable; it is not evidence of historical research or earlier iterations.

## Design decisions

- Serif titles and restrained olive actions suit a homeware collection; the main task remains visible without gradients or decorative dashboard widgets.
- Original vector illustrations keep a consistent catalog. They are illustrations, not product photography or evidence of real stock.
- Shipping is disclosed on the detail and summary screens. A $300 subtotal receives complimentary shipping; otherwise the illustrative charge is $18.
- Filtering, sorting and quantity changes retain focus after rendering. Quantity controls have a 44 px minimum target and announce the result.
- Required fields reject whitespace-only text. Error borders identify the affected controls and the message directs attention to the first field needing correction.
- Checkout drafts remain only in page memory. A refresh clears the draft; personal details are not written into the persisted bag.
- The design collapses its grid and checkout columns at narrow widths. Actual tested viewports and limitations are recorded in EVALUATION.md.

## Audit iterations

| Finding in the previous live version | Revision | Evidence to verify |
| --- | --- | --- |
| Bag → checkout discarded entered values | Keep an in-memory draft across navigation | Enter sample email and address, go back and return |
| Quantity change left focus on the body | Restore a relevant quantity control or heading | Keyboard focus after increase and after removal |
| Product artwork was not a navigation target | Link the catalog illustration to detail | Open a product through the illustration |
| Small quantity controls and hidden delivery threshold | 44 px targets and explicit shipping rule | Inspect bag and detail at desktop and narrow sizes |
| Required wireframes and screenshot evidence missing | Add source board and current live captures | Open wireframes.svg and screenshots/ |

## Acceptance limits

The internal audit can demonstrate state transitions and rendered behavior. It cannot establish whether intended customers understand the flow. Complete the observed sessions in USABILITY-TEST.md before claiming the final workflow step is complete.
