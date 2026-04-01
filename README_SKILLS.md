# Skills Personalizados - RK Solutions

## ¿Qué son estos skills?

He creado **tres skills personalizados** especializados para que tengas capacidades mejoradas en el proyecto de RK Solutions:

### 1. 🎨 **Frontend Design Skill**
- Diseño UI/UX responsivo
- Componentes HTML/CSS
- Layouts mobile-first
- Accesibilidad (WCAG 2.1)
- Design system integration

### 2. ⚙️ **Backend Design Skill**
- Arquitectura PHP
- APIs y endpoints
- Manejo de bases de datos
- Formularios y validación
- Seguridad y mejores prácticas

### 3. ✨ **UI/UX Pro Max Skill** (Professional Design System)
- Generación inteligente de sistemas de diseño
- Paletas de colores profesionales
- Sistemas tipográficos completos
- Patrones UI y componentes
- Anti-patrones y mejores prácticas
- Checklists de accesibilidad (WCAG 2.1 AA)
- Responsive design (375px - 1440px)

---

## Cómo Usarlos

### Opción 1: Mencionar el skill en chat
Simplemente pregunta y menciona qué skill necesitas:
- "Crea el hero section usando el **frontend-design skill**"
- "Implementa el handler para demo requests con el **backend-design skill**"
- "Genera sistema de diseño con el **ui-ux-pro-max skill**"

### Opción 2: Comando `/skills` 
En el terminal/chat:
```
/skills
```
Selecciona `frontend-design`, `backend-design` o `ui-ux-pro-max` de la lista.

### Opción 3: Slash commands directos
```
/frontend-design Crear componente de testimonios
/backend-design Implementar API de contacto
/ui-ux-pro-max Generar sistema de diseño para hero
```

---

## Estructura de Skills

Los skills están ubicados en:
- `.claude/frontend-design-SKILL.md`
- `.claude/backend-design-SKILL.md`
- `.claude/ui-ux-pro-max-SKILL.md`

Cada uno contiene:
- ✅ Especificaciones del proyecto
- ✅ Guidelines de diseño/arquitectura
- ✅ Procedimientos paso a paso
- ✅ Patrones de código comunes
- ✅ Checklists de calidad

---

## Flujo Recomendado

### Para Crear una Característica Completa:

1. **Generar Design System** → Usa `ui-ux-pro-max` para definir colores, tipografía, componentes
2. **Planificar** → Lee RK_WEB_BRIEF.md
3. **Frontend** → Usa `frontend-design` para estructura HTML/CSS
4. **Backend** → Usa `backend-design` para lógica PHP/DB
5. **Integración** → Conecta frontend ↔ backend
6. **Testing** → Valida en múltiples dispositivos

### Ejemplo: Formulario de Demo Request

**Step 1 - Frontend:**
```
Usa frontend-design para:
- Crear formulario HTML semántico
- Estilos CSS con design system
- Validación cliente-side
- Feedback visual
```

**Step 2 - Backend:**
```
Usa backend-design para:
- Tabla `demo_requests` en DB
- Handler PHP para procesar POST
- Validación y sanitización
- Email de notificación
- JSON response
```

---

## Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `SKILLS_GUIDE.md` | Guía detallada de uso |
| `RK_WEB_BRIEF.md` | Especificaciones del proyecto |
| `.claude/frontend-design-SKILL.md` | Skill de frontend |
| `.claude/backend-design-SKILL.md` | Skill de backend |
| `.claude/ui-ux-pro-max-SKILL.md` | Skill de diseño profesional |

---

## Ventajas

✨ **Especialización**: Los skills contienen todo lo necesario para cada tarea
📚 **Consistencia**: Guidelines y patrones aseguran calidad
🚀 **Eficiencia**: Procedimientos probados aceleren el desarrollo
✅ **Validación**: Checklists de calidad para cada feature

---

## Siguiente Paso

¿Quieres que comencemos a construir? Dime qué sección del brief quieres trabajar:

- Hero section
- Formulario de demo requests
- Testimonios
- FAQ
- Otro componente

Y te guiaré usando los skills personalizados.
