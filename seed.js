export const roles = [
  { id: 'direccion', title: 'Dirección', short: 'Marco institucional', icon: 'building', group: 'Dirección', tone: 'navy', summary: 'Da respaldo institucional a los acuerdos y facilita condiciones para el trabajo pedagógico compartido.', duties: ['Facilitar tiempos y recursos de coordinación.', 'Resolver asuntos que requieren una definición institucional.', 'Dar seguimiento al protocolo de colaboración.'] },
  { id: 'utp', title: 'UTP', short: 'Gestión curricular', icon: 'book', group: 'UTP', tone: 'blue', summary: 'Articula la planificación, la enseñanza y la evaluación con los equipos pedagógicos.', duties: ['Acompañar la planificación y la evaluación.', 'Revisar los criterios curriculares acordados.', 'Coordinar con PIE y el equipo de aula.'] },
  { id: 'pie', title: 'Coordinación PIE', short: 'Gestión de apoyos', icon: 'layers', group: 'PIE', tone: 'violet', summary: 'Coordina los apoyos pedagógicos y su implementación junto a UTP y al equipo de aula.', duties: ['Organizar tiempos y apoyos para la colaboración.', 'Acompañar la diversificación de la enseñanza.', 'Dar seguimiento a los apoyos acordados.'] },
  { id: 'aula', title: 'Equipo de aula', short: 'Planificación · coenseñanza', icon: 'users', group: 'Equipo de aula', tone: 'green', summary: 'Docentes de aula, docentes diferenciales y profesionales de apoyo planifican y revisan estrategias como pares pedagógicos.', duties: ['Planificar en conjunto y acordar estrategias de coenseñanza.', 'Distribuir responsabilidades en la implementación.', 'Revisar evidencias pedagógicas y ajustar prácticas.'] },
  { id: 'docente', title: 'Docente de aula', short: 'Enseñanza y evaluación', icon: 'book', group: 'Pedagógico', tone: 'blue', summary: 'Aporta el conocimiento del curso y conduce la enseñanza junto al equipo de aula.', duties: ['Compartir los objetivos del curso y las barreras observadas.', 'Planificar y evaluar de manera conjunta.', 'Acordar modalidades de coenseñanza.'] },
  { id: 'diferencial', title: 'Docente diferencial', short: 'Diversificación y coenseñanza', icon: 'layers', group: 'Pedagógico', tone: 'green', summary: 'Participa como par pedagógico en la planificación, la enseñanza y la evaluación diversificadas.', duties: ['Proponer apoyos y estrategias de acceso.', 'Implementar y revisar estrategias junto al docente de aula.', 'Coordinar aportes de profesionales de apoyo.'] },
  { id: 'psicologia', title: 'Psicología', short: 'Apoyos socioemocionales', icon: 'users', group: 'Apoyo', tone: 'violet', summary: 'Aporta una perspectiva socioemocional al diseño de apoyos pedagógicos.', duties: ['Orientar estrategias que favorezcan la participación y el bienestar.', 'Acordar apoyos con el equipo de aula y la coordinación.'] },
  { id: 'fonoaudiologia', title: 'Fonoaudiología', short: 'Comunicación y lenguaje', icon: 'users', group: 'Apoyo', tone: 'blue', summary: 'Colabora en estrategias para ampliar las oportunidades de comunicación y participación.', duties: ['Aportar estrategias de comunicación al equipo de aula.', 'Revisar conjuntamente la accesibilidad de las actividades.'] },
  { id: 'trabajo-social', title: 'Trabajo social', short: 'Articulación con familias y redes', icon: 'network', group: 'Apoyo', tone: 'violet', summary: 'Contribuye a la articulación con familias y redes según el trabajo colaborativo acordado.', duties: ['Identificar recursos para favorecer la participación.', 'Coordinar acciones acordadas con el equipo pedagógico.'] }
];

