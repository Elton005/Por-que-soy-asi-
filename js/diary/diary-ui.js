/**
 * Diary UI Manager
 * Controla la renderización y guardado de entradas del diario
 */

const DiaryUI = {
  init() {
    this.renderDaySelector();
    this.attachEvents();
  },

  renderDaySelector() {
    const container = document.getElementById('days-grid');
    if (!container) return;
    
    const savedEntries = window.Storage.get('diaryEntries') || {};
    
    container.innerHTML = DiaryPrompts.map(prompt => {
      const isCompleted = savedEntries[prompt.day] && savedEntries[prompt.day].answers && 
                          savedEntries[prompt.day].answers.length === prompt.questions.length;
      
      return `
        <button class="card day-card ${isCompleted ? 'completed' : ''}" data-day="${prompt.day}">
          <span class="day-number">${String(prompt.day).padStart(2, '0')}</span>
          <p class="day-title">${prompt.title}</p>
          ${isCompleted ? '<span class="day-check">✓</span>' : ''}
        </button>
      `;
    }).join('');
  },

  attachEvents() {
    document.querySelectorAll('.day-card').forEach(card => {
      card.addEventListener('click', () => {
        const day = parseInt(card.dataset.day);
        this.renderDayEntry(day);
      });
    });
  },

  renderDayEntry(day) {
    const prompt = DiaryPrompts.find(p => p.day === day);
    if (!prompt) return;
    
    const container = document.getElementById('diary-entry-container');
    const savedEntries = window.Storage.get('diaryEntries') || {};
    const savedDay = savedEntries[day] || { answers: [] };
    
    container.innerHTML = `
      <article class="card card-gold fade-in-up">
        <div class="day-header">
          <span class="day-badge">Día ${day}</span>
          <h3 style="color: var(--color-gold-primary); margin-top: var(--space-2);">${prompt.title}</h3>
          <p style="color: var(--color-gray-light); font-style: italic; margin-top: var(--space-2);">${prompt.subtitle}</p>
        </div>
        
        <div class="ornament-divider">
          <span class="ornament-symbol">❖</span>
        </div>
        
        <p style="color: var(--color-white-soft); line-height: 1.8; font-size: var(--text-base);">
          ${prompt.intro}
        </p>
        
        <form id="diary-form" style="margin-top: var(--space-8);">
          ${prompt.questions.map((q, idx) => `
            <div class="diary-question" style="margin-bottom: var(--space-6);">
              <label style="display: block; color: var(--color-gold-light); font-weight: 500; margin-bottom: var(--space-2);">
                ${idx + 1}. ${q.q}
              </label>
              <p style="color: var(--color-gray-light); font-size: var(--text-sm); margin-bottom: var(--space-3); font-style: italic;">
                ${q.hint}
              </p>
              <textarea 
                class="input textarea" 
                name="answer-${idx}" 
                placeholder="Escribe tu reflexión aquí..."
                rows="4"
              >${savedDay.answers[idx] || ''}</textarea>
            </div>
          `).join('')}
          
          <div style="display: flex; gap: var(--space-4); margin-top: var(--space-8);">
            <button type="button" class="btn btn-ghost" id="back-to-days" style="flex: 1;">
              ← Volver a los días
            </button>
            <button type="submit" class="btn btn-primary" style="flex: 2;">
              Guardar reflexión
            </button>
          </div>
        </form>
      </article>
    `;
    
    this.attachFormEvents(day);
  },

  attachFormEvents(day) {
    const form = document.getElementById('diary-form');
    const backBtn = document.getElementById('back-to-days');
    
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.renderDaySelector();
        document.getElementById('diary-entry-container').innerHTML = `
          <div class="card text-center" style="border: 1px dashed var(--color-gray-dark); background: transparent;">
            <p style="color: var(--color-gray-light);">Selecciona un día para comenzar a escribir.</p>
          </div>
        `;
      });
    }
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveEntry(day);
      });
    }
  },

  saveEntry(day) {
    const form = document.getElementById('diary-form');
    const textareas = form.querySelectorAll('textarea');
    const answers = Array.from(textareas).map(ta => ta.value.trim());
    
    const savedEntries = window.Storage.get('diaryEntries') || {};
    savedEntries[day] = {
      answers: answers,
      completedAt: new Date().toISOString()
    };
    
    window.Storage.set('diaryEntries', savedEntries);
    window.showToast('Reflexión guardada correctamente', 'success');
    
    setTimeout(() => {
      this.renderDaySelector();
      document.getElementById('diary-entry-container').innerHTML = `
        <div class="card text-center" style="border: 1px solid var(--color-gold-dark); background: var(--color-blue-mystic);">
          <span style="font-size: var(--text-4xl);">✨</span>
          <h4 style="color: var(--color-gold-primary); margin: var(--space-3) 0;">Día ${day} completado</h4>
          <p style="color: var(--color-gray-light);">Selecciona otro día para continuar tu proceso.</p>
        </div>
      `;
    }, 500);
  }
};

window.DiaryUI = DiaryUI;

// Función global para inicialización desde app.js
function initDiary() {
    console.log('📓 initDiary llamado');
    if (window.DiaryUI) {
        window.DiaryUI.init();
        console.log('✅ DiaryUI inicializado');
    } else {
        console.error('❌ DiaryUI no está disponible');
    }
}
window.initDiary = initDiary;

console.log('✅ diary-ui.js cargado - initDiary disponible:', typeof window.initDiary);
