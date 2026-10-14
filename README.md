# Blossoms Foundation — Website

A React + Vite frontend for Blossoms Foundation, a community-focused nonprofit
supporting vulnerable children, families, and communities.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`) in your
browser.

Donations, the contact form and the newsletter talk to the
**blossoms-backend** API. Copy `.env.example` to `.env` and set `VITE_API_URL`
(default `http://localhost:4000`), and start the backend too. For a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/     Reusable UI (Navbar, Footer, Hero, cards, CTA, etc.)
├── pages/          One file per route (Home, About, Programs, Impact, ...)
├── data/           Structured content arrays — edit copy here
├── hooks/          useReveal (scroll fade-in), useCountUp (stat animation)
├── config/         api.js — client for the backend API
├── context/        LocaleContext (country, language, currency)
├── i18n/           countries.js (currencies + rates), translations.js
├── App.jsx         Routes
├── main.jsx        Entry point
└── index.css       Design tokens (colors, type) + shared base styles
public/
├── images/         Placeholder images + README.md explaining what to replace
└── robots.txt
```

## Before this goes live, replace these placeholders

1. **Images** — `public/images/` contains branded SVG placeholders, not real
   photos. See `public/images/README.md` for the exact file each one maps to.
2. **Statistics** — `src/data/stats.js` has demo numbers (children supported,
   communities reached, etc.), clearly commented as placeholders.
3. **Stories** — `src/data/stories.js` contains three fictional stories,
   flagged with `isPlaceholder: true`. Replace with real, consented stories.
4. **Locations** — the "Where We Work" section on the Impact page
   (`src/data/stats.js` → `impactLocations`) uses example Kenyan counties.
   Confirm and replace with the Foundation's actual operating areas.
5. **Contact details** — phone number in `src/pages/Contact.jsx` is a
   placeholder (`+254 XXX XXX XXX`). Email is set to
   `info@blossomsfoundation.org`.
6. **Donations** — donations are paid in USDT to a Binance deposit address
   held by the **backend** (never in this frontend). Put your Binance details
   in the backend `.env`; until then the Donate page shows a "wallet not
   available" message instead of an address. The page never says a donation
   succeeded until the backend verifies it.
7. **Exchange rates & presets** — `src/i18n/countries.js` has indicative rates
   (and `blossoms-backend/src/services/rates.js` must match). Update both, or
   serve live rates, before launch.
8. **Translations** — Swahili and French in `src/i18n/translations.js` were
   written without native-speaker review. Have fluent speakers proofread them.
   Only the main UI (nav, home, programs, donate, wallet, footer) is
   translated; About, Impact, Stories, Get Involved and Contact body copy,
   and the placeholder stories, are still English.
9. **Contact form** — sends to the backend `/api/contact`. Messages are
   stored there; forward them to an inbox before launch.
10. **Social links** — Footer social icons currently link to `#`. Add real
   Facebook/Instagram/X/YouTube/LinkedIn URLs in `src/components/Footer.jsx`.
11. **Sitemap** — `public/robots.txt` references where to add a sitemap once
   the production domain is known.

## Notes

- No TypeScript, no Next.js — plain Vite + React + React Router, per spec.
- Icons via `lucide-react`.
- Fonts: Fraunces (display/headlines) + Inter (body/UI), loaded from Google
  Fonts in `index.html`.
- Respects `prefers-reduced-motion` throughout (scroll reveals, count-up
  stats, smooth scrolling all degrade gracefully).
- Responsive from 375px mobile up through 1440px+ desktop.
