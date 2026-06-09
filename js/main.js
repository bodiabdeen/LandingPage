/**
 * main.js
 * Initialises all interactive behaviour:
 *   – Project grid rendering
 *   – Scroll-reveal (IntersectionObserver)
 *   – Custom cursor
 *   – Smooth anchor scrolling
 *   – Bilingual EN / AR switching
 */

import { projects, GROUPS } from './projects.js';
import { translations }      from './i18n.js';

/* ══════════════════════════════════════════
   1. Project Grid
   ══════════════════════════════════════════ */

const ARROW_SVG = `
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5"
          stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>
`;

function renderProjects(lang) {
  const grid = document.getElementById('proj-grid');
  if (!grid) return;

  grid.innerHTML = '';

  projects.forEach(p => {
    const g     = GROUPS[p.group] ?? { color: '#c8a84b' };
    const data  = (lang === 'ar' && p.ar) ? p.ar : p;

    const card = document.createElement('a');
    card.href      = p.href;
    card.target    = '_blank';
    card.rel       = 'noopener noreferrer';
    card.className = 'proj-card reveal';

    card.innerHTML = `
      <div class="card-group" style="color:${g.color}">${data.group}</div>
      <div class="card-icon">${p.icon}</div>
      <div class="card-title">${data.title}</div>
      <div class="card-desc">${data.desc}</div>
      <div class="card-footer">
        <span class="card-url">${p.url}</span>
        <span class="card-arrow">${ARROW_SVG}</span>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════
   2. Scroll Reveal
   ══════════════════════════════════════════ */

function observeReveal(elements) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in'), i * 55);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06 }
  );
  elements.forEach(el => observer.observe(el));
}

function initScrollReveal() {
  observeReveal(document.querySelectorAll('.reveal'));
}

/* ══════════════════════════════════════════
   3. Custom Cursor
   ══════════════════════════════════════════ */

function initCursor() {
  const curEl = document.getElementById('cur');
  const ring  = document.getElementById('cur-ring');
  if (!curEl || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function loop() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;

    curEl.style.left = mx + 'px';
    curEl.style.top  = my + 'px';
    ring.style.left  = rx + 'px';
    ring.style.top   = ry + 'px';

    requestAnimationFrame(loop);
  })();
}

/* ══════════════════════════════════════════
   4. Smooth Anchor Scrolling
   ══════════════════════════════════════════ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ══════════════════════════════════════════
   5. Language Switching
   ══════════════════════════════════════════ */

function setLanguage(lang) {
  const html = document.documentElement;
  html.lang  = lang;
  html.dir   = lang === 'ar' ? 'rtl' : 'ltr';

  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = t['lang.toggle'];

  renderProjects(lang);
  observeReveal(document.querySelectorAll('#proj-grid .reveal'));

  try { localStorage.setItem('lang', lang); } catch (_) {}
}

/* ══════════════════════════════════════════
   Bootstrap
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = (() => { try { return localStorage.getItem('lang'); } catch (_) { return null; } })();
  const lang = savedLang === 'ar' ? 'ar' : 'en';

  renderProjects(lang);
  initScrollReveal();
  initCursor();
  initSmoothScroll();

  if (lang === 'ar') {
    document.documentElement.lang = 'ar';
    document.documentElement.dir  = 'rtl';
    const t = translations.ar;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = t['lang.toggle'];
  }

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.lang === 'ar' ? 'en' : 'ar';
    setLanguage(next);
  });
});
