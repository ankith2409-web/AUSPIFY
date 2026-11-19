const STORAGE_KEY = "the-saviour-task-06-demo-v1";
const model = globalThis.SaviourModel;
const content = document.querySelector("#content");
const activity = document.querySelector("#activity");
const roles = {
  patient: ["PATIENT VIEW", "Request and track help"],
  hospital: ["HOSPITAL VIEW", "Review and dispatch"],
  traffic: ["TRAFFIC CONTROL VIEW", "Route coordination"],
};
const labels = {
  submitted: "Waiting for hospital",
  accepted: "Hospital accepted",
  enroute: "Ambulance en route",
  route_acknowledged: "Route acknowledged",
  arrived: "Ambulance arrived",
};
const clean = value => String(value ?? "").replace(/[&<>"']/g, char =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
);

let storageAvailable = true;
function load(fallback = model.initial()) {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const request = parsed?.request;
    return parsed && (request === null || (
      request && typeof request.id === "string" && typeof request.location === "string" &&
      typeof request.category === "string" && labels[request.status] && Array.isArray(request.events) &&
      request.events.every(item => item && typeof item.label === "string" && !Number.isNaN(Date.parse(item.at)))
    )) ? parsed : model.initial();
  } catch { storageAvailable = false; return fallback; }
}

let state = load();
let patientDraft = {location: "KR Puram, Bengaluru", category: "Medical emergency", note: ""};
let vehicleDraft = "KA 03 AB 1234";
const acknowledged = request => request.events.some(item => item.label === "Traffic control acknowledged route");
let role = new URLSearchParams(location.search).get("role");
if (!roles[role]) role = "patient";
const call = '<a class="emergency-link" href="tel:112">Call 112 for a real emergency <span aria-hidden="true">↗</span></a>';
const status = request => `<span class="status status-${clean(request.status)}"><span aria-hidden="true"></span>${labels[request.status]}</span>`;
const detail = (name, value) => `<div class="detail"><span>${name}</span><strong>${clean(value || "Not provided")}</strong></div>`;
const requestCard = request => `
  <div class="request-card"><div class="request-top"><div><span class="muted-label">REQUEST ${clean(request.id)}</span><h3>${clean(request.category)}</h3></div>${status(request)}</div>
  <div class="details">${detail("Pickup location", request.location)}${detail("Additional context", request.note)}${request.hospital ? detail("Hospital", request.hospital) : ""}${request.vehicle ? detail("Vehicle", request.vehicle) : ""}</div></div>`;

