import { roles, types } from './seed.js';

const roleIds = roles.map(({ id }) => id);

export class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
export function requireValue(condition, message, status = 400) {
  if (!condition) throw new RequestError(status, message);
}
export function field(value, label, max, required = true) {
  requireValue(typeof value === 'string' && value.trim().length <= max && (!required || value.trim()),
    'Revisa el campo «' + label + '».');
  return value.trim();
}
export function validRole(value, label) {
  requireValue(roleIds.includes(value), 'Selecciona un rol en «' + label + '».');
  return value;
}
function validDate(value) {
  requireValue(typeof value === 'string' && /^(20[0-9]{2})-[0-9]{2}-[0-9]{2}$/.test(value),
    'Ingresa una fecha válida.');
  const date = new Date(value);
  requireValue(!Number.isNaN(+date) && date.toISOString().slice(0, 10) === value, 'Ingresa una fecha válida.');
  return value;
}

export function cleanRecord(kind, input, old, user, { newId, hasDecision }) {
  requireValue(types[kind].includes(input.status), 'Selecciona un estado válido.');
  const result = {
    id: old?.id ?? newId(),
    title: field(input.title, 'Título', 120),
    description: field(input.description ?? '', 'Descripción', 2500, false),
    owner: validRole(input.owner, 'Responsable'),
    status: input.status,
    due: validDate(input.due)
  };
  if (kind === 'goals') {
    requireValue(Number.isInteger(input.progress) && input.progress >= 0 && input.progress <= 100, 'El avance debe estar entre 0 y 100.');
    requireValue(input.status === 'done' || input.progress < 100, 'Marca la meta como lograda para guardar un 100 % de avance.');
    result.progress = input.status === 'done' ? 100 : input.progress;
  }
  if (kind === 'decisions') {
    result.validator = validRole(input.validator, 'Valida');
    result.followup = validRole(input.followup, 'Seguimiento');
    requireValue(Array.isArray(input.participants) && input.participants.length > 0 &&
      input.participants.length <= roleIds.length && input.participants.every(role => roleIds.includes(role)),
    'Selecciona al menos un rol participante.');
    result.participants = [...new Set(input.participants)];
    result.communication = field(input.communication ?? '', 'Comunicación', 700, false);
    if (old?.status === 'review' && old.validator !== result.validator) {
      requireValue(user.access === 'admin' || user.role === old.validator,
        'La administración o el rol validador puede reasignar la validación de una propuesta en revisión.', 403);
    }
    const finalStates = ['approved', 'followup', 'closed'];
    if (finalStates.includes(input.status) || finalStates.includes(old?.status)) {
      requireValue(user.access === 'admin' || user.role === (old?.validator ?? result.validator),
        'El rol validador o la administración puede cambiar una decisión aprobada o cerrada.', 403);
      requireValue(user.access === 'admin' || !old || old.validator === result.validator,
        'La administración puede reasignar la validación de una decisión aprobada o cerrada.', 403);
    }
    if (input.status === 'approved' && old?.status !== 'approved') {
      requireValue(['review', 'followup', 'closed'].includes(old?.status), 'Envía la propuesta a revisión antes de validarla.');
    }
    if (input.status === 'followup') {
      requireValue(['approved', 'followup'].includes(old?.status), 'Valida la decisión antes de iniciar el seguimiento.');
    }
    if (input.status === 'closed' && old?.status !== 'closed') {
      requireValue(['approved', 'followup'].includes(old?.status), 'Valida la decisión antes de cerrarla.');
    }
  }
  if (kind === 'agreements') {
    result.decisionId = field(input.decisionId ?? '', 'Decisión vinculada', 80, false);
    result.source = field(input.source ?? '', 'Origen o reunión', 120, false);
    result.evidence = field(input.evidence ?? '', 'Enlace a evidencia', 1000, false);
    if (result.evidence) {
      let url;
      try { url = new URL(result.evidence); } catch { /* The validation below handles malformed URLs. */ }
      requireValue(url?.protocol === 'https:' && !url.username && !url.password, 'Ingresa un enlace HTTPS válido.');
      result.evidence = url.href;
    }
    if (result.decisionId && result.decisionId !== old?.decisionId) {
      requireValue(hasDecision(result.decisionId),
        'La decisión elegida ya no está disponible.');
    }
  }
  return result;
}
