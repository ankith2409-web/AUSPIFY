const assert = require('node:assert/strict');
const {test} = require('node:test');
const {initial, update} = require('../model.js');
const sample = {location:'Sample Gate 2', category:'Medical emergency', note:''};
const dispatched = () => update(update(update(initial(), 'submit', sample), 'accept'), 'dispatch', {vehicle:'DEMO-42'});

test('arrival without traffic acknowledgement never creates an acknowledgement event', () => {
  const state = update(dispatched(), 'arrive');
  assert.equal(state.request.status, 'arrived');
  assert.equal(state.request.vehicle, 'DEMO-42');
  assert.equal(state.request.location, sample.location);
  assert.equal(state.request.events.some(event => event.label.includes('acknowledged')), false);
  assert.throws(() => update(state, 'acknowledge'));
});

test('stale or duplicate actions cannot skip or repeat a handoff', () => {
  const submitted = update(initial(), 'submit', sample);
  const accepted = update(submitted, 'accept');
  assert.equal(submitted.request.status, 'submitted');
  assert.equal(submitted.request.events.length, 1);
  assert.throws(() => update(accepted, 'accept'));
  assert.throws(() => update(accepted, 'dispatch', {vehicle:'  '}));
  assert.throws(() => update(accepted, 'arrive'));
  assert.throws(() => update(dispatched(), 'dispatch', {vehicle:'DEMO-99'}));
});

test('request validation rejects whitespace, unsupported categories, and excessive context', () => {
  for (const values of [{location:'     '}, {category:'Unknown'}, {note:'x'.repeat(241)}])
    assert.throws(() => update(initial(), 'submit', {...sample, ...values}));
});
