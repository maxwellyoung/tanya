# CLAUDE.md - AI Assistant Guide

This document provides essential context for AI assistants working on this codebase.

## Project Overview

**Project:** Tanya Bardell-Young Portfolio Website
**Type:** Award-worthy personal portfolio for colour consulting and interior design
**Brand:** Three Colours Red - "Harmonious Colors, Comforting Designs"

## Tech Stack

### Core
- **Framework:** Next.js 14.2.5 with App Router
- **Language:** TypeScript 5 (strict mode)
- **Package Manager:** pnpm

### Styling & UI
- **Styling:** Tailwind CSS 3.4.1
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React

### Animation & 3D
- **Animations:** Framer Motion 11.3.2
- **Smooth Scroll:** Lenis
- **3D/WebGL:** Three.js + React Three Fiber
- **Animation Library:** GSAP

### Forms
- **Form Handling:** React Hook Form
- **Validation:** Zod

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with custom font
│   ├── page.tsx            # Main homepage with all sections
│   └── globals.css         # Tailwind + CSS animations
├── components/
│   ├── AboutSection/       # Profile with parallax, stats, skills
│   ├── ContactForm/        # Split layout contact form
│   ├── WorkSection/        # Portfolio with magnetic cards
│   ├── ui/                 # shadcn/ui components
│   │
│   │ # Animation Components
│   ├── AnimatedCounter.tsx # Counting number animation
│   ├── AnimatedText.tsx    # Text reveal animations
│   ├── ColorBlob.tsx       # WebGL animated blobs (Three.js)
│   ├── ColorLab.tsx        # Interactive color palette tool
│   ├── CustomCursor.tsx    # Context-aware custom cursor
│   ├── MagneticButton.tsx  # Magnetic hover effect
│   ├── ParallaxImage.tsx   # Scroll-based parallax
│   ├── Preloader.tsx       # Branded loading animation
│   ├── RevealOnScroll.tsx  # Scroll-triggered reveals
│   ├── ScrollProgress.tsx  # Scroll progress bar
│   ├── SmoothScroll.tsx    # Lenis smooth scroll provider
│   └── TextReveal.tsx      # Character-by-character reveal
└── lib/
    └── utils.ts            # Utility functions (cn helper)
```

## Development Commands

```bash
pnpm dev      # Start development server (localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Award-Worthy Features

### 1. Preloader Animation
- Branded loading screen with animated color circles
- Progress bar with percentage
- Smooth exit transition

### 2. Custom Cursor
- Context-aware cursor states (default, hover, text, click)
- Blend mode effects
- Hidden on touch devices

### 3. WebGL Hero
- Three.js animated organic blobs
- Custom GLSL shaders for morphing effect
- Brand colors with multiply blend mode

### 4. Smooth Scroll
- Lenis for buttery smooth scrolling
- Momentum-based scrolling
- Touch device support

### 5. Scroll Animations
- `RevealOnScroll` - Directional reveal animations
- `AnimatedCounter` - Number counting effect
- `TextReveal` - Character/word stagger animations
- Scroll-linked opacity/scale effects in hero

### 6. Magnetic Interactions
- `MagneticButton` - Elements follow cursor
- 3D tilt effects on work cards
- Spring physics animations

### 7. Color Lab (Unique Feature)
- Interactive color palette explorer
- Mood-based filtering
- Click-to-copy hex codes
- Multiple curated schemes

## Code Conventions

### Animation Patterns

```typescript
// Scroll-triggered animation
import { useInView, motion } from "framer-motion";

const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
/>
```

```typescript
// Magnetic effect
const [position, setPosition] = useState({ x: 0, y: 0 });

const handleMouse = (e: React.MouseEvent) => {
  const { clientX, clientY } = e;
  const { left, top, width, height } = ref.current.getBoundingClientRect();
  setPosition({
    x: (clientX - (left + width / 2)) * 0.3,
    y: (clientY - (top + height / 2)) * 0.3,
  });
};
```

### Component Structure

```typescript
"use client"

import { motion, useInView } from "framer-motion"
import RevealOnScroll from "@/components/RevealOnScroll"
import MagneticButton from "@/components/MagneticButton"

export default function Section() {
  return (
    <RevealOnScroll>
      <MagneticButton>
        <button data-cursor-hover>Click me</button>
      </MagneticButton>
    </RevealOnScroll>
  )
}
```

### Custom Cursor Integration

Add data attributes to elements:
```tsx
<button data-cursor-hover>     // Expands cursor
<div data-cursor-text="View">  // Shows text in cursor
```

## Design System

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Red | `#FF3333` | Primary actions, accents |
| Light Red | `#FF6666` | Hover states |
| Light Background | `#FFF5F5` | Section backgrounds |
| Cyan Accent | `#33CCFF` | Color Lab, decorative |
| Yellow Accent | `#FFCC33` | Color Lab, decorative |
| Text Dark | `#333333` | Headings, body text |
| Text Medium | `#666666` | Secondary text |

### Typography

- **Font:** Authentic-Sans (custom OTF in public/)
- **Headings:** Light weight (300), large sizes (5xl-9xl)
- **Accent text:** Italic medium weight
- **Body:** Light weight (300), relaxed line height

### Animation Easing

Standard easing curve: `[0.215, 0.61, 0.355, 1]` (ease-out-cubic)

### Responsive Breakpoints

- Mobile: < 768px
- Tablet (md): 768px+
- Desktop (lg): 1024px+

## Key Sections

### Hero
- WebGL animated color blobs background
- Large staggered text animations
- Scroll-linked opacity/scale fade
- Magnetic scroll indicator

### About
- Parallax profile image with rotation
- Animated skill progress bars
- Counting stat numbers
- Decorative blur elements

### Work
- 3D magnetic hover cards
- Image zoom on hover
- Animated accent lines
- Modal gallery with carousel

### Color Lab
- Mood filter buttons
- Animated color swatches
- Click-to-copy functionality
- Palette preview bar

### Contact
- Split layout design
- Animated contact info cards
- Form with loading/success states
- Availability indicator

## Adding New Animations

### Using RevealOnScroll

```tsx
import RevealOnScroll from "@/components/RevealOnScroll"

<RevealOnScroll direction="up" delay={0.2}>
  <div>Animates in from bottom</div>
</RevealOnScroll>
```

Props: `direction` (up/down/left/right/none), `delay`, `duration`, `once`

### Using MagneticButton

```tsx
import MagneticButton from "@/components/MagneticButton"

<MagneticButton strength={0.3}>
  <button>Follows cursor</button>
</MagneticButton>
```

### Using AnimatedCounter

```tsx
import AnimatedCounter from "@/components/AnimatedCounter"

<AnimatedCounter value={150} suffix="+" duration={2} />
```

## Performance Considerations

- Heavy components (ColorBlob, ColorLab) use dynamic imports with `ssr: false`
- Animations respect `prefers-reduced-motion`
- Custom cursor disabled on touch devices
- Images use lazy loading

## Testing

No test framework configured. Recommended setup:
- Vitest for unit tests
- Playwright for E2E testing

## Deployment

Configured for Vercel:
- Push to main triggers deployment
- Environment variables in Vercel dashboard

## Known Limitations

1. **Contact Form:** Client-side only, logs to console
2. **Images:** External URLs - consider Next.js Image optimization
3. **Three.js:** May have performance issues on older devices

## Git Workflow

- Main branch: production
- Feature branches: `claude/[feature-name]-[session-id]`
- Descriptive commit messages with context
