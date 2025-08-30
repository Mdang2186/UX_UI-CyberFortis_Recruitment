// assets/sw.js
const NAME = 'cf-partials-v1';
const PARTIALS = ['Header.html','Sidebar.html','Footer.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(NAME).then(c => c.addAll(PARTIALS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k!==NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Cache-first, update ngầm
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);
  if (request.method !== 'GET') return;
  if (!PARTIALS.includes(url.pathname.split('/').pop())) return;

  e.respondWith((async () => {
    const cache = await caches.open(NAME);
    const cached = await cache.match(request);
    const fetchPromise = fetch(request).then(res => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    }).catch(()=>null);
    return cached || fetchPromise || fetch(request);
  })());
});
