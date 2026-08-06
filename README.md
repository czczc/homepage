# czhang-homepage

Personal homepage of Chao Zhang, styled as a detector DAQ console ("Control Room").
Vue 3 + Vite, frontend only — no backend, no tracking.

## Develop

```bash
npm install
npm run dev       # dev server
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Editing content

All copy lives in [`src/content.js`](src/content.js) — identity fields, figures-of-merit
tiles, messages, web projects, experiment channels, and footer links. Panels are one
component each under [`src/components/`](src/components/).

## Event display data

The EVENT DISPLAY panel renders five real MicroBooNE neutrino events (Wire-Cell imaging
output) as rotatable 3D point clouds, colored by cluster, inside the uboone TPC active
volume. The data is packed into `public/data/bee-events.json` (16k points/event,
quantized to ~145 KB each). To re-fetch from the Bee server or switch to a different
event set:

```bash
python3 scripts/pack-bee-events.py                          # default set, 5 events
python3 scripts/pack-bee-events.py uboone/imaging/examples 5
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to
`main` (enable Pages → Source: GitHub Actions in the repo settings). `vite.config.js`
uses `base: './'`, so the build also works when copied to any static subdirectory.
