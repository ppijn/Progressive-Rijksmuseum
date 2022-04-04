const staticCacheName = "site-static-v8";
const dynamicCache = 'site-dynamic-v1'
const assets = [
  '/',
  '/css/style.css',
  '/img',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'  
];

self.addEventListener('install', evt => {
  // console.log('service worker has been installed');
  evt.waitUntil( 
    caches.open(staticCacheName).then(cache => {
     console.log('caching shell assets');
     cache.addAll(assets);
    })
  );
});

// activate event

self.addEventListener('activate', evt => {
  // console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys); 
      return Promise.all(keys
        .filter(key  => key !== staticCacheName)
        .map(key => caches.delete(key))
        )
    })
  );
});

// fetch

self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCache).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
  );
});

