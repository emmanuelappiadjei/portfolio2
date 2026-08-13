/* Portfolio version 2026.08.13.7 - navigation and creative-marketing trail. */
(function () {
  'use strict';

  const routes = Array.from(document.querySelectorAll('[data-route-panel]'));
  const routeLinks = Array.from(document.querySelectorAll('[data-route]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const nav = document.querySelector('.site-header nav');
  const menu = document.querySelector('.menu-button');
  const trail = document.querySelector('#cursor-trail');

  const trailTokens = [
    'MKT_01', 'AUD_SEG', 'CTR++', 'ROI', 'EMAIL_06', '//CASE',
    'EVT_633', '+111%', '$1.5M', 'IMP_62809', 'CTA->', 'CRM_SYNC',
    'BRAND_MATCH', 'SOCIAL_04', 'LEAD_001', 'OPEN_RATE', 'EVENT_LIVE',
    'CONTENT_PLAN', 'HOOK_01', 'STORY_ARC', 'CREATIVE_BRIEF', 'ASSET_12',
    'ENG_RATE', 'POST_LIVE', 'CAMPAIGN_ID', 'MSG_TEST', 'AUD_INSIGHT'
  ];

  function showRoute(name, updateHash) {
    const target = routes.find((route) => route.dataset.routePanel === name) || routes[0];
    if (!target) return;

    routes.forEach((route) => route.classList.toggle('active', route === target));
    navLinks.forEach((link) => link.classList.toggle('active', link.dataset.route === target.dataset.routePanel));

    if (nav) nav.classList.remove('open');
    if (menu) menu.setAttribute('aria-expanded', 'false');
    if (updateHash) history.pushState(null, '', '#' + target.dataset.routePanel);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  routeLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showRoute(link.dataset.route, true);
    });
  });

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }

  window.addEventListener('popstate', () => showRoute(location.hash.slice(1) || 'home', false));

  let lastTrailTime = 0;
  let trailIndex = 0;

  window.addEventListener('pointermove', (event) => {
    if (!trail || event.pointerType === 'touch' || performance.now() - lastTrailTime < 48) return;
    lastTrailTime = performance.now();

    const token = document.createElement('span');
    token.className = 'trail-bit';
    token.textContent = trailTokens[trailIndex++ % trailTokens.length];
    token.style.left = event.clientX + 12 + 'px';
    token.style.top = event.clientY + 8 + 'px';
    trail.appendChild(token);
    token.addEventListener('animationend', () => token.remove(), { once: true });
  });

  showRoute(location.hash.slice(1) || 'home', false);
})();
