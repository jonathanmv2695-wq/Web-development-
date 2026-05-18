(() => {
  'use strict';

  /* ---------- Age gate ---------- */
  const STORAGE_KEY = 'hwy99-age-confirmed';
  const gate = document.getElementById('ageGate');
  const body = document.body;

  const lockScroll = (lock) => {
    body.style.overflow = lock ? 'hidden' : '';
  };

  const closeGate = () => {
    if (!gate) return;
    gate.style.opacity = '0';
    setTimeout(() => {
      gate.hidden = true;
      lockScroll(false);
    }, 400);
  };

  if (gate) {
    let confirmed = false;
    try { confirmed = sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (_) {}

    if (confirmed) {
      gate.hidden = true;
    } else {
      lockScroll(true);
      gate.addEventListener('click', (e) => {
        const target = e.target.closest('[data-age]');
        if (!target) return;
        if (target.dataset.age === 'yes') {
          try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
          closeGate();
        } else {
          window.location.href = 'https://www.google.com';
        }
      });
    }
  }

  /* ---------- Mobile nav ---------- */
  const nav = document.querySelector('.nav');
  const toggle = document.getElementById('navToggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.dataset.open === 'true';
      nav.dataset.open = open ? 'false' : 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    });

    nav.querySelectorAll('.nav__links a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.dataset.open = 'false';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ---------- Daily deal of the day ---------- */
  const dealsList = document.getElementById('dealsList');
  const dealsToday = document.getElementById('dealsToday');
  if (dealsList) {
    const today = new Date().getDay(); // 0=Sun ... 6=Sat
    const match = dealsList.querySelector(`.deal[data-day="${today}"]`);
    if (match) {
      match.setAttribute('data-today', 'true');
      if (dealsToday) {
        const name = match.querySelector('.deal__name')?.textContent?.trim();
        if (name) dealsToday.textContent = `Today → ${name} · 10% off`;
      }
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const targets = document.querySelectorAll(
    '.hero__text, .hero__sign-glass, .strain, .cat, .deal, .story, .pillar, .visit__card, .section__head'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Year ---------- */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
