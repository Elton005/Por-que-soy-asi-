/**
 * Motor de Scoring - Los 12 Perfiles Reales
 * Alineado 100% con el contenido del libro "¿Por qué soy así?"
 */

const TestScoring = {
  calculate(answers) {
    const dimensionScores = {};
    
    answers.forEach(ans => {
      const question = window.TestQuestions.find(q => q.id === ans.questionId);
      if (!question) return;
      
      const dim = question.dimension;
      if (!dimensionScores[dim]) dimensionScores[dim] = {};
      dimensionScores[dim][ans.value] = (dimensionScores[dim][ans.value] || 0) + 1;
    });

    // Obtener el valor más frecuente (moda) para cada dimensión
    const profile = {};
    for (const [dim, scores] of Object.entries(dimensionScores)) {
      profile[dim] = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    }

    const perfilIntegrado = this.mapToProfile(profile);
    
    return {
      dimensions: profile,
      dimensionScores: dimensionScores,
      perfil: perfilIntegrado,
      timestamp: new Date().toISOString()
    };
  },

  mapToProfile(dimensions) {
    const { temperamento, frustracion, conflictos, noVer, noOir, noHablar, autoconciencia, integracion } = dimensions;
    
    // LÓGICA DE MAPEO A LOS 12 PERFILES REALES (Basada en el libro)
    if (temperamento === 'sanguineo' && (frustracion === 'disconfort' || frustracion === 'emocional')) {
      return this.getProfile('impulsivo_entusiasta');
    }
    if (temperamento === 'colerico' && (integracion === 'reactiva' || conflictos === 'competitivo')) {
      return this.getProfile('lider_intenso');
    }
    if (temperamento === 'flematico' && (conflictos === 'evitador' || conflictos === 'acomodador')) {
      return this.getProfile('observador_tranquilo');
    }
    if (temperamento === 'melancolico' && (frustracion === 'fracaso' || autoconciencia === 'alta')) {
      return this.getProfile('profundo_autoexigente');
    }
    if (noHablar === 'pasiva' && (conflictos === 'evitador' || conflictos === 'acomodador')) {
      return this.getProfile('precavido_silencioso');
    }
    if (autoconciencia === 'baja' && (frustracion === 'emocional' || noHablar === 'agresiva')) {
      return this.getProfile('reactivo_emocional');
    }
    if (integracion === 'consciente_inconsistente' && (frustracion === 'disconfort' || autoconciencia === 'media')) {
      return this.getProfile('disciplinado_construccion');
    }
    if (frustracion === 'fracaso' && autoconciencia === 'alta') {
      return this.getProfile('autocritico_exigente');
    }
    if (conflictos === 'acomodador' && (noVer === 'selectivo' || noOir === 'selectiva')) {
      return this.getProfile('adaptativo_flexible');
    }
    if (temperamento === 'melancolico' && autoconciencia === 'baja') {
      return this.getProfile('analitico_reservado');
    }
    if (frustracion === 'alta' && autoconciencia === 'alta') {
      return this.getProfile('resiliente_consciente');
    }
    if (integracion === 'integrada' && autoconciencia === 'alta') {
      return this.getProfile('integrado_intencional');
    }
    
    // Perfiles por defecto según temperamento dominante
    const defaultByTemperamento = {
      'sanguineo': 'impulsivo_entusiasta',
      'colerico': 'lider_intenso',
      'flematico': 'observador_tranquilo',
      'melancolico': 'profundo_autoexigente'
    };
    
    return this.getProfile(defaultByTemperamento[temperamento] || 'disciplinado_construccion');
  },

  getProfile(key) {
    const profiles = {
      impulsivo_entusiasta: {
        nombre: 'El Impulsivo Entusiasta',
        icon: 'fa-bolt',
        descripcion: 'Energético, sociable, lleno de ideas… pero con dificultad para sostenerlas. Te entusiasmas rápido, conectas fácilmente con otros y contagias motivación. Sin embargo, cuando la novedad desaparece, te cuesta mantener el interés.',
        fortalezas: ['Entusiasmo contagioso', 'Facilidad para conectar', 'Creatividad y dinamismo', 'Capacidad de empezar cosas nuevas'],
        puntosCiegos: ['Dificultad para sostener proyectos', 'Decisiones impulsivas', 'Pérdida de interés rápido', 'Evitas conversaciones profundas'],
        recomendacion: 'Tu entusiasmo no es el problema. El verdadero crecimiento quizá tenga más que ver con aprender a sostener un poco más aquello que realmente importa, incluso cuando deja de sentirse emocionante.',
        preguntaReflexion: '¿Hay algo importante en tu vida que empezaste con mucha emoción, pero que has dejado a mitad de camino?'
      },
      lider_intenso: {
        nombre: 'El Líder Intenso',
        icon: 'fa-crown',
        descripcion: 'Decidido, fuerte, orientado a resultados. Avanzas con una fuerza difícil de ignorar. Tienes claridad sobre lo que quieres y haces todo lo posible por llevarlo adelante. Pero tu intensidad puede convertirse en impaciencia.',
        fortalezas: ['Determinación y liderazgo', 'Capacidad de resolver problemas', 'Persistencia bajo presión', 'Iniciativa y dirección clara'],
        puntosCiegos: ['Impaciencia con otros ritmos', 'Dificultad para escuchar', 'Necesidad de control', 'Comunicación demasiado directa'],
        recomendacion: 'Ser fuerte no significa tener que cargar con todo. El verdadero crecimiento quizá esté en aprender a equilibrar esa firmeza con empatía, escuchar un poco más y dar espacio a otros ritmos.',
        preguntaReflexion: '¿Hay alguna situación reciente donde tu deseo de resolver o avanzar dejó poco espacio para escuchar realmente a otra persona?'
      },
      observador_tranquilo: {
        nombre: 'El Observador Tranquilo',
        icon: 'fa-leaf',
        descripcion: 'Calmado, estable, evita conflictos. Llevas la calma contigo. Observas mucho, escuchas con atención y rara vez tomas decisiones apresuradas. Pero a veces esa tranquilidad se convierte en una forma de quedarte demasiado tiempo esperando.',
        fortalezas: ['Estabilidad emocional', 'Capacidad de observación', 'Paciencia y constancia', 'Transmites serenidad'],
        puntosCiegos: ['Evitación de conflictos necesarios', 'Postergación de decisiones', 'Dificultad para expresar necesidades', 'Excesiva comodidad en lo conocido'],
        recomendacion: 'Buscar paz no tiene nada de malo. Pero hay momentos en los que crecer implica participar un poco más, decir algo que llevabas tiempo callando o atreverte a moverte, aunque no todo se sienta completamente seguro.',
        preguntaReflexion: '¿Hay algo importante en tu vida donde llevas demasiado tiempo observando… cuando quizá ya sería momento de dar un paso?'
      },
      profundo_autoexigente: {
        nombre: 'El Profundo Autoexigente',
        icon: 'fa-magnifying-glass',
        descripcion: 'Analítico, sensible, perfeccionista. Sientes y piensas las cosas con mucha intensidad. Observas detalles que otros pasan por alto y te tomas muy en serio aquello que consideras importante. Pero pensar demasiado puede convertirse en agotamiento.',
        fortalezas: ['Profundidad de análisis', 'Sensibilidad emocional', 'Compromiso y responsabilidad', 'Atención al detalle'],
        puntosCiegos: ['Autocrítica excesiva', 'Parálisis por análisis', 'Dificultad para disfrutar logros', 'Perfeccionismo paralizante'],
        recomendacion: 'No todo en la vida necesita estar completamente resuelto para poder empezar. A veces el verdadero crecimiento no consiste en dejar de ser profundo, sino en aprender a ser un poco más amable contigo mismo.',
        preguntaReflexion: '¿Hay algo importante en tu vida que has postergado porque sientes que todavía no está lo bastante perfecto?'
      },
      precavido_silencioso: {
        nombre: 'El Precavido Silencioso',
        icon: 'fa-shield-halved',
        descripcion: 'Evita conflictos y emociones incómodas. Prefieres la tranquilidad antes que el conflicto. Haces lo posible por mantener la calma, incluso cuando algo te incomoda. Pero el silencio empieza a pesar más de lo que parece.',
        fortalezas: ['Cuidado por las relaciones', 'Sensibilidad interpersonal', 'Prudencia al hablar', 'Capacidad de escuchar'],
        puntosCiegos: ['Silencio acumulativo', 'Dificultad para poner límites', 'Resentimiento silencioso', 'Pérdida de la propia voz'],
        recomendacion: 'Evitar algo no siempre lo resuelve, a veces solo lo aplaza. El verdadero crecimiento quizá tenga más que ver con aprender a decir lo que sientes un poco antes o entender que poner límites también puede ser una forma de cuidar una relación.',
        preguntaReflexion: '¿Hay algo que llevas tiempo callando solo para evitar una incomodidad o un conflicto?'
      },
      reactivo_emocional: {
        nombre: 'El Reactivo Emocional',
        icon: 'fa-fire-flame-curved',
        descripcion: 'Siente intensamente y reacciona rápido. Las emociones las vives con fuerza, como si todo ocurriera muy cerca de la piel. Eres expresivo, sensible y emocionalmente auténtico. Pero cuando la emoción llega tan fuerte, apenas deja espacio para pensar.',
        fortalezas: ['Autenticidad emocional', 'Empatía profunda', 'Intuición aguda', 'Capacidad de conexión'],
        puntosCiegos: ['Reacciones impulsivas', 'Arrepentimientos posteriores', 'Agotamiento emocional', 'Dificultad para regular intensidad'],
        recomendacion: 'Sentir mucho no es el problema. El verdadero reto, en ocasiones, está en aprender a darte un poco más de tiempo antes de reaccionar. No para reprimir lo que sientes, sino para darte un pequeño espacio que te permita entender qué emoción está hablando.',
        preguntaReflexion: '¿Hay alguna situación reciente donde reaccionaste muy rápido y después entendiste que, en el fondo, había algo más detrás de esa emoción?'
      },
      disciplinado_construccion: {
        nombre: 'El Disciplinado en Construcción',
        icon: 'fa-hammer',
        descripcion: 'Sabe lo que debe hacer, pero le cuesta sostenerlo. Tienes metas claras, buenas intenciones y un deseo genuino de mejorar. Empiezas con entusiasmo, pero cuando la motivación baja, te cuesta mantener el ritmo.',
        fortalezas: ['Conciencia de sí mismo', 'Buenas intenciones', 'Capacidad de planificación', 'Deseo genuino de crecer'],
        puntosCiegos: ['Dificultad para sostener hábitos', 'Frustración consigo mismo', 'Abandono cuando baja la motivación', 'Exigencia desde el cansancio'],
        recomendacion: 'La constancia rara vez se construye de golpe. El crecimiento no está en exigirte más disciplina desde el cansancio, sino en aprender a construir hábitos de una manera más amable y realista. Menos basada en la perfección y más en la repetición.',
        preguntaReflexion: '¿Hay algo importante para ti que has abandonado varias veces, pero que quizá merece otra oportunidad… esta vez con menos exigencia y más paciencia?'
      },
      autocritico_exigente: {
        nombre: 'El Autocrítico Exigente',
        icon: 'fa-scale-balanced',
        descripcion: 'Busca excelencia, pero se castiga demasiado. Siempre sientes que podrías haberlo hecho mejor. Aunque logres cosas importantes, te cuesta detenerte a reconocerlas porque una parte de ti ya está pensando en lo que faltó.',
        fortalezas: ['Compromiso con la excelencia', 'Responsabilidad', 'Capacidad de mejora continua', 'Dedicación'],
        puntosCiegos: ['Autocastigo excesivo', 'Ansiedad por el desempeño', 'Dificultad para sentir satisfacción', 'Miedo a equivocarse'],
        recomendacion: 'Tu valor como persona no depende únicamente de lo que logras. A veces el verdadero crecimiento no está en dejar de buscar excelencia, sino en aprender a relacionarte contigo mismo de una manera más amable.',
        preguntaReflexion: '¿Hay alguna parte de tu vida donde te estés exigiendo tanto que ya casi no te permites disfrutar el camino?'
      },
      adaptativo_flexible: {
        nombre: 'El Adaptativo Flexible',
        icon: 'fa-wind',
        descripcion: 'Se adapta fácilmente a todo… incluso a lo que no le conviene. Tienes facilidad natural para acomodarte a distintos ambientes y comprender diferentes maneras de pensar. Pero adaptarte tanto puede hacer que te dejes a ti mismo en segundo plano.',
        fortalezas: ['Flexibilidad', 'Empatía', 'Capacidad de mediación', 'Comprensión de perspectivas'],
        puntosCiegos: ['Pérdida de la propia voz', 'Ceder demasiado', 'Dificultad para decir "no"', 'Olvido de necesidades propias'],
        recomendacion: 'Adaptarte es una fortaleza, pero no cuando el precio termina siendo olvidarte demasiado de ti mismo. El verdadero crecimiento quizá tenga más que ver con aprender a ocupar un poco más de espacio dentro de tu propia vida.',
        preguntaReflexion: '¿Hay alguna situación en tu vida donde te has adaptado tanto que ya no tienes tan claro qué es lo que realmente quieres?'
      },
      analitico_reservado: {
        nombre: 'El Analítico Reservado',
        icon: 'fa-brain',
        descripcion: 'Observa, piensa, pero actúa poco. Rara vez actúas sin pensar primero. Analizas posibilidades y te tomas el tiempo necesario antes de decidir. Pero pensar demasiado puede convertirse en una pausa interminable.',
        fortalezas: ['Capacidad de análisis', 'Prudencia', 'Observación detallada', 'Prevención de errores'],
        puntosCiegos: ['Parálisis por análisis', 'Exceso de sobrepensamiento', 'Dificultad para actuar', 'Búsqueda de seguridad absoluta'],
        recomendacion: 'La claridad absoluta casi nunca llega, y muchas veces la seguridad aparece después de empezar, no antes. El verdadero crecimiento quizá no esté en dejar de pensar, sino en desarrollar la confianza para actuar incluso cuando no todo está completamente resuelto.',
        preguntaReflexion: '¿Hay algo importante en tu vida que llevas demasiado tiempo pensando… cuando quizá ya sabes más de lo que crees para empezar?'
      },
      resiliente_consciente: {
        nombre: 'El Resiliente Consciente',
        icon: 'fa-tree',
        descripcion: 'Ha aprendido a gestionar lo difícil. Aun después de atravesar momentos difíciles, logras seguir adelante sin perder completamente el rumbo. Has aprendido mucho de la experiencia y has desarrollado capacidad para mantener equilibrio.',
        fortalezas: ['Resiliencia probada', 'Aprendizaje de la experiencia', 'Equilibrio emocional', 'Capacidad de reconstrucción'],
        puntosCiegos: ['Cargar demasiado peso solo', 'Dificultad para pedir ayuda', 'Emociones demasiado guardadas', 'Acostumbrarse a resistir'],
        recomendacion: 'Ser fuerte no significa tener que sostener todo solo. En ocasiones, el verdadero crecimiento no consiste en resistir más, sino en aprender a compartir un poco del peso. Permitirte descansar. Hablar cuando algo duele. Pedir ayuda.',
        preguntaReflexion: '¿Hay algo que llevas demasiado tiempo intentando manejar solo, cuando quizá permitir ayuda también podría ser una forma de cuidarte?'
      },
      integrado_intencional: {
        nombre: 'El Integrado Intencional',
        icon: 'fa-compass',
        descripcion: 'Vive con conciencia y dirección. Has aprendido a vivir con un poco más de claridad sobre ti mismo. No porque tengas todas las respuestas, sino porque has desarrollado cierta conciencia sobre quiénes son, qué necesitan y qué cosas ya no quieren seguir repitiendo.',
        fortalezas: ['Coherencia interior', 'Toma de decisiones consciente', 'Autoconocimiento profundo', 'Dirección personal clara'],
        puntosCiegos: ['Riesgo de dejar de revisarse', 'Presión por mantenerse "coherente"', 'Exigencia de perfección en el proceso'],
        recomendacion: 'Crecer no significa dejar de cambiar. Conocerte tampoco significa terminar de descubrirte por completo. El autoconocimiento no es un lugar al que llegas, es una conversación que continúa.',
        preguntaReflexion: '¿Hay alguna parte de tu vida que hace tiempo no revisas porque sientes que ya la tienes resuelta?'
      }
    };
    
    return profiles[key] || profiles.disciplinado_construccion;
  }
};

window.TestScoring = TestScoring;