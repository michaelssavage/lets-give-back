# AGENTS.md

Only add what can't be derived from the code, config or git history.

## Checks

`pnpm exec tsc --noEmit -p . && pnpm lint`

## Data

- Dev uses the local D1/R2. Never write to production (`--remote`); the owner copies content to prod.
- Project dates read like `8 November 2025`.

## Facebook posts in `tasks/` → projects

1. Remove emojis and hashtags. Keep names, places and funders.
2. Resize photos: `sips -Z 1200 -s format jpeg -s formatOptions 75 in.jpg --out public/projects/<place>-<subject>.jpg`
3. Upload to local R2 under `projects/` and insert the row locally. Example: `migrations/0006_seed_foroige_projects.sql`.
4. If the date or Facebook link is missing, say so.

## Design and copy

Before changing UI or copy, read the matching doc in `docs/` and check the change against it:

- `docs/conceptual-patterns.md`: copy and content (C1–C7). Every match is a defect.
- `docs/structural-patterns.md`: page layout and section order (S1–S9).
- `docs/visual-patterns.md`: colour, type, spacing, effects (V1–V9).

For S and V patterns, check "When it's not slop" before treating a match as a problem.

- Facts over emotional beats. No slogans or filler.
- No decorative icons on cards.
- No coloured or italic words in headings.
- No drop shadows; use `border border-black`.
- `rounded-sm` for cards and images, `rounded-md` for buttons and inputs.
- Use real project photos.
