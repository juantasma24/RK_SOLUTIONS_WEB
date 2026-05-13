"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PILAR_SRCS = [
  "/assets/img/laptop.svg",
  "/assets/img/call.svg",
  "/assets/img/house.svg",
  "/assets/img/check_verde.svg",
];

const COUNTER_NUMS = [
  { prefix: "+", target: 3,  suffix: "K" },
  { prefix: "+", target: 11, suffix: "K" },
  { prefix: "+", target: 7,  suffix: ""  },
  { prefix: "+", target: 20, suffix: ""  },
];

export default function PilaresSection() {
  const { lang }    = useLanguage();
  const t           = tr.pilares[lang];
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
      // Batch fade-up: pilar items + wrapper
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

      // Title reveal
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

      // Counter reels
      if (!prefersReduced) {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 85%",
          once: true,
          onEnter: () => {
            reelRefs.current.forEach((reel, idx) => {
              if (!reel) return;
              const tgt = COUNTER_NUMS[idx].target;
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

      // Glass shine toggle
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
  }, [lang]);

  return (
    <section className="pilares section" id="la-manzana" ref={sectionRef}>
      <div className="container text-center">

        <h2 className="section-title" ref={titleRef}>
          {t.words.map(({ w, highlight }, i) => (
            <React.Fragment key={i}>
              <span className={`pilares__word${highlight ? " highlight" : ""}`}>{w}</span>
              {i < t.words.length - 1 && " "}
            </React.Fragment>
          ))}
        </h2>

        <div className="pilares__grid">
          {t.pilares.map(({ alt, label, label2 }, i) => (
            <div key={alt} className="pilar-item">
              <div className="pilar-item__icon">
                <Image src={PILAR_SRCS[i]} alt={alt} width={72} height={72} />
              </div>
              <p className="pilar-item__label">
                {label}{label2 && <><br />{label2}</>}
              </p>
            </div>
          ))}
        </div>

        <div id="contadores" className="contadores__wrapper" ref={wrapperRef}>
          <div className="contadores__grid">
            {COUNTER_NUMS.map(({ prefix, target, suffix }, idx) => (
              <div key={idx} className="contador-item">
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
                <p className="contador-item__label">{t.counters[idx]}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <a href="#testimonios" className="pilares__arrow" aria-label={t.ariaNext}>
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
