// Revenue Fluent — Service Worker
// Version: 2026-06-10
// Enables offline access and PWA install

const CACHE_NAME = 'revenue-fluent-v10';

const CORE_FILES = [
  '/',
  '/index.html',
  '/home.html',
  '/scenario-library.html',
  '/upload.html',
  '/profile.html',
  '/downloads.html',
  '/learn.html',
  '/pricing.html',
  '/privacy.html',
  '/terms.html',
  '/humacity.html',
  '/p1-tool.html',
  '/p2-tool.html',
  '/p3-tool.html',
  '/p4-tool.html',
  '/p5-tool.html',
  '/rf-data.js',
  '/rf-report.js',
  '/rf-profile.js',
  '/manifest.json',
  '/favicon.png',
  '/logo.png',
];

// Install — cache all core files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(CORE_FILES);
      })
      .then(function() {
        return self.skipWaiting();
      })
      .catch(function(err) {
        console.warn('SW install cache error:', err);
      })
  );
});

// Activate — delete old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(
          keys
            .filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
        );
      })
      .then(function() {
        return self.clients.claim();
      })
  );
});

// Fetch — network first, fall back to cache
// This ensures users always get fresh data when online
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests (fonts, CDN etc)
  var url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Cache successful same-origin responses
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(function() {
        // Network failed — try cache
        return caches.match(event.request)
          .then(function(cached) {
            if (cached) return cached;
            // Final fallback for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/home.html');
            }
          });
      })
  );
});
