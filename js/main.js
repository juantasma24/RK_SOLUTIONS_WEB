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
        // Cerrar el dropdown de idioma si el topbar se oculta
        if (scrolled) {
          const langDropdown = document.getElementById('langDropdown');
          if (langDropdown) langDropdown.classList.remove('open');
        }
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

  /* --- Custom dropdown: Comunidad autónoma --- */
  const comunidadDropdown = document.getElementById('comunidadDropdown');
  const comunidadToggle  = document.getElementById('comunidadToggle');
  const comunidadMenu    = document.getElementById('comunidadMenu');
  const comunidadLabel   = document.getElementById('comunidadLabel');
  const comunidadInput   = document.getElementById('comunidadInput');

  if (comunidadDropdown && comunidadToggle) {
    comunidadToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = comunidadDropdown.classList.toggle('open');
      comunidadToggle.setAttribute('aria-expanded', isOpen);
    });

    comunidadMenu.querySelectorAll('.contacto__dropdown-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        const text  = btn.textContent;

        comunidadInput.value = value;
        comunidadLabel.textContent = text;
        comunidadToggle.classList.add('has-value');

        comunidadMenu.querySelectorAll('.contacto__dropdown-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        comunidadDropdown.classList.remove('open');
        comunidadToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!comunidadDropdown.contains(e.target)) {
        comunidadDropdown.classList.remove('open');
        comunidadToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Contact form validation --- */
  const contactForm = document.querySelector('.contacto__form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre    = contactForm.querySelector('input[name="name"]');
      const correo    = contactForm.querySelector('input[name="email"]');
      const comunidad = contactForm.querySelector('input[name="comunidad"]');
      const privacidad = contactForm.querySelector('input[name="privacy"]');

      if (!nombre.value.trim() || !correo.value.trim()) {
        alert('Por favor, completa los campos obligatorios.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo.value.trim())) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
      }

      if (!comunidad.value) {
        alert('Por favor, selecciona tu comunidad autónoma.');
        return;
      }

      if (!privacidad.checked) {
        alert('Debes aceptar la política de privacidad.');
        return;
      }

      alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
      contactForm.reset();
      if (comunidadLabel) {
        comunidadLabel.textContent = 'Comunidad autónoma';
        comunidadToggle.classList.remove('has-value');
        comunidadMenu.querySelectorAll('.contacto__dropdown-option').forEach(b => b.classList.remove('selected'));
      }
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

  /* --- Parallax: sección Autónomos --- */
  const autonomosSection  = document.getElementById('autonomos');
  const parallaxVideo     = document.querySelector('.autonomos__video-bg video');
  const parallaxOverlay   = document.querySelector('.autonomos__overlay');

  if (autonomosSection && parallaxVideo) {
    // Saltamos parallax en móvil (reducimos trabajo y evitamos jank)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = () => window.innerWidth < 768;

    let rafId = null;

    function updateParallax() {
      rafId = null;
      if (prefersReducedMotion || isMobile()) return;

      const rect     = autonomosSection.getBoundingClientRect();
      const viewH    = window.innerHeight;

      // Solo animar cuando la sección está visible
      if (rect.bottom < 0 || rect.top > viewH) return;

      // Progreso: 0 cuando entra por abajo, 1 cuando sale por arriba
      const progress = 1 - (rect.bottom / (viewH + rect.height));

      // Video se mueve a 0.4x → rango de -15% a +15% (dentro del margen sobredimensionado)
      const translateY = (progress - 0.5) * 30; // -15 a +15
      parallaxVideo.style.transform = `translateY(${translateY}%)`;

      // Overlay se oscurece ligeramente al entrar y salir (0.45 → 0.65)
      const opacity = 0.45 + Math.abs(progress - 0.5) * 0.4;
      parallaxOverlay.style.background = `rgba(0,0,0,${opacity.toFixed(2)})`;
    }

    window.addEventListener('scroll', () => {
      if (!rafId) rafId = requestAnimationFrame(updateParallax);
    }, { passive: true });

    // Posición inicial
    updateParallax();
  }

  /* --- Parallax: manzanas deco de Que-hace y Planes --- */
  (function initDecorativeParallax() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = () => window.innerWidth < 768;

    // Config: [selector, velocidad-Y]
    const targets = [
      { el: document.querySelector('.que-hace__deco--left'),  speedY:  0.6  },
      { el: document.querySelector('.que-hace__deco--right'), speedY: -0.6  },
      { el: document.querySelector('.planes__deco--left'),    speedY:  0.4  },
      { el: document.querySelector('.planes__deco--right'),   speedY: -0.4  },
    ].filter(t => t.el);

    if (!targets.length) return;

    let rafId = null;

    function updateDecoParallax() {
      rafId = null;
      if (prefersReducedMotion || isMobile()) return;

      const viewH = window.innerHeight;

      targets.forEach(({ el, speedY }) => {
        const section = el.closest('section');
        if (!section) return;
        const rect = section.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > viewH) return;

        const progress = (viewH / 2 - (rect.top + rect.height / 2)) / (viewH / 2);
        const ty = progress * speedY * 40; // max ±16px

        // Usamos CSS custom property para no romper transform existente
        el.style.setProperty('--parallax-y', `${ty}px`);
      });
    }

    window.addEventListener('scroll', () => {
      if (!rafId) rafId = requestAnimationFrame(updateDecoParallax);
    }, { passive: true });

    updateDecoParallax();
  })();

  /* ============================================
     TESTIMONIOS CARRUSEL
     - Auto-avance cada 5 segundos
     - Pausa en hover
     - Flechas de navegación (de 3 en 3)
     - Indicadores (dots) dinámicos
     - Swipe touch para móvil
     ============================================ */
  const testimoniosCarousel = document.getElementById('testimoniosCarousel');
  const testimoniosTrack   = document.getElementById('testimoniosTrack');
  const testimoniosPrev    = document.getElementById('testimoniosPrev');
  const testimoniosNext    = document.getElementById('testimoniosNext');
  const testimoniosIndicators = document.getElementById('testimoniosIndicators');

  if (testimoniosCarousel && testimoniosTrack && testimoniosPrev && testimoniosNext) {

    /* -------------------------------------------------
       INFINITE LOOP con clon-buffer.
       Track: [clonesInicio x N] [originales x N] [clonesFinales x N]
       Arrancamos en currentIndex = N (primer original).
       Cuando llegamos a un clon → salto silencioso al
       original equivalente usando offsetWidth para forzar
       reflow y que el browser no anime el salto.
    ------------------------------------------------- */
    const TRANSITION = 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    const originals     = Array.from(testimoniosTrack.querySelectorAll('.testimonio-slide'));
    const N             = originals.length;
    let   currentIndex  = N; // empieza en el primer original
    let   autoTimer     = null;
    let   isPaused      = false;
    let   locked        = false; // bloquea clicks durante transición

    // Clonar todos al final
    originals.forEach(s => {
      const c = s.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      testimoniosTrack.appendChild(c);
    });
    // Clonar todos al inicio (en orden)
    originals.forEach(s => {
      const c = s.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      testimoniosTrack.insertBefore(c, testimoniosTrack.firstChild);
    });
    // Ahora el track tiene 3N slides: [0..N-1 clones] [N..2N-1 orig] [2N..3N-1 clones]

    function vis() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768)  return 2;
      return 1;
    }

    function updateDots() {
      if (!testimoniosIndicators) return;
      const realIdx = ((currentIndex - N) % N + N) % N;
      // Dividir los N slides en 3 zonas iguales → dot 0, 1 o 2
      const zone = Math.floor((realIdx / N) * 3);
      testimoniosIndicators.querySelectorAll('.testimonios__dot')
        .forEach((d, i) => d.classList.toggle('active', i === zone));
    }

    // Salto silencioso: quita transición, mueve, fuerza reflow, restaura transición
    function jumpTo(idx) {
      currentIndex = idx;
      testimoniosTrack.style.transition = 'none';
      testimoniosTrack.style.transform  = `translateX(-${(currentIndex * 100) / vis()}%)`;
      // offsetWidth fuerza al browser a aplicar los estilos ANTES de continuar
      void testimoniosTrack.offsetWidth;
      testimoniosTrack.style.transition = TRANSITION;
    }

    // Movimiento animado normal
    function moveTo(idx) {
      currentIndex = idx;
      testimoniosTrack.style.transition = TRANSITION;
      testimoniosTrack.style.transform  = `translateX(-${(currentIndex * 100) / vis()}%)`;
      updateDots();
    }

    function next() {
      if (locked) return;
      locked = true;
      moveTo(currentIndex + 1);
    }

    function prev() {
      if (locked) return;
      locked = true;
      moveTo(currentIndex - 1);
    }

    // Al terminar la transición → comprobar si toca saltar a los originales
    testimoniosTrack.addEventListener('transitionend', (e) => {
      if (e.propertyName !== 'transform') return;
      locked = false;

      if (currentIndex >= N * 2) {
        // Estamos en los clones del final → saltar al original equivalente
        jumpTo(currentIndex - N);
      } else if (currentIndex < N) {
        // Estamos en los clones del inicio → saltar al original equivalente
        jumpTo(currentIndex + N);
      }

      updateDots();
    });

    // Siempre 3 dots estáticos: el activo cambia según posición
    function generateDots() {
      if (!testimoniosIndicators) return;
      testimoniosIndicators.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const d = document.createElement('span');
        d.className = `testimonios__dot${i === 0 ? ' active' : ''}`;
        d.setAttribute('aria-hidden', 'true');
        testimoniosIndicators.appendChild(d);
      }
    }

    // Eliminar click en dots (ya no son navegables)

    function startTimer() { autoTimer = setInterval(() => { if (!isPaused) next(); }, 5000); }
    function resetTimer() { clearInterval(autoTimer); startTimer(); }

    testimoniosNext.addEventListener('click', () => { next(); resetTimer(); });
    testimoniosPrev.addEventListener('click', () => { prev(); resetTimer(); });

    testimoniosCarousel.addEventListener('mouseenter', () => { isPaused = true; });
    testimoniosCarousel.addEventListener('mouseleave', () => { isPaused = false; });

    let touchX = 0;
    testimoniosCarousel.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].screenX; }, { passive: true });
    testimoniosCarousel.addEventListener('touchend',   (e) => {
      const diff = touchX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetTimer(); }
    }, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Recalcular posición sin animación en resize
        testimoniosTrack.style.transition = 'none';
        testimoniosTrack.style.transform  = `translateX(-${(currentIndex * 100) / vis()}%)`;
        void testimoniosTrack.offsetWidth;
        testimoniosTrack.style.transition = TRANSITION;
      }, 250);
    });

    // Init
    generateDots();
    jumpTo(N); // posición inicial sin animación
    updateDots(); // dot 0 activo al arrancar
    startTimer();
  }

});
