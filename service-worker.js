const CACHE_NAME = 'eaglercraft-offline-cache-v1';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './service-worker.js'
  // If your HTML loads anything else, add it here — but most offline builds don’t.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('./index.html'))
  );
});
