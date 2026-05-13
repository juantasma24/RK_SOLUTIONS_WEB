"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FaqSection() {
  const { lang }   = useLanguage();
  const t          = tr.faq[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  /* GSAP: fade-up title + faq items */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsapCtx = gsap.context(() => {
      const items = section.querySelectorAll<HTMLElement>(".faq-item");
      gsap.set(items, { opacity: 0, y: 40 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            stagger: 0.1, force3D: true,
            onComplete: () => gsap.set(batch, { clearProps: "transform" }),
          });
        },
      });

      const title = section.querySelector<HTMLElement>(".faq__title");
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

  const toggle = (idx: number) =>
    setOpenIdx(prev => prev === idx ? null : idx);

  return (
    <section className="faq section" id="faq" ref={sectionRef}>
      <div className="faq__ilustracion faq__ilustracion--izq" aria-hidden="true">
        <Image src="/assets/img/ilustraciones/personaje_faq01.svg" alt="" width={320} height={456} loading="lazy" />
      </div>
      <div className="faq__ilustracion faq__ilustracion--der" aria-hidden="true">
        <Image src="/assets/img/ilustraciones/personaje_faq02.svg" alt="" width={353} height={353} loading="lazy" />
      </div>

      <div className="container">
        <div className="faq__header">
          <h2 className="faq__title" style={{ opacity: 0 }}>{t.title}</h2>
        </div>

        <div className="faq__grid">
          {t.items.map(({ q, a }, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="faq-item">
                <button
                  className="faq-item__question"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                >
                  <span className="faq-item__text">{q}</span>
                  <span className="faq-item__plus">+</span>
                </button>
                <div className={`faq-item__answer${isOpen ? " is-open" : ""}`}>
                  <div className="faq-item__answer-inner">
                    <div className="faq-item__answer-body">{a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
