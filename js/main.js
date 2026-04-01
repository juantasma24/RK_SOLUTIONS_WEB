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
    let maxEndTime = 0;

    // 1. Position ALL apples off-screen while still invisible (CSS opacity:0)
    heroApples.forEach((apple, i) => {
      const baseRotation = appleRotations[i] || 0;
      apple.style.transform = `translateY(-120vh) rotate(${baseRotation}deg)`;
    });

    // 2. Force reflow so transforms are committed before revealing
    heroApplesContainer.offsetHeight;

    // 3. Now make visible and set overflow
    heroApplesContainer.style.overflow = 'visible';
    heroApples.forEach(apple => { apple.style.opacity = '1'; });

    // 4. Start the fall animation
    heroApples.forEach((apple, i) => {
      const baseRotation = appleRotations[i] || 0;
      const delay = 100 + i * 200;
      const duration = 1400 + i * 150;
      const endTime = delay + duration;
      if (endTime > maxEndTime) maxEndTime = endTime;

      setTimeout(() => {
        apple.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
        apple.style.transform = `translateY(0) rotate(${baseRotation}deg)`;

        setTimeout(() => {
          apple.style.transition = 'none';
          appleFloat(apple, baseRotation);
        }, duration + 50);
      }, delay);
    });

    // Clip overflow after all apples have landed
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
  const counterSpans = document.querySelectorAll('.counter-animated');
  if (counterSpans.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterSpans.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(span) {
    const target = parseInt(span.dataset.target, 10);
    if (isNaN(target) || target === 0) return;

    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      span.textContent = current;

      if (progress < 1) requestAnimationFrame(update);
      else span.textContent = target;
    }
    requestAnimationFrame(update);
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

  /* --- Video loop fallback --- */
  const bgVideo = document.querySelector('.autonomos__video-bg video');
  if (bgVideo) {
    bgVideo.addEventListener('ended', () => {
      bgVideo.currentTime = 0;
      bgVideo.play();
    });
  }

  /* ============================================
     TESTIMONIOS CARRUSEL
     - Auto-avance cada 5 segundos
     - Pausa en hover
     - Flechas de navegación (de 3 en 3)
     - Indicadores (dots) dinámicos
     - Swipe touch para móvil
     ============================================ */
  const testimoniosCarousel = document.getElementById('testimoniosCarousel');
  const testimoniosTrack = document.getElementById('testimoniosTrack');
  const testimoniosPrev = document.getElementById('testimoniosPrev');
  const testimoniosNext = document.getElementById('testimoniosNext');
  const testimoniosIndicators = document.getElementById('testimoniosIndicators');

  if (testimoniosCarousel && testimoniosTrack && testimoniosPrev && testimoniosNext) {
    let currentIndex = 0;
    const slides = testimoniosTrack.querySelectorAll('.testimonio-slide');
    const totalSlides = slides.length;
    const autoAdvanceInterval = 5000; // 5 segundos
    let autoAdvanceTimer = null;
    let isPaused = false;

    // Número de slides visibles según viewport
    function getVisibleSlides() {
      if (window.innerWidth >= 1024) return 3;  // Desktop: 3 slides
      if (window.innerWidth >= 768) return 2;   // Tablet: 2 slides
      return 1;                                  // Móvil: 1 slide
    }

    // Calcular número de "páginas" (grupos de slides)
    function getTotalPages() {
      const visible = getVisibleSlides();
      return Math.ceil(totalSlides / visible);
    }

    // Generar indicadores dinámicamente
    function generateIndicators() {
      if (!testimoniosIndicators) return;
      testimoniosIndicators.innerHTML = '';
      const totalPages = getTotalPages();
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = `testimonios__dot${i === 0 ? ' active' : ''}`;
        dot.setAttribute('data-index', i);
        dot.setAttribute('aria-label', `Ir a la página ${i + 1}`);
        testimoniosIndicators.appendChild(dot);
      }
    }

    // Actualizar posición del carrusel
    function updateCarousel() {
      const visibleSlides = getVisibleSlides();
      const percentage = (currentIndex * 100) / visibleSlides;
      testimoniosTrack.style.transform = `translateX(-${percentage}%)`;

      // Actualizar indicadores
      const indicators = testimoniosIndicators.querySelectorAll('.testimonios__dot');
      indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    // Ir al slide siguiente (de 3 en 3)
    function nextSlide() {
      const visibleSlides = getVisibleSlides();
      const maxIndex = Math.ceil(totalSlides / visibleSlides) - 1;
      currentIndex = (currentIndex + 1) % (maxIndex + 1);
      updateCarousel();
    }

    // Ir al slide anterior (de 3 en 3)
    function prevSlide() {
      const visibleSlides = getVisibleSlides();
      const maxIndex = Math.ceil(totalSlides / visibleSlides) - 1;
      currentIndex = (currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1);
      updateCarousel();
    }

    // Ir a una página específica
    function goToPage(index) {
      const maxIndex = getTotalPages() - 1;
      currentIndex = Math.min(index, maxIndex);
      updateCarousel();
      resetTimer();
    }

    // Iniciar auto-avance
    function startAutoAdvance() {
      autoAdvanceTimer = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, autoAdvanceInterval);
    }

    // Reiniciar timer
    function resetTimer() {
      if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
      }
      startAutoAdvance();
    }

    // Event listeners - flechas
    testimoniosNext.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    testimoniosPrev.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });

    // Event listeners - indicadores (delegado)
    testimoniosIndicators.addEventListener('click', (e) => {
      if (e.target.classList.contains('testimonios__dot')) {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        goToPage(index);
      }
    });

    // Pausa en hover
    testimoniosCarousel.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    testimoniosCarousel.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Soporte touch/swipe para móvil
    let touchStartX = 0;
    let touchEndX = 0;

    testimoniosCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimoniosCarousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide(); // Swipe izquierda -> siguiente
        } else {
          prevSlide(); // Swipe derecha -> anterior
        }
        resetTimer();
      }
    }

    // Recalcular en resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        generateIndicators();
        currentIndex = 0;
        updateCarousel();
      }, 250);
    });

    // Inicializar
    generateIndicators();
    updateCarousel();
    startAutoAdvance();
  }

});
