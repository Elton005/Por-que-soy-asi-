/**
 * App Entry Point
 * Inicialización de la aplicación PWA "¿Por qué soy así?"
 * Versión: 4.0 - Fase 5.1 consolidada
 */

document.addEventListener('DOMContentLoaded', () => {
    // ══════════════════════════════════════════════════
    // 1. REGISTRAR RUTAS PRIMERO (Antes de iniciar el router)
    // ═══════════════════════════════════════════════════
    Router.addRoute('home', () => loadView('home'));
    Router.addRoute('test', () => loadView('test-intro'));
    Router.addRoute('test/start', () => loadView('test-intro'));
    Router.addRoute('test/question', () => loadView('test-question'));
    Router.addRoute('test/results', () => loadView('results'));
    Router.addRoute('diary', () => loadView('diary'));
    Router.addRoute('profile', () => loadView('profile'));

    // 2. INICIALIZAR ROUTER (Configura el listener de hashchange)
    Router.init();

    // ══════════════════════════════════════════════════
    // 3. LOADING SCREEN Y REDIRECCIÓN INICIAL
    // ═══════════════════════════════════════════════════
    const minLoadingTime = 5000;
    
    setTimeout(() => {
        // Ocultar loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
        // Mostrar navegación según dispositivo
        showAppropriateNavigation();
        
        // Fade in suave de la navegación
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

        // ═══════════════════════════════════════════════════
        // 4. FORZAR CARGA DE HOME SI NO HAY HASH EN LA URL
        // ═══════════════════════════════════════════════════
        if (!window.location.hash || window.location.hash === '#') {
            window.location.hash = '#home';
        }
        
    }, minLoadingTime);

    // Manejar install prompt
    setupInstallPrompt();
});

/**
 * Mostrar navegación apropiada según el dispositivo
 * Desktop (≥1200px): Sidebar lateral
 * Tablet/Mobile (<1200px): Bottom nav
 */
function showAppropriateNavigation() {
    const sidebar = document.getElementById('sidebar');
    const bottomNav = document.getElementById('bottom-nav');
    
    if (!sidebar || !bottomNav) return;
    
    if (window.innerWidth >= 1200) {
        // Desktop: mostrar sidebar, ocultar bottom nav
        sidebar.classList.remove('hidden');
        bottomNav.classList.add('hidden');
        console.log('📱 Desktop: Sidebar visible');
    } else {
        // Tablet/Mobile: ocultar sidebar, mostrar bottom nav
        sidebar.classList.add('hidden');
        bottomNav.classList.remove('hidden');
        console.log('📱 Mobile/Tablet: Bottom nav visible');
    }
}

// Debounce para resize (evita ejecutar 100 veces al redimensionar)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(showAppropriateNavigation, 150);
});

/**
 * Cargar vista dinámicamente
 * @param {string} viewName - Nombre del archivo HTML (sin extensión)
 * @param {function} callback - Función opcional a ejecutar después de cargar
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
            
            // ═══════════════════════════════════════════
            // DETECTOR DE INICIALIZACIÓN
            // ═══════════════════════════════════════════
            const viewInitMap = {
                'diary': 'initDiary',
                'results': 'initResults',
                'test-question': 'initTestQuestion'
            };

            const initFn = viewInitMap[viewName];
            console.log(` Vista cargada: ${viewName} -> Buscando función: ${initFn}`);

            if (initFn && typeof window[initFn] === 'function') {
                console.log(`🚀 Ejecutando ${initFn}...`);
                try {
                    window[initFn]();
                    console.log(`✅ ${initFn} finalizado sin errores.`);
                } catch (error) {
                    console.error(`❌ ERROR FATAL en ${initFn}:`, error);
                }
            } else {
                console.warn(`⚠️ No se encontró la función ${initFn} en window.`);
            }
            
            if (typeof callback === 'function') callback();
            
        } catch (error) {
            console.error('Error loading view:', error);
            app.innerHTML = `<div class="main-content text-center"><h2>Error al cargar</h2></div>`;
            app.style.opacity = '1';
        }
    }, 200);
}

/**
 * Configurar install prompt para PWA
 */
function setupInstallPrompt() {
    let deferredPrompt;
    const installPrompt = document.getElementById('install-prompt');
    const installButton = document.getElementById('install-button');
    const installClose = document.querySelector('.install-close');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Mostrar prompt después de 8 segundos (para no interrumpir el loading)
        setTimeout(() => {
            if (installPrompt && !Storage.get('installPromptDismissed')) {
                installPrompt.classList.remove('hidden');
            }
        }, 8000);
    });

    if (installButton) {
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    showToast('¡App instalada correctamente!', 'success');
                }
                
                deferredPrompt = null;
                installPrompt.classList.add('hidden');
            }
        });
    }

    if (installClose) {
        installClose.addEventListener('click', () => {
            installPrompt.classList.add('hidden');
            Storage.set('installPromptDismissed', true);
        });
    }

    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        installPrompt?.classList.add('hidden');
        deferredPrompt = null;
    });
}

/**
 * Utilidad: Mostrar toast notification
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - 'success' | 'error' | 'info'
 * @param {number} duration - Duración en ms
 */
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container') || createToastContainer();
    
    // Iconos con Font Awesome
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

/**
 * Crear contenedor de toasts si no existe
 */
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// ═══════════════════════════════════════════════════
// EXPORTAR FUNCIONES GLOBALES
// ═══════════════════════════════════════════════════
window.loadView = loadView;
window.showToast = showToast;
window.showAppropriateNavigation = showAppropriateNavigation;