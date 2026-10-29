# wahyuunt97.github.io

Wahyu Untoro's portfolio. A static page (HTML, CSS, ES modules, three.js from jsDelivr) that replaced the Flutter build. It reads the Decap CMS content in `assets/assets/content/`, so projects edited in `/admin` show up after a data rebuild.

> **Deploy warning:** the workflow in `wahyuunt97/wahyu_portfolio` (`.github/workflows/deploy.yml`) builds Flutter and overwrites this whole repo on every push to its `main`, including CMS saves. Until that workflow changes, the next CMS edit puts the old Flutter site back.

## Run

```bash
python3 -m http.server 8765   # from the repo root, then open http://localhost:8765/
```

## Update the data

```bash
node scripts/build-data.mjs
```

It reads `assets/assets/content/projects/*.md` and `profile.json` and writes `data/`. Content the CMS doesn't hold lives in `content/profile.overrides.json`: the current WHY Production role, edits to older roles, the credential tags, the highlighted projects, the itch.io link for each game, and the contact links.

`highlights` sets the first projects, in order: the first 5 are the cards fanned out in the header, the first 6 lead the grid. The rest of the grid is sorted by completeness (video, links, written detail, tech stack), with CMS `priority` as the tie-breaker. "Show N more" reveals them.

## SEO

- Title, description, canonical, Open Graph and Twitter tags, and a `ProfilePage` + `Person` JSON-LD block live in `index.html`, all pointing at `https://wahyuunt97.github.io/`.
- `og.png` (1200×630) is a screenshot of the hero. Regenerate it after visual changes, with the local server running:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --use-angle=swiftshader --force-prefers-reduced-motion --hide-scrollbars --window-size=1200,630 --virtual-time-budget=6000 --screenshot="$PWD/og.png" http://localhost:8765/`
- `robots.txt` and `sitemap.xml` are at the root.
- The stack list and the email link are plain HTML, so crawlers that don't run JavaScript still see them.
- `flutter_service_worker.js` is a kill switch. Returning visitors still have the old Flutter service worker. When their browser checks for an update, this file clears its caches and unregisters it, so they get the new page. Keep the file until old visitors have cycled through.

## Design decisions (antislop R-31)

Design Read: personal portfolio for studios and clients hiring a game developer, in the dark arcade-terminal language of the owner's itch.io page, with dials ENERGY 3 / RHYTHM 3 / MOTION 3.

- **Color**: near-black, signal yellow `#ffd60a`, and cyan `#22d3ee` for prompts and tags, taken from the itch.io theme so both pages read as one identity. Yellow is the one accent.
- **Dark only, no toggle**: the itch.io page and the games are dark. That brand continuity is the reason (R-21).
- **32px grid background**: carried over from the itch.io backdrop for identity, kept at 3% opacity (R-07).
- **Type**: Space Grotesk and JetBrains Mono are the itch.io theme's fonts. Mono is used only for small prompt labels, never for large headings (R-06).
- **Identity motif**: every section label is a shell prompt (`$ ls ./projects`, `$ tail experience.log`, `$ open contact`). The hero typing line is a single prompt line, not a terminal window. The owner chose this over the full-window version (R-05, override recorded).
- **Favicon**: "WU" initials as yellow strokes on black, drawn as paths so they don't depend on a font. Requested by the owner.
- **Card deck (three.js)**: the header's focal point. Games are played with cards, and dealing a random project is the one playful action on the page. Hover lifts a card, click opens it, and "Shuffle & deal" runs gather, riffle, cut, riffle, deal.
- **Project cards**: uniform on purpose. It's a catalog of equal-weight entries, like the itch.io grid. Hover tilts the card toward the pointer and shows corner brackets and scanlines.
- **Green status dot**: the only green on the page, used only for "Open to remote work", because availability is the first thing a recruiter looks for.
- **Motion**: the header button pauses every loop (typer, idle deck sway, blinking dots). `prefers-reduced-motion` starts paused and makes the shuffle instant.
- **States**: the grid has loading (shimmer cards), error (with Retry) and empty (per filter) states. Without WebGL the deck falls back to a text deal.
