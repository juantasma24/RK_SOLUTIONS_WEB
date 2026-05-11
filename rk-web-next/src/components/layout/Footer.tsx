"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export default function Footer() {
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const mascotImgRef = useRef<HTMLImageElement>(null);
  const wiggleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentYear = new Date().getFullYear();

  const triggerWiggle = useCallback(() => {
    const img = mascotImgRef.current;
    if (!img) return;
    img.classList.remove("is-wiggling");
    void img.offsetWidth;
    img.classList.add("is-wiggling");
  }, []);

  const scheduleWiggle = useCallback(() => {
    if (wiggleIntervalRef.current) clearInterval(wiggleIntervalRef.current);
    wiggleIntervalRef.current = setInterval(triggerWiggle, 12000);
  }, [triggerWiggle]);

  // Back to top scroll listener
  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setIsBackToTopVisible(window.scrollY > 400);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Mascot: initial bubble + wiggle schedule
  useEffect(() => {
    const bubbleTimer = setTimeout(() => setIsBubbleOpen(true), 1800);
    const wiggleTimer = setTimeout(() => {
      triggerWiggle();
      scheduleWiggle();
    }, 3000);
    return () => {
      clearTimeout(bubbleTimer);
      clearTimeout(wiggleTimer);
      if (wiggleIntervalRef.current) clearInterval(wiggleIntervalRef.current);
    };
  }, [triggerWiggle, scheduleWiggle]);

  // Mascot image animationend cleanup
  useEffect(() => {
    const img = mascotImgRef.current;
    if (!img) return;
    const onEnd = () => img.classList.remove("is-wiggling");
    img.addEventListener("animationend", onEnd, { passive: true });
    return () => img.removeEventListener("animationend", onEnd);
  }, []);

  const handleMascotClick = () => {
    setIsBubbleOpen((v) => !v);
    triggerWiggle();
    scheduleWiggle();
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer__grid">

            {/* Brand */}
            <div className="footer__brand">
              <Image
                src="/assets/img/logos/logo_rk_blanco.svg"
                alt="RK Solutions"
                width={160}
                height={41}
                className="footer__logo-img"
              />
              <p className="footer__tagline">El software que entiende tu negocio.</p>
              <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  className="footer__newsletter-input"
                  placeholder="Ingresa tu email y suscríbete a nuestro newsletter"
                  required
                />
                <button type="submit" className="footer__newsletter-btn">
                  Suscribirse
                </button>
              </form>
              <div className="footer__social">
                <a href="https://www.linkedin.com/company/rksolutions-es/" target="_blank" rel="noopener" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/rksolutions.es/" target="_blank" rel="noopener" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/solutions.es/" target="_blank" rel="noopener" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@rksolutions-es" target="_blank" rel="noopener" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Secciones rápidas */}
            <div className="footer__col">
              <h4 className="footer__col-title">Secciones rápidas</h4>
              <div className="footer__links">
                <a href="#la-manzana">La Manzana</a>
                <a href="#">Sobre Nosotros</a>
                <a href="#">Soluciones</a>
                <a href="#planes">Precios</a>
                <a href="#">Trabaja con Nosotros</a>
              </div>
            </div>

            {/* Política de Privacidad */}
            <div className="footer__col">
              <h4 className="footer__col-title">Política de Privacidad</h4>
              <div className="footer__links">
                <a href="#">Aviso legal</a>
                <a href="#">Política de cookies</a>
                <a href="#">Política de gestión</a>
                <a href="#">Política de privacidad</a>
                <a href="#">Cumple la normativa</a>
              </div>
            </div>

            {/* Contáctanos */}
            <div className="footer__col">
              <h4 className="footer__col-title">Contáctanos</h4>
              <div className="footer__links">
                <a href="tel:+34944050737">944 05 07 37</a>
                <a href="mailto:Ag@rksolutions.es">Ag@rksolutions.es</a>
                <a href="#">
                  Calle Bidecruceta 11,<br />
                  Oficina 301, 48510<br />
                  Derio-Lomo, Bizkaia
                </a>
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              &copy; {currentYear} RK Solutions. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        className={`back-to-top${isBackToTopVisible ? " visible" : ""}`}
        id="backToTop"
        aria-label="Volver arriba"
        onClick={scrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* Mascot Character Toggle */}
      <div className="mascot-toggle" id="mascotToggle">
        {/* Speech bubble */}
        <div
          className={`mascot-bubble${isBubbleOpen ? " is-open" : ""}`}
          id="mascotBubble"
          aria-live="polite"
        >
          <button
            className="mascot-bubble__close"
            id="mascotClose"
            aria-label="Cerrar mensaje"
            onClick={() => setIsBubbleOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <p className="mascot-bubble__text">
            <span className="mascot-bubble__text--green">La Manzana</span> lo hace por ti
          </p>
          <a href="#planes" className="mascot-bubble__cta" onClick={() => setIsBubbleOpen(false)}>
            Solicita tu Demo
          </a>
        </div>

        {/* Character button */}
        <button
          className="mascot-btn"
          id="mascotBtn"
          aria-label="Abrir mensaje del personaje"
          onClick={handleMascotClick}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={mascotImgRef}
            src="/assets/img/personaje_manzana.svg"
            alt="Personaje La Manzana"
            className="mascot-btn__img"
            width={44}
            height={44}
          />
        </button>
      </div>
    </>
  );
}
