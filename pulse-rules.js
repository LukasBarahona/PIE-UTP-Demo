const dimensions = [
  { id: 'recognition', title: 'Reconocimiento profesional', question: 'Se reconocen los aportes pedagógicos de cada profesional.' },
  { id: 'clarity', title: 'Claridad de roles', question: 'Tengo claridad sobre quién propone, participa y valida las decisiones.' },
  { id: 'communication', title: 'Comunicación efectiva', question: 'Recibo a tiempo la información para coordinar mi trabajo.' },
  { id: 'trust', title: 'Confianza entre equipos', question: 'Puedo plantear dudas o desacuerdos en un clima de respeto.' }
];
const minimum = 5;

export function demoPulseGroups(period) {
  const prior = new Date(period + '-01T12:00:00Z');
  prior.setUTCMonth(prior.getUTCMonth() - 1);
  const previous = prior.toISOString().slice(0, 7);
  return new Map([
    [previous, [[4, 3, 3, 4], [4, 4, 4, 4], [3, 3, 4, 4], [4, 2, 4, 4], [5, 4, 5, 4], [4, 3, 4, 3]]],
    [period, [[5, 4, 4, 4], [4, 3, 5, 5], [5, 4, 5, 4], [4, 3, 4, 4], [5, 4, 5, 5], [4, 3, 4, 4], [5, 4, 4, 4], [4, 4, 5, 5]]]
  ]);
}

export function summarizePulse(groups, period, demo, submitted) {
  if (!groups.has(period)) groups.set(period, []);
  const results = [...groups].filter(([month, rows]) => month === period || rows.length >= minimum)
    .sort(([a], [b]) => b.localeCompare(a)).slice(0, 6).map(([month, rows]) => {
      if (rows.length < minimum || (month === period && !demo)) return { period: month, ready: false };
      const scores = dimensions.map((_, index) =>
        Math.round(rows.reduce((sum, row) => sum + (row[index] - 1) * 25, 0) / rows.length));
      return { period: month, ready: true, responses: rows.length, scores,
        index: Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) };
    });
  return { period, dimensions, minimum, results, submitted };
}

export function validScores(scores) {
  return Array.isArray(scores) && scores.length === dimensions.length &&
    scores.every(score => Number.isInteger(score) && score >= 1 && score <= 5);
}
