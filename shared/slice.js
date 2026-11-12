// VERTICAL SLICE - NOT FOR PRODUCTION
// Validation Question: Can a new player go from choosing a mothership to taking down an enemy home world, unguided?
// Date: 2026-11-11
// The seam between the shell (index.html) and a phase page (phases/*/index.html).
// A phase page includes this file, then wraps its start-up in SLICE.start(state => { ... }).
//
//   Shell -> phase   {src:'xj', type:'init', state}          once, after the phase says 'ready'
//   Phase -> shell   {src:'xj', type:'ready', phase}
//                    {src:'xj', type:'objective', text, step, of}   the one-line "what now" chip (optional, any time)
//                    {src:'xj', type:'toast', text}                 a short message on the shell HUD (optional)
//                    {src:'xj', type:'phase_done', phase, result}   the phase is over; the shell moves on
//
// One continuing game (2026-11-11): the base page stays loaded for the whole session, and the two sides also talk with
//   SLICE.send(type, payload)   phase -> shell   e.g. 'fleet' {fleet}, 'open_map', 'base_save' {save}
//   SLICE.on(type, fn(msg))     shell -> phase   e.g. 'background' {on}, 'grant' {items, note}, 'set_fleet' {fleet}
//
// Standalone (page opened by itself, not inside the shell): state comes from the address,
//   ?hull=vanguard|bulwark|ranger  &seed=7  &fleet=3,2,2,1,1   (frigate,cruiser,bombard,scout,support)
// so every phase can be run and tested alone.
window.SLICE = (function () {
  const q = new URLSearchParams(location.search);
  const embedded = window.parent !== window;
  const hullIds = (window.XJ_HULLS && XJ_HULLS.order) || ['vanguard'];
  function fromQuery() {
    const f = (q.get('fleet') || '3,2,2,1,1').split(',').map(n => Math.max(0, parseInt(n, 10) || 0));
    return {
      seed: parseInt(q.get('seed') || '7', 10) || 7,
      hull: hullIds.includes(q.get('hull')) ? q.get('hull') : hullIds[0],
      site: null,                 // set by the planet phase: { name, kind, ... } (free-form; the base phase may read it)
      planet: null,               // set by the planet phase: summary of what the scan found
      fleet: { frigate: f[0] || 0, cruiser: f[1] || 0, bombard: f[2] || 0, scout: f[3] || 0, support: f[4] || 0 },  // set by the base phase
      base: null,                 // set by the base phase: summary (parts made, seconds)
      battle: null,               // set by the battle phase
    };
  }
  let phaseName = '';
  let state = fromQuery();
  let started = false;
  const waiting = [], handlers = {};
  function post(msg) { if (embedded) window.parent.postMessage(Object.assign({ src: 'xj' }, msg), '*'); }
  function fire() {
    started = true;
    while (waiting.length) { const f = waiting.shift(); f(state); }
  }
  window.addEventListener('message', ev => {
    const m = ev.data;
    if (!m || m.src !== 'xj') return;
    if (m.type === 'init') { state = Object.assign(fromQuery(), m.state || {}); fire(); }
    else if (handlers[m.type]) for (const f of handlers[m.type]) { try { f(m); } catch (err) { console.warn('[SLICE] handler failed', m.type, err); } }
  });
  return {
    embedded,
    get state() { return state; },
    get hull() { return XJ_HULLS.get(state.hull); },
    // mod('thrust') -> the chosen mothership's multiplier (1 when none)
    mod(key) { const m = XJ_HULLS.get(state.hull).mod; return m && m[key] != null ? m[key] : 1; },
    // Run fn(state) once the shell has handed over the state (or right away when standalone).
    start(name, fn) {
      phaseName = name;
      waiting.push(fn);
      if (started) { fn(state); return; }
      if (embedded) post({ type: 'ready', phase: name });
      else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fire);
      else setTimeout(fire, 0);
    },
    send(type, payload) { post(Object.assign({ type }, payload || {})); },
    on(type, fn) { (handlers[type] = handlers[type] || []).push(fn); },
    objective(text, step, of) { post({ type: 'objective', text, step, of }); },
    toast(text) { post({ type: 'toast', text }); },
    // Tell the shell the phase is over. result is merged into the shared state by the shell.
    done(result) {
      post({ type: 'phase_done', phase: phaseName, result: result || {} });
      if (!embedded) console.log('[SLICE] phase_done', phaseName, JSON.stringify(result || {}));
    },
  };
})();
