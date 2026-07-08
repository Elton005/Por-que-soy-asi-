function initTestQuestion() {
    console.log('📝 initTestQuestion llamado');
    if (window.TestUI) {
        window.TestUI.init();
        console.log('✅ TestUI inicializado');
    } else {
        console.error('❌ TestUI no está disponible');
    }
}
window.initTestQuestion = initTestQuestion;

console.log('✅ test-init.js cargado - initTestQuestion disponible:', typeof window.initTestQuestion);