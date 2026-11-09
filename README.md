# RAK Security Services

Marketing website for **RAK Security Services LLC** — security guarding and patrol services based in Ras Al Khaimah, UAE.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home: hero, company overview, services, sectors, commitment and FAQ |
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

Use Node.js 24 (see `.nvmrc`).

```bash
npm ci
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

Core company copy, services and industries are in `src/components/sites/rak/content.ts`. The homepage logo strip uses illustrative brands. Use approved client logos if the strip is meant to show actual clients.

## Deployment

Import the repository in Vercel using the **Next.js** preset, Node.js **24.x** and the default build settings. Set the following public values in the Vercel project before building. For local development, put them in `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_RAK_EMAIL` | Confirmed public inbox for quote and careers enquiries |
| `NEXT_PUBLIC_RAK_PHONE` | Optional public phone number, including country code |
| `NEXT_PUBLIC_RAK_ADDRESS` | Optional public office address |
| `NEXT_PUBLIC_RAK_LICENCE` | Optional public licence number |

The quote and careers forms open drafts in the visitor's email app. They do not send email from Vercel. Set the email address and test that a draft reaches the intended inbox before launching. Without an email address, Contact offers a copyable draft and Careers links to the company profile. Review the footer policy pages against company practices before launch.

Use a Vercel preview to verify the public contact details and check the enquiry flow before promoting the build. For a local production check, run `npm run check` followed by `npm run start`.

GitHub Actions runs the quality checks on pushes and pull requests to `main`. If you use GitHub Actions to deploy instead of Vercel's Git integration, set the repository variable `VERCEL_CLI_DEPLOY` to `true` and add the repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`.
