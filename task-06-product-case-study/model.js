((root, factory) => {
  const model = factory();
  if (typeof module === "object" && module.exports) module.exports = model;
  else root.SaviourModel = model;
})(typeof globalThis === "object" ? globalThis : this, () => {
  const initial = () => ({ request: null });
  const event = (label, at) => ({ label, at });
  const requireStatus = (request, expected) => {
    if (!request || !expected.includes(request.status)) throw new Error("This action is not available in the current request state.");
  };

  function update(state, action, data = {}, now = new Date()) {
    const at = now.toISOString();
    const current = state.request;
    if (action === "clear") return initial();
    if (action === "submit") {
      if (current && current.status !== "arrived") throw new Error("Finish or clear the current request before starting another.");
      const location = String(data.location || "").trim();
      const category = String(data.category || "").trim();
      const note = String(data.note || "").trim();
      if (location.length < 5 || location.length > 120 || !["Medical emergency", "Road accident", "Other / unsure"].includes(category) || note.length > 240)
        throw new Error("Check the pickup location and emergency details.");
      return { request: {
        id: `SV-${now.getTime().toString(36).toUpperCase()}`,
        location, category, note, status: "submitted", hospital: null, vehicle: null,
        events: [event("Request created in this browser", at)],
      } };
    }
    if (action === "accept") {
      requireStatus(current, ["submitted"]);
      return { request: { ...current, status: "accepted", hospital: "City Care Hospital (demo)", events: [...current.events, event("Hospital accepted request", at)] } };
    }
    if (action === "dispatch") {
      requireStatus(current, ["accepted"]);
      const vehicle = String(data.vehicle || "").trim();
      if (vehicle.length < 3 || vehicle.length > 32) throw new Error("Enter a short vehicle identifier.");
      return { request: { ...current, status: "enroute", vehicle, events: [...current.events, event("Ambulance marked en route", at)] } };
    }
    if (action === "acknowledge") {
      requireStatus(current, ["enroute"]);
      return { request: { ...current, status: "route_acknowledged", events: [...current.events, event("Traffic control acknowledged route", at)] } };
    }
    if (action === "arrive") {
      requireStatus(current, ["enroute", "route_acknowledged"]);
      return { request: { ...current, status: "arrived", events: [...current.events, event("Ambulance marked arrived", at)] } };
    }
    throw new Error("Unknown action.");
  }

  return { initial, update };
});

