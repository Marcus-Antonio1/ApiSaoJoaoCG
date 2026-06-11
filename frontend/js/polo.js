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