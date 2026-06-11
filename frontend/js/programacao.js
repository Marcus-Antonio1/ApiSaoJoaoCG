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