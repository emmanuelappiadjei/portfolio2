const routes = [...document.querySelectorAll('[data-route-panel]')];
const routeLinks = [...document.querySelectorAll('[data-route]')];
const nav = document.querySelector('nav');
const menu = document.querySelector('.menu-button');
const trail = document.querySelector('#cursor-trail');

const trailTokens = [
  '01',
  '10',
  'EA',
  '//',
  '0x17',
  '+',
  '001',
  '→',
  '[ ]',
  '26'
];

function showRoute(name, updateHash = true) {
  const target =
    routes.find((panel) => panel.dataset.routePanel === name) ||
    routes[0];

  routes.forEach((panel) => {
    panel.classList.toggle('active', panel === target);
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle(
      'active',
      link.dataset.route === target.dataset.routePanel
    );
  });

  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');

  if (updateHash) {
    history.pushState(null, '', `#${target.dataset.routePanel}`);
  }

  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
}

routeLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showRoute(link.dataset.route);
  });
});

menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});

window.addEventListener('popstate', () => {
  showRoute(location.hash.slice(1) || 'home', false);
});

let lastTrail = 0;
let tokenIndex = 0;

window.addEventListener('pointermove', (event) => {
  if (
    event.pointerType === 'touch' ||
    performance.now() - lastTrail < 65
  ) {
    return;
  }

  lastTrail = performance.now();

  const bit = document.createElement('span');

  bit.className = 'trail-bit';
  bit.textContent =
    trailTokens[tokenIndex++ % trailTokens.length];

  bit.style.left = `${event.clientX + 10}px`;
  bit.style.top = `${event.clientY + 8}px`;

  trail.appendChild(bit);

  bit.addEventListener(
    'animationend',
    () => bit.remove(),
    { once: true }
  );
});

window.addEventListener('load', () => {
  showRoute(location.hash.slice(1) || 'home', false);

  setTimeout(() => {
    document.querySelector('.page-intro').classList.add('done');
  }, 900);
});
