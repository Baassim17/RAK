# RAK Security Services

Marketing website for **RAK Security Services LLC** — security guarding and patrol services based in Ras Al Khaimah, UAE.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home: hero, manifesto, chapters, process, client strip, quote form |
| `/services` | Security services offered |
| `/industries` | Industries served |
| `/about` | Company overview |
| `/careers` | Careers |
| `/contact` | Contact details and enquiry form |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript (strict)
- Tailwind CSS v4 with oklch design tokens
- shadcn/ui (Base UI primitives) and Lucide icons
- GSAP and Lenis for animation and smooth scroll
- Three.js for the 3D terrain

## Getting started

Requires Node.js 24 or newer (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run check` | Lint, typecheck and build |

## Project structure

```
src/
  app/                      # Routes, layout and global styles
  components/
    sites/rak/              # Site components (Hero, Nav, Footer, Terrain, ...)
      content.ts            # Single source of truth for site copy
    ui/                     # shadcn/ui primitives
  lib/utils.ts              # cn() helper
public/sites/rak/           # Logo, images and terrain assets
.github/workflows/          # CI and Vercel deploy
```

## Editing content

All copy (company details, services, industries) lives in `src/components/sites/rak/content.ts`. Values wrapped in `[brackets]` are placeholders — replace them with confirmed company details (phone, email, address, licence, approvals) before launch.

## Deployment

Pushes and pull requests to `main` run lint, typecheck and build in GitHub Actions, then deploy to Vercel. Set these repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
