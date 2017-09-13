const VERSION = '1'
const CACHE_KEY = `cache-v${VERSION}`
const assetsToCache = [
  '/',
  'assets/css/app.css',
  'assets/js/app.js',
  'assets/images/logo.png',
  'assets/images/background1.png',
  'assets/images/background2.png',
  'assets/images/background3.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
  'https://code.jquery.com/jquery-2.1.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_KEY)
      .then(cache => cache.addAll(assetsToCache))
      .then(() => self.skipWaiting())  
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheResp => {
      return cacheResp || fetch(event.request).then(response => {
        return caches.open(CACHE_KEY).then(cache => {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  )
})

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_KEY]

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})
