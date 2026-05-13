"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const YT_SRC =
  "https://www.youtube.com/embed/ZVm05C_6VOs?autoplay=1&mute=1&loop=1&playlist=ZVm05C_6VOs&controls=0&playsinline=1&enablejsapi=1&disablekb=1&modestbranding=1&rel=0&iv_load_policy=3";

export default function QueHaceSection() {
  const { lang }    = useLanguage();
  const t           = tr.queHace[lang];
  const sectionRef  = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const arrowRef    = useRef<HTMLAnchorElement>(null);

  /* ── YouTube: inject immediately so it initialises while the user
       reads the hero — fully loaded before reaching TpvSection.
       IntersectionObserver only controls play/pause. ─────────── */
  useEffect(() => {
    const wrap = videoWrapRef.current;
    if (!wrap) return;

    const iframe = document.createElement("iframe");
    iframe.src = YT_SRC;
    iframe.setAttribute("allow", "autoplay; encrypted-media");
    iframe.allowFullscreen = true;
    wrap.appendChild(iframe);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!iframe.contentWindow) return;
        const cmd = entry.isIntersecting ? "playVideo" : "pauseVideo";
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: cmd, args: [] }),
          "*"
        );
      },
      { threshold: 0.7 }
    );

    obs.observe(wrap);
    return () => {
      obs.disconnect();
      iframe.remove();
    };
  }, []);

  /* ── GSAP ScrollTrigger clip-path ──────────────────────────── */
  useEffect(() => {
    const wrap    = videoWrapRef.current;
    const section = sectionRef.current;
    if (!wrap || !section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.style.clipPath = "none";
      return;
    }

    const gsapCtx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { clipPath: "inset(62% 12% 0% 12% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end:   "top 25%",
            scrub: 1.5,
          },
        }
      );
    });

    return () => gsapCtx.revert();
  }, []);

  /* ── Arrow hides when next section enters ──────────────────── */
  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;

    const next = document.getElementById("autonomos");
    if (!next) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        arrow.classList.toggle("is-hidden", entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    obs.observe(next);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="que-hace section" id="que-hace" ref={sectionRef}>
      <div className="container que-hace__container">
        <h2 className="que-hace__title">
          {t.titleParts.map((part, i) => (
            <React.Fragment key={i}>
              <span className="title-part">{part}</span>
              {i < t.titleParts.length - 1 && " "}
            </React.Fragment>
          ))}
        </h2>

        <div className="que-hace__video-wrap" ref={videoWrapRef} />

        <ul className="que-hace__features">
          {t.features.map(({ strong, rest }) => (
            <li key={strong}>
              <span className="que-hace__check">
                <Image src="/assets/img/check.svg" alt="✓" width={20} height={20} />
              </span>
              <span><strong>{strong}</strong>{rest}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#autonomos"
        className="que-hace__arrow"
        ref={arrowRef}
        aria-label={t.ariaNext}
      >
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
