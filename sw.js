const cacheName = 'restaurant-static-v1';
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(cacheFiles)
                       .catch(error => {
                            console.log('Caches open failed: ' + error
                        );
            });
        })
    );
});

// self.addEventListener('fetch', event => {
//     event.respondWith(
//       caches.match(event.request).then(response => {
//         return response || fetch(event.request).then(fetchResponse => { // new
//           return caches.open(staticCacheName).then(cache => {           // new
//             cache.put(event.request, fetchResponse.clone());            // new
//             return fetchResponse;                                       // new
//           });                                                           // new
//         });                                                             // new
//       }).catch(error => {
//         return new Response('Not connected to the internet', {
//           status: 404,
//           statusText: "Not connected to the internet"
//         });
//       })
//     );
//   });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function(response) {
//           // Cache hit - return response
//           if (response) {
//             return response;
//           }
  
//           // IMPORTANT: Clone the request. A request is a stream and
//           // can only be consumed once. Since we are consuming this
//           // once by cache and once by the browser for fetch, we need
//           // to clone the response.
//           var fetchRequest = event.request.clone();
  
//           return fetch(fetchRequest).then(
//             function(response) {
//               // Check if we received a valid response
//               if(!response || response.status !== 200 || response.type !== 'basic') {
//                 return response;
//               }
  
//               // IMPORTANT: Clone the response. A response is a stream
//               // and because we want the browser to consume the response
//               // as well as the cache consuming the response, we need
//               // to clone it so we have two streams.
//               var responseToCache = response.clone();
  
//               caches.open(CACHE_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request, responseToCache);
//                 });
  
//               return response;
//             }
//           );
//         })
//       );
//   });

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
        .catch(error => {
            console.log(error);
        })
    );
});