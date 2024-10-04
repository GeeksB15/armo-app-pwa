// sw.js
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('app-cache').then(cache => {
        return cache.addAll([
          'armo-app-pwa/',
          'armo-app-pwa/favicon.ico',
          '/index.html',
          'armo-app-pwa/manifest.json',
          'armo-app-pwa/sw.js',
          'armo-app-pwa/js/App.js',
          'armo-app-pwa/js/Geeks.js'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  