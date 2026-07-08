/**
 * Service Worker - Cache First Strategy
 * Versión: 2.0 - Solo archivos existentes
 */

const CACHE_NAME = 'por-que-soy-asi-v6';
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
    '/views/profile.html',
    '/assets/icons/icon-512x512.png'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('✅ Cache abierto:', CACHE_NAME);
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch((error) => {
                console.error('❌ Error en cache install:', error);
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
                        console.log('🗑️ Eliminando cache antigua:', cacheName);
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
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(
                    (response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

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
                return caches.match('/index.html');
            })
    );
});
