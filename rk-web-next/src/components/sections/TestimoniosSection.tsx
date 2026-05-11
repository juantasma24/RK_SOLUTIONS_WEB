"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const TESTIMONIOS = [
  { name: "Eukene Sanchez",  role: "Cliente", quote: '"Desde que uso La Manzana, mi negocio funciona como un reloj. La facturación es automática y el fichaje de empleados es súper sencillo. El soporte 24/7 me ha salvado varias veces."' },
  { name: "Pilar Marar",     role: "Cliente", quote: '"Autónoma desde hace 15 años, he probado muchos programas. La Manzana es el único que entiendo sin necesitar un máster. Cumple con TicketBAI y me quita un peso de encima."' },
  { name: "Sarahí Cabrera",  role: "Cliente", quote: '"Tenía 3 tiendas y cada una con su sistema. Ahora con La Manzana lo veo todo desde el móvil. Los reportes son claros y la formación que me dieron fue excelente."' },
  { name: "Carlos Mendoza",  role: "Cliente", quote: '"El mejor software que he usado en mis 10 años gestionando hoteles. La integración con los canales de reserva es perfecta y el soporte técnico responde en minutos."' },
  { name: "Laura Giménez",   role: "Cliente", quote: '"Como gestoría, necesitamos control total. La Manzana nos da reportes detallados de cada cliente y nos ahorra horas de trabajo administrativo."' },
  { name: "Roberto Díaz",    role: "Cliente", quote: '"La migración desde mi antiguo software fue gratuita y sin dolor. El equipo de La Manzana se encargó de todo. Llevo 2 años sin incidencias."' },
  { name: "Mónica Torres",   role: "Cliente", quote: '"Tengo una academia y el módulo de facturación me permite generar recibos automáticos para 200 alumnos. Un cambio radical en mi productividad."' },
  { name: "Javier Ruiz",     role: "Cliente", quote: '"Lo que más valoro es la tranquilidad de estar cumpliendo la normativa sin tener que preocuparme. La Manzana se actualiza sola y eso no tiene precio."' },
  { name: "Ana Belén López", role: "Cliente", quote: '"Mis camareros aprendieron a usar el TPV en una tarde. La interfaz es intuitiva y los clientes agradecen la rapidez en las cuentas."' },
];

const TRANSITION = "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

