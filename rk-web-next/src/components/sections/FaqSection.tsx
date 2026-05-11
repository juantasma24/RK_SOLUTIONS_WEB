"use client";

import React, { useState } from "react";
import Image from "next/image";

const FAQS = [
  {
    q: "¿Qué es La Manzana y para qué sirve?",
    a: "La Manzana es un software de gestión integral que unifica facturación, fichajes, TPV y cumplimiento normativo (TicketBAI y VERI*FACTU) en una sola plataforma. Diseñado para autónomos, hostelería y comercio.",
  },
  {
    q: "¿Tengo un comercio, es para mí?",
    a: "Sí. La Manzana se adapta a cualquier tipo de comercio: retail, hostelería, servicios profesionales y más. Si necesitas gestionar ventas, fichajes o cumplir la normativa fiscal, es para ti.",
  },
  {
    q: "¿Puedo usar La Manzana desde cualquier dispositivo?",
    a: "Sí. Funciona desde ordenador, tablet y móvil. Accede a todos tus datos en tiempo real desde cualquier lugar con conexión a internet.",
  },
  {
    q: "¿Cumple con TicketBAI y VERI*FACTU?",
    a: "Sí, al 100%. La Manzana está homologada y actualizada para cumplir con TicketBAI (País Vasco) y VERI*FACTU (resto de España). Nos encargamos de las actualizaciones normativas.",
  },
  {
    q: "¿Es fácil de usar para alguien que no es técnico?",
    a: "Totalmente. Si sabes enviar un correo electrónico, sabes usar La Manzana. Además, incluimos formación completa y soporte humano 24/7 para cualquier duda.",
  },
  {
    q: "¿Puedo probar La Manzana antes de contratarla?",
    a: "Sí. Ofrecemos 12 meses sin coste para que pruebes todas las funcionalidades sin compromiso. Déjanos tus datos y te contactamos para empezar.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(prev => prev === idx ? null : idx);
  };

  return (
    <section className="faq section" id="faq">
      <div className="faq__ilustracion faq__ilustracion--izq" aria-hidden="true">
        <Image src="/assets/img/ilustraciones/personaje_faq01.svg" alt="" width={320} height={456} loading="lazy" />
      </div>
      <div className="faq__ilustracion faq__ilustracion--der" aria-hidden="true">
        <Image src="/assets/img/ilustraciones/personaje_faq02.svg" alt="" width={353} height={353} loading="lazy" />
      </div>

      <div className="container">
        <div className="faq__header">
          <h2 className="faq__title">Resolvemos tus dudas antes de empezar.</h2>
        </div>

        <div className="faq__grid">
          {FAQS.map(({ q, a }, idx) => {
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
                <div
                  className="faq-item__answer"
                  style={{ maxHeight: isOpen ? "500px" : "0" }}
                >
                  <div className="faq-item__answer-inner">{a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
