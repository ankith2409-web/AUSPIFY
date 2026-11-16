(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Journey = factory();
})(typeof globalThis === 'object' ? globalThis : this, () => {
  const categories = ['Medical emergency', 'Road accident', 'Other urgent help'];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function create() {
    const defaults = {location:'Koramangala, Bengaluru', category:categories[0], contact:'', note:'', recorded:false, accepted:false, timedOut:false};
    const state = {...defaults};
    const errors = () => ({
      location: state.location.trim() ? '' : 'Enter a sample pickup location to continue.',
      contact: /^[0-9]{10}$/.test(state.contact) ? '' : 'Enter exactly 10 fictitious digits, for example 0000000000.',
      category: categories.includes(state.category) ? '' : 'Choose an emergency type.'
    });
    const valid = () => Object.values(errors()).every(value => !value);
    function update(values) {
      for (const key of ['location','category','contact','note']) {
        if (Object.hasOwn(values, key) && state[key] !== values[key]) {
          state[key] = values[key];
          state.recorded = state.accepted = state.timedOut = false;
        }
      }
    }
    function resolve(name) {
      if (name === 'home' || name === 'details') return name;
      if (['review','failed'].includes(name)) return valid() ? name : 'details';
      if (name === 'waiting' && state.recorded) return name;
      if (name === 'assigned' && state.accepted) return name;
      if (name === 'timeout' && state.timedOut) return name;
      return 'home';
    }
    function go(name) {
      if (name === 'waiting' && valid()) {
        state.recorded = true;
        state.accepted = state.timedOut = false;
      }
      if (name === 'failed' && valid()) state.recorded = state.accepted = state.timedOut = false;
      if (name === 'assigned' && state.recorded) state.accepted = true;
      if (name === 'timeout' && state.recorded) state.timedOut = true;
      return resolve(name);
    }
    return {state, update, errors, resolve, go, reset:() => Object.assign(state, defaults)};
  }
  return {create, categories, escape};
});
