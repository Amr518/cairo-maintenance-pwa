const CACHE_NAME = 'maintenance-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './machines.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/api/')) {
    // API calls bypass service worker cache
    return;
  }
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
