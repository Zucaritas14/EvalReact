/**
 * SimWork MVP - Motor del Simulador Conductual (Soft Skills Stress Test)
 * Enfoque: 100% Redacción libre bajo presión psicológica.
 */

const VsimEngine = {
  activeTemplateId: 'softskills',
  currentStep: 0,
  scores: { stability: 0, assertiveness: 0, latency: 0, communication: 0 },
  timerInterval: null,
  timeRemaining: 240, // 4 minutos globales para todo el flujo de crisis
  stepStartTime: 0,
  latencies: [],
  textScores: [],

  chaosDatabase: [
    {
      step: 1,
      lbl: "// ESCENARIO 1 DE 3 · EL DILEMA DE LA PRIORIZACIÓN · 10:00 AM",
      question: "Faltan solo 4 minutos para enviar una entrega crítica al Cliente Enterprise y salvar la cuenta. En este instante, tu Jefe Directo (Micromanager) irrumpe exigiéndote un reporte interno totalmente diferente para YA. Redacta el mensaje exacto que le enviarías a tu jefe para resolver esta fricción:",
      messages: [
        { sender: "Sistemas (Alerta)", avatar: "⚠️", cls: "va-asist", text: "Recordatorio automático: Faltan 4 minutos para el cierre del entregable del Cliente Enterprise." },
        { sender: "Jefe de Área · Micromanager", avatar: "J", cls: "va-jefa", text: "Necesito que dejes lo que estés haciendo y me envíes el consolidado de métricas internas en este mismo canal. Lo requiero de inmediato para una junta de directores de última hora." }
      ],
      keywords: {
        good: ['cliente', 'minutos', 'entrego', 'luego', 'prioridad', 'termino', 'envío', 'hola', 'después'],
        bad: ['de inmediato', 'ahora mismo', 'dejo', 'culpa', 'perdón', 'olvidé', 'no puedo']
      },
      fbSuccess: "<strong>Buen manejo de límites.</strong> Explicaste la urgencia externa, protegiste el activo del cliente y propusiste una ventana de tiempo clara para atender la orden de tu superior de inmediato.",
      fbFail: "<strong>Falla en priorización o asertividad.</strong> Tu respuesta indica parálisis ante la autoridad (cediendo la entrega crítica) o carece de una propuesta resolutiva formal estructurada."
    },
    {
      step: 2,
      lbl: "// ESCENARIO 2 DE 3 · CONTENCIÓN DE CRISIS EXTERNA · 11:15 AM",
      question: "Hubo un error operativo severo en la cuenta. El Ing. Mendoza está furioso, insulta indirectamente el desempeño del equipo y amenaza con romper relaciones comerciales. Redacta la respuesta exacta de contención que le enviarías directamente:",
      messages: [
        { sender: "Ing. Carlos Mendoza · Cliente Enterprise", avatar: "C", cls: "va-dueno", text: "¡Es inaceptable lo que acaban de enviar! Es una completa falta de profesionalismo, nos están haciendo perder dinero y tiempo valioso. Exijo saber quién fue el responsable de esta basura de entrega de inmediato.", urgent: true }
      ],
      keywords: {
        good: ['lamento', 'disculpa', 'entiendo', 'solución', 'revisando', 'ahora mismo', 'equipo', 'pasos', 'siento'],
        bad: ['no fue mi culpa', 'sistema', 'retraso', 'compañero', 'error de otro', 'exagera']
      },
      fbSuccess: "<strong>Excelente contención de crisis.</strong> Validaste emocionalmente la molestia del cliente, asumiste la responsabilidad colectiva y cerraste el mensaje con un plan de acción de alta velocidad.",
      fbFail: "<strong>Respuesta defensiva o deficiente.</strong> El cliente en crisis requiere soluciones inmediatas y empatía explícita; dar excusas operativas o culpar a terceros destruye la relación comercial."
    },
    {
      step: 3,
      lbl: "// ESCENARIO 3 DE 3 · ACCOUNTABILITY Y GESTIÓN DEL ERROR · 4:30 PM",
      question: "Cometiste un descuido humano real debido a las prisas previas, lo que detuvo el flujo de operaciones. El Director General te confronta directamente frente a tus compañeros en un canal público. Redacta tu respuesta:",
      messages: [
        { sender: "Director General (Canal Público)", avatar: "D", cls: "va-jefa", text: "El reporte diario no se envió a tiempo por un descuido en tu estación de trabajo. Todo el flujo de operaciones está detenido por esto. ¿Qué pasó ahí?" }
      ],
      keywords: {
        good: ['asumo', 'responsabilidad', 'error', 'corrigiendo', 'solución', 'evitar', 'medidas', 'alarma', 'fallo'],
        bad: ['fue culpa de', 'no sabía', 'el sistema', 'estaba lento', 'lo siento mucho', 'traté']
      },
      fbSuccess: "<strong>Alto nivel de Accountability.</strong> Aceptaste la falla con transparencia ejecutiva, detuviste la fricción de buscar excusas y presentaste la estrategia preventiva inmediata.",
      fbFail: "<strong>Bajo Accountability detectado.</strong> Justificar un fallo recurriendo a problemas técnicos genéricos o caer en la victimización emocional debilita severamente tu postura profesional."
    }
  ]
};

