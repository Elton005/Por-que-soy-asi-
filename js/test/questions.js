/**
 * Banco de Preguntas - Las 8 Dimensiones (VERSIÓN REDUCIDA)
 * 16 preguntas totales (2 por dimensión)
 * Alineado con el contenido real del libro "¿Por qué soy así?"
 */

const TestQuestions = [
  // ═══════════════════════════════════════════════════
  // DIMENSIÓN 1: TEMPERAMENTOS (2 preguntas)
  // ═══════════════════════════════════════════════════
  {
    id: 1,
    dimension: 'temperamento',
    text: 'Cuando surge un imprevisto o un cambio repentino en tus planes, ¿cuál es tu primera reacción natural?',
    options: [
      { text: 'Lo tomo con calma. Me adapto sin mayor estrés y espero a ver cómo se desarrolla.', value: 'flematico' },
      { text: 'Me activo de inmediato. Busco soluciones rápidas y tomo el control de la situación.', value: 'colerico' },
      { text: 'Siento el impulso de comentarlo o buscar compañía. Procesar las cosas en voz alta me ayuda.', value: 'sanguineo' },
      { text: 'Lo analizo en detalle. Me preocupan las posibles consecuencias y prefiero entender todo antes de actuar.', value: 'melancolico' }
    ]
  },
  {
    id: 2,
    dimension: 'temperamento',
    text: 'Cuando empiezas un proyecto nuevo o una meta importante, ¿qué suele ocurrir?',
    options: [
      { text: 'Me entusiasmo muchísimo al principio, pero a veces me cuesta mantener el interés cuando la novedad desaparece.', value: 'sanguineo' },
      { text: 'Me enfoco con intensidad y avanzo rápido. No me detengo hasta ver resultados concretos.', value: 'colerico' },
      { text: 'Lo planifico con cuidado, analizando cada detalle antes de dar el primer paso.', value: 'melancolico' },
      { text: 'Avanzo con constancia pero sin prisa. Prefiero mantener un ritmo estable y sostenible.', value: 'flematico' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // DIMENSIÓN 2: TOLERANCIA A LA FRUSTRACIÓN (2 preguntas)
  // ═══════════════════════════════════════════════════
  {
    id: 3,
    dimension: 'frustracion',
    text: 'Cuando algo no sale como esperabas o se retrasa más de lo debido, ¿qué sucede dentro de ti?',
    options: [
      { text: 'Lo acepto rápido. Entiendo que no todo depende de mí y ajusto mis expectativas.', value: 'alta' },
      { text: 'Siento una oleada emocional fuerte. Me cuesta contener la decepción o el enojo.', value: 'emocional' },
      { text: 'Me genera un malestar físico o mental inmediato. La incomodidad me domina hasta que se resuelve.', value: 'disconfort' },
      { text: 'Lo interpreto como un fracaso personal. Cuestiono mi capacidad o mi esfuerzo.', value: 'fracaso' }
    ]
  },
  {
    id: 4,
    dimension: 'frustracion',
    text: 'Después de un fracaso o decepción, ¿cómo sueles recuperarte?',
    options: [
      { text: 'Aprendo lo que puedo y sigo adelante sin quedarme atrapado en la emoción.', value: 'alta' },
      { text: 'Tardo bastante tiempo en superar la emoción. Revivo la situación una y otra vez.', value: 'emocional' },
      { text: 'Busco distraerme rápidamente con algo agradable para no sentir la incomodidad.', value: 'disconfort' },
      { text: 'Me castigo internamente. Me cuesta perdonarme el error.', value: 'fracaso' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // DIMENSIÓN 3: GESTIÓN DE CONFLICTOS (2 preguntas)
  // ═══════════════════════════════════════════════════
  {
    id: 5,
    dimension: 'conflictos',
    text: 'Ante un desacuerdo importante con alguien cercano, ¿cuál es tu tendencia?',
    options: [
      { text: 'Defiendo mi postura con firmeza. Para mí, ganar o tener la razón es prioritario.', value: 'competitivo' },
      { text: 'Busco una solución donde todos ganemos. Prefiero dialogar hasta encontrar un punto medio real.', value: 'colaborativo' },
      { text: 'Cedo en algunos puntos para mantener la paz, aunque no esté completamente de acuerdo.', value: 'comprometedor' },
      { text: 'Evito el enfrentamiento. Prefiero retirarme o posponer la conversación antes que discutir.', value: 'evitador' }
    ]
  },
  {
    id: 6,
    dimension: 'conflictos',
    text: 'Cuando sientes que alguien te ha tratado injustamente, ¿cómo reaccionas?',
    options: [
      { text: 'Lo confronto directamente. No me quedo callado ante una injusticia.', value: 'competitivo' },
      { text: 'Expreso cómo me sentí y busco entender qué ocurrió realmente.', value: 'colaborativo' },
      { text: 'Busco un punto medio, aunque no esté totalmente satisfecho con el resultado.', value: 'comprometedor' },
      { text: 'Me alejo o guardo silencio. No quiero generar más tensión.', value: 'acomodador' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // DIMENSIÓN 4: NO VER EL MAL (2 preguntas)
  // ═══════════════════════════════════════════════════
  {
    id: 7,
    dimension: 'noVer',
    text: 'Cuando algo en tu vida o en una relación te incomoda profundamente, ¿qué haces habitualmente?',
    options: [
      { text: 'Lo señalo directamente. Prefiero enfrentar la verdad, aunque sea incómoda.', value: 'confrontador' },
      { text: 'Elijo en qué fijarme. Me concentro en lo positivo y dejo de lado lo que me perturba.', value: 'selectivo' },
      { text: 'Desvío la mirada. Cambiar de tema o distraerme me ayuda a no sentir el peso de esa realidad.', value: 'evitador' }
    ]
  },
  {
    id: 8,
    dimension: 'noVer',
    text: '¿Con qué frecuencia te has dado cuenta, mucho después, de que estabas ignorando una señal evidente?',
    options: [
      { text: 'Casi nunca. Detecto las señales tempranas y actúo antes de que crezcan.', value: 'confrontador' },
      { text: 'A veces. Depende de si el tema me afecta emocionalmente o no.', value: 'selectivo' },
      { text: 'Con frecuencia. Suelo darme cuenta cuando ya es demasiado tarde para evitar el problema.', value: 'evitador' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // DIMENSIÓN 5: NO OÍR EL MAL (2 preguntas)
  // ═══════════════════════════════════════════════════
  {
    id: 9,
    dimension: 'noOir',
    text: 'Cuando recibes una crítica o un comentario difícil sobre ti, ¿cómo lo procesas?',
    options: [
      { text: 'Lo escucho completo antes de responder. Intento entender la intención detrás de las palabras.', value: 'abierta' },
      { text: 'Me pongo a la defensiva. Siento que me atacan y mi mente busca contraargumentos de inmediato.', value: 'defensiva' },
      { text: 'Filtro lo que digo. Solo retengo lo que confirma lo que ya pienso o lo que me resulta cómodo.', value: 'selectiva' },
      { text: 'Asiento pero no lo registro realmente. Mi mente se desconecta para no lidiar con el mensaje.', value: 'evasiva' }
    ]
  },
  {
    id: 10,
    dimension: 'noOir',
    text: 'Mientras alguien te habla de algo importante, ¿qué suele ocurrir en tu mente?',
    options: [
      { text: 'Me concentro en comprender realmente lo que me está diciendo.', value: 'abierta' },
      { text: 'Ya estoy preparando mi respuesta o defensa antes de que termine.', value: 'defensiva' },
      { text: 'Presto atención solo a las partes con las que estoy de acuerdo.', value: 'selectiva' },
      { text: 'Mi mente divaga o se desconecta si el tema me incomoda.', value: 'evasiva' }
    ]
  },

  // ═══════════════════════════════════════════════════
  // DIMENSIÓN 6: NO HABLAR EL MAL (2 preguntas)
  // ═══════════════════════════════════════════════════
  {
    id: 11,
    dimension: 'noHablar',
    text: 'Cuando necesitas expresar algo que te molesta o te duele, ¿cómo sueles hacerlo?',
    options: [
      { text: 'Lo digo con claridad y respeto. Busco ser directo sin herir ni atacar.', value: 'asertiva' },
      { text: 'A veces exploto o uso palabras duras. La emoción me gana y no filtro lo que sale.', value: 'agresiva' },
      { text: 'Me lo guardo. Prefiero callar antes que generar conflicto, aunque me pese por dentro.', value: 'pasiva' },
      { text: 'No lo digo directamente, pero lo demuestro con silencios, sarcasmo o actitudes pasivo-agresivas.', value: 'pasivo_agresiva' }
    ]
  },
  {
    id: 12,
    dimension: 'noHablar',
    text: '¿Cómo describirías tu forma habitual de comunicarte?',
    options: [
      { text: 'Clara, honesta y respetuosa. Busco construir puentes.', value: 'asertiva' },
      { text: 'Directa y fuerte. A veces demasiado, pero al menos soy sincero.', value: 'agresiva' },
      { text: 'Tranquila y considerada, pero a veces me cuesta expresar lo que realmente pienso.', value: 'pasiva' },
      { text: 'Ambigua. A veces digo una cosa pero doy a entender otra.', value: 'pasivo_agresiva' }
    ]
  },

  // ══════════════════════════════════════════════════
  // DIMENSIÓN 7: AUTOCONCIENCIA EMOCIONAL (2 preguntas)
  // ═══════════════════════════════════════════════════
  {
    id: 13,
    dimension: 'autoconciencia',
    text: 'Cuando sientes una emoción intensa (enojo, tristeza, ansiedad), ¿qué haces primero?',
    options: [
      { text: 'La reconozco y le pongo nombre. Me doy cuenta de qué la activa y cómo me afecta.', value: 'alta' },
      { text: 'La siento, pero me cuesta identificarla. A veces reacciono antes de entender qué me pasa.', value: 'media' },
      { text: 'La ignoro o la reprimo. Prefiero seguir funcionando sin detenerme a analizar lo emocional.', value: 'baja' }
    ]
  },
  {
    id: 14,
    dimension: 'autoconciencia',
    text: '¿Con qué frecuencia te detienes a observar tus propios patrones de reacción?',
    options: [
      { text: 'Frecuentemente. Intento hacer una pausa antes de actuar para elegir conscientemente.', value: 'alta' },
      { text: 'A veces. Solo cuando algo sale muy mal o alguien me lo hace notar.', value: 'media' },
      { text: 'Casi nunca. Vivo en piloto automático y reacciono según lo que me pide el momento.', value: 'baja' }
    ]
  },

  // ══════════════════════════════════════════════════
  // DIMENSIÓN 8: INTEGRACIÓN Y DIRECCIÓN PERSONAL (2 preguntas)
  // ═══════════════════════════════════════════════════
  {
    id: 15,
    dimension: 'integracion',
    text: 'Al final del día, ¿cómo evalúas tus decisiones y acciones?',
    options: [
      { text: 'Actúo desde la reacción. El entorno o las emociones deciden por mí la mayor parte del tiempo.', value: 'reactiva' },
      { text: 'Intento ser consciente, pero a veces mis acciones no coinciden con lo que realmente quiero.', value: 'consciente_inconsistente' },
      { text: 'Busco coherencia. Hago una pausa, observo mis valores y elijo actuar alineado con quien quiero ser.', value: 'integrada' }
    ]
  },
  {
    id: 16,
    dimension: 'integracion',
    text: '¿Qué tan alineadas están tus decisiones diarias con la persona que quieres llegar a ser?',
    options: [
      { text: 'Poco alineadas. Vivo reaccionando a lo que ocurre sin mucha dirección.', value: 'reactiva' },
      { text: 'A veces sí, a veces no. Tengo claridad pero me cuesta sostenerla.', value: 'consciente_inconsistente' },
      { text: 'Bastante alineadas. Tomo decisiones conscientes aunque no siempre sean fáciles.', value: 'integrada' }
    ]
  }
];

window.TestQuestions = TestQuestions;