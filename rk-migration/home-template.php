<script>history.scrollRestoration="manual";(function(){var s=sessionStorage.getItem("rk_section");if(s&&s!=="inicio"){var st=document.createElement("style");st.id="rk-restore-style";st.textContent=".topbar{transform:translateY(-100%)!important;transition:none!important;}.header{top:0!important;transition:none!important;}";(document.head||document.documentElement).appendChild(st);}})();</script>
<!-- Top Bar -->
<div class="topbar" id="topbar">
  <div class="topbar__inner">
    <!-- Social icons -->
    <div class="topbar__social">
      <a href="https://www.instagram.com/rksolutions.es/" target="_blank" rel="noopener" aria-label="Instagram">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
      </a>
      <a href="https://www.linkedin.com/company/rksolutions-es/" target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
      </a>
      <a href="https://www.youtube.com/@rksolutions-es" target="_blank" rel="noopener" aria-label="YouTube">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>
    <!-- Right: language -->
    <div class="topbar__right">
      <div class="topbar__lang" id="langDropdown">
        <button class="topbar__lang-btn" id="langToggle">
          Idioma
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="topbar__lang-menu" id="langMenu">
          <button class="topbar__lang-option" data-lang="eu">Euskera</button>
          <button class="topbar__lang-option" data-lang="es">Castellano</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Header Sticky -->
<header class="header" id="header">
  <div class="header__inner">
    <!-- Logo -->
    <a href="#inicio" class="header__logo">
      <img src="assets/img/logos/logo_rk_blanco.svg" alt="RK Solutions" class="header__logo-img" width="500" height="243" draggable="false">
    </a>

    <!-- Navegación Izquierda -->
    <nav class="header__nav header__nav--left" id="navLeft">
      <ul>
        <li><a href="#">Sobre Nosotros</a></li>
        <li><a href="#que-hace" class="active">La Manzana</a></li>
        <li><a href="#">Soluciones</a></li>
      </ul>
    </nav>

    <!-- Isotipo Centro -->
    <a href="#inicio" class="header__isotipo">
      <img src="assets/img/isotipo-manzana.svg" alt="La Manzana" class="header__isotipo-img" width="200" height="200" draggable="false">
    </a>

    <!-- Navegación Derecha -->
    <nav class="header__nav header__nav--right" id="navRight">
      <ul>
        <li><a href="#">Prensa</a></li>
        <li><a href="#">Trabaja con Nosotros</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </nav>

    <!-- Mobile Toggle -->
    <button class="header__mobile-toggle" id="mobileToggle" aria-label="Abrir menú">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu__header">
  </div>
  <ul>
    <li><a href="#inicio" class="mobile-link">Inicio</a></li>
    <li><a href="#" class="mobile-link">Sobre Nosotros</a></li>
    <li><a href="#que-hace" class="mobile-link">La Manzana</a></li>
    <li><a href="#" class="mobile-link">Soluciones</a></li>
    <li><a href="#" class="mobile-link">Prensa</a></li>
    <li><a href="#" class="mobile-link">Trabaja con Nosotros</a></li>
    <li><a href="#" class="mobile-link">Contacto</a></li>
  </ul>
</div>

