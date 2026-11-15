const assert = require("node:assert/strict");
const { test } = require("node:test");
const { initial, update } = require("../model.js");

const at = step => new Date(Date.UTC(2026, 10, 15, 10, step));
const sample = { location: "KR Puram, Bengaluru", category: "Road accident", note: "Gate 2" };

test("one request moves through patient, hospital, and traffic actions", () => {
  let state = update(initial(), "submit", sample, at(0));
  assert.equal(state.request.status, "submitted");
  assert.throws(() => update(state, "dispatch", { vehicle: "KA 03 AB 1234" }, at(1)));
  state = update(state, "accept", {}, at(2));
  assert.equal(state.request.hospital, "City Care Hospital (demo)");
  state = update(state, "dispatch", { vehicle: "KA 03 AB 1234" }, at(3));
  assert.equal(state.request.status, "enroute");
  state = update(state, "acknowledge", {}, at(4));
  assert.equal(state.request.status, "route_acknowledged");
  state = update(state, "arrive", {}, at(5));
  assert.equal(state.request.events.length, 5);
  assert.equal(state.request.status, "arrived");
});

test("invalid transitions and incomplete requests are rejected", () => {
  assert.throws(() => update(initial(), "submit", { ...sample, location: "A" }, at(0)));
  const state = update(initial(), "submit", sample, at(0));
  assert.throws(() => update(state, "submit", sample, at(1)));
  assert.throws(() => update(state, "acknowledge", {}, at(1)));
  assert.deepEqual(update(state, "clear"), initial());
});


