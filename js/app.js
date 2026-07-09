/**
 * App Entry Point
 * Versión: 6.0 - Con actualización automática de PWA
 */

document.addEventListener('DOMContentLoaded', () => {
    // ═══════════════════════════════════════════════════
    // 1. REGISTRAR RUTAS
    // ═══════════════════════════════════════════════════
    Router.addRoute('home', () => loadView('home'));
    Router.addRoute('test', () => loadView('test-intro'));
    Router.addRoute('test/start', () => loadView('test-intro'));
    Router.addRoute('test/question', () => loadView('test-question'));
    Router.addRoute('test/dimension-intro', () => loadView('dimension-intro'));
    Router.addRoute('test/results', () => loadView('results'));
    Router.addRoute('diary', () => loadView('diary'));
    Router.addRoute('profile', () => loadView('profile'));

    Router.init();

    // ═══════════════════════════════════════════════════
    // 2. LOADING SCREEN
    // ═══════════════════════════════════════════════════
    const minLoadingTime = 5000;
    
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.classList.add('hidden');
        
        showAppropriateNavigation();
        
        setTimeout(() => {
            const bottomNav = document.getElementById('bottom-nav');
            const sidebar = document.getElementById('sidebar');
            
            if (bottomNav && !bottomNav.classList.contains('hidden')) {
                bottomNav.style.opacity = '1';
            }
            if (sidebar && !sidebar.classList.contains('hidden')) {
                sidebar.style.opacity = '1';
            }
        }, 500);

        if (!window.location.hash || window.location.hash === '#') {
            window.location.hash = '#home';
        }
        
    }, minLoadingTime);

    // ═══════════════════════════════════════════════════
    // 3. INSTALACIÓN PWA CON DEBUG COMPLETO
    // ═══════════════════════════════════════════════════
    setupInstallPrompt();
});

/**
 * Mostrar navegación apropiada según el dispositivo
 * Desktop (≥1200px): Sidebar lateral + Header
 * Tablet/Mobile (<1200px): Bottom nav + Header
 */
function showAppropriateNavigation() {
    const sidebar = document.getElementById('sidebar');
    const bottomNav = document.getElementById('bottom-nav');
    const header = document.getElementById('app-header');
    
    if (!sidebar || !bottomNav || !header) return;
    
    // El header SIEMPRE está visible
    header.style.display = 'block';
    
    if (window.innerWidth >= 1200) {
        sidebar.classList.remove('hidden');
        bottomNav.classList.add('hidden');
        console.log('📱 Desktop: Sidebar + Header visible');
    } else {
        sidebar.classList.add('hidden');
        bottomNav.classList.remove('hidden');
        console.log('📱 Mobile/Tablet: Bottom nav + Header visible');
    }
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(showAppropriateNavigation, 150);
});

/**
 * Cargar vista dinámicamente
 */
async function loadView(viewName, callback = null) {
    const app = document.getElementById('app');
    if (!app) return;
    
    app.style.opacity = '0';
    app.style.transition = 'opacity 200ms ease';
    
    setTimeout(async () => {
        try {
            window.scrollTo(0, 0);
            const response = await fetch(`views/${viewName}.html`);
            
            if (!response.ok) throw new Error(`View not found: ${viewName}`);
            
            const html = await response.text();
            app.innerHTML = html;
            
            requestAnimationFrame(() => { app.style.opacity = '1'; });
            
            const viewInitMap = {
                'diary': 'initDiary',
                'results': 'initResults',
                'test-question': 'initTestQuestion',
                'profile': 'initProfile'
            };

            const initFn = viewInitMap[viewName];
            if (initFn && typeof window[initFn] === 'function') {
                try {
                    window[initFn]();
                } catch (error) {
                    console.error(`❌ Error en ${initFn}:`, error);
                }
            }
            
            if (typeof callback === 'function') callback();
            
        } catch (error) {
            console.error('Error loading view:', error);
            app.innerHTML = `
                <div class="main-content text-center" style="padding: var(--space-8);">
                    <h2 style="color: var(--color-gold-primary); margin-bottom: var(--space-4);">Error al cargar</h2>
                    <p style="color: var(--color-gray-light); margin-bottom: var(--space-6);">No se pudo cargar "${viewName}".</p>
                    <button class="btn btn-primary" onclick="Router.navigate('home')">Volver al inicio</button>
                </div>
            `;
            app.style.opacity = '1';
        }
    }, 200);
}

/**
 * ═══════════════════════════════════════════════════════
 * INSTALACIÓN PWA - VERSIÓN CON DEBUG COMPLETO
 * ═══════════════════════════════════════════════════════
 */
