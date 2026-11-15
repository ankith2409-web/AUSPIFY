const states = {
  start: {
    index: '01 / START', title: 'Get help, clearly.',
    description: 'Confirm a sample pickup point and move through a concise request flow.',
    label: 'PICKUP LOCATION / SAMPLE', value: 'Koramangala, Bengaluru', caveat: 'No real request is sent.'
  },
  waiting: {
    index: '02 / WAITING', title: 'Recorded here, nowhere else.',
    description: 'The sample request exists only inside a browser prototype. No hospital has received it.',
    label: 'CURRENT STATUS', value: 'Awaiting simulated response', caveat: 'A local record is not delivery confirmation.'
  },
  response: {
    index: '03 / RESPONSE', title: 'Acceptance simulated.',
    description: 'This is an example of a future verified handoff screen, triggered by a demo action.',
    label: 'CURRENT STATUS', value: 'Demo acceptance only', caveat: 'No hospital or ambulance was assigned.'
  }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
const preview = document.querySelector('#preview');
const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');

function select(name, focusTab = false) {
  const state = states[name];
  if (!state) return;
  tabs.forEach(tab => {
    const active = tab.dataset.state === name;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focusTab) tab.focus();
  });
  preview.setAttribute('aria-labelledby', `tab-${name}`);
  const action = name === 'waiting'
    ? '<a class="preview-action" href="tel:112">Call 112 for real help ↗</a>'
    : `<button class="preview-action" type="button" data-advance="${name === 'start' ? 'waiting' : 'start'}">${name === 'start' ? 'See waiting state →' : 'Back to start →'}</button>`;
  preview.innerHTML = `<span class="preview-index">${state.index}</span><h3>${state.title}</h3>
    <p>${state.description}</p><div class="preview-location"><small>${state.label}</small><strong>${state.value}</strong></div>
    ${action}<small class="preview-caveat">${state.caveat}</small>`;
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => select(tab.dataset.state));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    select(tabs[next].dataset.state, true);
  });
});

preview.addEventListener('click', event => {
  const next = event.target.closest('[data-advance]')?.dataset.advance;
  if (!next) return;
  select(next);
  preview.focus({ preventScroll: true });
});

function closeMenu(returnFocus = false) {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) menu.focus();
}

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  if (link.hash) {
    const destination = document.getElementById(link.hash.slice(1));
    if (destination) {
      destination.tabIndex = -1;
      destination.focus({ preventScroll: true });
    }
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
});
matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

