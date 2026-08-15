# Portfolio Signal Network

Interactive portfolio frontend built from [`PRD.md`](./PRD.md) and [`DESIGN.md`](./DESIGN.md).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Content to replace before publishing

- `YOUR NAME`, role, biography, location, and availability
- Lorem ipsum descriptions
- project titles, case-study details, results, stacks, demo URLs, and source URLs
- experience and skill evidence
- `hello@example.com`, GitHub, and LinkedIn links
- resume PDF and metadata
- contact-form endpoint

Audio is synthesized locally with the Web Audio API. It is opt-in, has a persistent mute preference, and uses no third-party music file.
