/* ============================================
   RK SOLUTIONS — La Manzana Redesign
   main.js — Vanilla JS interactions & animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Guardar y restaurar sección al refrescar --- */
  const _sections = Array.from(document.querySelectorAll('section[id]'));
  const headerEl  = document.querySelector('.header');

  function saveActiveSection() {
    const hH         = headerEl ? headerEl.offsetHeight : 0;
    const contentTop = window.scrollY + hH;
    let current      = _sections[0] || null;
    let currentIdx   = 0;
    _sections.forEach((section, idx) => {
      const sTop = section.getBoundingClientRect().top + window.scrollY;
      // +10px de tolerancia para evitar fallos por sub-píxel en el límite exacto
      if (sTop <= contentTop + 10) { current = section; currentIdx = idx; }
    });
    // Post-proceso: si ya pasamos el punto medio de la sección actual,
    // promovemos a la siguiente para no volver al inicio de esa sección al refrescar.
    if (current && _sections[currentIdx + 1]) {
      const sTop = current.getBoundingClientRect().top + window.scrollY;
      const sMid = sTop + current.offsetHeight / 2;
      if (sMid <= contentTop) current = _sections[currentIdx + 1];
    }
    if (current) sessionStorage.setItem('rk_section', current.id);
  }

  // Guardar mientras el usuario scrollea (primario — siempre exacto)
  let _sectionTimer = null;
  window.addEventListener('scroll', () => {
    clearTimeout(_sectionTimer);
    _sectionTimer = setTimeout(saveActiveSection, 150);
  }, { passive: true });

  // Guardar en pagehide como seguro final (cubre F5 inmediato antes de que dispare el timer)
  window.addEventListener('pagehide', () => {
    clearTimeout(_sectionTimer);
    saveActiveSection();
  });

  // Restaurar: saltar a la sección guardada
  // Usamos scrollIntoView en lugar de offsetTop porque content-visibility:auto
  // asigna alturas placeholder (600px) a secciones fuera del viewport, lo que
  // hace que offsetTop calcule posiciones incorrectas.
  const savedSection = sessionStorage.getItem('rk_section');
  if (savedSection) {
    const target = document.getElementById(savedSection);
    if (target) {
      const headerH = headerEl ? headerEl.offsetHeight : 0;

      // scroll-margin-top compensa el header sticky
      target.style.scrollMarginTop = headerH + 'px';
      // Desactivar smooth para que el salto sea instantáneo
      document.documentElement.style.scrollBehavior = 'auto';
      target.scrollIntoView({ behavior: 'instant', block: 'start' });

      requestAnimationFrame(() => {
        target.style.scrollMarginTop = '';
        document.documentElement.style.scrollBehavior = '';
        // Eliminar el <style> de pre-ocultación inyectado en <head> para que
        // las transiciones del topbar/header vuelvan a funcionar normalmente.
        const restoreStyle = document.getElementById('rk-restore-style');
        if (restoreStyle) restoreStyle.remove();
      });
    }
  }

  /* --- Scroll unificado: header + back-to-top + parallax vídeo --- */
  const header = document.querySelector('.header');
  const topbar = document.querySelector('.topbar');

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
      document.body.classList.toggle('no-scroll', mobileMenu.classList.contains('active'));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
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
    // Elementos ya por encima del viewport al cargar: marcarlos visibles sin animación
    revealElements.forEach(el => {
      if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add('visible');
      }
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
      if (!el.classList.contains('visible')) revealObserver.observe(el);
    });
  }

  /* --- Back to top --- */
  const backToTop = document.querySelector('.back-to-top');

  /* --- Listener único de scroll con rAF --- */
  let scrollRafId = null;

  function onScrollFrame() {
    scrollRafId = null;
    const scrollY = window.scrollY;

    // Header + topbar
    if (header) {
      const scrolled = scrollY > 60;
      header.classList.toggle('header--scrolled', scrolled);
      if (topbar) {
        topbar.classList.toggle('hidden', scrolled);
        header.classList.toggle('header--top-hidden', scrolled);
        if (scrolled && langDropdown) {
          langDropdown.classList.remove('open');
        }
      }
    }

    // Back to top
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }

  }

  window.addEventListener('scroll', () => {
    if (!scrollRafId) scrollRafId = requestAnimationFrame(onScrollFrame);
  }, { passive: true });

  // Posición inicial
  onScrollFrame();

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
  let openFaqItem = null; // track the currently open item

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-item__answer');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close previously open item (single DOM update instead of looping all)
      if (openFaqItem && openFaqItem.btn !== btn) {
        openFaqItem.btn.setAttribute('aria-expanded', 'false');
        openFaqItem.answer.style.maxHeight = '0';
      }

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
        openFaqItem = null;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        openFaqItem = { btn, answer };
      }
    });
  });

  if (backToTop) {
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

  /* --- Pausar pattern cuando el hero no es visible --- */
  const heroPattern = document.querySelector('.hero__pattern-track');
  if (heroPattern) {
    const heroSection = document.querySelector('.hero');
    new IntersectionObserver((entries) => {
      heroPattern.style.animationPlayState = entries[0].isIntersecting ? 'running' : 'paused';
    }, { threshold: 0 }).observe(heroSection);
  }

  /* --- Lazy load iframe YouTube --- */
  const lazyIframe = document.querySelector('iframe[data-src]');
  if (lazyIframe) {
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        lazyIframe.src = lazyIframe.dataset.src;
        obs.disconnect();
      }
    }, { rootMargin: '200px' }).observe(lazyIframe);
  }

  /* --- Pausar vídeo de autónomos cuando no es visible --- */
  const bgVideo = document.querySelector('.autonomos__video-bg video');
  if (bgVideo) {
    bgVideo.addEventListener('ended', () => {
      bgVideo.currentTime = 0;
      bgVideo.play();
    });
    new IntersectionObserver((entries) => {
      entries[0].isIntersecting ? bgVideo.play() : bgVideo.pause();
    }, { threshold: 0 }).observe(bgVideo.closest('section'));
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

    function startTimer() { autoTimer = setInterval(() => { if (!isPaused) next(); }, 5000); }
    function resetTimer() { clearInterval(autoTimer); startTimer(); }

    // Pause auto-advance when carousel is not visible
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!autoTimer) startTimer();
      } else {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }, { threshold: 0.1 }).observe(testimoniosCarousel);

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
    // Timer starts via IntersectionObserver above
  }

  /* --- Activar animaciones glass-shine solo cuando son visibles --- */
  const shineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('shine-active', entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  [
    document.querySelector('.contadores__wrapper'),
    document.querySelector('.plan-card__inner'),
    document.querySelector('.contacto__form-shine'),
  ].forEach(el => { if (el) shineObserver.observe(el); });

});
