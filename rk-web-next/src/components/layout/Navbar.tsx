"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[1002] h-[46px] bg-black border-b border-white/5 transition-transform duration-500 ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Social icons */}
          <div className="flex items-center gap-4 text-white/60">
            <a href="https://www.instagram.com/rksolutions.es/" target="_blank" rel="noopener" className="hover:text-primary transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/rksolutions-es/" target="_blank" rel="noopener" className="hover:text-primary transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
            </a>
            <a href="https://www.youtube.com/@rksolutions-es" target="_blank" rel="noopener" className="hover:text-primary transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
          {/* Right: language */}
          <div>
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              Idioma
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header 
        className={`fixed left-0 right-0 z-[1001] transition-all duration-500 bg-black/90 backdrop-blur-md ${
          isScrolled ? "top-0 h-[70px]" : "top-[46px] h-[80px]"
        }`}
      >
        <div className="container h-full relative grid grid-cols-[1fr_auto_1fr] md:grid-cols-[1fr_2fr_auto_2fr_1fr] items-center">
          {/* Logo */}
          <Link href="/" className="justify-self-start">
            <Image src="/assets/img/logos/logo_rk_blanco.svg" alt="RK Solutions" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {/* Navigation Left */}
          <nav className="hidden md:flex justify-self-center pr-12 lg:pr-20">
            <ul className="flex items-center gap-8 lg:gap-14">
              <li>
                <Link href="/la-manzana" className="text-sm font-medium hover:text-primary relative group py-1">
                  La Manzana
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-sm font-medium hover:text-primary relative group py-1">
                  Sobre Nosotros
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
              <li>
                <Link href="/soluciones" className="text-sm font-medium hover:text-primary relative group py-1">
                  Soluciones
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Isotipo Centro */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-1 md:relative md:left-auto md:translate-x-0 md:justify-self-center z-10">
            <Image 
              src="/assets/img/isotipo-manzana.svg" 
              alt="La Manzana" 
              width={80} 
              height={80} 
              className={`transition-transform duration-300 drop-shadow-lg hover:scale-110 ${isScrolled ? "h-14 w-auto" : "h-20 w-auto"}`}
            />
          </Link>

          {/* Navigation Right */}
          <nav className="hidden md:flex justify-self-start pl-10 lg:pl-20">
            <ul className="flex items-center gap-8 lg:gap-14">
              <li>
                <Link href="/prensa" className="text-sm font-medium hover:text-primary relative group py-1">
                  Prensa
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
              <li>
                <Link href="/trabaja-con-nosotros" className="text-sm font-medium hover:text-primary relative group py-1">
                  Trabaja con Nosotros
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-sm font-medium hover:text-primary relative group py-1">
                  Contacto
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden justify-self-end flex flex-col gap-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[999] bg-black/98 transition-all duration-500 flex flex-col items-center justify-center gap-6 ${
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
        <ul className="flex flex-col items-center gap-6">
          <li className={`transition-all duration-300 delay-150 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/" className="text-3xl font-heading font-bold hover:text-primary" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          </li>
          <li className={`transition-all duration-300 delay-200 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/la-manzana" className="text-3xl font-heading font-bold hover:text-primary" onClick={() => setIsMenuOpen(false)}>La Manzana</Link>
          </li>
          <li className={`transition-all duration-300 delay-250 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/sobre-nosotros" className="text-3xl font-heading font-bold hover:text-primary" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</Link>
          </li>
          <li className={`transition-all duration-300 delay-300 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/soluciones" className="text-3xl font-heading font-bold hover:text-primary" onClick={() => setIsMenuOpen(false)}>Soluciones</Link>
          </li>
          <li className={`transition-all duration-300 delay-350 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/prensa" className="text-3xl font-heading font-bold hover:text-primary" onClick={() => setIsMenuOpen(false)}>Prensa</Link>
          </li>
          <li className={`transition-all duration-300 delay-400 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/trabaja-con-nosotros" className="text-3xl font-heading font-bold hover:text-primary" onClick={() => setIsMenuOpen(false)}>Trabaja con Nosotros</Link>
          </li>
          <li className={`transition-all duration-300 delay-450 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="#contacto" className="text-3xl font-heading font-bold hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
