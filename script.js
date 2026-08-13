const routes = [...document.querySelectorAll('[data-route-panel]')];
const links = [...document.querySelectorAll('[data-route]')];
const nav = document.querySelector('nav');
const menu = document.querySelector('.menu-button');
const glow = document.querySelector('.cursor-glow');

function showRoute(name, updateHash = true) {
  const target = routes.find((route) => route.dataset.routePanel === name) || routes[0];
  routes.forEach((route) => route.classList.toggle('active', route === target));
  document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.route === target.dataset.routePanel));
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  if (updateHash) history.pushState(null, '', `#${target.dataset.routePanel}`);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

links.forEach((link) => link.addEventListener('click', (event) => {
  const name = link.dataset.route;
  if (!name) return;
  event.preventDefault();
  showRoute(name);
}));

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

window.addEventListener('popstate', () => showRoute(location.hash.slice(1) || 'home', false));
window.addEventListener('mousemove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.querySelectorAll('.work-card').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.querySelector('.work-art').style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) scale(.985)`;
  });
  card.addEventListener('mouseleave', () => card.querySelector('.work-art').style.transform = '');
});

window.addEventListener('load', () => {
  showRoute(location.hash.slice(1) || 'home', false);
  setTimeout(() => document.querySelector('.page-wipe').classList.add('done'), 250);
});
