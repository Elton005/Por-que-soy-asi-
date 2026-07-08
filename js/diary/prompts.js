/**
 * Prompts del Diario de 7 Días
 * Extraídos directamente del libro "¿Por qué soy así?"
 */

const DiaryPrompts = [
  {
    day: 1,
    title: 'Observarte',
    subtitle: 'Hoy no intentes cambiar nada. Solo observa.',
    intro: 'Muchas veces queremos mejorar algo de nosotros antes de comprenderlo. Pero difícilmente podemos transformar aquello que todavía no entendemos.',
    questions: [
      {
        q: '¿Cómo reaccioné hoy ante situaciones incómodas?',
        hint: 'A veces reaccionamos de maneras que ni siquiera notamos: evitamos hablar, nos molestamos rápido, hacemos bromas para escapar de algo, nos cerramos o fingimos que no importa.'
      },
      {
        q: '¿Qué emoción predominó en mi día?',
        hint: 'No siempre es fácil ponerle nombre a lo que sentimos. A veces creemos estar molestos cuando en realidad estamos cansados. O pensamos que estamos bien, pero en el fondo hay ansiedad, tristeza o frustración.'
      },
      {
        q: '¿En qué momento sentí que actué de manera inconsciente?',
        hint: 'Muchas veces hacemos cosas sin detenernos a pensar: responder de cierta manera, revisar el teléfono constantemente, evitar conversaciones, comer por ansiedad o reaccionar por costumbre.'
      }
    ]
  },
  {
    day: 2,
    title: 'Tu Temperamento',
    subtitle: 'Mírate con honestidad.',
    intro: 'Cada persona tiene una manera particular de reaccionar al mundo. A eso solemos llamarle temperamento: esa inclinación natural que influye en cómo sentimos, respondemos y tomamos decisiones.',
    questions: [
      {
        q: '¿Cuál de los temperamentos siento más fuerte en mí?',
        hint: 'No pienses solo en cómo eres cuando todo está bien. A veces nuestro verdadero temperamento aparece en la presión, el cansancio, la frustración o los conflictos.'
      },
      {
        q: '¿Cómo influye mi temperamento en mis decisiones?',
        hint: 'Muchas veces creemos que decidimos solo con lógica, pero nuestra personalidad influye más de lo que imaginamos.'
      },
      {
        q: '¿En qué momentos mi temperamento me ayuda y en cuáles me limita?',
        hint: 'Toda fortaleza puede convertirse en dificultad dependiendo del momento. Ser sensible puede ayudarte a comprender a otros, pero también hacerte cargar demasiado.'
      }
    ]
  },
  {
    day: 3,
    title: 'Frustración',
    subtitle: 'Hoy observa cómo manejas aquello que no sale como esperas.',
    intro: 'La frustración suele aparecer cuando existe una distancia entre lo que queríamos que ocurriera y lo que realmente ocurrió. Y aunque no siempre podamos controlar lo que pasa, sí podemos aprender mucho observando la forma en que respondemos.',
    questions: [
      {
        q: '¿Qué me frustró hoy?',
        hint: 'No tiene que ser algo grande. En múltiples ocasiones las pequeñas molestias del día esconden emociones más profundas: cansancio, sensación de injusticia, miedo, presión o expectativas demasiado altas.'
      },
      {
        q: '¿Cómo reaccioné?',
        hint: 'Cuando algo nos frustra, solemos reaccionar de maneras muy distintas: nos irritamos, nos cerramos, discutimos, evitamos hablar, fingimos que no importa o incluso nos culpamos demasiado.'
      },
      {
        q: '¿Esa reacción me ayudó o me perjudicó?',
        hint: 'No todas las reacciones incómodas son malas. A veces enojarnos nos ayuda a poner límites. Otras veces, nuestra respuesta termina empeorando algo que ya era difícil.'
      }
    ]
  },
  {
    day: 4,
    title: 'Lo que Evitas Ver',
    subtitle: 'Hoy dirige tu atención hacia aquello que te incomoda.',
    intro: 'Hay cosas que sabemos, aunque no siempre queramos mirarlas de frente. Conversaciones pendientes; decisiones aplazadas; hábitos que ya no nos hacen bien; dolores que preferimos distraer; verdades que intuimos, pero seguimos empujando hacia un rincón silencioso.',
    questions: [
      {
        q: '¿Hay algo en mi vida que sé que debo enfrentar y no lo hago?',
        hint: 'No pienses únicamente en esos grandes problemas. Lo que evitamos puede ser algo pequeño, pero constante: una conversación pendiente, un límite que no nos decidimos a poner, un hábito que sabemos que nos está afectando.'
      },
      {
        q: '¿Qué emoción me hace evitarlo?',
        hint: 'Nos ocurre a veces que no evitamos algo tan solo por falta de tiempo o capacidad, sino porque hay una emoción detrás que nos limita: miedo, tristeza, culpa, vergüenza, enojo, inseguridad o incluso cansancio emocional.'
      },
      {
        q: '¿Qué pequeño paso puedo dar?',
        hint: 'Hoy no necesitas resolverlo todo. El cambio no empieza con grandes decisiones, sino con algo mucho más sencillo: un primer paso pequeño y posible.'
      }
    ]
  },
  {
    day: 5,
    title: 'Lo que No Escuchas',
    subtitle: 'Hoy presta atención a tus conversaciones.',
    intro: 'Escuchar parece algo sencillo, después de todo hablamos con personas todos los días. Pero escuchar de verdad no siempre es tan fácil como creemos. A veces alguien habla y nosotros ya estamos preparando la respuesta.',
    questions: [
      {
        q: '¿Escuché realmente hoy o solo respondí?',
        hint: 'Piensa en las conversaciones que tuviste hoy. ¿Hubo momentos en los que realmente prestaste atención? ¿O estabas más enfocado en qué responder, defender, explicar o terminar de decir?'
      },
      {
        q: '¿Hubo algo que no quise escuchar?',
        hint: 'Hay momentos en que evitamos ciertas palabras porque nos incomodan. Puede ser una crítica, una preocupación, algo que alguien necesita decirnos o incluso algo bueno que no sabemos recibir.'
      },
      {
        q: '¿Por qué me incomodó?',
        hint: 'Aquí no importa tanto si la otra persona tenía razón o no. La pregunta importante es: ¿Qué tocó dentro de mí esa conversación?'
      }
    ]
  },
  {
    day: 6,
    title: 'Cómo te Expresas',
    subtitle: 'Hoy observa tus palabras.',
    intro: 'Las palabras tienen algo curioso: decimos demasiado cuando estamos heridos, otras veces callamos justo cuando más necesitamos hablar. Hay momentos en los que hablamos con claridad, y otros en los que escondemos lo que sentimos detrás de silencios, bromas o evasivas.',
    questions: [
      {
        q: '¿Dije lo que sentía o lo guardé?',
        hint: 'Piensa en algún momento del día donde hubo algo importante que sentías. ¿Lo expresaste realmente? ¿Preferiste callarlo, minimizarlo o dejarlo para después?'
      },
      {
        q: '¿Cómo reaccioné al comunicarme?',
        hint: 'No solo importa lo que decimos, sino cómo lo decimos. El tono, el momento, el silencio, la manera de responder también hablan de nuestra forma de expresarnos.'
      },
      {
        q: '¿Mis palabras acercaron o alejaron?',
        hint: 'Incluso con buena intención nuestras palabras pueden herir, generar distancia o malentendidos. Otras veces, una frase sencilla puede acercarnos mucho más de lo que imaginamos.'
      }
    ]
  },
  {
    day: 7,
    title: 'Integración',
    subtitle: 'Hoy une todo.',
    intro: 'Llegaste al último día de este recorrido. El autoconocimiento rara vez ocurre como una gran revelación repentina. Muchas veces sucede de una manera más silenciosa: en pequeños descubrimientos, en preguntas que permanecen rondando la mente.',
    questions: [
      {
        q: '¿Qué he descubierto sobre mí esta semana?',
        hint: 'Piensa en lo que apareció mientras escribías. Probablemente algo te sorprendió. Quizá confirmaste algo que ya intuías. O tal vez descubriste una emoción, una reacción o una necesidad que antes no habías visto tan claramente.'
      },
      {
        q: '¿Qué patrón se repite en mí?',
        hint: 'Muchas veces creemos que cada situación es distinta, pero al observarnos mejor comienzan a aparecer ciertos patrones. Tal vez evitas conversaciones difíciles, quizá reaccionas desde el enojo cuando algo te hiere.'
      },
      {
        q: '¿Qué quiero empezar a hacer diferente?',
        hint: 'No pienses en grandes cambios imposibles. Las transformaciones profundas rara vez comienzan con promesas enormes. A veces empiezan con decisiones pequeñas, repetidas con intención.'
      }
    ]
  }
];

window.DiaryPrompts = DiaryPrompts;