# The Saviour — research and assumption register

Reviewed 15 November 2026. Method: secondary review of original published studies and official service descriptions. No interviews, surveys, shadowing, field observations, or participant sessions for this product have been conducted. This is secondary user research; the personas remain hypotheses.

## User evidence and design implications

| Original source | What was actually studied | Finding used here | Design implication (our inference) | Limit |
| --- | --- | --- | --- | --- |
| [Rochat et al., 2022, JMIR Pediatrics and Parenting](https://pediatrics.jmir.org/2022/1/e25540/), DOI 10.2196/25540 | Laboratory tasks with 17 parents using InfoKids in a Geneva pediatric ED context | Fourteen usability problems were identified; seven were rated major or catastrophic despite favorable overall usability ratings | Observe specific tasks and recovery, not appearance or aggregate satisfaction alone | Different product, population, language and service; no outcome transfers to this prototype |
| [Romano et al., 2016, Sensors](https://www.mdpi.com/1424-8220/16/3/406), DOI 10.3390/s16030406 | A different emergency-notification application, evaluated in a simulated accident and through emergency-expert interviews | Contextual evaluation and domain-expert input formed part of the design process | Plan scenario-based tasks and staff workflow research before treating the service model as validated | Older study; not Indian service validation and not evidence of this app's performance |

The prototype's distinct delivery, acceptance and acknowledgement states are a design hypothesis informed by the handoff problem. Neither study establishes the proposed police role or hospital-routing feasibility. No borrowed participant count or success percentage is presented as our own research.

## Competitor and adjacent-service review

Capability comparison is based on published descriptions, not hands-on competitive usability testing. “Not assessed” does not mean “missing.”

| Service | Primary source and described capability | Relevance | What was not assessed |
| --- | --- | --- | --- |
| ERSS 112 | [Ministry of Home Affairs](https://www.mha.gov.in/emergency-response-support-system-erss): multi-channel distress intake and dispatcher routing with incident information | Existing institutional emergency workflow; design should respect its handoffs | Usability, local response time, API access and integration terms |
| 112 India | [C-DAC's publisher listing](https://play.google.com/store/apps/details?id=in.cdac.ners.psa.mobile.android.national): location-bearing messages, calls and request-status tracking | Location and tracking are existing capabilities, not this concept's invention | Current installed interaction flow, accessibility and comparative ease |
| National Ambulance Service | [NHM](https://nhm.gov.in/nhm_live/index1.php?lang=1&level=2&sublinkid=1217&lid=189): 108 for emergency response and 102 largely patient transport | Relevant Indian service pathway, rather than a parallel fictional fleet | Local availability and workflow implementation |
| RapidSOS, adjacent US platform | [Official coordination overview](https://rapidsos.com/emergency-response-coordination/): incident and location data to emergency communication centers | Institutional data integration is an adjacent precedent | Suitability in India, authorization and comparative UI quality |

**Positioning:** a concept exploring clearer handoff language and recovery. There is no evidence of market uniqueness, superiority over 112 India, reduced response times, or commercial demand.

## Provisional personas

| Persona hypothesis | Goal and context | Possible difficulty | Proposed design response | Evidence needed |
| --- | --- | --- | --- | --- |
| P1: adult bystander using a phone | Communicate a pickup point and understand whether help is assigned | Confusing delivered with accepted; uncertainty while waiting | Distinct states, editable location, visible call alternative | Local user interviews and observed comprehension tasks; test language and digital familiarity |
| P2: hospital coordinator | Review a request and associate a vehicle | Losing a vehicle draft; unclear responsibility across handoffs | Accept-before-dispatch gating, retained draft, history | Authorized coordinator interviews and workflow observation; actual clinical and availability rules |
| P3: traffic coordinator | See a proposed route alert and record acknowledgement | Treating arrival as proof the alert was seen | Explicit acknowledgement event; arrival without acknowledgement remains possible | Authorized staff validation of whether this role and workflow are appropriate |

No invented names, demographic precision, quotations, biographies, or empathy-map claims are used to make these assumptions look researched.

## Journey and uncertainty

| Stage | Person's question | Prototype evidence | Unresolved question |
| --- | --- | --- | --- |
| Draft | Can I correct where help is needed? | Editable sample pickup; retained role-switch draft | How should location be verified in practice? |
| Review/send | Was the information actually delivered? | Separate review, failed-send and simulated-sent patient screens | What service acknowledgment and retry semantics will exist? |
| Waiting | Has a provider accepted? | Explicit waiting state and no-response recovery | What escalation and timeout policy can a real service support? |
| Dispatch | Which vehicle is assigned? | Hospital accepts then supplies a sample identifier | Availability, authorization and clinical routing remain unknown |
| Traffic | Was the route alert acknowledged? | Separate acknowledgement event | Is this operationally viable and legally authorized? |
| Arrival | What happened to the request? | Completed details and history remain visible | What should closure, retention and correction mean in a real service? |

## Next research

Use USABILITY-TEST.md for an initial comprehension study, then recruit authorized hospital and traffic staff for discovery before broadening the service. Record consent, actual observations and contradictory findings. The repository includes an empty results sheet; no participant finding is filled in by the agent.
