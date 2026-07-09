/**
 * Test UI Manager
 * Controla la renderización, navegación y estado del test
 */

const TestUI = {
  currentQuestionIndex: 0,
  answers: [],
  questions: [],
  lastShownDimension: null,  // ← Cambiado: ahora recuerda la última dimensión mostrada

  init() {
    this.questions = window.TestQuestions;
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.lastShownDimension = null;  // ← Reiniciar al iniciar
    this.renderQuestion();
  },
  
  renderQuestion() {
    const container = document.getElementById('test-container');
    if (!container) {
      console.error('Test container not found');
      return;
    }
    
    const q = this.questions[this.currentQuestionIndex];
    const currentDimension = q.dimension;
    
    // ✅ SOLO mostrar intro si es una dimensión DIFERENTE a la última mostrada
    if (this.lastShownDimension !== currentDimension) {
      this.showDimensionIntro(currentDimension);
      return;
    }
    
    // Calcular progreso
    const dimensionQuestions = this.questions.filter(q => q.dimension === currentDimension);
    const dimensionIndex = dimensionQuestions.indexOf(q);
    const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;

    container.innerHTML = `
      <section class="main-content fade-in-up">
        <div class="progress-bar" style="margin-bottom: var(--space-8);">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <!-- Indicador de dimensión -->
        <p style="color: var(--color-gold-primary); font-size: var(--text-sm); margin-bottom: var(--space-2); font-weight: 600; letter-spacing: 0.05em;">
          Dimensión ${DimensionInfo[currentDimension].numero}: ${DimensionInfo[currentDimension].nombre}
        </p>
        <p style="color: var(--color-gray-light); font-size: var(--text-xs); margin-bottom: var(--space-6);">
          Pregunta ${dimensionIndex + 1} de ${dimensionQuestions.length}
        </p>
        
        <h2 style="color: var(--color-white); font-size: var(--text-xl); margin-bottom: var(--space-6); line-height: 1.4;">
          ${q.text}
        </h2>
        <div class="radio-group" id="options-container">
          ${q.options.map((opt, i) => `
            <label class="radio-option" data-value="${opt.value}">
              <input type="radio" name="q${q.id}" value="${opt.value}">
              <span class="radio-indicator"></span>
              <span class="radio-label">${opt.text}</span>
            </label>
          `).join('')}
        </div>
        <div style="margin-top: var(--space-10); display: flex; gap: var(--space-4);">
          ${this.currentQuestionIndex > 0 ? 
            `<button class="btn btn-ghost" id="prev-btn" style="flex: 1;">Anterior</button>` : 
            `<div style="flex: 1;"></div>`
          }
          <button class="btn btn-primary" id="next-btn" style="flex: 2;" disabled>Siguiente</button>
        </div>
      </section>
    `;

    // Scroll al top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.attachEvents();
  },
  
  /**
   * Muestra la pantalla de introducción de una dimensión
   */
  showDimensionIntro(dimensionKey) {
    const container = document.getElementById('test-container');
    if (!container) return;
    
    const dim = DimensionInfo[dimensionKey];
    if (!dim) {
      console.error('Dimensión no encontrada:', dimensionKey);
      return;
    }
    
    // ✅ MARCAR que mostramos esta dimensión
    this.lastShownDimension = dimensionKey;
    
    container.innerHTML = `
      <section class="main-content fade-in-up">
        <header class="text-center" style="margin-bottom: var(--space-10);">
          <!-- Icono de la dimensión -->
          <div style="width: 80px; height: 80px; margin: 0 auto var(--space-6); background: var(--gradient-gold); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(201,169,97,0.4);">
            <i class="${dim.icono}" style="font-size: 2.5rem; color: var(--color-black-deep);"></i>
          </div>
          
          <!-- Número y nombre de la dimensión -->
          <p style="color: var(--color-gray-light); font-size: var(--text-sm); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: var(--space-3);">
            Dimensión ${dim.numero} de 8
          </p>
          <h2 class="text-gradient-gold" style="font-size: clamp(1.8rem, 5vw, 2.5rem); margin-bottom: var(--space-6);">
            ${dim.nombre}
          </h2>
          
          <!-- Ornamento -->
          <div class="ornament-divider" style="margin: var(--space-6) auto; max-width: 200px;">
            <span class="ornament-symbol">✦</span>
          </div>
        </header>

        <!-- Descripción de la dimensión -->
        <article class="card" style="background: var(--color-black-soft); border: 1px solid var(--color-gold-dark); margin-bottom: var(--space-6);">
          <p style="color: var(--color-white-soft); line-height: 1.8; font-size: var(--text-base);">
            ${dim.descripcion}
          </p>
        </article>

        <!-- Frase clave -->
        <div class="card" style="background: var(--color-blue-mystic); border: 1px solid var(--color-gold-dark); margin-bottom: var(--space-10); text-align: center;">
          <i class="fa-solid fa-quote-left" style="color: var(--color-gold-primary); font-size: var(--text-xl); margin-bottom: var(--space-3); opacity: 0.6;"></i>
          <p style="color: var(--color-gold-light); font-family: var(--font-serif-secondary); font-size: var(--text-lg); font-style: italic; line-height: 1.6; margin: 0;">
            "${dim.frase}"
          </p>
        </div>

        <!-- Botón para continuar -->
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <button id="continue-to-questions" class="btn btn-primary btn-lg" style="width: 100%;">
            <i class="fa-solid fa-arrow-right" style="margin-right: var(--space-3);"></i>
            Comenzar preguntas
          </button>
          <a href="#test" class="btn btn-ghost" style="width: 100%; text-align: center;">
            Volver al inicio del test
          </a>
        </div>
      </section>
    `;

    // Scroll al top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Agregar evento al botón de continuar
    setTimeout(() => {
      const continueBtn = document.getElementById('continue-to-questions');
      if (continueBtn) {
        continueBtn.addEventListener('click', () => {
          // ✅ NO limpiar el flag, solo renderizar la pregunta
          // El flag ya está marcado con la dimensión actual
          this.renderQuestion();
        });
      }
    }, 100);
  },

  attachEvents() {
    const options = document.querySelectorAll('.radio-option');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        opt.querySelector('input').checked = true;
        nextBtn.disabled = false;
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.handleNext());
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.handlePrev());
    }
  },

  handleNext() {
    const selected = document.querySelector('.radio-option.selected input');
    if (!selected) return;

    const q = this.questions[this.currentQuestionIndex];
    this.answers.push({
      questionId: q.id,
      value: selected.value
    });

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.renderQuestion();
    } else {
      this.showResults();
    }
  },

  handlePrev() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.answers.pop(); // Remover última respuesta
      
      // ✅ IMPORTANTE: Al retroceder, necesitamos recalcular qué dimensión estamos viendo
      // Si retrocedemos a una pregunta de otra dimensión, debemos mostrar su intro de nuevo
      const currentQ = this.questions[this.currentQuestionIndex];
      const prevQ = this.currentQuestionIndex > 0 
        ? this.questions[this.currentQuestionIndex - 1] 
        : null;
      
      // Si la dimensión actual es diferente a la anterior, resetear el flag
      if (prevQ && prevQ.dimension !== currentQ.dimension) {
        this.lastShownDimension = null;  // ← Forzar a mostrar la intro de nuevo
      }
      
      this.renderQuestion();
    }
  },

  showResults() {
    const result = window.TestScoring.calculate(this.answers);
    window.Storage.set('testResult', result);
    
    // Navegar a resultados
    window.Router.navigate('test/results');
  }
};

window.TestUI = TestUI;