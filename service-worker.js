const CACHE_NAME = "malla-arquitectura-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/data/style.css",
  "/data/main.js",
  "/data/manifest.json",
  "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
