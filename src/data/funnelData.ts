export type ObjectiveId = 'leadership' | 'international_job' | 'salary_raise' | 'meetings';
export type DailyTimeId = '5min' | '10min' | '15min' | '20min';
export type BlockerId = 'fear' | 'speed' | 'vocabulary' | 'pronunciation';

export interface QuizAnswers {
  objective: ObjectiveId | null;
  dailyTime: DailyTimeId | null;
  blocker: BlockerId | null;
}

export interface QuizOption<T extends string> {
  id: T;
  label: string;
  sublabel: string;
  feedback: string;
}

export interface QuizQuestion<T extends string> {
  key: keyof QuizAnswers;
  stepNumber: number;
  kicker: string;
  question: string;
  options: QuizOption<T>[];
}

export const QUIZ_QUESTIONS: [
  QuizQuestion<ObjectiveId>,
  QuizQuestion<DailyTimeId>,
  QuizQuestion<BlockerId>,
] = [
  {
    key: 'objective',
    stepNumber: 1,
    kicker: 'Objetivo profesional',
    question: '¿Qué meta laboral quieres desbloquear primero con tu inglés?',
    options: [
      {
        id: 'leadership',
        label: 'Ascender a un puesto de liderazgo o gerencia',
        sublabel: 'Dirigir equipos regionales y reportar a dirección sin intermediarios.',
        feedback: 'Excelente meta. Priorizaremos vocabulario ejecutivo y toma de decisiones.',
      },
      {
        id: 'international_job',
        label: 'Conseguir empleo en una empresa internacional',
        sublabel: 'Superar entrevistas técnicas y culturales con seguridad desde la primera llamada.',
        feedback: 'Ruta enfocada en entrevistas reales, storytelling profesional y respuestas ágiles.',
      },
      {
        id: 'salary_raise',
        label: 'Negociar un aumento o contrato en dólares',
        sublabel: 'Acceder a bandas salariales globales donde el inglés es requisito.',
        feedback: 'Perfecto. Entrenaremos argumentos de valor, cifras y negociación directa.',
      },
      {
        id: 'meetings',
        label: 'Liderar reuniones y presentaciones sin traductor',
        sublabel: 'Participar en vivo en llamadas con clientes y stakeholders extranjeros.',
        feedback: 'Muy bien. Tu plan atacará la fluidez oral en escenarios de reunión.',
      },
    ],
  },
  {
    key: 'dailyTime',
    stepNumber: 2,
    kicker: 'Disponibilidad diaria',
    question: '¿Cuánto tiempo real puedes invertir al día sin descuidar tu agenda?',
    options: [
      {
        id: '5min',
        label: '5 minutos al día',
        sublabel: 'Micro-sesiones entre juntas o durante tu café de la mañana.',
        feedback: 'Constancia inteligente: 5 minutos diarios mantienen activa tu memoria de trabajo.',
      },
      {
        id: '10min',
        label: '10 minutos al día',
        sublabel: 'Ritmo equilibrado para avanzar de nivel cada semana sin saturarte.',
        feedback: 'El punto óptimo para construir racha profesional sin abandonar a la tercera semana.',
      },
      {
        id: '15min',
        label: '15 minutos al día',
        sublabel: 'Progreso acelerado combinando listening ejecutivo y práctica oral.',
        feedback: 'Ritmo acelerado: notarás soltura al responder desde las primeras 3 semanas.',
      },
      {
        id: '20min',
        label: '20 minutos o más al día',
        sublabel: 'Inmersión intensiva orientada a entrevistas o ascensos inminentes.',
        feedback: 'Modo intensivo activado. Maximizaremos XP y simulaciones de conversación.',
      },
    ],
  },
  {
    key: 'blocker',
    stepNumber: 3,
    kicker: 'Mayor bloqueo al hablar',
    question: '¿Qué es lo que más te frena hoy cuando te toca hablar en inglés?',
    options: [
      {
        id: 'fear',
        label: 'Miedo a equivocarme o quedarme en blanco',
        sublabel: 'Sabes la respuesta en español, pero la presión te bloquea al hablar.',
        feedback: 'Es el bloqueo más común en profesionales capaces. Lo resolveremos sin presión.',
      },
      {
        id: 'speed',
        label: 'Entiendo lo que leo, pero tardo en responder',
        sublabel: 'Traduces mentalmente palabra por palabra y pierdes el ritmo de la junta.',
        feedback: 'Entrenaremos reflejos auditivos y estructuras automáticas para responder al instante.',
      },
      {
        id: 'vocabulary',
        label: 'Me falta vocabulario corporativo de mi área',
        sublabel: 'Dominas frases básicas, pero te quedas corto al explicar proyectos o KPIs.',
        feedback: 'Inyectaremos términos de negocios, métricas y verbos de impacto desde el día 1.',
      },
      {
        id: 'pronunciation',
        label: 'Mi pronunciación me hace sentir inseguro',
        sublabel: 'Evitas tomar la palabra en llamadas grupales por temor a no darte a entender.',
        feedback: 'La práctica guiada de entonación con feedback inmediato eliminará esa inseguridad.',
      },
    ],
  },
];

