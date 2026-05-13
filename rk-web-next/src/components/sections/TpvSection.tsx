"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const FRAMES      = 270;
const LERP        = 0.10;
const CONCURRENCY = 8;
const FRAME_BASE  = "/assets/img/frames_tpv/final_motion_tpv_";

const frameUrl = (i: number) =>
  FRAME_BASE + String(i).padStart(5, "0") + ".webp";

export default function TpvSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    const hint    = scrollHintRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = 1;

    /* HTMLImageElement: browser manages GPU texture lifecycle lazily.
       No upfront GPU upload burst — each frame uploads on first drawImage. */
    const frames: (HTMLImageElement | null)[] = new Array(FRAMES).fill(null);
    let loadedCount = 0;
    let lastDrawn   = -1;
    let current     = 0;
    let target      = 0;
    let rafId: number | null = null;
    let inView      = false;
    let naturalW    = 0;
    let naturalH    = 0;
    let destroyed   = false;
    let sectionTop  = window.scrollY + section.getBoundingClientRect().top;
    let tpvTotal    = section.offsetHeight - window.innerHeight;

    const getProgress = () => {
      const scrolled = window.scrollY - sectionTop;
      return Math.max(0, Math.min(1, scrolled / tpvTotal));
    };

    const setCanvasSize = (w: number, h: number) => {
      canvas.width        = w * DPR;
      canvas.height       = h * DPR;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      lastDrawn = -1;
    };

    const drawFrame = (idx: number) => {
      if (idx === lastDrawn) return;
      const img = frames[idx];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, naturalW * DPR, naturalH * DPR);
      lastDrawn = idx;
    };

    const loop = () => {
      current += (target - current) * LERP;
      drawFrame(Math.round(current));
      if (inView) rafId = requestAnimationFrame(loop);
      else rafId = null;
    };

    /* naturalW acts as "first frame ready" guard */
    const onScroll = () => {
      if (!naturalW) return;
      const progress = getProgress();
      target = progress * (FRAMES - 1);
      if (hint) hint.classList.toggle("hidden", progress > 0.18);
    };

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sectionTop = window.scrollY + section.getBoundingClientRect().top;
        tpvTotal   = section.offsetHeight - window.innerHeight;
        if (naturalW) { setCanvasSize(naturalW, naturalH); drawFrame(Math.round(current)); }
      }, 200);
    };

    const viewObs = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) {
        sectionTop = window.scrollY + section.getBoundingClientRect().top;
        tpvTotal   = section.offsetHeight - window.innerHeight;
        /* Restore canvas size if it was freed on exit */
        if (naturalW && canvas.width === 1) {
          setCanvasSize(naturalW, naturalH);
          drawFrame(Math.round(current));
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        if (naturalW && !rafId) rafId = requestAnimationFrame(loop);
      } else {
        window.removeEventListener("scroll", onScroll);
        /* Free the 1920×1080 GPU texture so the next section has VRAM headroom */
        canvas.width  = 1;
        canvas.height = 1;
        lastDrawn = -1;
      }
    }, { threshold: 0 });

    /* ── 8 sequential lanes starting immediately on mount ──
       Frames 0-7 load first, animation starts on frame 0.
       Browser queues the rest; onload callbacks arrive in trickle, not burst. */
    let nextToLoad = 0;

    const loadNext = () => {
      if (destroyed || nextToLoad >= FRAMES) return;
      const idx = nextToLoad++;
      const img = new window.Image();
      img.onload = () => {
        if (destroyed) return;
        frames[idx] = img;
        loadedCount++;

        if (idx === 0) {
          naturalW = img.naturalWidth;
          naturalH = img.naturalHeight;
          setCanvasSize(naturalW, naturalH);
          drawFrame(0);
          if (inView && !rafId) rafId = requestAnimationFrame(loop);
        }

        if (loadedCount === FRAMES) {
          current = target = getProgress() * (FRAMES - 1);
          drawFrame(Math.round(current));
          if (inView && !rafId) rafId = requestAnimationFrame(loop);
        }

        loadNext();
      };
      img.onerror = () => { if (!destroyed) loadNext(); };
      img.src = frameUrl(idx);
    };

    for (let i = 0; i < CONCURRENCY; i++) loadNext();

    viewObs.observe(section);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      destroyed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      viewObs.disconnect();
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
