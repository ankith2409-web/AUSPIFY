const screens = [
  ["start", "Start"],
  ["details", "Details"],
  ["review", "Review"],
  ["waiting", "Sent / waiting"],
  ["assigned", "Assigned"],
  ["failed", "Not sent"],
  ["unanswered", "No response"],
];

const state = {
  screen: "start",
  location: "KR Puram, Bengaluru",
  category: "Medical emergency",
  contact: "",
  note: "",
};

const app = document.querySelector("#app");
const nav = document.querySelector("#screen-nav");
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);
const callLink = '<a class="call-link" href="tel:112">Call 112 instead ↗</a>';
const button = (label, next, secondary = false) =>
  `<button type="button" class="app-button${secondary ? " secondary" : ""}" data-screen="${next}">${label}</button>`;
const actions = (...items) => `<div class="app-actions">${items.join("")}</div>`;
const heading = (title, description) =>
  `<h2 class="app-title" tabindex="-1">${title}</h2><p class="app-subtitle">${description}</p>`;
const note = text => `<p class="app-note">${text}</p>`;
const reviewer = (...controls) =>
  `<div class="reviewer"><strong>REVIEWER CONTROLS · SIMULATION</strong>${controls.join("")}</div>`;
const reviewRow = (label, value) =>
  `<div><small>${label}</small><strong>${escapeHtml(value || "Not provided")}</strong></div>`;

const views = {
  start: () => `
    ${heading("Get help now", "Request support and follow each handoff.")}
    <button type="button" class="app-location" data-screen="details">
      <span class="pin" aria-hidden="true">⌖</span><span><strong>${escapeHtml(state.location)}</strong><small>Edit pickup location</small></span>
    </button>
    <span class="app-label">What do you need help with?</span>
    <div class="choice-group" role="group" aria-label="Emergency category">
      ${[
        ["Medical emergency", "Sudden illness or serious injury", "+"],
        ["Road accident", "Vehicle collision with injury", "↗"],
        ["Other / unsure", "Describe the situation next", "·"],
      ].map(([name, description, icon]) => `
        <button type="button" class="choice" data-category="${name}" aria-pressed="${state.category === name}">
          <span class="choice-icon" aria-hidden="true">${icon}</span><span><strong>${name}</strong><small>${description}</small></span>
          <span class="choice-indicator" aria-hidden="true">${state.category === name ? "●" : "○"}</span>
        </button>`).join("")}
    </div>
    ${actions(button("Continue request", "details"), callLink)}
    <p class="app-footnote">Concept only. No live location or emergency connection.</p>`,

  details: () => `
    ${heading("Request details", "Only share what is needed for this request.")}
    <form id="request-form">
      <div class="app-field"><label for="pickup">Pickup location</label><input id="pickup" name="location" required maxlength="120" autocomplete="street-address" value="${escapeHtml(state.location)}"></div>
      <div class="app-field"><label for="contact">Contact number</label><input id="contact" name="contact" required type="tel" inputmode="tel" pattern="[0-9+\\(\\) .\\-]{7,20}" title="Enter a phone number using 7 to 20 digits or standard phone symbols" value="${escapeHtml(state.contact)}"></div>
      <div class="app-field"><label for="context">Optional landmark or context</label><textarea id="context" name="note" maxlength="240" placeholder="Example: Gate 2, near the bus stop">${escapeHtml(state.note)}</textarea></div>
      ${note(`Selected: <strong>${escapeHtml(state.category)}</strong>. Details stay in this browser session only.`)}
      <div class="app-actions"><button type="submit" class="app-button">Review request</button>${button("Back", "start", true)}${callLink}</div>
    </form>`,

  review: () => `
    ${heading("Check before sending", "Make sure someone can find and contact you.")}
    <div class="review-list">${reviewRow("Pickup location", state.location)}${reviewRow("Help needed", state.category)}${reviewRow("Contact", state.contact)}${reviewRow("Optional note", state.note)}</div>
    ${note("The next step demonstrates a successful send state in this local prototype. Nothing is transmitted.")}
    ${reviewer('<button type="button" data-screen="failed">Simulate failed send</button>')}
    ${actions(button("Show request sent", "waiting"), button("Edit details", "details", true), callLink)}
    <p class="app-footnote">A real product must verify delivery from the dispatch service before showing “sent.”</p>`,

  waiting: () => `
    ${heading("Request sent", "Waiting for a response in this simulation.")}
    <div class="state-graphic" aria-hidden="true">✓</div>
    <p class="state-copy">The prototype now shows a delivered request. No hospital or emergency service has actually received it.</p>
    <ol class="timeline">
      <li><strong>Request delivered · simulated</strong>Pickup details are ready for review.</li>
      <li class="pending"><strong>Provider response pending</strong>No ambulance or arrival time can be confirmed yet.</li>
    </ol>
    ${reviewer('<button type="button" data-screen="assigned">Simulate acceptance</button>', '<button type="button" data-screen="unanswered">Simulate no response</button>')}
    ${actions(callLink)}
    <p class="app-footnote">Do not wait for this prototype in a real emergency.</p>`,

  assigned: () => `
    ${heading("Help is assigned", "Example handoff after a simulated acceptance.")}
    <div class="eta-card"><small>ILLUSTRATIVE ARRIVAL WINDOW</small><strong>8–12 min</strong><p>This is sample data, not a live estimate.</p></div>
    <ol class="timeline">
      <li><strong>Request delivered · simulated</strong>Pickup: ${escapeHtml(state.location)}</li>
      <li><strong>Hospital accepted · simulated</strong>Example: City Care Hospital</li>
      <li><strong>Ambulance dispatched · simulated</strong>Example vehicle: KA 03 AB 1234</li>
      <li class="pending"><strong>Traffic coordination · concept</strong>No police notification or route clearance was sent.</li>
    </ol>
    ${actions(button("Start a new example", "start", true), callLink)}
    <p class="app-footnote">Names, vehicle, and ETA above are fictional demonstration data.</p>`,

  failed: () => `
    ${heading("Request not sent", "No service received a request from this prototype.")}
    <div class="state-graphic error" aria-hidden="true">!</div>
    <p class="state-copy">In a real delivery failure, this message must be based on a confirmed error. Your entered details remain available here to retry the walkthrough.</p>
    ${actions(button("Retry from review", "review"), callLink)}
    <p class="app-footnote">If you need help now, call 112 directly.</p>`,

  unanswered: () => `
    ${heading("No response yet", "The simulated request was sent, but no provider accepted it.")}
    <div class="state-graphic error" aria-hidden="true">…</div>
    <p class="state-copy">This is different from a failed send. There is no assigned ambulance or ETA. In an actual emergency, call 112 rather than continuing to wait in this concept.</p>
    ${actions(callLink, button("Return to start", "start", true))}
    <p class="app-footnote">A real service would need a verified escalation and timeout policy.</p>`,
};

