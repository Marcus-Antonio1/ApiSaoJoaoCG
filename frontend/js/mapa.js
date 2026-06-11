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