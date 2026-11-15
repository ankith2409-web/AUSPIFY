# Task 02 — Landing page UI design

**Product:** THE SAVIOUR, a fictional emergency coordination UI/UX concept. Open `index.html`; no installation or build is needed. This landing page is a high fidelity responsive implementation, not a working emergency service.

## Design inspiration and scope

- [Task 1 wireframes](https://www.figma.com/design/OoIJIHcTxCjIO37I3FHNom) supplied the patient status model and clear failure language. The landing page presents that work to a first-time visitor.
- [GOV.UK guidance on writing for user interfaces](https://www.gov.uk/service-manual/design/writing-for-user-interfaces) emphasizes plain language and designing for people under stress. This informed short headings, explicit prototype disclosures, and specific actions. This is desk research, not user testing.
- A custom high fidelity visual concept established the civic editorial direction: white and pale teal canvas, navy text, teal action, restrained red call emphasis, phone preview, three-step sequence, and a three-role section.

## Required workflow

| Brief step | Evidence |
| --- | --- |
| Research design inspiration | Task 1 design and GOV.UK interface content guidance. |
| Create page layouts and sections | Header, hero, idea, three-step flow, roles, interactive preview, disclosure, footer. |
| Apply typography and color | Serif display type, system sans UI, consistent navy/teal/red tokens and readable hierarchy. |
| Design calls to action | Hero links to the working on-page preview and the steps; direct `tel:112` for real emergencies; source link to Task 3. |
| Build high fidelity mockup | Responsive HTML/CSS implementation with a phone composition and interactive preview states. |

## Evaluation

The page uses semantic sections, skip navigation, visible keyboard focus, mobile navigation, labelled preview tabs with arrow-key support, and a practical mobile layout. The preview is deliberately local and states that no hospital was contacted. It does not imply a live ambulance, a response time, or a partnership.

### Verification protocol

At desktop and 375 px widths, check heading hierarchy, visual spacing, navigation, CTA destinations, role section and footer. Open and close the mobile menu. Activate each preview tab by mouse and keyboard; test the arrow keys. Verify the waiting preview's Call 112 link. Check that the primary CTA reaches the preview. Run `node --check app.js`.

The internship submission asks for source code, screenshots, and a repository link; a video is optional. Browser screenshots should be captured after final review. No participant usability test has been performed.

