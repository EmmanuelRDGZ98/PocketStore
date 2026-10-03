const CACHE_NAME = "pocketstore-v2";

const archivosCache = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

// INSTALL
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(archivosCache))
    );

    self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(respuestaCache => {

                if (respuestaCache) {
                    return respuestaCache;
                }

                return fetch(event.request)
                    .then(respuestaRed => {

                        const copia = respuestaRed.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, copia);
                            });

                        return respuestaRed;
                    });

            })
    );
});