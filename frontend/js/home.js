/* ═══════════════════════════════════════════
   COUNTDOWN
═══════════════════════════════════════════ */
function initCountdown() {
  function tick() {
    const now = new Date();
    const target = new Date(now.getFullYear(), 4, 30); // 30 maio
    if (now > target) target.setFullYear(target.getFullYear() + 1);
    const diff = target - now;
    const pad = n => String(Math.floor(n)).padStart(2, '0');
    document.getElementById('cd-dias').textContent = pad(diff / 86400000);
    document.getElementById('cd-horas').textContent = pad((diff % 86400000) / 3600000);
    document.getElementById('cd-min').textContent = pad((diff % 3600000) / 60000);
    document.getElementById('cd-seg').textContent = pad((diff % 60000) / 1000);
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════
   HOME 
═══════════════════════════════════════════ */
async function loadHomeData() {
  try {
    const [polosRes, showsRes, artistasRes] = await Promise.all([
      fetch(`${API}/polos`),
      fetch(`${API}/shows`),
      fetch(`${API}/artistas`),
    ]);
    allPolos = await polosRes.json();
    allShows = await showsRes.json();
    allArtistas = await artistasRes.json();
    renderStats();
    renderPolosGrid();
  } catch (e) {
    document.getElementById('polos-grid').innerHTML = `<div class="empty-state">
      <p>⚠️ Não foi possível conectar à API.</p>
      <p style="font-size:.8rem;margin-top:.5rem;color:var(--dimmed)">Verifique se o backend está rodando em localhost:8080</p>
    </div>`;
  }
}

function renderStats() {
  document.getElementById('stat-shows').textContent = allShows.length;
  document.getElementById('stat-polos').textContent = allPolos.length;
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
    // TRATAMENTO SEGURO: Busca no objeto. Se não existir, deixa uma string vazia temporária
    let fotoPolo = POLO_IMAGES[polo.id] || '';

    
    const shows = (typeof allShows !== 'undefined' && allShows) ? allShows.filter(s => s.poloId === polo.id).length : 0;

    
    const estiloBackground = fotoPolo
      ? `background-image: url('${fotoPolo}');`
      : `background-color: var(--wood-dark);`;

    const entradaTag = polo.temEntradaGratuita
      ? '<span class="tag tag-free">✦ Gratuito</span>'
      : '<span class="tag tag-paid">🎟 Pago</span>';

    const tremTag = polo.nome === 'Trem do Forró'
      ? '<span class="tag tag-unavailable">🚂 Indisponível em 2026</span>'
      : '';

  return `
  <article
    class="polo-card"
    onclick="openPolo(${polo.id})"
    style="animation:fadeUp .6s ease ${i * .08}s both"
    tabindex="0"
    onkeydown="if(event.key==='Enter')openPolo(${polo.id})"
    aria-label="Ver ${polo.nome}">

    <div class="polo-card-img" style="${estiloBackground}">
      <div class="polo-card-tags">
        ${entradaTag}
        ${tremTag}
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
  document.getElementById('polos-section')?.scrollIntoView({ behavior: 'smooth' });
}

