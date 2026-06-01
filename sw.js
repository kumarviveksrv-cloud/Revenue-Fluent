// Revenue Fluent — Service Worker v3
// Enables offline access + PWA install

const CACHE_NAME = 'revenue-fluent-v4';

const CACHE_URLS = [
  '/Revenue-Fluent/',
  '/Revenue-Fluent/index.html',
  '/Revenue-Fluent/dashboard.html',
  '/Revenue-Fluent/shared.js',
  // Tools
  '/Revenue-Fluent/p1-tool.html',
  '/Revenue-Fluent/p2-tool.html',
  '/Revenue-Fluent/p3-tool.html',
  '/Revenue-Fluent/p4-tool.html',
  '/Revenue-Fluent/p5-tool.html',
  // Learning Hub
  '/Revenue-Fluent/learn.html',
  '/Revenue-Fluent/learn-p1.html',
  '/Revenue-Fluent/learn-p2.html',
  '/Revenue-Fluent/learn-p3.html',
  '/Revenue-Fluent/learn-p4.html',
  '/Revenue-Fluent/learn-p5.html',
  // Platform pages
  '/Revenue-Fluent/cases.html',
  '/Revenue-Fluent/simulate.html',
  '/Revenue-Fluent/game.html',
  '/Revenue-Fluent/scenarios.html',
  '/Revenue-Fluent/certification.html',
  '/Revenue-Fluent/pricing.html',
];

// Install — cache all v3 files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate — wipe ALL old caches (v1, v2)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache first, fallback to network
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (response.ok && event.request.url.includes('Revenue-Fluent')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/Revenue-Fluent/index.html');
        }
      });
    })
  );
});
