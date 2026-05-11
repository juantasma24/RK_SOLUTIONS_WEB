"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const FRAMES     = 270;
const LERP       = 0.10;
const FRAME_BASE = "/assets/img/frames_tpv/final_motion_tpv_";

const frameUrl = (i: number) =>
  FRAME_BASE + String(i).padStart(5, "0") + ".webp";

export default function TpvSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    const hint    = scrollHintRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const images: HTMLImageElement[] = new Array(FRAMES);
    let loadedCount = 0;
    let allReady    = false;
    let lastDrawn   = -1;
    let current     = 0;
    let target      = 0;
    let rafId: number | null = null;
    let inView      = false;
    let naturalW    = 0;
    let naturalH    = 0;
    let tpvTotal    = section.offsetHeight - window.innerHeight;
    let sectionTop  = window.scrollY + section.getBoundingClientRect().top;

    const getProgress = () => {
      const scrolled = window.scrollY - sectionTop;
      return Math.max(0, Math.min(1, scrolled / tpvTotal));
    };

    const setCanvasSize = () => {
      const portrait = window.innerHeight > window.innerWidth;
      let cw: number, ch: number;
      if (portrait && naturalW) {
        const sticky = section.querySelector<HTMLElement>(".tpv-seq__sticky");
        cw = sticky?.offsetWidth  || naturalW;
        ch = sticky?.offsetHeight || naturalH;
      } else {
        cw = naturalW;
        ch = naturalH;
      }
      if (!cw || !ch) return;
      canvas.width        = Math.round(cw * DPR);
      canvas.height       = Math.round(ch * DPR);
      canvas.style.width  = cw + "px";
      canvas.style.height = ch + "px";
      ctx.scale(DPR, DPR);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      lastDrawn = -1;
    };

    const drawFrame = (idx: number) => {
      if (idx === lastDrawn) return;
      const img = images[idx];
      if (!img?.complete || !img.naturalWidth) return;
      const cw = canvas.width / DPR;
      const ch = canvas.height / DPR;
      ctx.clearRect(0, 0, cw, ch);
      const portrait = window.innerHeight > window.innerWidth;
      if (portrait && naturalW) {
        const scale = Math.min(cw / naturalW, ch / naturalH) * 1.2;
        const dw = naturalW * scale;
        const dh = naturalH * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      } else {
        ctx.drawImage(img, 0, 0, naturalW, naturalH);
      }
      lastDrawn = idx;
    };

    const loop = () => {
      current += (target - current) * LERP;
      drawFrame(Math.round(current));
      if (inView) rafId = requestAnimationFrame(loop);
      else rafId = null;
    };

    const onScroll = () => {
      if (!allReady) return;
      target = getProgress() * (FRAMES - 1);
      if (hint) hint.classList.toggle("hidden", target > 50 / (FRAMES - 1) * (FRAMES - 1));
    };

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sectionTop = window.scrollY + section.getBoundingClientRect().top;
        tpvTotal   = section.offsetHeight - window.innerHeight;
        if (naturalW) { setCanvasSize(); drawFrame(Math.round(current)); }
      }, 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const viewObs = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && allReady && !rafId) rafId = requestAnimationFrame(loop);
    }, { threshold: 0 });
    viewObs.observe(section);

    const loadObs = new IntersectionObserver(([entry], obs) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      for (let i = 0; i < FRAMES; i++) {
        const img = new window.Image();
        const idx = i;
        img.onload = () => {
          loadedCount++;
          if (idx === 0) {
            naturalW = img.naturalWidth;
            naturalH = img.naturalHeight;
            setCanvasSize();
            drawFrame(0);
          }
          if (loadedCount === FRAMES) {
            allReady = true;
            current = target = getProgress() * (FRAMES - 1);
            drawFrame(Math.round(current));
            if (inView && !rafId) rafId = requestAnimationFrame(loop);
          }
        };
        img.src   = frameUrl(i);
        images[i] = img;
      }
    }, { rootMargin: "500px 0px 500px 0px", threshold: 0 });
    loadObs.observe(section);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      viewObs.disconnect();
      loadObs.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className="tpv-seq" id="tpv-seq" aria-hidden="true" ref={sectionRef}>
      <div className="tpv-seq__sticky">
        <canvas className="tpv-seq__canvas" ref={canvasRef} />
        <div className="tpv-scroll-hint" ref={scrollHintRef} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="7" y="2" width="10" height="16" rx="5" />
            <line x1="12" y1="6" x2="12" y2="9" />
          </svg>
          <span>Scroll</span>
        </div>
      </div>
      <div className="tpv-seq__mobile">
        <Image
          src="/assets/img/tpv_mobile/tpv_responsive.webp"
          alt=""
          width={600}
          height={600}
          loading="lazy"
        />
      </div>
    </section>
  );
}
