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