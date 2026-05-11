"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const PREMIUM_FEATURES = [
  "TPV",
  "Fichas de cliente",
  "Control y realización de facturas",
  "Economía: gastos, presupuestos, empleados, etc.",
  "Personalización de pestañas",
];

const STANDARD_FEATURES = [
  "TPV",
  "Fichas de cliente",
  "Control y realización de facturas",
  "Economía: gastos, presupuestos, empleados, etc.",
];

export default function PlanesSection() {
  const innerRef = useRef<HTMLDivElement>(null);

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
    <section className="planes section" id="planes">
      <div className="container">
        <div className="planes__layout">

          {/* Left column: text */}
          <div className="planes__texto">
            <h2 className="planes__titulo">
              Elige el plan<br />
              <strong>que se adapte<br />a tu negocio</strong>
            </h2>
            <p className="planes__subtitulo">
              <strong>VERI*FACTU</strong> llega y adaptarse a tiempo{" "}
              <strong>marca la diferencia.</strong>
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
                  {PREMIUM_FEATURES.map(f => (
                    <li key={f}>
                      <Image src="/assets/img/check_verde.svg" width={24} height={24} alt="" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="btn btn--primary plan-card__btn">Quiero este plan</a>
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
                {STANDARD_FEATURES.map(f => (
                  <li key={f}>
                    <Image src="/assets/img/check_verde.svg" width={24} height={24} alt="" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="btn plan-card__btn plan-card__btn--standard">Quiero este plan</a>
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
