/**
 * main.js
 * Initialises all interactive behaviour:
 *   – Project grid rendering
 *   – Scroll-reveal (IntersectionObserver)
 *   – Custom cursor
 *   – Smooth anchor scrolling
 */

import { projects, GROUPS } from './projects.js';

/* ══════════════════════════════════════════
   1. Project Grid
   ══════════════════════════════════════════ */

function renderProjects() {
  const grid = document.getElementById('proj-grid');
  if (!grid) return;

  const ARROW_SVG = `
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5"
            stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `;

  projects.forEach(p => {
    const g = GROUPS[p.group] ?? { color: '#c8a84b' };

    const card = document.createElement('a');
    card.href      = p.href;
    card.target    = '_blank';
    card.rel       = 'noopener noreferrer';
    card.className = 'proj-card reveal';

    card.innerHTML = `
      <div class="card-group" style="color:${g.color}">${p.group}</div>
      <div class="card-icon">${p.icon}</div>
      <div class="card-title">${p.title}</div>
      <div class="card-desc">${p.desc}</div>
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

function initScrollReveal() {
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

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
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
   Bootstrap
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initScrollReveal();
  initCursor();
  initSmoothScroll();
});
