const names = ['Home', 'Request details', 'Review', 'Finding help', 'Ambulance assigned', 'Request not sent'];
const state = { screen: 0, location: 'Near KR Puram, Bengaluru', type: 'Medical emergency', contact: '0000000000', note: '' };
const screen = document.querySelector('#screen');
const flow = document.querySelector('#flow');
const escapeText = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const action = (label, next, secondary = false) => `<button class="action${secondary ? ' secondary' : ''}" type="button" data-next="${next}">${label}</button>`;
const title = (heading, sub) => `<h2 tabindex="-1">${heading}</h2><p class="sub">${sub}</p>`;
const call = '<button class="action secondary" type="button" data-call>Call emergency services</button>';
const views = [
  () => `${title('Get help quickly', 'Explore a sample ambulance request flow.')}
    <div class="map">MAP / LOCATION PLACEHOLDER</div>
    <div class="field"><p id="pickup-label" class="field-label">Sample pickup</p><div class="card" aria-labelledby="pickup-label">${escapeText(state.location)}</div></div>
    <div class="actions">${action('Request ambulance', 1)}${call}</div>
    <p class="footnote">Check or correct the pickup on the next screen.</p>`,
  () => `${title('Tell us what happened', 'Only essential details are needed. Use sample information.')}
    <form id="details">
      <div class="field"><label for="location">Patient location</label><input id="location" name="location" required maxlength="120" value="${escapeText(state.location)}"></div>
      <fieldset class="field"><legend>What kind of help?</legend>${['Medical emergency', 'Accident / injury', 'Other / unsure'].map(value => `<label class="radio"><input type="radio" name="type" value="${value}" ${state.type === value ? 'checked' : ''}>${value}</label>`).join('')}</fieldset>
      <div class="field"><label for="contact">Contact number · sample</label><input id="contact" name="contact" type="tel" inputmode="numeric" autocomplete="off" required maxlength="10" pattern="[0-9]{10}" aria-describedby="contact-hint contact-error" value="${escapeText(state.contact)}"><small id="contact-hint">Use 10 fictional digits, such as 0000000000.</small><p id="contact-error" class="notice" hidden>Enter 10 digits for the sample contact.</p></div>
      <div class="field"><label for="note">Optional note</label><textarea id="note" name="note" maxlength="240" placeholder="Sample landmark or brief details">${escapeText(state.note)}</textarea></div>
      <div class="actions"><button class="action" type="submit">Review request</button>${action('Back to home', 0, true)}</div>
    </form>`,
  () => `${title('Review your request', 'Check all details before the sample send.')}
    <div class="summary">${[['Location', state.location], ['Help needed', state.type], ['Contact', state.contact], ...(state.note ? [['Optional note', state.note]] : [])].map(([key, value]) => `<div class="card"><small>${key}</small>${escapeText(value)}</div>`).join('')}</div>
    <p class="notice">Proposed behavior: share these details with available hospitals after verified delivery. This walkthrough sends nothing.</p>
    <div class="simulate"><p>Reviewer control · explore the failure branch</p><button type="button" data-next="5">Simulate send failure</button></div>
    <div class="actions">${action('Send sample request', 3)}${action('Back and edit', 1, true)}</div>`,
  () => `${title('Finding available help', 'Delivered / awaiting acceptance · illustrated state')}
    <div class="status"><span class="pulse" aria-hidden="true"></span>Waiting for hospital acceptance</div>
    <h3 style="margin-top:32px">Proposed next steps</h3><ol class="steps"><li>Service confirms delivery</li><li>A hospital accepts the request</li><li>Verified ambulance details appear</li></ol>
    <div class="simulate"><p>Reviewer control · illustrated acceptance</p><button type="button" data-next="4">Show sample acceptance</button></div>
    <div class="actions">${call}</div><p class="footnote">Sample state only. No hospital has received this request.</p>`,
  () => `${title('Ambulance assigned', 'Illustrated provider acceptance · sample only')}
    <div class="map small">ROUTE / MAP PLACEHOLDER</div>
    <div class="card eta"><small>Estimated arrival · sample</small><strong>8–12 min</strong><p>Layout placeholder, not an actual arrival estimate.</p></div>
    <div class="card" style="margin-top:20px"><small>Provider and vehicle · sample</small>Example hospital · Vehicle A</div>
    <div class="actions">${action('View request details', 2, true)}${call}</div>
    <p class="footnote">A real assignment would require verified provider acceptance.</p>`,
  () => `${title('Request not sent', 'Illustrated delivery failure · try again or call')}
    <div class="placeholder">REQUEST NOT SENT</div>
    <h3 style="margin-top:34px">No hospital has received this request.</h3>
    <p class="sub">Your details remain in this walkthrough, so retrying or editing does not lose them.</p>
    <div class="actions">${action('Try again', 3)}${action('Edit details', 1, true)}${call}</div>
    <p class="footnote">All call controls are wireframe placeholders. No call is placed.</p>`
];

function render(index, moveFocus = true) {
  state.screen = index;
  screen.innerHTML = views[index]() + '<p class="call-feedback notice" role="status" hidden></p>';
  flow.innerHTML = names.map((name, i) => `<li><button type="button" data-next="${i}" ${i === index ? 'aria-current="step"' : ''}><span>${String(i + 1).padStart(2, '0')}</span>${name}</button></li>`).join('');
  if (moveFocus) screen.querySelector('h2').focus({ preventScroll: true });
}

function retainDraft(form) {
  const data = new FormData(form);
  for (const key of ['location', 'type', 'contact', 'note']) state[key] = String(data.get(key) || '');
}

document.addEventListener('invalid', event => {
  if (event.target.id !== 'contact') return;
  screen.querySelector('#contact-error').hidden = false;
  event.target.setAttribute('aria-invalid', 'true');
}, true);
document.addEventListener('input', event => {
  if (event.target.form?.id !== 'details') return;
  retainDraft(event.target.form);
  if (event.target.id === 'contact' && event.target.validity.valid) {
    screen.querySelector('#contact-error').hidden = true;
    event.target.removeAttribute('aria-invalid');
  }
});
document.addEventListener('change', event => { if (event.target.form?.id === 'details') retainDraft(event.target.form); });
document.addEventListener('click', event => {
  if (event.target.closest('[data-call]')) {
    const feedback = screen.querySelector('.call-feedback');
    feedback.hidden = false;
    feedback.textContent = 'Wireframe call placeholder. No call was placed. For a real emergency in India, use your phone to call 112.';
    return;
  }
  const target = event.target.closest('[data-next]');
  if (target) render(Number(target.dataset.next));
});
document.addEventListener('submit', event => {
  if (event.target.id !== 'details') return;
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  retainDraft(event.target);
  if (!state.location.trim() || !state.contact.trim()) return;
  render(2);
});
render(0, false);
