/**
 * Results View - Versión Final Premium
 * Con animaciones, logo personalizado y compartir resultados
 */

function initResults() {
    console.log('🎯 initResults() iniciado');
    
    try {
        const result = window.Storage.get('testResult');
        console.log('📦 Datos recuperados del Storage:', result);

        if (!result || !result.perfil) {
            console.warn('️ No hay perfil válido. Mostrando mensaje de error.');
            document.getElementById('result-profile-name').textContent = 'Datos no disponibles';
            document.getElementById('result-description').textContent = 'Por favor, realiza el test nuevamente.';
            return;
        }

        const perfil = result.perfil;

        // ═══════════════════════════════════════════
        // 1. PERFIL PREDOMINANTE
        // ═══════════════════════════════════════════
        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text || 'Sin información';
        };

        setText('result-profile-name', perfil.nombre);
        setText('result-description', perfil.descripcion);
        setText('result-recommendation', perfil.recomendacion);
        setText('result-reflection-question', perfil.preguntaReflexion);

        const iconEl = document.getElementById('result-icon');
        if (iconEl && perfil.icon) {
            iconEl.className = `fa-solid ${perfil.icon}`;
        }

        console.log('✅ Textos principales actualizados');

        // ═══════════════════════════════════════════
        // 2. GRÁFICO RADAR CON PORCENTAJES
        // ═══════════════════════════════════════════
        if (result.dimensionScores) {
            window.renderRadarChart(result.dimensionScores);
            console.log('✅ Gráfico radar generado');
        }

        // ═══════════════════════════════════════════
        // 3. TARJETAS DE LAS 8 DIMENSIONES DETALLADAS
        // ═══════════════════════════════════════════
        renderDimensionCards(result.dimensionScores);

        // ═══════════════════════════════════════════
        // 4. PERFIL INTEGRADOR
        // ═══════════════════════════════════════════
        renderIntegrativeProfile(result.dimensionScores);

        // ═══════════════════════════════════════════
        // 5. FORTALEZAS Y PUNTOS CIEGOS (del perfil)
        // ═══════════════════════════════════════════
        const setList = (id, items) => {
            const el = document.getElementById(id);
            if (el && Array.isArray(items)) {
                el.innerHTML = items.map(item => 
                    `<li style="margin-bottom: 8px; color: var(--color-white-soft);">• ${item}</li>`
                ).join('');
            }
        };

        setList('result-strengths', perfil.fortalezas);
        setList('result-blindspots', perfil.puntosCiegos);
        console.log('✅ Listas actualizadas');

        // ═══════════════════════════════════════════
        // 6. BOTÓN DE COMPARTIR (Web Share API)
        // ═══════════════════════════════════════════
        setupShareButton(perfil);

        // ═══════════════════════════════════════════
        // 7. BOTÓN DE REINICIO
        // ═══════════════════════════════════════════
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
 * Configura el botón de compartir resultados
 */
function setupShareButton(perfil) {
    const shareBtn = document.getElementById('share-results-btn');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
        // Preparar el contenido a compartir
        const shareData = {
            title: 'Mi Perfil de Autoconocimiento',
            text: `Descubrí mi perfil: "${perfil.nombre}". ${perfil.descripcion.substring(0, 100)}... ¿Y tú? Descubre el tuyo en la app "¿Por qué soy así?"`,
            url: window.location.origin + window.location.pathname
        };

        // Intentar usar Web Share API (móviles)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('✅ Contenido compartido exitosamente');
                if (window.showToast) {
                    window.showToast('¡Resultados compartidos!', 'success');
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('❌ Error al compartir:', error);
                    // Fallback: copiar al portapapeles
                    fallbackShare(shareData);
                }
            }
        } else {
            // Fallback para desktop: copiar al portapapeles
            fallbackShare(shareData);
        }
    });
}

/**
 * Fallback: Copiar al portapapeles
 */
function fallbackShare(shareData) {
    const textToCopy = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log('✅ Contenido copiado al portapapeles');
        if (window.showToast) {
            window.showToast('Enlace copiado al portapapeles', 'success');
        }
    }).catch(err => {
        console.error('❌ Error al copiar:', err);
        if (window.showToast) {
            window.showToast('No se pudo copiar el enlace', 'error');
        }
    });
}

