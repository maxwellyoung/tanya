# CLAUDE.md - AI Assistant Guide

This document provides essential context for AI assistants working on this codebase.

## Project Overview

**Project:** Tanya Bardell-Young Portfolio Website
**Type:** Personal portfolio and service showcase for colour consulting and interior design
**URL:** Three Colours Red - "Harmonious Colors, Comforting Designs"

## Tech Stack

- **Framework:** Next.js 14.2.5 with App Router
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 3.4.1
- **UI Components:** shadcn/ui (built on Radix UI primitives)
- **Animations:** Framer Motion 11.3.2
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Package Manager:** pnpm

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with custom font
│   ├── page.tsx          # Main homepage (Hero + sections)
│   └── globals.css       # Tailwind + CSS variables
├── components/
│   ├── AboutSection/     # Profile/biography section
│   ├── ContactForm/      # Contact form with validation
│   ├── WorkSection/      # Portfolio projects showcase
│   └── ui/               # shadcn/ui components
└── lib/
    └── utils.ts          # Utility functions (cn helper)
public/
├── authentic-sans-60.otf # Custom font
└── profile.webp          # Profile image
```

## Development Commands

```bash
pnpm dev      # Start development server (localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Code Conventions

### File Patterns

- Client components use `"use client"` directive at top
- Each section component is in its own folder with `page.tsx`
- UI components follow shadcn/ui pattern in `src/components/ui/`

### Imports

Use path alias `@/*` which maps to `./src/*`:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### Styling

- Use Tailwind utility classes
- Combine classes with `cn()` utility for conditional styling
- Custom colors defined in `tailwind.config.ts`
- CSS variables in `globals.css` for theming

### Component Patterns

```typescript
// Standard component structure
"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  className?: string
}

export function Component({ className }: Props) {
  return (
    <motion.div
      className={cn("base-classes", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* content */}
    </motion.div>
  )
}
```

### Form Validation

Forms use Zod schemas with React Hook Form:
```typescript
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})
```

## Design System

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Red | `#FF3333` | Primary actions, accents |
| Light Red | `#FF6666` | Hover states |
| Light Background | `#FFF5F5` | Section backgrounds |
| Cyan Accent | `#33CCFF` | Hero animation |
| Yellow Accent | `#FFCC33` | Hero animation |
| Text Dark | `#333333` | Body text |
| Text Medium | `#666666` | Secondary text |

### Typography

- **Font:** Authentic-Sans (custom, loaded in layout.tsx)
- **Fallback:** sans-serif

### Responsive Breakpoints

- Mobile: < 768px
- Tablet (md): 768px+
- Desktop (lg): 1024px+

## Key Components

### Hero Section (`src/app/page.tsx`)
- Animated draggable circles using Framer Motion
- Smooth scroll navigation to sections
- Fixed floating navbar with scroll detection

### Work Section (`src/components/WorkSection/page.tsx`)
- Grid layout with 3 portfolio projects
- Modal dialogs with image carousels (Embla Carousel)
- Each project: images, title, badge, description

### Contact Form (`src/components/ContactForm/page.tsx`)
- Zod validation schema
- Currently logs to console (needs backend integration)

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Configuration is in `components.json`. Components install to `src/components/ui/`.

## Common Tasks

### Adding a New Section

1. Create folder in `src/components/[SectionName]/`
2. Add `page.tsx` with `"use client"` directive
3. Import and add to main page at `src/app/page.tsx`
4. Add navigation link if needed

### Adding New Images

1. Place in `public/` directory
2. Reference with path `/filename.ext`
3. For external images, update `next.config.mjs` domains

### Modifying Animations

Framer Motion is used throughout. Common patterns:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
/>
```

## Testing

No test framework is currently configured. When adding tests:
- Consider Vitest or Jest
- Add to `package.json` scripts
- Place test files adjacent to components (`*.test.tsx`)

## Deployment

The project is configured for Vercel deployment:
- Push to main branch triggers deployment
- Environment variables set in Vercel dashboard

## Known Limitations

1. **Contact Form:** Currently client-side only, logs to console
2. **Images:** External URLs used - consider Next.js Image optimization
3. **Analytics:** Not configured

## Environment Variables

Currently none required. When adding:
- Create `.env.local` for local development
- Add to `.gitignore` (already configured)
- Document required variables here

## Git Workflow

- Main branch is primary
- Feature branches: `claude/[feature-name]-[session-id]`
- Commit messages should be descriptive and concise
