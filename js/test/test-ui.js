/**
 * Test UI Manager
 * Controla la renderización, navegación y estado del test
 */

const TestUI = {
  currentQuestionIndex: 0,
  answers: [],
  questions: [],

  init() {
    this.questions = window.TestQuestions;
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.renderQuestion();
  },

  renderQuestion() {
      const container = document.getElementById('test-container');
      if (!container) {
          console.error('Test container not found');
          return;
      }
      
      const q = this.questions[this.currentQuestionIndex];
      const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
  
      container.innerHTML = `
          <section class="main-content fade-in-up">
              <div class="progress-bar" style="margin-bottom: var(--space-8);">
                  <div class="progress-fill" style="width: ${progress}%"></div>
              </div>
              <p style="color: var(--color-gray-light); font-size: var(--text-sm); margin-bottom: var(--space-2);">
                  Pregunta ${this.currentQuestionIndex + 1} de ${this.questions.length}
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
  
      // ✅ SCROLL AL TOP DESPUÉS DE RENDERIZAR
      window.scrollTo({
          top: 0,
          behavior: 'smooth'  // Scroll suave en lugar de instantáneo
      });
  
      this.attachEvents();
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