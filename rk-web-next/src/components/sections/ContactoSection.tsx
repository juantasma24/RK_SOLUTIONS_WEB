"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "@/contexts/LanguageContext";
import { tr } from "@/lib/translations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COMUNIDADES = [
  { value: "andalucia",        label: "Andalucía" },
  { value: "aragon",           label: "Aragón" },
  { value: "asturias",         label: "Asturias" },
  { value: "baleares",         label: "Islas Baleares" },
  { value: "canarias",         label: "Canarias" },
  { value: "cantabria",        label: "Cantabria" },
  { value: "castilla-leon",    label: "Castilla y León" },
  { value: "castilla-mancha",  label: "Castilla-La Mancha" },
  { value: "cataluna",         label: "Cataluña" },
  { value: "ceuta",            label: "Ceuta" },
  { value: "extremadura",      label: "Extremadura" },
  { value: "galicia",          label: "Galicia" },
  { value: "madrid",           label: "Madrid" },
  { value: "melilla",          label: "Melilla" },
  { value: "murcia",           label: "Murcia" },
  { value: "navarra",          label: "Navarra" },
  { value: "pais-vasco",       label: "País Vasco" },
  { value: "rioja",            label: "La Rioja" },
  { value: "valencia",         label: "Comunidad Valenciana" },
];

export default function ContactoSection() {
  const { lang }    = useLanguage();
  const t           = tr.contacto[lang];
  const sectionRef  = useRef<HTMLElement>(null);
  const [isDropdownOpen, setIsDropdownOpen]   = useState(false);
  const [selectedComunidad, setSelectedComunidad] = useState("");
  const [selectedLabel, setSelectedLabel]     = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shineRef    = useRef<HTMLDivElement>(null);

  /* GSAP: fade-up left info + right form */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const gsapCtx = gsap.context(() => {
      const cols = section.querySelectorAll<HTMLElement>(
        ".contacto__info, .contacto__form-wrapper"
      );
      gsap.set(cols, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cols, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            stagger: 0.2, force3D: true,
            onComplete: () => gsap.set(batch, { clearProps: "transform" }),
          });
        },
      });
    }, section);

    return () => gsapCtx.revert();
  }, []);

  /* Close dropdown on outside click — listener only active while open */
  useEffect(() => {
    if (!isDropdownOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isDropdownOpen]);

  /* Glass shine toggle */
  useEffect(() => {
    const shine = shineRef.current;
    if (!shine) return;
    const obs = new IntersectionObserver(([entry]) => {
      shine.classList.toggle("shine-active", entry.isIntersecting);
    }, { threshold: 0.1 });
    obs.observe(shine);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name   = (form.elements.namedItem("name")    as HTMLInputElement).value.trim();
    const email  = (form.elements.namedItem("email")   as HTMLInputElement).value.trim();
    const privacy = (form.elements.namedItem("privacy") as HTMLInputElement).checked;

    if (!name || !email) { alert("Por favor, completa los campos obligatorios."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("Por favor, introduce un correo electrónico válido."); return; }
    if (!selectedComunidad) { alert("Por favor, selecciona tu comunidad autónoma."); return; }
    if (!privacy) { alert("Debes aceptar la política de privacidad."); return; }

    alert("¡Gracias! Tu mensaje ha sido enviado correctamente.");
    form.reset();
    setSelectedComunidad("");
    setSelectedLabel("");
  };

  return (
    <section className="contacto section" id="contacto" ref={sectionRef}>
      <div className="container">
        <div className="contacto__inner">

          {/* Left: info */}
          <div className="contacto__info">
            <h2 className="contacto__title">
              {t.title.before}<br />
              <span className="highlight">{t.title.highlight}</span>{t.title.sep}<br />
              {t.title.line3}<br />
              {t.title.line4}
            </h2>
            <p className="contacto__subtitle">{t.incluye}</p>
            <ul className="contacto__list">
              {t.items.map(item => (
                <li key={item}>
                  <Image src="/assets/img/check.svg" width={20} height={20} alt="" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="contacto__form-wrapper">
            <form className="contacto__form" id="contactForm" onSubmit={handleSubmit} noValidate>
              <div className="contacto__form-shine" ref={shineRef} aria-hidden="true" />
              <p className="contacto__form-intro">
                {t.formIntro}<strong>{t.formIntroStrong}</strong>
              </p>

              <div className="contacto__form-group">
                <input type="text" name="name" className="contacto__input" placeholder={t.placeholders.name} required />
              </div>

              <div className="contacto__form-row">
                <div className="contacto__form-group">
                  <input type="email" name="email" className="contacto__input" placeholder={t.placeholders.email} required />
                </div>
                <div className="contacto__form-group">
                  <input type="tel" name="phone" className="contacto__input" placeholder={t.placeholders.phone} />
                </div>
              </div>

              <div className="contacto__form-group">
                <div
                  className={`contacto__dropdown${isDropdownOpen ? " open" : ""}`}
                  ref={dropdownRef}
                >
                  <button
                    type="button"
                    className={`contacto__dropdown-btn${selectedComunidad ? " has-value" : ""}`}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    onClick={e => { e.stopPropagation(); setIsDropdownOpen(v => !v); }}
                  >
                    <span className="contacto__dropdown-label">
                      {selectedLabel || t.placeholders.comunidad}
                    </span>
                    <svg className="contacto__dropdown-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <div className="contacto__dropdown-menu" role="listbox">
                    {COMUNIDADES.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        className={`contacto__dropdown-option${selectedComunidad === value ? " selected" : ""}`}
                        onClick={() => {
                          setSelectedComunidad(value);
                          setSelectedLabel(label);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <input type="hidden" name="comunidad" value={selectedComunidad} />
                </div>
              </div>

              <div className="contacto__form-group contacto__form-check">
                <input type="checkbox" id="privacy" name="privacy" required />
                <label htmlFor="privacy">
                  {t.privacyPre}<a href="#">{t.privacyLink}</a>{t.privacyPost}
                </label>
              </div>

              <button type="submit" className="btn btn--primary btn--lg contacto__submit">
                {t.btn}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