export interface CareerMilestone {
  week: string;
  title: string;
  detail: string;
  xpTarget: string;
}

export interface CareerProfile {
  profileTitle: string;
  profileTagline: string;
  estimatedWeeks: number;
  dailyXp: number;
  dailyMinutesLabel: string;
  objectiveLabel: string;
  blockerLabel: string;
  blockerDiagnosis: string;
  superFeatureTitle: string;
  superFeatureDetail: string;
  roadmap: CareerMilestone[];
  superBenefits: string[];
}

const OBJECTIVE_DATA: Record<
  ObjectiveId,
  {
    titlePrefix: string;
    label: string;
    week4Goal: string;
    week4Detail: string;
  }
> = {
  leadership: {
    titlePrefix: 'Líder Ejecutivo',
    label: 'Ascenso a liderazgo o gerencia',
    week4Goal: 'Presentación de resultados a dirección',
    week4Detail: 'Defiende métricas, alinea equipos y responde objeciones ejecutivas con claridad.',
  },
  international_job: {
    titlePrefix: 'Talento Global',
    label: 'Empleo en empresa internacional',
    week4Goal: 'Simulación completa de entrevista',
    week4Detail: 'Narra tus logros con método STAR y negocia condiciones sin traducir en tu cabeza.',
  },
  salary_raise: {
    titlePrefix: 'Negociador Estratégico',
    label: 'Aumento salarial o ingresos en USD',
    week4Goal: 'Pitch de valor y negociación salarial',
    week4Detail: 'Cuantifica tu impacto financiero y sostén conversaciones de compensación con seguridad.',
  },
  meetings: {
    titlePrefix: 'Comunicador Ágil',
    label: 'Liderar reuniones y presentaciones',
    week4Goal: 'Facilitación de junta en vivo',
    week4Detail: 'Abre sesiones, modera turnos de palabra y resume acuerdos sin depender de traductores.',
  },
};

const TIME_DATA: Record<
  DailyTimeId,
  {
    weeks: number;
    xp: number;
    label: string;
    rhythmLabel: string;
  }
> = {
  '5min': {
    weeks: 12,
    xp: 20,
    label: '5 min/día',
    rhythmLabel: 'Micro-hábito constante',
  },
  '10min': {
    weeks: 9,
    xp: 35,
    label: '10 min/día',
    rhythmLabel: 'Progreso equilibrado',
  },
  '15min': {
    weeks: 7,
    xp: 50,
    label: '15 min/día',
    rhythmLabel: 'Aceleración ejecutiva',
  },
  '20min': {
    weeks: 5,
    xp: 75,
    label: '20+ min/día',
    rhythmLabel: 'Inmersión intensiva',
  },
};

