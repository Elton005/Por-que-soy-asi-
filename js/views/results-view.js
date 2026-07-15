/**
 * Results View - Versión Final Corregida y Estable
 * Alineada 100% con las claves de dimensions-detail.js
 */

function initResults() {
    console.log('🎯 initResults() iniciado');
    
    try {
        const result = window.Storage.get('testResult');
        console.log('📦 Datos recuperados del Storage:', result);

        if (!result || !result.perfil) {
            console.warn('⚠️ No hay perfil válido.');
            const nameEl = document.getElementById('result-profile-name');
            const descEl = document.getElementById('result-description');
            if (nameEl) nameEl.textContent = 'Datos no disponibles';
            if (descEl) descEl.textContent = 'Por favor, realiza el test nuevamente.';
            return;
        }

        const perfil = result.perfil;

        // 1. Renderizar nombre y descripción del perfil
        const nameEl = document.getElementById('result-profile-name');
        const descEl = document.getElementById('result-description');
        if (nameEl) nameEl.textContent = perfil.nombre;
        if (descEl) descEl.textContent = perfil.descripcion;

        // 2. Gráfico de barras
        if (result.dimensionScores) {
            renderDimensionBars(result.dimensionScores);
            console.log('✅ Gráfico de barras generado');
        }

        // 3. Tarjetas detalladas de dimensiones
        renderDimensionCards(result.dimensionScores);

        // 4. Fortalezas y puntos ciegos
        const setList = (id, items) => {
            const el = document.getElementById(id);
            if (el && Array.isArray(items)) {
                el.innerHTML = items.map(item => 
                    `<li style="margin-bottom: 6px; color: var(--color-white-soft); font-size: 0.85rem;">• ${item}</li>`
                ).join('');
            }
        };
        setList('result-strengths', perfil.fortalezas);
        setList('result-blindspots', perfil.puntosCiegos);

        // 5. Recomendación y Reflexión
        const recEl = document.getElementById('result-recommendation');
        const reflEl = document.getElementById('result-reflection-question');
        if (recEl) recEl.textContent = perfil.recomendacion;
        if (reflEl) reflEl.textContent = perfil.preguntaReflexion;

        // 6. Botón de reinicio
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
        console.error('❌ ERROR CRÍTICO EN initResults:', error);
    }
}

/**
 * Gráfico de barras horizontales con Font Awesome
 */
