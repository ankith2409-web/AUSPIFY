import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

function createHarness() {
  const handlers = {};
  const app = { innerHTML: "", querySelector: () => ({ focus() {} }) };
  const nav = { innerHTML: "" };
  const document = {
    querySelector: selector => selector === "#app" ? app : nav,
    addEventListener: (name, handler) => { handlers[name] = handler; },
  };
  const context = vm.createContext({
    document,
    CSS: { escape: value => value },
    FormData: class { constructor(form) { this.form = form; } get(key) { return this.form.values[key]; } },
  });
  vm.runInContext(readFileSync(new URL("../app.js", import.meta.url), "utf8"), context);
  return {
    app,
    nav,
    click: (name, value) => handlers.click({ target: { closest: selector =>
      selector === `[${name}]` ? { dataset: { [name === "data-screen" ? "screen" : "category"]: value } } : null
    } }),
    submit: values => handlers.submit({
      target: { id: "request-form", values, reportValidity: () => true },
      preventDefault() {},
    }),
  };
}

test("the request flow separates sent, accepted, failed send, and no response", () => {
  const ui = createHarness();
  assert.match(ui.app.innerHTML, /Get help now/);
  ui.click("data-screen", "details");
  ui.submit({ location: "Gate 2", contact: "+919876543210", note: "Near <bridge>" });
  assert.match(ui.app.innerHTML, /Check before sending/);
  assert.match(ui.app.innerHTML, /Near &lt;bridge&gt;/);
  ui.click("data-screen", "failed");
  assert.match(ui.app.innerHTML, /Request not sent/);
  assert.doesNotMatch(ui.app.innerHTML, /Hospital accepted/);
  ui.click("data-screen", "review");
  assert.match(ui.app.innerHTML, /Gate 2/);
  ui.click("data-screen", "waiting");
  assert.match(ui.app.innerHTML, /Request sent/);
  assert.match(ui.app.innerHTML, /No ambulance or arrival time can be confirmed/);
  ui.click("data-screen", "unanswered");
  assert.match(ui.app.innerHTML, /No response yet/);
  ui.click("data-screen", "waiting");
  ui.click("data-screen", "assigned");
  assert.match(ui.app.innerHTML, /Help is assigned/);
  assert.match(ui.app.innerHTML, /fictional demonstration data/);
});

test("the prototype keeps the direct 112 option visible in critical states", () => {
  const ui = createHarness();
  for (const name of ["start", "details", "review", "waiting", "assigned", "failed", "unanswered"]) {
    ui.click("data-screen", name);
    assert.match(ui.app.innerHTML, /href="tel:112"/);
    assert.match(ui.nav.innerHTML, /aria-current="step"/);
  }
});


