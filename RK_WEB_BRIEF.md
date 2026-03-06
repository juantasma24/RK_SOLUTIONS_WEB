# RK Solutions - Brief de Rediseño Web

## 1) Contexto del proyecto
- Empresa: **RK Solutions**.
- Web actual: `https://www.rksolutions.es`.
- Stack actual del cliente: **WordPress + Elementor**.
- Objetivo de este trabajo: proponer una nueva Home más clara, moderna y orientada a conversión (leads/demo).

## 2) Diagnóstico de la web actual
### Problemas detectados
1. Navegación confusa (muchas opciones y subopciones).
2. La oferta principal (**La Manzana**) no queda suficientemente jerarquizada.
3. CTAs poco visibles o no ubicados estratégicamente.
4. Inconsistencia visual en colores/tipografía/componentes.
5. Versión móvil funcional, pero mejorable en claridad y accesibilidad.

## 3) Decisión técnica acordada
### ¿Se puede hacer sin PHP?
Sí. Para propuesta/demo se puede hacer en **HTML/CSS/JS**.

### ¿Por qué casi no se ve PHP en la web actual?
Porque en WordPress el PHP se ejecuta en servidor y al navegador llega HTML renderizado.

### Camino recomendado
1. Prototipo de propuesta en **HTML/CSS/JS**.
2. Si se aprueba, implementación en **WordPress + Elementor** para encajar con lo que ya tienen.
3. CSS global para mantener consistencia visual al migrar.

## 4) Objetivo de la nueva Home
- Objetivo principal: **captar solicitudes de demo**.
- Producto protagonista: **La Manzana**.
- Mensaje clave: simplificar facturación/fichajes y cumplimiento normativo con soporte cercano.

## 5) Arquitectura propuesta (navegación)
1. Inicio
2. La Manzana
3. Soluciones
4. Casos/Clientes
5. Contacto

Regla: mantener menú corto y jerarquía clara del producto principal.

## 6) Wireframe Home (sección por sección)
1. **Header sticky**
   - Logo + menú corto.
   - CTA fijo: `Solicitar demo gratis`.
2. **Hero (above the fold)**
   - H1 claro de valor.
   - Subtítulo enfocado en resultado/cumplimiento.
   - CTA primario + CTA secundario (`Ver demo rápida`).
   - Mockup de producto y microprueba social.
3. **Barra de confianza**
   - Logos y métricas clave.
4. **4 pilares de valor**
   - Fácil de usar, cumplimiento, soporte, plataforma unificada.
5. **Cómo funciona (3 pasos)**
   - Configuración, uso diario, cumplimiento automático.
6. **Módulos de La Manzana**
   - Facturación, fichajes, clientes, reportes, móvil.
7. **Testimonios / casos**
   - Evidencia social con resultados.
8. **FAQ breve (objeciones)**
   - Implantación, soporte, adaptación por sector, normativa.
9. **CTA final de cierre**
   - Mensaje fuerte + formulario/acción directa.
10. **Footer**
   - Navegación secundaria + legales + contacto.

## 7) Sistema de CTAs recomendado
- CTA principal unificado: `Solicitar demo gratis`.
- Ubicaciones mínimas: header, hero, mitad de página, cierre.
- CTA secundario para usuarios fríos: `Ver demo rápida (2 min)`.

## 8) Criterios de diseño
- Sistema visual consistente (tipografía, paleta, botones, espaciado).
- Jerarquía fuerte de contenidos (La Manzana primero).
- Diseño móvil primero: claridad, botones visibles y formulario corto.

## 9) KPIs de validación
1. CTR del CTA principal.
2. Tasa de envío del formulario demo.
3. Scroll hasta secciones de confianza/testimonios.
4. Rebote en móvil.
5. Tiempo hasta primer contacto comercial.

## 10) Plan de ejecución sugerido
1. Fase 1: Home nueva + navegación + CTAs.
2. Fase 2: página dedicada de La Manzana + casos.
3. Fase 3: ajustes SEO comercial + tracking de conversiones.
4. Fase 4: test A/B de hero y copys de CTA.

## 11) Prompt de continuidad para otro proyecto
Usar este texto en el nuevo chat/proyecto:

```text
Estamos rediseñando la web de RK Solutions.
Objetivo: mejorar conversión de leads y destacar La Manzana.
Tenemos definido diagnóstico, arquitectura y wireframe Home en RK_WEB_BRIEF.md.
Stack recomendado: prototipo en HTML/CSS/JS y migración final a WordPress+Elementor.
Continúa desde el brief y genera la siguiente pieza (copy, UI o implementación).
```
