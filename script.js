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

  /* ---------- Reviews carousel ---------- */
  const carousel = document.getElementById('reviews-carousel');
  if (carousel) {
    const track = carousel.querySelector('#reviewsTrack');
    const slides = Array.from(track.querySelectorAll('.review'));
    const dotsWrap = carousel.querySelector('#reviewsDots');
    const prevBtn = carousel.querySelector('.reviews__arrow--prev');
    const nextBtn = carousel.querySelector('.reviews__arrow--next');
    const ADVANCE_MS = 6000;
    let index = 0;
    let timer = null;

    // Build dots
    slides.forEach((_, i) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', `Show review ${i + 1}`);
      btn.addEventListener('click', () => go(i, true));
      li.appendChild(btn);
      dotsWrap.appendChild(li);
    });
    const dots = Array.from(dotsWrap.querySelectorAll('button'));

    const go = (next, fromUser = false) => {
      const n = (next + slides.length) % slides.length;
      slides[index].classList.remove('is-active');
      dots[index].removeAttribute('aria-current');
      index = n;
      slides[index].classList.add('is-active');
      dots[index].setAttribute('aria-current', 'true');
      if (fromUser) restart();
    };

    const tick  = () => go(index + 1);
    const start = () => { timer = setInterval(tick, ADVANCE_MS); };
    const stop  = () => { if (timer) { clearInterval(timer); timer = null; } };
    const restart = () => { stop(); start(); };

    dots[0].setAttribute('aria-current', 'true');
    prevBtn.addEventListener('click', () => go(index - 1, true));
    nextBtn.addEventListener('click', () => go(index + 1, true));

    // Pause on hover / focus
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin',  stop);
    carousel.addEventListener('focusout', start);

    // Keyboard arrows when carousel is in viewport / focused
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); go(index - 1, true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1, true); }
    });

    // Only auto-advance while the section is on-screen (saves cycles)
    if ('IntersectionObserver' in window) {
      const vis = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.isIntersecting ? start() : stop());
      }, { threshold: 0.25 });
      vis.observe(carousel);
    } else {
      start();
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const targets = document.querySelectorAll(
    '.hero__text, .hero__sign-glass, .strain, .cat, .deal, .reviews__stage, .story, .pillar, .visit__card, .section__head'
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

  /* ---------- Draft-mode pre-launch checklist (?draft=1) ---------- */
  const checklist = document.getElementById('draftChecklist');
  if (checklist) {
    const params = new URLSearchParams(window.location.search);
    if (params.has('draft')) {
      checklist.hidden = false;
      document.getElementById('draftClose')?.addEventListener('click', () => {
        checklist.hidden = true;
      });
    }
  }
})();
