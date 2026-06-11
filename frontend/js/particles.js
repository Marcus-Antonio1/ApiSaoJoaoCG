function buildParticles() {

  const container = document.getElementById('particles');

  if (!container) return;

  const elementosJuninos = [
    '🎈',
    '🌽',
    '🔥',
    '✨'
  ];

  setInterval(() => {

    const elemento = document.createElement('span');

    elemento.className = 'particle';

    elemento.innerText =
      elementosJuninos[
        Math.floor(
          Math.random() *
          elementosJuninos.length
        )
      ];

    elemento.style.left =
      Math.random() * 100 + 'vw';

    elemento.style.animationDuration =
      (Math.random() * 4 + 5) + 's';

    elemento.style.fontSize =
      (Math.random() * 1.3 + 0.9) + 'rem';

    container.appendChild(elemento);

    setTimeout(() => {
      elemento.remove();
    }, 9000);

  }, 450);
}