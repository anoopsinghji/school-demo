/* ============================================================
   MAIN.JS — Edgemont School School Website
   Shared utilities: Navbar, Animations, Counter, WhatsApp
   ============================================================ */

'use strict';

/* ─── Hero Carousel ─────────────────────────────────────────── */
(function initHeroCarousel() {
  const carousel = document.querySelector('[data-hero-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('.hero-carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  if (!track || !slides.length) return;

  const dots = Array.from(document.querySelectorAll('.hero-dot'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let timerId = null;

  function updateDots(index) {
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function showSlide(index, restartTimer = false) {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    // Ken Burns: reset scale on all, activate on current
    slides.forEach((s, i) => s.classList.toggle('is-active', i === activeIndex));
    updateDots(activeIndex);
    if (restartTimer && !reduceMotion) startTimer();
  }

  function startTimer() {
    if (reduceMotion || slides.length < 2) return;
    stopTimer();
    timerId = window.setInterval(() => showSlide(activeIndex + 1), 5000);
  }

  function stopTimer() {
    if (timerId !== null) { window.clearInterval(timerId); timerId = null; }
  }

  // Dot click navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.slide, 10), true);
    });
  });

  carousel.addEventListener('pointerenter', stopTimer);
  carousel.addEventListener('pointerleave', startTimer);
  carousel.addEventListener('focusin', stopTimer);
  carousel.addEventListener('focusout', startTimer);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimer(); else startTimer();
  });

  showSlide(0);
  startTimer();
})();


/* ─── Navbar ─────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!navbar) return;

  navbar.classList.add('scrolled');
  navbar.classList.remove('transparent');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ─── Scroll Animations ──────────────────────────────────────── */
(function initFadeUp() {
  const targets = document.querySelectorAll('.fade-up');
  if (!targets.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => observer.observe(el));
})();

/* ─── Animated Counters ──────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
})();

/* ─── Smooth Scroll ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 116, behavior: 'smooth' });
    }
  });
});

/* ─── WhatsApp ───────────────────────────────────────────────── */
(function initWhatsApp() {
  const btn = document.getElementById('whatsappBtn');
  if (!btn) return;
  const phone = '919876543210';
  const message = encodeURIComponent('Hello! I am interested in admission at Edgemont School. Please provide more information.');
  btn.href = `https://wa.me/${phone}?text=${message}`;
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
})();

/* ─── Admission Form ─────────────────────────────────────────── */
(function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;

  function validateField(input) {
    const value = input.value.trim();
    const errorEl = input.nextElementSibling;
    let valid = true, msg = '';
    if (input.required && !value) { valid = false; msg = 'This field is required.'; }
    else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { valid = false; msg = 'Please enter a valid email.'; }
    else if (input.type === 'tel' && value && !/^[6-9]\d{9}$/.test(value.replace(/\s/g,''))) { valid = false; msg = 'Please enter a valid 10-digit mobile number.'; }
    input.classList.toggle('error', !valid);
    if (errorEl && errorEl.classList.contains('form-error')) { errorEl.textContent = msg; errorEl.classList.toggle('show', !valid); }
    return valid;
  }

  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => { if (input.classList.contains('error')) validateField(input); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let allValid = true;
    form.querySelectorAll('input, select, textarea').forEach(input => { if (!validateField(input)) allValid = false; });
    if (!allValid) return;

    const inquiry = {
      id: Date.now(),
      parentName: form.parentName.value.trim(),
      studentName: form.studentName.value.trim(),
      mobile: form.mobile.value.trim(),
      email: form.email.value.trim(),
      classApplying: form.classApplying.value,
      message: form.message.value.trim(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'New'
    };
    const inquiries = JSON.parse(localStorage.getItem('ea_inquiries') || '[]');
    inquiries.unshift(inquiry);
    localStorage.setItem('ea_inquiries', JSON.stringify(inquiries));

    form.style.display = 'none';
    const successBox = document.getElementById('formSuccess');
    if (successBox) successBox.style.display = 'block';
  });

  const resetBtn = document.getElementById('resetForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset(); form.style.display = '';
      document.getElementById('formSuccess').style.display = 'none';
    });
  }
})();

/* ─── Contact Form ───────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
      btn.style.background = '#10B981';
      form.reset();
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; btn.disabled = false; }, 3000);
    }, 1200);
  });
})();

/* ─── Gallery ────────────────────────────────────────────────── */
(function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const show = cat === 'all' || item.getAttribute('data-category') === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay) return;
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-thumb');
      if (img && img.tagName === 'IMG') {
        const lightboxImg = document.getElementById('lightboxImage');
        if (lightboxImg) lightboxImg.src = img.src;
      }
      document.getElementById('lightboxCaption').textContent = item.getAttribute('data-caption') || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.closest('#lightboxClose')) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  });
})();

/* ─── Lazy Load ──────────────────────────────────────────────── */
(function initLazyLoad() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.removeAttribute('data-src');
        observer.unobserve(entry.target);
      }
    });
  });
  imgs.forEach(img => observer.observe(img));
})();
