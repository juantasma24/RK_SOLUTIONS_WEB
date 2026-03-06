/* ============================================
   RK SOLUTIONS — Main JavaScript
   Animaciones, interacciones y UX
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // 1) HEADER: Scroll effect + active nav
  // ============================================
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const topCtaBar = document.querySelector('.top-cta-bar');

  var scrollTicking = false;

  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;

    // Hide top CTA bar on scroll
    if (topCtaBar) {
      if (scrollY > 50) {
        topCtaBar.classList.add('top-cta-bar--hidden');
        header.style.top = '0';
        if (scrollProgress) scrollProgress.style.top = '0';
      } else {
        topCtaBar.classList.remove('top-cta-bar--hidden');
        header.style.top = '';
        if (scrollProgress) scrollProgress.style.top = '';
      }
    }

    // Header shadow on scroll
    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    // Scroll progress bar
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }

    // Back to top button
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(handleScroll);
      scrollTicking = true;
    }
  }, { passive: true });
  handleScroll();

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // 2) MOBILE MENU
  // ============================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // 3) ACTIVE NAV LINK (IntersectionObserver)
  // ============================================
  (function () {
    var navLinks = document.querySelectorAll('.header__nav a');
    var sections = document.querySelectorAll('section[id]');

    if (navLinks.length && sections.length) {
      var navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -80% 0px'
      });

      sections.forEach(function (section) {
        navObserver.observe(section);
      });
    }
  })();

  // ============================================
  // 4) SCROLL REVEAL ANIMATIONS
  // ============================================
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ============================================
  // 5) COUNTER ANIMATION
  // ============================================
  var counters = document.querySelectorAll('.counter-animated');

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      var eased = 1 - (1 - progress) * (1 - progress);
      var current = Math.floor(eased * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  // ============================================
  // 6) FAQ ACCORDION
  // ============================================
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-item__question');
    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove('active');
        other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if wasn't active)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ============================================
  // 7) SMOOTH SCROLL for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // 8) DARK MODE TOGGLE
  // ============================================
  var themeToggle = document.getElementById('themeToggle');

  // Load saved theme (default: dark)
  var savedTheme = localStorage.getItem('rk-theme');
  if (savedTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';

      if (next === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('rk-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('rk-theme', 'dark');
      }
    });
  }

  // ============================================
  // 9) PILLAR CARDS — tilt on hover (desktop)
  // ============================================
  if (window.matchMedia('(min-width: 768px)').matches) {
    var pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 20;
        var rotateY = (centerX - x) / 20;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // ============================================
  // 10) VIDEO PLACEHOLDER — click interaction
  // ============================================
  var videoPlaceholder = document.querySelector('.placeholder-video');
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function () {
      var span = this.querySelector('span');
      if (span) {
        span.textContent = 'Aquí se reproducirá el video demo';
      }
    });
  }

  // ============================================
  // 11) CONTACT FORM — validation & feedback
  // ============================================
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('contact-name');
      var email = document.getElementById('contact-email');
      var valid = true;

      // Reset styles
      [name, email].forEach(function (input) {
        if (input) input.style.borderColor = '';
      });

      if (!name.value.trim()) {
        name.style.borderColor = '#e74c3c';
        valid = false;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (!valid) return;

      // Show success feedback (replace form content)
      var formEl = this;
      formEl.innerHTML =
        '<div class="contact-form__success">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
          '<h3>¡Solicitud enviada!</h3>' +
          '<p>Nos pondremos en contacto contigo en menos de 24 horas.</p>' +
        '</div>';
    });
  }

  // ============================================
  // 12) HERO GRADIENT — Mouse interaction + idle float
  // ============================================
  var heroSection = document.querySelector('.hero');
  var gradientBlobs = document.querySelectorAll('.hero__gradient-blob');

  if (heroSection && gradientBlobs.length) {
    // Each blob: current position, target, lerp speed, size offset
    var blobs = [
      { cx: 0, cy: 0, tx: 0, ty: 0, lerp: 0.03, off: 700 },
      { cx: 0, cy: 0, tx: 0, ty: 0, lerp: 0.02, off: 600 },
      { cx: 0, cy: 0, tx: 0, ty: 0, lerp: 0.015, off: 550 }
    ];
    var mouseInHero = false;
    var mouseX = 0.5, mouseY = 0.5;
    var time = 0;

    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      mouseInHero = true;
    });

    heroSection.addEventListener('mouseleave', function () {
      mouseInHero = false;
    });

    var heroVisible = true;
    var blobRafId = null;

    // Pause blob animation when hero is out of viewport
    var heroObserver = new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      if (heroVisible && !blobRafId) {
        blobRafId = requestAnimationFrame(animateBlobs);
      }
    }, { threshold: 0 });
    heroObserver.observe(heroSection);

    function animateBlobs() {
      if (!heroVisible) {
        blobRafId = null;
        return;
      }

      time += 0.005;
      var rect = heroSection.getBoundingClientRect();
      var w = rect.width;
      var h = rect.height;

      blobs.forEach(function (b, i) {
        var idleX, idleY;
        if (i === 0) {
          idleX = 0.3 + Math.sin(time * 0.7) * 0.15;
          idleY = 0.3 + Math.cos(time * 0.5) * 0.12;
        } else if (i === 1) {
          idleX = 0.7 + Math.sin(time * 0.5 + 2) * 0.12;
          idleY = 0.6 + Math.cos(time * 0.6 + 1) * 0.15;
        } else {
          idleX = 0.5 + Math.sin(time * 0.6 + 4) * 0.18;
          idleY = 0.4 + Math.cos(time * 0.4 + 3) * 0.14;
        }

        // Target: follow mouse if hovering, otherwise idle float
        if (mouseInHero) {
          b.tx = mouseX * w - b.off;
          b.ty = mouseY * h - b.off;
        } else {
          b.tx = idleX * w - b.off;
          b.ty = idleY * h - b.off;
        }

        // Lerp toward target
        b.cx += (b.tx - b.cx) * b.lerp;
        b.cy += (b.ty - b.cy) * b.lerp;

        gradientBlobs[i].style.transform = 'translate(' + b.cx.toFixed(1) + 'px, ' + b.cy.toFixed(1) + 'px)';
      });

      blobRafId = requestAnimationFrame(animateBlobs);
    }

    // Initialize positions
    var initRect = heroSection.getBoundingClientRect();
    blobs[0].cx = 0.3 * initRect.width - blobs[0].off;
    blobs[0].cy = 0.3 * initRect.height - blobs[0].off;
    blobs[1].cx = 0.7 * initRect.width - blobs[1].off;
    blobs[1].cy = 0.6 * initRect.height - blobs[1].off;
    blobs[2].cx = 0.5 * initRect.width - blobs[2].off;
    blobs[2].cy = 0.4 * initRect.height - blobs[2].off;

    blobRafId = requestAnimationFrame(animateBlobs);
  }

});
