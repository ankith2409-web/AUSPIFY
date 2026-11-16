const {test} = require('node:test');
const assert = require('node:assert/strict');
const {create,escape} = require('../journey.js');
const filled = () => {const journey = create();journey.update({contact:'0000000000',category:'Road accident',note:'Use sample east entrance'});return journey;};
test('whitespace pickup and malformed contact cannot reach review', () => {
  const journey = create();
  journey.update({location:'   ',contact:'0123456789'});
  assert.match(journey.errors().location,/sample pickup/);
  assert.equal(journey.go('review'),'details');
  journey.update({location:'Sample place',contact:'1234x67890'});
  assert.match(journey.errors().contact,/10 fictitious digits/);
  assert.equal(journey.go('waiting'),'home');
});
test('Back and Edit retain an unsubmitted draft', () => {
  const journey = filled(), expected = {...journey.state};
  assert.equal(journey.go('home'),'home');
  assert.equal(journey.go('details'),'details');
  assert.deepEqual(journey.state,expected);
});
test('failure retry, no-response recovery, and acceptance are separate states', () => {
  const journey = filled();
  assert.equal(journey.go('review'),'review');
  assert.equal(journey.go('failed'),'failed');
  assert.equal(journey.state.recorded,false);
  assert.equal(journey.go('assigned'),'home');
  assert.equal(journey.go('waiting'),'waiting');
  assert.equal(journey.go('timeout'),'timeout');
  assert.equal(journey.go('review'),'review');
  assert.equal(journey.go('waiting'),'waiting');
  assert.equal(journey.state.timedOut,false);
  assert.equal(journey.go('assigned'),'assigned');
  assert.equal(journey.state.accepted,true);
});
test('new demo clears details and invalidates historical confirmation routes', () => {
  const journey = filled();
  journey.go('waiting');journey.go('assigned');journey.reset();
  assert.equal(journey.state.contact,'');assert.equal(journey.state.note,'');
  assert.equal(journey.resolve('assigned'),'home');
  assert.equal(journey.resolve('waiting'),'home');
  assert.equal(journey.resolve('timeout'),'home');
});
test('editing a recorded sample invalidates response claims', () => {
  const journey = filled();journey.go('waiting');journey.go('assigned');
  journey.update({note:'Changed sample context'});
  assert.equal(journey.resolve('assigned'),'home');
  assert.equal(journey.state.recorded,false);
});
test('fresh links cannot manufacture a provider response', () => {
  const journey = create();
  for (const route of ['waiting','assigned','timeout','unknown']) assert.equal(journey.resolve(route),'home');
  assert.equal(journey.resolve('review'),'details');
});
test('draft text is escaped before HTML interpolation', () => {
  assert.equal(escape('<img src=x onerror="alert(1)"> & \'sample\''),'&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;sample&#39;');
});
