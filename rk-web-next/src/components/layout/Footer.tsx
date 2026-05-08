import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5" id="footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Image src="/assets/img/logos/logo_rk_blanco.svg" alt="RK Solutions" width={160} height={40} className="h-10 w-auto" />
            <p className="text-white/60 text-sm">El software que entiende tu negocio.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Ingresa tu email y suscríbete" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                required 
              />
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                Suscribirse
              </button>
            </form>
            <div className="flex items-center gap-4">
              {/* Social icons */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Secciones rápidas */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-lg text-white">Secciones rápidas</h4>
            <div className="flex flex-col gap-3 text-white/60 text-sm">
              <Link href="#la-manzana" className="hover:text-primary transition-colors">La Manzana</Link>
              <Link href="#" className="hover:text-primary transition-colors">Sobre Nosotros</Link>
              <Link href="#" className="hover:text-primary transition-colors">Soluciones</Link>
              <Link href="#planes" className="hover:text-primary transition-colors">Precios</Link>
              <Link href="#" className="hover:text-primary transition-colors">Trabaja con Nosotros</Link>
            </div>
          </div>

          {/* Política de Privacidad */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-lg text-white">Política de Privacidad</h4>
            <div className="flex flex-col gap-3 text-white/60 text-sm">
              <Link href="#" className="hover:text-primary transition-colors">Aviso legal</Link>
              <Link href="#" className="hover:text-primary transition-colors">Política de cookies</Link>
              <Link href="#" className="hover:text-primary transition-colors">Política de gestión</Link>
              <Link href="#" className="hover:text-primary transition-colors">Política de privacidad</Link>
              <Link href="#" className="hover:text-primary transition-colors">Cumple la normativa</Link>
            </div>
          </div>

          {/* Contáctanos */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-lg text-white">Contáctanos</h4>
            <div className="flex flex-col gap-4 text-white/60 text-sm">
              <a href="tel:+34944050737" className="hover:text-primary transition-colors flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                944 05 07 37
              </a>
              <a href="mailto:Ag@rksolutions.es" className="hover:text-primary transition-colors flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Ag@rksolutions.es
              </a>
              <div className="flex gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Calle Bidecruceta 11, Oficina 301, 48510 Derio-Lomo, Bizkaia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs italic">&copy; {currentYear} RK Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