function patientView(request) {
  if (!request) return `
    <div class="patient-intro"><div><h3>Get help now</h3><p>Start with a clear pickup point. This demo will create a sample request in your browser, then let you process it from the other workspaces.</p></div><span class="intro-symbol" aria-hidden="true">✳</span></div>
    <form id="request-form" class="request-form">
      <div class="form-row"><label for="location">Pickup location <span>*</span></label><input id="location" name="location" minlength="5" maxlength="120" required value="${clean(patientDraft.location)}" autocomplete="off"><small>Use a sample location. This is not GPS.</small></div>
      <fieldset><legend>What kind of help is needed? <span>*</span></legend><label class="choice"><input type="radio" name="category" value="Medical emergency" ${patientDraft.category === "Medical emergency" ? "checked" : ""}><span><strong>Medical emergency</strong><small>Urgent illness or injury</small></span></label><label class="choice"><input type="radio" name="category" value="Road accident" ${patientDraft.category === "Road accident" ? "checked" : ""}><span><strong>Road accident</strong><small>Collision with immediate medical need</small></span></label><label class="choice"><input type="radio" name="category" value="Other / unsure" ${patientDraft.category === "Other / unsure" ? "checked" : ""}><span><strong>Other / unsure</strong><small>Describe it in the note below</small></span></label></fieldset>
      <div class="form-row"><label for="note">Additional context <span class="optional">optional</span></label><textarea id="note" name="note" maxlength="240" rows="3" placeholder="Sample landmark or access instructions">${clean(patientDraft.note)}</textarea></div>
      <div class="form-actions"><button class="primary" type="submit">Create demo request <span aria-hidden="true">→</span></button>${call}</div>
    </form>`;

  return `
    <div class="section-intro"><div><h3>Your request</h3><p>${request.status === "arrived" ? "The completed handoff stays here until you start a new demo." : "Updates appear here when the hospital and traffic workspaces take action."}</p></div></div>
    ${requestCard(request)}
    <div class="progress"><h4>Handoff progress</h4><ol>
      <li class="done"><strong>Request created</strong><span>Stored in this browser only.</span></li>
      <li class="${request.status !== "submitted" ? "done" : ""}"><strong>Hospital acceptance</strong><span>${request.hospital ? clean(request.hospital) : "Waiting for hospital view."}</span></li>
      <li class="${["enroute", "route_acknowledged", "arrived"].includes(request.status) ? "done" : ""}"><strong>Ambulance dispatch</strong><span>${request.vehicle ? clean(request.vehicle) : "Not dispatched yet."}</span></li>
      <li class="${acknowledged(request) ? "done" : ""}"><strong>Traffic acknowledgement</strong><span>${acknowledged(request) ? "Acknowledged in demo." : "No acknowledgement yet."}</span></li>
      <li class="${request.status === "arrived" ? "done" : ""}"><strong>Ambulance arrival</strong><span>${request.status === "arrived" ? "Marked arrived in this demo." : "Not marked arrived yet."}</span></li>
    </ol></div>${request.status === "arrived" ? '<div class="completion"><strong>Handoff completed</strong><p>Pickup, hospital, and vehicle details remain available above.</p><button class="secondary" type="button" data-action="clear">Start a new demo</button></div>' : ""}${call}<p class="fine-print">No actual request has been sent. The status above reflects only actions taken in this browser.</p>`;
}

function hospitalView(request) {
  if (!request) return empty("No open requests", "Create a sample request in the Patient workspace to start the handoff.");
  return `<div class="section-intro"><div><h3>Incoming request</h3><p>Review the pickup and reported need before accepting the demo handoff.</p></div></div>
    ${requestCard(request)}
    ${request.status === "submitted" ? `<div class="action-panel"><h4>Decision</h4><p>Accept this sample request to notify the patient view.</p><button type="button" class="primary" data-action="accept">Accept request <span aria-hidden="true">→</span></button></div>` : ""}
    ${request.status === "accepted" ? `<form id="dispatch-form" class="action-panel"><h4>Dispatch ambulance</h4><label for="vehicle">Vehicle identifier</label><input id="vehicle" name="vehicle" required minlength="3" maxlength="32" value="${clean(vehicleDraft)}"><p>Enter a sample identifier. No vehicle is actually dispatched.</p><button type="submit" class="primary">Mark ambulance en route <span aria-hidden="true">→</span></button></form>` : ""}
    ${["enroute", "route_acknowledged"].includes(request.status) ? `<div class="action-panel"><h4>Ambulance progress</h4><p>The patient and traffic views now show the sample dispatch.</p><button type="button" class="secondary" data-action="arrive">Mark ambulance arrived</button></div>` : ""}
    ${request.status === "arrived" ? `<div class="completion"><strong>Handoff completed</strong><p>The vehicle was marked arrived in this browser demo.</p></div>` : ""}`;
}

function trafficView(request) {
  if (!request || request.status === "submitted") return empty("No route alert", "A route alert appears only after a hospital accepts and dispatches a sample ambulance.");
  if (request.status === "accepted") return empty("Awaiting ambulance dispatch", "The hospital accepted the request, but there is no vehicle or route to acknowledge yet.");
  return `<div class="section-intro"><div><h3>Route alert</h3><p>This proposed coordination step is demonstrated locally. No police system receives it.</p></div></div>
    ${requestCard(request)}
    <div class="route"><span>Pickup</span><strong>${clean(request.location)}</strong><i aria-hidden="true"></i><span>Destination</span><strong>${clean(request.hospital)}</strong></div>
    ${request.status === "enroute" ? `<div class="action-panel"><h4>Confirm receipt</h4><p>Acknowledge that the sample route alert was seen. This does not request real traffic clearance.</p><button type="button" class="primary" data-action="acknowledge">Acknowledge route alert <span aria-hidden="true">→</span></button></div>` : `<div class="completion"><strong>${request.status === "arrived" ? "Ambulance arrived" : "Route alert acknowledged"}</strong><p>${acknowledged(request) ? "The acknowledgement is visible to the patient in this browser." : "This handoff ended without a traffic acknowledgement."}</p></div>`}`;
}

