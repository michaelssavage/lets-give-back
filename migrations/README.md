Ran `npx tsx scripts/seed-projects.ts`

Then applied: wrangler d1 execute auth --file=migrations/seed_projects.sql --local  
And remote: wrangler d1 execute auth --file=migrations/seed_projects.sql

## 0006 – Foróige projects

Upload the images to R2 first, then apply the migration:

```sh
for f in bailieborough-bench-build bailieborough-bench-frames bailieborough-bench-legs bailieborough-bench-team \
         cootehill-drilling cootehill-bird-boxes cootehill-bird-table cootehill-kit-box; do
  wrangler r2 object put "media/projects/$f.jpg" --file "public/projects/$f.jpg" --content-type image/jpeg --remote
done
wrangler d1 execute auth --file=migrations/0006_seed_foroige_projects.sql --remote
```
