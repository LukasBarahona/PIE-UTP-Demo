import { dayInChile, demoRecords, protocol, relationships, roles } from './seed.js';
import { cleanRecord, field, requireValue } from './record-rules.js';
import { demoPulseGroups, summarizePulse, validScores } from './pulse-rules.js';

const visitor = { id: 'demo', name: 'Coordinación PIE', email: '', access: 'admin', role: 'pie' };

export function createDemoApi() {
  const records = Object.fromEntries(Object.entries(demoRecords()).map(([kind, items]) =>
    [kind, items.map(item => ({ ...item, version: 1 })).reverse()]));
  const history = new Map();
  let currentProtocol = protocol;
  let pulsePeriod = '';
  let pulseAnswers;
  let submitted = false;

  function climate(method, data) {
    const period = dayInChile().slice(0, 7);
    if (period !== pulsePeriod) {
      pulsePeriod = period;
      pulseAnswers = demoPulseGroups(period);
      submitted = false;
    }
    if (method === 'POST') {
      requireValue(data?.period === period, 'El período cambió. Abre nuevamente la encuesta.', 409);
      requireValue(validScores(data.scores), 'Responde las cuatro preguntas.');
      requireValue(!submitted, 'Ya respondiste el pulso de este período.', 409);
      pulseAnswers.get(period).push([...data.scores]);
      submitted = true;
    }
    return summarizePulse(pulseAnswers, period, true, submitted);
  }

  return (path, { method = 'GET', data } = {}) => {
    if (path === 'session' && method === 'GET') return { user: visitor, demo: true };
    if (path === 'workspace' && method === 'GET') {
      return { roles, relationships, today: dayInChile(), protocol: currentProtocol, ...records };
    }
    if (path === 'climate' && ['GET', 'POST'].includes(method)) return climate(method, data);
    if (path === 'protocol' && method === 'PUT') {
      currentProtocol = field(data?.protocol, 'Protocolo', 6000);
      return { protocol: currentProtocol };
    }

    const route = /^(goals|decisions|agreements)(?:\/([a-z0-9-]+))?$/.exec(path);
    requireValue(route, 'La página solicitada no existe.', 404);
    const [, kind, id] = route;
    const list = records[kind];
    const index = id ? list.findIndex(item => item.id === id) : -1;
    if (id) requireValue(index >= 0, 'El registro ya no está disponible.', 404);
    const previous = list[index];
    if (method === 'GET' && id) return { record: previous, history: history.get(id) ?? [] };

    const existing = id && ['PUT', 'DELETE'].includes(method);
    requireValue(existing || (!id && method === 'POST'), 'La página solicitada no existe.', 404);
    requireValue(data && typeof data === 'object', 'La solicitud no tiene un formato válido.');
    if (existing) requireValue(previous.version === data.version, 'Vuelve a abrir el registro para trabajar con la versión actual.', 409);
    if (method === 'DELETE') {
      list.splice(index, 1);
      history.delete(id);
      return { ok: true };
    }

    const record = cleanRecord(kind, data, previous, visitor, {
      newId: () => crypto.randomUUID(),
      hasDecision: decisionId => records.decisions.some(item => item.id === decisionId)
    });
    record.version = (previous?.version ?? 0) + 1;
    if (previous) list[index] = record;
    else list.unshift(record);
    const event = { actor: visitor.name, action: previous ? 'Actualización' : 'Creación',
      status: record.status, time: new Date().toISOString() };
    history.set(record.id, [event, ...(history.get(record.id) ?? [])].slice(0, 30));
    return { record };
  };
}
