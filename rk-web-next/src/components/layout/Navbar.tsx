"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";

// useLayoutEffect runs synchronously before browser paint (client only).
// useEffect is used as fallback for SSR to avoid hydration warnings.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;


const SOCIALS = [
  {
    href: "https://www.instagram.com/rksolutions.es/",
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    href: "https://www.linkedin.com/company/rksolutions-es/",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z",
  },
  {
    href: "https://www.youtube.com/@rksolutions-es",
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Navbar() {
  const { lang, setLang }  = useLanguage();
  const t                  = tr.navbar[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef       = useRef<HTMLDivElement>(null);
  const isLangOpenRef = useRef(false);

  useEffect(() => {
    isLangOpenRef.current = isLangOpen;
  }, [isLangOpen]);

  useIsomorphicLayoutEffect(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    // Remove pre-hydration CSS helpers, then re-enable transitions
    document.documentElement.classList.remove("is-at-top");
    document.documentElement.classList.remove("no-animate");

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrolled = window.scrollY > 60;
        setIsScrolled(scrolled);
        if (scrolled && isLangOpenRef.current) setIsLangOpen(false);
      });
    };

    const onBeforeUnload = () => {
      try { sessionStorage.setItem("rkSY", String(window.scrollY)); } catch (_) {}
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!isLangOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [isLangOpen]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isMenuOpen);
    return () => { document.body.classList.remove("no-scroll"); };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Topbar */}
      <div
        className={`topbar${isScrolled === false ? " topbar--visible" : ""}`}
      >
        <div className="topbar__inner">
          <div className="topbar__social">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <div
            className={`topbar__lang${isLangOpen ? " open" : ""}`}
            id="langDropdown"
            ref={langRef}
          >
            <button
              className="topbar__lang-btn"
              id="langToggle"
              onClick={(e) => { e.stopPropagation(); setIsLangOpen((v) => !v); }}
              aria-expanded={isLangOpen}
            >
              {t.idioma}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="topbar__lang-menu">
              <button className="topbar__lang-option" data-lang="eu" onClick={() => { setLang("eu"); setIsLangOpen(false); }}>
                {lang === "eu" && <span className="topbar__lang-check">✓</span>}
                {tr.navbar.es.euskera}
              </button>
              <button className="topbar__lang-option" data-lang="es" onClick={() => { setLang("es"); setIsLangOpen(false); }}>
                {lang === "es" && <span className="topbar__lang-check">✓</span>}
                {tr.navbar.es.castellano}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`header${isScrolled === false ? " header--at-top" : ""}`}
      >
        <div className="header__inner">

          {/* Logo */}
          <a href="#inicio" className="header__logo">
            <Image
              src="/assets/img/logos/logo_rk_blanco.svg"
              alt="RK Solutions"
              width={160}
              height={41}
              className="header__logo-img"
              priority
            />
          </a>

          {/* Nav izquierda */}
          <nav className="header__nav header__nav--left" id="navLeft">
            <ul>
              {t.left.map((item) => (
                <li key={item.label} className={'dropdown' in item ? "nav-dropdown-wrap" : undefined}>
                  {'dropdown' in item ? (
                    <>
                      <a href={item.href} className="nav-dropdown-trigger">
                        {item.label}
                      </a>
                      <div className="nav-dropdown">
                        {(item.dropdown as { label: string; href: string }[]).map(({ label, href }) => (
                          <a key={label} href={href} className="nav-dropdown-option">{label}</a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a href={item.href}>{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Isotipo centrado (position: absolute) */}
          <a href="#inicio" className="header__isotipo">
            <Image
              src="/assets/img/isotipo-manzana.svg"
              alt="La Manzana"
              width={80}
              height={80}
              className="header__isotipo-img"
              priority
            />
          </a>

          {/* Nav derecha */}
          <nav className="header__nav header__nav--right" id="navRight">
            <ul>
              {t.right.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            className={`header__mobile-toggle${isMenuOpen ? " active" : ""}`}
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu${isMenuOpen ? " active" : ""}`} id="mobileMenu">
        <ul>
          {t.mobile.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="mobile-link" onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