export const relationships = [
  { from: 'direccion', to: 'utp', type: 'coord', label: 'Coordinación institucional' },
  { from: 'direccion', to: 'pie', type: 'coord', label: 'Coordinación institucional' },
  { from: 'utp', to: 'pie', type: 'joint', label: 'Articulación curricular y de apoyos' },
  { from: 'utp', to: 'aula', type: 'coord', label: 'Planificación y evaluación' },
  { from: 'pie', to: 'aula', type: 'coord', label: 'Implementación de apoyos' },
  { from: 'aula', to: 'docente', type: 'team', label: 'Planificación y evaluación' },
  { from: 'aula', to: 'diferencial', type: 'team', label: 'Diversificación y coenseñanza' },
  { from: 'aula', to: 'psicologia', type: 'team', label: 'Participación y bienestar' },
  { from: 'aula', to: 'fonoaudiologia', type: 'team', label: 'Comunicación y lenguaje' },
  { from: 'aula', to: 'trabajo-social', type: 'team', label: 'Familias y redes' }
];

export const types = {
  goals: ['draft', 'active', 'done'],
  decisions: ['draft', 'analysis', 'review', 'approved', 'followup', 'closed'],
  agreements: ['pending', 'active', 'done']
};

export const protocol = 'Acordamos planificar conjuntamente, reconocer las competencias de cada profesional y registrar quién propone, participa, valida y realiza el seguimiento. Ante un desacuerdo, explicitamos los criterios pedagógicos, convocamos a los roles involucrados y dejamos constancia de la decisión y su fecha de revisión.';

export function dayInChile(offset = 0) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offset);
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Santiago', dateStyle: 'short' }).format(date);
}

export function demoRecords() {
  return {
    goals: [
      { id: 'meta-1', title: 'Fortalecer la planificación conjunta', description: 'Acordar un bloque de planificación y registrar una pauta compartida por equipo.', status: 'active', owner: 'aula', due: dayInChile(18), progress: 65 },
      { id: 'meta-2', title: 'Diversificar las evaluaciones', description: 'Probar criterios comunes de diversificación y revisar su aplicación.', status: 'active', owner: 'utp', due: dayInChile(25), progress: 35 },
      { id: 'meta-3', title: 'Acordar los roles de coenseñanza', description: 'Revisar las responsabilidades con los equipos de aula.', status: 'done', owner: 'pie', due: dayInChile(-3), progress: 100 }
    ],
    decisions: [
      { id: 'decision-1', title: 'Criterios para diversificar evaluaciones', description: 'Revisar alternativas de acceso y formas de demostrar aprendizajes en una planificación compartida.', status: 'review', owner: 'aula', participants: ['pie', 'aula'], validator: 'utp', followup: 'pie', communication: 'Presentar el acuerdo en la próxima reunión pedagógica.', due: dayInChile(4) },
      { id: 'decision-2', title: 'Bloque de coordinación PIE y UTP', description: 'Revisar la disponibilidad del equipo y definir un bloque de coordinación regular.', status: 'approved', owner: 'pie', participants: ['utp', 'pie'], validator: 'direccion', followup: 'utp', communication: 'Registrar el horario en el calendario de coordinación.', due: dayInChile(11) },
      { id: 'decision-3', title: 'Pauta común de coenseñanza', description: 'Preparar una pauta breve para distribuir responsabilidades durante la clase.', status: 'draft', owner: 'aula', participants: ['pie'], validator: 'utp', followup: 'aula', communication: '', due: dayInChile(15) }
    ],
    agreements: [
      { id: 'acuerdo-1', title: 'Revisar pauta de coenseñanza', description: 'Compartir comentarios sobre la distribución de responsabilidades.', status: 'active', owner: 'pie', due: dayInChile(2), decisionId: 'decision-3' },
      { id: 'acuerdo-2', title: 'Consolidar criterios de evaluación', description: 'Preparar ejemplos de aplicación para la reunión pedagógica.', status: 'pending', owner: 'utp', due: dayInChile(5), decisionId: 'decision-1' },
      { id: 'acuerdo-3', title: 'Preparar la próxima reunión de aula', description: 'Priorizar temas y compartir la pauta antes de la sesión.', status: 'pending', owner: 'aula', due: dayInChile(9), decisionId: '' },
      { id: 'acuerdo-4', title: 'Registrar horario de coordinación', description: 'Incorporar el bloque en el calendario compartido.', status: 'done', owner: 'utp', due: dayInChile(-2), decisionId: 'decision-2' }
    ]
  };
}
