/**
 * Router - Sistema de navegación SPA con hash routing
 * Compatible con GitHub Pages
 */

const Router = {
    routes: {},
    currentRoute: null,
    notFoundRoute: 'home',

    /**
     * Registrar una ruta
     */
    addRoute(path, handler) {
        this.routes[path] = handler;
    },

    /**
     * Navegar a una ruta
     */
    navigate(path) {
        window.location.hash = `#${path}`;
    },

    /**
     * Obtener la ruta actual
     */
    getCurrentRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        return hash.split('?')[0]; // Remover query params
    },

    /**
     * Manejar cambio de ruta
     */
    handleRoute() {
        const route = this.getCurrentRoute();
        const handler = this.routes[route] || this.routes[this.notFoundRoute];

        if (handler) {
            this.currentRoute = route;
            handler();
            this.updateActiveNav(route);
        }
    },

    /**
 * Actualizar navegación activa (sidebar + bottom nav)
 */
updateActiveNav(route) {
    // Actualizar bottom nav
    const bottomNavItems = document.querySelectorAll('#bottom-nav .nav-item');
    bottomNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.route === route) {
            item.classList.add('active');
        }
    });
    
    // Actualizar sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.route === route) {
            item.classList.add('active');
        }
    });
},

    /**
     * Inicializar router
     */
    init() {
        // Manejar navegación inicial
        this.handleRoute();

        // Escuchar cambios de hash
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Prevenir recarga en enlaces internos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const path = link.getAttribute('href').slice(1);
                this.navigate(path);
            }
        });
    }
};

// Exportar para uso global
window.Router = Router;