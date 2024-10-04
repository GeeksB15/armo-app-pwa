// sw.js
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('app-cache').then(cache => {
        return cache.addAll([
          'index.html',
          'manifest.json',
          'js/App.js',
          'js/Geeks.js',
          'js/MDE.js',
          'js/underscore.js'
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
  