export default function TestimoniosSection() {
  const carouselRef    = useRef<HTMLDivElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);
  const indicatorsRef  = useRef<HTMLDivElement>(null);
  const prevRef        = useRef<HTMLButtonElement>(null);
  const nextRef        = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const carousel    = carouselRef.current;
    const track       = trackRef.current;
    const indicators  = indicatorsRef.current;
    const prevBtn     = prevRef.current;
    const nextBtn     = nextRef.current;
    if (!carousel || !track || !prevBtn || !nextBtn) return;

    const N = TESTIMONIOS.length;
    let currentIndex = N;
    let autoTimer: ReturnType<typeof setInterval> | null = null;
    let isPaused = false;
    let locked   = false;

    /* Clone slides for infinite loop */
    const originals = Array.from(track.querySelectorAll<HTMLElement>(".testimonio-slide"));
    originals.forEach(s => {
      const c = s.cloneNode(true) as HTMLElement;
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
    });
    originals.forEach(s => {
      const c = s.cloneNode(true) as HTMLElement;
      c.setAttribute("aria-hidden", "true");
      track.insertBefore(c, track.firstChild);
    });

    const vis = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768)  return 2;
      return 1;
    };

    const updateDots = () => {
      if (!indicators) return;
      const realIdx = ((currentIndex - N) % N + N) % N;
      const zone = Math.floor((realIdx / N) * 3);
      indicators.querySelectorAll(".testimonios__dot").forEach((d, i) => {
        d.classList.toggle("active", i === zone);
      });
    };

    const jumpTo = (idx: number) => {
      currentIndex = idx;
      track.style.transition = "none";
      track.style.transform  = `translateX(-${(currentIndex * 100) / vis()}%)`;
      requestAnimationFrame(() => { track.style.transition = TRANSITION; });
    };

    const moveTo = (idx: number) => {
      currentIndex = idx;
      track.style.willChange = "transform";
      track.style.transition = TRANSITION;
      track.style.transform  = `translateX(-${(currentIndex * 100) / vis()}%)`;
      updateDots();
    };

    const next = () => {
      if (locked) return;
      locked = true;
      moveTo(currentIndex + 1);
    };

    const prev = () => {
      if (locked) return;
      locked = true;
      moveTo(currentIndex - 1);
    };

    const startTimer = () => { autoTimer = setInterval(() => { if (!isPaused) next(); }, 5000); };
    const resetTimer = () => { if (autoTimer) clearInterval(autoTimer); startTimer(); };

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      locked = false;
      if (currentIndex >= N * 2)      jumpTo(currentIndex - N);
      else if (currentIndex < N)      jumpTo(currentIndex + N);
      track.style.willChange = "auto";
      updateDots();
    };

    const onMouseEnter = () => { isPaused = true;  };
    const onMouseLeave = () => { isPaused = false; };

    let touchX = 0;
    const onTouchStart = (e: TouchEvent) => { touchX = e.changedTouches[0].screenX; };
    const onTouchEnd   = (e: TouchEvent) => {
      const diff = touchX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetTimer(); }
    };

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        track.style.transition = "none";
        track.style.transform  = `translateX(-${(currentIndex * 100) / vis()}%)`;
        requestAnimationFrame(() => { track.style.transition = TRANSITION; });
      }, 250);
    };

    /* Generate 3 dots */
    if (indicators) {
      indicators.innerHTML = "";
      for (let i = 0; i < 3; i++) {
        const d = document.createElement("span");
        d.className = `testimonios__dot${i === 0 ? " active" : ""}`;
        d.setAttribute("aria-hidden", "true");
        indicators.appendChild(d);
      }
    }

    /* Visibility observer for auto-timer */
    const visObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!autoTimer) startTimer(); }
      else { if (autoTimer) clearInterval(autoTimer); autoTimer = null; }
    }, { threshold: 0.1 });
    visObs.observe(carousel);

    const onNext = () => { next(); resetTimer(); };
    const onPrev = () => { prev(); resetTimer(); };

    track.addEventListener("transitionend", onTransitionEnd);
    nextBtn.addEventListener("click", onNext);
    prevBtn.addEventListener("click", onPrev);
    carousel.addEventListener("mouseenter", onMouseEnter);
    carousel.addEventListener("mouseleave", onMouseLeave);
    carousel.addEventListener("touchstart", onTouchStart, { passive: true });
    carousel.addEventListener("touchend",   onTouchEnd,   { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    jumpTo(N);
    updateDots();

    return () => {
      if (autoTimer) clearInterval(autoTimer);
      if (resizeTimer) clearTimeout(resizeTimer);
      track.removeEventListener("transitionend", onTransitionEnd);
      nextBtn.removeEventListener("click", onNext);
      prevBtn.removeEventListener("click", onPrev);
      carousel.removeEventListener("mouseenter", onMouseEnter);
      carousel.removeEventListener("mouseleave", onMouseLeave);
      carousel.removeEventListener("touchstart", onTouchStart);
      carousel.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize", onResize);
      visObs.disconnect();
    };
  }, []);

  return (
    <section className="testimonios section" id="testimonios">
      <div className="container">
        <h2 className="section-title text-center">
          Lo que dicen <span className="highlight">nuestros clientes</span>
        </h2>

        <div className="testimonios__carousel" id="testimoniosCarousel" ref={carouselRef}>
          <button
            className="testimonios__nav testimonios__nav--prev"
            ref={prevRef}
            aria-label="Testimonio anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="testimonios__track-wrapper">
            <div className="testimonios__track" ref={trackRef}>
              {TESTIMONIOS.map(({ name, role, quote }) => (
                <div key={name} className="testimonio-slide">
                  <div className="testimonio-card">
                    <div className="testimonio-card__bubble">
                      <Image
                        src="/assets/img/comillas.svg"
                        alt=""
                        width={60}
                        height={60}
                        className="testimonio-card__comillas"
                        aria-hidden="true"
                      />
                      <p className="testimonio-card__quote">{quote}</p>
                    </div>
                    <div className="testimonio-card__author">
                      <div className="testimonio-card__avatar">
                        <Image
                          src="/assets/img/isotipo-manzana.svg"
                          alt={name}
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <div className="testimonio-card__name">{name}</div>
                        <div className="testimonio-card__role">{role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="testimonios__nav testimonios__nav--next"
            ref={nextRef}
            aria-label="Testimonio siguiente"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="testimonios__indicators" ref={indicatorsRef} />
      </div>
    </section>
  );
}
