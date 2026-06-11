function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    hour:'2-digit',
    minute:'2-digit'
  });
}

function fmtDateLabel(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    weekday:'long',
    day:'2-digit',
    month:'long'
  });
}

function fmtDateFull(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    weekday:'short',
    day:'2-digit',
    month:'long',
    year:'numeric'
  });
}

function groupByDay(shows) {
  return shows.reduce((acc, s) => {

    const d = new Date(s.dataHora).toDateString();

    if (!acc[d]) acc[d] = [];

    acc[d].push(s);

    return acc;

  }, {});
}