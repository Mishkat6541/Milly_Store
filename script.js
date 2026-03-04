/* =====================================================
   MILLY ROCK.UK – JAVASCRIPT
   ===================================================== */

// ── Set current year in footer ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Mobile hamburger menu ──
const hamburger = document.querySelector('.hamburger');
const mainNav   = document.querySelector('.main-nav');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mainNav.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked (mobile UX)
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mainNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ── Contact form ──
const form       = document.getElementById('contactForm');
const formStatus = form.querySelector('.form-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = '#f9a8a8';
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.style.color = '#f9a8a8';
    formStatus.textContent = 'Please enter a valid email address.';
    return;
  }

  // Simulate a successful submission (replace with real API call / EmailJS etc.)
  formStatus.style.color = '#aef';
  formStatus.textContent = 'Thank you! We\'ll be in touch soon.';
  form.reset();
});

// ── Scroll-based header shadow ──
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 16px rgba(0,0,0,0.14)'
    : '0 2px 8px rgba(0,0,0,0.08)';
});

// ── Testimonial Carousel ──
(function () {
  const track   = document.querySelector('.carousel-track');
  if (!track) return;

  const cards   = Array.from(track.querySelectorAll('.testimonial-card'));
  const dotsWrap = document.getElementById('carouselDots');
  const perView = () => window.innerWidth <= 700 ? 1 : 2;

  let current = 0;
  let autoTimer;

  // Build dots
  const totalSlides = () => Math.ceil(cards.length / perView());
  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const d = document.createElement('button');
      d.className = 'dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', `Go to slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    const total = totalSlides();
    current = (index + total) % total;
    // Translate by containerWidth per page (not % of track, which is much wider)
    const containerWidth = track.parentElement.offsetWidth;
    track.style.transform = `translateX(-${current * containerWidth}px)`;
    updateDots();
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Set card widths — each card fills 1/perView of the container
  function setWidths() {
    cards.forEach(c => c.style.minWidth = `${100 / perView()}%`);
    buildDots();
    goTo(0);
  }

  document.querySelector('.carousel-btn.prev').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.querySelector('.carousel-btn.next').addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  });

  window.addEventListener('resize', setWidths);
  setWidths();
  startAuto();
})();

// ── Lazy / fallback for missing images: show a soft placeholder ──
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.background = '#e8ddd4';
    this.removeAttribute('src');          // prevents infinite error loop
    this.style.minHeight = this.style.minHeight || '160px';
  });
});
