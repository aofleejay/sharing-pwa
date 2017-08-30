const CSS_CACHE_KEY = 'cache-request-v5'
const urlsToCache = [
  '/index.css',
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CSS_CACHE_KEY).then(function(cache) {
      return cache.addAll(urlsToCache);
    }).then(() => {
      return self.skipWaiting();      
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open(CSS_CACHE_KEY).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CSS_CACHE_KEY];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
