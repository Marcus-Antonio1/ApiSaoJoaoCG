'use strict';

/* ═══════════════════════════════════════════
   CONFIGURAÇÃO
═══════════════════════════════════════════ */
const API = 'http://localhost:8080/api';

const POLO_IMAGES = { 
  1: 'img/parque-do-povo.jpg', 
  2: 'img/vila-sitio-sao-joao.jpg.webp', 
  3: 'img/vila-do-artesao.jpg', 
  4: 'img/Carvalheira-na-fogueira.webp', 
  5: 'img/default-polo.jpg', 
  6: 'img/Arraiá-de-cumpade.jpg', 
  7: 'img/Campestre.jpg', 
  8: 'img/default-polo.jpg' 
};

const POLO_BG    = { 1:'polo-bg-1', 2:'polo-bg-2', 3:'polo-bg-3', 4:'polo-bg-4', 5:'polo-bg-5', 6:'polo-bg-6', 7:'polo-bg-7', 8:'polo-bg-8' };
const TIPO_ATRACAO = {
  ARTESANATO:       { icon:'🪔', label:'Artesanato',  color:'rgba(255,183,0,.15)',   text:'var(--gold)' },
  CULINARIA:        { icon:'🍖', label:'Culinária',   color:'rgba(255,107,0,.15)',   text:'var(--orange)' },
  DANCA:            { icon:'💃', label:'Dança',       color:'rgba(192,57,43,.15)',   text:'#f1948a' },
  EXPOSICAO:        { icon:'🖼️', label:'Exposição',   color:'rgba(41,128,185,.15)',  text:'#85c1e9' },
  PARQUE_DIVERSOES: { icon:'🎠', label:'Diversões',   color:'rgba(39,174,96,.15)',   text:'#6ee7a0' },
  CULTURAL:         { icon:'🎭', label:'Cultural',    color:'rgba(142,68,173,.15)',  text:'#d7bde2' },
};

/* ═══════════════════════════════════════════
   ESTADO GLOBAL
═══════════════════════════════════════════ */
let allShows   = [];
let allPolos   = [];
let allArtistas= [];
let filteredShows = [];
let currentView   = 'timeline';
let leafletMap    = null;
let currentPoloId = null;

/* ═══════════════════════════════════════════
   INICIALIZAÇÃO
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildParticles();
  buildBandeirolas('bandeirolas-top');
  buildBandeirolas('bandeirolas-cta');
  buildBandeirolas('bandeirolas-prog');
  buildBandeirolas('bandeirolas-busca');
  buildBandeirolas('bandeirolas-footer');
  initNavbar();
  initCountdown();
  loadHomeData();
  checkUrlParams();
});

function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const busca  = params.get('busca');
  if (busca) { showPage('busca'); setSuggestion(busca); doSearch(); }
}

/* ═══════════════════════════════════════════
   PARTÍCULAS
═══════════════════════════════════════════ */
function buildParticles() {
  const container = document.getElementById('particles');
  const symbols   = ['✦','·','*','◆','✧','♪','♫'];
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left   = Math.random() * 100 + '%';
    el.style.top    = Math.random() * 100 + '%';
    el.style.fontSize = (8 + Math.random() * 14) + 'px';
    el.style.animationDuration  = (5 + Math.random() * 9) + 's';
    el.style.animationDelay     = (Math.random() * 5) + 's';
    el.style.animationDirection = Math.random() > .5 ? 'reverse' : 'normal';
    container.appendChild(el);
  }
}

/* ═══════════════════════════════════════════
   BANDEIROLAS SVG
═══════════════════════════════════════════ */
function buildBandeirolas(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const colors = ['#c0392b','#f1c40f','#2980b9','#27ae60','#e67e22','#8e44ad','#c0392b','#f1c40f','#2980b9','#27ae60','#e67e22','#8e44ad','#c0392b','#f1c40f','#2980b9','#27ae60','#e67e22'];
  const w = 1200, count = colors.length, spacing = w / count;
  const ropeY = 15;
  let ropePath = `M0,${ropeY}`;
  colors.forEach((_, i) => {
    const cx = (i + .5) * spacing;
    ropePath += ` Q${cx},30 ${cx + spacing / 2},${ropeY}`;
  });
  const triangles = colors.map((color, i) => {
    const cx = (i + .5) * spacing;
    const ty = ropeY + Math.sin(i * .9) * 3;
    return `<polygon points="${cx-9},${ty} ${cx+9},${ty} ${cx},${ty+22}" fill="${color}" opacity=".88"/>`;
  }).join('');
  el.innerHTML = `<svg viewBox="0 0 ${w} 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="${ropePath}" fill="none" stroke="rgba(212,168,83,.5)" stroke-width="1.2"/>
    ${triangles}
  </svg>`;
}

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
function initNavbar() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });
}
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ═══════════════════════════════════════════
   ROTEAMENTO DE PÁGINAS