const BLOCKER_DATA: Record<
  BlockerId,
  {
    titleSuffix: string;
    label: string;
    diagnosis: string;
    superFeatureTitle: string;
    superFeatureDetail: string;
    week1Title: string;
    week1Detail: string;
    week2Title: string;
    week2Detail: string;
  }
> = {
  fear: {
    titleSuffix: 'sin Miedo al Error',
    label: 'Bloqueo por miedo a equivocarse',
    diagnosis:
      'Tu conocimiento pasivo es mayor de lo que crees, pero el temor a cometer errores frente a colegas frena tu participación. Necesitas un entorno seguro con vidas ilimitadas para equivocarte y corregir sin penalización.',
    superFeatureTitle: 'Vidas Ilimitadas + Repaso de Errores',
    superFeatureDetail:
      'Practica escenarios laborales difíciles todas las veces que necesites sin quedarte sin corazones y entiende exactamente por qué falla una frase.',
    week1Title: 'Desbloqueo de confianza oral',
    week1Detail: 'Frases de apertura y cierre para hablar desde el minuto uno sin presión.',
    week2Title: 'Simulaciones con cero penalización',
    week2Detail: 'Repetición guiada de respuestas clave hasta que salgan automáticas.',
  },
  speed: {
    titleSuffix: 'de Respuesta Rápida',
    label: 'Lentitud al procesar y responder',
    diagnosis:
      'Comprendes documentos escritos, pero al hablar traduces mentalmente desde el español. Necesitas bloques de respuesta automática y práctica cronometrada para pensar directo en inglés.',
    superFeatureTitle: 'Desafíos Cronometrados y Práctica Auditiva',
    superFeatureDetail:
      'Entrena tu velocidad de reacción con ejercicios de audio nativo y retos diarios diseñados para eliminar la traducción mental.',
    week1Title: 'Reflejos en inglés sin traducir',
    week1Detail: 'Conectores ejecutivos para ganar tiempo natural mientras ordenas tus ideas.',
    week2Title: 'Comprensión a velocidad real',
    week2Detail: 'Diálogos laborales con acentos internacionales y respuestas en menos de 4 segundos.',
  },
  vocabulary: {
    titleSuffix: 'de Negocios',
    label: 'Falta de vocabulario técnico y corporativo',
    diagnosis:
      'Tu gramática base funciona, pero te quedas sin palabras precisas cuando explicas estrategia, finanzas, producto o liderazgo. Necesitas léxico de alto valor aplicado a contextos reales.',
    superFeatureTitle: 'Mazos Inteligentes de Vocabulario Laboral',
    superFeatureDetail:
      'Repaso espaciado personalizado que prioriza las expresiones corporativas y verbos de impacto que más se usan en reuniones.',
    week1Title: 'Vocabulario núcleo de tu industria',
    week1Detail: 'Dominio de 120 expresiones de proyectos, plazos, métricas y entregables.',
    week2Title: 'Verbos de impacto y reporte',
    week2Detail: 'Sustituye frases básicas por lenguaje ejecutivo preciso en correos y llamadas.',
  },
  pronunciation: {
    titleSuffix: 'de Pronunciación Clara',
    label: 'Inseguridad por pronunciación',
    diagnosis:
      'Tienes buenas ideas para aportar, pero evitas tomar la palabra por dudar de cómo suenan tus vocales y énfasis. Con retroalimentación fonética diaria proyectarás autoridad en cada llamada.',
    superFeatureTitle: 'Entrenador Oral con Reconocimiento Preciso',
    superFeatureDetail:
      'Repite frases clave de negocios con corrección instantánea de ritmo, entonación y claridad sin sentir vergüenza.',
    week1Title: 'Sonidos críticos para hispanohablantes',
    week1Detail: 'Corrige las 8 consonantes y vocales que más afectan la claridad en micrófono.',
    week2Title: 'Entonación y autoridad ejecutiva',
    week2Detail: 'Proyecta seguridad al presentar propuestas o moderar videollamadas.',
  },
};