<!-- ============================================
       SECCIÓN 1: HERO
       ============================================ -->
  <section class="hero" id="inicio">
    <div class="hero__pattern" aria-hidden="true"></div>
    <div class="container hero__container">
      <!-- Título con tipografías mixtas -->
      <h1 class="hero__title">
        <span class="hero__title-line hero__title-line--1">La Manzana,</span>
        <span class="hero__title-line hero__title-line--3">el software</span>
        <span class="hero__title-line hero__title-line--4">que entiende</span>
        <span class="hero__title-line hero__title-line--5">tu negocio.</span>
      </h1>

      <!-- Social proof + CTA -->
      <div class="hero__actions">

        <div class="hero__social-proof">
          <div class="hero__avatars">
            <div class="hero__avatar" data-pool="47,12,33,56,63"><img src="assets/img/avatars/avatar-47.jpg" alt="" width="38" height="38" draggable="false"><img src="assets/img/avatars/avatar-47.jpg" alt="" width="38" height="38" aria-hidden="true" draggable="false"></div>
            <div class="hero__avatar" data-pool="32,5,44,19,68"><img src="assets/img/avatars/avatar-32.jpg" alt="" width="38" height="38" draggable="false"><img src="assets/img/avatars/avatar-32.jpg" alt="" width="38" height="38" aria-hidden="true" draggable="false"></div>
            <div class="hero__avatar" data-pool="21,8,37,52,70"><img src="assets/img/avatars/avatar-21.jpg" alt="" width="38" height="38" draggable="false"><img src="assets/img/avatars/avatar-21.jpg" alt="" width="38" height="38" aria-hidden="true" draggable="false"></div>
            <div class="hero__avatar" data-pool="10,25,41,60,15"><img src="assets/img/avatars/avatar-10.jpg" alt="" width="38" height="38" draggable="false"><img src="assets/img/avatars/avatar-10.jpg" alt="" width="38" height="38" aria-hidden="true" draggable="false"></div>
          </div>
          <p class="hero__social-text">
            <strong>+3.000</strong> usuarios<br>eligen La Manzana
          </p>
        </div>

        <a href="#que-hace" class="hero__cta" id="heroCtaBtn">
          <span>Descubre más</span>
        </a>

      </div>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 2: ¿QUÉ HACE LA MANZANA POR TI?
       ============================================ -->
  <section class="que-hace section" id="que-hace">
    <div class="container">
      <div class="que-hace__inner">
        <!-- Lado izquierdo: texto -->
        <div class="que-hace__content">
          <h2 class="que-hace__title anim-reveal">
            <span>¿Qué hace</span>
            <span>La Manzana</span>
            <span class="highlight">por ti?</span>
          </h2>

          <ul class="que-hace__features anim-reveal">
            <li>
              <span class="que-hace__check"><img src="assets/img/check.svg" alt="✓" width="50" height="50" draggable="false"></span>
              <span><strong>Gestiona</strong> tus ventas</span>
            </li>
            <li>
              <span class="que-hace__check"><img src="assets/img/check.svg" alt="✓" width="50" height="50" draggable="false"></span>
              <span><strong>Controla</strong> fichajes y horarios</span>
            </li>
            <li>
              <span class="que-hace__check"><img src="assets/img/check.svg" alt="✓" width="50" height="50" draggable="false"></span>
              <span><strong>Cumple</strong> con TicketBAI (País Vasco) y VERI*FACTU (España)</span>
            </li>
          </ul>

          <!-- Ilustración decorativa -->
          <div class="que-hace__ilustracion" aria-hidden="true">
            <img src="assets/img/ilustraciones/personaje_portatil.svg" alt="" loading="lazy" decoding="async" width="400" height="307">
          </div>
        </div><!-- /.que-hace__content -->

        <!-- Lado derecho: laptop con video -->
        <div class="que-hace__visual">
          <div class="que-hace__laptop anim-slide-up">
            <div class="que-hace__laptop-frame">
              <img src="assets/img/laptop-mockup.png" alt="La Manzana en portátil" class="que-hace__laptop-img" width="1200" height="725" loading="eager" decoding="async" fetchpriority="high" draggable="false">
              <div class="que-hace__laptop-screen">
                <div class="youtube-facade" data-embed="ZVm05C_6VOs">
                  <img src="https://img.youtube.com/vi/ZVm05C_6VOs/maxresdefault.jpg" alt="Demo La Manzana" class="youtube-facade__thumb" width="1280" height="720" loading="lazy" draggable="false">
                  <button class="youtube-facade__play" aria-label="Reproducir vídeo">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </button>
                </div>
              </div>
              <!-- Badge sobre la laptop -->
              <div class="que-hace__badge-dispositivo">
                <span>Desde cualquier</span>
                <strong>DISPOSITIVO</strong>
              </div>
              <div class="que-hace__badge-247">
                <span>SOPORTE</span>
                <strong>24/7</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 3: PARA AUTÓNOMOS, HOSTELERÍA Y COMERCIO
       ============================================ -->
  <section class="autonomos section" id="autonomos">
    <div class="autonomos__video-bg">
      <video muted loop playsinline preload="none" data-lazy-video>
        <source src="assets/img/video-autonomos.mp4" type="video/mp4">
      </video>
      <div class="autonomos__overlay"></div>
    </div>
    <div class="container">
      <h2 class="autonomos__title anim-reveal">
        Para autónomos, hostelería<br>y comercio<span class="dot-green">.</span>
      </h2>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 3.5: SECUENCIA TPV (scroll-driven frames)
       ============================================ -->
  <section class="tpv-seq" id="tpv-seq" aria-hidden="true">
    <div class="tpv-seq__sticky">
      <canvas class="tpv-seq__canvas" id="tpvCanvas"></canvas>
    </div>
    <div class="tpv-seq__mobile">
      <img src="assets/img/tpv_mobile/tpv_responsive.webp" alt="" loading="lazy" draggable="false">
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 4+5: ¿POR QUÉ ELEGIR LA MANZANA? + CONTADORES
       ============================================ -->
  <section class="pilares section" id="la-manzana">
    <div class="container text-center">
      <h2 class="section-title anim-reveal">¿Por qué elegir <span class="highlight">La Manzana?</span></h2>

      <div class="pilares__grid">
        <div class="pilar-item anim-reveal">
          <div class="pilar-item__icon">
            <img src="assets/img/laptop.svg" alt="Fácil de usar" width="72" height="72" draggable="false">
          </div>
          <p class="pilar-item__label">Fácil de usar</p>
        </div>

        <div class="pilar-item anim-reveal">
          <div class="pilar-item__icon">
            <img src="assets/img/call.svg" alt="Soporte humano" width="72" height="72" draggable="false">
          </div>
          <p class="pilar-item__label">Soporte<br>humano 24/7</p>
        </div>

        <div class="pilar-item anim-reveal">
          <div class="pilar-item__icon">
            <img src="assets/img/house.svg" alt="Se adapta" width="72" height="72" draggable="false">
          </div>
          <p class="pilar-item__label">Se adapta a<br>tu negocio</p>
        </div>

        <div class="pilar-item anim-reveal">
          <div class="pilar-item__icon">
            <img src="assets/img/check_verde.svg" alt="Cumple" width="72" height="72" draggable="false">
          </div>
          <p class="pilar-item__label">Cumple<br>la normativa</p>
        </div>
      </div>

      <!-- Contadores fusionados — ancla #contadores conservada -->
      <div id="contadores" class="contadores__wrapper anim-reveal">
        <div class="contadores__grid">

          <div class="contador-item anim-reveal anim-reveal--scale">
            <div class="contador-card">
              <div class="contador-card__number">+<span class="counter-slot" data-target="3">3</span>K</div>
            </div>
            <p class="contador-item__label">Manzanas</p>
          </div>

          <div class="contador-item anim-reveal anim-reveal--scale">
            <div class="contador-card">
              <div class="contador-card__number">+<span class="counter-slot" data-target="11">11</span>K</div>
            </div>
            <p class="contador-item__label">Clientes</p>
          </div>

          <div class="contador-item anim-reveal anim-reveal--scale">
            <div class="contador-card">
              <div class="contador-card__number">+<span class="counter-slot" data-target="7">7</span></div>
            </div>
            <p class="contador-item__label">Oficinas</p>
          </div>

          <div class="contador-item anim-reveal anim-reveal--scale">
            <div class="contador-card">
              <div class="contador-card__number">+<span class="counter-slot" data-target="20">20</span></div>
            </div>
            <p class="contador-item__label">Años</p>
          </div>

        </div>
      </div>

    </div>
  </section>

  <!-- ============================================
       SECCIÓN 6: TESTIMONIOS (Carrusel 3 en 3)
       ============================================ -->
  <section class="testimonios section" id="testimonios">
    <div class="container">
      <h2 class="section-title text-center anim-reveal">Lo que dicen <span class="highlight">nuestros clientes</span></h2>
      <!-- Carrusel de testimonios -->
      <div class="testimonios__carousel anim-reveal" id="testimoniosCarousel">
        <!-- Botón anterior -->
        <button class="testimonios__nav testimonios__nav--prev" id="testimoniosPrev" aria-label="Testimonio anterior">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <!-- Track de slides -->
        <div class="testimonios__track-wrapper">
          <div class="testimonios__track" id="testimoniosTrack">
            <!-- Testimonio 1 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"Desde que uso La Manzana, mi negocio funciona como un reloj. La facturación es automática y el fichaje de empleados es súper sencillo. El soporte 24/7 me ha salvado varias veces."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Eukene Sanchez" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Eukene Sanchez</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonio 2 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"Autónoma desde hace 15 años, he probado muchos programas. La Manzana es el único que entiendo sin necesitar un máster. Cumple con TicketBAI y me quita un peso de encima."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Pilar Marar" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Pilar Marar</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonio 3 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"Tenía 3 tiendas y cada una con su sistema. Ahora con La Manzana lo veo todo desde el móvil. Los reportes son claros y la formación que me dieron fue excelente."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Sarahí Cabrera" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Sarahí Cabrera</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonio 4 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"El mejor software que he usado en mis 10 años gestionando hoteles. La integración con los canales de reserva es perfecta y el soporte técnico responde en minutos."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Carlos Mendoza" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Carlos Mendoza</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonio 5 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"Como gestoría, necesitamos control total. La Manzana nos da reportes detallados de cada cliente y nos ahorra horas de trabajo administrativo."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Laura Giménez" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Laura Giménez</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonio 6 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"La migración desde mi antiguo software fue gratuita y sin dolor. El equipo de La Manzana se encargó de todo. Llevo 2 años sin incidencias."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Roberto Díaz" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Roberto Díaz</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonio 7 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"Tengo una academia y el módulo de facturación me permite generar recibos automáticos para 200 alumnos. Un cambio radical en mi productividad."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Mónica Torres" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Mónica Torres</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonio 8 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"Lo que más valoro es la tranquilidad de estar cumpliendo la normativa sin tener que preocuparme. La Manzana se actualiza sola y eso no tiene precio."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Javier Ruiz" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Javier Ruiz</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonio 9 -->
            <div class="testimonio-slide">
              <div class="testimonio-card">
                <div class="testimonio-card__bubble">
                  <img src="assets/img/comillas.svg" alt="" class="testimonio-card__comillas" width="67" height="50" aria-hidden="true" draggable="false">
                  <p class="testimonio-card__quote">"Mis camareros aprendieron a usar el TPV en una tarde. La interfaz es intuitiva y los clientes agradecen la rapidez en las cuentas."</p>
                </div>
                <div class="testimonio-card__author">
                  <div class="testimonio-card__avatar">
                    <img src="assets/img/isotipo-manzana.svg" alt="Ana Belén López" width="200" height="200" draggable="false">
                  </div>
                  <div>
                    <div class="testimonio-card__name">Ana Belén López</div>
                    <div class="testimonio-card__role">Cliente</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón siguiente -->
        <button class="testimonios__nav testimonios__nav--next" id="testimoniosNext" aria-label="Testimonio siguiente">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <!-- Indicadores (dots) -->
      <div class="testimonios__indicators" id="testimoniosIndicators">
        <!-- Se generan dinámicamente según número de slides -->
      </div>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 7: PLANES
       ============================================ -->
  <section class="planes section" id="planes">
    <div class="container">
      <div class="planes__layout">

        <!-- Columna izquierda: texto -->
        <div class="planes__texto anim-reveal">
          <h2 class="planes__titulo">Elige el plan<br><strong>que se adapte<br>a tu negocio</strong></h2>
          <p class="planes__subtitulo"><strong>VERI*FACTU</strong> llega y adaptarse a tiempo <strong>marca la diferencia.</strong></p>
        </div>

        <!-- Columna derecha: cards -->
        <div class="planes__grid">

          <!-- Plan Premium -->
          <div class="plan-card plan-card--premium anim-reveal anim-reveal--scale">
            <div class="plan-card__badge">
              <img src="assets/img/medal.svg" alt="" width="32" height="32" aria-hidden="true" draggable="false">
            </div>
            <div class="plan-card__inner">
              <h3 class="plan-card__name">Premium</h3>
              <hr class="plan-card__divider">
              <ul class="plan-card__features">
                <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">TPV</li>
                <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">Fichas de cliente</li>
                <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">Control y realización de facturas</li>
                <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">Economía: gastos, presupuestos, empleados, etc.</li>
                <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">Personalización de pestañas</li>
              </ul>
              <a href="#contacto" class="btn btn--primary plan-card__btn">Quiero este plan</a>
            </div>
          </div>

          <!-- Plan Standard -->
          <div class="plan-card plan-card--standard anim-reveal anim-reveal--scale">
            <div class="plan-card__badge plan-card__badge--standard">
              <img src="assets/img/laptop.svg" alt="" width="32" height="32" aria-hidden="true" draggable="false">
            </div>
            <h3 class="plan-card__name">Standard</h3>
            <hr class="plan-card__divider">
            <ul class="plan-card__features">
              <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">TPV</li>
              <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">Fichas de cliente</li>
              <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">Control y realización de facturas</li>
              <li><img src="assets/img/check_verde.svg" width="18" height="18" alt="" draggable="false">Economía: gastos, presupuestos, empleados, etc.</li>
            </ul>
            <a href="#contacto" class="btn plan-card__btn plan-card__btn--standard">Quiero este plan</a>
          </div>

        </div>
      </div>
    </div>

  </section>

  <!-- ============================================
       SECCIÓN 8+9: CONTACTO (Trabaja con La Manzana)
       ============================================ -->
  <section class="contacto section" id="contacto">
    <div class="container">
      <div class="contacto__inner">
        <!-- Lado izquierdo -->
        <div class="contacto__info anim-reveal">
          <h2 class="contacto__title">Trabaja con<br><span class="highlight">La Manzana</span>,<br>sin coste<br>por 12 meses</h2>
          <p class="contacto__subtitle">INCLUYE:</p>
          <ul class="contacto__list">
            <li><img src="assets/img/check.svg" width="20" height="20" alt="" draggable="false">Software La Manzana</li>
            <li><img src="assets/img/check.svg" width="20" height="20" alt="" draggable="false">Soporte técnico 24/7</li>
            <li><img src="assets/img/check.svg" width="20" height="20" alt="" draggable="false">Acompañamiento y formación</li>
            <li><img src="assets/img/check.svg" width="20" height="20" alt="" draggable="false">Fichaje horario integrado</li>
          </ul>
        </div>

        <!-- Lado derecho: formulario -->
        <div class="contacto__form-wrapper anim-slide-up">
          <form class="contacto__form" id="contactForm" action="#" method="POST">
            <div class="contacto__form-shine" aria-hidden="true"></div>
            <p class="contacto__form-intro">Déjanos tus datos y te contamos cómo empezar con La Manzana <strong>sin coste el primer año.</strong></p>

            <div class="contacto__form-group">
              <input type="text" name="name" class="contacto__input" placeholder="Nombre y apellido" required>
            </div>

            <div class="contacto__form-row">
              <div class="contacto__form-group">
                <input type="email" name="email" class="contacto__input" placeholder="Correo electrónico" required>
              </div>
              <div class="contacto__form-group">
                <input type="tel" name="phone" class="contacto__input" placeholder="Móvil">
              </div>
            </div>

            <div class="contacto__form-group">
              <div class="contacto__dropdown" id="comunidadDropdown">
                <button type="button" class="contacto__dropdown-btn" id="comunidadToggle" aria-haspopup="listbox" aria-expanded="false">
                  <span class="contacto__dropdown-label" id="comunidadLabel">Comunidad autónoma</span>
                  <svg class="contacto__dropdown-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="contacto__dropdown-menu" id="comunidadMenu" role="listbox">
                  <button type="button" class="contacto__dropdown-option" data-value="andalucia">Andalucía</button>
                  <button type="button" class="contacto__dropdown-option" data-value="aragon">Aragón</button>
                  <button type="button" class="contacto__dropdown-option" data-value="asturias">Asturias</button>
                  <button type="button" class="contacto__dropdown-option" data-value="baleares">Islas Baleares</button>
                  <button type="button" class="contacto__dropdown-option" data-value="canarias">Canarias</button>
                  <button type="button" class="contacto__dropdown-option" data-value="cantabria">Cantabria</button>
                  <button type="button" class="contacto__dropdown-option" data-value="castilla-leon">Castilla y León</button>
                  <button type="button" class="contacto__dropdown-option" data-value="castilla-mancha">Castilla-La Mancha</button>
                  <button type="button" class="contacto__dropdown-option" data-value="cataluna">Cataluña</button>
                  <button type="button" class="contacto__dropdown-option" data-value="ceuta">Ceuta</button>
                  <button type="button" class="contacto__dropdown-option" data-value="extremadura">Extremadura</button>
                  <button type="button" class="contacto__dropdown-option" data-value="galicia">Galicia</button>
                  <button type="button" class="contacto__dropdown-option" data-value="madrid">Madrid</button>
                  <button type="button" class="contacto__dropdown-option" data-value="melilla">Melilla</button>
                  <button type="button" class="contacto__dropdown-option" data-value="murcia">Murcia</button>
                  <button type="button" class="contacto__dropdown-option" data-value="navarra">Navarra</button>
                  <button type="button" class="contacto__dropdown-option" data-value="pais-vasco">País Vasco</button>
                  <button type="button" class="contacto__dropdown-option" data-value="rioja">La Rioja</button>
                  <button type="button" class="contacto__dropdown-option" data-value="valencia">Comunidad Valenciana</button>
                </div>
                <input type="hidden" name="comunidad" id="comunidadInput">
              </div>
            </div>

            <div class="contacto__form-group contacto__form-check">
              <input type="checkbox" id="privacy" name="privacy" required>
              <label for="privacy">He Leído y Acepto la <a href="#">Política de Privacidad</a>.</label>
            </div>

            <button type="submit" class="btn btn--primary btn--lg contacto__submit">Quiero saber más</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 10: FAQ
       ============================================ -->
  <section class="faq section" id="faq">
    <div class="container">
      <div class="faq__header anim-reveal">
        <h2 class="faq__title">Resolvemos tus dudas antes de empezar.</h2>
      </div>

      <div class="faq__grid">
        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span class="faq-item__plus">+</span>
            <span class="faq-item__text">¿Qué es La Manzana y para qué sirve?</span>
            <div class="faq-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">La Manzana es un software de gestión integral que unifica facturación, fichajes, TPV y cumplimiento normativo (TicketBAI y VERI*FACTU) en una sola plataforma. Diseñado para autónomos, hostelería y comercio.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span class="faq-item__plus">+</span>
            <span class="faq-item__text">¿Tengo un comercio, es para mí?</span>
            <div class="faq-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Sí. La Manzana se adapta a cualquier tipo de comercio: retail, hostelería, servicios profesionales y más. Si necesitas gestionar ventas, fichajes o cumplir la normativa fiscal, es para ti.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span class="faq-item__plus">+</span>
            <span class="faq-item__text">¿Puedo usar La Manzana desde cualquier dispositivo?</span>
            <div class="faq-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Sí. Funciona desde ordenador, tablet y móvil. Accede a todos tus datos en tiempo real desde cualquier lugar con conexión a internet.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span class="faq-item__plus">+</span>
            <span class="faq-item__text">¿Cumple con TicketBAI y VERI*FACTU?</span>
            <div class="faq-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Sí, al 100%. La Manzana está homologada y actualizada para cumplir con TicketBAI (País Vasco) y VERI*FACTU (resto de España). Nos encargamos de las actualizaciones normativas.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span class="faq-item__plus">+</span>
            <span class="faq-item__text">¿Es fácil de usar para alguien que no es técnico?</span>
            <div class="faq-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Totalmente. Si sabes enviar un correo electrónico, sabes usar La Manzana. Además, incluimos formación completa y soporte humano 24/7 para cualquier duda.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span class="faq-item__plus">+</span>
            <span class="faq-item__text">¿Puedo probar La Manzana antes de contratarla?</span>
            <div class="faq-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Sí. Ofrecemos 12 meses sin coste para que pruebes todas las funcionalidades sin compromiso. Déjanos tus datos y te contactamos para empezar.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
