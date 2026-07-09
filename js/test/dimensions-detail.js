/**
 * Dimensiones Detail - Contenido profundo de las 8 dimensiones
 * Cada dimensión tiene 3 niveles según el puntaje obtenido
 * Estructura: bajo (0-33%), medio (34-66%), alto (67-100%)
 */

const DimensionsDetail = {
    
    // ═══════════════════════════════════════════════════
    // 1. TEMPERAMENTO
    // ═══════════════════════════════════════════════════
    temperamento: {
        nombre: 'Temperamento',
        icono: 'fa-solid fa-fire',
        descripcionBase: 'Tu temperamento es la base biológica de tu personalidad. Es la forma natural en que reaccionas ante el mundo, la energía que te mueve y el ritmo con el que vives.',
        
        niveles: {
            bajo: {
                rango: 'Reflexivo - Observador',
                descripcion: 'Tu temperamento tiende hacia la reflexión y la observación. Procesas la información con calma, antes de actuar. No te dejas llevar por impulsos, y eso te da una ventaja en situaciones que requieren análisis.',
                narrativa: 'Eres alguien que prefiere mirar dos veces antes de saltar. Tu energía no es explosiva, pero es constante. Donde otros corren, tú caminas con propósito.',
                fortalezas: [
                    'Capacidad de análisis profundo',
                    'Paciencia en situaciones complejas',
                    'Escucha activa y empatía',
                    'Decisiones meditadas y conscientes'
                ],
                puntosCiegos: [
                    'Puedes tardar demasiado en tomar decisiones',
                    'A veces confundes prudencia con indecisión',
                    'Riesgo de aislarte en tu propio mundo interior',
                    'Puede costarte iniciar acciones necesarias'
                ],
                consejo: 'Tu reflexión es un regalo, pero no dejes que se convierta en parálisis. A veces, una decisión imperfecta hoy vale más que una decisión perfecta mañana. Confía en tu intuición tanto como en tu análisis.',
                preguntaReflexion: '¿Cuántas veces he dejado pasar oportunidades por pensar demasiado? ¿Qué acción pequeña podría dar hoy que he estado postergando?'
            },
            
            medio: {
                rango: 'Equilibrado - Adaptable',
                descripcion: 'Tu temperamento muestra un equilibrio notable entre la reflexión y la acción. Sabes cuándo pensar y cuándo actuar, adaptándote a lo que cada situación requiere.',
                narrativa: 'Tienes la flexibilidad de ser intenso cuando se necesita y calmado cuando corresponde. Esta versatilidad es un don que pocos desarrollan.',
                fortalezas: [
                    'Adaptabilidad a diferentes contextos',
                    'Balance entre emoción y razón',
                    'Capacidad de conectar con diversos tipos de personas',
                    'Respuestas proporcionadas a cada situación'
                ],
                puntosCiegos: [
                    'Puedes perder claridad sobre tu estilo natural',
                    'Riesgo de complacer a otros en lugar de ser auténtico',
                    'A veces es difícil saber qué sientes realmente',
                    'Puedes evitar definir tu posición'
                ],
                consejo: 'Tu equilibrio es valioso, pero asegúrate de que venga de la consciencia, no de la evitación. Pregúntate: ¿soy equilibrado porque elijo serlo, o porque temo mostrar mi intensidad?',
                preguntaReflexion: '¿En qué áreas de mi vida soy genuinamente equilibrado, y en cuáles solo aparento estarlo? ¿Qué pasaría si me permito ser más intenso en algo que me apasiona?'
            },
            
            alto: {
                rango: 'Intenso - Dinámico',
                descripcion: 'Tu temperamento es intenso y dinámico. Tienes una energía natural que te impulsa a actuar, liderar y transformar tu entorno. La vida contigo se siente con más fuerza.',
                narrativa: 'Eres fuego en movimiento. Donde llegas, generas impacto. Tu intensidad es tu mayor fortaleza, pero también tu mayor desafío: aprender a canalizarla sin quemarte ni quemar a otros.',
                fortalezas: [
                    'Capacidad de liderazgo natural',
                    'Energía para impulsar proyectos',
                    'Determinación ante los obstáculos',
                    'Presencia que inspira a otros'
                ],
                puntosCiegos: [
                    'Impaciencia con ritmos diferentes al tuyo',
                    'Tendencia a imponer tu forma de hacer las cosas',
                    'Riesgo de agotamiento por exceso de actividad',
                    'Dificultad para detenerse y reflexionar'
                ],
                consejo: 'Tu intensidad es un motor poderoso, pero todo motor necesita frenos. Aprende a descansar sin sentir culpa, a escuchar sin interrumpir, y a soltar el control cuando sea necesario. La verdadera fuerza está también en la quietud.',
                preguntaReflexion: '¿Mi intensidad está al servicio de algo significativo, o solo es movimiento por movimiento? ¿Qué pasaría si me permito descansar sin sentir que pierdo el rumbo?'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 2. TOLERANCIA A LA FRUSTRACIÓN
    // ═══════════════════════════════════════════════════
    frustracion: {
        nombre: 'Tolerancia a la Frustración',
        icono: 'fa-solid fa-shield-halved',
        descripcionBase: 'La forma en que manejas la frustración revela tu fortaleza emocional. No se trata de evitar el dolor, sino de cómo lo procesas, lo aceptas y sigues adelante.',
        
        niveles: {
            bajo: {
                rango: 'Sensible - Reactivo',
                descripcion: 'La frustración te afecta profundamente. Cuando las cosas no salen como esperas, sientes una intensa incomodidad que puede llevarte a reacciones impulsivas o al abandono.',
                narrativa: 'El mundo no siempre responde a tus expectativas, y eso duele. Tu sensibilidad es real, pero también es una invitación a desarrollar herramientas internas para navegar la adversidad.',
                fortalezas: [
                    'Sensibilidad que te conecta con tus emociones',
                    'Capacidad de percibir rápidamente cuando algo no funciona',
                    'Motivación intensa para cambiar lo que no te gusta',
                    'Autenticidad en la expresión de lo que sientes'
                ],
                puntosCiegos: [
                    'Tendencia a abandonar cuando las cosas se complican',
                    'Reacciones impulsivas ante la adversidad',
                    'Dificultad para tolerar la incertidumbre',
                    'Riesgo de victimizarte ante las circunstancias'
                ],
                consejo: 'La frustración no es tu enemiga, es tu maestra. Cada vez que algo no sale como esperas, pregúntate: ¿qué puedo aprender de esto? La tolerancia se construye poco a poco, aceptando que la vida no siempre será como queremos.',
                preguntaReflexion: '¿Qué situación frustrante he abandonado prematuramente? ¿Qué hubiera pasado si hubiese tolerado un poco más? ¿Qué me enseña esta incomodidad?'
            },
            
            medio: {
                rango: 'Moderado - En desarrollo',
                descripcion: 'Manejas la frustración de forma moderada. Hay situaciones que toleras bien, pero otras te desbordan. Estás en un proceso de desarrollo emocional que es completamente normal.',
                narrativa: 'No eres ni demasiado rígido ni demasiado flexible ante la adversidad. Estás en el camino de encontrar tu propio equilibrio, y eso requiere paciencia contigo mismo.',
                fortalezas: [
                    'Capacidad de tolerar frustraciones cotidianas',
                    'Consciencia de tus límites emocionales',
                    'Apertura a aprender de las dificultades',
                    'Balance entre expresión y contención emocional'
                ],
                puntosCiegos: [
                    'Ciertas frustraciones específicas te desbordan',
                    'Puedes reprimir emociones hasta que explotan',
                    'Dificultad para pedir ayuda cuando la necesitas',
                    'Tendencia a minimizar lo que te afecta'
                ],
                consejo: 'Reconoce que cada persona tiene sus puntos débiles. No se trata de ser invulnerable, sino de conocer tus detonantes y desarrollar estrategias para manejarlos. La tolerancia es un músculo que se entrena.',
                preguntaReflexion: '¿Qué tipo de frustraciones me afectan más? ¿Hay patrones en lo que me desborda? ¿Qué herramientas puedo desarrollar para esos momentos específicos?'
            },
            
            alto: {
                rango: 'Resiliente - Maduro',
                descripcion: 'Tienes una notable capacidad para tolerar la frustración. Cuando algo no sale como esperas, mantienes la calma, buscas alternativas y sigues adelante sin perder tu centro.',
                narrativa: 'Has desarrollado una fortaleza interior que te permite navegar la adversidad sin perder tu esencia. Esta resiliencia no es innata, es el resultado de haber aprendido a enfrentar el dolor con sabiduría.',
                fortalezas: [
                    'Capacidad de mantener la calma bajo presión',
                    'Pensamiento claro en situaciones adversas',
                    'Perseverancia ante los obstáculos',
                    'Capacidad de ver oportunidades en las dificultades'
                ],
                puntosCiegos: [
                    'Riesgo de tolerar demasiado (situaciones que deberías cambiar)',
                    'Puedes parecer insensible ante el dolor ajeno',
                    'Tendencia a reprimir emociones "negativas"',
                    'Dificultad para pedir ayuda cuando realmente la necesitas'
                ],
                consejo: 'Tu resiliencia es admirable, pero recuerda que tolerar no significa aguantar todo. Hay situaciones que no merecen tu tolerancia, sino tu acción. Pregúntate: ¿estoy siendo resiliente o estoy evitando un cambio necesario?',
                preguntaReflexion: '¿Hay algo que estoy tolerando demasiado tiempo? ¿Mi resiliencia me está ayudando a crecer o me está manteniendo en una situación que debería cambiar?'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 3. GESTIÓN DE CONFLICTOS
    // ═══════════════════════════════════════════════════
    conflictos: {
        nombre: 'Gestión de Conflictos',
        icono: 'fa-solid fa-handshake',
        descripcionBase: 'Los conflictos son inevitables en cualquier relación. Lo que define tu madurez emocional no es evitarlos, sino cómo los enfrentas.',
        
        niveles: {
            bajo: {
                rango: 'Evitativo - Sumiso',
                descripcion: 'Tiendes a evitar los conflictos o a ceder rápidamente para mantener la paz. Prefieres callar antes que confrontar, aunque eso signifique sacrificar tus necesidades.',
                narrativa: 'Detrás de tu evitación hay miedo: miedo al rechazo, a la ruptura, a la confrontación. Pero la paz que compras con tu silencio tiene un precio muy alto: tu autenticidad.',
                fortalezas: [
                    'Capacidad de mantener relaciones estables',
                    'Empatía con las necesidades del otro',
                    'Habilidad para crear ambientes armoniosos',
                    'Disposición al diálogo cuando te sientes seguro'
                ],
                puntosCiegos: [
                    'Acumulación de resentimiento no expresado',
                    'Pérdida de identidad por complacer a otros',
                    'Relaciones desequilibradas donde siempre cedes',
                    'Explosiones emocionales cuando ya no puedes más'
                ],
                consejo: 'Evitar el conflicto no lo elimina, solo lo posterga. Lo que no se dice, se pudre. Aprende que el conflicto bien gestionado es una oportunidad de crecimiento, no una amenaza. Tu voz importa tanto como la del otro.',
                preguntaReflexion: '¿Qué necesito decir y he estado callando? ¿A quién estoy complaciendo a costa de mí mismo? ¿Qué pasaría si expresara mi verdad con respeto?'
            },
            
            medio: {
                rango: 'Negociador - Flexible',
                descripcion: 'Manejas los conflictos con flexibilidad. Buscas soluciones intermedias y estás dispuesto a negociar, aunque a veces te cuesta mantenerte firme en tus posiciones.',
                narrativa: 'Tienes la capacidad de ver ambos lados de un conflicto, lo cual es valioso. El desafío está en no perder tu centro mientras buscas el equilibrio.',
                fortalezas: [
                    'Capacidad de ver múltiples perspectivas',
                    'Habilidad para encontrar puntos en común',
                    'Disposición al diálogo y la negociación',
                    'Flexibilidad sin perder completamente tu posición'
                ],
                puntosCiegos: [
                    'Puedes ceder demasiado por mantener la relación',
                    'Dificultad para establecer límites firmes',
                    'Tendencia a racionalizar demasiado las emociones',
                    'Confusión entre negociar y renunciar a lo esencial'
                ],
                consejo: 'Negociar es saludable, pero no a costa de tus valores fundamentales. Aprende a distinguir entre lo negociable y lo innegociable. Hay líneas que no deberías cruzar, ni siquiera por amor.',
                preguntaReflexion: '¿En qué conflictos he cedido algo esencial de mí mismo? ¿Cuáles son mis límites innegociables? ¿Los estoy respetando?'
            },
            
            alto: {
                rango: 'Asertivo - Transformador',
                descripcion: 'Enfrentas los conflictos con asertividad y madurez. Expresas tu posición con claridad y respeto, buscas soluciones genuinas y no temes a la confrontación cuando es necesaria.',
                narrativa: 'Has aprendido que el conflicto no es el fin de una relación, sino una oportunidad para profundizarla. Tu capacidad de enfrentar lo difícil con integridad es un signo de madurez emocional.',
                fortalezas: [
                    'Comunicación clara y respetuosa',
                    'Capacidad de establecer límites firmes',
                    'Habilidad para transformar conflictos en crecimiento',
                    'Valentía para decir lo necesario aunque sea incómodo'
                ],
                puntosCiegos: [
                    'Riesgo de ser demasiado confrontativo',
                    'Puedes cansarte de relaciones que evitan el conflicto',
                    'Tendencia a intelectualizar las emociones',
                    'Dificultad para aceptar que otros no están en tu mismo nivel'
                ],
                consejo: 'Tu asertividad es valiosa, pero recuerda que no todos están en el mismo lugar que tú. A veces, la verdadera sabiduría está en elegir tus batallas y tener paciencia con los procesos de otros.',
                preguntaReflexion: '¿Estoy siendo asertivo o agresivo? ¿Respeto los ritmos de los demás o exijo que estén a mi nivel? ¿Qué conflictos estoy evitando que debería enfrentar?'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 4. LO QUE ELIGES NO VER
    // ═══════════════════════════════════════════════════
    noVer: {
        nombre: 'Lo que eliges no ver',
        icono: 'fa-solid fa-eye-slash',
        descripcionBase: 'Todos tenemos verdades que preferimos ignorar. Esta dimensión explora tu capacidad para enfrentar realidades incómodas sobre ti mismo, tus relaciones o tu vida.',
        
        niveles: {
            bajo: {
                rango: 'Evitativo - En negación',
                descripcion: 'Tiendes a evitar ver verdades incómodas. Prefieres mantener la ilusión a enfrentar realidades que te incomodan, aunque eso signifique vivir en la superficie.',
                narrativa: 'Hay verdades que has decidido no mirar. No porque no las intuyas, sino porque dolería demasiado aceptarlas. Pero lo que no ves, te controla desde las sombras.',
                fortalezas: [
                    'Capacidad de mantener esperanza en situaciones difíciles',
                    'Habilidad para enfocarte en lo positivo',
                    'Protección emocional ante verdades muy dolorosas',
                    'Optimismo que te impulsa hacia adelante'
                ],
                puntosCiegos: [
                    'Vivir en la negación de problemas reales',
                    'Repetir patrones destructivos sin reconocerlos',
                    'Relaciones tóxicas que justificas constantemente',
                    'Estancamiento por no enfrentar lo que necesita cambio'
                ],
                consejo: 'La negación es un mecanismo de defensa necesario en ciertos momentos, pero cuando se vuelve crónico, te impide crecer. Pregúntate: ¿qué verdad estoy evitando ver? ¿Qué me cuesta aceptar de mi vida actual?',
                preguntaReflexion: '¿Qué verdad sobre mí mismo estoy evitando? ¿Qué relación estoy justificando cuando debería cuestionarla? ¿Qué pasaría si mirara de frente lo que he estado ignorando?'
            },
            
            medio: {
                rango: 'Selectivo - Conscientemente parcial',
                descripcion: 'Ves algunas verdades pero evitas otras. Tu capacidad de autoexamen es parcial: reconoces ciertos aspectos de ti mismo, pero hay áreas que prefieres no explorar.',
                narrativa: 'Tienes la capacidad de mirar algunas verdades, pero hay zonas ciegas que prefieres no iluminar. Este equilibrio entre consciencia y evitación es muy humano.',
                fortalezas: [
                    'Capacidad de autoexamen en áreas específicas',
                    'Balance entre honestidad y autoprotección',
                    'Apertura a crecer en ciertos aspectos',
                    'Consciencia de que hay cosas que no ves'
                ],
                puntosCiegos: [
                    'Áreas específicas que te niegas a explorar',
                    'Justificaciones selectivas según conveniencia',
                    'Dificultad para aceptar críticas en ciertos temas',
                    'Patrones repetitivos en áreas no examinadas'
                ],
                consejo: 'El autoconocimiento es un proceso continuo. Lo que hoy no ves, mañana puedes empezar a mirarlo. La clave está en mantenerte abierto, incluso cuando la verdad incomoda.',
                preguntaReflexion: '¿En qué áreas de mi vida soy honesto conmigo mismo y en cuáles me engaño? ¿Qué verdades me cuesta aceptar? ¿Quién podría ayudarme a ver lo que no veo?'
            },
            
            alto: {
                rango: 'Lúcido - Valiente',
                descripcion: 'Tienes una notable capacidad para enfrentar verdades incómodas. No huyes de la realidad, aunque duela. Esta lucidez es un signo de madurez y valentía interior.',
                narrativa: 'Te atreves a mirar lo que otros evitan. Esta valentía no es fácil, pero te da una claridad que pocos tienen. Ves tu vida con ojos honestos, y eso es el primer paso para transformarla.',
                fortalezas: [
                    'Honestidad radical contigo mismo',
                    'Capacidad de enfrentar verdades dolorosas',
                    'Valentía para cuestionar tus propias creencias',
                    'Apertura al cambio basada en la lucidez'
                ],
                puntosCiegos: [
                    'Riesgo de ser demasiado duro contigo mismo',
                    'Puedes caer en el análisis paralizante',
                    'Dificultad para aceptar que hay límites en el autoexamen',
                    'Tendencia a intellectualizar en lugar de sentir'
                ],
                consejo: 'Tu lucidez es un don, pero no olvides que también necesitas compasión contigo mismo. Ver la verdad es el primer paso, pero también necesitas aceptarte mientras la transformas.',
                preguntaReflexion: '¿Mi honestidad me está ayudando a crecer o me está castigando? ¿Hay alguna verdad que, aunque la veo, me niego a transformar? ¿Cómo puedo ser más compasivo conmigo mismo en este proceso?'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 5. LO QUE ELIGES NO OÍR
    // ═══════════════════════════════════════════════════
    noOir: {
        nombre: 'Lo que eliges no oír',
        icono: 'fa-solid fa-ear-listen',
        descripcionBase: 'Escuchar de verdad requiere valentía. A veces filtramos las críticas, ignoramos las señales o nos ponemos a la defensiva. Esta dimensión revela cómo procesas lo que otros te dicen.',
        
        niveles: {
            bajo: {
                rango: 'Defensivo - Cerrado',
                descripcion: 'Tiendes a cerrarte ante lo que otros te dicen, especialmente cuando te incomoda. Las críticas te duelen tanto que prefieres no escucharlas, aunque tengan parte de verdad.',
                narrativa: 'Has construido muros para proteger tu ego. Pero esos mismos muros te aíslan de la retroalimentación que necesitas para crecer. Lo que no escuchas, no puedes transformarlo.',
                fortalezas: [
                    'Protección de tu autoestima ante críticas destructivas',
                    'Capacidad de mantener tus convicciones',
                    'Filtro contra opiniones no solicitadas',
                    'Lealtad a tu forma de ver el mundo'
                ],
                puntosCiegos: [
                    'Pérdida de retroalimentación valiosa',
                    'Relaciones que se deterioran por falta de escucha',
                    'Estancamiento en patrones que otros ven claramente',
                    'Aislamiento progresivo de personas que podrían ayudarte'
                ],
                consejo: 'Escuchar no significa aceptar todo lo que te dicen. Significa permitirte considerar que quizás el otro tiene algo que enseñarte. La próxima vez que sientas el impulso de defenderte, prueba con: "Cuéntame más".',
                preguntaReflexion: '¿Qué críticas he descartado sin realmente escucharlas? ¿Quién en mi vida me ha dicho algo importante que no quise oír? ¿Qué pasaría si me permitiera escuchar sin defenderme?'
            },
            
            medio: {
                rango: 'Selectivo - Condicionado',
                descripcion: 'Escuchas algunas cosas pero filtras otras. Tu capacidad de escucha depende de quién habla, cómo lo dice y qué tan cómodo te hace sentir. Es un patrón muy humano.',
                narrativa: 'Tu escucha es selectiva: abierta ante lo que confirma tus ideas, cerrada ante lo que las cuestiona. Esta selectividad es natural, pero limita tu crecimiento.',
                fortalezas: [
                    'Capacidad de escuchar cuando te sientes seguro',
                    'Discernimiento sobre qué opiniones considerar',
                    'Apertura a la retroalimentación en áreas no sensibles',
                    'Balance entre escucha y protección personal'
                ],
                puntosCiegos: [
                    'Escucha condicionada al emisor o al mensaje',
                    'Defensividad en temas específicos',
                    'Tendencia a escuchar solo lo que quieres oír',
                    'Dificultad para recibir críticas de ciertas personas'
                ],
                consejo: 'Presta atención a qué tipo de mensajes bloqueas. Ahí está tu mayor oportunidad de crecimiento. Las verdades más importantes suelen venir envueltas en palabras incómodas.',
                preguntaReflexion: '¿A quiénes escucho y a quiénes no? ¿Qué mensajes descarto sistemáticamente? ¿Qué pasaría si escuchara con la misma atención a todos, independientemente de quién hable?'
            },
            
            alto: {
                rango: 'Receptivo - Sabio',
                descripcion: 'Tienes una notable capacidad para escuchar, incluso cuando lo que oyes te incomoda. No te cierras ante las críticas, las consideras con apertura y extraes lo valioso de ellas.',
                narrativa: 'Has desarrollado la sabiduría de entender que cada voz tiene algo que enseñarte. Esta receptividad no te hace débil, te hace fuerte, porque te permite crecer desde múltiples perspectivas.',
                fortalezas: [
                    'Escucha activa y genuina',
                    'Capacidad de recibir críticas sin defensividad',
                    'Apertura a aprender de cualquier persona',
                    'Habilidad para extraer lo valioso de cada mensaje'
                ],
                puntosCiegos: [
                    'Riesgo de absorber demasiado y perder tu centro',
                    'Puedes confundir apertura con falta de criterio',
                    'Dificultad para establecer límites en la escucha',
                    'Tendencia a validar opiniones contradictorias'
                ],
                consejo: 'Tu receptividad es admirable, pero recuerda que escuchar no significa aceptar todo. Mantén tu criterio mientras mantienes tu apertura. La verdadera sabiduría está en el equilibrio.',
                preguntaReflexion: '¿Qué estoy escuchando que me está transformando? ¿Hay alguna voz importante que he estado ignorando? ¿Cómo puedo seguir creciendo en mi capacidad de escucha?'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 6. LO QUE ELIGES NO DECIR
    // ═══════════════════════════════════════════════════
    noHablar: {
        nombre: 'Lo que eliges no decir',
        icono: 'fa-solid fa-comment-slash',
        descripcionBase: 'La comunicación es el puente entre las personas. Pero a veces callamos lo que duele, hablamos desde el enojo o decimos una cosa mientras sentimos otra.',
        
        niveles: {
            bajo: {
                rango: 'Inhibido - No expresivo',
                descripcion: 'Tiendes a callar lo que sientes y piensas. El miedo al conflicto, al rechazo o a la vulnerabilidad te lleva a guardar para ti lo más importante.',
                narrativa: 'Dentro de ti hay un mundo rico que pocos conocen. Tus emociones, ideas y necesidades existen, pero permanecen atrapadas en tu silencio. Y lo que no se expresa, se enquista.',
                fortalezas: [
                    'Capacidad de reflexión antes de hablar',
                    'Prudencia en lo que compartes',
                    'Protección de tu intimidad',
                    'Evita conflictos por no expresar lo que molesta'
                ],
                puntosCiegos: [
                    'Relaciones superficiales por falta de expresión',
                    'Acumulación de emociones no procesadas',
                    'Sentimiento de soledad aunque estés acompañado',
                    'Los demás no conocen tus verdaderas necesidades'
                ],
                consejo: 'Tu silencio te protege, pero también te aísla. La vulnerabilidad no es debilidad, es valentía. Empieza por expresar pequeñas verdades a personas de confianza. Verás que el mundo no se derrumba cuando te muestras auténtico.',
                preguntaReflexion: '¿Qué necesito decir y he estado callando? ¿A quién le debo una conversación pendiente? ¿Qué pasaría si me permitiera ser más visible en mi vida?'
            },
            
            medio: {
                rango: 'Selectivo - Contextual',
                descripcion: 'Expresas lo que sientes en ciertos contextos, pero no en otros. Tu comunicación depende de con quién estés, del entorno y de tu nivel de confianza.',
                narrativa: 'Eres capaz de abrirte, pero solo en condiciones específicas. Esta selectividad es comprensible, pero te limita en relaciones que podrían ser más profundas.',
                fortalezas: [
                    'Capacidad de expresarte en entornos seguros',
                    'Discernimiento sobre qué compartir y con quién',
                    'Adaptabilidad comunicativa',
                    'Balance entre expresión y reserva'
                ],
                puntosCiegos: [
                    'Inconsistencia en la comunicación según el contexto',
                    'Relaciones que no profundizan por falta de expresión',
                    'Dificultad para ser vulnerable en momentos clave',
                    'Confusión en otros sobre quién eres realmente'
                ],
                consejo: 'La comunicación auténtica requiere coherencia entre lo que sientes y lo que expresas, independientemente del contexto. Pregúntate: ¿soy la misma persona en todos los ámbitos de mi vida?',
                preguntaReflexion: '¿En qué relaciones soy auténtico y en cuáles me escondo? ¿Qué me impide expresarme plenamente? ¿Qué pasaría si fuera más consistente en mi comunicación?'
            },
            
            alto: {
                rango: 'Expresivo - Auténtico',
                descripcion: 'Te expresas con claridad y autenticidad. Dices lo que sientes y piensas, aunque a veces sea incómodo. Tu comunicación es un reflejo fiel de tu mundo interior.',
                narrativa: 'Has desarrollado la valentía de mostrar tu verdad al mundo. Tu autenticidad es un regalo para quienes te rodean, porque saben con quién están y qué pueden esperar de ti.',
                fortalezas: [
                    'Comunicación clara y directa',
                    'Autenticidad en las relaciones',
                    'Capacidad de expresar emociones complejas',
                    'Valentía para decir lo necesario aunque incomode'
                ],
                puntosCiegos: [
                    'Riesgo de ser demasiado directo sin considerar al otro',
                    'Puedes herir sin intención por tu franqueza',
                    'Dificultad para guardar ciertos secretos o intimidades',
                    'Tendencia a sobrexponerte emocionalmente'
                ],
                consejo: 'Tu autenticidad es admirable, pero recuerda que la forma en que dices las cosas importa tanto como lo que dices. La verdad sin amor puede ser cruel. Busca el equilibrio entre honestidad y empatía.',
                preguntaReflexion: '¿Mi autenticidad está construyendo o destruyendo relaciones? ¿Hay algo que digo sin considerar el impacto en el otro? ¿Cómo puedo ser honesto y compasivo al mismo tiempo?'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 7. AUTOCONCIENCIA EMOCIONAL
    // ═══════════════════════════════════════════════════
    autoconciencia: {
        nombre: 'Autoconciencia Emocional',
        icono: 'fa-solid fa-brain',
        descripcionBase: 'La autoconciencia es la capacidad de observarte a ti mismo: reconocer tus emociones, entender qué las activa y elegir cómo responder.',
        
        niveles: {
            bajo: {
                rango: 'Inconsciente - Reactivo',
                descripcion: 'Vives mayormente en piloto automático. Tus emociones te dominan sin que te des cuenta, y reaccionas antes de comprender qué te está pasando.',
                narrativa: 'Eres como un barco a la deriva, llevado por las corrientes emocionales sin saber por qué. No es que no sientas, es que no te observas sentir. Y lo que no se observa, se repite.',
                fortalezas: [
                    'Espontaneidad en la expresión emocional',
                    'Capacidad de vivir el momento presente',
                    'Menos análisis paralizante',
                    'Apertura a experiencias sin prejuicios'
                ],
                puntosCiegos: [
                    'Patrones repetitivos sin comprender',
                    'Reacciones desproporcionadas a estímulos',
                    'Dificultad para entender por qué sientes lo que sientes',
                    'Relaciones afectadas por emociones no procesadas'
                ],
                consejo: 'La autoconciencia no es un don, es una habilidad que se entrena. Empieza por pausar antes de reaccionar. Pregúntate: ¿qué estoy sintiendo ahora? ¿Por qué? Este simple acto de observación puede transformar tu vida.',
                preguntaReflexion: '¿Cuántas veces reacciono sin entender por qué? ¿Qué emociones me dominan sin que me dé cuenta? ¿Qué pasaría si me detuviera a observarme antes de actuar?'
            },
            
            medio: {
                rango: 'En desarrollo - Parcialmente consciente',
                descripcion: 'Tienes momentos de lucidez emocional, pero también momentos en los que te pierdes en la reacción. Estás en un proceso de desarrollo de tu autoconciencia.',
                narrativa: 'A veces te ves con claridad, a veces te pierdes en la niebla. Este vaivén es parte del proceso. Lo importante es que estás en el camino, y cada momento de consciencia te acerca más a ti mismo.',
                fortalezas: [
                    'Capacidad de reconocer emociones en momentos de calma',
                    'Apertura al autoexamen',
                    'Consciencia de que hay aspectos por desarrollar',
                    'Progresos visibles en tu comprensión emocional'
                ],
                puntosCiegos: [
                    'Inconsistencia en la autoconciencia',
                    'Dificultad para observarte en momentos de alta emoción',
                    'Tendencia a racionalizar en lugar de sentir',
                    'Brechas entre lo que sabes y lo que haces'
                ],
                consejo: 'La autoconciencia se fortalece con la práctica. Lleva un diario, medita, busca retroalimentación. Cada momento de observación es un paso más hacia tu centro.',
                preguntaReflexion: '¿En qué momentos soy más consciente de mí mismo? ¿En cuáles me pierdo? ¿Qué prácticas puedo incorporar para fortalecer mi autoconciencia?'
            },
            
            alto: {
                rango: 'Consciente - Observador',
                descripcion: 'Tienes una notable capacidad para observarte a ti mismo. Reconoces tus emociones, entiendes sus causas y eliges conscientemente cómo responder.',
                narrativa: 'Has desarrollado el arte de observarte sin juzgarte. Esta capacidad te da una libertad interior que pocos tienen: no eres esclavo de tus emociones, eres su testigo consciente.',
                fortalezas: [
                    'Alta consciencia emocional en tiempo real',
                    'Capacidad de elegir respuestas en lugar de reaccionar',
                    'Comprensión profunda de tus patrones',
                    'Habilidad para regular tus estados emocionales'
                ],
                puntosCiegos: [
                    'Riesgo de sobre-analizarte',
                    'Puedes desconectarte de la espontaneidad',
                    'Tendencia a intelectualizar las emociones',
                    'Dificultad para simplemente sentir sin observar'
                ],
                consejo: 'Tu autoconciencia es un don, pero no olvides que también necesitas permitirte sentir sin analizar. A veces, la vida se vive desde el corazón, no desde la observación.',
                preguntaReflexion: '¿Mi autoconciencia me está acercando a mí mismo o me está alejando de la experiencia directa? ¿Cuándo fue la última vez que simplemente sentí sin observarme?'
            }
        }
    },
    
    // ═══════════════════════════════════════════════════
    // 8. INTEGRACIÓN Y DIRECCIÓN PERSONAL
    // ═══════════════════════════════════════════════════
    integracion: {
        nombre: 'Integración y Dirección Personal',
        icono: 'fa-solid fa-compass',
        descripcionBase: 'Esta dimensión final evalúa qué tan alineadas están tus acciones con tus valores. ¿Vives reaccionando al entorno o eliges conscientemente quién quieres ser?',
        
        niveles: {
            bajo: {
                rango: 'Desintegrado - Reactivo',
                descripcion: 'Tus acciones no están alineadas con tus valores. Vives reaccionando a las circunstancias, sin una dirección clara ni coherencia entre lo que piensas, sientes y haces.',
                narrativa: 'Hay una desconexión entre quien dices ser y quien realmente eres en la práctica. No es que no tengas valores, es que no los estás viviendo. Y esa incoherencia genera un malestar profundo.',
                fortalezas: [
                    'Potencial de transformación aún no explorado',
                    'Consciencia (aunque dolorosa) de la falta de alineación',
                    'Apertura a buscar una dirección más clara',
                    'Capacidad de reinventarte si lo decides'
                ],
                puntosCiegos: [
                    'Incoherencia entre valores y acciones',
                    'Sensación de vivir sin dirección',
                    'Dependencia de las circunstancias externas',
                    'Malestar crónico por no ser quien podrías ser'
                ],
                consejo: 'La integración comienza con una pregunta simple: ¿quién quiero ser? No quién quiero parecer, no quién esperan que sea, sino quién quiero ser en lo más profundo. Una vez que lo tengas claro, cada decisión se vuelve más simple.',
                preguntaReflexion: '¿Mis acciones reflejan mis valores? ¿Estoy viviendo la vida que quiero o la que me tocó vivir? ¿Qué pequeño paso puedo dar hoy hacia quien quiero ser?'
            },
            
            medio: {
                rango: 'En integración - Buscando dirección',
                descripcion: 'Estás en un proceso de alinear tus acciones con tus valores. Hay áreas donde eres coherente y otras donde aún te falta. Es un camino en construcción.',
                narrativa: 'No estás completamente perdido, pero tampoco has llegado. Estás en el camino, buscando tu dirección. Y ese búsqueda, aunque a veces dolorosa, es en sí misma un acto de valentía.',
                fortalezas: [
                    'Consciencia de la importancia de la coherencia',
                    'Progresos visibles en algunas áreas de tu vida',
                    'Apertura a seguir creciendo',
                    'Capacidad de reconocer tus incoherencias'
                ],
                puntosCiegos: [
                    'Incoherencias en áreas específicas',
                    'Dificultad para mantener la dirección a largo plazo',
                    'Tendencia a volver a patrones antiguos',
                    'Confusión sobre qué valores priorizar'
                ],
                consejo: 'La integración no es un destino, es un proceso continuo. Habrá momentos de avance y momentos de retroceso. Lo importante es no rendirte en el camino hacia ti mismo.',
                preguntaReflexion: '¿En qué áreas de mi vida soy coherente y en cuáles no? ¿Qué valores estoy priorizando y cuáles estoy descuidando? ¿Qué dirección quiero darle a mi vida?'
            },
            
            alto: {
                rango: 'Integrado - Con dirección',
                descripcion: 'Tus acciones están alineadas con tus valores. Vives con coherencia y dirección, eligiendo conscientemente quién quieres ser en cada momento.',
                narrativa: 'Has logrado algo que pocos consiguen: vivir desde tu verdad. Tus acciones reflejan tus valores, y eso te da una paz interior que se nota desde fuera.',
                fortalezas: [
                    'Coherencia entre valores y acciones',
                    'Dirección clara en la vida',
                    'Capacidad de tomar decisiones alineadas',
                    'Paz interior por vivir tu verdad'
                ],
                puntosCiegos: [
                    'Riesgo de rigidez en tus valores',
                    'Puedes juzgar a quienes no están en tu mismo nivel',
                    'Dificultad para adaptarte a cambios que cuestionen tu dirección',
                    'Tendencia a creer que ya has llegado'
                ],
                consejo: 'Tu integración es admirable, pero recuerda que la vida siempre trae nuevos desafíos. Mantente abierto a seguir cuestionándote, a seguir creciendo, a seguir evolucionando. La integración no es un punto final, es un camino sin fin.',
                preguntaReflexion: '¿Hay algún valor que estoy dando por sentado sin cuestionarlo? ¿Estoy abierto a seguir evolucionando o me he estancado en mi dirección actual? ¿Cómo puedo seguir creciendo?'
            }
        }
    }
};

window.DimensionsDetail = DimensionsDetail;