export function computeCareerProfile(answers: QuizAnswers): CareerProfile {
  const objective = answers.objective ?? 'leadership';
  const dailyTime = answers.dailyTime ?? '15min';
  const blocker = answers.blocker ?? 'speed';

  const obj = OBJECTIVE_DATA[objective];
  const time = TIME_DATA[dailyTime];
  const blk = BLOCKER_DATA[blocker];

  return {
    profileTitle: `${obj.titlePrefix} ${blk.titleSuffix}`,
    profileTagline: `Plan de ${time.label} diseñado para lograr: ${obj.label.toLowerCase()}.`,
    estimatedWeeks: time.weeks,
    dailyXp: time.xp,
    dailyMinutesLabel: time.label,
    objectiveLabel: obj.label,
    blockerLabel: blk.label,
    blockerDiagnosis: blk.diagnosis,
    superFeatureTitle: blk.superFeatureTitle,
    superFeatureDetail: blk.superFeatureDetail,
    roadmap: [
      {
        week: 'Semana 1',
        title: blk.week1Title,
        detail: blk.week1Detail,
        xpTarget: `${time.xp * 7} XP`,
      },
      {
        week: 'Semana 2',
        title: blk.week2Title,
        detail: blk.week2Detail,
        xpTarget: `${time.xp * 7} XP`,
      },
      {
        week: 'Semana 3',
        title: 'Escenarios reales de oficina y correo',
        detail: 'Seguimiento de acuerdos, feedback constructivo y resolución de imprevistos.',
        xpTarget: `${time.xp * 7} XP`,
      },
      {
        week: 'Semana 4',
        title: obj.week4Goal,
        detail: obj.week4Detail,
        xpTarget: `${time.xp * 7} XP`,
      },
    ],
    superBenefits: [
      'Vidas ilimitadas para practicar reuniones difíciles sin interrupciones',
      'Explicación detallada de tus errores para no repetirlos en entrevistas',
      'Práctica personalizada enfocada exactamente en tu bloqueo oral',
      'Cero anuncios: aprovecha cada minuto entre juntas al 100%',
    ],
  };
}

export const PROOF_METRICS = [
  {
    value: '+38%',
    label: 'Banda salarial promedio en puestos bilingües',
  },
  {
    value: '15 min',
    label: 'Sesión diaria suficiente para ganar fluidez real',
  },
  {
    value: '60 seg',
    label: 'Duración del diagnóstico de perfil profesional',
  },
  {
    value: '14 días',
    label: 'Prueba gratuita incluida en Super Duolingo',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Mariana Salgado',
    role: 'Product Manager',
    company: 'Mercado Libre · Ciudad de México',
    before: 'Rechacé dos ascensos a roles regionales porque me paralizaba hablar en las revisiones trimestrales en inglés.',
    outcome: 'En 8 semanas con sesiones de 15 minutos pasé a liderar las demos semanales con producto en EE. UU. y obtuve el ascenso.',
  },
  {
    name: 'Andrés Villalobos',
    role: 'Senior Data Engineer',
    company: 'Globant · Bogotá',
    before: 'Leía documentación sin problema, pero en entrevistas técnicas me trababa y perdía ofertas remotas en dólares.',
    outcome: 'El repaso diario de errores y la práctica oral sin miedo me dieron la soltura para cerrar una oferta 42% mejor pagada.',
  },
  {
    name: 'Camila Echeverría',
    role: 'Regional Finance Lead',
    company: 'Latam Logistics · Santiago',
    before: 'Dependía de resúmenes traducidos y nunca me atrevía a intervenir en llamadas con casa matriz.',
    outcome: 'Con el hábito de 10 minutos antes de iniciar jornada ahora defiendo presupuestos directamente en inglés.',
  },
];
