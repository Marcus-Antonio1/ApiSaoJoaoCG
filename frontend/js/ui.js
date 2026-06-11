function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);

  const busca = params.get('busca');

  if (busca) {
    showPage('busca');
    setSuggestion(busca);
    doSearch();
  }
}

function initNavbar() {
  window.addEventListener('scroll', () => {
    document
      .getElementById('navbar')
      .classList.toggle(
        'scrolled',
        window.scrollY > 40
      );
  });
}

function toggleMenu() {
  document
    .getElementById('mobile-menu')
    .classList.toggle('open');
}

function showPage(name) {

  document
    .querySelectorAll('.page')
    .forEach(p => p.classList.remove('active'));

  document
    .querySelectorAll('.nav-link')
    .forEach(l => l.classList.remove('active'));

  const pageMap = {
    home: 'page-home',
    polo: 'page-polo',
    prog: 'page-prog',
    busca: 'page-busca'
  };

  const pg = document.getElementById(pageMap[name]);

  if (pg) {
    pg.classList.add('active');
    window.scrollTo(0, 0);
  }

  const linkMap = {
    home: 'home',
    prog: 'prog',
    busca: 'busca'
  };

  if (linkMap[name]) {
    document
      .querySelector(`[data-page="${linkMap[name]}"]`)
      ?.classList.add('active');
  }

  if (name === 'prog' && allShows.length === 0) {
    loadProg();
  }
}