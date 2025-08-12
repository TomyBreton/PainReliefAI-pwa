# PainRelief AI — Web App (PWA)

This is a **Progressive Web App** for the MVP. It runs in any modern browser, can be **installed on Android** ("Add to Home Screen"), and works offline (after first load).

## Run locally
1) Install Node 18+
2) In this folder, run:
   ```bash
   npm install
   npm run dev
   ```
3) Open the URL shown (usually http://localhost:5173)

## Build for deployment
```bash
npm run build
npm run preview   # optional local preview
```
Deploy the `dist/` folder to Netlify, Vercel, Cloudflare Pages, or any static host.

## Install on Android (PWA)
1) Open the deployed site in Chrome on Android.
2) Tap ⋮ menu → **Add to Home screen** → Install.
3) Launch it like any app.

## Notes
- State is persisted in localStorage.
- Mock AI in `src/ai.ts` (replace with real API later).
- Routes match the MVP: Plan, Exercises, Education, Progress, Flare, Settings + Check-In/Consent/Onboarding.

