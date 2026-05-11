"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Apple outline SVG paths (same as original)
const SVG_PATHS = [
  "M18.7,7.5c.1-.5.1-1.7,0-2.2s-.5-1.5-.8-1.9c-.4-.5-1.5-1.2-2.1-1.5-1.1-.6-4.5-1.5-4.5-1.5,0,0-.3,3.4-.1,4.4.1.7.6,1.9,1.1,2.4.3.4,1.1,1,1.5,1.2.4.3,1.5.6,2,.7.6.2,2.4.3,2.4.3h0s.4-1.4.5-1.9Z",
  "M17.4,28.6c-1.6,0-3-.1-4.2-.2-1.3-.2-2.3-.5-3.1-1-.8-.5-1.3-1.2-1.7-2-.3-.8-.5-2-.5-3.4s.2-2.5.5-3.4c.3-.8.9-1.5,1.7-2,.8-.4,1.8-.8,3.1-1,.6,0,1.2-.1,1.9-.2l2.5-4.7c-1-.4-5.3-2.2-7.1-1.8-2.3.5-4.2,1.8-5.6,3C2.1,14.4.5,17.5.5,22.1s1.4,7.9,4.3,10c1.9,1.4,5.2,2.8,8.4,2.9,1.6,0,4.4-.8,4.4-.8,0,0,1.1.3,2.4.5l-2.7-6.1h.1Z",
  "M30.8,12c-1.4-1.2-3.3-2.4-5.7-2.9-1.6-.3-5.3,1.1-6.7,1.7l-2.5,4.7h2c1.9,0,3.4,0,4.7.2,1.3.2,2.3.5,3.1,1s1.3,1.1,1.7,2c.3.8.5,2,.5,3.4s-.2,2.5-.5,3.4c-.3.8-.9,1.5-1.7,2-.8.5-1.8.8-3.1,1-1.2.2-2.6.2-4.4.2l2.8,6.2c.8,0,1.7.2,2.4.2,2.8-.2,5.8-1.6,7.5-2.9,2.9-2.1,4.3-5.4,4.3-10s-1.5-7.7-4.2-10l-.2-.2Z",
];

// Initial avatar IDs and cycling pools (matching original data-pool attributes)
const AVATAR_DATA: { initial: number; pool: number[] }[] = [
  { initial: 47, pool: [47, 12, 33, 56, 63] },
  { initial: 32, pool: [32, 5,  44, 19, 68] },
  { initial: 21, pool: [21, 8,  37, 52, 70] },
  { initial: 10, pool: [10, 25, 41, 60, 15] },
];