function renderDimensionBars(dimensionScores, containerId = 'radar-chart-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const dimensions = [
        { key: 'temperamento', label: 'Temperamento' },
        { key: 'frustracion', label: 'Tolerancia a la Frustración' },
        { key: 'conflictos', label: 'Gestión de Conflictos' },
        { key: 'noVer', label: 'No ver el mal' },
        { key: 'noOir', label: 'No oír el mal' },
        { key: 'noHablar', label: 'No hablar el mal' },
        { key: 'autoconciencia', label: 'Autoconciencia y Gestión' },
        { key: 'integracion', label: 'Integración y Dirección' }
    ];

    let html = '<div style="display: grid; gap: 14px;">';

    dimensions.forEach(dim => {
        const dimInfo = window.DimensionsDetail[dim.key];
        const scores = dimensionScores[dim.key] || {};
        
        // Encontrar la clave ganadora (ej: 'sanguineo', 'alta', 'competitivo')
        const claveGanadora = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const percentage = total > 0 ? Math.round((scores[claveGanadora] / total) * 100) : 0;
        
        let barColor = '#FFC107'; // Amarillo por defecto
        let bgColor = 'rgba(255, 193, 7, 0.1)';

        // Lógica de colores semafóricos basada en el porcentaje de dominancia
        if (percentage >= 70) {
            barColor = '#4CAF50'; // Verde
            bgColor = 'rgba(76, 175, 80, 0.1)';
        } else if (percentage <= 40) {
            barColor = '#F44336'; // Rojo (cuando hay mucha dispersión o baja dominancia)
            bgColor = 'rgba(244, 67, 54, 0.1)';
        }

        html += `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="${dimInfo.icono}" style="color: var(--color-gold-primary); font-size: 1.1rem; width: 24px; text-align: center; flex-shrink: 0;"></i>
                <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 0.8rem; color: var(--color-white-soft); margin-bottom: 5px; font-weight: 500;">
                        ${dim.label}
                    </div>
                    <div style="width: 100%; height: 8px; background: ${bgColor}; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${percentage}%; height: 100%; background: ${barColor}; border-radius: 4px; transition: width 0.8s ease;"></div>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

/**
 * Tarjetas desplegables de dimensiones detalladas
 */
function renderDimensionCards(dimensionScores, containerId = 'dimensions-detail-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!window.DimensionsDetail) {
        container.innerHTML = '<p style="color: var(--color-gray-light); text-align: center;">Error al cargar detalles.</p>';
        return;
    }

    const dimensionKeys = [
        'temperamento', 'frustracion', 'conflictos', 
        'noVer', 'noOir', 'noHablar', 
        'autoconciencia', 'integracion'
    ];

    let html = '';

    dimensionKeys.forEach((key, index) => {
        const dimInfo = window.DimensionsDetail[key];
        const scores = dimensionScores[key] || {};
        
        let levelData;
        let displayRange = '';
        let resultadoTitulo = '';

        // CASO ESPECIAL: TEMPERAMENTO (usa 'tipos')
        if (key === 'temperamento') {
            const tipoGanador = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            levelData = dimInfo.tipos[tipoGanador];
            displayRange = levelData.nombre;
            resultadoTitulo = levelData.nombre; // Ej: "Temperamento Sanguíneo"
        } 
        // CASO NORMAL: OTRAS 7 DIMENSIONES (usa 'niveles' con la clave exacta del test)
        else {
            const claveGanadora = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
            levelData = dimInfo.niveles[claveGanadora];
            displayRange = levelData.nombre;
            resultadoTitulo = levelData.nombre; // Ej: "Alta Tolerancia", "Intolerancia al Fracaso"
        }

        // Si por alguna razón no se encuentra, usamos un fallback
        if (!levelData) {
            console.warn(`No se encontraron datos para la dimensión: ${key}`);
            return; 
        }

        html += `
            <details class="dimension-card" style="background: var(--color-black-soft); border: 1px solid var(--color-gold-dark); border-radius: var(--radius-lg); margin-bottom: var(--space-3); overflow: hidden;">
                <summary class="dimension-summary" style="display: flex; align-items: center; gap: 10px; padding: 12px; cursor: pointer; list-style: none; user-select: none;">
                    <div class="dim-icon" style="width: 40px; height: 40px; background: var(--gradient-gold); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="${dimInfo.icono}" style="color: var(--color-black-deep); font-size: 1.1rem;"></i>
                    </div>
                    
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px; flex-wrap: wrap;">
                            <span style="color: var(--color-gray-light); font-size: 0.65rem; letter-spacing: 0.05em; text-transform: uppercase;">Dimensión ${index + 1}</span>
                        </div>
                        <h3 style="color: var(--color-gold-primary); font-family: var(--font-serif-primary); font-size: 0.95rem; margin: 0; font-weight: 600; line-height: 1.2;">
                            ${dimInfo.nombre}
                        </h3>
                    </div>
                    
                    <i class="fa-solid fa-chevron-down" style="color: var(--color-gray-light); font-size: 0.8rem; flex-shrink: 0;"></i>
                </summary>
                
                <div class="dimension-content" style="padding: 0 12px 12px 12px;">
                    <!-- TÍTULO DEL RESULTADO DENTRO DEL DESPLEGABLE -->
                    <div style="background: linear-gradient(135deg, rgba(201,169,97,0.15) 0%, rgba(201,169,97,0.05) 100%); border: 1px solid var(--color-gold-primary); border-radius: var(--radius-lg); padding: var(--space-4); margin-bottom: var(--space-4); text-align: center;">
                        <p style="color: var(--color-gray-light); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">Tu resultado</p>
                        <h4 style="color: var(--color-gold-primary); font-family: var(--font-serif-primary); font-size: 1.1rem; margin: 0; font-weight: 600;">
                            ${resultadoTitulo}
                        </h4>
                    </div>
                    
                    <p style="color: var(--color-gray-light); font-size: 0.8rem; font-style: italic; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid rgba(201,169,97,0.2); line-height: 1.5;">
                        ${dimInfo.descripcionBase}
                    </p>
                    
                    <div style="background: var(--color-blue-mystic); border-left: 3px solid var(--color-gold-primary); padding: 10px; margin-bottom: 12px; border-radius: 0 var(--radius-lg) var(--radius-lg) 0;">
                        <p style="color: var(--color-white-soft); font-family: var(--font-serif-secondary); font-size: 0.8rem; line-height: 1.6; font-style: italic; margin: 0;">
                            "${levelData.narrativa}"
                        </p>
                    </div>
                    
                    <div class="strengths-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <div>
                            <h4 style="color: var(--color-gold-light); font-size: 0.75rem; margin-bottom: 6px; font-weight: 600;">✨ Fortalezas</h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${levelData.fortalezas.map(f => `<li style="color: var(--color-white-soft); font-size: 0.75rem; padding: 3px 0; padding-left: 14px; position: relative; line-height: 1.4;"><span style="position: absolute; left: 0; color: var(--color-gold-primary);">✓</span>${f}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <h4 style="color: var(--color-gold-light); font-size: 0.75rem; margin-bottom: 6px; font-weight: 600;">🔍 Puntos Ciegos</h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${levelData.puntosCiegos.map(p => `<li style="color: var(--color-white-soft); font-size: 0.75rem; padding: 3px 0; padding-left: 14px; position: relative; line-height: 1.4;"><span style="position: absolute; left: 0; color: var(--color-gold-primary);"></span>${p}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div style="background: rgba(201,169,97,0.05); border: 1px solid rgba(201,169,97,0.3); border-radius: var(--radius-lg); padding: 10px; margin-bottom: 10px;">
                        <h4 style="color: var(--color-gold-primary); font-size: 0.75rem; margin-bottom: 4px; font-weight: 600;">💡 Consejo para ti</h4>
                        <p style="color: var(--color-white-soft); font-size: 0.8rem; line-height: 1.5; margin: 0;">${levelData.consejo}</p>
                    </div>
                </div>
            </details>
        `;
    });

    container.innerHTML = html;

    const style = document.createElement('style');
    style.textContent = `
        .dimension-card[open] .fa-chevron-down { transform: rotate(180deg); }
        .dimension-card:hover { border-color: var(--color-gold-primary); }
        @media (max-width: 600px) { .strengths-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 430px) {
            .dimension-summary { gap: 8px !important; padding: 10px !important; }
            .dim-icon { width: 32px !important; height: 32px !important; }
            .dim-icon i { font-size: 0.9rem !important; }
            .dimension-summary h3 { font-size: 0.85rem !important; }
            .dimension-content > div:first-child {
                padding: var(--space-3) !important;
            }
            .dimension-content > div:first-child h4 {
                font-size: 1rem !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Hacer globales
window.initResults = initResults;
window.renderDimensionBars = renderDimensionBars;
window.renderDimensionCards = renderDimensionCards;