function render(next = state.screen, focus = false) {
  if (!views[next]) return;
  state.screen = next;
  app.innerHTML = `<div class="app-brand">THE SAVIOUR <span aria-hidden="true">✳</span></div>${views[next]()}`;
  nav.innerHTML = screens.map(([key, label], index) =>
    `<li><button type="button" data-screen="${key}" ${key === next ? 'aria-current="step"' : ""}><span>${String(index + 1).padStart(2, "0")}</span>${label}</button></li>`
  ).join("");
  if (focus) app.querySelector("h2")?.focus();
}

document.addEventListener("click", event => {
  const category = event.target.closest("[data-category]");
  if (category) {
    state.category = category.dataset.category;
    render("start");
    app.querySelector(`[data-category="${CSS.escape(state.category)}"]`)?.focus();
    return;
  }
  const target = event.target.closest("[data-screen]");
  const form = document.querySelector("#request-form");
  if (form?.id === "request-form" && target) {
    const draft = new FormData(form);
    state.location = String(draft.get("location") || "");
    state.contact = String(draft.get("contact") || "");
    state.note = String(draft.get("note") || "");
  }
  if (target) render(target.dataset.screen, true);
});

document.addEventListener("submit", event => {
  if (event.target.id !== "request-form") return;
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  const data = new FormData(event.target);
  state.location = String(data.get("location")).trim();
  state.contact = String(data.get("contact")).trim();
  state.note = String(data.get("note")).trim();
  if (!state.location || !state.contact) return;
  render("review", true);
});

render();


