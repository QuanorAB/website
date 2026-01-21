# CLAUDE.md

This file provides guidance for Claude Code when working with this codebase.

## Safety Guidelines

**CRITICAL - Never do the following:**
- Never push directly to `main` branch
- Never delete remote branches
- Never force push (`git push --force` or `git push -f`)
- Never run `git reset --hard` on shared branches
- Never commit secrets, API keys, or credentials (check .env files)
- Never run destructive commands without explicit user confirmation

**Always:**
- Create feature branches for changes
- Pull latest changes before starting work
- Run the build before committing to catch errors early

## Project Overview

This is a Next.js 16 website with:
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **i18next** for internationalization (Swedish default, English supported)
- **Supabase** for backend services
- **shadcn/ui** component patterns
- Deployed on **Vercel**

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Language-specific routes (sv, en)
│   │   ├── page.tsx       # Homepage
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog pages
│   │   ├── contact/       # Contact page
│   │   ├── features/      # Features page
│   │   ├── pricing/       # Pricing page
│   │   └── ...
│   ├── globals.css        # Global styles
│   ├── robots.ts          # SEO robots
│   └── sitemap.ts         # SEO sitemap
├── components/            # React components (PascalCase naming)
│   ├── ui/               # Reusable UI primitives (shadcn/ui style)
│   └── *.tsx             # Feature components
├── i18n/                  # Internationalization
│   ├── locales/          # Translation files
│   ├── client.ts         # Client-side i18n
│   ├── server.ts         # Server-side i18n
│   └── settings.ts       # i18n configuration
├── lib/                   # Utilities and services
│   ├── utils.ts          # cn() helper and utilities
│   ├── blog.ts           # Blog-related functions
│   └── supabase.ts       # Supabase client
└── middleware.ts          # Next.js middleware (i18n routing)
public/                    # Static assets
```

## Code Conventions

### TypeScript
- Use TypeScript for all files
- Prefer interfaces over types for object shapes
- Use the `@/*` path alias for imports (maps to `./src/*`)

### Components
- Use PascalCase for component files: `Hero.tsx`, `Navigation.tsx`
- UI primitives go in `components/ui/` with lowercase names: `button.tsx`, `card.tsx`
- Use the `cn()` utility from `@/lib/utils` for conditional class names

### Styling
- Use Tailwind CSS classes
- Use `cn()` to merge class names: `cn("base-class", conditional && "conditional-class")`
- Animations use Framer Motion

### Internationalization
- All user-facing text should use translation keys
- Swedish (`sv`) is the default/fallback language
- Supported languages: Swedish, English
- Route structure: `/[lang]/page` (e.g., `/sv/about`, `/en/about`)

## Common Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Git Workflow

1. Always work on feature branches:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/description-of-change
   ```

2. Keep commits focused and descriptive

3. Before pushing, ensure the build passes:
   ```bash
   npm run build
   ```

4. Create pull requests for review - never merge directly to main
