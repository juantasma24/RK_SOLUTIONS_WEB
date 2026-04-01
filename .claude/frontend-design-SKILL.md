---
name: frontend-design
description: 'Design and implement responsive UI/UX for RK Solutions. Use when creating components, styling HTML, optimizing mobile layouts, building interactive features with HTML/CSS/JS, and ensuring design consistency with the brief.'
---

# Frontend Design Skill

Specialized skill for designing and implementing high-conversion frontend interfaces for RK Solutions web redesign project.

## Project Context

- **Project**: RK Solutions Home redesign
- **Goal**: Capture demo requests and highlight "La Manzana" product
- **Stack**: HTML/CSS/JS (prototipo) → WordPress+Elementor (migración final)
- **Brief**: See RK_WEB_BRIEF.md

## When to Use

- Building responsive components (hero, cards, navigation, forms)
- Styling sections with visual consistency (typography, colors, spacing)
- Implementing mobile-first design principles
- Creating interactive elements (CTAs, testimonials carousel, FAQ toggles)
- Optimizing layout for desktop/tablet/mobile
- Ensuring accessibility standards (contrast, semantic HTML, ARIA)

## Design System Guidelines

### Color Palette
- **Primary**: Professional blue (CTA buttons, accents)
- **Secondary**: Complementary accent (highlights)
- **Neutral**: Grays (text, backgrounds)
- **Status**: Green (success), Red (alerts)

### Typography
- **Headlines** (H1-H3): Bold, clear hierarchy
- **Body**: Readable line-height (1.5-1.6), minimum 16px
- **Small text**: Minimum 14px for legibility

### Spacing
- **Base unit**: 8px grid system
- **Section spacing**: 60px-100px (desktop), 40px-60px (mobile)
- **Component spacing**: Multiples of base unit

### Components
- **Buttons**: CTA (primary), Secondary (outlined), Text links
- **Cards**: Consistent shadows, padding, border-radius
- **Navigation**: Sticky header, mobile hamburger menu
- **Forms**: Clear labels, proper input styling, validation feedback

## Procedure

### 1. Analyze Requirements
- Review RK_WEB_BRIEF.md for target section
- Identify user journey and conversion goals
- Note specific requirements (mobile-first, CTA placement)

### 2. Design Component Structure
- Create semantic HTML with proper heading hierarchy
- Use BEM naming convention for CSS classes
- Plan breakpoints (mobile: 375px, tablet: 768px, desktop: 1024px+)

### 3. Implement Responsive Layout
- Mobile-first approach: start with mobile, enhance for desktop
- Use CSS Grid/Flexbox for layouts
- Test all breakpoints

### 4. Apply Design Consistency
- Follow design system for colors, typography, spacing
- Ensure consistent padding/margins across sections
- Match button and link styling project-wide

### 5. Build Interactive Features
- Implement smooth transitions and animations
- Create form validation and feedback
- Build responsive navigation

### 6. Test and Optimize
- Test on mobile/tablet/desktop browsers
- Check Lighthouse score (target > 85)
- Validate WCAG 2.1 AA accessibility
- Test all CTAs and forms

## Key Requirements from Brief

- **Header**: Sticky nav with logo + menu + CTA button
- **Hero**: H1 value prop, subtitle, primary/secondary CTAs
- **Trust Bar**: Logos and metrics
- **Value Pillars**: 4 main benefits
- **How It Works**: 3-step process
- **Modules**: La Manzana features
- **Testimonials**: Social proof
- **FAQ**: Common objections
- **CTA Closure**: Strong message + form
- **Footer**: Nav + legal + contact
