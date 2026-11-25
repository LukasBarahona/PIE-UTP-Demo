const icons = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/>',
  map: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4m-6 4v-4h12v4"/>',
  goal: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  decision: '<path d="M6 4v11m0-6c0 5 12 5 12 10"/><circle cx="6" cy="4" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="20" r="2"/>',
  check: '<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V3h6v2m-6 8 2 2 4-4"/>',
  shield: '<path d="M12 22s7-3 7-10V5l-7-3-7 3v7c0 7 7 10 7 10Z"/><path d="m9 12 2 2 4-4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  expand: '<path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"/>',
  calendar: '<rect x="4" y="6" width="16" height="15" rx="2"/><path d="M8 3v6m8-6v6M4 11h16"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 6-2 6-2 8h16c0-2-2-2-2-8m-8 12a2 2 0 0 0 4 0"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h.01M15 7h.01M9 11h.01m5.99 0h.01M10 21v-5h4v5"/>',
  book: '<path d="M4 4h5a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4zM20 4h-5a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h5z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2m1-15a3 3 0 0 1 0 6m5 9v-2a5 5 0 0 0-4-5"/>',
  network: '<path d="m8 7 8 3M8 8l3 9m6-4-5 4"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="11" r="3"/><circle cx="11" cy="19" r="3"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.4-6.4L17 7M7 17l-1.4 1.4m12.8 0L17 17M7 7 5.6 5.6"/><circle cx="12" cy="12" r="7"/>',
  logout: '<path d="M10 4H5v16h5m4-12 4 4-4 4m-5-4h9"/>',
  edit: '<path d="m14 6 4 4M4 20l4-1 12-12-4-4L4 15z"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2 6m2-12v6h-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  tick: '<path d="m5 12 4 4L19 6"/>',
  chart: '<path d="M4 4v16h16M8 15v2m4-5v5m4-9v9m4-12v12"/>'
};
const icon = (name, className = '') => '<svg aria-hidden="true" class="icon ' + className +
  '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
  icons[name] + '</svg>';
