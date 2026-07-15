/**
 * Profile UI Manager - Alineado 100% con el libro y results-view
 */

const ProfileUI = {
    init() {
        console.log('📋 ProfileUI iniciado');
        this.loadProfile();
    },

    loadProfile() {
        const result = window.Storage.get('testResult');
        const emptyState = document.getElementById('profile-empty');
        const contentState = document.getElementById('profile-content');

        if (!result || !result.perfil) {
            if (emptyState) emptyState.style.display = 'block';
            if (contentState) contentState.style.display = 'none';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (contentState) contentState.style.display = 'block';

        const perfil = result.perfil;

        // 1. Nombre del perfil (Sin título redundante, solo el nombre)
        const nameEl = document.getElementById('profile-name');
        if (nameEl) nameEl.textContent = perfil.nombre;

        // 2. Descripción
        const descEl = document.getElementById('profile-description');
        if (descEl) descEl.textContent = perfil.descripcion;

        // 3. Fecha
        const dateEl = document.getElementById('profile-date');
        if (dateEl && result.timestamp) {
            const date = new Date(result.timestamp);
            dateEl.textContent = `Realizado el ${date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`;
        }

        // 4. Fortalezas y Puntos Ciegos
        const setList = (id, items) => {
            const el = document.getElementById(id);
            if (el && Array.isArray(items)) {
                el.innerHTML = items.map(item => 
                    `<li style="margin-bottom: 6px; color: var(--color-white-soft); font-size: 0.85rem;">• ${item}</li>`
                ).join('');
            }
        };
        setList('profile-strengths', perfil.fortalezas);
        setList('profile-blindspots', perfil.puntosCiegos);

        // 5. Recomendación y Reflexión
        const recEl = document.getElementById('profile-recommendation');
        const reflEl = document.getElementById('profile-reflection');
        if (recEl) recEl.textContent = perfil.recomendacion;
        if (reflEl) reflEl.textContent = perfil.preguntaReflexion;

        // 6. Gráfico y Tarjetas (Reutilizando las funciones de results-view)
        if (result.dimensionScores) {
            if (typeof window.renderDimensionBars === 'function') {
                window.renderDimensionBars(result.dimensionScores, 'profile-radar-chart');
            }
            if (typeof window.renderDimensionCards === 'function') {
                window.renderDimensionCards(result.dimensionScores, 'profile-dimensions-container');
            }
        }

        // 7. Botón de borrar datos
        const clearBtn = document.getElementById('clear-data-btn');
        if (clearBtn) {
            clearBtn.onclick = () => {
                if (confirm('¿Estás seguro de que quieres borrar todos tus datos? Esta acción no se puede deshacer.')) {
                    window.Storage.remove('testResult');
                    window.Router.navigate('home');
                    location.reload();
                }
            };
        }

        console.log('✅ Perfil completo cargado correctamente');
    }
};

window.ProfileUI = ProfileUI;
window.initProfile = () => ProfileUI.init();