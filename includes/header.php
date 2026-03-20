<!-- Top Bar -->
<div class="topbar" id="topbar">
  <div class="topbar__inner">
    <!-- Social icons -->
    <div class="topbar__social">
      <a href="https://www.instagram.com/rksolutions_es/" target="_blank" rel="noopener" aria-label="Instagram">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
      </a>
      <a href="https://www.linkedin.com/company/rk-solutions/" target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
      </a>
    </div>
    <!-- Right: theme toggle + language -->
    <div class="topbar__right">
      <button class="topbar__theme-toggle" id="themeToggle" aria-label="Cambiar tema">
        <!-- Moon (dark mode active) -->
        <svg class="topbar__icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <!-- Sun (light mode active) -->
        <svg class="topbar__icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>
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
      <img src="assets/img/logos/logo_rk_blanco.svg" alt="RK Solutions" class="header__logo-img">
    </a>

    <!-- Navegación Izquierda -->
    <nav class="header__nav header__nav--left" id="navLeft">
      <ul>
        <li><a href="#">Sobre Nosotros</a></li>
        <li><a href="#la-manzana" class="active">La Manzana</a></li>
        <li><a href="#">Soluciones</a></li>
      </ul>
    </nav>

    <!-- Isotipo Centro -->
    <a href="#inicio" class="header__isotipo">
      <img src="assets/img/isotipo-manzana.svg" alt="La Manzana" class="header__isotipo-img">
    </a>

    <!-- Navegación Derecha -->
    <nav class="header__nav header__nav--right" id="navRight">
      <ul>
        <li><a href="#">Prensa</a></li>
        <li><a href="#">Trabaja con Nosotros</a></li>
        <li><a href="#contacto">Contacto</a></li>
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
    <img src="assets/img/isotipo-manzana.svg" alt="La Manzana" class="mobile-menu__isotipo">
  </div>
  <ul>
    <li><a href="#inicio" class="mobile-link">Inicio</a></li>
    <li><a href="#" class="mobile-link">Sobre Nosotros</a></li>
    <li><a href="#la-manzana" class="mobile-link">La Manzana</a></li>
    <li><a href="#" class="mobile-link">Soluciones</a></li>
    <li><a href="#" class="mobile-link">Prensa</a></li>
    <li><a href="#" class="mobile-link">Trabaja con Nosotros</a></li>
    <li><a href="#contacto" class="mobile-link">Contacto</a></li>
  </ul>
</div>
