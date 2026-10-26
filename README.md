# Binbo Xu — Personal Portfolio

A personal portfolio for business analytics, decision science, and data-focused work, with a small off-the-clock photo collection.

## What's inside

- A responsive, pale-green design with an introduction, selected projects, education, and experience.
- Eight project case studies covering geospatial product development, flight-delay simulation, SQL, insurance pricing, NLP data preparation, product research, budget modeling, and forecasting data quality.
- Project-specific conclusion visuals, including an insurance research poster.
- Direct presentation, report, workbook, and notebook attachments.
- Personal photos with a pose switcher and a keyboard-accessible full-photo viewer.
- A downloadable resume.

## Stack

React 19, TypeScript, and the Next.js App Router API, running on [Vinext](https://github.com/cloudflare/vinext), Vite, and a Cloudflare Worker.

## Run locally

Requires Node.js 22.13 or newer and the pnpm version declared in package.json.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by the development server.

## Build and test

```sh
pnpm build
pnpm exec node --test tests/rendered-html.test.mjs
```

The tests cover all eight case studies, project attachments, the resume asset, and the Flight case-study values against its report.

## Structure

```text
app/
  page.tsx                         Introduction and professional background
  portfolio-board.tsx              Project tabs and personal photo interactions
  projects.ts                      Case-study facts and attachment links
  projects/[slug]/page.tsx          Case-study pages and document previews
  projects/[slug]/project-insight.tsx
                                   Project-specific conclusion visuals
  globals.css                      Shared visual system and responsive layouts
public/
  personal/                        Portfolio photography
  work/                            Project documents and notebooks
  Binbo_Xu_Resume.pdf               Resume
tests/
  rendered-html.test.mjs            Rendered content and asset regression tests
worker/
  index.ts                         Worker entry point
```

## Publication and access

This is a public source snapshot of the portfolio. It does not change the visibility of the separately hosted website and does not enable GitHub Pages.

Private hosting identifiers, runtime files, local caches, and prior private deployment history are not included. The WildPath demo password is deliberately omitted; access to that separate demonstration remains independently controlled.

Project slides, reports, notebooks, photographs, and the resume are included as portfolio evidence. This repository does not grant an open-source license for those materials.

## Contact

[LinkedIn](https://www.linkedin.com/in/binboxu) · [Email](mailto:binboxu01@hotmail.com)
