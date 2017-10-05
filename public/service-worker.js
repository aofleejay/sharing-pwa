const VERSION = '3'
const CACHE_KEY = `cache-v${VERSION}`
const assetsToCache = [
  '/',
  '/assets/css/app.css',
  '/assets/css/materialize.min.css',  
  '/assets/js/app.js',
  '/assets/js/jquery-2.1.1.min.js',
  '/assets/js/materialize.min.js',
  '/assets/images/icons/icon-16x16.png',
  '/assets/images/icons/icon-24x24.png',
  '/assets/images/icons/icon-32x32.png',
  '/assets/images/icons/icon-64x64.png',
  '/assets/images/icons/icon-128x128.png',
  '/assets/images/icons/icon-256x256.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/background1.jpg',
  '/assets/images/background2.jpg',
  '/assets/images/background3.jpg',
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
