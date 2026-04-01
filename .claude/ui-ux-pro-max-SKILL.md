---
name: ui-ux-pro-max
description: 'Professional UI/UX design system generator for RK Solutions. Generates complete design systems with color palettes, typography, patterns, components, and anti-patterns. Use for designing cohesive, high-conversion interfaces across all pages.'
---

# UI/UX Pro Max Skill

AI-powered design system generator for professional UI/UX across your entire project.

## Overview

This skill generates **intelligent design systems** tailored to RK Solutions. It analyzes your project requirements and produces:
- ✅ Complete color palettes
- ✅ Typography systems
- ✅ Recommended UI patterns
- ✅ Component guidelines
- ✅ Accessibility standards
- ✅ Performance recommendations
- ✅ Anti-patterns to avoid

## When to Use

- **Project Start**: Generate the complete design system for RK Solutions
- **New Section**: Define design for hero, testimonials, FAQ sections
- **Component Design**: Get specific guidance for buttons, cards, forms
- **Consistency Check**: Verify new work aligns with design system
- **Brand Refinement**: Evolve the design as project matures
- **Accessibility**: Ensure WCAG AA compliance across all elements

## Design System Generation Process

### Step 1: Define Your Brief
```
PROJECT: RK Solutions
TARGET: Lead generation / Demo requests
PRODUCT: La Manzana (SaaS for payroll & compliance)
INDUSTRIES: HR, Finance, Small/Medium Business
MOOD: Professional, trustworthy, modern
```

### Step 2: Generate Design System
The skill analyzes the brief and generates:

**PATTERN RECOMMENDATION**
- Layout structure (Hero + Trust + Features + Testimonials + CTA + Footer)
- Conversion path (Where to place CTAs, forms, social proof)
- Section hierarchy

**STYLE RECOMMENDATION**
- UI trend (Modern + Professional + Conversion-focused)
- Keywords for visual mood
- Best practices for your industry

**COLOR PALETTE**
- Primary: Professional blue (CTAs, highlights)
- Secondary: Accent color (emphasis)
- Neutral: Grays (text, backgrounds)
- Background: Clean white or light gray
- Text: Dark gray/charcoal for contrast
- Status colors: Green (success), Red (error), Yellow (warning)

**TYPOGRAPHY**
- Headline fonts (Bold, clear, professional)
- Body fonts (Readable, friendly)
- Size scale (h1-h6, body, small)
- Line heights (1.5-1.6 for body)
- Letter spacing for hierarchy

**COMPONENTS**
- Buttons (Primary CTA, Secondary, Text links)
- Cards (Consistent styling for features/testimonials)
- Forms (Inputs, labels, validation, feedback)
- Navigation (Header, footer, mobile menu)
- Hero section (Image, headline, CTA layout)

**KEY EFFECTS**
- Shadow depth: subtle for premium feel
- Transitions: smooth 200-300ms
- Hover states: obvious but not jarring
- Border radius: consistent throughout

**ANTI-PATTERNS** (What NOT to do)
- ❌ Bright neon colors (too loud for B2B SaaS)
- ❌ Harsh animations (distracting)
- ❌ AI-generated gradients (purple/pink clichés)
- ❌ Too many fonts (pick 2 max)
- ❌ Low contrast text (accessibility failure)
- ❌ No hover states (poor UX)

## Pre-Delivery Checklist

Every design system should verify:

- [ ] **Colors**: Sufficient contrast (4.5:1 for text)
- [ ] **Typography**: Clear hierarchy, readable sizes
- [ ] **Spacing**: Consistent 8px grid system
- [ ] **Components**: Reusable, consistent styling
- [ ] **Responsive**: Works at 375px, 768px, 1024px, 1440px
- [ ] **Accessibility**: WCAG 2.1 AA compliant
- [ ] **Icons**: SVG (Heroicons/Lucide), not emojis
- [ ] **Interactions**: cursor-pointer on clickable elements
- [ ] **Focus States**: Keyboard navigation visible
- [ ] **Motion**: Respects prefers-reduced-motion
- [ ] **Performance**: Lighthouse > 85

## Design System for RK Solutions (Recommended)

