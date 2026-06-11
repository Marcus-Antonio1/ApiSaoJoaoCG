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