/**
 * Renderiza las 8 tarjetas desplegables de dimensiones
 */
function renderDimensionCards(dimensionScores, containerId = 'dimensions-detail-container') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('⚠️ No se encontró #dimensions-detail-container');
        return;
    }

    if (!window.DimensionsDetail) {
        console.error('❌ DimensionsDetail no está disponible');
        container.innerHTML = '<p style="color: var(--color-gray-light); text-align: center;">Error al cargar detalles de las dimensiones.</p>';
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
        
        // Calcular puntaje total y porcentaje
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const maxScore = Math.max(...Object.values(scores), 1);
        const percentage = Math.round((maxScore / total) * 100);
        
        // Determinar nivel
        let level = 'medio';
        if (percentage <= 33) level = 'bajo';
        else if (percentage <= 66) level = 'medio';
        else level = 'alto';
        
        const levelData = dimInfo.niveles[level];

        html += `
            <details class="dimension-card" style="background: var(--color-black-soft); border: 1px solid var(--color-gold-dark); border-radius: var(--radius-xl); margin-bottom: var(--space-4); overflow: hidden; transition: all var(--transition-base);">
                <summary class="dimension-summary" style="display: flex; align-items: center; gap: var(--space-4); padding: var(--space-5) var(--space-6); cursor: pointer; list-style: none; user-select: none;">
                    <!-- Icono -->
                    <div style="width: 50px; height: 50px; background: var(--gradient-gold); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 0 15px rgba(201,169,97,0.3);">
                        <i class="${dimInfo.icono}" style="color: var(--color-black-deep); font-size: var(--text-xl);"></i>
                    </div>
                    
                    <!-- Info -->
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px;">
                            <span style="color: var(--color-gray-light); font-size: var(--text-xs); letter-spacing: 0.1em; text-transform: uppercase;">Dimensión ${index + 1}</span>
                            <span style="color: var(--color-gold-primary); font-size: var(--text-xs); font-weight: 600; background: rgba(201,169,97,0.1); padding: 2px 8px; border-radius: 12px;">${levelData.rango}</span>
                        </div>
                        <h3 style="color: var(--color-gold-primary); font-family: var(--font-serif-primary); font-size: var(--text-lg); margin: 0; font-weight: 600;">
                            ${dimInfo.nombre}
                        </h3>
                    </div>
                    
                    <!-- Porcentaje -->
                    <div style="text-align: right; flex-shrink: 0;">
                        <div style="font-size: var(--text-2xl); font-weight: 700; color: var(--color-gold-light); line-height: 1;">
                            ${percentage}%
                        </div>
                        <i class="fa-solid fa-chevron-down" style="color: var(--color-gray-light); font-size: var(--text-sm); margin-top: 4px; display: block; transition: transform var(--transition-base);"></i>
                    </div>
                </summary>
                
                <div class="dimension-content" style="padding: 0 var(--space-6) var(--space-6) var(--space-6); animation: fadeSlideDown 0.4s ease;">
                    <!-- Descripción base -->
                    <p style="color: var(--color-gray-light); font-size: var(--text-sm); font-style: italic; margin-bottom: var(--space-5); padding-bottom: var(--space-4); border-bottom: 1px solid rgba(201,169,97,0.2);">
                        ${dimInfo.descripcionBase}
                    </p>
                    
                    <!-- Narrativa -->
                    <div style="background: var(--color-blue-mystic); border-left: 3px solid var(--color-gold-primary); padding: var(--space-4); margin-bottom: var(--space-5); border-radius: 0 var(--radius-lg) var(--radius-lg) 0;">
                        <p style="color: var(--color-white-soft); font-family: var(--font-serif-secondary); font-size: var(--text-sm); line-height: 1.8; font-style: italic; margin: 0;">
                            "${levelData.narrativa}"
                        </p>
                    </div>
                    
                    <!-- Fortalezas y puntos ciegos en grid -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-5);">
                        <div>
                            <h4 style="color: var(--color-gold-light); font-size: var(--text-sm); margin-bottom: var(--space-3); font-weight: 600; display: flex; align-items: center; gap: var(--space-2);">
                                <i class="fa-solid fa-star" style="color: var(--color-gold-primary);"></i>
                                Fortalezas
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${levelData.fortalezas.map(f => `
                                    <li style="color: var(--color-white-soft); font-size: var(--text-sm); padding: 6px 0; padding-left: 20px; position: relative; line-height: 1.5;">
                                        <span style="position: absolute; left: 0; color: var(--color-gold-primary);">✓</span>
                                        ${f}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div>
                            <h4 style="color: var(--color-gold-light); font-size: var(--text-sm); margin-bottom: var(--space-3); font-weight: 600; display: flex; align-items: center; gap: var(--space-2);">
                                <i class="fa-solid fa-eye-slash" style="color: var(--color-gold-primary);"></i>
                                Puntos Ciegos
                            </h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${levelData.puntosCiegos.map(p => `
                                    <li style="color: var(--color-white-soft); font-size: var(--text-sm); padding: 6px 0; padding-left: 20px; position: relative; line-height: 1.5;">
                                        <span style="position: absolute; left: 0; color: var(--color-gold-primary);"></span>
                                        ${p}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Consejo -->
                    <div style="background: rgba(201,169,97,0.05); border: 1px solid rgba(201,169,97,0.3); border-radius: var(--radius-lg); padding: var(--space-4); margin-bottom: var(--space-4);">
                        <h4 style="color: var(--color-gold-primary); font-size: var(--text-sm); margin-bottom: var(--space-2); font-weight: 600; display: flex; align-items: center; gap: var(--space-2);">
                            <i class="fa-solid fa-lightbulb"></i>
                            Consejo para ti
                        </h4>
                        <p style="color: var(--color-white-soft); font-size: var(--text-sm); line-height: 1.7; margin: 0;">
                            ${levelData.consejo}
                        </p>
                    </div>
                    
                    <!-- Pregunta de reflexión -->
                    <div style="border-top: 1px dashed var(--color-gold-dark); padding-top: var(--space-4);">
                        <h4 style="color: var(--color-gold-light); font-size: var(--text-sm); margin-bottom: var(--space-2); font-weight: 600; display: flex; align-items: center; gap: var(--space-2);">
                            <i class="fa-solid fa-comment-dots"></i>
                            Pregunta para reflexionar
                        </h4>
                        <p style="color: var(--color-white-soft); font-size: var(--text-sm); line-height: 1.7; margin: 0; font-style: italic;">
                            ${levelData.preguntaReflexion}
                        </p>
                    </div>
                </div>
            </details>
        `;
    });

    container.innerHTML = html;

    // Agregar estilos para la flecha que rota
    const style = document.createElement('style');
    style.textContent = `
        .dimension-card[open] .fa-chevron-down {
            transform: rotate(180deg);
        }
        .dimension-card:hover {
            border-color: var(--color-gold-primary);
            box-shadow: 0 0 20px rgba(201,169,97,0.15);
        }
        @keyframes fadeSlideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
            .dimension-content > div:nth-child(3) {
                grid-template-columns: 1fr !important;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('✅ Tarjetas de dimensiones renderizadas');
}

/**
 * Renderiza el Perfil Integrador (síntesis holística)
 */
function renderIntegrativeProfile(dimensionScores, containerId = 'integrative-profile-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!window.DimensionsDetail) {
        console.error('❌ DimensionsDetail no está disponible');
        return;
    }

    const dimensionKeys = [
        'temperamento', 'frustracion', 'conflictos', 
        'noVer', 'noOir', 'noHablar', 
        'autoconciencia', 'integracion'
    ];

    // Calcular niveles de cada dimensión
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

    // Generar síntesis basada en el perfil
    let synthesisTitle = '';
    let synthesisText = '';
    let synthesisQuote = '';

    if (highCount >= 6) {
        synthesisTitle = 'Un alma en plena consciencia';
        synthesisText = 'Tus respuestas revelan un alto nivel de autoconocimiento en la mayoría de las dimensiones. Has desarrollado una notable capacidad para observarte, escucharte y elegir conscientemente cómo vivir. Este no es un punto final, sino una base sólida desde la cual seguir profundizando.';
        synthesisQuote = 'La verdadera sabiduría no es saberlo todo, sino mantenerse abierto a seguir aprendiendo de uno mismo.';
    } else if (highCount >= 4) {
        synthesisTitle = 'Un buscador con dirección clara';
        synthesisText = 'Muestras un perfil equilibrado con fortalezas significativas en varias dimensiones. Hay áreas donde brillas con luz propia y otras que aún están en desarrollo. Este mapa te muestra exactamente dónde estás y hacia dónde puedes crecer.';
        synthesisQuote = 'El autoconocimiento no es un destino, es un camino que se recorre con valentía y honestidad.';
    } else if (highCount >= 2) {
        synthesisTitle = 'Un viajero en proceso de despertar';
        synthesisText = 'Tu perfil muestra que estás en un momento clave de tu vida: comenzando a mirarte con honestidad. Hay dimensiones donde ya tienes claridad y otras donde el trabajo interior apenas comienza. Este es el momento más valioso: el del inicio consciente.';
        synthesisQuote = 'Cada paso hacia ti mismo, por pequeño que sea, es un acto de valentía que transforma tu vida.';
    } else {
        synthesisTitle = 'Un alma al inicio de su viaje';
        synthesisText = 'Tus respuestas sugieren que hay mucho por descubrir dentro de ti. Esto no es una debilidad, es una oportunidad. El hecho de que hayas completado este test ya es un acto de valentía. Ahora tienes un mapa: úsalo como punto de partida, no como sentencia.';
        synthesisQuote = 'El primer paso hacia el cambio es reconocer dónde estás. Ya lo diste.';
    }

    // Identificar dimensión más fuerte y más débil
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

    container.innerHTML = `
        <div style="background: linear-gradient(135deg, var(--color-blue-mystic) 0%, var(--color-black-soft) 100%); border: 2px solid var(--color-gold-primary); border-radius: var(--radius-xl); padding: var(--space-8); box-shadow: 0 10px 40px rgba(201,169,97,0.2);">
            
            <!-- Título -->
            <div style="text-align: center; margin-bottom: var(--space-6);">
                <i class="fa-solid fa-compass" style="font-size: var(--text-4xl); color: var(--color-gold-primary); margin-bottom: var(--space-3);"></i>
                <h3 style="font-family: var(--font-serif-primary); color: var(--color-gold-primary); font-size: var(--text-2xl); margin-bottom: var(--space-2); letter-spacing: 0.05em;">
                    ${synthesisTitle}
                </h3>
                <p style="color: var(--color-gray-light); font-size: var(--text-sm);">
                    Tu síntesis personalizada basada en las 8 dimensiones
                </p>
            </div>

            <!-- Texto de síntesis -->
            <p style="color: var(--color-white-soft); font-family: var(--font-serif-secondary); font-size: var(--text-base); line-height: 1.8; text-align: center; margin-bottom: var(--space-6); font-style: italic;">
                "${synthesisText}"
            </p>

            <!-- Estadísticas clave -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6);">
                <div style="text-align: center; padding: var(--space-4); background: rgba(201,169,97,0.1); border-radius: var(--radius-lg); border: 1px solid rgba(201,169,97,0.3);">
                    <div style="font-size: var(--text-3xl); font-weight: 700; color: var(--color-gold-primary);">${averagePercentage}%</div>
                    <div style="font-size: var(--text-xs); color: var(--color-gray-light); text-transform: uppercase; letter-spacing: 0.1em;">Promedio general</div>
                </div>
                <div style="text-align: center; padding: var(--space-4); background: rgba(201,169,97,0.1); border-radius: var(--radius-lg); border: 1px solid rgba(201,169,97,0.3);">
                    <div style="font-size: var(--text-3xl); font-weight: 700; color: var(--color-gold-primary);">${highCount}</div>
                    <div style="font-size: var(--text-xs); color: var(--color-gray-light); text-transform: uppercase; letter-spacing: 0.1em;">Dimensiones fuertes</div>
                </div>
                <div style="text-align: center; padding: var(--space-4); background: rgba(201,169,97,0.1); border-radius: var(--radius-lg); border: 1px solid rgba(201,169,97,0.3);">
                    <div style="font-size: var(--text-3xl); font-weight: 700; color: var(--color-gold-primary);">${lowCount}</div>
                    <div style="font-size: var(--text-xs); color: var(--color-gray-light); text-transform: uppercase; letter-spacing: 0.1em;">Áreas en desarrollo</div>
                </div>
            </div>

            <!-- Dimensión más fuerte y más débil -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-6);">
                <div style="padding: var(--space-4); background: rgba(201,169,97,0.05); border-radius: var(--radius-lg); border-left: 3px solid var(--color-gold-primary);">
                    <h4 style="color: var(--color-gold-light); font-size: var(--text-sm); margin-bottom: var(--space-2);">
                        <i class="fa-solid fa-trophy" style="margin-right: var(--space-2);"></i>
                        Tu mayor fortaleza
                    </h4>
                    <p style="color: var(--color-white-soft); font-size: var(--text-base); font-weight: 600; margin-bottom: 4px;">
                        ${strongestInfo.nombre}
                    </p>
                    <p style="color: var(--color-gray-light); font-size: var(--text-xs);">
                        Nivel: ${levels[strongestDim].level} (${levels[strongestDim].percentage}%)
                    </p>
                </div>
                <div style="padding: var(--space-4); background: rgba(201,169,97,0.05); border-radius: var(--radius-lg); border-left: 3px solid var(--color-gold-dark);">
                    <h4 style="color: var(--color-gold-light); font-size: var(--text-sm); margin-bottom: var(--space-2);">
                        <i class="fa-solid fa-seedling" style="margin-right: var(--space-2);"></i>
                        Tu mayor oportunidad
                    </h4>
                    <p style="color: var(--color-white-soft); font-size: var(--text-base); font-weight: 600; margin-bottom: 4px;">
                        ${weakestInfo.nombre}
                    </p>
                    <p style="color: var(--color-gray-light); font-size: var(--text-xs);">
                        Nivel: ${levels[weakestDim].level} (${levels[weakestDim].percentage}%)
                    </p>
                </div>
            </div>

            <!-- Cita final -->
            <div style="text-align: center; padding-top: var(--space-4); border-top: 1px solid rgba(201,169,97,0.3);">
                <p style="color: var(--color-gold-light); font-family: var(--font-serif-secondary); font-size: var(--text-lg); font-style: italic; margin: 0;">
                    "${synthesisQuote}"
                </p>
            </div>
        </div>
    `;

    console.log('✅ Perfil integrador renderizado');
}

/**
 * Renderiza un gráfico radar SVG nativo con porcentajes
 */
function renderRadarChart(dimensionScores, containerId = 'radar-chart-container') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`⚠️ No se encontró el contenedor #${containerId}`);
        return;
    }

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

    const size = 450;
    const center = size / 2;
    const maxRadius = 140;
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
        svg += `<circle cx="${coord.x}" cy="${coord.y}" r="4" fill="#E5D4A1" stroke="#0A0A0F" stroke-width="2"/>`;
    });

    // Etiquetas con porcentajes
    dimensions.forEach((dim, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const labelRadius = maxRadius + 35;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);
        
        let textAnchor = 'middle';
        if (Math.cos(angle) > 0.5) textAnchor = 'start';
        else if (Math.cos(angle) < -0.5) textAnchor = 'end';
        
        const percentage = Math.round(values[i] * 100);
        
        svg += `<text x="${x}" y="${y - 8}" fill="#E5D4A1" font-size="11" font-family="Inter, sans-serif" font-weight="500" text-anchor="${textAnchor}">${dim.label}</text>`;
        svg += `<text x="${x}" y="${y + 8}" fill="#C9A961" font-size="10" font-family="Inter, sans-serif" font-weight="700" text-anchor="${textAnchor}">${percentage}%</text>`;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
}

// Hacer globales
window.initResults = initResults;
window.renderRadarChart = renderRadarChart;
window.renderDimensionCards = renderDimensionCards;
window.renderIntegrativeProfile = renderIntegrativeProfile;