function startVsimEngine(templateId) {
  VsimEngine.currentStep = 0;
  VsimEngine.latencies = [];
  VsimEngine.textScores = [];
  VsimEngine.scores = { stability: 0, assertiveness: 0, latency: 0, communication: 0 };
  VsimEngine.timeRemaining = 240;
  
  startClock();
  loadScenario(0);
}

function startClock() {
  if (VsimEngine.timerInterval) clearInterval(VsimEngine.timerInterval);
  const clockNode = document.getElementById('vsim-clock');

  VsimEngine.timerInterval = setInterval(() => {
    VsimEngine.timeRemaining--;
    const mins = Math.floor(VsimEngine.timeRemaining / 60);
    const secs = VsimEngine.timeRemaining % 60;
    clockNode.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (VsimEngine.timeRemaining <= 45) clockNode.classList.add('urgent');

    if (VsimEngine.timeRemaining <= 0) {
      clearInterval(VsimEngine.timerInterval);
      processAndShowReport();
    }
  }, 1000);
}

function loadScenario(index) {
  const db = VsimEngine.chaosDatabase[index];
  if (!db) return;

  document.getElementById('vsim-fb-box').style.display = 'none';
  document.getElementById('vsim-next-btn').style.display = 'none';
  document.getElementById('vsim-step-lbl').textContent = db.lbl;
  document.getElementById('vsim-question').textContent = db.question;

  const feed = document.getElementById('vsim-feed-panel');
  feed.innerHTML = '';

  db.messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'vsim-msg';
    msgDiv.style.display = 'flex';
    msgDiv.style.gap = '10px';
    msgDiv.style.marginBottom = '12px';
    msgDiv.innerHTML = `
      <div class="vsim-avatar ${msg.cls}">${msg.avatar}</div>
      <div class="vsim-bubble">
        <div class="vsim-sender">${msg.sender}</div>
        <div class="vsim-txt ${msg.urgent ? 'urgent' : ''}">${msg.text}</div>
      </div>
    `;
    feed.appendChild(msgDiv);
  });

  const optionsBox = document.getElementById('vsim-options-box');
  optionsBox.innerHTML = '';

  const textarea = document.createElement('textarea');
  textarea.className = 'vsim-textarea';
  textarea.id = 'vsim-text-input';
  textarea.placeholder = "Escribe tu respuesta con tus propias palabras e interactúa directamente en el canal...";
  optionsBox.appendChild(textarea);

  const submitBtn = document.getElementById('vsim-next-btn');
  submitBtn.textContent = "Analizar Patrón de Comunicación";
  submitBtn.style.display = 'inline-flex';

  VsimEngine.stepStartTime = Date.now();
}

function nextVsimStep() {
  const db = VsimEngine.chaosDatabase[VsimEngine.currentStep];
  const textInput = document.getElementById('vsim-text-input');

  if (textInput) {
    const userInput = textInput.value.trim();
    if (userInput.length < 15) {
      alert("⚠️ Tu respuesta es demasiado corta. Ante una crisis real de alta tensión, debes estructurar un argumento válido (mínimo 15 caracteres).");
      return;
    }

    const duration = (Date.now() - VsimEngine.stepStartTime) / 1000;
    VsimEngine.latencies.push(duration);

    evaluateStepText(userInput, db);
    return;
  }

  VsimEngine.currentStep++;

  if (VsimEngine.currentStep >= VsimEngine.chaosDatabase.length) {
    clearInterval(VsimEngine.timerInterval);
    processAndShowReport();
  } else {
    loadScenario(VsimEngine.currentStep);
  }
}

