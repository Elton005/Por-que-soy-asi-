/**
 * Profile UI Manager - Versión Simplificada
 * Muestra el último resultado completo con estadísticas básicas
 */

const ProfileUI = {
    init() {
        console.log('📋 ProfileUI iniciado');
        this.loadProfile();
    },

    loadProfile() {
        const result = window.Storage.get('testResult');
        console.log(' Resultado del test:', result);

        const emptyState = document.getElementById('profile-empty');
        const contentState = document.getElementById('profile-content');

        if (!result || !result.perfil) {
            console.log('⚠️ No hay perfil guardado');
            if (emptyState) emptyState.style.display = 'block';
            if (contentState) contentState.style.display = 'none';
            return;
        }

        // Mostrar contenido completo
        if (emptyState) emptyState.style.display = 'none';
        if (contentState) contentState.style.display = 'block';

        const perfil = result.perfil;

        // 1. Actualizar icono del header
        const iconEl = document.getElementById('profile-icon');
        if (iconEl && perfil.icon) {
            iconEl.className = `fa-solid ${perfil.icon}`;
        }

        // 2. Actualizar fecha
        const dateEl = document.getElementById('profile-date');
        if (dateEl && result.timestamp) {
            const date = new Date(result.timestamp);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = `Realizado el ${date.toLocaleDateString('es-ES', options)}`;
        }

        // 3. Actualizar nombre del perfil
        const nameEl = document.getElementById('profile-name');
        if (nameEl) {
            nameEl.textContent = perfil.nombre || 'Perfil no definido';
        }

        // 4. Actualizar descripción
        const descEl = document.getElementById('profile-description');
        if (descEl) {
            descEl.textContent = perfil.descripcion || '';
        }

        // 5. Calcular y mostrar estadísticas
        if (result.dimensionScores) {
            this.renderStats(result.dimensionScores);
        }

        // 6. Actualizar fortalezas globales
        const strengthsEl = document.getElementById('profile-strengths');
        if (strengthsEl && perfil.fortalezas) {
            strengthsEl.innerHTML = perfil.fortalezas.map(f => 
                `<li style="margin-bottom: 8px; color: var(--color-white-soft);">• ${f}</li>`
            ).join('');
        }

        // 7. Actualizar puntos ciegos globales
        const blindspotsEl = document.getElementById('profile-blindspots');
        if (blindspotsEl && perfil.puntosCiegos) {
            blindspotsEl.innerHTML = perfil.puntosCiegos.map(b => 
                `<li style="margin-bottom: 8px; color: var(--color-white-soft);">• ${b}</li>`
            ).join('');
        }

        // 8. Actualizar recomendación
        const recEl = document.getElementById('profile-recommendation');
        if (recEl) {
            recEl.textContent = perfil.recomendacion || '';
        }

        // 9. Actualizar pregunta de reflexión
        const reflEl = document.getElementById('profile-reflection');
        if (reflEl) {
            reflEl.textContent = perfil.preguntaReflexion || '';
        }

        // 10. Generar gráfico radar
        if (result.dimensionScores && typeof window.renderRadarChart === 'function') {
            window.renderRadarChart(result.dimensionScores, 'profile-radar-chart');
        }

        // 11. Generar tarjetas de las 8 dimensiones detalladas
        if (result.dimensionScores && typeof window.renderDimensionCards === 'function') {
            window.renderDimensionCards(result.dimensionScores, 'profile-dimensions-container');
        }

        // 12. Generar perfil integrador
        if (result.dimensionScores && typeof window.renderIntegrativeProfile === 'function') {
            window.renderIntegrativeProfile(result.dimensionScores, 'profile-integrative-container');
        }

        // 13. Configurar botón de borrar datos
        this.setupClearButton();

        console.log('✅ Perfil completo cargado correctamente');
    },

    /**
     * Muestra solo el total de tests realizados
     */
    renderStats(dimensionScores) {
        const statTests = document.getElementById('stat-tests');
        if (statTests) statTests.textContent = '1';
    },

    /**
     * Configura el botón de borrar datos
     */
    setupClearButton() {
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
    }
};

// Hacer global
window.ProfileUI = ProfileUI;
window.initProfile = () => ProfileUI.init();