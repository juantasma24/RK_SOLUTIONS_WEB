/* ============================================
   RK SOLUTIONS � La Manzana Redesign
   main.js � Vanilla JS interactions & animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Header scroll effect + topbar hide --- */
  const header = document.querySelector('.header');
  const topbar = document.querySelector('.topbar');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 60;
      header.classList.toggle('header--scrolled', scrolled);
      if (topbar) {
        topbar.classList.toggle('hidden', scrolled);
        header.classList.toggle('header--top-hidden', scrolled);
      }
    }, { passive: true });
  }

  /* --- Theme toggle (dark/light) --- */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const iconMoon = themeToggle.querySelector('.topbar__icon-moon');
    const iconSun = themeToggle.querySelector('.topbar__icon-sun');

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (iconMoon && iconSun) {
        iconMoon.style.display = theme === 'dark' ? '' : 'none';
        iconSun.style.display = theme === 'light' ? '' : 'none';
      }
    }

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('rk-theme', next);
    });

    const saved = localStorage.getItem('rk-theme');
    if (saved) applyTheme(saved);
  }

  /* --- Language dropdown --- */
  const langDropdown = document.getElementById('langDropdown');
  const langToggle = document.getElementById('langToggle');
  if (langDropdown && langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });

    langDropdown.querySelectorAll('.topbar__lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        langToggle.childNodes[0].textContent = btn.textContent + ' ';
        langDropdown.classList.remove('open');
      });
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('open');
    });
  }

  /* --- Mobile menu --- */
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- IntersectionObserver: scroll-reveal --- */
  const revealElements = document.querySelectorAll('.anim-reveal, .anim-slide-up');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* --- Hero title letter-by-letter hover --- */
  document.querySelectorAll('.hero__title-line').forEach(line => {
    const text = line.textContent;
    line.innerHTML = '';
    [...text].forEach(ch => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      line.appendChild(span);
    });
  });

  /* --- Falling 3D apples in hero --- */
  const heroApplesContainer = document.querySelector('.hero__apples');
  const heroApples = document.querySelectorAll('.hero__apple');

  // Store each apple's CSS-defined rotation before JS touches them
  const appleRotations = [15, -10, 15, -15]; // matching CSS: apple 1-4

  if (heroApples.length && heroApplesContainer) {
    heroApplesContainer.style.overflow = 'visible';

    let maxEndTime = 0;

    heroApples.forEach((apple, i) => {
      const baseRotation = appleRotations[i] || 0;

      // Position off-screen above with correct rotation
      apple.style.transform = `translateY(-120vh) rotate(${baseRotation}deg)`;
      apple.style.opacity = '1';

      const delay = 100 + i * 200;
      const duration = 1400 + i * 150;
      const endTime = delay + duration;
      if (endTime > maxEndTime) maxEndTime = endTime;

      setTimeout(() => {
        // Fall down to resting position
        apple.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease`;
        apple.style.transform = `translateY(0) rotate(${baseRotation}deg)`;

        // Start float after fall completes
        setTimeout(() => {
          apple.style.transition = 'none';
          appleFloat(apple, baseRotation);
        }, duration + 50);
      }, delay);
    });

    // Clip overflow after all apples have landed + buffer
    setTimeout(() => {
      heroApplesContainer.style.overflow = 'hidden';
    }, maxEndTime + 200);
  }

  function appleFloat(el, baseRotation) {
    const amplitude = 9.66;
    const speed = 0.00966;
    let t = 0;
    let rampUp = 0;

    function animate() {
      t += speed;
      rampUp = Math.min(rampUp + 0.01, 1);
      const y = Math.sin(t) * amplitude * rampUp;
      const r = baseRotation + Math.sin(t * 0.7) * 2 * rampUp;
      el.style.transform = `translateY(${y}px) rotate(${r}deg)`;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  /* --- Counter animation --- */
  const counterCards = document.querySelectorAll('.contador-card__number');
  if (counterCards.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterCards.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const text = el.textContent.trim();
    const prefix = text.startsWith('+') ? '+' : '';
    const suffix = text.replace(/[0-9+.]/g, '').trim();
    const numStr = text.replace(/[^0-9.]/g, '');
    const target = parseFloat(numStr);

    if (isNaN(target)) return;

    const isFloat = numStr.includes('.');
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isFloat) {
        el.textContent = prefix + current.toFixed(0) + suffix;
      } else if (target >= 1000) {
        el.textContent = prefix + (current / 1000).toFixed(current >= target ? 0 : 0) + 'K' + suffix;
        if (progress >= 1) {
          el.textContent = prefix + (target / 1000) + 'K' + suffix;
        }
      } else {
        el.textContent = prefix + Math.floor(current) + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* --- Testimonials carousel --- */
  const track = document.querySelector('.testimonios__track');
  const dots = document.querySelectorAll('.testimonios__dot');
  if (track && dots.length) {
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoInterval;

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAuto();
      });
    });

    function nextSlide() {
      goToSlide((currentSlide + 1) % totalSlides);
    }

    function startAuto() {
      autoInterval = setInterval(nextSlide, 5000);
    }

    function resetAuto() {
      clearInterval(autoInterval);
      startAuto();
    }

    startAuto();

    const carousel = document.querySelector('.testimonios__carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(autoInterval));
      carousel.addEventListener('mouseleave', startAuto);
    }
  }

  /* --- FAQ accordion --- */
  const faqQuestions = document.querySelectorAll('.faq-item__question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-item__answer');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      faqQuestions.forEach(otherBtn => {
        const otherItem = otherBtn.closest('.faq-item');
        const otherAnswer = otherItem.querySelector('.faq-item__answer');
        otherBtn.setAttribute('aria-expanded', 'false');
        otherAnswer.style.maxHeight = '0';
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --- Back to top --- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Contact form basic validation --- */
  const contactForm = document.querySelector('.contacto__form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = contactForm.querySelector('input[name="nombre"]');
      const correo = contactForm.querySelector('input[name="correo"]');
      const movil = contactForm.querySelector('input[name="movil"]');
      const privacidad = contactForm.querySelector('input[name="privacidad"]');

      if (!nombre.value.trim() || !correo.value.trim()) {
        alert('Por favor, completa los campos obligatorios.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo.value.trim())) {
        alert('Por favor, introduce un correo electr�nico v�lido.');
        return;
      }

      if (!privacidad.checked) {
        alert('Debes aceptar la pol�tica de privacidad.');
        return;
      }

      alert('�Gracias! Tu mensaje ha sido enviado correctamente.');
      contactForm.reset();
    });
  }

  /* --- Parallax apples on scroll (subtle) --- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.pilares__apple').forEach((apple, i) => {
          const speed = 0.02 + i * 0.01;
          apple.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* --- Video loop fallback --- */
  const bgVideo = document.querySelector('.autonomos__video-bg video');
  if (bgVideo) {
    bgVideo.addEventListener('ended', () => {
      bgVideo.currentTime = 0;
      bgVideo.play();
    });
  }

});