═══════════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const pageMap = { home:'page-home', polo:'page-polo', prog:'page-prog', busca:'page-busca' };
  const pg = document.getElementById(pageMap[name]);
  if (pg) { pg.classList.add('active'); window.scrollTo(0,0); }
  const linkMap = { home:'home', prog:'prog', busca:'busca' };
  if (linkMap[name]) {
    document.querySelector(`[data-page="${linkMap[name]}"]`)?.classList.add('active');
  }
  if (name === 'prog' && allShows.length === 0) loadProg();
}

/* ═══════════════════════════════════════════
   COUNTDOWN
═══════════════════════════════════════════ */
function initCountdown() {
  function tick() {
    const now    = new Date();
    const target = new Date(now.getFullYear(), 4, 30); // 30 maio
    if (now > target) target.setFullYear(target.getFullYear() + 1);
    const diff = target - now;
    const pad = n => String(Math.floor(n)).padStart(2,'0');
    document.getElementById('cd-dias').textContent  = pad(diff / 86400000);
    document.getElementById('cd-horas').textContent = pad((diff % 86400000) / 3600000);
    document.getElementById('cd-min').textContent   = pad((diff % 3600000) / 60000);
    document.getElementById('cd-seg').textContent   = pad((diff % 60000) / 1000);
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════
   HOME DATA
═══════════════════════════════════════════ */
async function loadHomeData() {
  try {
    const [polosRes, showsRes, artistasRes] = await Promise.all([
      fetch(`${API}/polos`),
      fetch(`${API}/shows`),
      fetch(`${API}/artistas`),
    ]);
    allPolos    = await polosRes.json();
    allShows    = await showsRes.json();
    allArtistas = await artistasRes.json();
    renderStats();
    renderPolosGrid();
  } catch(e) {
    document.getElementById('polos-grid').innerHTML = `<div class="empty-state">
      <p>⚠️ Não foi possível conectar à API.</p>
      <p style="font-size:.8rem;margin-top:.5rem;color:var(--dimmed)">Verifique se o backend está rodando em localhost:8080</p>
    </div>`;
  }
}

function renderStats() {
  document.getElementById('stat-shows').textContent    = allShows.length;
  document.getElementById('stat-polos').textContent    = allPolos.length;
  document.getElementById('stat-artistas').textContent = allArtistas.length;
}

function renderPolosGrid() {
  const grid = document.getElementById('polos-grid');
  if (!grid) return; 
  
  // Garante que se allPolos estiver indefinido ou vazio, exiba o estado vazio de forma segura
  if (!allPolos || !allPolos.length) { 
    grid.innerHTML = '<div class="empty-state">Nenhum polo encontrado.</div>'; 
    return; 
  }
  
  grid.innerHTML = allPolos.map((polo, i) => {
    // 🛡️ TRATAMENTO SEGURO: Busca no objeto. Se não existir, deixa uma string vazia temporária
    let fotoPolo = POLO_IMAGES[polo.id] || '';
    
    // Calcula a quantidade de shows de forma segura
    const shows = (typeof allShows !== 'undefined' && allShows) ? allShows.filter(s => s.poloId === polo.id).length : 0;
    
    // Se a imagem não foi mapeada ou está em branco, você pode usar uma imagem coringa ou uma cor sólida
    const estiloBackground = fotoPolo ? `background-image: url('${fotoPolo}');` : `background-color: var(--wood-dark);`;

    return `<article class="polo-card" onclick="openPolo(${polo.id})" style="animation:fadeUp .6s ease ${i*.08}s both" tabindex="0" onkeydown="if(event.key==='Enter')openPolo(${polo.id})" aria-label="Ver ${polo.nome}">
      
      <!-- Aplica o estilo tratado de forma que, se a foto falhar, o card não quebra o resto do HTML -->
      <div class="polo-card-img" style="${estiloBackground}">
        <div class="polo-card-tags">
          ${polo.temEntradaGratuita ? '<span class="tag tag-free">✦ Gratuito</span>' : ''}
        </div>
      </div>
      
      <div class="polo-card-body">
        <h3>${polo.nome}</h3>
        <div class="polo-card-bairro">📍 ${polo.bairro || 'Campina Grande'}</div>
        <p class="polo-card-desc">${polo.descricao || ''}</p>
        <div class="polo-card-footer">
          <div class="polo-card-meta">
            ${polo.capacidadeEstimada ? `<span>👥 ${polo.capacidadeEstimada.toLocaleString('pt-BR')}</span>` : ''}
            ${shows ? `<span>🎵 ${shows} shows</span>` : ''}
          </div>
          <div class="polo-card-cta">Ver programação <span>→</span></div>
        </div>
      </div>
    </article>`;
  }).join('');
}

function scrollToPolos() {
  document.getElementById('polos-section')?.scrollIntoView({ behavior:'smooth' });
}

/* ═══════════════════════════════════════════
   POLO DETALHE
═══════════════════════════════════════════ */
async function openPolo(id) {
  showPage('polo');
  currentPoloId = id;
  
  // Resetar tabs
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'shows'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-shows'));
  
  document.getElementById('tab-shows').innerHTML    = '<div class="loading-state"><div class="spinner"></div><p>Carregando...</p></div>';
  document.getElementById('tab-atracoes').innerHTML = '';
  
  const mapElement = document.getElementById('tab-mapa').querySelector('#leaflet-map');
  if (mapElement) mapElement.innerHTML = '';

  try {
    const res  = await fetch(`${API}/polos/${id}`);
    if (!res.ok) throw new Error('Erro na resposta do servidor');
    
    const polo = await res.json();
    
    renderPoloHero(polo);
    renderPoloShows(polo.shows || []);
    renderPoloAtracoes(polo.atracoesCulturais || []);
    renderPoloMapa(polo);
  } catch(e) {
    console.error("Erro ao carregar dados do polo:", e);
    document.getElementById('polo-hero-info').innerHTML = '<p style="color:var(--muted)">Erro ao carregar polo.</p>';
    document.getElementById('tab-shows').innerHTML = '<p style="color:var(--muted); text-align:center; padding:2rem;">Não foi possível carregar as atrações.</p>';
  }
}

function renderPoloHero(polo) {
  const heroInfo = document.getElementById('polo-hero-info');
  const poloHero = document.getElementById('polo-hero');
  
  if (!polo || !heroInfo) return;

  // Busca a foto correspondente
  const fotoPolo = POLO_IMAGES[polo.id] || 'img/default-polo.jpg';

  // Monta o HTML interno do banner sem o ícone de emoji e sem a tag público/privado
  heroInfo.innerHTML = `
    <h1>${polo.nome}</h1>
    <div class="polo-hero-meta">
      <span>📍 ${polo.bairro || 'Campina Grande'}</span>
      ${polo.capacidadeEstimada ? `<span>👥 Capacidade: ${polo.capacidadeEstimada.toLocaleString('pt-BR')} pessoas</span>` : ''}
      ${polo.temEntradaGratuita ? '<span class="tag tag-free">✦ Entrada Gratuita</span>' : ''}
    </div>
  `;

  // Aplica a imagem de fundo com uma camada escura para dar leitura ao texto branco
  if (poloHero) {
    poloHero.style.backgroundImage = `linear-gradient(rgba(10, 8, 7, 0.65), rgba(19, 13, 9, 0.85)), url('${fotoPolo}')`;
    poloHero.style.backgroundSize = 'cover';
    poloHero.style.backgroundPosition = 'center';
  }
}

function renderPoloShows(shows) {
  const panel = document.getElementById('tab-shows');
  if (!shows.length) { panel.innerHTML = '<div class="empty-state">Nenhum show cadastrado para este polo ainda.</div>'; return; }

  const grouped = groupByDay(shows);
  panel.innerHTML = Object.entries(grouped).sort(([a],[b]) => new Date(a)-new Date(b)).map(([day, dayShows]) => {
    const items = dayShows.sort((a,b) => new Date(a.dataHora)-new Date(b.dataHora)).map(s => `
      <div class="show-item">
        <div class="show-time">${fmtTime(s.dataHora)}</div>
        <div class="show-divider"></div>
        <div class="show-info">
          <div class="show-artista">${s.artistaNome}</div>
          ${s.artistaGeneroMusical ? `<div class="show-genero">${s.artistaGeneroMusical}</div>` : ''}
          ${s.observacoes ? `<div class="show-obs">✦ ${s.observacoes}</div>` : ''}
        </div>
        ${s.duracaoMinutos ? `<div class="show-dur">⏱ ${s.duracaoMinutos}min</div>` : ''}
      </div>`).join('');
    return `<div class="prog-day-block">
      <div class="show-day-header">
        <div class="show-day-label">${fmtDateLabel(dayShows[0].dataHora)}</div>
        <div class="show-day-line"></div>
        <span style="font-size:.75rem;color:var(--dimmed)">${dayShows.length} show${dayShows.length>1?'s':''}</span>
      </div>
      ${items}
    </div>`;
  }).join('');
}

function renderPoloAtracoes(atracoes) {
  const panel = document.getElementById('tab-atracoes');
  if (!atracoes.length) { panel.innerHTML = '<div class="empty-state">Nenhuma atração cultural cadastrada.</div>'; return; }
  const meta = t => TIPO_ATRACAO[t] || { icon:'🎉', label: t, color:'rgba(255,183,0,.1)', text:'var(--gold)' };
  panel.innerHTML = `<div class="atracao-grid">${atracoes.map(a => {
    const m = meta(a.tipo);
    return `<div class="atracao-card">
      <div class="atracao-icon">${m.icon}</div>
      <span class="atracao-tipo" style="background:${m.color};color:${m.text}">${m.label}</span>
      <h3>${a.nome}</h3>
      <p>${a.descricao || ''}</p>
      ${a.horarioFuncionamento ? `<div class="atracao-horario">🕐 ${a.horarioFuncionamento}</div>` : ''}
    </div>`;
  }).join('')}</div>`;
}

function renderPoloMapa(polo) {
  if (!polo.latitude || !polo.longitude) {
    document.getElementById('mapa-info').innerHTML = '<p style="color:var(--muted)">Coordenadas não disponíveis.</p>';
    return;
  }
  document.getElementById('mapa-info').innerHTML = `
    <span>📍 ${polo.endereco}, ${polo.bairro} — Campina Grande, PB</span>
    <a class="mapa-gmaps" href="https://www.google.com/maps/search/?api=1&query=${polo.latitude},${polo.longitude}" target="_blank" rel="noopener">Google Maps ↗</a>`;

  // Destruir mapa anterior se existir
  if (leafletMap) { try { leafletMap.remove(); } catch(e){} leafletMap = null; }
  setTimeout(() => {
    const mapEl = document.getElementById('leaflet-map');
    if (!mapEl) return;
    leafletMap = L.map(mapEl).setView([polo.latitude, polo.longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);
    const icon = L.divIcon({
      html: `<div style="background:linear-gradient(135deg,#c0392b,#ff6b00);width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fdf6e3;box-shadow:0 4px 12px rgba(0,0,0,.5)">
               <div style="width:10px;height:10px;background:#fdf6e3;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)rotate(45deg)"></div>
             </div>`,
      iconSize:[32,32], iconAnchor:[16,32], popupAnchor:[0,-36], className:''
    });
    L.marker([polo.latitude, polo.longitude], { icon }).addTo(leafletMap)
      .bindPopup(`<strong>${polo.nome}</strong><br>${polo.endereco}`).openPopup();
  }, 100);
}

function switchTab(btn, tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tabName).classList.add('active');
  if (tabName === 'mapa' && currentPoloId) {
    // Re-renderizar mapa se necessário
    fetch(`${API}/polos/${currentPoloId}`).then(r => r.json()).then(polo => {
      renderPoloMapa(polo);
    }).catch(() => {});
  }
}

/* ═══════════════════════════════════════════
   PROGRAMAÇÃO
═══════════════════════════════════════════ */
async function loadProg() {
  document.getElementById('prog-timeline').innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Carregando programação...</p></div>';
  try {
    if (!allShows.length) {
      const [sr, pr] = await Promise.all([fetch(`${API}/shows`), fetch(`${API}/polos`)]);
      allShows  = await sr.json();
      allPolos  = await pr.json();
    }
    filteredShows = [...allShows];
    buildProgFilters();
    renderProgStats();
    renderTimeline();
  } catch(e) {
    document.getElementById('prog-timeline').innerHTML = '<div class="empty-state">⚠️ Erro ao carregar programação. Verifique se a API está rodando.</div>';
  }
}

function buildProgFilters() {
  // Polos
  const fPolo = document.getElementById('f-polo');
  fPolo.innerHTML = '<option value="">Todos os polos</option>' +
    allPolos.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
  // Datas únicas
  const dates = [...new Set(allShows.map(s => new Date(s.dataHora).toDateString()))].sort((a,b) => new Date(a)-new Date(b));
  const fData = document.getElementById('f-data');
  fData.innerHTML = '<option value="">Todas as datas</option>' +
    dates.map(d => `<option value="${d}">${new Date(d).toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short',year:'numeric'})}</option>`).join('');
  // Gêneros
  const genres = [...new Set(allShows.map(s => s.artistaGeneroMusical).filter(Boolean))].sort();
  const fGenero = document.getElementById('f-genero');
  fGenero.innerHTML = '<option value="">Todos os gêneros</option>' +
    genres.map(g => `<option value="${g}">${g}</option>`).join('');
}

function renderProgStats() {
  const dates   = new Set(allShows.map(s => new Date(s.dataHora).toDateString())).size;
  const genres  = new Set(allShows.map(s => s.artistaGeneroMusical).filter(Boolean)).size;
  document.getElementById('prog-stats').innerHTML = `
    <div class="prog-stat"><strong>${allShows.length}</strong> shows</div>
    <div class="prog-stat"><strong>${allPolos.length}</strong> polos</div>
    <div class="prog-stat"><strong>${genres}</strong> gêneros</div>
    <div class="prog-stat"><strong>${dates}</strong> dias</div>`;
}

function applyFilters() {
  const polo   = document.getElementById('f-polo').value;
  const data   = document.getElementById('f-data').value;
  const genero = document.getElementById('f-genero').value;
  filteredShows = allShows.filter(s => {
    if (polo   && s.poloId !== Number(polo))             return false;
    if (data   && new Date(s.dataHora).toDateString() !== data) return false;
    if (genero && s.artistaGeneroMusical !== genero)     return false;
    return true;
  });
  const hasFilters = polo || data || genero;
  document.getElementById('clear-btn').style.display = hasFilters ? '' : 'none';
  document.getElementById('prog-count').textContent  = hasFilters ? `${filteredShows.length} de ${allShows.length} shows` : '';
  currentView === 'timeline' ? renderTimeline() : renderGrade();
}

function clearFilters() {
  document.getElementById('f-polo').value   = '';
  document.getElementById('f-data').value   = '';
  document.getElementById('f-genero').value = '';
  applyFilters();
}

function toggleFilters() {
  const panel = document.getElementById('filter-panel');
  const btn   = document.getElementById('filter-toggle-btn');
  panel.classList.toggle('open');
  btn.classList.toggle('open');
}

function setView(v) {
  currentView = v;
  document.getElementById('vbtn-timeline').classList.toggle('active', v==='timeline');
  document.getElementById('vbtn-grade').classList.toggle('active',    v==='grade');
  document.getElementById('prog-timeline').style.display = v==='timeline' ? '' : 'none';
  document.getElementById('prog-grade').style.display    = v==='grade'    ? '' : 'none';
  v === 'timeline' ? renderTimeline() : renderGrade();
}

function renderTimeline() {
  const container = document.getElementById('prog-timeline');
  if (!filteredShows.length) { container.innerHTML = '<div class="empty-state">Nenhum show encontrado com os filtros selecionados.</div>'; return; }
  const grouped = groupByDay(filteredShows);
  container.innerHTML = Object.entries(grouped).sort(([a],[b]) => new Date(a)-new Date(b)).map(([day, shows]) => {
    const items = shows.sort((a,b) => new Date(a.dataHora)-new Date(b.dataHora)).map(s => `
      <div class="prog-show-item" onclick="openPolo(${s.poloId})">
        <div class="prog-time">${fmtTime(s.dataHora)}</div>
        <div class="prog-div"></div>
        <div class="prog-info">
          <div class="prog-artista">${s.artistaNome}</div>
          <div class="prog-polo">📍 ${s.poloNome}</div>
          ${s.observacoes ? `<div class="prog-obs">✦ ${s.observacoes}</div>` : ''}
        </div>
        ${s.artistaGeneroMusical ? `<div class="prog-badge">${s.artistaGeneroMusical}</div>` : ''}
      </div>`).join('');
    return `<div class="prog-day-block">
      <div class="show-day-header">
        <div class="show-day-label" style="text-transform:capitalize">${fmtDateLabel(shows[0].dataHora)}</div>
        <div class="show-day-line"></div>
        <span style="font-size:.72rem;color:var(--dimmed)">${shows.length} show${shows.length>1?'s':''}</span>
      </div>
      ${items}
    </div>`;
  }).join('');
}

function renderGrade() {
  const container = document.getElementById('prog-grade');
  if (!filteredShows.length) { container.innerHTML = '<div class="empty-state">Nenhum show com os filtros selecionados.</div>'; return; }
  const polosUsados = allPolos.filter(p => filteredShows.some(s => s.poloId === p.id));
  const n = polosUsados.length;
  const gridCols = `120px repeat(${n}, 1fr)`;
  const header   = `<div class="grade-header" style="display:grid;grid-template-columns:${gridCols};gap:4px;margin-bottom:4px">
    <div></div>
    ${polosUsados.map(p => `<div class="grade-polo-cell"><div class="grade-polo-name">${POLO_ICONS[p.id]||''} ${p.nome}</div></div>`).join('')}
  </div>`;

  const dates = [...new Set(filteredShows.map(s => new Date(s.dataHora).toDateString()))].sort((a,b)=>new Date(a)-new Date(b));
  const rows  = dates.map(day => {
    const dayShows = filteredShows.filter(s => new Date(s.dataHora).toDateString() === day);
    const cells    = polosUsados.map(polo => {
      const poloShows = dayShows.filter(s => s.poloId === polo.id).sort((a,b) => new Date(a.dataHora)-new Date(b.dataHora));
      if (!poloShows.length) return '<div class="grade-cell-empty"></div>';
      return poloShows.map(s => `
        <div class="grade-cell-show" onclick="openPolo(${s.poloId})">
          <div class="grade-cell-time">${fmtTime(s.dataHora)}</div>
          <div class="grade-cell-name">${s.artistaNome}</div>
        </div>`).join('');
    }).join('');
    const d = new Date(day);
    return `<div class="grade-row" style="display:grid;grid-template-columns:${gridCols};gap:4px;margin-bottom:4px">
      <div class="grade-date">${d.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short'})}</div>
      ${cells}
    </div>`;
  }).join('');

  container.innerHTML = `<div class="grade-wrap">${header}${rows}</div>`;
}

/* ═══════════════════════════════════════════
   BUSCA DE ARTISTAS
═══════════════════════════════════════════ */
function setSuggestion(nome) {
  document.getElementById('busca-input').value = nome;
  document.getElementById('nav-search-input').value = nome;
  doSearch();
}

function triggerSearch() {
  const query = document.getElementById('nav-search-input').value ||
                document.getElementById('hero-search').value;
  if (!query.trim()) return;
  document.getElementById('busca-input').value = query.trim();
  showPage('busca');
  doSearch();
}

async function doSearch() {
  const nome = (document.getElementById('busca-input').value || '').trim();
  const results = document.getElementById('busca-results');
  if (!nome) { results.innerHTML = ''; return; }
  results.innerHTML = '<div class="busca-loading"><div class="loading-state"><div class="spinner"></div><p>Buscando...</p></div></div>';
  try {
    const res  = await fetch(`${API}/artistas/busca?nome=${encodeURIComponent(nome)}`);
    const data = await res.json();
    renderBuscaResults(nome, data);
  } catch(e) {
    results.innerHTML = '<div class="empty-state"><p>⚠️ Erro ao buscar. Verifique se a API está rodando.</p></div>';
  }
}

function renderBuscaResults(query, shows) {
  const results = document.getElementById('busca-results');
  if (!shows.length) {
    results.innerHTML = `<div class="busca-empty">
      <div class="busca-empty-icon">🎵</div>
      <h3>Nenhum artista encontrado</h3>
      <p>Não encontramos "${query}" na programação. Tente outro nome.</p>
    </div>`;
    return;
  }
  // Agrupar por artista
  const byArtist = shows.reduce((acc, s) => {
    if (!acc[s.artistaId]) acc[s.artistaId] = { id:s.artistaId, nome:s.artistaNome, genero:s.artistaGeneroMusical, shows:[] };
    acc[s.artistaId].shows.push(s);
    return acc;
  }, {});
  const artistas = Object.values(byArtist);
  const total    = shows.length;

  const artistaHTML = artistas.map((a, ai) => {
    const showItems = a.shows.sort((x,y) => new Date(x.dataHora)-new Date(y.dataHora)).map((s, si) => `
      <div class="show-result-item" onclick="openPolo(${s.poloId})">
        <div class="sr-num">${si+1}</div>
        <div class="sr-info">
          <div class="sr-polo">${s.poloNome}</div>
          <div class="sr-date">${fmtDateFull(s.dataHora)}</div>
          ${s.observacoes ? `<div class="sr-obs">✦ ${s.observacoes}</div>` : ''}
        </div>
        <div class="sr-time">${fmtTime(s.dataHora)}</div>
      </div>`).join('');
    return `<div class="artista-block" style="animation:fadeUp .5s ease ${ai*.1}s both">
      <div class="artista-header">
        <div class="artista-icon">🎤</div>
        <div>
          <div class="artista-nome">${a.nome}</div>
          ${a.genero ? `<div class="artista-genero">${a.genero}</div>` : ''}
        </div>
        <div class="artista-count">
          <div class="artista-count-n">${a.shows.length}</div>
          <div class="artista-count-l">${a.shows.length===1?'show':'shows'}</div>
        </div>
      </div>
      <div class="show-result-list">${showItems}</div>
    </div>`;
  }).join('');

  results.innerHTML = `
    <div class="busca-result-header">
      <div class="busca-query">"${query}"</div>
      <div class="busca-total">${artistas.length} artista${artistas.length>1?'s':''} · ${total} apresentaç${total>1?'ões':'ão'}</div>
    </div>
    ${artistaHTML}`;
}

/* ═══════════════════════════════════════════
   HELPERS DE DATA
═══════════════════════════════════════════ */
function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
}
function fmtDateLabel(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'long' });
}
function fmtDateFull(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { weekday:'short', day:'2-digit', month:'long', year:'numeric' });
}
function groupByDay(shows) {
  return shows.reduce((acc, s) => {
    const d = new Date(s.dataHora).toDateString();
    if (!acc[d]) acc[d] = [];
    acc[d].push(s);
    return acc;
  }, {});
}
// Ativa a subida dos emojis na inicialização da página
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('particles');
  if (!container) return;

  // Definição dos emojis
  const elementosJuninos = ['🎈', '🌽', '🔥', '✨'];

  setInterval(() => {
    const elemento = document.createElement('span');
    elemento.className = 'particle';
    
    // Sorteia o símbolo junino
    elemento.innerText = elementosJuninos[Math.floor(Math.random() * elementosJuninos.length)];
    
    // Distribui em locais, tamanhos e tempos aleatórios para dar naturalidade
    elemento.style.left = Math.random() * 100 + 'vw';
    elemento.style.animationDuration = (Math.random() * 4 + 5) + 's'; // Entre 5s e 9s
    elemento.style.fontSize = (Math.random() * 1.3 + 0.9) + 'rem';

    container.appendChild(elemento);

    // Remove o elemento após sumir da tela para economizar memória do navegador
    setTimeout(() => {
      elemento.remove();
    }, 9000);
  }, 450); // Injeta um elemento novo a cada 450ms
});