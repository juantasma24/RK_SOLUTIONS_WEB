"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PILARES = [
  { src: "/assets/img/laptop.svg",      alt: "Fácil de usar",    label: "Fácil de usar" },
  { src: "/assets/img/call.svg",         alt: "Soporte humano",   label: <>Soporte<br />humano 24/7</> },
  { src: "/assets/img/house.svg",        alt: "Se adapta",        label: <>Se adapta a<br />tu negocio</> },
  { src: "/assets/img/check_verde.svg",  alt: "Cumple",           label: <>Cumple <br className="br--desktop" />la <br className="br--mobile" />normativa</> },
];

const COUNTERS = [
  { prefix: "+", target: 3,  suffix: "K", label: "Manzanas" },
  { prefix: "+", target: 11, suffix: "K", label: "Clientes"  },
  { prefix: "+", target: 7,  suffix: "",  label: "Oficinas"  },
  { prefix: "+", target: 20, suffix: "",  label: "Años"      },
];

export default function PilaresSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const reelRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  /* ── Counter slot-machine + batch fade-up ─────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const title   = titleRef.current;
    if (!section || !wrapper || !title) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gsapCtx = gsap.context(() => {
      /* Batch fade-up: pilar items + wrapper */
      const fadeEls = section.querySelectorAll<HTMLElement>(".pilar-item, .contadores__wrapper");
      gsap.set(fadeEls, { y: 40 });
      ScrollTrigger.batch(fadeEls, {
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
          });
        },
      });

      /* Title reveal */
      const wordEls = Array.from(title.querySelectorAll<HTMLElement>(".pilares__word"));
      ScrollTrigger.create({
        trigger: title,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.set(title, { opacity: 1 });
          if (!prefersReduced) {
            gsap.from(wordEls, {
              opacity: 0,
              y: 30,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
            });
          }
        },
      });

      /* Counter reels */
      if (!prefersReduced) {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 85%",
          once: true,
          onEnter: () => {
            reelRefs.current.forEach((reel, idx) => {
              if (!reel) return;
              const tgt = COUNTERS[idx].target;
              gsap.fromTo(
                reel,
                { y: "0em" },
                {
                  y: `-${tgt}em`,
                  duration: 1.6,
                  ease: "power3.out",
                  delay: 0.6 + idx * 0.15,
                  force3D: true,
                }
              );
            });
          },
        });
      }

      /* Glass shine toggle */
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 90%",
        end: "bottom top",
        onEnter:     () => wrapper.classList.add("shine-active"),
        onLeave:     () => wrapper.classList.remove("shine-active"),
        onEnterBack: () => wrapper.classList.add("shine-active"),
        onLeaveBack: () => wrapper.classList.remove("shine-active"),
      });
    }, section);

    return () => gsapCtx.revert();
  }, []);

  return (
    <section className="pilares section" id="la-manzana" ref={sectionRef}>
      <div className="container text-center">

        <h2 className="section-title" ref={titleRef}>
          <span className="pilares__word">¿Por</span>{" "}
          <span className="pilares__word">qué</span>{" "}
          <span className="pilares__word">elegir</span>{" "}
          <span className="pilares__word highlight">La</span>{" "}
          <span className="pilares__word highlight">Manzana?</span>
        </h2>

        <div className="pilares__grid">
          {PILARES.map(({ src, alt, label }) => (
            <div key={alt} className="pilar-item">
              <div className="pilar-item__icon">
                <Image src={src} alt={alt} width={72} height={72} />
              </div>
              <p className="pilar-item__label">{label}</p>
            </div>
          ))}
        </div>

        <div id="contadores" className="contadores__wrapper" ref={wrapperRef}>
          <div className="contadores__grid">
            {COUNTERS.map(({ prefix, target, suffix, label }, idx) => (
              <div key={label} className="contador-item">
                <div className="contador-card">
                  <div className="contador-card__number">
                    <span className="roll-1">
                      {prefix}
                      <span className="counter-reel-wrap">
                        <span
                          className="counter-reel"
                          ref={el => { reelRefs.current[idx] = el; }}
                          style={{ transform: `translateY(-${target}em)` }}
                        >
                          {Array.from({ length: target + 1 }, (_, i) => (
                            <span key={i} className="counter-reel__digit">{i}</span>
                          ))}
                        </span>
                      </span>
                      {suffix}
                    </span>
                    <span className="roll-2" aria-hidden="true">
                      {prefix}{target}{suffix}
                    </span>
                  </div>
                </div>
                <p className="contador-item__label">{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <a href="#testimonios" className="pilares__arrow" aria-label="Ir a la siguiente sección">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