### Pattern: Lead-Centric + Social Proof
**Sections**:
1. Header (sticky nav with CTA)
2. Hero (value prop, CTAs)
3. Trust bar (logos, metrics)
4. Value pillars (4 benefits)
5. How it works (3-step process)
6. Features (La Manzana modules)
7. Testimonials (social proof)
8. FAQ (objections)
9. Final CTA (closure)
10. Footer

### Style: Modern Professional
- **Mood**: Trustworthy, efficient, modern
- **Best for**: B2B SaaS, business software
- **Performance**: Excellent | **Accessibility**: WCAG AA

### Color Palette
| Color | Value | Usage |
|-------|-------|-------|
| Primary | #2563EB | CTAs, accents, highlights |
| Secondary | #7C3AED | Complementary accents |
| Success | #10B981 | Positive feedback, checkmarks |
| Error | #EF4444 | Errors, alerts |
| Warning | #F59E0B | Warnings, info |
| Background | #FFFFFF | Main background |
| Surface | #F3F4F6 | Card backgrounds |
| Text Dark | #1F2937 | Headings, body text |
| Text Light | #6B7280 | Secondary text |
| Border | #E5E7EB | Dividers, borders |

### Typography
| Element | Font | Size | Weight | Line-Height |
|---------|------|------|--------|-------------|
| H1 | Inter | 48px | Bold (700) | 1.2 |
| H2 | Inter | 36px | Bold (700) | 1.3 |
| H3 | Inter | 24px | Bold (700) | 1.4 |
| Body | Inter | 16px | Regular (400) | 1.6 |
| Small | Inter | 14px | Regular (400) | 1.5 |
| Button | Inter | 16px | Semi-bold (600) | 1.5 |

**Font Source**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

### Component Guidelines

#### Buttons
```html
<!-- Primary CTA Button -->
<button class="btn btn--primary">Solicitar demo gratis</button>

<!-- Secondary Button -->
<button class="btn btn--secondary">Ver demo rápida</button>

<!-- Text Link -->
<button class="btn btn--text">Learn more →</button>
```

```css
.btn {
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn--primary {
  background-color: #2563EB;
  color: white;
}

.btn--primary:hover {
  background-color: #1D4ED8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn--primary:focus {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}
```

#### Cards
```css
.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}
```

#### Form Inputs
```css
input, textarea, select {
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 16px;
  transition: all 200ms ease;
}

input:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

input:invalid {
  border-color: #EF4444;
}
```

### Spacing Scale (8px grid)
```
8px    - xs (smallest)
16px   - sm
24px   - md
32px   - lg
48px   - xl
64px   - 2xl
80px   - 3xl
96px   - 4xl
```

### Responsive Breakpoints
```
Mobile:   375px  (default/small phones)
Tablet:   768px  (iPad, medium devices)
Desktop:  1024px (standard desktop)
Large:    1440px (wide screens)
```

## Implementation Example

### Generate design for "Testimonials Section"
```
REQUEST: 
"Generate design system for testimonials section featuring 
client success stories for RK Solutions SaaS product"

RESPONSE will include:
- Layout pattern (grid, carousel, or card layout)
- Color usage (which palette colors for testimonials)
- Typography (quote styles, attribution)
- Component structure (card design, rating display)
- Responsive behavior
- Accessibility notes
```

## Integration with Project

All design system decisions should:
1. ✅ Reference this skill's guidelines
2. ✅ Use recommended colors/typography
3. ✅ Follow component patterns
4. ✅ Maintain responsive breakpoints
5. ✅ Implement accessibility standards
6. ✅ Avoid anti-patterns

## Resources

- [RK_WEB_BRIEF.md](../../RK_WEB_BRIEF.md) - Project specifications
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Heroicons - SVG Icons](https://heroicons.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)

## Quick Start

1. **Ask the skill**: "Generate design system for [section/component]"
2. **Review recommendations**: Color, typography, patterns
3. **Check checklist**: Verify accessibility, responsiveness
4. **Apply to code**: Use guidelines in CSS/HTML
5. **Validate**: Test on multiple devices, run Lighthouse

This skill powers consistent, professional UI/UX across your entire RK Solutions project.
