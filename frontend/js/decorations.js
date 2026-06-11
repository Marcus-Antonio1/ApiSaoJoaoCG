function buildBandeirolas(id) {
  const el = document.getElementById(id);

  if (!el) return;

  const colors = [
    '#c0392b',
    '#f1c40f',
    '#2980b9',
    '#27ae60',
    '#e67e22',
    '#8e44ad',
    '#c0392b',
    '#f1c40f',
    '#2980b9',
    '#27ae60',
    '#e67e22',
    '#8e44ad',
    '#c0392b',
    '#f1c40f',
    '#2980b9',
    '#27ae60',
    '#e67e22'
  ];

  const w = 1200;
  const count = colors.length;
  const spacing = w / count;
  const ropeY = 15;

  let ropePath = `M0,${ropeY}`;

  colors.forEach((_, i) => {
    const cx = (i + .5) * spacing;
    ropePath += ` Q${cx},30 ${cx + spacing / 2},${ropeY}`;
  });

  const triangles = colors.map((color, i) => {

    const cx = (i + .5) * spacing;
    const ty = ropeY + Math.sin(i * .9) * 3;

    return `
      <polygon
        points="${cx-9},${ty} ${cx+9},${ty} ${cx},${ty+22}"
        fill="${color}"
        opacity=".88"
      />
    `;
  }).join('');

  el.innerHTML = `
    <svg
      viewBox="0 0 ${w} 60"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="${ropePath}"
        fill="none"
        stroke="rgba(212,168,83,.5)"
        stroke-width="1.2"
      />
      ${triangles}
    </svg>
  `;
}