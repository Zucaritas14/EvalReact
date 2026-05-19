/* ── TAB NAVIGATION ── */
function switchTab(t) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('page-' + t).classList.add('active');
}

/* ── EMPLOYER FLOW: MODE SELECTOR ── */
function selectMode(m) {
  document.getElementById('mode-template').classList.toggle('selected', m === 'template');
  document.getElementById('mode-custom').classList.toggle('selected', m === 'custom');
  document.getElementById('tmpl-section').classList.toggle('hidden', m !== 'template');
  document.getElementById('custom-section').classList.toggle('hidden', m !== 'custom');
}

/* ── TEMPLATES DATA ── */
const TEMPLATES = {
  pm: {
    name: 'Project Manager Junior', cat: 'Tecnología', color: 'var(--purple)', badge: 'bp', duration: '20 min',
    tasks: [
      'Coordinar entre el equipo técnico y los clientes para asegurar entregas a tiempo',
      'Gestionar la comunicación durante incidentes o bugs críticos en producción',
      'Redactar actualizaciones claras para clientes bajo situaciones de presión',
      'Priorizar cuando múltiples stakeholders demandan atención simultánea',
      'Tomar decisiones con información incompleta en ventanas cortas de tiempo'
    ],
    eval_tech: '¿Tomaste las decisiones correctas según buenas prácticas de PM?',
    eval_soft: 'Empatía, asertividad y claridad con el jefe, compañero y cliente.'
  },
  dev: {
    name: 'Desarrollador Full-Stack Jr.', cat: 'Tecnología', color: 'var(--purple)', badge: 'bp', duration: '20 min',
    tasks: [
      'Escribir y documentar código limpio siguiendo principios SOLID',
      'Diagnosticar y resolver bugs en producción bajo presión de tiempo',
      'Participar en code reviews y daily scrums con el equipo',
      'Gestionar conflictos de merge en Git sin afectar el trabajo de otros',
      'Comunicar problemas técnicos complejos de forma clara a stakeholders'
    ],
    eval_tech: '¿Aplicaste principios SOLID y tomaste decisiones de arquitectura correctas?',
    eval_soft: 'Comunicación asertiva, autodidactismo y calma ante caída de producción.'
  },
  mkt: {
    name: 'Marketing Digital · Performance', cat: 'Tecnología', color: 'var(--purple)', badge: 'bp', duration: '20 min',
    tasks: [
      'Crear y optimizar campañas en Meta Ads y Google Ads',
      'Diagnosticar caídas bruscas de ROAS en temporada alta',
      'Controlar consumo de presupuesto y detectar configuraciones erróneas',
      'Estructurar embudos TOFU/MOFU/BOFU y gestionar audiencias',
      'Analizar métricas de conversión y redactar reportes para el cliente'
    ],
    eval_tech: '¿Diagnosticaste correctamente el problema de medición y estructuraste el embudo?',
    eval_soft: 'Pensamiento analítico, agilidad y comunicación de resultados bajo presión.'
  },
  vet: {
    name: 'Veterinaria · Pequeñas Especies', cat: 'Salud', color: 'var(--teal)', badge: 'bt', duration: '20 min',
    tasks: [
      'Aplicar protocolo de triaje ABCD ante emergencias simultáneas',
      'Calcular dosis anestésicas y fluidoterapia según peso del paciente',
      'Comunicar el fallecimiento o eutanasia a dueños emocionalmente afectados',
      'Interpretar exámenes de laboratorio y radiografías bajo tiempo',
      'Priorizar entre emergencia por trauma y consulta programada en curso'
    ],
    eval_tech: '¿Seguiste el protocolo ABCD y calculaste correctamente las dosis?',
    eval_soft: 'Comunicación empática con dueños, manejo del duelo y toma de decisiones bajo estrés extremo.'
  },
  psi: {
    name: 'Psicología Clínica', cat: 'Salud', color: 'var(--teal)', badge: 'bt', duration: '20 min',
    tasks: [
      'Conducir entrevista inicial y detectar señales de riesgo en sesión',
      'Aplicar protocolo ante ideación suicida activa expresada por el paciente',
      'Contener al paciente hostil o en crisis de angustia dentro del consultorio',
      'Decidir criterios de derivación a psiquiatría o urgencias hospitalarias',
      'Manejar la ruptura del secreto profesional ante riesgo inminente'
    ],
    eval_tech: '¿Aplicaste correctamente el protocolo de riesgo y los criterios de derivación?',
    eval_soft: 'Escucha activa, empatía sin pérdida de neutralidad y ecuanimidad ante crisis.'
  },
  law: {
    name: 'Abogado Litigante Jr.', cat: 'Derecho', color: 'var(--amber)', badge: 'ba', duration: '20 min',
    tasks: [
      'Identificar la vía procesal correcta y gestionar plazos improrrogables',
      'Redactar contestaciones y demandas bajo deadline inminente',
      'Manejar al cliente que exige acciones legales inviables o cuestionables',
      'Aplicar control de convencionalidad ante normas contradictorias',
      'Mantener la ética profesional bajo amenaza de perder la cuenta'
    ],
    eval_tech: '¿Identificaste la vía procesal correcta y los plazos del código?',
    eval_soft: 'Argumentación jurídica, atención al detalle y firmeza ética bajo presión.'
  },
  eco: {
    name: 'Analista Económico / Finanzas', cat: 'Economía', color: 'var(--amber)', badge: 'ba', duration: '20 min',
    tasks: [
      'Recalcular proyecciones ante cambio brusco de política monetaria',
      'Detectar inconsistencias en la base de datos antes de presentar al directorio',
      'Seleccionar y aplicar pruebas estadísticas correctas (ej. Dickey-Fuller)',
      'Construir modelos econométricos descriptivos y predictivos',
      'Traducir datos complejos en recomendaciones concretas de negocio'
    ],
    eval_tech: '¿Elegiste la prueba estadística correcta y deflactaste variables adecuadamente?',
    eval_soft: 'Pensamiento crítico, escepticismo analítico y storytelling con datos bajo presión.'
  },
  adm: {
    name: 'Administración · Operaciones', cat: 'Negocios', color: 'var(--amber)', badge: 'ba', duration: '20 min',
    tasks: [
      'Gestionar quiebre de stock de materia prima crítica con proveedor en retraso',
      'Resolver conflicto interdepartamental que bloquea la estrategia anual',
      'Controlar KPIs y presupuestos con información incompleta',
      'Aplicar ciclo PHVA para mejora continua de procesos afectados',
      'Negociar con proveedores estratégicos bajo condiciones de urgencia'
    ],
    eval_tech: '¿Calculaste ratios financieros clave y aplicaste ciclo PHVA correctamente?',
    eval_soft: 'Liderazgo, resolución de conflictos y visión estratégica en negociación.'
  },
  cs: {
    name: 'Customer Success Rep.', cat: 'Ventas', color: 'var(--amber)', badge: 'ba', duration: '20 min',
    tasks: [
      'Coordinar entre el equipo técnico y los clientes para asegurar entregas a tiempo',
      'Gestionar la comunicación durante incidentes o bugs críticos en producción',
      'Redactar actualizaciones claras para clientes bajo situaciones de presión',
      'Priorizar cuando múltiples stakeholders demandan atención simultánea',
      'Manejar escalaciones y amenazas de churn de clientes clave'
    ],
    eval_tech: '¿Tomaste las decisiones correctas para retener al cliente y escalar el problema?',
    eval_soft: 'Empatía, asertividad y claridad bajo presión de churn.'
  },
  mec: {
    name: 'Mecatrónica · Automatización Industrial', cat: 'Ingeniería', color: 'var(--blue)', badge: 'bb', duration: '20 min',
    tasks: [
      'Diagnosticar falla en línea de producción siguiendo flujo de señal',
      'Aplicar protocolo LOTO antes de intervenir cualquier máquina',
      'Responder ante brazo robótico con comportamiento errático y riesgo de accidente',
      'Programar PLCs y calibrar sensores bajo presión de parada productiva',
      'Coordinar con operarios y jefes de mantenimiento durante crisis activa'
    ],
    eval_tech: '¿Seguiste el diagnóstico sistemático correcto y cumpliste normas LOTO?',
    eval_soft: 'Troubleshooting analítico, trabajo bajo presión en entornos industriales demandantes.'
  },
  civ: {
    name: 'Ingeniería Civil · Residente de Obra', cat: 'Ingeniería', color: 'var(--blue)', badge: 'bb', duration: '20 min',
    tasks: [
      'Gestionar retraso crítico de concreto premezclado durante vaciado de losa',
      'Activar protocolo de emergencia ante accidente por colapso de andamio',
      'Verificar resistencia del concreto con Slump test bajo norma técnica',
      'Interpretar planos estructurales para evitar desviaciones geométricas',
      'Exigir cumplimiento de EPP y normas de seguridad a pie de obra'
    ],
    eval_tech: '¿Aplicaste correctamente el Slump test e interpretaste planos estructurales?',
    eval_soft: 'Liderazgo directivo, comunicación firme y manejo de emergencias en campo.'
  },
  av: {
    name: 'Realizador / Editor de Video', cat: 'Audiovisual', color: 'var(--red)', badge: 'br2', duration: '20 min',
    tasks: [
      'Responder ante falla de tarjeta de memoria durante rodaje en vivo no repetible',
      'Gestionar cambios de último minuto del cliente horas antes del deadline de emisión',
      'Configurar triángulo de exposición y balance de blancos según iluminación',
      'Aplicar regla del eje (180°) en montaje para mantener continuidad espacial',
      'Coordinar con director, actores y cliente bajo restricciones técnicas y de tiempo'
    ],
    eval_tech: '¿Configuraste correctamente la exposición y respetaste la regla del eje en montaje?',
    eval_soft: 'Creatividad bajo restricciones, trabajo en equipo y tolerancia a revisiones constantes.'
  }
};

