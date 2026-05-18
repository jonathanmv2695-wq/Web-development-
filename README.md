# Web-development-

Websites to test.

## HWY 99 Cannabis Co. — single-page homepage

Single-page glassmorphism homepage built for a dispensary on Highway 99 in
Eugene, Oregon. Pure HTML / CSS / vanilla JS — no build step. Open
`index.html` directly, or serve the folder:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Sections (top-to-bottom, one scrolling page)

1. **Age gate** — 21+ confirmation (sessionStorage-remembered)
2. **Sticky glass nav** — brand, links, "Shop Menu" CTA
3. **Hero** — headline + roadside-sign logo card
4. **Daily Deals** — Mon→Sun grid, today's deal auto-highlighted
5. **Featured Strains** — 3 rotating picks with THC/CBD/terps stats
6. **Shop Categories** — Flower, Pre-Rolls, Edibles, Concentrates, Vapes, Gear
7. **Story** — about the shop + the four pillars
8. **Visit** — hours, real Eugene address, embedded Google Map, directions
9. **Footer** — brand, link columns, legal copy

### Files

- `index.html` — markup (single page)
- `styles.css` — earthy palette + glassmorphism primitives + photo background scene
- `script.js` — age gate, mobile nav, today's-deal highlight, scroll reveal
- `assets/logo.svg` — recreated highway-shield logo
- `PROMPT.md` — three-paragraph creative brief that guided the design
