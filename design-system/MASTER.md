# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Tobi Yusuf Testimonial Collection System
**Generated:** 2026-06-15
**Category:** Personal Brand / Luxury Service
**Skill Style Match:** Soft UI Evolution + Minimalism (hybrid)

---

## Global Rules

### Color Palette — LOCKED

| Role | Hex | Tailwind Token | CSS Variable |
|------|-----|----------------|--------------|
| Primary Green | `#2C4A3E` | `forest` | `--forest` |
| Green Hover | `#3A5F51` | `forest-dark` | `--forest-dark` |
| Champagne Gold | `#B8975A` | `gold` | `--gold` |
| Warm Cream | `#F7F4EF` | `cream` | `--cream` |
| Card Surface | `#FFFFFF` | `white` | — |
| Ink (body text) | `#1A1A1A` | `ink` | `--ink` |
| Mid (secondary) | `#555555` | `mid` | `--mid` |
| Muted (placeholders) | `#AAAAAA` | `muted` | `--muted` |
| Border | `#D5CFC4` | `edge` | `--edge` |

**Do NOT introduce any other colors.** No blue, no purple, no gradients.

### Typography — LOCKED

| Role | Spec | Tailwind |
|------|------|----------|
| Display / Page Title | Georgia, serif, 2rem (32px), lh 1.15 | `font-serif text-display` |
| Section Headings | Georgia, serif, 1.375rem (22px) | `font-serif text-section` |
| Body / UI Text | Inter, sans-serif, 0.9375rem (15px), lh 1.6 | `text-body` |
| Labels | Inter, sans-serif, 0.8125rem (13px), fw 600 | `text-label font-semibold` |

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight inline gaps |
| `--space-sm` | `8px` | Icon gaps, small spacing |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Section padding |
| `--space-xl` | `32px` | Large separators |
| `--space-2xl` | `48px` | Section margins |
| `--space-3xl` | `64px` | Hero / top padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 2px 12px rgba(0,0,0,0.06)` | Cards, form panels |
| `--shadow-card-hover` | `0 4px 20px rgba(0,0,0,0.10)` | Hovered cards |

---

## Component Specs

### Buttons — Primary
```css
bg: #2C4A3E | text: white | radius: 8px | padding: 12px 32px
hover bg: #3A5F51 | transition: 150ms ease
disabled: opacity-40, cursor-not-allowed
```

### Cards / Form Panels
```css
bg: #FFFFFF | border: 1px solid #D5CFC4 | radius: 12px
shadow: 0 2px 12px rgba(0,0,0,0.06)
```

### Inputs / Textareas
```css
bg: #FFFFFF | border: 1px solid #D5CFC4 | radius: 8px | padding: 12px 16px
focus border: #2C4A3E | focus ring: 0 0 0 3px rgba(44,74,62,0.10)
transition: border-color 150ms ease
```

### Brand Cards (Selected State)
```css
border: 2px solid #B8975A | ring: 2px ring-gold/30
```

### Admin Filter Pills (Active State)
```css
bg: #2C4A3E | text: white | radius: 9999px
```

---

## Layout

- **Page background:** `#F7F4EF` (cream) — no white pages
- **Public form max-width:** 640px, centered
- **Admin dashboard max-width:** 960px, centered
- **Brand cards:** 2-column grid always (stacks at 375px naturally in 2 cols)
- **Spacing unit:** 8px base. Use 8, 16, 24, 32, 48, 64

## Style Guidelines

**Style:** Soft UI Evolution  
**Keywords:** Warm, editorial, quiet luxury, faith-led, trustworthy  
**Effects:** Subtle shadows, 150ms transitions, no animations unless functional  
**Anti-patterns:** No gradients · No background images · No decorative patterns · No icons unless functional · No emojis as icons · No equal-width grid that fills viewport · No dark mode · No neon · No glassmorphism

---

## Anti-Patterns (Do NOT Use)

- Gradients anywhere
- Background images or decorative patterns
- Equal-width card grids that fill the full viewport width
- Corporate / clinical aesthetic (templates)
- Excessive whitespace-collapsing on mobile
- Icons as emojis
- Missing cursor:pointer on interactive elements
- Missing focus states

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (use SVG instead)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation (`focus-visible:ring-2`)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] Brand names exactly match PRD Section 02
