const CSS_CACHE_KEY = 'index-css'
const urlsToCache = [
  'index.css',
  'https://script.googleusercontent.com/macros/echo?user_content_key=0TTuuA87DEwQUExbmU3HKCbxTE-GjbbdU1BSmdbOUjqT69hp8wxEaDYO57fy-Hvb4Dtl9nxgYmJCSdssp3V41WYzDA5YEDHAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6eIqWsDnSrEd&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk'
]

self.addEventListener('install', event => {
  console.log('install')
  event.waitUntil(
    caches.open(CSS_CACHE_KEY)
      .then(cache => {
        console.log('Adding Cache')
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('activate', event => {
  console.log('activate')
  event.waitUntil(
    caches.keys().then(keys => {
      keys.map(key => {
        if(key !== CSS_CACHE_KEY) {
          console.log(key)
          return caches.delete(key)
        }
      })
    })
  )
  return self.clients.claim
})

self.addEventListener('fetch', event => {
  console.log('fecth')
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
  // console.log(event.request)
  // event.respondWith(
  //   caches.match(event.request)
  //     .then(response => {
  //       if (response) {
  //         console.log('cache hit')          
  //         return fetch(event.request)
  //       } else {
  //         console.log('cache missed')
  //         const fetchRequest = event.request.clone()
  //         return fetch(fetchRequest).then(response => {
  //             if(!response || response.status !== 200 || response.type !== 'basic') {
  //               return response
  //             }

  //             const responseToCache = response.clone()
  
  //             caches.open(CSS_CACHE_KEY)
  //               .then(cache => {
  //                 cache.put(event.request, responseToCache)
  //               })
  
  //             return response
  //           }
  //         )
  //       }
  //     }
  //   )
  // )
})
