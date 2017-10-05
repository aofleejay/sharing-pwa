const VERSION = '2'
const CACHE_KEY = `cache-v${VERSION}`
const assetsToCache = [
  '/',
  '/assets/css/app.css',
  '/assets/js/app.js',
  '/assets/images/icons/icon-16x16.png',
  '/assets/images/icons/icon-24x24.png',
  '/assets/images/icons/icon-36x36.png',
  '/assets/images/icons/icon-64x64.png',
  '/assets/images/icons/icon-128x128.png',
  '/assets/images/icons/icon-256x256.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/background1.jpg',
  '/assets/images/background2.jpg',
  '/assets/images/background3.jpg',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
  'https://code.jquery.com/jquery-2.1.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_KEY)
      .then(cache => cache.addAll(assetsToCache))
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
