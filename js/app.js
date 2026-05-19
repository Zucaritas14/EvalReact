/**
 * SimWork MVP - Orquestador Global (Core Application Layer)
 */

function switchTab(tabId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById('page-' + tabId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 SimWork Core: Entorno exclusivo del postulante inicializado y listo.');
});