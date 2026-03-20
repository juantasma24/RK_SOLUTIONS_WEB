<!DOCTYPE html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="RK Solutions — La Manzana: facturación, fichajes y cumplimiento normativo en una sola plataforma. Solicita tu demo gratis.">
  <title>La Manzana - RK Solutions</title>

  <!-- Google Fonts: Poppins + Manrope + DM Serif Display -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@1&family=Manrope:wght@400;500;600;700;800&family=Poppins:ital,wght@0,600;0,700;0,800;1,300;1,800&display=swap" rel="stylesheet">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <?php include 'includes/header.php'; ?>

  <!-- ============================================
       SECCIÓN 1: HERO
       ============================================ -->
  <section class="hero" id="inicio">
    <!-- Manzanas 3D cayendo -->
    <div class="hero__apples" id="heroApples">
      <img src="assets/img/manzana-3d-1.png" alt="" class="hero__apple hero__apple--1" aria-hidden="true">
      <img src="assets/img/manzana-3d-2.png" alt="" class="hero__apple hero__apple--2" aria-hidden="true">
      <img src="assets/img/manzana-3d-4.png" alt="" class="hero__apple hero__apple--3" aria-hidden="true">
      <img src="assets/img/manzana-3d-1.png" alt="" class="hero__apple hero__apple--4" aria-hidden="true">
    </div>

    <div class="container hero__container">
      <!-- Título con tipografías mixtas -->
      <h1 class="hero__title">
        <span class="hero__title-line hero__title-line--1">La</span>
        <span class="hero__title-line hero__title-line--2">MANZANA,</span>
        <span class="hero__title-line hero__title-line--3">el software</span>
        <span class="hero__title-line hero__title-line--4">que entiende</span>
        <span class="hero__title-line hero__title-line--5">tu negocio.</span>
      </h1>

      <!-- Botón Descubre más -->
      <a href="#que-hace" class="hero__cta" id="heroCtaBtn">
        <span>Descubre más</span>
      </a>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 2: ¿QUÉ HACE LA MANZANA POR TI?
       ============================================ -->
  <section class="que-hace section" id="que-hace">
    <!-- Manzanas decorativas outline -->
    <img src="assets/img/isotipo-manzana-outline.svg" alt="" class="que-hace__deco que-hace__deco--left" aria-hidden="true">
    <img src="assets/img/isotipo-manzana-outline.svg" alt="" class="que-hace__deco que-hace__deco--right" aria-hidden="true">

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
              <span class="que-hace__check"><img src="assets/img/check.svg" alt="✓"></span>
              <span><strong>Gestiona</strong> tus ventas</span>
            </li>
            <li>
              <span class="que-hace__check"><img src="assets/img/check.svg" alt="✓"></span>
              <span><strong>Controla</strong> fichajes y horarios</span>
            </li>
            <li>
              <span class="que-hace__check"><img src="assets/img/check.svg" alt="✓"></span>
              <span><strong>Cumple</strong> con TicketBAI (País Vasco) y VERI*FACTU (España)</span>
            </li>
          </ul>
        </div>

        <!-- Lado derecho: laptop con video -->
        <div class="que-hace__visual">
          <div class="que-hace__laptop anim-slide-up">
            <div class="que-hace__laptop-frame">
              <img src="assets/img/laptop-mockup.png" alt="La Manzana en portátil" class="que-hace__laptop-img">
              <div class="que-hace__laptop-screen">
                <iframe src="https://www.youtube.com/embed/ZVm05C_6VOs?autoplay=1&mute=1&loop=1&playlist=ZVm05C_6VOs&controls=0&showinfo=0&rel=0" title="Demo La Manzana" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>
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
      <video autoplay muted loop playsinline>
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
       SECCIÓN 4: ¿POR QUÉ ELEGIR LA MANZANA?
       ============================================ -->
  <section class="pilares section" id="la-manzana">
    <!-- Manzanas 3D flotando -->
    <div class="pilares__apples">
      <img src="assets/img/manzana-3d-1.png" alt="" class="pilares__apple pilares__apple--1" aria-hidden="true">
      <img src="assets/img/manzana-3d-3.png" alt="" class="pilares__apple pilares__apple--2" aria-hidden="true">
      <img src="assets/img/manzana-3d-5.png" alt="" class="pilares__apple pilares__apple--3" aria-hidden="true">
    </div>

    <div class="container text-center">
      <h2 class="section-title section-title--italic anim-reveal">¿Por qué elegir <span class="highlight">La Manzana</span><span class="highlight">?</span></h2>

      <div class="pilares__grid">
        <div class="pilar-card anim-reveal">
          <div class="pilar-card__icon">
            <img src="assets/img/laptop.svg" alt="Fácil de usar" width="32" height="32">
          </div>
          <h3 class="pilar-card__title">Fácil de usar</h3>
        </div>

        <div class="pilar-card anim-reveal">
          <div class="pilar-card__icon">
            <img src="assets/img/call.svg" alt="Soporte humano" width="32" height="32">
          </div>
          <h3 class="pilar-card__title">Soporte humano 24/7</h3>
        </div>

        <div class="pilar-card anim-reveal">
          <div class="pilar-card__icon">
            <img src="assets/img/house.svg" alt="Se adapta" width="32" height="32">
          </div>
          <h3 class="pilar-card__title">Se adapta a tu negocio</h3>
        </div>

        <div class="pilar-card anim-reveal">
          <div class="pilar-card__icon">
            <img src="assets/img/check_verde.svg" alt="Cumple" width="32" height="32">
          </div>
          <h3 class="pilar-card__title">Cumple la normativa</h3>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 5: CONTADORES
       ============================================ -->
  <section class="contadores section" id="contadores">
    <div class="container">
      <div class="contadores__grid">
        <div class="contador-card glass-card anim-reveal">
          <div class="contador-card__number">+<span class="counter-animated" data-target="3">0</span>K</div>
          <div class="contador-card__label">Manzanas</div>
        </div>
        <div class="contador-card glass-card anim-reveal">
          <div class="contador-card__number">+<span class="counter-animated" data-target="11">0</span>K</div>
          <div class="contador-card__label">Clientes</div>
        </div>
        <div class="contador-card glass-card anim-reveal">
          <div class="contador-card__number">+<span class="counter-animated" data-target="7">0</span></div>
          <div class="contador-card__label">Oficinas</div>
        </div>
        <div class="contador-card glass-card anim-reveal">
          <div class="contador-card__number">+<span class="counter-animated" data-target="20">0</span></div>
          <div class="contador-card__label">Años</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 6: TESTIMONIOS (Carrusel)
       ============================================ -->
  <section class="testimonios section" id="testimonios">
    <div class="container text-center">
      <div class="testimonios__carousel" id="testimoniosCarousel">
        <div class="testimonios__track">
          <!-- Testimonio 1 -->
          <div class="testimonio-card glass-card">
            <div class="testimonio-card__stars">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <p class="testimonio-card__quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <div class="testimonio-card__author">
              <div class="testimonio-card__avatar">
                <img src="assets/img/isotipo-manzana.svg" alt="Eukeni Sánchez">
              </div>
              <div>
                <div class="testimonio-card__name">Eukeni Sánchez</div>
                <div class="testimonio-card__role">Dueña de 150 Comercios</div>
              </div>
            </div>
          </div>

          <!-- Testimonio 2 -->
          <div class="testimonio-card glass-card">
            <div class="testimonio-card__stars">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <p class="testimonio-card__quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div class="testimonio-card__author">
              <div class="testimonio-card__avatar">
                <img src="assets/img/isotipo-manzana.svg" alt="Pilar Mosar">
              </div>
              <div>
                <div class="testimonio-card__name">Pilar Mosar</div>
                <div class="testimonio-card__role">Dueña de 80 Comercios</div>
              </div>
            </div>
          </div>

          <!-- Testimonio 3 -->
          <div class="testimonio-card glass-card">
            <div class="testimonio-card__stars">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <p class="testimonio-card__quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <div class="testimonio-card__author">
              <div class="testimonio-card__avatar">
                <img src="assets/img/isotipo-manzana.svg" alt="Beatriz Cabrera">
              </div>
              <div>
                <div class="testimonio-card__name">Beatriz Cabrera</div>
                <div class="testimonio-card__role">Dueña de 120 Comercios</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicadores -->
        <div class="testimonios__dots" id="testimoniosDots">
          <button class="testimonios__dot active" data-index="0" aria-label="Testimonio 1"></button>
          <button class="testimonios__dot" data-index="1" aria-label="Testimonio 2"></button>
          <button class="testimonios__dot" data-index="2" aria-label="Testimonio 3"></button>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 7: PLANES
       ============================================ -->
  <section class="planes section" id="planes">
    <div class="container text-center">
      <h2 class="section-title anim-reveal">Elige el plan<br><span class="highlight">que se adapte<br>a tu negocio</span></h2>

      <div class="planes__grid">
        <!-- Plan Premium -->
        <div class="plan-card glass-card anim-reveal">
          <h3 class="plan-card__name">Premium</h3>
          <ul class="plan-card__features">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              TPV
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Fichero de clientes
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Creación y emisión de facturas
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Economato: gastos, presupuestos...
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Personalización de pantallas
            </li>
          </ul>
          <a href="#contacto" class="btn btn--primary">Quiero este plan</a>
        </div>

        <!-- Plan Standard -->
        <div class="plan-card glass-card anim-reveal">
          <h3 class="plan-card__name">Standard</h3>
          <ul class="plan-card__features">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Fichero de clientes
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Creación y emisión de facturas
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Economato: gastos, presupuestos, empleados, etc.
            </li>
          </ul>
          <a href="#contacto" class="btn btn--outline">Quiero este plan</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 8: CTA INTERMEDIO
       ============================================ -->
  <section class="cta-mid section" id="cta-mid">
    <div class="container text-center">
      <h2 class="cta-mid__title anim-reveal">
        Prepárate hoy. <span class="highlight"><em>Gana tranquilidad mañana.</em></span>
      </h2>
    </div>
  </section>

  <!-- ============================================
       SECCIÓN 9: CONTACTO (Trabaja con La Manzana)
       =============== ============================= -->
  <section class="contacto section" id="contacto">
    <div class="container">
      <div class="contacto__inner">
        <!-- Lado izquierdo -->
        <div class="contacto__info anim-reveal">
          <h2 class="contacto__title">Trabaja con<br><span class="highlight">La Manzana</span>,<br>sin costes<br>por 12 meses</h2>
          <p class="contacto__subtitle">INCLUYE:</p>
          <ul class="contacto__list">
            <li>Software La Manzana</li>
            <li>Soporte técnico 24/7</li>
            <li>Acompañamiento y formación</li>
            <li>Fichaje horario integrado</li>
          </ul>
        </div>

        <!-- Lado derecho: formulario -->
        <div class="contacto__form-wrapper anim-slide-up">
          <form class="contacto__form glass-card" id="contactForm" action="#" method="POST">
            <p class="contacto__form-intro">Déjanos tus datos y te contamos cómo empezar con La Manzana <strong>sin costes el primer año.</strong></p>

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
              <select name="comunidad" class="contacto__input contacto__select" required>
                <option value="" disabled selected>Comunidad autónoma</option>
                <option value="andalucia">Andalucía</option>
                <option value="aragon">Aragón</option>
                <option value="asturias">Asturias</option>
                <option value="baleares">Islas Baleares</option>
                <option value="canarias">Canarias</option>
                <option value="cantabria">Cantabria</option>
                <option value="castilla-leon">Castilla y León</option>
                <option value="castilla-mancha">Castilla-La Mancha</option>
                <option value="cataluna">Cataluña</option>
                <option value="ceuta">Ceuta</option>
                <option value="extremadura">Extremadura</option>
                <option value="galicia">Galicia</option>
                <option value="madrid">Madrid</option>
                <option value="melilla">Melilla</option>
                <option value="murcia">Murcia</option>
                <option value="navarra">Navarra</option>
                <option value="pais-vasco">País Vasco</option>
                <option value="rioja">La Rioja</option>
                <option value="valencia">Comunidad Valenciana</option>
              </select>
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
      <div class="faq__header text-center anim-reveal">
        <div class="faq__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h2 class="section-title">Resolvemos tus dudas<br>antes de empezar.</h2>
      </div>

      <div class="faq__grid">
        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span>¿Qué es La Manzana y para qué sirve?</span>
            <div class="faq-item__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">La Manzana es un software de gestión integral que unifica facturación, fichajes, TPV y cumplimiento normativo (TicketBAI y VERI*FACTU) en una sola plataforma. Diseñado para autónomos, hostelería y comercio.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span>¿Tengo un comercio, es para mí?</span>
            <div class="faq-item__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Sí. La Manzana se adapta a cualquier tipo de comercio: retail, hostelería, servicios profesionales y más. Si necesitas gestionar ventas, fichajes o cumplir la normativa fiscal, es para ti.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span>¿Puedo usar La Manzana desde cualquier dispositivo?</span>
            <div class="faq-item__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Sí. Funciona desde ordenador, tablet y móvil. Accede a todos tus datos en tiempo real desde cualquier lugar con conexión a internet.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span>¿Cumple con TicketBAI y VERI*FACTU?</span>
            <div class="faq-item__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Sí, al 100%. La Manzana está homologada y actualizada para cumplir con TicketBAI (País Vasco) y VERI*FACTU (resto de España). Nos encargamos de las actualizaciones normativas.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span>¿Es fácil de usar para alguien que no es técnico?</span>
            <div class="faq-item__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Totalmente. Si sabes enviar un correo electrónico, sabes usar La Manzana. Además, incluimos formación completa y soporte humano 24/7 para cualquier duda.</div>
          </div>
        </div>

        <div class="faq-item anim-reveal">
          <button class="faq-item__question" aria-expanded="false">
            <span>¿Puedo probar La Manzana antes de contratarla?</span>
            <div class="faq-item__icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
          </button>
          <div class="faq-item__answer">
            <div class="faq-item__answer-inner">Sí. Ofrecemos 12 meses sin costes para que pruebes todas las funcionalidades sin compromiso. Déjanos tus datos y te contactamos para empezar.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <?php include 'includes/footer.php'; ?>

  <!-- JavaScript -->
  <script src="js/main.js"></script>

</body>
</html>
