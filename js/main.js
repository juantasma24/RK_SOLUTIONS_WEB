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
    }, { threshold: 0.2, rootMargin: '0px 0px -160px 0px' });

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
      ytFacade.innerHTML = `<iframe src="https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0${muteParam}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
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

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    function frameUrl(i) {
      return BASE + String(i).padStart(5, '0') + '.webp';
    }

    let tpvTotal = tpvSection.offsetHeight - window.innerHeight;
    window.addEventListener('resize', () => {
      tpvTotal = tpvSection.offsetHeight - window.innerHeight;
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

    function setCanvasSize(w, h) {
      tpvCanvas.width        = w * DPR;
      tpvCanvas.height       = h * DPR;
      tpvCanvas.style.width  = w + 'px';
      tpvCanvas.style.height = h + 'px';
      ctx.scale(DPR, DPR);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    function drawFrame(idx) {
      if (idx === lastDrawn) return;
      const img = images[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, tpvCanvas.width, tpvCanvas.height);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
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
          setCanvasSize(img.naturalWidth, img.naturalHeight);
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

});

/* --- Avatar cycling: fade entre fotos del pool --- */
(function () {
  const avatars = document.querySelectorAll('.hero__avatar[data-pool]');
  if (!avatars.length) return;

  avatars.forEach((avatar, i) => {
    const pool = avatar.dataset.pool.split(',');
    const imgs = avatar.querySelectorAll('img');
    let idx = 0;
    let showingFront = true;

    function cycleAvatar() {
      idx = (idx + 1) % pool.length;
      const next = new Image();
      next.onload = () => {
        if (showingFront) {
          imgs[1].src = next.src;
          imgs[1].getBoundingClientRect(); // fuerza repaint antes de transición
          imgs[0].style.opacity = '0';
          imgs[1].style.opacity = '1';
        } else {
          imgs[0].src = next.src;
          imgs[0].getBoundingClientRect();
          imgs[1].style.opacity = '0';
          imgs[0].style.opacity = '1';
        }
        showingFront = !showingFront;
      };
      next.src = 'https://i.pravatar.cc/48?img=' + pool[idx];
    }

    setTimeout(() => {
      cycleAvatar();
      setInterval(cycleAvatar, 3500);
    }, 2000 + i * 800);
  });
}());
