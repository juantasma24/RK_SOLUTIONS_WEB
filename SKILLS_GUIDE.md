# RK Solutions - Custom Skills Guide

Este documento describe los skills personalizados creados para el proyecto de rediseño web de RK Solutions.

## Skills Disponibles

### 1. **Frontend Design Skill**
**Archivo**: `.claude/frontend-design-SKILL.md`

**Descripción**: Diseño e implementación de UI/UX responsiva para RK Solutions.

**Cuándo usar**:
- Crear componentes (hero, cards, navegación, formularios)
- Diseñar estilos CSS manteniendo consistencia visual
- Optimizar layouts para móvil/tablet/desktop
- Construir elementos interactivos (CTAs, carruseles, FAQs)
- Asegurar accesibilidad (WCAG 2.1 AA)

**Recursos incluidos**:
- Design system guidelines (colores, tipografía, spacing)
- Procedimiento paso a paso
- Patrones comunes (imágenes responsivas, menú móvil, grid)
- Checklist de calidad

---

### 2. **Backend Design Skill**
**Archivo**: `.claude/backend-design-SKILL.md`

**Descripción**: Arquitectura backend, lógica PHP, APIs y manejo de datos.

**Cuándo usar**:
- Crear handlers para formularios (demo requests, contacto)
- Diseñar endpoints API
- Implementar autenticación/autorización
- Gestionar consultas a base de datos
- Integrar servicios externos (CRM, email)

**Recursos incluidos**:
- Guía de organización de archivos
- Estándares PHP (PSR-12, seguridad)
- Diseño de bases de datos
- Procedimiento paso a paso
- Plantillas de código (handlers, conexión DB, API responses)
- Checklist de calidad

---

### 3. **UI/UX Pro Max Skill** ⭐
**Archivo**: `.claude/ui-ux-pro-max-SKILL.md`

**Descripción**: Generador inteligente de sistemas de diseño profesionales con colores, tipografía, patrones y componentes.

**Cuándo usar**:
- Iniciar proyecto: generar sistema de diseño completo
- Nueva sección: definir diseño para hero, testimonios, FAQ
- Componentes: guía específica para buttons, cards, formularios
- Verificación: asegurar consistencia visual del proyecto
- Accesibilidad: validar WCAG 2.1 AA compliance
- Mejora de marca: evolucionar diseño según proyecto madura

**Recursos incluidos**:
- Paleta de colores profesional (primario, secundario, estados)
- Sistema tipográfico (headlines, body, escalas)
- Patrones de UI (layout, conversion path)
- Componentes prediseñados (buttons, cards, forms, nav)
- Anti-patrones (qué NO hacer)
- Checklist de pre-entrega (15 items)
- Responsive breakpoints (375px, 768px, 1024px, 1440px)

---

## Cómo Invocar los Skills

### Opción 1: Comando `/skills` (en terminal)
```bash
/skills
```
Luego selecciona `frontend-design` o `backend-design` de la lista.

### Opción 2: Mención directa en chat
Simplemente menciona el skill en tu pregunta:
- "Usa el **frontend-design skill** para crear el hero section"
- "Implementa esto usando el **backend-design skill**"

### Opción 3: Slash commands
Después de cargar el skill, puedes escribir:
```
/frontend-design [descripción de tarea]
/backend-design [descripción de tarea]
```

---

## Flujo de Trabajo Recomendado

### Para Frontend:
1. **Planificar** → Lee la sección correspondiente en RK_WEB_BRIEF.md
2. **Estructurar** → Define HTML semántico con naming BEM
3. **Diseñar** → Aplica design system (colores, spacing, tipografía)
4. **Implementar** → Responsive layout (mobile-first)
5. **Interactividad** → Agrega transiciones, validaciones, animations
6. **Probar** → Valida en múltiples dispositivos y browsers

### Para Backend:
1. **Analizar** → Identifica qué datos necesitas persister
2. **Diseñar DB** → Crea schema con tablas normalizadas
3. **Implementar conexión** → Configura PDO y queries
4. **Handlers** → Crea validación y procesamiento
5. **APIs** → Diseña endpoints REST
6. **Integración** → Conecta frontend con backend
7. **Seguridad** → Valida inputs, escapa output, usa prepared statements

---

## Ejemplo de Uso

### Escenario: Crear formulario de solicitud de demo

**Paso 1 - Frontend:**
```
Usar el frontend-design skill para:
- Crear HTML semántico para el formulario
- Aplicar estilos con BEM
- Implementar validación cliente-side
- Diseñar feedback visual (errores, éxito)
```

**Paso 2 - Backend:**
```
Usar el backend-design skill para:
- Crear tabla demo_requests en base de datos
- Implementar handler PHP para procesar POST
- Validar y sanitizar datos
- Enviar email de notificación
- Retornar JSON response
```

---

## Archivos del Proyecto

- **RK_WEB_BRIEF.md** - Especificaciones completas del proyecto
- **index.php** - Punto de entrada principal
- **css/** - Estilos globales del proyecto
- **js/** - JavaScript utilities y componentes
- **includes/** - Lógica backend (handlers, config, DB)
- **assets/** - Imágenes y recursos

---

## Convenciones del Proyecto

### CSS Classes
- Usar BEM: `.block`, `.block__element`, `.block__element--modifier`
- Prefijo `rk-` para componentes principales
- Breakpoints: `600px` (mobile), `768px` (tablet), `1024px` (desktop)

### PHP Code
- Archivos en `includes/` para backend compartido
- Handlers en `includes/handlers/`
- APIs en `api/` directorio
- Usar prepared statements para queries
- Validar y sanitizar todo input

### Database
- Tabla `demo_requests`: email, company, industry, created_at
- Tabla `contact_messages`: name, email, message, phone, created_at
- Tabla `conversions`: type, user_id, source, timestamp

---

## Tips para Máxima Efectividad

1. **Lee el brief primero** - Siempre comienza leyendo RK_WEB_BRIEF.md para contexto
2. **Define scope** - Sé específico sobre qué sección/componente vas a crear
3. **Usa checklist** - Los skills incluyen checklists de calidad; úsalos
4. **Testing** - Prueba siempre en múltiples dispositivos/browsers
5. **Documentación** - Mantén código documentado especialmente en backend

---

## Errores Comunes a Evitar

### Frontend
- ❌ Olvidar mobile-first approach
- ❌ No validar accesibilidad (WCAG)
- ❌ Inconsistencia visual entre componentes
- ❌ CTAs no visibles o poco claros

### Backend
- ❌ No usar prepared statements (SQL injection risk)
- ❌ No validar/sanitizar inputs
- ❌ No implementar error handling
- ❌ Guardar datos sensibles sin encriptación

---

Para más detalles, consulta los archivos SKILL.md en `.claude/`