function evaluateStepText(text, scenarioData) {
  const lower = text.toLowerCase();
  let matchesGood = 0;
  let matchesBad = 0;

  scenarioData.keywords.good.forEach(word => {
    if (lower.includes(word)) matchesGood++;
  });

  scenarioData.keywords.bad.forEach(word => {
    if (lower.includes(word)) matchesBad++;
  });

  let stepScore = 40 + (matchesGood * 15) - (matchesBad * 15);
  stepScore = Math.min(100, Math.max(20, stepScore));
  VsimEngine.textScores.push(stepScore);

  if (VsimEngine.currentStep === 0) VsimEngine.scores.assertiveness += stepScore;
  if (VsimEngine.currentStep === 1) {
    VsimEngine.scores.communication += stepScore;
    VsimEngine.scores.stability += Math.round(stepScore * 0.5);
  }
  if (VsimEngine.currentStep === 2) {
    VsimEngine.scores.stability += Math.round(stepScore * 0.8);
    VsimEngine.scores.assertiveness += Math.round(stepScore * 0.2);
  }

  const fbBox = document.getElementById('vsim-fb-box');
  const isSuccess = stepScore >= 65;

  fbBox.className = isSuccess ? "vsim-fb vok" : "vsim-fb vbad";
  document.getElementById('vsim-fb-type').textContent = isSuccess ? "✓ COMPORTAMIENTO EJECUTIVO DETECTADO" : "✕ QUIEBRE SINTÁCTICO / EVASIÓN DE CRISIS";
  document.getElementById('vsim-fb-text').innerHTML = isSuccess ? scenarioData.fbSuccess : scenarioData.fbFail;
  fbBox.style.display = "block";

  const actionPanelOptions = document.getElementById('vsim-options-box');
  actionPanelOptions.innerHTML = `<p style="font-size:13px; color:var(--muted2); font-style:italic; padding-top:10px;">Respuesta registrada y procesada por el motor analítico de SimWork.</p>`;
  
  const nextBtn = document.getElementById('vsim-next-btn');
  nextBtn.textContent = "Aceptar y Avanzar a Siguiente Crisis";
}

function processAndShowReport() {
  const sum = VsimEngine.latencies.reduce((a, b) => a + b, 0);
  const avgLatency = (sum / VsimEngine.latencies.length) || 0;

  const finalAssert = Math.min(100, Math.max(30, Math.round(VsimEngine.scores.assertiveness)));
  const finalStab = Math.min(100, Math.max(30, Math.round(VsimEngine.scores.stability)));
  const finalComm = Math.min(100, Math.max(30, Math.round(VsimEngine.scores.communication / 1.2)));
  const speedPct = Math.min(100, Math.max(20, Math.round(100 - (avgLatency * 1.5))));

  switchTab('report');

  setTimeout(() => {
    document.getElementById('vb-assertiveness').style.width = `${finalAssert}%`;
    document.getElementById('vbp-assertiveness').textContent = `${finalAssert}%`;

    document.getElementById('vb-communication').style.width = `${finalComm}%`;
    document.getElementById('vbp-communication').textContent = `${finalComm}%`;

    document.getElementById('vb-stability').style.width = `${finalStab}%`;
    document.getElementById('vbp-stability').textContent = `${finalStab}%`;

    document.getElementById('vb-latency').style.width = `${speedPct}%`;
    document.getElementById('vbp-latency').textContent = `${speedPct}%`;
  }, 100);

  const qualBox = document.getElementById('vrpt-qual');
  const flagsBox = document.getElementById('vrpt-flags');
  const promedioConductual = (finalAssert + finalStab + finalComm + speedPct) / 4;

  if (promedioConductual >= 65) {
    qualBox.innerHTML = `
      <div class="ab"><strong>Fortaleza Ejecutiva Certificada:</strong> Muestra un control lingüístico excepcional bajo entornos corporativos hostiles. Su redacción libre valida el componente humano del problema y proyecta soluciones directas sin recurrir a excusas o transferir culpas en público.</div>
      <div class="ab" style="border-color:var(--purple)"><strong>Pasaporte SimWork:</strong> Perfil de alta adaptabilidad. Altamente recomendado para posiciones operativas y estratégicas de ritmo acelerado que demanden toma de decisiones autónomas.</div>
    `;
    flagsBox.innerHTML = `
      <span class="fl fok">✓ Criterio de Redacción Calificado</span>
      <span class="fl fok">✓ Accountability en Canales Públicos</span>
      <span class="fl fok">⚡ Latencia de Respuesta: ${avgLatency.toFixed(1)}s promedio</span>
    `;
  } else {
    qualBox.innerHTML = `
      <div class="ab" style="border-color:var(--amber)"><strong>Diagnóstico Conductual:</strong> Al redactar bajo adrenalina, la sintaxis del postulante tiende a la justificación o a evadir la responsabilidad directa (Accountability). Presenta dificultades para negociar prioridades de forma clara frente a figuras de autoridad.</div>
    `;
    flagsBox.innerHTML = `
      <span class="fl fbad">✕ Estilo Defensivo bajo Fricción</span>
      <span class="fl fwarn">⚠ Velocidad de Reacción Inestable (${avgLatency.toFixed(1)}s)</span>
    `;
  }
}

function restartTest() {
  switchTab('candidate');
}