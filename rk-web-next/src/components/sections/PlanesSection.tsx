"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PlanesSection() {
  const { lang }   = useLanguage();
  const t          = tr.planes[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);

  /* GSAP: fade-up title + plan cards */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsapCtx = gsap.context(() => {
      const cards = section.querySelectorAll<HTMLElement>(".plan-card");
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            stagger: 0.2, force3D: true,
            onComplete: () => gsap.set(batch, { clearProps: "transform" }),
          });
        },
      });

      const title = section.querySelector<HTMLElement>(".planes__titulo");
      if (title) {
        gsap.set(title, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: title,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(title, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
          },
        });
      }
    }, section);

    return () => gsapCtx.revert();
  }, []);

  /* Glass shine toggle on visibility */
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const obs = new IntersectionObserver(([entry]) => {
      inner.classList.toggle("shine-active", entry.isIntersecting);
    }, { threshold: 0.1 });

    obs.observe(inner);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="planes section" id="planes" ref={sectionRef}>
      <div className="container">
        <div className="planes__layout">

          {/* Left column: text */}
          <div className="planes__texto">
            <h2 className="planes__titulo" style={{ opacity: 0 }}>
              {t.titulo.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {i === 1 ? <strong>{line}<br /></strong> : i === 2 ? <strong>{line}</strong> : <>{line}<br /></>}
                </React.Fragment>
              ))}
            </h2>
            <p className="planes__subtitulo">
              <strong>{t.subtitulo[0]}</strong>{t.subtitulo[1]}<strong>{t.subtitulo[2]}</strong>
            </p>
            <div className="planes__ilustracion" aria-hidden="true">
              <Image
                src="/assets/img/ilustraciones/personaje_cohete.svg"
                alt=""
                width={418}
                height={377}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right column: plan cards */}
          <div className="planes__grid">

            {/* Premium */}
            <div className="plan-card plan-card--premium">
              <div className="plan-card__badge">
                <Image src="/assets/img/medal.svg" alt="" width={52} height={52} aria-hidden="true" />
              </div>
              <div className="plan-card__inner" ref={innerRef}>
                <h3 className="plan-card__name">Premium</h3>
                <hr className="plan-card__divider" />
                <ul className="plan-card__features">
                  {t.premium.map(f => (
                    <li key={f}>
                      <Image src="/assets/img/check_verde.svg" width={24} height={24} alt="" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="btn btn--primary plan-card__btn">{t.btn}</a>
              </div>
            </div>

            {/* Standard */}
            <div className="plan-card plan-card--standard">
              <div className="plan-card__badge plan-card__badge--standard">
                <Image src="/assets/img/laptop.svg" alt="" width={52} height={52} aria-hidden="true" />
              </div>
              <h3 className="plan-card__name">Standard</h3>
              <hr className="plan-card__divider" />
              <ul className="plan-card__features">
                {t.standard.map(f => (
                  <li key={f}>
                    <Image src="/assets/img/check_verde.svg" width={24} height={24} alt="" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="btn plan-card__btn plan-card__btn--standard">{t.btn}</a>
            </div>

          </div>
        </div>
      </div>

      <a href="#contacto" className="planes__arrow" aria-label="Ir a la siguiente sección">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
