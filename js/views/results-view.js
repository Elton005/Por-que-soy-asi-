/**
 * Results View - Versión Final Responsive
 * Corregido para móvil con tamaños adaptativos
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

        // Actualizar textos principales
        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text || 'Sin información';
        };

        setText('result-profile-name', perfil.nombre);
        setText('result-description', perfil.descripcion);
        setText('result-recommendation', perfil.recomendacion);
        setText('result-reflection-question', perfil.preguntaReflexion);

        console.log('✅ Textos principales actualizados');

        // Generar gráfico radar
        if (result.dimensionScores) {
            window.renderRadarChart(result.dimensionScores);
            console.log('✅ Gráfico radar generado');
        }

        // Generar tarjetas de dimensiones
        renderDimensionCards(result.dimensionScores);

        // Generar perfil integrador
        renderIntegrativeProfile(result.dimensionScores);

        // Actualizar fortalezas y puntos ciegos
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
        console.log('✅ Listas actualizadas');

        // Botón de reinicio
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
        const descEl = document.getElementById('result-description');
        if (descEl) {
            descEl.textContent = 'Error al cargar resultados: ' + error.message;
            descEl.style.color = '#EF4444';
        }
    }
}

/**
 * Renderiza las 8 tarjetas desplegables de dimensiones
 * OPTIMIZADO PARA MÓVIL
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
        
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const maxScore = Math.max(...Object.values(scores), 1);
        const percentage = Math.round((maxScore / total) * 100);
        
        let level = 'medio';
        if (percentage <= 33) level = 'bajo';
        else if (percentage <= 66) level = 'medio';
        else level = 'alto';
        
        const levelData = dimInfo.niveles[level];

        // ✅ VERSIÓN RESPONSIVE: Summary más compacto
        html += `
            <details class="dimension-card" style="background: var(--color-black-soft); border: 1px solid var(--color-gold-dark); border-radius: var(--radius-lg); margin-bottom: var(--space-3); overflow: hidden;">
                <summary class="dimension-summary" style="display: flex; align-items: center; gap: 10px; padding: 12px; cursor: pointer; list-style: none; user-select: none;">
                    <!-- Icono más pequeño en móvil -->
                    <div class="dim-icon" style="width: 40px; height: 40px; background: var(--gradient-gold); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i class="${dimInfo.icono}" style="color: var(--color-black-deep); font-size: 1.1rem;"></i>
                    </div>
                    
                    <!-- Info -->
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px; flex-wrap: wrap;">
                            <span style="color: var(--color-gray-light); font-size: 0.65rem; letter-spacing: 0.05em; text-transform: uppercase;">Dim ${index + 1}</span>
                            <span class="dim-range" style="color: var(--color-gold-primary); font-size: 0.6rem; font-weight: 600; background: rgba(201,169,97,0.1); padding: 2px 6px; border-radius: 10px;">${levelData.rango}</span>
                        </div>
                        <h3 style="color: var(--color-gold-primary); font-family: var(--font-serif-primary); font-size: 0.95rem; margin: 0; font-weight: 600; line-height: 1.2;">
                            ${dimInfo.nombre}
                        </h3>
                    </div>
                    
                    <!-- Porcentaje -->
                    <div style="text-align: right; flex-shrink: 0;">
                        <div class="dim-percentage" style="font-size: 1.3rem; font-weight: 700; color: var(--color-gold-light); line-height: 1;">
                            ${percentage}%
                        </div>
                        <i class="fa-solid fa-chevron-down" style="color: var(--color-gray-light); font-size: 0.7rem; margin-top: 2px; display: block;"></i>
                    </div>
                </summary>
                
                <div class="dimension-content" style="padding: 0 12px 12px 12px;">
                    <!-- Descripción base -->
                    <p style="color: var(--color-gray-light); font-size: 0.8rem; font-style: italic; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid rgba(201,169,97,0.2); line-height: 1.5;">
                        ${dimInfo.descripcionBase}
                    </p>
                    
                    <!-- Narrativa -->
                    <div style="background: var(--color-blue-mystic); border-left: 3px solid var(--color-gold-primary); padding: 10px; margin-bottom: 12px; border-radius: 0 var(--radius-lg) var(--radius-lg) 0;">
                        <p style="color: var(--color-white-soft); font-family: var(--font-serif-secondary); font-size: 0.8rem; line-height: 1.6; font-style: italic; margin: 0;">
                            "${levelData.narrativa}"
                        </p>
                    </div>
                    
                    <!-- Fortalezas y puntos ciegos - UNA COLUMNA EN MÓVIL -->
                    <div class="strengths-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <div>
                            <h4 style="color: var(--color-gold-light); font-size: 0.75rem; margin-bottom: 6px; font-weight: 600;">
                                ✨ Fortalezas
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${levelData.fortalezas.map(f => `
                                    <li style="color: var(--color-white-soft); font-size: 0.75rem; padding: 3px 0; padding-left: 14px; position: relative; line-height: 1.4;">
                                        <span style="position: absolute; left: 0; color: var(--color-gold-primary);">✓</span>
                                        ${f}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div>
                            <h4 style="color: var(--color-gold-light); font-size: 0.75rem; margin-bottom: 6px; font-weight: 600;">
                                🔍 Puntos Ciegos
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${levelData.puntosCiegos.map(p => `
                                    <li style="color: var(--color-white-soft); font-size: 0.75rem; padding: 3px 0; padding-left: 14px; position: relative; line-height: 1.4;">
                                        <span style="position: absolute; left: 0; color: var(--color-gold-primary);">⚠</span>
                                        ${p}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Consejo -->
                    <div style="background: rgba(201,169,97,0.05); border: 1px solid rgba(201,169,97,0.3); border-radius: var(--radius-lg); padding: 10px; margin-bottom: 10px;">
                        <h4 style="color: var(--color-gold-primary); font-size: 0.75rem; margin-bottom: 4px; font-weight: 600;">
                            💡 Consejo
                        </h4>
                        <p style="color: var(--color-white-soft); font-size: 0.8rem; line-height: 1.5; margin: 0;">
                            ${levelData.consejo}
                        </p>
                    </div>
                    
                    <!-- Pregunta -->
                    <div style="border-top: 1px dashed var(--color-gold-dark); padding-top: 10px;">
                        <h4 style="color: var(--color-gold-light); font-size: 0.75rem; margin-bottom: 4px; font-weight: 600;">
                            💭 Para reflexionar
                        </h4>
                        <p style="color: var(--color-white-soft); font-size: 0.8rem; line-height: 1.5; margin: 0; font-style: italic;">
                            ${levelData.preguntaReflexion}
                        </p>
                    </div>
                </div>
            </details>
        `;
    });

    container.innerHTML = html;

    // Estilos responsive
    const style = document.createElement('style');
    style.textContent = `
        .dimension-card[open] .fa-chevron-down {
            transform: rotate(180deg);
        }
        .dimension-card:hover {
            border-color: var(--color-gold-primary);
        }
        
        /* MÓVIL: Fortalezas en 1 columna */
        @media (max-width: 600px) {
            .strengths-grid {
                grid-template-columns: 1fr !important;
            }
        }
        
        /* MÓVIL PEQUEÑO: Summary aún más compacto */
        @media (max-width: 430px) {
            .dimension-summary {
                gap: 8px !important;
                padding: 10px !important;
            }
            .dim-icon {
                width: 32px !important;
                height: 32px !important;
            }
            .dim-icon i {
                font-size: 0.9rem !important;
            }
            .dim-range {
                display: none !important;
            }
            .dim-percentage {
                font-size: 1.1rem !important;
            }
            .dimension-summary h3 {
                font-size: 0.85rem !important;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('✅ Tarjetas de dimensiones renderizadas');
}

/**
 * Renderiza el Perfil Integrador
 * OPTIMIZADO PARA MÓVIL
 */
function renderIntegrativeProfile(dimensionScores, containerId = 'integrative-profile-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!window.DimensionsDetail) return;

    const dimensionKeys = [
        'temperamento', 'frustracion', 'conflictos', 
        'noVer', 'noOir', 'noHablar', 
        'autoconciencia', 'integracion'
    ];

    const levels = {};
    let totalPercentage = 0;
    let highCount = 0;
    let lowCount = 0;

    dimensionKeys.forEach(key => {
        const scores = dimensionScores[key] || {};
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const maxScore = Math.max(...Object.values(scores), 1);
        const percentage = Math.round((maxScore / total) * 100);
        
        let level = 'medio';
        if (percentage <= 33) { level = 'bajo'; lowCount++; }
        else if (percentage <= 66) level = 'medio';
        else { level = 'alto'; highCount++; }
        
        levels[key] = { level, percentage };
        totalPercentage += percentage;
    });

    const averagePercentage = Math.round(totalPercentage / dimensionKeys.length);

    let synthesisTitle = '';
    let synthesisText = '';
    let synthesisQuote = '';

    if (highCount >= 6) {
        synthesisTitle = 'Un alma en plena consciencia';
        synthesisText = 'Tus respuestas revelan un alto nivel de autoconocimiento. Has desarrollado una notable capacidad para observarte y elegir conscientemente cómo vivir.';
        synthesisQuote = 'La verdadera sabiduría es mantenerse abierto a seguir aprendiendo.';
    } else if (highCount >= 4) {
        synthesisTitle = 'Un buscador con dirección clara';
        synthesisText = 'Muestras un perfil equilibrado con fortalezas significativas. Hay áreas donde brillas y otras en desarrollo.';
        synthesisQuote = 'El autoconocimiento es un camino que se recorre con valentía.';
    } else if (highCount >= 2) {
        synthesisTitle = 'Un viajero en proceso de despertar';
        synthesisText = 'Estás en un momento clave: comenzando a mirarte con honestidad. Este es el inicio consciente.';
        synthesisQuote = 'Cada paso hacia ti mismo transforma tu vida.';
    } else {
        synthesisTitle = 'Un alma al inicio de su viaje';
        synthesisText = 'Hay mucho por descubrir dentro de ti. Has dado el primer paso, que es el más valiente.';
        synthesisQuote = 'Reconocer dónde estás es el primer paso al cambio.';
    }

    let strongestDim = dimensionKeys[0];
    let weakestDim = dimensionKeys[0];
    let maxPct = 0;
    let minPct = 100;

    dimensionKeys.forEach(key => {
        const pct = levels[key].percentage;
        if (pct > maxPct) { maxPct = pct; strongestDim = key; }
        if (pct < minPct) { minPct = pct; weakestDim = key; }
    });

    const strongestInfo = window.DimensionsDetail[strongestDim];
    const weakestInfo = window.DimensionsDetail[weakestDim];

    // ✅ VERSIÓN RESPONSIVE
    container.innerHTML = `
        <div class="integrative-card" style="background: linear-gradient(135deg, var(--color-blue-mystic) 0%, var(--color-black-soft) 100%); border: 2px solid var(--color-gold-primary); border-radius: var(--radius-xl); padding: 20px; box-shadow: 0 10px 40px rgba(201,169,97,0.2);">
            
            <!-- Título -->
            <div style="text-align: center; margin-bottom: 16px;">
                <i class="fa-solid fa-compass" style="font-size: 2rem; color: var(--color-gold-primary); margin-bottom: 8px; display: block;"></i>
                <h3 class="integrative-title" style="font-family: var(--font-serif-primary); color: var(--color-gold-primary); font-size: 1.3rem; margin-bottom: 6px; letter-spacing: 0.03em; line-height: 1.3;">
                    ${synthesisTitle}
                </h3>
                <p style="color: var(--color-gray-light); font-size: 0.7rem;">
                    Tu síntesis personalizada
                </p>
            </div>

            <!-- Texto -->
            <p class="integrative-text" style="color: var(--color-white-soft); font-family: var(--font-serif-secondary); font-size: 0.85rem; line-height: 1.6; text-align: center; margin-bottom: 16px; font-style: italic;">
                "${synthesisText}"
            </p>

            <!-- Estadísticas - UNA SOLA FILA EN MÓVIL -->
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
                <div style="text-align: center; padding: 10px 6px; background: rgba(201,169,97,0.1); border-radius: var(--radius-lg); border: 1px solid rgba(201,169,97,0.3);">
                    <div class="stat-number" style="font-size: 1.5rem; font-weight: 700; color: var(--color-gold-primary); line-height: 1;">${averagePercentage}%</div>
                    <div style="font-size: 0.6rem; color: var(--color-gray-light); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">Promedio</div>
                </div>
                <div style="text-align: center; padding: 10px 6px; background: rgba(201,169,97,0.1); border-radius: var(--radius-lg); border: 1px solid rgba(201,169,97,0.3);">
                    <div class="stat-number" style="font-size: 1.5rem; font-weight: 700; color: var(--color-gold-primary); line-height: 1;">${highCount}</div>
                    <div style="font-size: 0.6rem; color: var(--color-gray-light); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">Fuertes</div>
                </div>
                <div style="text-align: center; padding: 10px 6px; background: rgba(201,169,97,0.1); border-radius: var(--radius-lg); border: 1px solid rgba(201,169,97,0.3);">
                    <div class="stat-number" style="font-size: 1.5rem; font-weight: 700; color: var(--color-gold-primary); line-height: 1;">${lowCount}</div>
                    <div style="font-size: 0.6rem; color: var(--color-gray-light); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px;">En desarrollo</div>
                </div>
            </div>

            <!-- Dimensión más fuerte y débil - UNA COLUMNA EN MÓVIL -->
            <div class="highlights-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                <div style="padding: 10px; background: rgba(201,169,97,0.05); border-radius: var(--radius-lg); border-left: 3px solid var(--color-gold-primary);">
                    <h4 style="color: var(--color-gold-light); font-size: 0.7rem; margin-bottom: 4px;">
                        🏆 Mayor fortaleza
                    </h4>
                    <p style="color: var(--color-white-soft); font-size: 0.85rem; font-weight: 600; margin-bottom: 2px; line-height: 1.2;">
                        ${strongestInfo.nombre}
                    </p>
                    <p style="color: var(--color-gray-light); font-size: 0.65rem; margin: 0;">
                        ${levels[strongestDim].level} (${levels[strongestDim].percentage}%)
                    </p>
                </div>
                <div style="padding: 10px; background: rgba(201,169,97,0.05); border-radius: var(--radius-lg); border-left: 3px solid var(--color-gold-dark);">
                    <h4 style="color: var(--color-gold-light); font-size: 0.7rem; margin-bottom: 4px;">
                        🌱 Mayor oportunidad
                    </h4>
                    <p style="color: var(--color-white-soft); font-size: 0.85rem; font-weight: 600; margin-bottom: 2px; line-height: 1.2;">
                        ${weakestInfo.nombre}
                    </p>
                    <p style="color: var(--color-gray-light); font-size: 0.65rem; margin: 0;">
                        ${levels[weakestDim].level} (${levels[weakestDim].percentage}%)
                    </p>
                </div>
            </div>

            <!-- Cita final -->
            <div style="text-align: center; padding-top: 12px; border-top: 1px solid rgba(201,169,97,0.3);">
                <p style="color: var(--color-gold-light); font-family: var(--font-serif-secondary); font-size: 0.9rem; font-style: italic; margin: 0; line-height: 1.5;">
                    "${synthesisQuote}"
                </p>
            </div>
        </div>
        
        <style>
            /* MÓVIL: Estadísticas más compactas */
            @media (max-width: 430px) {
                .integrative-card {
                    padding: 14px !important;
                }
                .integrative-title {
                    font-size: 1.1rem !important;
                }
                .integrative-text {
                    font-size: 0.8rem !important;
                }
                .stat-number {
                    font-size: 1.2rem !important;
                }
                .highlights-grid {
                    grid-template-columns: 1fr !important;
                }
            }
            
            /* MÓVIL MUY PEQUEÑO */
            @media (max-width: 360px) {
                .integrative-card {
                    padding: 10px !important;
                }
                .integrative-title {
                    font-size: 1rem !important;
                }
                .stats-grid {
                    gap: 4px !important;
                }
                .stat-number {
                    font-size: 1rem !important;
                }
            }
        </style>
    `;

    console.log('✅ Perfil integrador renderizado');
}

/**
 * Renderiza gráfico radar SVG
 */
function renderRadarChart(dimensionScores, containerId = 'radar-chart-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const dimensions = [
        { key: 'temperamento', label: 'Temperamento' },
        { key: 'frustracion', label: 'Tolerancia' },
        { key: 'conflictos', label: 'Conflictos' },
        { key: 'noVer', label: 'No Ver' },
        { key: 'noOir', label: 'No Oír' },
        { key: 'noHablar', label: 'No Hablar' },
        { key: 'autoconciencia', label: 'Autoconciencia' },
        { key: 'integracion', label: 'Integración' }
    ];

    // Detectar si es móvil para ajustar tamaño
    const isMobile = window.innerWidth <= 430;
    const size = isMobile ? 350 : 450;
    const center = size / 2;
    const maxRadius = isMobile ? 100 : 140;
    const levels = 4;
    const angleStep = (Math.PI * 2) / dimensions.length;

    const values = dimensions.map(dim => {
        const scores = dimensionScores[dim.key] || {};
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const maxScore = Math.max(...Object.values(scores), 1);
        return total > 0 ? maxScore / total : 0.5;
    });

    let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; max-width: 100%;">`;
    
    // Grid
    for (let level = 1; level <= levels; level++) {
        const radius = (maxRadius / levels) * level;
        let points = '';
        for (let i = 0; i < dimensions.length; i++) {
            const angle = angleStep * i - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            points += `${x},${y} `;
        }
        svg += `<polygon points="${points}" fill="none" stroke="#C9A961" stroke-width="0.5" opacity="${0.2 + level * 0.1}"/>`;
    }

    // Líneas radiales
    for (let i = 0; i < dimensions.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const x = center + maxRadius * Math.cos(angle);
        const y = center + maxRadius * Math.sin(angle);
        svg += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="#C9A961" stroke-width="0.5" opacity="0.3"/>`;
    }

    // Área de datos
    let dataPoints = '';
    const pointCoords = [];
    for (let i = 0; i < dimensions.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const radius = maxRadius * values[i];
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        dataPoints += `${x},${y} `;
        pointCoords.push({ x, y, value: values[i] });
    }
    
    svg += `
        <defs>
            <radialGradient id="goldGradient-${containerId}">
                <stop offset="0%" stop-color="#E5D4A1" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#C9A961" stop-opacity="0.4"/>
            </radialGradient>
        </defs>
    `;
    svg += `<polygon points="${dataPoints}" fill="url(#goldGradient-${containerId})" fill-opacity="0.3" stroke="#E5D4A1" stroke-width="2"/>`;

    // Puntos
    pointCoords.forEach(coord => {
        svg += `<circle cx="${coord.x}" cy="${coord.y}" r="${isMobile ? 3 : 4}" fill="#E5D4A1" stroke="#0A0A0F" stroke-width="2"/>`;
    });

    // Etiquetas con porcentajes
    const fontSize = isMobile ? 9 : 11;
    const labelRadius = maxRadius + (isMobile ? 25 : 35);
    
    dimensions.forEach((dim, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        
        let textAnchor = 'middle';
        if (Math.cos(angle) > 0.5) textAnchor = 'start';
        else if (Math.cos(angle) < -0.5) textAnchor = 'end';
        
        const percentage = Math.round(values[i] * 100);
        
        svg += `<text x="${x}" y="${y - 6}" fill="#E5D4A1" font-size="${fontSize}" font-family="Inter, sans-serif" font-weight="500" text-anchor="${textAnchor}">${dim.label}</text>`;
        svg += `<text x="${x}" y="${y + 8}" fill="#C9A961" font-size="${fontSize - 1}" font-family="Inter, sans-serif" font-weight="700" text-anchor="${textAnchor}">${percentage}%</text>`;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
}

// Hacer globales
window.initResults = initResults;
window.renderRadarChart = renderRadarChart;
window.renderDimensionCards = renderDimensionCards;
window.renderIntegrativeProfile = renderIntegrativeProfile;