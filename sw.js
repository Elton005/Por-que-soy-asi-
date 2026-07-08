/**
 * Service Worker - Cache First Strategy
 * Para funcionamiento offline
 */

const CACHE_NAME = 'por-que-soy-asi-v2'; // ← Versión actualizada
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/404.html',
    '/css/variables.css',
    '/css/reset.css',
    '/css/main.css',
    '/css/components.css',
    '/css/animations.css',
    '/js/app.js',
    '/js/router.js',
    '/js/storage.js',
    '/js/test/questions.js',
    '/js/test/scoring.js',
    '/js/test/test-ui.js',
    '/js/test/test-init.js',
    '/js/diary/prompts.js',
    '/js/diary/diary-ui.js',
    '/js/views/results-view.js',
    '/views/home.html',
    '/views/test-intro.html',
    '/views/test-question.html',
    '/views/results.html',
    '/views/diary.html',
    '/views/profile.html'
];

// ... resto del sw.js igual

// Instalar Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch((error) => {
                console.error('Cache install failed:', error);
            })
    );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar requests - Cache First Strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                // Cache miss - fetch from network
                return fetch(event.request).then(
                    (response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
            .catch(() => {
                // If both cache and network fail, show offline page
                return caches.match('/index.html');
            })
    );
});