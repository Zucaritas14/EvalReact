/**
 * SimWork MVP - Módulo del Candidato
 */

function startSimulation() {
  const confirmStart = confirm("¿Estás listo para iniciar el Stress Test conductual 'The Chaos Day'?\n\n• Todo el flujo es mediante redacción de texto libre.\n• El temporizador registrará tu velocidad de toma de decisiones.\n• No se puede pausar la prueba.");

  if (!confirmStart) return;

  // Cambiar a la pantalla del simulador
  switchTab('vsim');

  // Lanzar el motor interactivo
  if (typeof startVsimEngine === 'function') {
    startVsimEngine('softskills');
  } else {
    console.error('El motor de simulación (js/vsim.js) no se encuentra disponible.');
  }
}