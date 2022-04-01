const staticCacheName = "site-static";
const assets = [
  '/',
  '/views/index.ejs',
  '/views/home.ejs',
  '/views/partials/foot.ejs',
  '/views/partials/head.ejs',
  '/public/css/style.css',
  '/public/img/rijksmuseum.png',
  '/app.js',
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
});

// fetch

self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
});

