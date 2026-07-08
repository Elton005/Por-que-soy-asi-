/**
 * Results View - Lógica de la pantalla de resultados
 * Se ejecuta automáticamente cuando se carga la vista 'results'
 */

/**
 * Results View - Versión Blindada
 */

function initResults() {
    console.log('🎯 initResults() iniciado');
    
    try {
        const result = window.Storage.get('testResult');
        console.log('📦 Datos recuperados del Storage:', result);

        // Si no hay datos, mostrar mensaje y no romper la app
        if (!result || !result.perfil) {
            console.warn('️ No hay perfil válido. Mostrando mensaje de error.');
            document.getElementById('result-profile-name').textContent = 'Datos no disponibles';
            document.getElementById('result-description').textContent = 'Por favor, realiza el test nuevamente.';
            return;
        }

        const perfil = result.perfil;

        // Función auxiliar segura para actualizar textos
        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text || 'Sin información';
        };

        // 1. Actualizar textos principales
        setText('result-profile-name', perfil.nombre);
        setText('result-description', perfil.descripcion);
        setText('result-recommendation', perfil.recomendacion);
        setText('result-reflection-question', perfil.preguntaReflexion);
        console.log('✅ Textos principales actualizados');

        // 2. Actualizar Icono
        const iconEl = document.getElementById('result-icon');
        if (iconEl && perfil.icon) {
            iconEl.className = `fa-solid ${perfil.icon}`;
        }

        // 3. Actualizar Listas (Fortalezas y Puntos Ciegos)
        const setList = (id, items) => {
            const el = document.getElementById(id);
            if (el && Array.isArray(items)) {
                el.innerHTML = items.map(item => `<li style="margin-bottom: 8px; color: var(--color-white-soft);">• ${item}</li>`).join('');
            }
        };

        setList('result-strengths', perfil.fortalezas);
        setList('result-blindspots', perfil.puntosCiegos);
        console.log('✅ Listas actualizadas');

        // 4. Generar Gráfico Radar
        if (result.dimensionScores && typeof window.renderRadarChart === 'function') {
            window.renderRadarChart(result.dimensionScores);
            console.log('✅ Gráfico radar generado');
        } else {
            console.warn('⚠️ No hay dimensionScores o renderRadarChart no existe');
        }

        // 5. Botón de Reinicio
        const restartBtn = document.getElementById('restart-test-btn');
        if (restartBtn) {
            restartBtn.onclick = () => {
                if(confirm('¿Seguro que quieres repetir la evaluación?')) {
                    window.Storage.remove('testResult');
                    window.Router.navigate('test');
                }
            };
        }

        console.log('✅ initResults() completado exitosamente');

    } catch (error) {
        // Si algo falla, lo mostramos en la pantalla para que no se quede en "Cargando"
        console.error('❌ ERROR CRÍTICO EN initResults:', error);
        const descEl = document.getElementById('result-description');
        if (descEl) {
            descEl.textContent = 'Error al cargar resultados: ' + error.message;
            descEl.style.color = '#EF4444';
        }
    }
}

/**
 * Renderiza un gráfico radar SVG nativo
 */
function renderRadarChart(dimensionScores) {
    const container = document.getElementById('radar-chart-container');
    if (!container) return;

    const dimensions = [
        { key: 'temperamento', label: 'Temperamento' },
        { key: 'frustracion', label: 'Frustración' },
        { key: 'conflictos', label: 'Conflictos' },
        { key: 'noVer', label: 'No Ver' },
        { key: 'noOir', label: 'No Oír' },
        { key: 'noHablar', label: 'No Hablar' },
        { key: 'autoconciencia', label: 'Autoconciencia' },
        { key: 'integracion', label: 'Integración' }
    ];

    const size = 320;
    const center = size / 2;
    const maxRadius = 120;
    const levels = 4;
    const angleStep = (Math.PI * 2) / dimensions.length;

    const values = dimensions.map(dim => {
        const scores = dimensionScores[dim.key] || {};
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const maxScore = Math.max(...Object.values(scores), 1);
        return total > 0 ? maxScore / total : 0.5;
    });

    let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">`;
    
    for (let level = 1; level <= levels; level++) {
        const radius = (maxRadius / levels) * level;
        let points = '';
        for (let i = 0; i < dimensions.length; i++) {
            const angle = angleStep * i - Math.PI / 2;
            points += `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)} `;
        }
        svg += `<polygon points="${points}" fill="none" stroke="#C9A961" stroke-width="0.5" opacity="${0.2 + level * 0.1}"/>`;
    }

    for (let i = 0; i < dimensions.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        svg += `<line x1="${center}" y1="${center}" x2="${center + maxRadius * Math.cos(angle)}" y2="${center + maxRadius * Math.sin(angle)}" stroke="#C9A961" stroke-width="0.5" opacity="0.3"/>`;
    }

    let dataPoints = '';
    const pointCoords = [];
    for (let i = 0; i < dimensions.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const radius = maxRadius * values[i];
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        dataPoints += `${x},${y} `;
        pointCoords.push({ x, y });
    }
    
    svg += `<defs><radialGradient id="goldGradient"><stop offset="0%" stop-color="#E5D4A1" stop-opacity="0.8"/><stop offset="100%" stop-color="#C9A961" stop-opacity="0.4"/></radialGradient></defs>`;
    svg += `<polygon points="${dataPoints}" fill="url(#goldGradient)" fill-opacity="0.3" stroke="#E5D4A1" stroke-width="2"/>`;

    pointCoords.forEach(coord => {
        svg += `<circle cx="${coord.x}" cy="${coord.y}" r="4" fill="#E5D4A1" stroke="#0A0A0F" stroke-width="2"/>`;
    });

    dimensions.forEach((dim, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const labelRadius = maxRadius + 25;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        let textAnchor = 'middle';
        if (Math.cos(angle) > 0.3) textAnchor = 'start';
        else if (Math.cos(angle) < -0.3) textAnchor = 'end';
        svg += `<text x="${x}" y="${y}" fill="#E5D4A1" font-size="11" font-family="Inter, sans-serif" text-anchor="${textAnchor}" dominant-baseline="middle">${dim.label}</text>`;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
}

// Hacer globales
window.initResults = initResults;
window.renderRadarChart = renderRadarChart;