export default function HeroSection() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const heroRef     = useRef<HTMLElement>(null);
  const avatarsRef  = useRef<HTMLDivElement>(null);
  const actionsRef  = useRef<HTMLDivElement>(null);
  const lineRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const patternDone = useRef<() => void>(() => {});

  /* ── Canvas zigzag pattern ──────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero   = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GLOW      = "#5ea84a";
    const LERP      = 0.07;
    const BASE_ALPHA = 0.18;
    const BASE_CELL = 200;
    const BASE_W    = 1440;
    const STEP_MS   = 120;

    let W = 0, H = 0, CELL = 0, sX = 0, sY = 0, cols = 0, rows = 0;
    let targetCell: { c: number; r: number } | null = null;
    const alphas: Record<string, number> = {};
    let firstFrame = true;
    let sequence: { c: number; r: number }[] = [];
    let seqIdx   = 0;
    let stepTimer: ReturnType<typeof setTimeout> | null = null;
    let rafId:    number | null = null;
    let animDone  = false;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const makeSVG = (stroke: string, sw: string) =>
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.6 35.4">${
        SVG_PATHS.map(d => `<path fill="none" stroke="${stroke}" stroke-miterlimit="10" stroke-width="${sw}" d="${d}"/>`).join("")
      }</svg>`;

    const loadImg = (svg: string): Promise<HTMLImageElement> =>
      new Promise(res => {
        const img  = new Image();
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url  = URL.createObjectURL(blob);
        img.onload = () => { URL.revokeObjectURL(url); res(img); };
        img.src = url;
      });

    const buildSequence = () => {
      sequence = [];
      for (let r = 0; r < rows; r++) {
        const ltr = r % 2 === 0;
        for (let ci = 0; ci < cols; ci++) {
          const c = ltr ? ci : cols - 1 - ci;
          sequence.push({ c, r });
        }
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W    = hero.offsetWidth;
      H    = hero.offsetHeight;
      CELL = Math.min(200, Math.max(80, Math.round(BASE_CELL * (W / BASE_W))));
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sX   = ((W / 2 - CELL / 2) % CELL + CELL) % CELL - CELL;
      sY   = ((H / 2 - CELL / 2) % CELL + CELL) % CELL - CELL;
      cols = Math.ceil((W - sX) / CELL) + 1;
      rows = Math.ceil((H - sY) / CELL) + 1;
      buildSequence();
    };

    const scheduleNext = () => {
      if (stepTimer) clearTimeout(stepTimer);
      seqIdx++;
      if (seqIdx >= sequence.length) {
        targetCell = null;
        animDone   = true;
      } else {
        stepTimer = setTimeout(() => {
          targetCell = sequence[seqIdx];
          scheduleNext();
        }, STEP_MS);
      }
    };

    const draw = (imgW: HTMLImageElement, imgG: HTMLImageElement) => {
      let dirty = firstFrame;
      firstFrame = false;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const key = `${c},${r}`;
          const isTarget = targetCell?.c === c && targetCell?.r === r;
          const cur = alphas[key] || 0;
          const tgt = isTarget ? 1 : 0;
          if (Math.abs(cur - tgt) > 0.005) {
            alphas[key] = cur + (tgt - cur) * LERP;
            dirty = true;
          } else if (cur !== tgt) {
            alphas[key] = tgt;
            dirty = true;
          }
        }
      }

      if (dirty) {
        ctx.clearRect(0, 0, W, H);
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const key = `${c},${r}`;
            const t   = alphas[key] || 0;
            const x   = sX + c * CELL;
            const y   = sY + r * CELL;

            if (t < 0.01) {
              ctx.globalAlpha = BASE_ALPHA;
              ctx.filter = "none";
              ctx.drawImage(imgW, x, y, CELL, CELL);
            } else {
              ctx.globalAlpha = BASE_ALPHA * (1 - t);
              ctx.filter = "none";
              ctx.drawImage(imgW, x, y, CELL, CELL);
              const blur = t * 4;
              ctx.save();
              ctx.filter      = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
              ctx.shadowColor = GLOW;
              ctx.shadowBlur  = t * 24;
              ctx.globalAlpha = t * 0.45;
              ctx.drawImage(imgG, x, y, CELL, CELL);
              ctx.shadowBlur  = t * 50;
              ctx.globalAlpha = t * 0.125;
              ctx.drawImage(imgG, x, y, CELL, CELL);
              ctx.restore();
            }
          }
        }
        ctx.globalAlpha = 1;
        ctx.filter = "none";
      }

      if (dirty || targetCell !== null) {
        rafId = requestAnimationFrame(() => draw(imgW, imgG));
      } else {
        rafId = null;
      }
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Promise.all([
      loadImg(makeSVG("#ffffff", ".2")),
      loadImg(makeSVG("#5ea84a", ".8")),
    ]).then(([imgW, imgG]) => {
      resize();

      if (prefersReduced) {
        ctx.globalAlpha = BASE_ALPHA;
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++)
            ctx.drawImage(imgW, sX + c * CELL, sY + r * CELL, CELL, CELL);
        ctx.globalAlpha = 1;
        return;
      }

      targetCell = sequence[0];
      seqIdx     = 0;
      scheduleNext();

      const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          resize();
          firstFrame = true;
          if (!animDone) {
            if (stepTimer) clearTimeout(stepTimer);
            seqIdx     = 0;
            targetCell = sequence[0];
            scheduleNext();
          }
          if (!rafId) rafId = requestAnimationFrame(() => draw(imgW, imgG));
        }, 150);
      };

      window.addEventListener("resize", onResize);
      rafId = requestAnimationFrame(() => draw(imgW, imgG));

      patternDone.current = () => {
        window.removeEventListener("resize", onResize);
      };
    });

    return () => {
      patternDone.current();
      if (stepTimer)  clearTimeout(stepTimer);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (rafId)      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── GSAP title + actions ───────────────────────────────── */
  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!lines.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      lines.forEach(l => (l.style.opacity = "1"));
      if (actionsRef.current) actionsRef.current.style.opacity = "1";
      return;
    }

    const allWords: HTMLSpanElement[] = [];
    lines.forEach(line => {
      line.style.opacity = "1";
      const words = (line.textContent || "").trim().split(/\s+/);
      line.innerHTML = words
        .map(w => `<span class="hero__word" style="display:inline-block">${w}</span>`)
        .join(" ");
      line.querySelectorAll<HTMLSpanElement>(".hero__word").forEach(w => allWords.push(w));
    });

    const ctx = gsap.context(() => {
      gsap.from(allWords, {
        y: -100,
        opacity: 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rotation: "random(-80, 80)" as any,
        duration: 0.7,
        ease: "back",
        stagger: 0.1,
        delay: 0.3,
      });

      if (actionsRef.current) {
        gsap.fromTo(
          actionsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 1.5 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  /* ── Avatar cycling ─────────────────────────────────────── */
  useEffect(() => {
    const container = avatarsRef.current;
    if (!container) return;

    const avatarEls = Array.from(
      container.querySelectorAll<HTMLDivElement>(".hero__avatar")
    );
    const timers:    ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    let heroVisible = true;
    let observer: IntersectionObserver | null = null;
    if (heroRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => { heroVisible = entry.isIntersecting; },
        { threshold: 0 }
      );
      observer.observe(heroRef.current);
    }

    avatarEls.forEach((avatar, i) => {
      const { pool } = AVATAR_DATA[i];
      const imgs = avatar.querySelectorAll<HTMLImageElement>("img");
      let idx = 0;
      let showingFront = true;

      function cycle() {
        if (!heroVisible) return;
        idx = (idx + 1) % pool.length;
        const next = new window.Image();
        next.onload = () => {
          if (showingFront) {
            imgs[1].src = next.src;
            imgs[0].style.opacity = "0";
            imgs[1].style.opacity = "1";
          } else {
            imgs[0].src = next.src;
            imgs[1].style.opacity = "0";
            imgs[0].style.opacity = "1";
          }
          showingFront = !showingFront;
        };
        next.src = `https://i.pravatar.cc/48?img=${pool[idx]}`;
      }

      const t = setTimeout(() => {
        cycle();
        intervals.push(setInterval(cycle, 3500));
      }, 2000 + i * 800);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      observer?.disconnect();
    };
  }, []);

  return (
    <section className="hero" id="inicio" ref={heroRef}>
      <canvas
        id="hero-pattern-canvas"
        className="hero__pattern"
        ref={canvasRef}
        aria-hidden="true"
      />

      <div className="container hero__container">
        <h1 className="hero__title">
          <span
            className="hero__title-line hero__title-line--1"
            ref={el => { lineRefs.current[0] = el; }}
          >
            La Manzana,
          </span>
          <span
            className="hero__title-line hero__title-line--3"
            ref={el => { lineRefs.current[1] = el; }}
          >
            el software
          </span>
          <span
            className="hero__title-line hero__title-line--4"
            ref={el => { lineRefs.current[2] = el; }}
          >
            que entiende
          </span>
          <span
            className="hero__title-line hero__title-line--5"
            ref={el => { lineRefs.current[3] = el; }}
          >
            tu negocio.
          </span>
        </h1>

        <div className="hero__actions" ref={actionsRef}>
          <div className="hero__social-proof">
            <div className="hero__avatars" ref={avatarsRef}>
              {AVATAR_DATA.map(({ initial }, i) => (
                <div key={i} className="hero__avatar">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.pravatar.cc/48?img=${initial}`}
                    alt=""
                    width="38"
                    height="38"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.pravatar.cc/48?img=${initial}`}
                    alt=""
                    width="38"
                    height="38"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
            <p className="hero__social-text">
              <strong>+3.000</strong> usuarios<br />eligen La Manzana
            </p>
          </div>

          <a href="#que-hace" className="hero__cta" id="heroCtaBtn">
            <span>Descubre más</span>
          </a>
        </div>
      </div>
    </section>
  );
}