<!-- Footer -->
<footer class="footer" id="footer">
  <div class="container">
    <div class="footer__grid">
      <!-- Brand -->
      <div class="footer__brand">
        <img src="assets/img/logos/logo_rk_blanco.svg" alt="RK Solutions" class="footer__logo-img" width="500" height="243" draggable="false">
        <p class="footer__tagline">El software que entiende tu negocio.</p>
        <form class="footer__newsletter">
          <input type="email" class="footer__newsletter-input" placeholder="Ingresa tu email y suscríbete a nuestro newsletter" required>
          <button type="submit" class="footer__newsletter-btn">Suscribirse</button>
        </form>
        <div class="footer__social">
          <a href="https://www.linkedin.com/company/rksolutions-es/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.instagram.com/rksolutions.es/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.facebook.com/solutions.es/" target="_blank" rel="noopener" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.youtube.com/@rksolutions-es" target="_blank" rel="noopener" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
          </a>
        </div>
      </div>

      <!-- Secciones rápidas -->
      <div class="footer__col">
        <h4 class="footer__col-title">Secciones rápidas</h4>
        <div class="footer__links">
          <a href="#la-manzana">La Manzana</a>
          <a href="#">Sobre Nosotros</a>
          <a href="#">Soluciones</a>
          <a href="#planes">Precios</a>
          <a href="#">Trabaja con Nosotros</a>
        </div>
      </div>

      <!-- Política de Privacidad -->
      <div class="footer__col">
        <h4 class="footer__col-title">Política de Privacidad</h4>
        <div class="footer__links">
          <a href="#">Aviso legal</a>
          <a href="#">Política de cookies</a>
          <a href="#">Política de gestión</a>
          <a href="#">Política de privacidad</a>
          <a href="#">Cumple la normativa</a>
        </div>
      </div>

      <!-- Contáctanos -->
      <div class="footer__col">
        <h4 class="footer__col-title">Contáctanos</h4>
        <div class="footer__links">
          <a href="tel:+34944050737">944 05 07 37</a>
          <a href="mailto:Ag@rksolutions.es">Ag@rksolutions.es</a>
          <a href="#">Calle Bidecruceta 11,<br>Oficina 301, 48510<br>Derio-Lomo, Bizkaia</a>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="footer__bottom">
      <p class="footer__copyright">&copy; 2025 RK Solutions. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

<!-- Back to Top -->
<button class="back-to-top" id="backToTop" aria-label="Volver arriba">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<!-- Mascot Character Toggle -->
<div class="mascot-toggle" id="mascotToggle">
  <!-- Bubble -->
  <div class="mascot-bubble" id="mascotBubble" aria-live="polite">
    <button class="mascot-bubble__close" id="mascotClose" aria-label="Cerrar mensaje">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <p class="mascot-bubble__text"><span class="mascot-bubble__text--green">La Manzana</span> lo hace por ti</p>
    <a href="#planes" class="mascot-bubble__cta">Solicita tu Demo</a>
  </div>
  <!-- Character Button -->
  <button class="mascot-btn" id="mascotBtn" aria-label="Abrir mensaje del personaje">
    <img src="assets/img/personaje_manzana.svg" alt="Personaje La Manzana" class="mascot-btn__img" width="200" height="200" draggable="false">
  </button>
</div>
