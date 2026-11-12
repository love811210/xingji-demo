// VERTICAL SLICE - NOT FOR PRODUCTION. Written by build-dist.py: serves the game from its offline cache (PWA).
// The cache is filled by the page itself (index.html, keepOffline), a few files at a time: a 24 MB install inside this worker was cut off by the browser on a slow line.
const CACHE = 'xingji-a344462c2270';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('xingji-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => { // the game's own files come from the cache (the address's ?options are ignored); anything missing is fetched once and kept
  const u = new URL(e.request.url); if (e.request.method !== 'GET' || u.origin !== location.origin || /\/(sw\.js|offline\.json)$/.test(u.pathname)) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(n => {
    if (n.ok && n.type === 'basic') { const copy = n.clone(); caches.open(CACHE).then(c => c.put(u.origin + u.pathname, copy)); }
    return n;
  }).catch(() => e.request.mode === 'navigate' ? caches.match('index.html') : Response.error())));
});
