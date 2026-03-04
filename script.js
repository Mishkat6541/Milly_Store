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

// ── Lazy / fallback for missing images: show a soft placeholder ──
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.background = '#e8ddd4';
    this.removeAttribute('src');          // prevents infinite error loop
    this.style.minHeight = this.style.minHeight || '160px';
  });
});