const html = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const app = document.querySelector('#app');
const dialog = document.querySelector('#dialog');
const toastRegion = document.querySelector('#toast');
const label = {
  draft: 'Borrador', active: 'En curso', done: 'Completado',
  analysis: 'Análisis', review: 'Revisión conjunta', approved: 'Validada', followup: 'Seguimiento', closed: 'Cerrada', pending: 'Pendiente'
};
const screens = {
  home: { title: 'Inicio', icon: 'home' },
  map: { title: 'Mapa de roles', icon: 'map' },
  goals: { title: 'Metas compartidas', icon: 'goal' },
  decisions: { title: 'Decisiones curriculares', icon: 'decision' },
  agreements: { title: 'Acuerdos', icon: 'check' },
  climate: { title: 'Clima de colaboración', icon: 'chart' },
  protocol: { title: 'Protocolo', icon: 'shield' },
  settings: { title: 'Configuración', icon: 'settings' }
};
const models = {
  goals: { name: 'meta', title: 'Nueva meta', statuses: ['draft', 'active', 'done'], default: 'active', empty: 'Aún no hay metas compartidas.', intro: 'Define objetivos comunes y registra el avance de los equipos.' },
  decisions: { name: 'decisión', title: 'Nueva decisión', statuses: ['draft', 'analysis', 'review', 'approved', 'followup', 'closed'], default: 'draft', empty: 'Aún no hay decisiones registradas.', intro: 'Da seguimiento a las propuestas y deja claro quién participa y valida.' },
  agreements: { name: 'acuerdo', title: 'Nuevo acuerdo', statuses: ['pending', 'active', 'done'], default: 'pending', empty: 'Aún no hay acuerdos registrados.', intro: 'Convierte las decisiones y reuniones en compromisos con responsables y fechas.' }
};
const state = { user: null, demo: false, data: null, page: 'home', mapMode: 'board', lines: 'all', roleGroup: '', filters: {}, users: null, climate: null, pulsePeriod: '' };
let toastTimer, dialogReturn, recordRequest = 0;
const role = id => state.data.roles.find(entry => entry.id === id);
const today = () => state.data.today;
const normalize = value => String(value ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
const formattedDate = (value, options = { day: 'numeric', month: 'short' }) => new Intl.DateTimeFormat('es-CL',
  { ...options, timeZone: 'UTC' }).format(new Date(value + 'T12:00:00Z'));
const isOpen = ({ status }) => status !== 'done' && status !== 'closed';
const dueDifference = due => Math.round((Date.parse(due) - Date.parse(today())) / 86400000);
const dueText = due => {
  const days = dueDifference(due);
  if (days < 0) return 'Vencido';
  if (days === 0) return 'Hoy';
  if (days === 1) return 'Mañana';
  return formattedDate(due);
};
const initials = name => name.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
const statusName = (kind, status) => {
  if (kind === 'goals' && status === 'done') return 'Lograda';
  if (kind === 'decisions' && status === 'draft') return 'Solicitud';
  return label[status];
};
const pill = (kind, status) => '<span class="pill status-' + status + '">' + statusName(kind, status) + '</span>';

const publicDemo = document.documentElement.hasAttribute('data-public-demo');
const demoApi = publicDemo ? import('./demo-api.js').then(({ createDemoApi }) => createDemoApi()) : null;

async function api(path, options = {}) {
  if (demoApi) return (await demoApi)(path, options);
  const response = await fetch('/api/' + path, {
    method: options.method ?? 'GET',
    headers: options.data === undefined ? {} : { 'Content-Type': 'application/json' },
    body: options.data === undefined ? undefined : JSON.stringify(options.data)
  });
  const body = await response.json();
  if (!response.ok) {
    if (response.status === 401 && state.user && !state.demo) {
      closeDialog();
      state.user = null;
      state.data = null;
      state.users = null;
      state.climate = null;
      state.pulsePeriod = '';
      state.filters = {};
      renderLogin('La sesión terminó. Vuelve a ingresar.');
    }
    throw new Error(body.error);
  }
  return body;
}

function toast(message) {
  clearTimeout(toastTimer);
  toastRegion.textContent = message;
  toastRegion.classList.add('visible');
  toastTimer = setTimeout(() => toastRegion.classList.remove('visible'), 3600);
}

function brand() {
  return '<span class="brand-logo"><img src="./favicon.svg" alt="" width="36" height="36"></span><span><strong>Conecta</strong><small>PIE–UTP</small></span>';
}
function go(page, changes = {}) {
  if (changes.filters) state.filters[page] = changes.filters;
  closeDialog(false);
  if (location.hash !== '#' + page) {
    history.pushState(null, '', '#' + page);
  }
  state.page = page;
  render();
  document.querySelector('#contenido').focus({ preventScroll: true });
  window.scrollTo(0, 0);
  if (page === 'settings') refreshUsers();
  if (page === 'climate') refreshClimate();
}
function navLink(id) {
  const item = screens[id];
  return '<a class="nav-link' + (state.page === id ? ' selected' : '') + '" href="#' + id + '" data-nav="' + id + '"' +
    (state.page === id ? ' aria-current="page"' : '') + '>' + icon(item.icon) + html(item.title) + '</a>';
}
function button(text, glyph, action, variant = 'secondary') {
  return '<button class="button ' + variant + '" type="button" ' + action + '>' +
    (glyph ? icon(glyph) : '') + html(text) + '</button>';
}
function iconButton(text, glyph, action) {
  return '<button class="icon-button" type="button" aria-label="' + html(text) + '" title="' + html(text) + '" ' +
    action + '>' + icon(glyph) + '</button>';
}
function topbar() {
  return '<header class="topbar"><div class="breadcrumb"><span>Espacio de trabajo</span>' + icon('chevron') +
    '<strong>' + screens[state.page].title + '</strong></div><div class="top-actions">' +
    '<button class="search-trigger" type="button" data-action="search" aria-label="Buscar">' + icon('search') +
    '<span>Buscar</span><kbd>⌘ / Ctrl K</kbd></button>' +
    iconButton('Ver recordatorios', 'bell', 'data-action="reminders"') + '</div></header>';
}
function side() {
  const links = ['home', 'map', 'goals', 'decisions', 'agreements', 'climate'].map(navLink).join('') +
    '<div class="nav-divider"></div>' + navLink('protocol');
  return '<aside class="sidebar"><a class="brand" href="#home" data-nav="home" aria-label="Conecta PIE–UTP, inicio">' + brand() +
    '</a><nav class="desktop-navigation" aria-label="Navegación principal">' +
    links + '</nav><details class="mobile-navigation"><summary>' + icon('list') + ' Menú</summary><nav aria-label="Navegación principal">' +
    links + (state.demo ? '' : '<div class="nav-divider"></div>' + navLink('settings') +
      '<button class="nav-link mobile-logout" type="button" data-action="logout">' + icon('logout') + 'Cerrar sesión</button>') +
    '</nav></details><div class="sidebar-bottom">' +
    (state.demo ? '<div class="demo-tag" title="Demostración con datos ficticios"><i aria-hidden="true"></i>' +
      '<span class="demo-long">Demostración</span><span class="demo-short">Demo</span></div>' : navLink('settings')) +
    '<div class="profile' + (state.demo ? ' demo-profile' : '') + '"><span class="avatar">' + html(initials(state.user.name)) + '</span><span class="profile-name"><strong>' +
    html(state.user.name) + '</strong><small>' + html(state.demo ? 'Datos ficticios' : role(state.user.role)?.title ?? '') +
    '</small></span>' + (state.demo ? '' : iconButton('Cerrar sesión', 'logout', 'data-action="logout"')) + '</div></div></aside>';
}
function render() {
  if (!state.data) return;
  document.title = screens[state.page].title + ' · Conecta PIE–UTP';
  const content = state.page === 'home' ? home() : state.page === 'map' ? mapScreen() :
    state.page === 'protocol' ? protocolScreen() : state.page === 'settings' ? settingsScreen() :
      state.page === 'climate' ? climateScreen() : recordScreen(state.page);
  app.innerHTML = '<div class="shell">' + side() + '<div class="workspace">' + topbar() +
    '<main id="contenido" tabindex="-1">' +
    (publicDemo ? '<p class="public-demo-note"><strong>Demo pública.</strong> Datos ficticios. Los cambios de prueba se reinician al recargar.</p>' : '') +
    content + '</main></div></div>';
}

function pageHeading(title, subtitle, action = '') {
  return '<div class="page-heading"><div><h1>' + html(title) + '</h1><p>' + html(subtitle) +
    '</p></div>' + action + '</div>';
}

function home() {
  const data = state.data;
  const pending = data.agreements.filter(isOpen).sort((a, b) => a.due.localeCompare(b.due));
  const figures = [
    { kind: 'goals', count: data.goals.filter(item => item.status === 'active').length, title: 'Metas en curso', glyph: 'goal', tone: 'green', status: 'active' },
    { kind: 'decisions', count: data.decisions.filter(item => item.status === 'review').length, title: 'Decisiones en revisión', glyph: 'decision', tone: 'violet', status: 'review' },
    { kind: 'agreements', count: pending.length, title: 'Acuerdos abiertos', glyph: 'check', tone: 'blue', status: 'open' }
  ];
  return '<section class="hero" aria-labelledby="home-title"><div><p class="hero-date">' + icon('calendar') +
    html(formattedDate(today(), { weekday: 'long', day: 'numeric', month: 'long' })) + '</p><h1 id="home-title">Panel de colaboración</h1>' +
    '<p class="hero-description">Coordina el trabajo pedagógico entre PIE, UTP y el equipo de aula.</p></div></section>' +
    '<section class="stats" aria-label="Resumen del trabajo">' + figures.map(figure => '<button class="stat" type="button" data-scope="' +
      figure.kind + '" data-status="' + figure.status + '"><span class="tile ' + figure.tone + '">' + icon(figure.glyph) +
      '</span><span><strong>' + figure.count + '</strong><small>' + figure.title + '</small></span>' + icon('chevron', 'stat-chevron') +
      '</button>').join('') + '</section><div class="home-grid">' + mapPanel(true) +
    '<section class="panel upcoming" aria-labelledby="upcoming-title"><div class="panel-head"><h2 id="upcoming-title">Próximos compromisos</h2></div>' +
    '<div class="upcoming-list">' + (pending.length ? pending.slice(0, 4).map(upcomingItem).join('') :
      '<p class="quiet empty-small">No hay acuerdos pendientes.</p>') + '</div><div class="panel-footer">' +
    '<a href="#agreements" data-nav="agreements" class="text-link">Ver todos los acuerdos' + icon('chevron') + '</a></div></section></div>';
}

function upcomingItem(item) {
  const late = dueDifference(item.due) < 0;
  return '<button class="upcoming-item" type="button" data-record="' + html(item.id) + '" data-kind="agreements">' +
    '<span class="tile ' + role(item.owner).tone + '">' + icon(role(item.owner).icon) + '</span><span class="upcoming-copy"><strong>' +
    html(item.title) + '</strong><small>' + html(role(item.owner).title) + '</small></span><span class="due ' +
    (late ? 'late' : '') + '">' + html(dueText(item.due)) + '</span></button>';
}

function mapScreen() {
  return pageHeading('Mapa de roles', 'Explora responsabilidades y relaciones de colaboración.') + mapPanel(false);
}
function mapPanel(compact) {
  const area = compact || state.mapMode === 'board' ? board(compact) : roleList();
  return '<section class="panel map-panel' + (compact ? ' compact' : '') + '" aria-label="Pizarra de colaboración">' +
    '<div class="panel-head"><div><h2>' + (compact ? 'Mapa de colaboración' : 'Pizarra de colaboración') +
    '</h2><p>Selecciona un rol para ver sus responsabilidades.</p></div>' +
    (compact ? iconButton('Ampliar mapa', 'expand', 'data-nav="map"') :
      '<div class="segmented" aria-label="Vista del mapa">' +
      '<button type="button" data-map-mode="board" aria-pressed="' + (state.mapMode === 'board') + '">' + icon('network') + ' Pizarra</button>' +
      '<button type="button" data-map-mode="list" aria-pressed="' + (state.mapMode === 'list') + '">' + icon('list') + ' Lista</button></div>') +
    '</div>' + (!compact && state.mapMode === 'board' ? '<div class="map-toolbar"><label>Mostrar relaciones <select id="line-filter">' +
      '<option value="all"' + (state.lines === 'all' ? ' selected' : '') + '>Todas</option>' +
      '<option value="joint"' + (state.lines === 'joint' ? ' selected' : '') + '>Articulación PIE–UTP</option>' +
      '<option value="coord"' + (state.lines === 'coord' ? ' selected' : '') + '>Coordinación</option></select></label>' +
      button('Ver perfiles del equipo', 'users', 'data-map-mode="list" data-role-group="team"', 'ghost') + '</div>' : '') +
    area + '<div class="map-footer"><div class="legend"><span><i></i> Coordinación</span><span><i class="joint"></i> Articulación PIE–UTP</span></div>' +
    '<span class="map-note">Esquema de ejemplo</span></div></section>';
}
function board(compact) {
  const lines = compact ? 'all' : state.lines;
  return '<div class="board-wrap"><div class="board-scroll"><div class="board" data-lines="' + lines + '">' +
    '<svg class="connections" viewBox="0 0 600 310" preserveAspectRatio="none" aria-hidden="true">' +
    '<path class="coord" d="M300 59v15q0 10-10 10H136q-10 0-10 10v45M300 59v15q0 10 10 10h154q10 0 10 10v45M126 173v34q0 10 10 10h154q10 0 10 10v39M474 173v34q0 10-10 10H310q-10 0-10 10v39"/>' +
    '<path class="joint" d="M204 145h192"/><circle class="coord-end" cx="126" cy="112" r="3"/><circle class="coord-end" cx="474" cy="112" r="3"/>' +
    '<circle class="coord-end" cx="300" cy="236" r="3"/></svg>' +
    (lines === 'coord' ? '' : '<span class="joint-caption">Trabajo conjunto</span>') +
    state.data.roles.filter(entry => ['direccion', 'utp', 'pie', 'aula'].includes(entry.id)).map(entry => '<button class="map-node node-' + entry.id + '" type="button" data-role="' + entry.id +
      '"><span class="tile ' + entry.tone + '">' + icon(entry.icon) + '</span><span><strong>' +
      html(entry.title) + '</strong><small>' + html(entry.short) + '</small></span></button>').join('') +
    '</div></div></div>';
}
function roleList() {
  const groupMatches = entry => !state.roleGroup || (state.roleGroup === 'team' ?
    ['Pedagógico', 'Apoyo'].includes(entry.group) : state.roleGroup === 'gestion' ?
      !['Pedagógico', 'Apoyo'].includes(entry.group) : state.roleGroup === entry.group);
  return '<div class="map-toolbar"><label>Mostrar perfiles <select id="role-group">' +
    option('', 'Todos', state.roleGroup) + option('gestion', 'Gestión y coordinación', state.roleGroup) +
    option('Pedagógico', 'Pedagógico', state.roleGroup) + option('Apoyo', 'Apoyo', state.roleGroup) +
    option('team', 'Perfiles del equipo de aula', state.roleGroup) + '</select></label></div>' +
    '<div class="role-list">' + state.data.roles.filter(groupMatches).map(entry => '<button type="button" class="role-card" data-role="' + entry.id +
    '"><span class="tile ' + entry.tone + '">' + icon(entry.icon) + '</span><span><strong>' + html(entry.title) +
    '</strong><small>' + html(entry.summary) + '</small></span>' + icon('chevron') + '</button>').join('') + '</div>';
}

function roleDialog(id) {
  const entry = role(id);
  const related = state.data.relationships.filter(link => link.from === id || link.to === id);
  const entries = [['Función pedagógica', '<p>' + html(entry.summary) + '</p>'],
    ['Responsabilidades', '<ul>' + entry.duties.map(duty => '<li>' + html(duty) + '</li>').join('') + '</ul>'],
    ['Vínculos de trabajo', '<div class="link-stack">' + related.map(link => {
      const other = role(link.from === id ? link.to : link.from);
      return '<button class="role-card" type="button" data-role="' + other.id + '"><span class="tile ' + other.tone + '">' +
        icon(other.icon) + '</span><span><strong>' + html(other.title) + '</strong><small>' + html(link.label) + '</small></span>' +
        icon('chevron') + '</button>';
    }).join('') + '</div>']];
  modal(entry.title, '<div class="role-detail-tag"><span class="tile ' + entry.tone + '">' + icon(entry.icon) + '</span>' +
    html(entry.short) + '</div>' + entries.map(([title, body]) => '<section class="detail-section"><h3>' + title + '</h3>' + body +
      '</section>').join('') + '<div class="dialog-actions">' + button('Ver acuerdos del rol', 'check',
      'data-scope="agreements" data-owner="' + id + '"', 'primary') + '</div>');
}

function defaultFilters(kind) {
  return state.filters[kind] ??= { query: '', status: '', owner: '', sort: 'due' };
}
function option(value, title, current) {
  return '<option value="' + html(value) + '"' + (current === value ? ' selected' : '') + '>' + html(title) + '</option>';
}
function roleOptions(current) {
  return state.data.roles.map(entry => option(entry.id, entry.title, current)).join('');
}
function recordScreen(kind) {
  const model = models[kind];
  const filter = defaultFilters(kind);
  return pageHeading(screens[kind].title, model.intro, button(model.title, 'plus', 'data-new="' + kind + '"', 'primary')) +
    recordSummary(kind, filter.status) + '<section class="panel record-panel" aria-label="' + screens[kind].title + '"><div class="filters" data-filter-kind="' + kind + '">' +
    '<label class="field-search">' + icon('search') + '<span class="sr-only">Buscar por título</span><input type="search" placeholder="Buscar por título" data-filter="query" value="' + html(filter.query) + '"></label>' +
    '<label><span class="sr-only">Estado</span><select data-filter="status">' + option('', 'Todos los estados', filter.status) +
    (kind === 'agreements' ? option('open', 'Acuerdos abiertos', filter.status) : '') +
    model.statuses.map(status => option(status, statusName(kind, status), filter.status)).join('') + '</select></label>' +
    '<label><span class="sr-only">Responsable</span><select data-filter="owner">' + option('', 'Todos los roles', filter.owner) +
    roleOptions(filter.owner) + '</select></label><label class="sort"><span class="sr-only">Orden</span><select data-filter="sort">' +
    option('due', 'Por fecha', filter.sort) + option('recent', 'Más recientes', filter.sort) + '</select></label></div>' +
    '<div id="record-results">' + recordRows(kind) + '</div></section>';
}
function recordSummary(kind, selected) {
  const items = state.data[kind];
  const statuses = kind === 'decisions' ? models[kind].statuses.slice(0, -1) : models[kind].statuses;
  return '<div class="summary-strip" aria-label="' + (kind === 'decisions' ? 'Etapas de la decisión' : 'Resumen por estado') +
    '">' + statuses.map(status => '<button type="button" class="summary-item" data-summary="' + kind + '" data-status="' + status +
    '" aria-pressed="' + (selected === status) + '">' + pill(kind, status) + '<strong>' + items.filter(item => item.status === status).length +
    '</strong></button>').join('') + '</div>';
}
function filteredRecords(kind) {
  const filter = defaultFilters(kind);
  const query = normalize(filter.query);
  const results = state.data[kind].filter(item =>
    (!filter.owner || item.owner === filter.owner) &&
    (!filter.status || (filter.status === 'open' ? isOpen(item) : item.status === filter.status)) &&
    normalize(item.title).includes(query));
  if (filter.sort === 'due') results.sort((a, b) => a.due.localeCompare(b.due));
  return results;
}
function recordRows(kind) {
  const records = filteredRecords(kind);
  const base = state.data[kind];
  if (!records.length) {
    return '<div class="empty"><span class="tile">' + icon(screens[kind].icon) + '</span><h2>' +
      (base.length ? 'No encontramos coincidencias' : models[kind].empty) + '</h2>' +
      (base.length ? button('Limpiar filtros', null, 'data-clear="' + kind + '"') :
        button(models[kind].title, 'plus', 'data-new="' + kind + '"', 'primary')) + '</div>';
  }
  return '<ul class="record-rows" aria-label="Resultados">' + records.map(item => {
    const owner = role(item.owner);
    const late = isOpen(item) && (kind !== 'decisions' || item.status !== 'approved') && dueDifference(item.due) < 0;
    return '<li><button type="button" class="record-row" data-kind="' + kind + '" data-record="' + html(item.id) +
      '"><span class="tile ' + owner.tone + '">' + icon(screens[kind].icon) + '</span><span class="row-title"><strong>' +
      html(item.title) + '</strong><small>' + html(owner.title) + '</small></span>' +
      (kind === 'goals' ? '<span class="row-progress"><progress max="100" value="' + item.progress + '" aria-label="Avance"></progress><small>' +
        item.progress + '%</small></span>' : '') + '<span class="row-meta">' + pill(kind, item.status) +
      '<span class="row-date' + (late ? ' late' : '') + '">' + icon('calendar') + html(formattedDate(item.due)) + '</span></span>' +
      icon('chevron', 'row-chevron') + '</button></li>';
  }).join('') + '</ul><p class="results-count" aria-live="polite">' + records.length + (records.length === 1 ? ' registro' : ' registros') + '</p>';
}

function modal(title, body, wide = false, focus = '') {
  if (!dialog.open) dialogReturn = document.activeElement;
  dialog.classList.toggle('wide', wide);
  dialog.innerHTML = '<div class="dialog-head"><h2 id="dialog-title">' + html(title) + '</h2>' +
    iconButton('Cerrar', 'close', 'data-action="close"') + '</div><div class="dialog-body">' + body + '</div>';
  if (!dialog.open) dialog.showModal();
  (focus ? dialog.querySelector(focus) : dialog.querySelector('[data-action="close"]'))?.focus();
}
function closeDialog(restore = true) {
  recordRequest += 1;
  if (!dialog.open) return;
  dialog.close();
  if (restore && dialogReturn?.isConnected) dialogReturn.focus();
}
dialog.addEventListener('cancel', event => {
  event.preventDefault();
  closeDialog();
});

async function showRecord(kind, id) {
  const request = ++recordRequest;
  modal(screens[kind].title, '<p role="status">Cargando registro…</p>');
  try {
    const { record, history: events } = await api(kind + '/' + id);
    if (request !== recordRequest || !dialog.open) return;
    const isFinal = kind === 'decisions' && ['approved', 'followup', 'closed'].includes(record.status);
    const editable = !isFinal || state.user.access === 'admin' || state.user.role === record.validator;
    const detail = (name, value) => '<div><dt>' + name + '</dt><dd>' + html(value) + '</dd></div>';
    const additional = {
      goals: detail('Avance', record.progress + ' %'),
      decisions: kind === 'decisions' ? detail('Participan', record.participants.map(id => role(id).title).join(', ')) +
        detail('Valida', role(record.validator).title) + detail('Seguimiento', role(record.followup).title) : '',
      agreements: kind === 'agreements' && record.decisionId ? detail('Decisión vinculada',
        state.data.decisions.find(item => item.id === record.decisionId)?.title ?? 'Decisión archivada') : ''
    }[kind];
    const linked = kind === 'decisions' ? state.data.agreements.filter(item => item.decisionId === record.id) : [];
    modal(record.title, '<div class="detail-status">' + pill(kind, record.status) + '</div>' +
      (record.description ? '<p class="detail-description">' + html(record.description) + '</p>' : '') +
      '<dl class="detail-grid">' + detail(kind === 'decisions' ? 'Propone' : 'Responsable', role(record.owner).title) +
      detail('Fecha de ' + (kind === 'decisions' ? 'revisión' : 'compromiso'), formattedDate(record.due, { dateStyle: 'long' })) +
      additional + '</dl>' + (record.source ? '<section class="detail-section"><h3>Origen o reunión</h3><p>' + html(record.source) + '</p></section>' : '') +
      (record.evidence ? '<section class="detail-section"><h3>Evidencia</h3><a class="text-link" href="' + html(record.evidence) +
        '" target="_blank" rel="noopener noreferrer">Abrir enlace de evidencia</a></section>' : '') +
      (record.communication ? '<section class="detail-section"><h3>Comunicación</h3><p>' +
        html(record.communication) + '</p></section>' : '') +
      (kind === 'decisions' ? '<section class="detail-section"><h3>Acuerdos vinculados</h3><div class="link-stack">' +
        linked.map(upcomingItem).join('') + button('Vincular nuevo acuerdo', 'plus',
          'data-new="agreements" data-decision="' + html(record.id) + '"') + '</div></section>' : '') +
      (kind === 'agreements' && state.data.decisions.some(item => item.id === record.decisionId) ?
        '<div class="detail-section">' + button('Ver decisión vinculada', 'decision', 'data-kind="decisions" data-record="' +
          html(record.decisionId) + '"') + '</div>' : '') +
      (events.length ? '<details class="history"><summary>Historial de cambios</summary><ul>' +
        events.map(event => '<li><span>' + html(event.action) + ' · ' + html(statusName(kind, event.status)) + '</span><small>' +
          html(event.actor) + ' · ' + html(new Intl.DateTimeFormat('es-CL', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Santiago' }).format(new Date(event.time))) +
          '</small></li>').join('') + '</ul></details>' : '') + '<div class="dialog-actions">' +
      (state.user.access === 'admin' ? button('Archivar', null, 'data-archive="' + html(record.id) + '" data-kind="' + kind +
        '" data-version="' + record.version + '"', 'ghost danger') : '') +
      (editable ? button('Editar', 'edit', 'data-edit="' + html(record.id) + '" data-kind="' + kind + '"', 'primary') : '') + '</div>');
  } catch (error) {
    if (request === recordRequest && dialog.open) modal('Registro', '<p class="form-error">' + html(error.message) + '</p>');
  }
}

function inputField(title, name, value, attributes = '') {
  return '<label class="form-field"><span>' + title + '</span><input name="' + name + '" value="' + html(value) + '" ' +
    attributes + '></label>';
}
function selectField(title, name, options) {
  return '<label class="form-field"><span>' + title + '</span><select name="' + name + '" required>' + options + '</select></label>';
}
function textarea(title, name, value, max, required = false) {
  return '<label class="form-field"><span>' + title + '</span><textarea name="' + name + '" maxlength="' + max + '"' +
    (required ? ' required' : '') + ' rows="3">' + html(value) + '</textarea></label>';
}
function formActions(text = 'Guardar') {
  return '<p class="form-error" role="alert" hidden></p><div class="dialog-actions">' +
    button('Cancelar', null, 'data-action="close"') + '<button class="button primary" type="submit">' + html(text) + '</button></div>';
}
function recordForm(kind, record = {}, linked = '') {
  const model = models[kind];
  const decision = kind === 'decisions';
  const goal = kind === 'goals';
  const chosenStatus = record.status ?? model.default;
  const canApprove = state.user.access === 'admin' || state.user.role === record.validator;
  const allowed = decision ? model.statuses.filter(status => {
    if (status === 'approved') return canApprove && ['review', 'approved', 'followup', 'closed'].includes(record.status);
    if (status === 'followup') return canApprove && ['approved', 'followup'].includes(record.status);
    if (status === 'closed') return canApprove && ['approved', 'followup', 'closed'].includes(record.status);
    return true;
  }) : model.statuses;
  const roleSelection = value => option('', 'Selecciona un rol', value) + roleOptions(value);
  modal(record.id ? 'Editar ' + model.name : model.title, '<form data-form="record" data-kind="' + kind + '" data-id="' +
    html(record.id ?? '') + '" data-version="' + (record.version ?? 0) + '">' +
    inputField('Título', 'title', record.title, 'required maxlength="120"') +
    textarea('Descripción (opcional)', 'description', record.description, 2500) +
    '<div class="form-grid">' + selectField(decision ? 'Propone' : 'Responsable', 'owner', roleSelection(record.owner ?? state.user.role)) +
    inputField(decision ? 'Fecha de revisión' : 'Fecha de compromiso', 'due', record.due ?? today(),
      'type="date" required min="2000-01-01" max="2099-12-31"') + '</div><div class="form-grid">' +
    selectField('Estado', 'status', allowed.map(status => option(status, statusName(kind, status), chosenStatus)).join('')) +
    (goal ? inputField('Avance (%)', 'progress', record.progress ?? 0, 'type="number" min="0" max="100" step="1" required') : '') +
    '</div>' + (decision ? '<fieldset class="participants"><legend>Participan</legend>' + state.data.roles.map(entry =>
      '<label><input name="participants" type="checkbox" value="' + entry.id + '"' + ((record.participants ?? []).includes(entry.id) ? ' checked' : '') +
      '>' + html(entry.title) + '</label>').join('') + '</fieldset><div class="form-grid">' +
      selectField('Valida', 'validator', roleSelection(record.validator)) + selectField('Seguimiento', 'followup', roleSelection(record.followup)) +
      '</div>' + textarea('Cómo se comunicará (opcional)', 'communication', record.communication, 700) : '') +
    (kind === 'agreements' ? selectField('Decisión vinculada', 'decisionId', option('__none', 'Sin decisión vinculada',
      (record.decisionId ?? linked) || '__none') + state.data.decisions.map(item => option(item.id, item.title, record.decisionId ?? linked)).join('') +
      (record.decisionId && !state.data.decisions.some(item => item.id === record.decisionId) ?
        option(record.decisionId, 'Decisión archivada', record.decisionId) : '')) +
      '<details class="history evidence-fields"><summary>Origen y evidencia (opcional)</summary>' +
      inputField('Origen o reunión', 'source', record.source, 'maxlength="120"') +
      inputField('Enlace a evidencia', 'evidence', record.evidence, 'type="url" maxlength="1000" placeholder="https://"') + '</details>' : '') +
    formActions() + '</form>', true, '[name="title"]');
  if (goal) {
    const status = dialog.querySelector('[name="status"]');
    const progress = dialog.querySelector('[name="progress"]');
    progress.readOnly = status.value === 'done';
    status.addEventListener('change', () => {
      progress.readOnly = status.value === 'done';
      if (progress.readOnly) progress.value = '100';
      else if (progress.value === '100') progress.value = '99';
    });
  }
}

function archiveForm(kind, id, version) {
  modal('Archivar ' + models[kind].name, '<p>El registro se retirará de las vistas activas. Su historial se conservará.</p>' +
    '<form data-form="archive" data-kind="' + kind + '" data-id="' + html(id) + '" data-version="' + version + '">' +
    formActions('Archivar') + '</form>');
}

function protocolScreen() {
  return pageHeading('Protocolo de colaboración', 'Consulta el acuerdo que orienta el trabajo pedagógico compartido.',
    state.user.access === 'admin' ? button('Editar protocolo', 'edit', 'data-action="edit-protocol"', 'primary') : '') +
    '<section class="panel protocol-panel"><div class="panel-head"><span class="tile green">' + icon('shield') +
    '</span><div><h2>Acuerdo de colaboración PIE–UTP</h2></div></div><p>' + html(state.data.protocol) + '</p></section>';
}

function pulseMonth(period) {
  return formattedDate(period + '-01', { month: 'long', year: 'numeric' });
}
function climateScreen() {
  return pageHeading('Clima de colaboración', 'Revisa la percepción del equipo y detecta dónde mejorar la coordinación.') +
    '<div id="climate-content">' + climateContent() + '</div>';
}
function climateContent() {
  const survey = state.climate;
  if (!survey) return '<p role="status">Cargando pulso de colaboración…</p>';
  const result = survey.results.find(item => item.period === state.pulsePeriod) ??
    survey.results.find(item => item.ready) ?? survey.results[0];
  const published = survey.results.filter(item => item.ready);
  const choices = survey.results.map(item => option(item.period, pulseMonth(item.period), result.period)).join('');
  const dueNotice = state.demo ? 'Resultados ficticios de demostración.' :
    'Los resultados de cada mes se muestran al cierre con al menos ' + survey.minimum + ' respuestas.';
  const response = '<section class="panel pulse-banner"><div class="panel-head"><span class="tile green">' + icon('users') +
    '</span><div><h2>Pulso del equipo · ' + html(pulseMonth(survey.period)) + '</h2><p>' +
    (survey.submitted ? 'Ya respondiste el pulso de este mes.' : 'Cuatro preguntas sobre la colaboración cotidiana.') + '</p></div>' +
    (survey.submitted ? '<span class="pill status-done">' + icon('tick') + ' Respondido</span>' :
      button('Responder pulso', null, 'data-action="pulse"', 'primary')) + '</div></section>';
  const results = result.ready ? '<div class="pulse-results"><div class="index-card"><span class="tile blue">' + icon('chart') +
    '</span><div><h3>Índice de colaboración</h3><strong>' + result.index + '%</strong><p>' +
    result.responses + ' respuestas agregadas</p></div></div><ul class="dimensions">' + survey.dimensions.map((dimension, index) =>
    '<li><label for="dimension-' + dimension.id + '">' + html(dimension.title) + '</label><strong>' + result.scores[index] +
    '%</strong><progress id="dimension-' + dimension.id + '" max="100" value="' + result.scores[index] + '"></progress></li>').join('') +
    '</ul></div>' : '<div class="empty pulse-empty"><span class="tile blue">' + icon('clock') +
    '</span><h3>Resultados pendientes</h3><p>El pulso de este período está abierto.</p></div>';
  return response + '<section class="panel pulse-panel"><div class="panel-head"><div><h2>Resultados por dimensión</h2><p>' +
    dueNotice + '</p></div><label><span class="sr-only">Período</span><select id="pulse-period">' + choices +
    '</select></label></div>' + results + (published.length > 1 ? '<details class="history pulse-history"><summary>Ver evolución mensual</summary><ul>' +
      published.map(item => '<li><span>' + html(pulseMonth(item.period)) + '</span><strong>' + item.index + '%</strong></li>').join('') +
      '</ul></details>' : '') + '</section>';
}
async function refreshClimate() {
  const user = state.user;
  try {
    const survey = await api('climate');
    if (state.user !== user) return;
    state.climate = survey;
    const content = document.querySelector('#climate-content');
    if (content && !dialog.open) content.innerHTML = climateContent();
  } catch (error) {
    const content = document.querySelector('#climate-content');
    if (content) content.innerHTML = '<p class="form-error" role="alert">' + html(error.message) + '</p>' +
      button('Reintentar', 'refresh', 'data-action="reload-climate"');
  }
}
function pulseForm() {
  const survey = state.climate;
  const scores = ['Muy en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Muy de acuerdo'];
  modal('Pulso de colaboración', '<form data-form="pulse" data-period="' + html(survey.period) +
    '"><p class="quiet pulse-note">Las respuestas se muestran únicamente como resultados agregados.</p>' +
    survey.dimensions.map(dimension => selectField(html(dimension.question), dimension.id,
      option('', 'Selecciona una respuesta') + scores.map((score, index) => option(String(index + 1), score)).join(''))).join('') +
    formActions('Enviar respuesta') + '</form>', true);
}

function settingsScreen() {
  const admin = state.user.access === 'admin';
  return pageHeading('Configuración', 'Administra el acceso al espacio de trabajo.') +
    '<section class="panel settings-panel"><div class="panel-head"><div><h2>Mi cuenta</h2><p>' + html(state.user.email) +
    '</p></div>' + button('Cambiar contraseña', null, 'data-action="password"') + '</div></section>' +
    (admin ? '<section class="panel settings-panel"><div class="panel-head"><div><h2>Equipo</h2><p>Cuentas con acceso al espacio de trabajo.</p></div>' +
      button('Agregar integrante', 'plus', 'data-action="new-user"', 'primary') + '</div><div id="team-list">' +
      teamList() + '</div></section>' : '');
}
function teamList() {
  if (!state.users) return '<p class="empty-small">Cargando integrantes…</p>';
  return '<ul class="team-list">' + state.users.map(user => '<li><span class="avatar">' + html(initials(user.name)) +
    '</span><span><strong>' + html(user.name) + '</strong><small>' + html(user.email) + '</small></span><span>' +
    html(role(user.role).title) + '</span><span class="pill">' + (user.access === 'admin' ? 'Administración' : 'Integrante') +
    '</span>' + (!user.active ? '<span class="pill">Acceso suspendido</span>' : '') +
    (user.id === state.user.id ? '' : button(user.active ? 'Suspender acceso' : 'Restablecer acceso', null,
      'data-account="' + html(user.id) + '"', 'ghost')) + '</li>').join('') + '</ul>';
}
async function refreshUsers() {
  if (state.demo || state.user?.access !== 'admin') return;
  try {
    state.users = (await api('users')).users;
    const list = document.querySelector('#team-list');
    if (list) list.innerHTML = teamList();
  } catch (error) {
    const list = document.querySelector('#team-list');
    if (list) list.textContent = error.message;
  }
}
function newUser() {
  modal('Agregar integrante', '<form data-form="user">' +
    inputField('Nombre', 'name', '', 'maxlength="100" required autocomplete="off"') +
    inputField('Correo', 'email', '', 'type="email" maxlength="254" required autocomplete="off"') +
    '<div class="form-grid">' + selectField('Rol en el mapa', 'role', option('', 'Selecciona un rol') + roleOptions()) +
    selectField('Acceso', 'access', option('member', 'Integrante') + option('admin', 'Administración')) + '</div>' +
    inputField('Contraseña inicial', 'password', '', 'type="password" minlength="12" maxlength="128" required autocomplete="new-password"') +
    formActions('Crear cuenta') + '</form>', false, '[name="name"]');
}
function passwordForm() {
  modal('Cambiar contraseña', '<form data-form="password">' +
    inputField('Contraseña actual', 'current', '', 'type="password" minlength="12" maxlength="128" required autocomplete="current-password"') +
    inputField('Nueva contraseña', 'password', '', 'type="password" minlength="12" maxlength="128" required autocomplete="new-password"') +
    formActions() + '</form>', false, '[name="current"]');
}
function accountForm(id) {
  const user = state.users.find(entry => entry.id === id);
  const action = user.active ? 'Suspender acceso' : 'Restablecer acceso';
  modal(action, '<p>' + (user.active ? 'Se cerrarán las sesiones de ' : 'Podrá volver a ingresar ') +
    html(user.name) + '.</p><form data-form="account" data-id="' + html(id) + '" data-active="' + !user.active + '">' +
    formActions(action) + '</form>');
}

function searchResults(value) {
  const query = normalize(value);
  if (!query) return '<p class="quiet">Busca un rol, una meta, una decisión o un acuerdo.</p>';
  const results = state.data.roles.filter(entry => normalize(entry.title + ' ' + entry.short).includes(query))
    .map(entry => '<button class="search-result" type="button" data-role="' + entry.id + '">' + icon(entry.icon) + '<span><strong>' +
      html(entry.title) + '</strong><small>Mapa de roles</small></span>' + icon('chevron') + '</button>');
  for (const kind of Object.keys(models)) {
    const matches = state.data[kind].filter(item => normalize(item.title + ' ' + item.description).includes(query));
    results.push(...matches.map(item => '<button class="search-result" type="button" data-kind="' +
      kind + '" data-record="' + html(item.id) + '">' + icon(screens[kind].icon) + '<span><strong>' + html(item.title) +
      '</strong><small>' + screens[kind].title + '</small></span>' + icon('chevron') + '</button>'));
  }
  return results.length ? results.slice(0, 12).join('') : '<p class="quiet">No encontramos coincidencias.</p>';
}

function reminders() {
  const due = state.data.agreements.filter(item => isOpen(item) && dueDifference(item.due) <= 7)
    .sort((a, b) => a.due.localeCompare(b.due));
  modal('Recordatorios', '<p class="quiet">Acuerdos vencidos o con fecha en los próximos siete días.</p>' +
    (due.length ? '<div class="upcoming-list">' + due.map(upcomingItem).join('') + '</div>' :
      '<p>No hay acuerdos próximos a vencer.</p>'));
}

function renderLogin(message = '') {
  document.title = 'Ingresar · Conecta PIE–UTP';
  app.innerHTML = '<main id="contenido" class="login-layout"><div class="login-card"><div class="brand">' + brand() +
    '</div><h1>Ingresa a tu espacio</h1><p>Accede al espacio de trabajo colaborativo de tu equipo.</p>' +
    '<form data-form="login">' + inputField('Correo', 'email', '', 'type="email" maxlength="254" required autocomplete="username"') +
    inputField('Contraseña', 'password', '', 'type="password" minlength="12" maxlength="128" required autocomplete="current-password"') +
    '<p class="form-error" role="alert"' + (message ? '' : ' hidden') + '>' + html(message) +
    '</p><button class="button primary" type="submit">Ingresar</button></form></div></main>';
}

function readPage() {
  const target = location.hash.slice(1);
  return Object.hasOwn(screens, target) && !(state.demo && target === 'settings') ? target : 'home';
}
async function start() {
  try {
    const session = await api('session');
    state.user = session.user;
    state.demo = session.demo;
    if (!state.user) return renderLogin();
    state.data = await api('workspace');
    state.page = readPage();
    render();
    if (state.page === 'settings') refreshUsers();
    if (state.page === 'climate') refreshClimate();
  } catch (error) {
    app.innerHTML = '<main class="login-layout"><div class="login-card"><h1>No se pudo abrir el espacio</h1><p>' +
      html(error.message) + '</p>' + button('Reintentar', 'refresh', 'data-action="retry"', 'primary') + '</div></main>';
  }
}

function filterInput(event) {
  const control = event.target;
  if (control.matches('[data-filter]')) {
    const kind = control.closest('[data-filter-kind]').dataset.filterKind;
    defaultFilters(kind)[control.dataset.filter] = control.value;
    document.querySelector('#record-results').innerHTML = recordRows(kind);
    if (control.dataset.filter === 'status') {
      document.querySelectorAll('[data-summary]').forEach(item => item.setAttribute('aria-pressed', item.dataset.status === control.value));
    }
  }
  if (control.id === 'global-query') document.querySelector('#global-results').innerHTML = searchResults(control.value);
}

document.addEventListener('input', event => {
  if (event.target.matches('input')) filterInput(event);
});
document.addEventListener('change', event => {
  if (event.target.matches('select')) filterInput(event);
  if (event.target.id === 'line-filter') {
    state.lines = event.target.value;
    render();
    document.querySelector('#line-filter').focus();
  }
  if (event.target.id === 'role-group') {
    state.roleGroup = event.target.value;
    render();
    document.querySelector('#role-group').focus();
  }
  if (event.target.id === 'pulse-period') {
    state.pulsePeriod = event.target.value;
    render();
    document.querySelector('#pulse-period').focus();
  }
});

window.addEventListener('popstate', () => {
  if (!state.data) return;
  closeDialog(false);
  state.page = readPage();
  render();
  if (state.page === 'settings') refreshUsers();
  if (state.page === 'climate') refreshClimate();
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && state.data) {
    event.preventDefault();
    openSearch();
  }
  const menu = document.querySelector('.mobile-navigation[open]');
  if (event.key === 'Escape' && menu && !dialog.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
function openSearch() {
  recordRequest += 1;
  modal('Buscar en el espacio', '<label class="field-search global-search">' + icon('search') +
    '<span class="sr-only">Buscar en el espacio</span><input type="search" id="global-query" placeholder="Buscar por nombre o título"></label>' +
    '<div class="global-results" id="global-results" aria-live="polite">' + searchResults('') + '</div>', false, '#global-query');
}

document.addEventListener('click', async event => {
  const menu = document.querySelector('.mobile-navigation[open]');
  if (menu && !menu.contains(event.target)) menu.open = false;
  const control = event.target.closest('button, a');
  if (!control) return;
  const target = control.dataset;
  if (target.nav) {
    event.preventDefault();
    return go(target.nav);
  }
  if (target.scope) {
    return go(target.scope, { filters: { query: '', owner: target.owner ?? '', status: target.status ?? '', sort: 'due' } });
  }
  if (target.summary) {
    const filter = defaultFilters(target.summary);
    filter.status = filter.status === target.status ? '' : target.status;
    render();
    document.querySelector('[data-summary][data-status="' + target.status + '"]').focus();
  }
  if (target.role) return roleDialog(target.role);
  if (target.record) return showRecord(target.kind, target.record);
  if (target.new) return recordForm(target.new, {}, target.decision);
  if (target.archive) return archiveForm(target.kind, target.archive, target.version);
  if (target.account) return accountForm(target.account);
  if (target.edit) {
    const request = ++recordRequest;
    try {
      const result = await api(target.kind + '/' + target.edit);
      if (request === recordRequest && dialog.open) recordForm(target.kind, result.record);
    } catch (error) {
      toast(error.message);
    }
    return;
  }
  if (target.clear) {
    delete state.filters[target.clear];
    render();
    document.querySelector('input[data-filter="query"]').focus();
  }
  if (target.mapMode) {
    state.mapMode = target.mapMode;
    state.roleGroup = target.roleGroup ?? '';
    render();
    document.querySelector('.segmented [data-map-mode="' + target.mapMode + '"]').focus();
  }
  switch (target.action) {
    case 'search': return openSearch();
    case 'reminders': return reminders();
    case 'close': return closeDialog();
    case 'retry': return start();
    case 'edit-protocol': return modal('Editar protocolo', '<form data-form="protocol">' +
      textarea('Acuerdo de colaboración', 'protocol', state.data.protocol, 6000, true) + formActions() + '</form>', true, 'textarea');
    case 'new-user': return newUser();
    case 'pulse': return pulseForm();
    case 'reload-climate': return refreshClimate();
    case 'password': return passwordForm();
    case 'logout':
      try {
        await api('logout', { method: 'POST' });
        state.user = null;
        state.data = null;
        state.users = null;
        state.climate = null;
        state.pulsePeriod = '';
        state.filters = {};
        history.replaceState(null, '', location.pathname);
        renderLogin();
      } catch (error) {
        toast(error.message);
      }
  }
});

document.addEventListener('submit', async event => {
  const form = event.target;
  const { form: formType, kind, id, version } = form.dataset;
  if (!formType) return;
  event.preventDefault();
  const values = new FormData(form);
  const data = Object.fromEntries(values);
  const errorBox = form.querySelector('.form-error');
  const submit = form.querySelector('button[type="submit"]');
  errorBox.hidden = true;
  submit.disabled = true;
  try {
    if (formType === 'login') {
      const result = await api('login', { method: 'POST', data });
      state.user = result.user;
      state.data = await api('workspace');
      state.page = readPage();
      render();
      if (state.page === 'settings') refreshUsers();
      if (state.page === 'climate') refreshClimate();
      document.querySelector('#contenido').focus();
      return;
    }
    if (formType === 'record') {
      if (kind === 'goals') data.progress = Number(data.progress);
      if (kind === 'decisions') data.participants = values.getAll('participants');
      if (kind === 'agreements' && data.decisionId === '__none') data.decisionId = '';
      if (id) data.version = Number(version);
      await api(kind + (id ? '/' + id : ''), { method: id ? 'PUT' : 'POST', data });
    }
    if (formType === 'archive') await api(kind + '/' + id, { method: 'DELETE', data: { version: Number(version) } });
    if (formType === 'protocol') await api('protocol', { method: 'PUT', data });
    if (formType === 'user') await api('users', { method: 'POST', data });
    if (formType === 'account') await api('users/' + id, { method: 'PATCH', data: { active: form.dataset.active === 'true' } });
    if (formType === 'password') await api('password', { method: 'PUT', data });
    if (formType === 'pulse') {
      state.climate = await api('climate', { method: 'POST', data: { period: form.dataset.period,
        scores: state.climate.dimensions.map(dimension => Number(data[dimension.id])) } });
    }
    if (['record', 'archive', 'protocol'].includes(formType)) {
      try {
        state.data = await api('workspace');
      } catch (error) {
        closeDialog();
        toast('El cambio se guardó. Actualiza la página para verlo.');
        return;
      }
    }
    closeDialog(false);
    render();
    document.querySelector('#contenido')?.focus({ preventScroll: true });
    if (formType === 'user' || formType === 'account') refreshUsers();
    toast(formType === 'archive' ? 'Registro archivado' : formType === 'user' ? 'Cuenta creada' :
      formType === 'pulse' ? 'Respuesta registrada' : 'Cambios guardados');
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.hidden = false;
  } finally {
    submit.disabled = false;
  }
});

function canRefresh() {
  return !state.demo && state.data && !document.hidden && !dialog.open &&
    !document.activeElement?.closest('input, select, textarea, button, a');
}
async function refreshWorkspace() {
  if (!canRefresh()) return;
  const previous = state.data;
  try {
    const current = await api('workspace');
    if (state.data !== previous || !canRefresh() || JSON.stringify(current) === JSON.stringify(previous)) return;
    state.data = current;
    const focusMain = document.activeElement?.id === 'contenido';
    render();
    if (focusMain) document.querySelector('#contenido').focus({ preventScroll: true });
  } catch {
    // The next refresh can recover a temporary connection failure.
  }
}
setInterval(refreshWorkspace, 25_000);
document.addEventListener('visibilitychange', refreshWorkspace);

start();