function empty(title, message) {
  return `<div class="empty"><span aria-hidden="true">○</span><h3>${title}</h3><p>${message}</p></div>`;
}

function rememberDrafts() {
  const patient = document.querySelector('#request-form');
  if (patient) patientDraft = Object.fromEntries(new FormData(patient));
  const vehicle = document.querySelector('#vehicle');
  if (vehicle) vehicleDraft = vehicle.value;
}
function render(focus = false, preserveDrafts = true) {
  if (preserveDrafts) rememberDrafts();
  const request = state.request;
  document.querySelector("#role-caption").textContent = roles[role][0];
  document.querySelector("#role-title").textContent = roles[role][1];
  document.querySelector("#request-count").textContent = request ? `1 REQUEST · ${labels[request.status].toUpperCase()}` : "NO ACTIVE REQUEST";
  document.querySelectorAll("[data-role]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.role === role)));
  content.innerHTML = role === "patient" ? patientView(request) : role === "hospital" ? hospitalView(request) : trafficView(request);
  document.querySelector("#storage-note").hidden = storageAvailable;
  if (focus) document.querySelector("#role-title").focus();
  activity.innerHTML = request ? `<p class="activity-id">${clean(request.id)}</p><ol class="events">${[...request.events].reverse().map(item =>
    `<li><span aria-hidden="true"></span><strong>${clean(item.label)}</strong><time datetime="${clean(item.at)}">${new Date(item.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time></li>`
  ).join("")}</ol>` : empty("Nothing yet", "Activity will appear as the sample request moves through the workspaces.");
}

function apply(action, data) {
  try {
    state = model.update(storageAvailable ? load(state) : state, action, data);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { storageAvailable = false; }
    if (action === "clear") {
      patientDraft = {location: "KR Puram, Bengaluru", category: "Medical emergency", note: ""};
      vehicleDraft = "KA 03 AB 1234";
    }
    render(true, action !== "clear");
  } catch (error) {
    const notice = document.createElement("p");
    notice.className = "form-error";
    notice.setAttribute("role", "alert");
    notice.textContent = error.message;
    content.prepend(notice);
    notice.tabIndex = -1;
    notice.focus();
  }
}

const clearDialog = document.querySelector("#clear-dialog");
let requestToClear;

clearDialog.addEventListener("submit", event => {
  event.preventDefault();
  clearDialog.close();
  if (event.submitter?.value !== "clear") return;
  const current = storageAvailable ? load(state) : state;
  if (current.request?.id !== requestToClear) return;
  apply("clear");
});

document.addEventListener("click", event => {
  const roleButton = event.target.closest("[data-role]");
  if (roleButton) {
    role = roleButton.dataset.role;
    const url = new URL(location.href);
    url.searchParams.set("role", role);
    history.replaceState(null, "", url);
    render(true);
    return;
  }
  const action = event.target.closest("[data-action]");
  if (action?.dataset.action === "clear" || event.target.closest("#reset")) {
    const current = storageAvailable ? load(state) : state;
    requestToClear = current.request?.id;
    clearDialog.returnValue = "";
    clearDialog.showModal();
    return;
  }
  if (action) apply(action.dataset.action);
});

document.addEventListener("submit", event => {
  if (!["request-form", "dispatch-form"].includes(event.target.id)) return;
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  const data = Object.fromEntries(new FormData(event.target));
  apply(event.target.id === "request-form" ? "submit" : "dispatch", data);
});

window.addEventListener("storage", event => {
  if (event.key !== STORAGE_KEY) return;
  state = load();
  render();
});

render();


