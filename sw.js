/**
 * Service Worker - Estrategia Híbrida
 * Network First para contenido dinámico (HTML, JS, CSS)
 * Cache First para assets estáticos (imágenes, fuentes)
 * Versión: 6.0 - Con actualización forzada
 */

const CACHE_NAME = 'por-que-soy-asi-v6';
const VERSION = '6.0.0';

// Recursos críticos que SIEMPRE deben estar disponibles offline
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
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
    '/js/profile/profile-ui.js',
    '/views/home.html',
    '/views/test-intro.html',
    '/views/test-question.html',
    '/views/results.html',
    '/views/diary.html',
    '/views/profile.html',
    '/assets/icons/icon-512x512.png'
];

// ═══════════════════════════════════════════════════════
// INSTALACIÓN: Precachear recursos críticos
// ═══════════════════════════════════════════════════════
self.addEventListener('install', (event) => {
    console.log(`🔧 SW v${VERSION} instalando...`);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('✅ Cache abierto:', CACHE_NAME);
                return cache.addAll(CRITICAL_ASSETS);
            })
            .catch((error) => {
                console.error('❌ Error en precache:', error);
            })
    );
    
    // Forzar activación inmediata (saltar waiting)
    self.skipWaiting();
});

// ═══════════════════════════════════════════════════════
// ACTIVACIÓN: Limpiar caches antiguas
// ═══════════════════════════════════════════════════════
self.addEventListener('activate', (event) => {
    console.log(`✅ SW v${VERSION} activado`);
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => {
                        console.log('🗑️ Eliminando cache antigua:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            // Tomar control inmediato de todas las pestañas
            return self.clients.claim();
        })
    );
});

// ══════════════════════════════════════════════════════
// FETCH: Estrategia híbrida
// ═══════════════════════════════════════════════════════
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Ignorar requests que no sean del mismo origen
    if (url.origin !== location.origin) return;
    
    // Ignorar requests POST (formularios, etc.)
    if (event.request.method !== 'GET') return;

    // ═══════════════════════════════════════════════════
    // ESTRATEGIA 1: NETWORK FIRST
    // Para HTML, JS, CSS y vistas dinámicas
    // Intenta la red primero, si falla usa caché
    // ═══════════════════════════════════════════════════
    if (
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css') ||
        url.pathname === '/' ||
        url.pathname.startsWith('/views/') ||
        url.pathname.startsWith('/js/') ||
        url.pathname.startsWith('/css/')
    ) {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Si la respuesta es válida, actualizar caché
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // Si falla la red, usar caché
                    return caches.match(event.request);
                })
        );
        return;
    }

    // ═══════════════════════════════════════════════════
    // ESTRATEGIA 2: CACHE FIRST
    // Para imágenes, iconos y fuentes
    // Usa caché primero, si no existe va a la red
    // ═══════════════════════════════════════════════════
    if (
        url.pathname.startsWith('/assets/') ||
        url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/i)
    ) {
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request).then((response) => {
                        if (response && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    });
                })
        );
        return;
    }

    // ═══════════════════════════════════════════════════
    // ESTRATEGIA 3: NETWORK ONLY
    // Para manifest.json y otros recursos que siempre deben estar frescos
    // ═══════════════════════════════════════════════════
    if (url.pathname.endsWith('manifest.json')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            })
        );
        return;
    }

    // ══════════════════════════════════════════════════
    // DEFAULT: Network First con fallback
    // ═══════════════════════════════════════════════════
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});

// ═══════════════════════════════════════════════════════
// MENSAJERÍA: Comunicación con la app
// ═══════════════════════════════════════════════════════
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.source.postMessage({
            type: 'VERSION',
            version: VERSION
        });
    }
});