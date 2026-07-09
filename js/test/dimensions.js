/**
 * Metadata de las 8 Dimensiones
 * Nombres, descripciones y frases clave para cada dimensión
 */

const DimensionInfo = {
    temperamento: {
        numero: 1,
        nombre: 'Temperamento',
        descripcion: 'El temperamento es la base biológica de tu personalidad. Es la forma natural en que reaccionas ante el mundo, la energía que te mueve y el ritmo con el que vives. No es algo que elijas, es algo que eres.',
        frase: 'Conocer tu temperamento es entender el motor de tu comportamiento.',
        icono: 'fa-solid fa-fire'
    },
    
    frustracion: {
        numero: 2,
        nombre: 'Tolerancia a la Frustración',
        descripcion: 'La forma en que manejas la frustración revela mucho sobre tu fortaleza emocional. No se trata de evitar el dolor, sino de cómo lo procesas, lo aceptas y sigues adelante.',
        frase: 'La frustración no es el enemigo, es el maestro.',
        icono: 'fa-solid fa-shield-halved'
    },
    
    conflictos: {
        numero: 3,
        nombre: 'Gestión de Conflictos',
        descripcion: 'Los conflictos son inevitables en cualquier relación. Lo que define tu madurez emocional no es evitarlos, sino cómo los enfrentas: con agresividad, con sumisión, o con la valentía de buscar soluciones reales.',
        frase: 'Un conflicto bien gestionado es una oportunidad de crecimiento.',
        icono: 'fa-solid fa-handshake'
    },
    
    noVer: {
        numero: 4,
        nombre: 'Lo que eliges no ver',
        descripcion: 'Todos tenemos verdades que preferimos ignorar. Esta dimensión explora tu capacidad (o resistencia) para enfrentar realidades incómodas sobre ti mismo, tus relaciones o tu vida.',
        frase: 'Lo que no ves, te controla. Lo que ves, puedes transformarlo.',
        icono: 'fa-solid fa-eye-slash'
    },
    
    noOir: {
        numero: 5,
        nombre: 'Lo que eliges no oír',
        descripcion: 'Escuchar de verdad requiere valentía. A veces filtramos las críticas, ignoramos las señales o nos ponemos a la defensiva. Esta dimensión revela cómo procesas (o evitas) lo que otros te dicen.',
        frase: 'Escuchar no es oír. Escuchar es estar dispuesto a cambiar.',
        icono: 'fa-solid fa-ear-listen'
    },
    
    noHablar: {
        numero: 6,
        nombre: 'Lo que eliges no decir',
        descripcion: 'La comunicación es el puente entre las personas. Pero a veces callamos lo que duele, hablamos desde el enojo o decimos una cosa mientras sentimos otra. Esta dimensión explora tu honestidad al expresarte.',
        frase: 'Lo que no dices, te pesa. Lo que dices con claridad, te libera.',
        icono: 'fa-solid fa-comment-slash'
    },
    
    autoconciencia: {
        numero: 7,
        nombre: 'Autoconciencia Emocional',
        descripcion: 'La autoconciencia es la capacidad de observarte a ti mismo: reconocer tus emociones, entender qué las activa y elegir cómo responder. Es la base de todo cambio real.',
        frase: 'No puedes cambiar lo que no reconoces.',
        icono: 'fa-solid fa-brain'
    },
    
    integracion: {
        numero: 8,
        nombre: 'Integración y Dirección Personal',
        descripcion: 'Esta dimensión final evalúa qué tan alineadas están tus acciones con tus valores. ¿Vives reaccionando al entorno o eliges conscientemente quién quieres ser?',
        frase: 'La integración es cuando lo que piensas, sientes y haces están en armonía.',
        icono: 'fa-solid fa-compass'
    }
};

window.DimensionInfo = DimensionInfo;