/**
 * Dimensiones Detail - Contenido profundo de las 8 dimensiones
 * ALINEADO 100% CON EL TEXTO DEL LIBRO "¿POR QUÉ SOY ASÍ?"
 * Sin mensajes de ánimo ni preguntas de reflexión, enfocado en la descripción literal.
 */

const DimensionsDetail = {
    
    // ═══════════════════════════════════════════════════
    // 1. TEMPERAMENTOS (4 Tipos específicos del libro)
    // ═══════════════════════════════════════════════════
    temperamento: {
        nombre: 'Temperamento',
        icono: 'fa-solid fa-fire',
        descripcionBase: 'Tu manera natural de reaccionar ante el mundo y relacionarte con los demás. Es el lenguaje emocional con el que empiezas la vida.',
        tipos: {
            sanguineo: {
                nombre: 'Temperamento Predominante Sanguíneo',
                descripcion: 'Sociable, alegre, comunicativo. Conectas con facilidad y transmites entusiasmo de forma natural.',
                narrativa: 'Eres alguien que llega a un lugar y rápidamente encuentra conversación. Te adaptas con cierta facilidad a nuevas situaciones y disfrutas los ambientes vivos. Tu energía puede hacer que las personas se sientan más relajadas e incluidas.',
                fortalezas: ['Entusiasmo contagioso', 'Facilidad para conectar con otros', 'Creatividad y dinamismo', 'Capacidad de animar momentos difíciles'],
                puntosCiegos: ['Dificultad para sostener proyectos a largo plazo', 'Tendencia a tomar decisiones impulsivas', 'Pérdida de interés cuando la novedad desaparece', 'Evitar conversaciones demasiado profundas o incómodas'],
                consejo: 'Tu entusiasmo no es el problema; de hecho, es una de tus mayores fortalezas. El verdadero crecimiento quizá tenga más que ver con aprender a sostener un poco más aquello que realmente importa, incluso cuando deja de sentirse emocionante.'
            },
            colerico: {
                nombre: 'Temperamento Predominante Colérico',
                descripcion: 'Decidido, fuerte, orientado a resultados, impulsivo.',
                narrativa: 'Tienes claridad sobre lo que quieres y haces todo lo posible por llevarlo adelante. Cuando otros todavía están pensando qué hacer, tú probablemente ya comenzaste. No te rindes fácilmente.',
                fortalezas: ['Determinación y liderazgo', 'Capacidad de resolver problemas', 'Persistencia bajo presión', 'Iniciativa y dirección clara'],
                puntosCiegos: ['Impaciencia con otros ritmos', 'Dificultad para escuchar', 'Necesidad de control', 'Comunicación demasiado directa'],
                consejo: 'Ser fuerte no significa tener que cargar con todo. El verdadero crecimiento quizá esté en aprender a equilibrar esa firmeza con empatía, escuchando un poco más y dando espacio a otros ritmos.'
            },
            flematico: {
                nombre: 'Temperamento Predominante Flemático',
                descripcion: 'Tranquilo, observador, orientado a la estabilidad.',
                narrativa: 'Prefieres pensar con calma y muchas veces buscas mantener cierto equilibrio incluso cuando las cosas alrededor parecen desordenadas. Mientras otros reaccionan con rapidez, tú escuchas, observas y analizas.',
                fortalezas: ['Estabilidad emocional', 'Capacidad de observación', 'Paciencia y constancia', 'Transmites serenidad'],
                puntosCiegos: ['Evitación de conflictos necesarios', 'Postergación de decisiones', 'Dificultad para expresar necesidades', 'Excesiva comodidad en lo conocido'],
                consejo: 'Buscar paz no tiene nada de malo. Pero hay momentos en los que crecer implica participar un poco más, decir algo que llevabas tiempo callando o atreverte a moverte, aunque no todo se sienta completamente seguro.'
            },
            melancolico: {
                nombre: 'Temperamento Predominante Melancólico',
                descripcion: 'Profundo, analítico, sensible.',
                narrativa: 'Observas detalles que otros pasan por alto, reflexionas mucho sobre lo que ocurre y te importa profundamente aquello que consideras valioso. Buscas coherencia y que las cosas importantes realmente valgan la pena.',
                fortalezas: ['Profundidad de análisis', 'Sensibilidad emocional', 'Compromiso y responsabilidad', 'Atención al detalle'],
                puntosCiegos: ['Autocrítica excesiva', 'Parálisis por análisis', 'Dificultad para disfrutar logros', 'Perfeccionismo paralizante'],
                consejo: 'No todo en la vida necesita estar completamente resuelto para poder empezar. A veces el verdadero crecimiento no consiste en dejar de ser profundo, sino en aprender a ser un poco más amable contigo mismo.'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 2. TOLERANCIA A LA FRUSTRACIÓN
    // ═══════════════════════════════════════════════════
    frustracion: {
        nombre: 'Tolerancia a la Frustración',
        icono: 'fa-solid fa-shield-halved',
        descripcionBase: 'Cómo manejas lo que no sale como esperas. No se trata de aguantarlo todo, sino de desarrollar la capacidad de atravesar la incomodidad sin perder el equilibrio.',
        niveles: {
            alta: {
                nombre: 'Alta Tolerancia',
                descripcion: 'Has aprendido a convivir con la realidad sin pelear constantemente contra ella. Cuando las cosas no salen como esperabas, buscas la manera de adaptarte y seguir adelante.',
                narrativa: 'Has desarrollado una fortaleza interior que te permite navegar la adversidad sin perder tu esencia. Comprendes que algunos procesos requieren tiempo y que no todo resultado llega cuando lo deseamos.',
                fortalezas: ['Capacidad de mantener la calma bajo presión', 'Resiliencia y aprendizaje de la experiencia', 'Perseverancia ante los obstáculos', 'Capacidad de ver oportunidades en las dificultades'],
                puntosCiegos: ['Riesgo de tolerar demasiado (situaciones que deberías cambiar)', 'Acostumbrarte a cargar con más peso del que te corresponde', 'Tendencia a reprimir emociones "negativas"', 'Dificultad para pedir ayuda cuando realmente la necesitas'],
                consejo: 'Tu resiliencia es admirable, pero recuerda que aceptar no es lo mismo que conformarse. A veces, la acción también forma parte de la sabiduría, y mantener la calma no significa quedarse quieto cuando la vida te invita a avanzar.'
            },
            emocional: {
                nombre: 'Intolerancia Emocional',
                descripcion: 'Sientes las emociones con intensidad y tienes una gran sensibilidad hacia lo que ocurre dentro de ti. Sueles darte cuenta rápidamente cuando algo te afecta.',
                narrativa: 'Cuando aparecen emociones incómodas como la tristeza, la frustración o la ansiedad, puede resultarte difícil permanecer con ellas durante mucho tiempo. Existe una tendencia natural a querer que desaparezcan cuanto antes.',
                fortalezas: ['Capacidad para conectar con el mundo emocional', 'Empatía y comprensión del sufrimiento ajeno', 'Riqueza emocional que favorece la creatividad', 'Sensibilidad para percibir cambios internos'],
                puntosCiegos: ['Evitar conversaciones o decisiones por miedo a la incomodidad', 'Búsqueda de alivio inmediato que impide procesar', 'Creer que necesitas sentirte bien para funcionar', 'Las emociones evitadas suelen regresar con más fuerza'],
                consejo: 'Sentir mucho no es el problema. El verdadero reto está en aprender a darte un poco más de tiempo antes de reaccionar. No para reprimir lo que sientes, sino para darte un pequeño espacio que te permita entender qué emoción está hablando.'
            },
            disconfort: {
                nombre: 'Intolerancia al Malestar (Disconfort)',
                descripcion: 'Encuentras difícil mantenerte durante mucho tiempo en situaciones que exigen esfuerzo, paciencia o incomodidad.',
                narrativa: 'Es posible que comiences proyectos con entusiasmo, pero que la motivación disminuya cuando llega la parte menos emocionante del proceso. Te cuesta mantener hábitos que requieren constancia.',
                fortalezas: ['Sabes reconocer cuándo necesitas descansar', 'Capacidad natural para conectar con el presente', 'Disfrutas los pequeños placeres de la vida', 'Te adaptas bien a entornos dinámicos y de respuestas rápidas'],
                puntosCiegos: ['Postergar tareas importantes porque no te apetece hacerlas', 'Abandonar metas cuando aparecen las primeras dificultades', 'Acumular proyectos inconclusos o hábitos abandonados', 'La búsqueda de comodidad se convierte en una barrera para el crecimiento'],
                consejo: 'Deja de pensar únicamente en la meta completa y empieza a concentrarte en el siguiente paso. Dividir los objetivos en acciones pequeñas y manejables puede reducir enormemente la resistencia inicial.'
            },
            fracaso: {
                nombre: 'Intolerancia al Fracaso',
                descripcion: 'Te tomas muy en serio aquello que haces. Cuando algo sale mal, la decepción puede ocupar tus pensamientos y llevarte a cuestionarte más de lo necesario.',
                narrativa: 'Muchas veces no temes únicamente al fracaso en sí mismo, sino a lo que crees que ese fracaso dice sobre ti. Por eso, prefieres no intentar ciertas cosas antes que enfrentarte a la posibilidad de equivocarte.',
                fortalezas: ['Deseo genuino de hacer las cosas bien', 'Capacidad para detectar detalles y buscar mejoras', 'Responsabilidad y compromiso con la calidad', 'Dedicación y estándares elevados'],
                puntosCiegos: ['Castigarte por errores que otros considerarían normales', 'Ansiedad relacionada con el desempeño', 'Dificultad para sentir satisfacción por los logros', 'Miedo a equivocarte que paraliza la acción'],
                consejo: 'Tu valor personal no depende únicamente de lo que logras. El crecimiento está en aprender a crecer sin convertir cada equivocación en un juicio contra ti mismo. Nadie aprende primero y se equivoca después; todos aprendemos equivocándonos.'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 3. GESTIÓN DE CONFLICTOS
    // ═══════════════════════════════════════════════════
    conflictos: {
        nombre: 'Gestión de Conflictos',
        icono: 'fa-solid fa-handshake',
        descripcionBase: 'Tu estilo al enfrentar desacuerdos y tensiones. El problema no suele ser el conflicto en sí mismo, sino la manera en que lo gestionamos.',
        niveles: {
            competitivo: {
                nombre: 'Estilo Competitivo',
                descripcion: 'No sueles quedarte callado cuando consideras que algo es importante. Defiendes tu posición con firmeza.',
                narrativa: 'Ves los conflictos como situaciones que deben resolverse de manera clara y directa. Tienes un fuerte sentido de la justicia y no te resulta fácil permanecer indiferente ante lo que consideras incorrecto.',
                fortalezas: ['Capacidad de establecer límites firmes', 'Determinación para defender lo que consideras correcto', 'Comunicación clara y directa', 'Capacidad de actuar bajo presión'],
                puntosCiegos: ['Riesgo de priorizar la victoria por encima de la relación', 'Puedes escuchar menos de lo que realmente quisieras', 'Tendencia a ser demasiado confrontativo', 'Dificultad para aceptar que otros necesitan más tiempo'],
                consejo: 'La verdadera fortaleza no consiste únicamente en sostener tu posición, sino también en saber cuándo escuchar y cuándo construir puentes. Pregúntate: ¿quiero ganar o quiero resolver?'
            },
            colaborativo: {
                nombre: 'Estilo Colaborativo',
                descripcion: 'No ves los conflictos como una batalla que alguien debe ganar y alguien debe perder. Buscas comprender lo que está ocurriendo.',
                narrativa: 'Sueles creer que detrás de muchas discusiones existen necesidades o preocupaciones que todavía no han sido expresadas con claridad. Intentas crear espacios donde las personas puedan escucharse mutuamente.',
                fortalezas: ['Capacidad para generar soluciones más profundas y duraderas', 'Habilidad especial para fortalecer relaciones', 'Favoreces la cooperación y la confianza', 'Equilibrado, razonable y dispuesto a encontrar soluciones'],
                puntosCiegos: ['Invertir tanto tiempo que terminas agotado emocionalmente', 'Frustración cuando la otra persona no tiene el mismo interés en colaborar', 'Riesgo de que la búsqueda de consenso se convierta en una necesidad'],
                consejo: 'Acepta que no siempre existe una solución perfecta. Colaborar no significa cargar tú solo con la responsabilidad de resolver todos los conflictos. Desarrollar límites saludables es tan importante como desarrollar habilidades de diálogo.'
            },
            comprometedor: {
                nombre: 'Estilo Comprometedor',
                descripcion: 'Buscas soluciones prácticas cuando surge un conflicto. No sueles sentir la necesidad de ganar a toda costa, pero tampoco renuncias completamente a lo importante.',
                narrativa: 'Tu tendencia natural es buscar un punto intermedio donde ambas partes cedan algo y, al mismo tiempo, obtengan algo a cambio. Tienes una visión pragmática de los conflictos.',
                fortalezas: ['Capacidad para resolver conflictos de manera relativamente rápida', 'Habilidad importante para mantener relaciones funcionales', 'Flexibilidad para moverte con soltura en contextos cambiantes', 'Visión razonable y práctica'],
                puntosCiegos: ['La búsqueda de acuerdos rápidos puede impedir abordar aspectos más profundos', 'Riesgo de que ninguna de las partes quede verdaderamente satisfecha', 'Tendencia a ceder más de lo que deberías en aspectos fundamentales'],
                consejo: 'Negociar es saludable, pero no a costa de tus valores fundamentales. Aprende a distinguir entre lo negociable y lo innegociable. Hay líneas que no deberías cruzar, ni siquiera por amor.'
            },
            evitador: {
                nombre: 'Estilo Evitador',
                descripcion: 'No te sientes cómodo con las confrontaciones. Tu primera reacción suele ser tomar distancia, guardar silencio o esperar que el tiempo ayude.',
                narrativa: 'No necesariamente porque no te importe, sino porque los conflictos suelen generarte un nivel de incomodidad que preferirías evitar. Valoras mucho la tranquilidad.',
                fortalezas: ['No reaccionas impulsivamente ante cualquier desacuerdo', 'Facilidad para reconocer cuándo una conversación está demasiado cargada', 'Valoras tu energía emocional', 'Sabes distinguir qué conflictos merecen atención'],
                puntosCiegos: ['Los conflictos ignorados rara vez desaparecen, se acumulan', 'Terminas guardando demasiado de lo que piensas o sientes', 'Otros podrían percibir tu silencio como desinterés o falta de compromiso'],
                consejo: 'Aprende a distinguir entre pausar y huir. Pausar significa tomar distancia para volver más tarde con mayor claridad. Huir significa alejarse indefinidamente esperando que el problema desaparezca solo.'
            },
            acomodador: {
                nombre: 'Estilo Acomodador',
                descripcion: 'Valoras profundamente las relaciones y el bienestar de quienes te rodean. Prefieres proteger la conexión antes que defender tu propia posición.',
                narrativa: 'Prefieres que exista entendimiento antes que confrontación, y muchas veces estás dispuesto a ceder si eso ayuda a preservar la armonía o evita que alguien salga herido.',
                fortalezas: ['Capacidad para generar cercanía y confianza', 'Flexibilidad que puede ser muy valiosa en las relaciones', 'Sensibilidad especial para detectar cuándo otra persona necesita apoyo', 'Capacidad de preservar la unión de un grupo'],
                puntosCiegos: ['Tus propias necesidades pueden quedar constantemente en segundo plano', 'Riesgo de resentimiento silencioso por acumular pequeñas renuncias', 'Algunas personas pueden acostumbrarse a tu disposición para ceder'],
                consejo: 'Cuidar una relación no debería implicar abandonarte a ti mismo. Aprender a expresar lo que prefieres no es un acto de egoísmo, es una forma de honestidad que fortalece los vínculos sanos.'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 4. NO VER EL MAL
    // ═══════════════════════════════════════════════════
    noVer: {
        nombre: 'No ver el mal',
        icono: 'fa-solid fa-eye-slash',
        descripcionBase: 'Las realidades que prefieres ignorar. Aquello que no queremos ver no desaparece; simplemente permanece ahí, influyendo silenciosamente en nuestras decisiones.',
        niveles: {
            confrontador: {
                nombre: 'Confrontador (Bajo nivel de evitación)',
                descripcion: 'Prefieres enfrentarte a la realidad antes que ignorarla. Cuando percibes que existe un problema, tu tendencia natural suele ser observarla de frente.',
                narrativa: 'Para ti, la claridad suele tener más valor que la comodidad momentánea. Prefieres una verdad incómoda antes que una tranquilidad basada en la negación.',
                fortalezas: ['Capacidad para actuar basándote en los hechos', 'Confiable en momentos complejos o de crisis', 'Abordas problemas antes de que se vuelvan inmanejables', 'Objetividad y pensamiento crítico'],
                puntosCiegos: ['Comunicar verdades de una manera demasiado directa o dura', 'Vivir en un estado constante de vigilancia o alerta', 'Concentrarte tanto en lo que necesita atención que olvidas valorar lo que funciona', 'Riesgo de desgaste emocional'],
                consejo: 'Ver la realidad con claridad es una fortaleza, pero vivir permanentemente enfocado en los problemas puede convertirse en una carga. Aprende a combinar claridad con sensibilidad, y honestidad con empatía.'
            },
            selectivo: {
                nombre: 'Selectivo (Nivel medio de evitación)',
                descripcion: 'Has aprendido que no todo merece la misma atención. Filtras lo que ocurre a tu alrededor, evaluando las circunstancias antes de decidir cuánto espacio le darás.',
                narrativa: 'No ignoras la realidad por completo, pero tampoco permites que cada problema absorba toda tu atención. Has comprendido que vivir implica elegir dónde enfocar la energía.',
                fortalezas: ['No te sobrecargas fácilmente con cada problema', 'Flexibilidad mental para adaptarte a distintas circunstancias', 'Buena capacidad para priorizar recursos y energía', 'Conservas serenidad en entornos complejos'],
                puntosCiegos: ['Otros pueden interpretar tu actitud como indiferencia', 'Riesgo de usar argumentos razonables para justificar evitaciones', 'Posponer decisiones necesarias disfrazadas de prudencia', 'No toda tranquilidad es señal de equilibrio'],
                consejo: 'La verdadera sabiduría no consiste únicamente en elegir tus batallas, consiste en reconocer cuáles son demasiado importantes para seguir evitándolas. Revisa aquellas situaciones que llevas mucho tiempo posponiendo.'
            },
            evitador: {
                nombre: 'Evitador (Alto nivel de evitación)',
                descripcion: 'Prefieres mantener distancia de aquello que te genera demasiado malestar. Cuando una situación se vuelve incómoda, tu tendencia natural suele ser apartar la mirada.',
                narrativa: 'No lo haces por falta de responsabilidad, sino porque has aprendido que evitar ciertos problemas te permite conservar una sensación de tranquilidad inmediata. Pero lo que no se ve no desaparece.',
                fortalezas: ['Capacidad de protegerte de niveles de estrés excesivos', 'Conservas estabilidad en momentos de caos', 'No sueles involucrarte en conflictos por impulso', 'Dosificas tu exposición emocional'],
                puntosCiegos: ['Los problemas rara vez desaparecen porque dejamos de mirarlos', 'Riesgo de recibir impactos inesperados por no ver señales', 'Pérdida de oportunidades de crecimiento por miedo a la incomodidad', 'Acumular situaciones hasta que obligan a prestar atención'],
                consejo: 'La paz verdadera no suele encontrarse en aquello que evitamos ver. Aparece cuando dejamos de huir y descubrimos que éramos más fuertes de lo que creíamos. Permítete permanecer unos momentos más frente a aquello que te incomoda.'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 5. NO OÍR EL MAL
    // ═══════════════════════════════════════════════════
    noOir: {
        nombre: 'No oír el mal',
        icono: 'fa-solid fa-ear-listen',
        descripcionBase: 'Lo que eliges no escuchar. Escuchar verdaderamente implica permitir que una idea entre en nuestro mundo interior, incluso cuando desafía nuestras creencias.',
        niveles: {
            abierta: {
                nombre: 'Escucha Abierta',
                descripcion: 'Estás dispuesto a escuchar incluso aquello que no coincide con tus ideas o expectativas. Permites que diferentes opiniones tengan espacio.',
                narrativa: 'Te acercas a las conversaciones con curiosidad más que con necesidad de demostrar que tienes razón. Te interesa comprender cómo piensan los demás y qué puedes aprender de ello.',
                fortalezas: ['Capacidad para aprender constantemente de otros', 'Construyes relaciones más sólidas basadas en la confianza', 'Toma de decisiones más equilibradas y objetivas', 'Empatía y validación de las experiencias ajenas'],
                puntosCiegos: ['Exponerte demasiado a opiniones ajenas y cargar con preocupaciones que no te corresponden', 'Dar demasiado peso a voces que no merecen tanta influencia', 'Dificultad para filtrar críticas destructivas', 'Riesgo de perder tu propio criterio por complacer'],
                consejo: 'Escuchar no significa aceptar y comprender no significa estar de acuerdo. Procura mantener tu apertura sin perder tu criterio. Las opiniones de otras personas pueden aportar información valiosa, pero ninguna tiene el poder de definir quién eres.'
            },
            defensiva: {
                nombre: 'Escucha Defensiva',
                descripcion: 'Escuchas lo que otros dicen, pero una parte de ti permanece alerta. Cuando percibes una crítica, tu reacción suele ser prepararte para defenderte.',
                narrativa: 'No necesariamente ocurre porque seas una persona cerrada. Muchas veces sucede porque ciertas palabras activan emociones relacionadas con la autoestima o la necesidad de proteger una imagen importante de ti mismo.',
                fortalezas: ['Sabes defender aquello que consideras importante', 'No aceptas cualquier opinión sin analizarla', 'Sensibilidad especial para detectar situaciones que podrían afectarte emocionalmente'],
                puntosCiegos: ['Interpretar como ataque algo que en realidad era una observación', 'La conversación deja de ser una oportunidad para aprender', 'Responder antes de procesar completamente lo que escuchas'],
                consejo: 'La próxima vez que una opinión te incomode, intenta preguntarte: ¿esto es realmente un ataque o simplemente una percepción diferente? Espera unos segundos antes de responder. La comprensión aparece cuando dejamos que el mensaje termine de llegar.'
            },
            selectiva: {
                nombre: 'Escucha Selectiva',
                descripcion: 'Filtras gran parte de la información que recibes. Prestas más atención a aquello que confirma tus creencias o fortalece tus opiniones.',
                narrativa: 'No ignoras deliberadamente a los demás. Simplemente tu atención se dirige con mayor facilidad hacia aquello que encaja con lo que ya consideras cierto.',
                fortalezas: ['Mantienes el foco en aquello que consideras útil o relevante', 'No te saturas con cada información contradictoria que aparece', 'Gran claridad respecto a tus propios valores y convicciones'],
                puntosCiegos: ['El aprendizaje se vuelve limitado al solo entrar información familiar', 'Pérdida de perspectivas importantes u oportunidades de crecimiento', 'Dejar de cuestionar tus propias convicciones por completo'],
                consejo: 'De vez en cuando, pregúntate: ¿qué parte de esta situación podría estar pasando por alto? Escuchar opiniones diferentes con curiosidad en lugar de resistencia puede ampliar tu manera de ver el mundo.'
            },
            evasiva: {
                nombre: 'Escucha Evasiva',
                descripcion: 'Prefieres alejarte de conversaciones o situaciones que podrían generar incomodidad emocional. Cuando percibes que una conversación se dirige hacia un terreno difícil, tu tendencia suele ser cambiar de tema.',
                narrativa: 'No necesariamente lo haces por falta de interés. Muchas veces ocurre porque determinadas conversaciones despiertan emociones que preferirías no experimentar.',
                fortalezas: ['Te proteges de situaciones excesivamente tensas o desgastantes', 'Mantienes estabilidad cuando otros se arrastran por la urgencia', 'No te involucras en todos los conflictos'],
                puntosCiegos: ['Las conversaciones pendientes siguen existiendo y creciendo', 'Los problemas no resueltos continúan evolucionando', 'La evitación puede generar distancia emocional en las relaciones'],
                consejo: 'Empieza por pequeñas incomodidades. No necesitas exponerte de golpe a las conversaciones más difíciles. Permítete escuchar antes de retirarte, comprender antes de cerrar la puerta.'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 6. NO HABLAR EL MAL
    // ═══════════════════════════════════════════════════
    noHablar: {
        nombre: 'No hablar el mal',
        icono: 'fa-solid fa-comment-slash',
        descripcionBase: 'El poder y la responsabilidad de lo que dices. Las palabras revelan lo que piensas, lo que valoras y la forma en que te relacionas contigo mismo y con los demás.',
        niveles: {
            asertiva: {
                nombre: 'Comunicación Asertiva',
                descripcion: 'Expresas lo que piensas, sientes y necesitas de una manera clara, respetuosa y honesta.',
                narrativa: 'Buscas un punto de equilibrio donde tus necesidades tengan espacio sin invadir el de los demás. No necesitas recurrir a la agresividad ni al silencio.',
                fortalezas: ['Generas relaciones transparentes y de confianza', 'Reduces malentendidos al expresar expectativas claramente', 'Defiendes tus necesidades sin agredir a nadie', 'Fortaleces tu autoestima y la calidad de tus vínculos'],
                puntosCiegos: ['Riesgo de que algunas personas resistan tu nueva claridad', 'Requiere práctica y autocontrol constante en momentos de alta emoción', 'Puedes frustrarte si esperas que todos reaccionen bien'],
                consejo: 'Ser asertivo no significa agradar a todo el mundo, significa respetarte sin dejar de respetar a los demás. Habla desde tu experiencia ("yo siento", "yo necesito") en lugar de hacerlo desde la acusación.'
            },
            agresiva: {
                nombre: 'Comunicación Agresiva',
                descripcion: 'Valoras la sinceridad, la claridad y la rapidez al comunicarte. Sueles decir lo que piensas sin demasiados rodeos.',
                narrativa: 'Cuando algo te molesta, lo expresas. El problema aparece cuando la necesidad de expresar lo que piensas se vuelve más importante que la manera en que ese mensaje llega a la otra persona.',
                fortalezas: ['Las personas rara vez tienen que adivinar lo que piensas', 'Gran capacidad para defender tus intereses', 'Disposición para enfrentar conversaciones difíciles'],
                puntosCiegos: ['La comunicación puede sentirse demasiado dura o confrontativa', 'Las personas suelen reaccionar defendiéndose en lugar de escuchando', 'Riesgo de generar conflictos innecesarios por la forma de abordarlos'],
                consejo: 'Antes de expresar algo importante, haz una pausa breve y pregúntate: ¿cómo va a impactar esto en la otra persona? Puedes mantener exactamente el mismo mensaje sin necesidad de mantener el mismo tono.'
            },
            pasiva: {
                nombre: 'Comunicación Pasiva',
                descripcion: 'Piensas mucho antes de hablar y sueles considerar el impacto que tus palabras pueden tener en los demás. Prefieres guardar lo que piensas antes que generar conflictos.',
                narrativa: 'No significa que no tengas opiniones o límites. La diferencia es que te cuesta darles voz cuando existe el riesgo de generar desacuerdo o rechazo.',
                fortalezas: ['Capacidad para mantener la armonía', 'Sensibilidad especial para percibir cómo pueden afectar tus palabras', 'Sabes escuchar y permitir que otros se expresen'],
                puntosCiegos: ['Tus necesidades permanecen constantemente en segundo plano', 'Acumulación de frustración o resentimiento', 'Sensación de invisibilidad o de que otros toman decisiones por ti'],
                consejo: 'El crecimiento rara vez comienza con grandes confrontaciones. Empieza con pequeños actos de expresión cotidiana. Manifestar una preferencia no es un acto de egoísmo, es una forma de estar presente.'
            },
            pasivo_agresiva: {
                nombre: 'Comunicación Pasivo-Agresiva',
                descripcion: 'Te cuesta expresar de manera directa aquello que te molesta. Lo que ocurre es que la emoción termina saliendo por otros caminos, como el sarcasmo o los silencios prolongados.',
                narrativa: 'Muchas personas desarrollan este estilo porque temen la confrontación directa. Buscan formas indirectas de comunicar el malestar sin tener que afrontar una conversación abierta.',
                fortalezas: ['Sensibilidad emocional para percibir matices', 'Preocupación por el impacto de tus palabras', 'Intento de evitar el conflicto abierto'],
                puntosCiegos: ['Genera confusión y malentendidos en las relaciones', 'Obliga a los demás a interpretar señales o adivinar intenciones', 'El problema real permanece sin ser atendido'],
                consejo: 'Aprende a expresar tus emociones de forma directa, incluso cuando resulte incómodo. No necesitas ser agresivo, solo necesitas permitir que la otra persona tenga acceso a lo que realmente estás sintiendo.'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 7. AUTOCONCIENCIA Y GESTIÓN EMOCIONAL
    // ═══════════════════════════════════════════════════
    autoconciencia: {
        nombre: 'Autoconciencia y Gestión Emocional',
        icono: 'fa-solid fa-brain',
        descripcionBase: 'Entender lo que sientes para dirigir cómo actúas. Reconocer una emoción es el primer paso para no ser dominado por ella.',
        niveles: {
            alta: {
                nombre: 'Alta Autoconciencia',
                descripcion: 'Has desarrollado la capacidad de reconocer tus emociones mientras están ocurriendo. Puedes notar el enojo antes de que se convierta en reacción.',
                narrativa: 'Has desarrollado el arte de observarte sin juzgarte. Las emociones dejan de ser algo que simplemente te sucede y comienzan a convertirse en información.',
                fortalezas: ['Toma de decisiones más conscientes', 'Relación más saludable y empática con tu mundo interior', 'Autorregulación emocional efectiva', 'Capacidad de aprender y corregir patrones'],
                puntosCiegos: ['Riesgo de caer en el exceso de análisis', 'Permanecer demasiado tiempo dentro del mundo interior sin actuar', 'Tendencia a intelectualizar las emociones'],
                consejo: 'La autoconciencia no tiene como objetivo que pases la vida observándote. Su propósito es ayudarte a vivir de una manera más consciente. Sentir, comprender y actuar: ese es el ciclo que convierte la autoconciencia en una herramienta real.'
            },
            media: {
                nombre: 'Autoconciencia Media',
                descripcion: 'Has comenzado a desarrollar una mayor comprensión de tu mundo emocional, pero esa comprensión no siempre llega a tiempo.',
                narrativa: 'A veces te ves con claridad, a veces te pierdes en la reacción. Estás construyendo un puente entre la reacción y la respuesta consciente.',
                fortalezas: ['Capacidad de reflexión y aprendizaje', 'Descubrimiento de conexiones entre emociones y conductas', 'Apertura al autoexamen', 'Progresos visibles en tu comprensión'],
                puntosCiegos: ['Llegar tarde a la emoción (reconocerla después de actuar)', 'Respuestas impulsivas en momentos de alta intensidad', 'Tendencia a racionalizar en lugar de sentir'],
                consejo: 'No te juzgues por reaccionar antes de comprender. Observa, aprende y continúa practicando. El objetivo es reducir poco a poco la distancia entre sentir y comprender.'
            },
            baja: {
                nombre: 'Baja Autoconciencia',
                descripcion: 'Te resulta difícil reconocer con claridad lo que estás sintiendo en determinados momentos. Reaccionas antes de entender.',
                narrativa: 'Eres como un barco a la deriva, llevado por las corrientes emocionales sin saber por qué. No es que no sientas, es que no te observas sentir.',
                fortalezas: ['Capacidad de actuar con rapidez y agilidad', 'Te concentras en lo que ocurre fuera, facilitando la acción inmediata', 'Espontaneidad en la expresión'],
                puntosCiegos: ['Reaccionar de manera impulsiva sin comprender la causa', 'Repetir los mismos patrones o conflictos sin entender por qué', 'Explosiones emocionales aparentemente inesperadas'],
                consejo: 'La autoconciencia no es un rasgo fijo, es una habilidad que se entrena. El primer paso es detenerte unos segundos y preguntarte: "¿Qué estoy sintiendo realmente en este momento?".'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 8. INTEGRACIÓN Y DIRECCIÓN PERSONAL
    // ═══════════════════════════════════════════════════
    integracion: {
        nombre: 'Integración y Dirección Personal',
        icono: 'fa-solid fa-compass',
        descripcionBase: 'Convertir el autoconocimiento en decisiones conscientes. Integrar es dejar de vivir dividido entre lo que sabes de ti y lo que haces con tu vida.',
        niveles: {
            integrada: {
                nombre: 'Persona Integrada',
                descripcion: 'Tus decisiones comienzan a reflejar lo que has aprendido de ti. No actúas únicamente desde el impulso, sino desde una comprensión más profunda.',
                narrativa: 'Has logrado algo valioso: hay mayor coherencia entre lo que piensas, lo que sientes y lo que haces. Tus emociones no desaparecen, pero ya no gobiernan por completo tu conducta.',
                fortalezas: ['Coherencia interior y toma de decisiones consciente', 'Mayor estabilidad emocional y relaciones más sanas', 'Dirección personal clara y alineada con tus valores', 'Capacidad de ajustar el rumbo sin abandonar el propósito'],
                puntosCiegos: ['Riesgo de dejar de revisarte por sentir que ya "llegaste"', 'Presión interna por mantenerse siempre "coherente"', 'Dificultad para adaptarte a cambios que cuestionen tu dirección'],
                consejo: 'Crecer no significa dejar de cambiar. Conocerte tampoco significa terminar de descubrirte por completo. El autoconocimiento no es un lugar al que llegas, es una conversación que continúa.'
            },
            consciente_inconsistente: {
                nombre: 'Persona Consciente pero Inconsistente',
                descripcion: 'Sabes lo que debes hacer, reconoces muchos de tus patrones, pero no siempre logras sostenerlo en la práctica.',
                narrativa: 'Tienes momentos de lucidez en los que comprendes tus errores, pero esa claridad no siempre se convierte en acciones constantes cuando la emoción o la presión regresan.',
                fortalezas: ['Consciencia de la importancia de la coherencia', 'Buenas intenciones y capacidad real para mirarse por dentro', 'Progresos visibles en algunas áreas', 'Deseo genuino de crecer'],
                puntosCiegos: ['Dificultad para mantener la dirección a largo plazo', 'Tendencia a volver a patrones conocidos', 'Incoherencias entre lo que sabes y lo que haces'],
                consejo: 'La constancia rara vez se construye de golpe. El crecimiento no está en exigirte más disciplina desde el cansancio, sino en aprender a construir hábitos de una manera más amable y realista.'
            },
            reactiva: {
                nombre: 'Persona Reactiva',
                descripcion: 'Actúas según el momento, guiado principalmente por lo que sientes o por la presión emocional. Tus decisiones suelen nacer de la urgencia.',
                narrativa: 'Vives dividido entre impulsos, emociones y circunstancias. No significa que no tengas valores, sino que todavía no has aprendido a convertirlos en una dirección firme.',
                fortalezas: ['Capacidad de respuesta inmediata ante el entorno', 'Sensibilidad a las dinámicas externas', 'Potencial de transformación aún no explorado'],
                puntosCiegos: ['Inestabilidad y dificultad para sostener acuerdos', 'Conducta muy influenciada por el entorno', 'Falta de una brújula interior firme'],
                consejo: 'La verdadera libertad emocional no consiste en vivir sin emociones difíciles, consiste en desarrollar la capacidad de actuar con conciencia incluso cuando esas emociones están presentes.'
            }
        }
    }
};

window.DimensionsDetail = DimensionsDetail;