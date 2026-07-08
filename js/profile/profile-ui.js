/**
 * Profile UI Manager
 * Carga y muestra el último resultado del test guardado
 */

const ProfileUI = {
    init() {
        console.log('📋 ProfileUI iniciado');
        this.loadProfile();
    },

    loadProfile() {
        // Obtener resultado del Storage
        const result = window.Storage.get('testResult');
        console.log('📦 Resultado del test:', result);

        const emptyState = document.getElementById('profile-empty');
        const contentState = document.getElementById('profile-content');

        if (!result || !result.perfil) {
            // No hay test realizado
            console.log('⚠️ No hay perfil guardado');
            if (emptyState) emptyState.style.display = 'block';
            if (contentState) contentState.style.display = 'none';
            return;
        }

        // Mostrar contenido del perfil
        if (emptyState) emptyState.style.display = 'none';
        if (contentState) contentState.style.display = 'block';

        const perfil = result.perfil;

        // 1. Actualizar icono
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

        // 5. Actualizar fortalezas
        const strengthsEl = document.getElementById('profile-strengths');
        if (strengthsEl && perfil.fortalezas) {
            strengthsEl.innerHTML = perfil.fortalezas.map(f => 
                `<li style="margin-bottom: var(--space-2); color: var(--color-white-soft);">• ${f}</li>`
            ).join('');
        }

        // 6. Actualizar puntos ciegos
        const blindspotsEl = document.getElementById('profile-blindspots');
        if (blindspotsEl && perfil.puntosCiegos) {
            blindspotsEl.innerHTML = perfil.puntosCiegos.map(b => 
                `<li style="margin-bottom: var(--space-2); color: var(--color-white-soft);">• ${b}</li>`
            ).join('');
        }

        // 7. Actualizar recomendación
        const recEl = document.getElementById('profile-recommendation');
        if (recEl) {
            recEl.textContent = perfil.recomendacion || '';
        }

        // 8. Actualizar pregunta de reflexión
        const reflEl = document.getElementById('profile-reflection');
        if (reflEl) {
            reflEl.textContent = perfil.preguntaReflexion || '';
        }

        // 9. Generar gráfico radar
        if (result.dimensionScores && typeof window.renderRadarChart === 'function') {
            window.renderRadarChart(result.dimensionScores, 'profile-radar-chart');
        }

        console.log('✅ Perfil cargado correctamente');
    }
};

// Hacer global
window.ProfileUI = ProfileUI;
window.initProfile = () => ProfileUI.init();