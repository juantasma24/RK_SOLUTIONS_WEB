"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTOR_SRCS = [
  "/assets/img/fotos_sectores/img_autonomo.webp",
  "/assets/img/fotos_sectores/img_hosteleria.webp",
  "/assets/img/fotos_sectores/img_comercio.webp",
  "/assets/img/fotos_sectores/img_asesores.webp",
];

export default function SectoresSection() {
  const { lang }    = useLanguage();
  const t           = tr.sectores[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const prevRef    = useRef<HTMLButtonElement>(null);
  const nextRef    = useRef<HTMLButtonElement>(null);

  /* ── GSAP: fade-up cards + title/desc reveal ───────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gsapCtx = gsap.context(() => {
      /* Sector cards fade-up */
      const cards = section.querySelectorAll<HTMLElement>(".sector-card");
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            force3D: true,
            onComplete: () => gsap.set(batch, { clearProps: "transform" }),
          });
        },
      });

      if (!prefersReduced) {
        /* Title lines reveal */
        const titleLines = section.querySelectorAll<HTMLElement>(
          ".sectores__title-break, .sectores__brand"
        );
        const title = section.querySelector<HTMLElement>(".sectores__title");
        if (title && titleLines.length) {
          gsap.set(title, { opacity: 1 });
          gsap.set(titleLines, { opacity: 0, y: 50 });
          ScrollTrigger.create({
            trigger: title,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(titleLines, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.1,
                force3D: true,
              });
            },
          });
        }

        /* Description fade-up */
        const desc = section.querySelector<HTMLElement>(".sectores__desc");
        if (desc) {
          gsap.set(desc, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: desc,
            start: "top 88%",
            once: true,
            onEnter: () => {
              gsap.to(desc, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
            },
          });
        }
      }
    }, section);

    return () => gsapCtx.revert();
  }, []);

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
    <section className="sectores" id="autonomos" ref={sectionRef}>
      <div className="sectores__inner">

        <div className="sectores__header">
          <h2 className="sectores__title" style={{ opacity: 0 }}>
            <span className="sectores__title-break">{t.titleBreak1}</span>
            <span className="sectores__title-break">{t.titleBreak2}</span>
            <br className="sectores__title-br" />
            <span className="sectores__brand">{t.brand}</span>
          </h2>
          <p className="sectores__desc">{t.desc}</p>
        </div>

        <div className="sectores__grid" ref={gridRef}>
          {t.sectors.map(({ label, alt }, i) => (
            <a href="#" key={label} className="sector-card">
              <div className="sector-card__bg">
                <Image src={SECTOR_SRCS[i]} alt={alt} width={600} height={800} loading="lazy" />
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
            aria-label={t.prevLabel}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="sectores__nav-btn sectores__nav-btn--next"
            ref={nextRef}
            aria-label={t.nextLabel}
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