function setupInstallPrompt() {
    console.log('🔧 setupInstallPrompt() iniciado');
    
    window.deferredPrompt = null;
    
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    console.log('📱 ¿Ya instalada?', isStandalone);
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    console.log('🍎 ¿Es iOS?', isIOS);
    
    const isDesktop = window.innerWidth >= 1200;
    console.log('🖥️ ¿Es desktop?', isDesktop);

    // ═══════════════════════════════════════════════════
    // ESCUCHAR EL EVENTO NATIVO DE INSTALACIÓN
    // ═══════════════════════════════════════════════════
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('🎉 ¡EVENTO beforeinstallprompt DISPARADO!');
        e.preventDefault();
        window.deferredPrompt = e;
        
        const installBtn = document.getElementById('btn-install-app');
        if (installBtn) {
            installBtn.style.display = 'inline-flex';
            console.log('✅ Botón de instalación mostrado');
        } else {
            console.warn('⚠️ No se encontró el botón #btn-install-app');
        }
    });

    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA instalada exitosamente');
        window.deferredPrompt = null;
        const installBtn = document.getElementById('btn-install-app');
        if (installBtn) installBtn.style.display = 'none';
        showToast('¡Aplicación instalada con éxito!', 'success');
    });

    // ═══════════════════════════════════════════════════
    // FUNCIÓN GLOBAL PARA EL BOTÓN
    // ═══════════════════════════════════════════════════
    window.triggerInstall = async () => {
        console.log('🖱️ Botón de instalación clickeado');
        console.log('📦 deferredPrompt existe?', !!window.deferredPrompt);
        
        if (isIOS) {
            console.log('🍎 Mostrando instrucciones para iOS');
            showToast('En iPhone: usa el botón "Compartir" y elige "Añadir a pantalla de inicio"', 'info', 5000);
            return;
        }

        if (!window.deferredPrompt) {
            console.warn('⚠️ No hay deferredPrompt disponible');
            
            if (isStandalone) {
                showToast('La aplicación ya está instalada', 'info');
            } else {
                showToast('La instalación no está disponible. Verifica que los iconos sean PNG.', 'info', 5000);
                console.log('🔍 Posibles causas:');
                console.log('   - Los iconos no son PNG (Chrome requiere PNG)');
                console.log('   - El manifest.json tiene errores');
                console.log('   - El Service Worker no está activo');
                console.log('   - No estás en HTTPS o localhost');
            }
            return;
        }

        try {
            console.log('🚀 Llamando a deferredPrompt.prompt()');
            window.deferredPrompt.prompt();
            
            const { outcome } = await window.deferredPrompt.userChoice;
            console.log('📊 Resultado:', outcome);
            
            if (outcome === 'accepted') {
                showToast('¡Instalación aceptada!', 'success');
            } else {
                showToast('Instalación cancelada', 'info');
            }
            
            window.deferredPrompt = null;
            const installBtn = document.getElementById('btn-install-app');
            if (installBtn) installBtn.style.display = 'none';
            
        } catch (error) {
            console.error('❌ Error al instalar:', error);
            showToast('Error al intentar instalar', 'error');
        }
    };

    // ═══════════════════════════════════════════════════
    // VERIFICACIÓN INICIAL (después de 3 segundos)
    // ═══════════════════════════════════════════════════
    setTimeout(() => {
        console.log('🔍 Verificación inicial de PWA:');
        console.log('   - deferredPrompt:', window.deferredPrompt ? '✅ Disponible' : '❌ No disponible');
        console.log('   - Service Worker:', navigator.serviceWorker ? '✅ Registrado' : '❌ No soportado');
        console.log('   - Manifest:', document.querySelector('link[rel="manifest"]') ? '✅ Enlazado' : '❌ No encontrado');
        
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (manifestLink) {
            fetch(manifestLink.href)
                .then(r => r.json())
                .then(manifest => {
                    console.log('📋 Manifest:', manifest);
                    console.log('🖼️ Iconos declarados:', manifest.icons);
                    manifest.icons?.forEach(icon => {
                        console.log(`   - ${icon.src} (${icon.sizes}) - Tipo: ${icon.type}`);
                    });
                })
                .catch(err => console.error('❌ Error al leer manifest:', err));
        }
    }, 3000);
}

/**
 * Toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container') || createToastContainer();
    
    const icons = {
        success: '<i class="fa-solid fa-circle-check"></i>',
        error: '<i class="fa-solid fa-circle-xmark"></i>',
        info: '<i class="fa-solid fa-circle-info"></i>'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// ═══════════════════════════════════════════════════════
// ACTUALIZACIÓN AUTOMÁTICA DE LA PWA
// ═══════════════════════════════════════════════════════

/**
 * Muestra un toast invitando al usuario a actualizar
 */
function showUpdateNotification() {
    const container = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = 'toast info';
    toast.style.background = 'linear-gradient(135deg, var(--color-gold-primary) 0%, var(--color-gold-dark) 100%)';
    toast.style.color = 'var(--color-black-deep)';
    toast.style.padding = 'var(--space-4) var(--space-6)';
    toast.style.borderRadius = 'var(--radius-lg)';
    toast.style.boxShadow = '0 8px 25px rgba(201,169,97,0.4)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = 'var(--space-3)';
    toast.style.maxWidth = '400px';
    toast.innerHTML = `
        <i class="fa-solid fa-rotate" style="font-size: 1.2rem;"></i>
        <span style="flex: 1; font-weight: 500;">Nueva versión disponible</span>
        <button onclick="forceUpdate()" style="background: var(--color-black-deep); color: var(--color-gold-primary); border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">
            Actualizar
        </button>
    `;
    
    container.appendChild(toast);
    
    // Auto-cerrar después de 10 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 10000);
}

/**
 * Fuerza la actualización del Service Worker
 */
window.forceUpdate = async () => {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else {
            window.location.reload(true);
        }
    }
};

// Callback cuando se detecta una actualización
window.onSWUpdate = () => {
    showUpdateNotification();
};

// Verificar si hay un SW en espera al cargar
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
            console.log('⏳ Hay un SW en espera');
        }
    });
}

// ═══════════════════════════════════════════════════════
// EXPORTAR FUNCIONES GLOBALES
// ═══════════════════════════════════════════════════════
window.loadView = loadView;
window.showToast = showToast;
window.showAppropriateNavigation = showAppropriateNavigation;