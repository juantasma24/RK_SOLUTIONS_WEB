"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  const [isDropdownOpen, setIsDropdownOpen]   = useState(false);
  const [selectedComunidad, setSelectedComunidad] = useState("");
  const [selectedLabel, setSelectedLabel]     = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shineRef    = useRef<HTMLDivElement>(null);

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
    <section className="contacto section" id="contacto">
      <div className="container">
        <div className="contacto__inner">

          {/* Left: info */}
          <div className="contacto__info">
            <h2 className="contacto__title">
              Trabaja con<br />
              <span className="highlight">La Manzana</span>,<br />
              sin coste<br />
              por 12 meses
            </h2>
            <p className="contacto__subtitle">INCLUYE:</p>
            <ul className="contacto__list">
              {[
                "Software La Manzana",
                "Soporte técnico 24/7",
                "Acompañamiento y formación",
                "Fichaje horario integrado",
              ].map(item => (
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
                Déjanos tus datos y te contamos cómo empezar con La Manzana{" "}
                <strong>sin coste el primer año.</strong>
              </p>

              <div className="contacto__form-group">
                <input type="text" name="name" className="contacto__input" placeholder="Nombre y apellido" required />
              </div>

              <div className="contacto__form-row">
                <div className="contacto__form-group">
                  <input type="email" name="email" className="contacto__input" placeholder="Correo electrónico" required />
                </div>
                <div className="contacto__form-group">
                  <input type="tel" name="phone" className="contacto__input" placeholder="Móvil" />
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
                      {selectedLabel || "Comunidad autónoma"}
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
                  He Leído y Acepto la <a href="#">Política de Privacidad</a>.
                </label>
              </div>

              <button type="submit" className="btn btn--primary btn--lg contacto__submit">
                Quiero saber más
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