/* ── EMPLOYER FLOW: TEMPLATE SELECTION ── */
function selTmpl(id) {
  document.querySelectorAll('#tmpl-section .tmpl-card').forEach(c => c.classList.remove('selected'));
  const el = document.getElementById('t-' + id);
  if (el) el.classList.add('selected');
  window._selTmpl = id;
}

/* ── SHARED: CHIP TOGGLE ── */
function toggleChip(el) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

/* ── SKILL WEIGHT DOTS ── */
function setSW(dot, level) {
  const row = dot.closest('.sk-w');
  row.querySelectorAll('.sw').forEach((d, i) => d.classList.toggle('on', i < level));
}

/* ── EMPLOYER STEPPER ── */
function goStep(n) {
  document.querySelectorAll('.e-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('ep-' + n).classList.add('active');
  for (let i = 0; i < 3; i++) {
    const s = document.getElementById('es-' + i);
    s.classList.remove('active', 'done');
    if (i < n) s.classList.add('done');
    if (i === n) s.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── CANDIDATE FLOW: TEMPLATE SELECTION ── */
window._selTmpl = 'pm';

function selCandTmpl(id, el) {
  document.querySelectorAll('#cand-role-grid .tmpl-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  window._selTmpl = id;
}

/* ── LINK GENERATOR ── */
function genLink() {
  const token = Math.random().toString(36).substring(2, 9);
  document.getElementById('gen-link').textContent = 'https://simwork.app/sim/' + token + '?pressure=media';
  setTimeout(animateBars, 450);
}

function copyLink() {
  navigator.clipboard.writeText(document.getElementById('gen-link').textContent).catch(() => {});
  event.target.textContent = '¡Copiado!';
  setTimeout(() => event.target.textContent = 'Copiar', 1800);
}

/* ── BAR CHART ANIMATION ── */
function animateBars() {
  document.querySelectorAll('.bf').forEach(b => {
    const t = b.style.getPropertyValue('--t') || (b.style.cssText.match(/--t:([\d.]+%)/) || [])[1] || '0';
    b.style.width = t;
  });
}

/* ── RESET EMPLOYER FLOW ── */
function resetFlow() {
  document.querySelectorAll('.bf').forEach(b => b.style.width = '0');
  goStep(0);
}

/* ── CANDIDATE STEPPER ── */
function nextCP(idx) {
  if (idx === 1) {
    const tid = window._selTmpl || 'pm';
    const t = TEMPLATES[tid] || TEMPLATES['pm'];
    document.getElementById('jc-title').textContent = t.name;
    document.getElementById('jc-cat').textContent = t.cat;
    document.getElementById('jc-dur').textContent = t.duration + ' de prueba';
    const ul = document.getElementById('jc-tasks');
    ul.innerHTML = t.tasks.map(s => '<li>' + s + '</li>').join('');
    document.getElementById('eval-tech').textContent = t.eval_tech;
    document.getElementById('eval-soft').textContent = t.eval_soft;
  }
  document.querySelectorAll('.c-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.c-dot').forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i < idx) d.classList.add('done');
    if (i === idx) d.classList.add('active');
  });
  document.getElementById('cp-' + idx).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
/* ══════════════════════════════════════
   VET SIM — SIMULACIÓN VETERINARIA
══════════════════════════════════════ */

/* ── ROUTER: Iniciar simulación desde flow candidato ── */
function launchSim() {
  const tid = window._selTmpl || 'pm';
  if (tid === 'vet') {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-vetsim').classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    vsimReset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    alert('¡Aquí comenzaría la simulación para el cargo seleccionado! 🚀');
  }
}

function exitVetSim() {
  vsimStopTimer();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-candidate').classList.add('active');
  document.querySelector('.tab-btn:last-child').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── ESTADO INTERNO ── */
const VSIM = {
  scores: { tech: 0, soft: 0, press: 0 },
  answers: {},
  textScore4: 50,
  simStart: null,
  timerInterval: null,
  timerSeconds: 0,
  timerScene: 0
};

/* ── FEEDBACKS POR ESCENA ── */
const VSIM_FB = {
  1: {
    a: { type: 'ok',  text: '<strong>Correcto.</strong> La PAAF es el primer paso diagnóstico ante una masa subcutánea de crecimiento reciente. No alarmas ni minimizas — comunicas el plan con rigor clínico.' },
    b: { type: 'bad', text: '<strong>Incorrecto.</strong> Minimizar sin diagnóstico puede retrasar la detección de un tumor maligno. "Probablemente no es nada" sin PAAF expone al propietario a falsas expectativas y a la clínica a responsabilidad profesional.' },
    c: { type: 'bad', text: '<strong>Incorrecto.</strong> Indicar cirugía sin diagnóstico citológico es sobreactuación injustificada. El protocolo estándar es PAAF primero para caracterizar la masa antes de decidir la vía terapéutica.' }
  },
  2: {
    a: { type: 'ok',  text: '<strong>Correcto.</strong> El protocolo ABCD prioriza la emergencia. Delegas el traslado urgente a Rodrigo, cierras la consulta en segundos y acudes con el esquema de triaje correcto: vía aérea → respiración → circulación → neurológico.' },
    b: { type: 'bad', text: '<strong>Incorrecto.</strong> La prioridad clínica en el triaje es el paciente, no el propietario. Calmar a la dueña antes de evaluar a la gata puede costar minutos críticos en una emergencia nivel 1.' },
    c: { type: 'bad', text: '<strong>Incorrecto.</strong> Un paciente politraumatizado con sangrado activo es emergencia nivel 1. Delegarla a Rodrigo sin evaluación médica previa es negligencia — él no puede hacer el triaje diagnóstico.' }
  },
  3: {
    a: { type: 'bad', text: '<strong>Incorrecto.</strong> El Propofol a dosis plena (6 mg/kg) es fuertemente hipotensor y puede precipitar colapso cardiovascular en un paciente ya en shock. Se usa a dosis muy reducidas o se evita en felinos críticos.' },
    b: { type: 'ok',  text: '<strong>Correcto.</strong> Ketamina + midazolam a dosis reducida es el protocolo de elección en felinos inestables. La ketamina mantiene la presión arterial (a diferencia del Propofol) y el midazolam reduce la dosis necesaria. Ajuste por respuesta = práctica estándar en paciente crítico.' },
    c: { type: 'bad', text: '<strong>Incorrecto.</strong> Esperar no es opción con neumotórax activo. El drenaje es urgente. El shock no contraindica absolutamente la sedación — indica usar protocolos adaptados al paciente comprometido.' }
  },
  5: {
    a: { type: 'bad', text: '<strong>Incorrecto.</strong> Transferir la culpa al asistente frente a tu jefa muestra falta de liderazgo. La gestión de los casos en tu turno es también tu responsabilidad.' },
    b: { type: 'ok',  text: '<strong>Correcto.</strong> Asumir la responsabilidad directamente, proponer solución concreta y mejora del proceso: esto es profesionalismo real bajo presión. No minimizas, no culpas, actúas.' },
    c: { type: 'bad', text: '<strong>Incorrecto (parcialmente).</strong> La priorización fue correcta, pero la forma defensiva genera conflicto innecesario. Puedes explicar las prioridades sin ponerte a la defensiva y proponer qué hacer con la Sra. Mendoza ahora.' }
  }
};

/* ── HELPERS UI ── */
function vsimShow(id) {
  document.querySelectorAll('.vsim-screen').forEach(s => s.classList.remove('active'));
  document.getElementById('vs-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function vsimSetDots(active) {
  for (let i = 0; i < 5; i++) {
    const d = document.getElementById('vp' + i);
    if (!d) continue;
    d.className = 'vsim-pdot' + (i < active ? ' vdone' : i === active ? ' vactive' : '');
  }
}

/* ── TIMER ── */
function vsimStartTimer(scene, seconds) {
  vsimStopTimer();
  VSIM.timerScene = scene;
  VSIM.timerSeconds = seconds;
  let rem = seconds;
  const fill = document.getElementById('vsim-tfill');
  const txt = document.getElementById('vsim-ttxt');
  fill.style.width = '100%';
  fill.className = 'vsim-tfill';

  VSIM.timerInterval = setInterval(function() {
    rem--;
    const pct = (rem / seconds * 100).toFixed(1);
    fill.style.width = pct + '%';
    const m = Math.floor(rem / 60);
    const s = rem % 60;
    txt.textContent = m + ':' + String(s).padStart(2, '0');
    if (rem <= seconds * 0.4) fill.className = 'vsim-tfill vwarn';
    if (rem <= seconds * 0.15) fill.className = 'vsim-tfill vdanger';
    if (rem <= 0) {
      clearInterval(VSIM.timerInterval);
      VSIM.timerInterval = null;
      txt.textContent = '0:00';
      vsimAutoAdvance(scene);
    }
  }, 1000);
}

function vsimStopTimer() {
  if (VSIM.timerInterval) { clearInterval(VSIM.timerInterval); VSIM.timerInterval = null; }
  const txt = document.getElementById('vsim-ttxt');
  if (txt) txt.textContent = '—';
}

function vsimAutoAdvance(scene) {
  if (!VSIM.answers[scene] && scene !== 4) {
    // tiempo agotado sin respuesta, anota penalización y avanza
    VSIM.answers[scene] = 'timeout';
  }
  vsimNextScene(scene);
}

/* ── INICIO Y RESET ── */
function vsimStart() {
  VSIM.simStart = Date.now();
  vsimSetDots(0);
  vsimShow(1);
  // mostrar 2do mensaje de Patrica con delay
  setTimeout(function() {
    var m = document.getElementById('vmsg-1b');
    if (m) m.style.display = 'flex';
  }, 3000);
  vsimStartTimer(1, 150);
}

function vsimReset() {
  vsimStopTimer();
  VSIM.scores.tech = 0; VSIM.scores.soft = 0; VSIM.scores.press = 0;
  VSIM.answers = {};
  VSIM.textScore4 = 50;
  VSIM.simStart = null;

  // limpiar opts, fbs, textarea
  document.querySelectorAll('.vsim-opt').forEach(function(b) { b.className = 'vsim-opt'; });
  document.querySelectorAll('.vsim-fb').forEach(function(f) { f.style.display = 'none'; f.innerHTML = ''; f.className = 'vsim-fb'; });
  var ta = document.getElementById('vsim-text4');
  if (ta) ta.value = '';
  var btn4 = document.getElementById('vsim-btn4');
  if (btn4) btn4.disabled = false;
  var m1b = document.getElementById('vmsg-1b');
  if (m1b) m1b.style.display = 'none';

  // dots y timer reset
  for (var i = 0; i < 5; i++) {
    var d = document.getElementById('vp' + i);
    if (d) d.className = 'vsim-pdot';
  }
  var fill = document.getElementById('vsim-tfill');
  if (fill) { fill.style.width = '100%'; fill.className = 'vsim-tfill'; }
  var ttxt = document.getElementById('vsim-ttxt');
  if (ttxt) ttxt.textContent = '—';

  vsimShow(0);
}

/* ── RESPUESTA A OPCIÓN MÚLTIPLE ── */
function vsimAnswer(scene, choice) {
  if (VSIM.answers[scene]) return;
  VSIM.answers[scene] = choice;
  vsimStopTimer();

  var fb_data = VSIM_FB[scene];
  if (!fb_data) return;
  var chosen = fb_data[choice];
  var isOk = chosen.type === 'ok';

  // colorear opciones
  var opts = document.querySelectorAll('#vopts-' + scene + ' .vsim-opt');
  var keys = ['a', 'b', 'c'];
  opts.forEach(function(btn, i) {
    var k = keys[i];
    if (k === choice) {
      btn.classList.add(isOk ? 'vcorrect' : 'vwrong');
    } else if (fb_data[k] && fb_data[k].type === 'ok' && !isOk) {
      btn.classList.add('vcorrect');
    } else {
      btn.classList.add('vneutral');
    }
  });

  // mostrar feedback
  var fb = document.getElementById('vfb-' + scene);
  fb.className = 'vsim-fb ' + (isOk ? 'vok' : 'vbad');
  fb.innerHTML = chosen.text;
  fb.style.display = 'block';

  // sumar puntajes
  if (isOk) {
    if (scene === 1 || scene === 3) VSIM.scores.tech += 30;
    else VSIM.scores.tech += 10;
    VSIM.scores.soft += (scene === 5) ? 25 : 5;
    VSIM.scores.press += 18;
  }

  // avanzar tras leer el feedback
  setTimeout(function() { vsimNextScene(scene); }, 3000);
}

function vsimNextScene(scene) {
  var next = scene + 1;
  if (next > 5) {
    vsimGenerateReport();
    vsimSetDots(5);
    vsimShow(6);
    return;
  }
  vsimSetDots(next - 1);
  vsimShow(next);
  var durations = { 2: 120, 3: 150, 4: 150, 5: 90 };
  if (durations[next]) {
    vsimStartTimer(next, durations[next]);
    if (next === 4) {
      // auto-evaluar texto si se acaba el tiempo
      var origAutoAdv = vsimAutoAdvance;
    }
  }
}

/* ── EVALUACIÓN TEXTO ESCENA 4 ── */
function vsimEvalText() {
  if (VSIM.answers[4]) return;
  vsimStopTimer();
  var txt = document.getElementById('vsim-text4').value.trim();
  var score = 30;
  var feedback = '';

  if (!txt || txt.length < 30) {
    feedback = '<strong>Sin respuesta.</strong> No redactaste nada. En un caso real, dejar a un propietario sin información durante una emergencia genera desconfianza y puede derivar en conflictos legales.';
    score = 10;
  } else {
    var lower = txt.toLowerCase();
    var hasName      = lower.includes('valeria') || lower.includes('luna');
    var hasEmpathy   = lower.includes('entiendo') || lower.includes('sé que') || lower.includes('se que') || lower.includes('difícil') || lower.includes('dificil') || lower.includes('tranquila') || lower.includes('acompañ') || lower.includes('siento');
    var hasPrognosis = lower.includes('reservad') || lower.includes('evolución') || lower.includes('evolucion') || lower.includes('pronóstico') || lower.includes('pronostico');
    var hasInfo      = lower.includes('hospitaliz') || lower.includes('estable') || lower.includes('cirugía') || lower.includes('cirugia') || lower.includes('48') || lower.includes('drenaje');
    var hasPlan      = lower.includes('llamar') || lower.includes('actualizaré') || lower.includes('informar') || lower.includes('estaremos') || lower.includes('pendiente') || lower.includes('actualiz');

    score = 35;
    if (hasName)      score += 10;
    if (hasEmpathy)   score += 15;
    if (hasPrognosis) score += 10;
    if (hasInfo)      score += 15;
    if (hasPlan)      score += 10;
    score = Math.min(score, 95);

    var missing = [];
    if (!hasEmpathy)   missing.push('reconocer el estado emocional de Valeria antes de dar información técnica');
    if (!hasPrognosis) missing.push('mencionar el pronóstico reservado de forma honesta');
    if (!hasInfo)      missing.push('explicar el plan clínico (hospitalización, posible cirugía)');
    if (!hasPlan)      missing.push('ofrecer un compromiso de actualización continua');

    if (score >= 80) {
      feedback = '<strong>Excelente comunicación.</strong> Tu respuesta balanceó empatía e información clínica honesta. Ese equilibrio — sin minimizar ni alarmar en exceso — es la competencia más valorada en la relación médico-propietario.';
    } else if (score >= 60) {
      feedback = '<strong>Respuesta aceptable.</strong> Hubo empatía o información clínica, pero puede mejorar.' + (missing.length ? ' Faltó: ' + missing.join('; ') + '.' : '');
    } else {
      feedback = '<strong>Respuesta técnica pero fría.</strong> El cómo es tan importante como el qué. Faltó: ' + missing.join('; ') + '.';
    }
  }

  VSIM.textScore4 = score;
  VSIM.scores.soft += Math.round(score * 0.18);
  VSIM.scores.press += 12;
  VSIM.answers[4] = 'done';

  var fb = document.getElementById('vfb-4');
  fb.className = 'vsim-fb ' + (score >= 70 ? 'vok' : score >= 50 ? 'vinfo' : 'vbad');
  fb.innerHTML = feedback;
  fb.style.display = 'block';
  document.getElementById('vsim-btn4').disabled = true;

  setTimeout(function() { vsimNextScene(4); }, 3000);
}

/* ── REPORTE FINAL ── */
function vsimGenerateReport() {
  vsimStopTimer();
  var elapsed = VSIM.simStart ? Math.round((Date.now() - VSIM.simStart) / 1000) : 900;
  var m = Math.floor(elapsed / 60);
  var s = elapsed % 60;
  document.getElementById('vrpt-time').textContent = 'Completado · ' + m + ' min ' + s + ' seg';

  var tech  = Math.min(Math.round(VSIM.scores.tech + 15), 100);
  var soft  = Math.min(Math.round(VSIM.scores.soft + 20), 100);
  var press = Math.min(Math.round(VSIM.scores.press + 18), 100);

  document.getElementById('vrpt-tech').textContent  = tech;
  document.getElementById('vrpt-soft').textContent  = soft;
  document.getElementById('vrpt-press').textContent = press;

  var avg = Math.round((tech + soft + press) / 3);
  var badge = document.getElementById('vrpt-badge');
  if (avg >= 75)      { badge.textContent = 'RECOMENDADO';        badge.className = 'badge bt'; }
  else if (avg >= 55) { badge.textContent = 'CON RESERVAS';       badge.className = 'badge bam'; }
  else                { badge.textContent = 'NO RECOMENDADO';     badge.className = 'badge br'; }

  var a1ok = VSIM.answers[1] === 'a';
  var a2ok = VSIM.answers[2] === 'a';
  var a3ok = VSIM.answers[3] === 'b';
  var a5ok = VSIM.answers[5] === 'b';
  var t4   = VSIM.textScore4;

  var bars = [
    { id: 'triage',   pct: a2ok ? 92 : 38,          col: 'var(--teal)' },
    { id: 'clinical', pct: a3ok ? 88 : (a1ok ? 60 : 32), col: 'var(--purple)' },
    { id: 'empathy',  pct: Math.min(t4, 95),         col: 'var(--teal)' },
    { id: 'pressure', pct: (a2ok && a3ok) ? 84 : 50, col: 'var(--amber)' },
    { id: 'resp',     pct: a5ok ? 91 : 42,           col: 'var(--purple)' }
  ];

  setTimeout(function() {
    bars.forEach(function(b) {
      var fill = document.getElementById('vb-' + b.id);
      var pct  = document.getElementById('vbp-' + b.id);
      if (fill) fill.style.width = b.pct + '%';
      if (pct)  pct.textContent = b.pct + '%';
    });
  }, 350);

  var correct = [a1ok, a2ok, a3ok, a5ok].filter(Boolean).length;
  var qual = document.getElementById('vrpt-qual');
  var html = '';

  if (correct >= 3) {
    html += '<div class="ab"><strong>Fortaleza:</strong> Manejo adecuado del protocolo ABCD y criterio clínico sólido bajo presión. Las decisiones de triaje reflejan formación estructurada y capacidad de priorización correcta en simultáneo.</div>';
    html += '<div class="ab" style="border-color:var(--amber)"><strong>Área de mejora:</strong> La comunicación empática con propietarios en crisis puede profundizarse — integrar el componente emocional antes de la información técnica mejora significativamente la experiencia del propietario.</div>';
  } else {
    html += '<div class="ab" style="border-color:var(--amber)"><strong>Observación:</strong> Algunas decisiones técnicas requieren refuerzo — especialmente en protocolos de emergencia (triaje ABCD) y sedación de pacientes críticos. Se recomienda revisar protocolos de medicina de urgencias en pequeñas especies.</div>';
    html += '<div class="ab"><strong>Potencial:</strong> Las habilidades de comunicación y responsabilidad profesional mostraron disposición de mejora. Con acompañamiento clínico el perfil tiene proyección rápida.</div>';
  }
  qual.innerHTML = html;

  var flagList = [];
  if (a2ok) flagList.push({ cls:'fok', txt:'✓ Protocolo ABCD correcto' });
  else       flagList.push({ cls:'fbad', txt:'✕ Triaje ABCD incorrecto' });
  if (a3ok) flagList.push({ cls:'fok', txt:'✓ Dosis anestésica adecuada' });
  else       flagList.push({ cls:'fbad', txt:'✕ Error en protocolo anestésico' });
  if (t4 >= 70) flagList.push({ cls:'fok',  txt:'✓ Comunicación empática con propietario' });
  else           flagList.push({ cls:'fwarn', txt:'⚠ Comunicación con propietario mejorable' });
  if (a5ok) flagList.push({ cls:'fok',  txt:'✓ Responsabilidad profesional asumida' });
  else       flagList.push({ cls:'fwarn', txt:'⚠ Gestión del error bajo presión mejorable' });
  if (a1ok) flagList.push({ cls:'fok', txt:'✓ Diagnóstico diferencial correcto (masa)' });

  document.getElementById('vrpt-flags').innerHTML = flagList
    .map(function(f) { return '<span class="fl ' + f.cls + '">' + f.txt + '</span>'; })
    .join('');
}