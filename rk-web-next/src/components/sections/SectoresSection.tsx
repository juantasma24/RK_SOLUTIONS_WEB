"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const SECTORS = [
  { src: "/assets/img/fotos_sectores/img_autonomo.webp",   label: "Autónomos",   alt: "Autónomos"   },
  { src: "/assets/img/fotos_sectores/img_hosteleria.webp", label: "Hostelería",  alt: "Hostelería"  },
  { src: "/assets/img/fotos_sectores/img_comercio.webp",   label: "Comercio",    alt: "Comercio"    },
  { src: "/assets/img/fotos_sectores/img_asesores.webp",   label: "Asesores",    alt: "Asesores"    },
];

export default function SectoresSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  /* ── Mobile carousel navigation ───────────────────────────── */
  useEffect(() => {
    const grid = gridRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!grid || !prev || !next) return;

    const getCardWidth = () => {
      const card = grid.querySelector<HTMLElement>(".sector-card");
      if (!card) return grid.clientWidth;
      const gap = parseFloat(getComputedStyle(grid).gap) || 0;
      return card.offsetWidth + gap;
    };

    const updateButtons = () => {
      prev.disabled = grid.scrollLeft <= 1;
      next.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
    };

    const onPrev = () => grid.scrollBy({ left: -getCardWidth(), behavior: "smooth" });
    const onNext = () => grid.scrollBy({ left: getCardWidth(),  behavior: "smooth" });

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    grid.addEventListener("scroll", updateButtons, { passive: true });

    const ro = new ResizeObserver(updateButtons);
    ro.observe(grid);
    updateButtons();

    return () => {
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      grid.removeEventListener("scroll", updateButtons);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="sectores" id="autonomos">
      <div className="sectores__inner">

        <div className="sectores__header">
          <h2 className="sectores__title">
            <span className="sectores__title-break">Control de venta y clientes,</span>
            <span className="sectores__title-break"> todo conectado.</span>
            <br className="sectores__title-br" />
            <span className="sectores__brand">That&apos;s La Manzana</span>
          </h2>
          <p className="sectores__desc">
            El software de gestión para facturar, controlar, fichar y cumplir.
          </p>
        </div>

        <div className="sectores__grid" ref={gridRef}>
          {SECTORS.map(({ src, label, alt }) => (
            <a href="#" key={label} className="sector-card">
              <div className="sector-card__bg">
                <Image src={src} alt={alt} width={600} height={800} loading="lazy" />
              </div>
              <div className="sector-card__content">
                <span className="sector-card__label">{label}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="sectores__nav" id="sectoresNav">
          <button
            className="sectores__nav-btn sectores__nav-btn--prev"
            ref={prevRef}
            aria-label="Card anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="sectores__nav-btn sectores__nav-btn--next"
            ref={nextRef}
            aria-label="Card siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
