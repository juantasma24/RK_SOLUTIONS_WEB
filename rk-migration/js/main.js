/* ============================================
   RK SOLUTIONS — La Manzana Redesign
   main.js — Vanilla JS interactions & animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Guardar y restaurar sección al refrescar --- */
  const _sections = Array.from(document.querySelectorAll('section[id]'));
  const headerEl  = document.querySelector('.header');

  function saveActiveSection() {
    // PRIMERO: leer todo el DOM de una vez (evita layout thrashing)
    const scrollY      = window.scrollY;
    const innerHeight  = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const hH           = headerEl ? headerEl.offsetHeight : 0;
    const contentTop   = scrollY + hH;
    const atBottom     = scrollY + innerHeight >= scrollHeight - 80;

    if (atBottom && document.getElementById('footer')) {
      sessionStorage.setItem('rk_section', 'footer');
      return;
    }

    // Leer todas las posiciones en batch (sin intercalar escrituras)
    const sectionTops = _sections.map(s => s.getBoundingClientRect().top + scrollY);
    const sectionHeights = _sections.map(s => s.offsetHeight);

    // LUEGO: procesar con los datos ya leídos
    let current    = _sections[0] || null;
    let currentIdx = 0;
    _sections.forEach((section, idx) => {
      if (sectionTops[idx] <= contentTop + 10) { current = section; currentIdx = idx; }
    });

    if (current && _sections[currentIdx + 1]) {
      const sMid = sectionTops[currentIdx] + sectionHeights[currentIdx] / 2;
      if (sMid <= contentTop) current = _sections[currentIdx + 1];
    }
    if (current) sessionStorage.setItem('rk_section', current.id);
  }

  // Preservar sección visible durante resize (evita saltos al cruzar breakpoints)
  let _isResizing = false;
  let _resizeEndTimer = null;
  let _resizeSection = null;

  function getVisibleSection() {
    const hH = headerEl ? headerEl.offsetHeight : 0;
    const threshold = window.scrollY + hH;
    let current = _sections[0];
    for (const s of _sections) {
      if (s.getBoundingClientRect().top + window.scrollY <= threshold + 60) current = s;
    }
    return current;
  }

  window.addEventListener('resize', () => {
    if (!_isResizing) {
      _isResizing = true;
      _resizeSection = getVisibleSection();
    }
    // Correct scroll on every resize tick — stops the visual jump caused by
    // 350vh sections changing pixel height as viewport height changes
    if (_resizeSection) {
      const hH = headerEl ? headerEl.offsetHeight : 0;
      window.scrollTo({ top: Math.max(0, _resizeSection.offsetTop - hH), behavior: 'instant' });
    }
    clearTimeout(_resizeEndTimer);
    _resizeEndTimer = setTimeout(() => {
      _isResizing = false;
      if (_resizeSection) {
        const hH = headerEl ? headerEl.offsetHeight : 0;
        window.scrollTo({ top: Math.max(0, _resizeSection.offsetTop - hH), behavior: 'instant' });
        _resizeSection = null;
      }
    }, 150);
  }, { passive: true });

  // Guardar mientras el usuario scrollea — no durante resize
  let _sectionTimer = null;
  window.addEventListener('scroll', () => {
    if (_isResizing) return;
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
      target.style.scrollMarginTop = headerH + 'px';
      document.documentElement.style.scrollBehavior = 'auto';

      const forceRevealVisible = () => {
        document.querySelectorAll('.anim-reveal:not(.visible), .anim-slide-up:not(.visible)').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
        });
      };

      const doRestore = () => {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        requestAnimationFrame(() => {
          target.style.scrollMarginTop = '';
          document.documentElement.style.scrollBehavior = '';
          const restoreStyle = document.getElementById('rk-restore-style');
          if (restoreStyle) restoreStyle.remove();
          forceRevealVisible();
        });
      };

      if (window.innerWidth < 768) {
        target.style.scrollMarginTop = '';
        document.documentElement.style.scrollBehavior = '';
        window.scrollTo({ top: Math.max(0, target.offsetTop - headerH), behavior: 'instant' });
        requestAnimationFrame(() => {
          const restoreStyle = document.getElementById('rk-restore-style');
          if (restoreStyle) restoreStyle.remove();
          forceRevealVisible();
        });
      } else {
        doRestore();
      }
    }
  }

  /* --- Hero actions: quitar animación al terminar para que el hover del CTA funcione --- */
  const heroActions = document.querySelector('.hero__actions');
  if (heroActions) {
    heroActions.addEventListener('animationend', () => {
      heroActions.style.opacity   = '1';
      heroActions.style.animation = 'none';
    }, { once: true });
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
        // Mobile: forzar reveals visibles tras el scroll suave (content-visibility
        // puede retrasar el disparo del IntersectionObserver en móvil)
        if (window.innerWidth < 768) {
          setTimeout(() => {
            document.querySelectorAll('.anim-reveal:not(.visible), .anim-slide-up:not(.visible)').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
            });
          }, 650);
        }
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
          // Liberar capa compositor cuando termina la transición
          entry.target.addEventListener('transitionend', () => {
            entry.target.style.willChange = 'auto';
          }, { once: true });
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

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

  /* --- Limpiar will-change del hero tras terminar sus animaciones CSS --- */
  document.querySelectorAll('.hero__title-line').forEach(el => {
    el.addEventListener('animationend', () => {
      el.style.willChange = 'auto';
    }, { once: true });
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

  // Animación del hero_pattern eliminada: se mantiene como fondo estático optimizado

  /* --- YouTube Facade + autoplay on scroll into view --- */
  const ytFacades = document.querySelectorAll('.youtube-facade');
  ytFacades.forEach(ytFacade => {
    const embedId = ytFacade.dataset.embed;

    function injectIframe(muted) {
      const muteParam = muted ? '&mute=1' : '';
      ytFacade.innerHTML = `<iframe src="https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3${muteParam}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }

    // Click: autoplay con sonido
    ytFacade.addEventListener('click', () => injectIframe(false), { once: true });

    // Scroll into view: autoplay silenciado (navegadores requieren mute=1 para autoplay sin gesto)
    const ytObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !ytFacade.querySelector('iframe')) {
          injectIframe(true);
          ytObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });

    ytObserver.observe(ytFacade);
  });

  /* --- Pausar vídeo de autónomos cuando no es visible --- */
  const bgVideo = document.querySelector('.autonomos__video-bg video');
  if (bgVideo) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (bgVideo.preload === 'none') { bgVideo.preload = 'auto'; bgVideo.load(); }
        setTimeout(() => bgVideo.play(), 0);
      } else {
        bgVideo.pause();
      }
    }, { rootMargin: '800px 0px 800px 0px' }).observe(bgVideo.closest('section'));
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

    // Salto silencioso: quita transición, mueve, restaura en siguiente frame (sin forzar reflow)
    function jumpTo(idx) {
      currentIndex = idx;
      testimoniosTrack.style.transition = 'none';
      testimoniosTrack.style.transform  = `translateX(-${(currentIndex * 100) / vis()}%)`;
      requestAnimationFrame(() => {
        testimoniosTrack.style.transition = TRANSITION;
      });
    }

    // Movimiento animado normal
    function moveTo(idx) {
      currentIndex = idx;
      testimoniosTrack.style.willChange = 'transform';
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

      testimoniosTrack.style.willChange = 'auto';
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
        testimoniosTrack.style.transition = 'none';
        testimoniosTrack.style.transform  = `translateX(-${(currentIndex * 100) / vis()}%)`;
        requestAnimationFrame(() => {
          testimoniosTrack.style.transition = TRANSITION;
        });
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

  /* --- Reel animation en contadores (slot-machine vertical) --- */
  const counterSlots = document.querySelectorAll('.counter-slot');
  if (counterSlots.length) {
    counterSlots.forEach(el => {
      const target = parseInt(el.dataset.target, 10);

      // Construir reel: números 0..target, empieza mostrando el target (último)
      const wrap = document.createElement('span');
      wrap.className = 'counter-reel-wrap';

      const reel = document.createElement('span');
      reel.className = 'counter-reel';
      reel.style.setProperty('--reel-items', target + 1);

      for (let i = 0; i <= target; i++) {
        const digit = document.createElement('span');
        digit.className = 'counter-reel__digit';
        digit.textContent = i;
        reel.appendChild(digit);
      }

      // Posicionar el reel en el target desde el inicio (sin animación)
      reel.style.transform = `translateY(calc(-1em * ${target}))`;

      wrap.appendChild(reel);
      el.parentNode.replaceChild(wrap, el);
    });

    const reelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reelObserver.unobserve(entry.target);
        const reel = entry.target.querySelector('.counter-reel');
        const idx  = Array.from(document.querySelectorAll('.counter-reel-wrap')).indexOf(entry.target);
        // Esperar: reveal (550ms) + stagger CSS (idx*50ms) + buffer (120ms)
        setTimeout(() => {
          // Quitar la posición inline para que la animación parta desde 0
          reel.style.transform = '';
          reel.classList.add('is-spinning');
        }, 670 + idx * 50);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter-reel-wrap').forEach(el => reelObserver.observe(el));
  }

  /* --- Pausar badges flotantes cuando no son visibles --- */
  const badgeEls = document.querySelectorAll('.que-hace__badge-247, .que-hace__badge-dispositivo');
  if (badgeEls.length) {
    const badgeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0.1 });
    badgeEls.forEach(el => badgeObserver.observe(el));
  }

  /* --- Secuencia TPV: scroll-driven canvas --- */
  const tpvCanvas  = document.getElementById('tpvCanvas');
  const tpvSection = document.querySelector('.tpv-seq');

  if (tpvCanvas && tpvSection) {
    const ctx    = tpvCanvas.getContext('2d');
    const FRAMES = 270;
    const LERP   = 0.10;
    const DPR    = Math.min(window.devicePixelRatio || 1, 2);
    const BASE   = (typeof rkConfig !== 'undefined' ? rkConfig.pluginUrl : '') + 'assets/img/frames_tpv/final_motion_tpv_';
    const images = new Array(FRAMES);
    let loadedCount = 0;
    let allReady    = false;
    let lastDrawn   = -1;
    let current     = 0;
    let target      = 0;
    let rafId       = null;
    let inView      = false;
    let naturalW    = 0;
    let naturalH    = 0;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    function frameUrl(i) {
      return BASE + String(i).padStart(5, '0') + '.webp';
    }

    let tpvTotal = tpvSection.offsetHeight - window.innerHeight;
    window.addEventListener('resize', () => {
      tpvTotal = tpvSection.offsetHeight - window.innerHeight;
      if (naturalW) { setCanvasSize(); drawFrame(Math.round(current)); }
    }, { passive: true });

    function getProgress() {
      const scrolled = -tpvSection.getBoundingClientRect().top;
      return Math.max(0, Math.min(1, scrolled / tpvTotal));
    }

    /* Flecha sección 2: desaparece cuando entra la sección 3 */
    const queHaceArrow = document.getElementById('queHaceArrow');
    if (queHaceArrow) {
      new IntersectionObserver((entries) => {
        queHaceArrow.classList.toggle('hidden', entries[0].isIntersecting);
      }, { threshold: 0.15 }).observe(tpvSection);
    }

    /* Video autoplay sección 2: control nativo de YouTube (permite pausar al clic) */
    const queHaceVideo = document.getElementById('queHaceVideo');
    if (queHaceVideo) {
      let iframe = null;

      new IntersectionObserver((entries) => {
        const isVisible = entries[0].isIntersecting;

        if (isVisible && !iframe) {
          // 1. Inyección inicial
          iframe = document.createElement('iframe');
          iframe.src = 'https://www.youtube.com/embed/ZVm05C_6VOs?autoplay=1&mute=1&loop=1&playlist=ZVm05C_6VOs&controls=0&playsinline=1&enablejsapi=1&disablekb=1&modestbranding=1&rel=0&iv_load_policy=3';
          iframe.allow = 'autoplay; encrypted-media';
          iframe.allowFullscreen = true;
          queHaceVideo.appendChild(iframe);
        } else if (iframe && iframe.contentWindow) {
          // 2. Control dinámico vía API
          if (isVisible) {
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
          } else {
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
          }
        }
      }, { threshold: 0.15 }).observe(queHaceVideo);

      /* Animación scrubbed: el video-wrap crece desde abajo al scrollear */
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const queHaceSection = document.getElementById('que-hace');
        let rafPending = false;

        function updateVideoGrow() {
          rafPending = false;
          const vh      = window.innerHeight;
          const trigger = (queHaceSection || queHaceVideo).getBoundingClientRect();
          // p=0: sección está 50% del viewport por debajo del fold (antes de ser visible)
          // p=1: top de la sección llega al 30% del viewport
          const raw = (vh * 1.5 - trigger.top) / (vh * 1.2);
          const p   = Math.max(0, Math.min(1, raw));

          const topClip  = (62 * (1 - p)).toFixed(2);
          const sideClip = (12 * (1 - p)).toFixed(2);
          const radius   = (24 - 8 * p).toFixed(1);

          queHaceVideo.style.clipPath =
            `inset(${topClip}% ${sideClip}% 0% ${sideClip}% round ${radius}px)`;
        }

        window.addEventListener('scroll', () => {
          if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(updateVideoGrow);
          }
        }, { passive: true });

        updateVideoGrow(); // calcula el estado correcto al cargar
      }
    }

    /* Scroll hint: visible al inicio, desaparece en frame 50 */
    const tpvScrollHint = document.getElementById('tpvScrollHint');
    if (tpvScrollHint) {
      const updateHint = () => {
        const frame = getProgress() * (FRAMES - 1);
        const show  = frame < 50;
        tpvScrollHint.classList.toggle('hidden', !show);
      };
      window.addEventListener('scroll', updateHint, { passive: true });
    }

    function setCanvasSize() {
      const portrait = window.innerHeight > window.innerWidth;
      let cw, ch;
      if (portrait && naturalW) {
        const sticky = tpvSection.querySelector('.tpv-seq__sticky');
        cw = sticky.offsetWidth;
        ch = sticky.offsetHeight;
      } else {
        cw = naturalW;
        ch = naturalH;
      }
      if (!cw || !ch) return;
      tpvCanvas.width        = Math.round(cw * DPR);
      tpvCanvas.height       = Math.round(ch * DPR);
      tpvCanvas.style.width  = cw + 'px';
      tpvCanvas.style.height = ch + 'px';
      ctx.scale(DPR, DPR);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      lastDrawn = -1;
    }

    function drawFrame(idx) {
      if (idx === lastDrawn) return;
      const img = images[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = tpvCanvas.width / DPR;
      const ch = tpvCanvas.height / DPR;
      ctx.clearRect(0, 0, cw, ch);
      const portrait = window.innerHeight > window.innerWidth;
      if (portrait && naturalW) {
        const scale = Math.min(cw / naturalW, ch / naturalH) * 1.2;
        const dw = naturalW * scale;
        const dh = naturalH * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      } else {
        ctx.drawImage(img, 0, 0, naturalW, naturalH);
      }
      lastDrawn = idx;
    }

    function loop() {
      const delta = target - current;
      current += delta * LERP;
      drawFrame(Math.round(current));
      if (inView) rafId = requestAnimationFrame(loop);
      else rafId = null;
    }

    const tpvObserver = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (inView && allReady && !rafId) rafId = requestAnimationFrame(loop);
    }, { threshold: 0 });
    tpvObserver.observe(tpvSection);

    window.addEventListener('scroll', () => {
      if (!allReady) return;
      target = getProgress() * (FRAMES - 1);
    }, { passive: true });

    for (let i = 0; i < FRAMES; i++) {
      const img = new Image();
      img.onload = function () {
        loadedCount++;
        if (i === 0) {
          naturalW = img.naturalWidth;
          naturalH = img.naturalHeight;
          setCanvasSize();
          drawFrame(0);
        }
        if (loadedCount === FRAMES) {
          allReady = true;
          current = target = getProgress() * (FRAMES - 1);
          drawFrame(Math.round(current));
          if (inView && !rafId) rafId = requestAnimationFrame(loop);
        }
      };
      img.src   = frameUrl(i);
      images[i] = img;
    }
  }

  /* --- Mascot Character Toggle --- */
  const mascotBtn    = document.getElementById('mascotBtn');
  const mascotBubble = document.getElementById('mascotBubble');
  const mascotClose  = document.getElementById('mascotClose');

  if (mascotBtn && mascotBubble && mascotClose) {
    // Abrir bubble al cargar después de un breve delay (presentación inicial)
    setTimeout(() => {
      mascotBubble.classList.add('is-open');
    }, 1800);

    // Animación wiggle del personaje para llamar la atención
    const mascotImg = mascotBtn.querySelector('.mascot-btn__img');

    function triggerWiggle() {
      if (!mascotImg) return;
      mascotImg.classList.remove('is-wiggling');
      void mascotImg.offsetWidth;
      mascotImg.classList.add('is-wiggling');
    }

    let wiggleInterval = null;

    function scheduleWiggle() {
      clearInterval(wiggleInterval);
      wiggleInterval = setInterval(triggerWiggle, 12000);
    }

    if (mascotImg) {
      mascotImg.addEventListener('animationend', () => {
        mascotImg.classList.remove('is-wiggling');
      }, { passive: true });

      setTimeout(() => { triggerWiggle(); scheduleWiggle(); }, 3000);
    }

    // Toggle al hacer click en el personaje
    mascotBtn.addEventListener('click', () => {
      mascotBubble.classList.toggle('is-open');
      triggerWiggle();
      scheduleWiggle(); // reinicia el contador de 12s
    });

    // Cerrar con el botón X
    mascotClose.addEventListener('click', () => {
      mascotBubble.classList.remove('is-open');
    });
  }


  /* ============================================
     HERO PATTERN — Canvas animación zigzag automática
     Recorre todas las celdas en serpentina, efecto hover suave
     ============================================ */
  (function () {
    const canvas = document.getElementById('hero-pattern-canvas');
    if (!canvas) return;
    const hero = canvas.closest('.hero');
    if (!hero) return;

    const ctx  = canvas.getContext('2d');
    const GLOW      = '#5ea84a';
    const LERP      = 0.07;        // suavidad del fade in/out
    const BASE_ALPHA = 0.18;       // opacidad blanco base
    const BASE_CELL = 200;
    const BASE_W    = 1440;
    const STEP_MS   = 120;         // ms entre celda y celda
    const PAUSE_MS  = 2000;        // pausa antes de reiniciar

    let W, H, CELL, sX, sY, cols, rows;
    let targetCell = null;
    const alphas   = {};
    let firstFrame = true;

    // Secuencia zigzag — se recalcula tras cada resize
    let sequence = [];
    let seqIdx   = 0;
    let stepTimer = null;
    let heroPatternRafActive = false;

    const svgPaths = [
      'M18.7,7.5c.1-.5.1-1.7,0-2.2s-.5-1.5-.8-1.9c-.4-.5-1.5-1.2-2.1-1.5-1.1-.6-4.5-1.5-4.5-1.5,0,0-.3,3.4-.1,4.4.1.7.6,1.9,1.1,2.4.3.4,1.1,1,1.5,1.2.4.3,1.5.6,2,.7.6.2,2.4.3,2.4.3h0s.4-1.4.5-1.9Z',
      'M17.4,28.6c-1.6,0-3-.1-4.2-.2-1.3-.2-2.3-.5-3.1-1-.8-.5-1.3-1.2-1.7-2-.3-.8-.5-2-.5-3.4s.2-2.5.5-3.4c.3-.8.9-1.5,1.7-2,.8-.4,1.8-.8,3.1-1,.6,0,1.2-.1,1.9-.2l2.5-4.7c-1-.4-5.3-2.2-7.1-1.8-2.3.5-4.2,1.8-5.6,3C2.1,14.4.5,17.5.5,22.1s1.4,7.9,4.3,10c1.9,1.4,5.2,2.8,8.4,2.9,1.6,0,4.4-.8,4.4-.8,0,0,1.1.3,2.4.5l-2.7-6.1h.1Z',
      'M30.8,12c-1.4-1.2-3.3-2.4-5.7-2.9-1.6-.3-5.3,1.1-6.7,1.7l-2.5,4.7h2c1.9,0,3.4,0,4.7.2,1.3.2,2.3.5,3.1,1s1.3,1.1,1.7,2c.3.8.5,2,.5,3.4s-.2,2.5-.5,3.4c-.3.8-.9,1.5-1.7,2-.8.5-1.8.8-3.1,1-1.2.2-2.6.2-4.4.2l2.8,6.2c.8,0,1.7.2,2.4.2,2.8-.2,5.8-1.6,7.5-2.9,2.9-2.1,4.3-5.4,4.3-10s-1.5-7.7-4.2-10l-.2-.2Z'
    ];

    function makeSVG(stroke, sw) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.6 35.4">${
        svgPaths.map(d => `<path fill="none" stroke="${stroke}" stroke-miterlimit="10" stroke-width="${sw}" d="${d}"/>`).join('')
      }</svg>`;
    }

    function loadImg(svg) {
      return new Promise(res => {
        const img  = new Image();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url  = URL.createObjectURL(blob);
        img.onload = () => { URL.revokeObjectURL(url); res(img); };
        img.src = url;
      });
    }

    function buildSequence() {
      sequence = [];
      for (let r = 0; r < rows; r++) {
        const ltr = r % 2 === 0;
        for (let ci = 0; ci < cols; ci++) {
          const c = ltr ? ci : (cols - 1 - ci);
          sequence.push({ c, r });
        }
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = hero.offsetWidth;
      H = hero.offsetHeight;
      CELL = Math.min(200, Math.max(80, Math.round(BASE_CELL * (W / BASE_W))));
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sX = ((W / 2 - CELL / 2) % CELL + CELL) % CELL - CELL;
      sY = ((H / 2 - CELL / 2) % CELL + CELL) % CELL - CELL;
      cols = Math.ceil((W - sX) / CELL) + 1;
      rows = Math.ceil((H - sY) / CELL) + 1;
      buildSequence();
    }

    let scheduleNext = function () {
      clearTimeout(stepTimer);
      seqIdx++;
      if (seqIdx >= sequence.length) {
        // Una sola pasada — para la animación al terminar
        targetCell = null;
      } else {
        stepTimer = setTimeout(() => {
          targetCell = sequence[seqIdx];
          scheduleNext();
        }, STEP_MS);
      }
    };

    function draw(imgW, imgG) {
      let dirty = firstFrame;
      firstFrame = false;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const key = `${c},${r}`;
          const isTarget = targetCell && targetCell.c === c && targetCell.r === r;
          const cur = alphas[key] || 0;
          const tgt = isTarget ? 1 : 0;
          if (Math.abs(cur - tgt) > 0.005) {
            alphas[key] = cur + (tgt - cur) * LERP;
            dirty = true;
          } else if (cur !== tgt) {
            alphas[key] = tgt;
            dirty = true;
          }
        }
      }

      if (dirty) {
        ctx.clearRect(0, 0, W, H);
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const key = `${c},${r}`;
            const t   = alphas[key] || 0;
            const x   = sX + c * CELL;
            const y   = sY + r * CELL;

            if (t < 0.01) {
              ctx.globalAlpha = BASE_ALPHA;
              ctx.filter = 'none';
              ctx.drawImage(imgW, x, y, CELL, CELL);
            } else {
              ctx.globalAlpha = BASE_ALPHA * (1 - t);
              ctx.filter = 'none';
              ctx.drawImage(imgW, x, y, CELL, CELL);

              const blur = t * 4;
              ctx.save();
              ctx.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : 'none';
              ctx.shadowColor = GLOW;
              ctx.shadowBlur  = t * 24;
              ctx.globalAlpha = t * 0.45;
              ctx.drawImage(imgG, x, y, CELL, CELL);
              ctx.shadowBlur  = t * 50;
              ctx.globalAlpha = t * 0.125;
              ctx.drawImage(imgG, x, y, CELL, CELL);
              ctx.restore();
            }
          }
        }
        ctx.globalAlpha = 1;
        ctx.filter = 'none';
      }

      // Solo continuar el loop mientras haya algo que animar
      if (dirty || targetCell !== null) requestAnimationFrame(() => draw(imgW, imgG));
      else heroPatternRafActive = false;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    Promise.all([
      loadImg(makeSVG('#ffffff', '.2')),
      loadImg(makeSVG('#5ea84a', '.8'))
    ]).then(([imgW, imgG]) => {
      resize();

      if (prefersReduced) {
        ctx.globalAlpha = BASE_ALPHA;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            ctx.drawImage(imgW, sX + c * CELL, sY + r * CELL, CELL, CELL);
          }
        }
        ctx.globalAlpha = 1;
        return;
      }

      // Arrancar secuencia
      targetCell = sequence[0];
      seqIdx = 0;
      scheduleNext();

      let resizeT;
      window.addEventListener('resize', () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => {
          clearTimeout(stepTimer);
          resize();
          firstFrame = true;
          seqIdx = 0;
          targetCell = sequence[0];
          scheduleNext();
          if (!heroPatternRafActive) { heroPatternRafActive = true; draw(imgW, imgG); }
        }, 150);
      });

      heroPatternRafActive = true;
      draw(imgW, imgG);
    });
  })();

});

/* --- Avatar cycling: fade entre fotos del pool --- */
(function () {
  const avatars = document.querySelectorAll('.hero__avatar[data-pool]');
  if (!avatars.length) return;

  let heroVisible = true;
  const heroSection = document.getElementById('inicio');
  if (heroSection) {
    new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(heroSection);
  }

  avatars.forEach((avatar, i) => {
    const pool = avatar.dataset.pool.split(',');
    const imgs = avatar.querySelectorAll('img');
    let idx = 0;
    let showingFront = true;

    function cycleAvatar() {
      if (!heroVisible) return;
      idx = (idx + 1) % pool.length;
      const next = new Image();
      next.onload = () => {
        if (showingFront) {
          imgs[1].src = next.src;
          imgs[0].style.opacity = '0';
          imgs[1].style.opacity = '1';
        } else {
          imgs[0].src = next.src;
          imgs[1].style.opacity = '0';
          imgs[0].style.opacity = '1';
        }
        showingFront = !showingFront;
      };
      next.src = 'assets/img/avatars/avatar-' + pool[idx] + '.jpg';
    }

    setTimeout(() => {
      cycleAvatar();
      setInterval(cycleAvatar, 3500);
    }, 2000 + i * 800);
  });
}());
