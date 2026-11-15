# The Saviour — process and decision record

## Define

The design problem is uncertainty during an emergency handoff: draft, delivery, provider acceptance, dispatch and route acknowledgement mean different things. The concept explores how to express those distinctions. It does not establish that a new emergency platform is needed or operationally feasible.

## Discover and frame

[RESEARCH.md](RESEARCH.md) links original user studies and official service descriptions. Their relevance and limits are recorded separately. Bystander, hospital-coordinator and traffic-coordinator personas are hypotheses. No firsthand research is claimed.

## Structure and prototype

[wireframes.svg](wireframes.svg) is an original editable six-frame board, added during this review. It maps intake, hospital dispatch, traffic/completion, review, waiting and recovery. It is a newly documented structural exploration, not a fabricated historical artifact.

Two prototypes serve different questions:

| Surface | Question | State and limitations |
| --- | --- | --- |
| index.html, demo.js, model.js | Can a reviewer follow one request across three roles? | Explicit gated actions; browser-local shared state; no authentication or external service |
| case-study.html, app.js | Can the patient distinguish failed send, waiting, acceptance and no response? | Reviewer-controlled simulation in page memory; no actual delivery attempt |

The high fidelity UI uses navy text, restrained teal status accents, red request actions and labeled statuses. Labels carry meaning independently of color. Desktop role navigation becomes a compact row on narrow layouts. The full-size demo reset remains reachable on mobile. Exact responsive checks are recorded in EVALUATION.md.

## Revise from internal review

| Observed issue | Decision | Expected outcome |
| --- | --- | --- |
| After arrival, Patient showed a new-request form while header/history still showed completion | Retain completed card, five handoff steps and explicit new-demo button | Completion remains understandable and reversible |
| Role switches discarded unfinished input | Preserve patient and vehicle drafts in page memory | Reviewers can inspect another role without retyping |
| Arrival could be mistaken for traffic receipt | Derive receipt from an actual acknowledgement event | No invented acknowledgement if the vehicle arrives first |
| Changing roles was not reflected in the URL | Update the role query parameter and focus workspace heading | Refresh stays on the selected workspace; keyboard context is clear |
| Wireframes depended on an external historical design link | Include an editable original board in this project | Reviewer can inspect source without an account |
| Broad verification language exceeded documented evidence | Record actual internal checks separately from participant research | Claims can be traced to the test evidence |

## Outcomes and next loop

Internal checks verify prototype behavior only. A polished interface and passing model tests cannot establish usability under stress, clinical safety, or service performance. Conduct the prepared participant study, validate staff workflow assumptions and revisit the service model before planning a live product. No response-time, conversion, clinical or participant-success improvement is claimed.
