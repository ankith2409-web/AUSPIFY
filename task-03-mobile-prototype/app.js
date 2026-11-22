const view = document.querySelector('#screen');
const journey = Journey.create(), state = journey.state, clean = Journey.escape;
const step = (n, label) => `<p class="step">${n} / ${label}</p>`;
const notice = (heading, copy, neutral = false) => `<div class="notice${neutral ? ' neutral' : ''}"><strong>${heading}</strong>${copy}</div>`;
const action = (label, next, kind = 'primary') => `<button type="button" class="${kind}" data-next="${next}">${label}</button>`;
const call = '<a class="secondary call" href="tel:112">Call 112 for real help</a>';
const restart = '<button type="button" class="quiet" data-restart>Start a new demo</button>';
const error = '<p id="form-error" class="form-error" role="alert" hidden></p>';
const summary = () => `<div class="summary">${[['Pickup point / sample',state.location],['Type of help',state.category],['Contact / sample only',state.contact],...(state.note ? [['Additional context',state.note]] : [])].map(([label,value]) => `<div class="summary-row"><span>${label}</span><strong>${clean(value)}</strong></div>`).join('')}</div>`;
function home() {
  return `${step('01','Start')}<h2>Get help, clearly.</h2><p class="lead">A short path to explore an emergency request experience.</p>${notice('Prototype only - no request is sent','This demonstration does not contact any hospital, ambulance, or emergency service.')}<form id="pickup-form" class="start-form" novalidate><div class="field"><label for="pickup">Pickup location / sample</label><input id="pickup" value="${clean(state.location)}" autocomplete="off" maxlength="100" aria-describedby="pickup-help form-error" required><small id="pickup-help">Use a fictional pickup. Refreshing the page clears your sample details.</small></div>${error}<div class="actions"><button class="primary" type="submit">Start sample request</button>${call}</div></form><div class="illustration" aria-hidden="true"><span class="ambulance"><b>+</b></span></div>`;
}
function details() {
  return `${step('02','Details')}<h2>What kind of help?</h2><p class="lead">Only the essentials. Back and Edit keep your draft until you start a new demo or refresh.</p><form id="details-form" novalidate><div class="field"><label for="category">Emergency type</label><select id="category">${Journey.categories.map(c => `<option${state.category === c ? ' selected' : ''}>${c}</option>`).join('')}</select></div><div class="field"><label for="contact">Contact number / sample</label><input id="contact" type="tel" inputmode="numeric" autocomplete="off" pattern="[0-9]{10}" maxlength="10" placeholder="0000000000" value="${clean(state.contact)}" aria-describedby="contact-help form-error" required><small id="contact-help">Use 10 fictitious digits. This page does not save or send them.</small></div><div class="field"><label for="note">Anything else? <span class="optional">Optional</span></label><textarea id="note" maxlength="240" placeholder="Sample context only">${clean(state.note)}</textarea></div>${error}<div class="actions"><button class="primary" type="submit">Review sample request</button>${action('Back to start','home','quiet')}</div></form>`;
}
function review() {
  return `${step('03','Review')}<h2>Check the details.</h2><p class="lead">Nothing will be transmitted. You can edit before exploring the next state.</p>${summary()}${notice('This is a simulation','Record the sample locally, or explore a failed-send scenario.')}<div class="actions">${action('Record sample request','waiting')}${action('Simulate send failure','failed','secondary')}${action('Edit details','details','quiet')}</div>`;
}
function waiting() {
  return `${step('04','Status')}<div class="status-icon" aria-hidden="true">&#8943;</div><h2>Sample recorded locally.</h2><p class="lead">This is a local demonstration, not a delivery confirmation.</p>${notice('No hospital has received this','No provider response, ambulance assignment, or ETA is available.')}<ol class="timeline"><li class="done"><strong>Sample recorded</strong><small>In this page only.</small></li><li><strong>Provider response</strong><small>Explore a response or a no-response scenario below.</small></li></ol><div class="actions">${action('Simulate hospital acceptance','assigned','primary teal')}${action('Simulate no response','timeout','secondary')}${call}${restart}</div>`;
}
function assigned() {
  return `${step('05','Simulated response')}<div class="status-icon" aria-hidden="true">&#10003;</div><h2>Acceptance simulated.</h2><p class="lead">An example of how a provider response could be presented in a connected service.</p>${notice('Demo state only','No hospital accepted a real request, no ambulance was assigned, and no ETA is available.',true)}<ol class="timeline"><li class="done"><strong>Sample recorded</strong><small>Locally in this page.</small></li><li class="done"><strong>Acceptance simulated</strong><small>Triggered by your demo action, not a provider.</small></li></ol><div class="actions">${call}${restart}</div>`;
}
function failed() {
  return `${step('04','Failure recovery')}<div class="status-icon error" aria-hidden="true">!</div><h2>Send failed in this demo.</h2><p class="lead">The sample request was not recorded. Your details are ready to edit or retry.</p>${notice('No hospital received a request','Nothing was sent. For a real emergency in India, call 112.')}<div class="actions">${call}${action('Try sample recording again','waiting','primary teal')}${action('Edit details','details','quiet')}</div>`;
}
function timeout() {
  return `${step('04','No-response recovery')}<div class="status-icon error" aria-hidden="true">!</div><h2>Still waiting for a response.</h2><p class="lead">The sample request was recorded in this browser. In this scenario, no provider has accepted it.</p>${notice('Do not rely on this screen for help','This prototype cannot reach a provider. For a real emergency in India, call 112.')}<p class="fine">Your sample details are retained. Retry explores the local recorded state again; it does not contact a service.</p><div class="actions">${call}${action('Retry sample recording','waiting','primary teal')}${action('Review retained details','review','secondary')}${restart}</div>`;
}
const screens = {home, details, review, waiting, assigned, failed, timeout};
function render() {
  const name = journey.resolve(location.hash.slice(1) || 'home');
  if (location.hash !== `#${name}`) history.replaceState(null,'',`#${name}`);
  view.innerHTML = `<div class="screen-inner">${screens[name]()}</div>`;
  const heading = view.querySelector('h2');
  heading.tabIndex = -1;
  heading.focus({preventScroll:true});
  document.title = `${heading.textContent} | THE SAVIOUR prototype`;
  scrollTo({top:0,behavior:'instant'});
}
function navigate(name) {
  const next = journey.go(name);
  if (location.hash === `#${next}`) render();
  else location.hash = next;
}
function showError(field, message) {
  const alert = document.querySelector('#form-error');
  alert.textContent = message;
  alert.hidden = false;
  field.setAttribute('aria-invalid','true');
  field.focus();
}
document.addEventListener('input', event => {
  const key = {pickup:'location',category:'category',contact:'contact',note:'note'}[event.target.id];
  if (key) journey.update({[key]:event.target.value});
  event.target.removeAttribute('aria-invalid');
});
document.addEventListener('change', event => {
  if (event.target.id === 'category') journey.update({category:event.target.value});
});
document.addEventListener('submit', event => {
  if (!['pickup-form','details-form'].includes(event.target.id)) return;
  event.preventDefault();
  if (event.target.id === 'pickup-form') {
    journey.update({location:document.querySelector('#pickup').value.trim()});
    const message = journey.errors().location;
    if (message) return showError(document.querySelector('#pickup'),message);
    return navigate('details');
  }
  journey.update({contact:document.querySelector('#contact').value,category:document.querySelector('#category').value,note:document.querySelector('#note').value.trim()});
  const errors = journey.errors();
  if (errors.location) return navigate('home');
  if (errors.contact) return showError(document.querySelector('#contact'),errors.contact);
  if (errors.category) return showError(document.querySelector('#category'),errors.category);
  navigate('review');
});
document.addEventListener('click', event => {
  if (event.target.closest('.skip')) { event.preventDefault(); view.querySelector('h2').focus(); return; }
  if (event.target.closest('[data-restart]')) { journey.reset(); navigate('home'); return; }
  const button = event.target.closest('[data-next]');
  if (button) navigate(button.dataset.next);
});
addEventListener('hashchange',render);
render();
