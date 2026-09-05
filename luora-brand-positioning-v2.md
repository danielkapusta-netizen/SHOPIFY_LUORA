# Luora — Brand Positioning v2
> Status: Formalizes the direction from `luora-website-redesign-concept-v2.md` as brand positioning, not just a page layout
> Supersedes (for digital/web only): `luora-brand-guidelines.md` §01–02, §04, §08 · `luora-brand-style-guide.md` §visual_identity
> Version: 2026-08 · For: luora.pl

---

## 00 — What This Document Does

Everything about *who Luora is for and why* stays exactly as written in `luora-brand-guidelines.md` and `luora-brand-context.md` — audience, price range, product catalogue, competitive position, SC– system. What changes is *how that gets expressed visually and verbally on the web*: from warm-editorial-boutique to monochrome-precision. This document is the reference the coded build should work from. Nothing here requires re-deriving the audience or re-picking products — that groundwork stands.

---

## 01 — Positioning Statement (unchanged)

```json
{
  "positioning_core": {
    "category": "Curated K-beauty boutique",
    "market_position": "Above mass-market K-beauty resellers, below clinical/pharmaceutical brands",
    "price_range_pln": { "min": 46, "max": 120 },
    "primary_market": "Poland",
    "competitive_advantage": "Editorial curation, authentic Korean sourcing, ingredient-forward communication",
    "audience_tiers": [
      { "tier": "Primary", "name": "The Informed Enthusiast", "age": "25–35" },
      { "tier": "Secondary", "name": "The Curious Upgrader", "age": "28–42" },
      { "tier": "Tertiary", "name": "The Gift Buyer", "age": "Any" }
    ]
  }
}
```

None of this moved. What moved is the aesthetic register the same positioning gets expressed in.

---

## 02 — The Shift: From Boutique Warmth to Curatorial Precision

`luora-brand-guidelines.md` names **quiet confidence** as a core value: *"No hard selling, no hype. The tone is assured, never desperate."* The original visual system (warm ivory, sand gold, editorial fashion photography) expressed that value as *warmth* — a knowledgeable friend's living room. That's one legitimate reading of quiet confidence.

The direction now is a different, equally legitimate reading of the same value: confidence expressed through **restraint and precision** rather than warmth — closer to how Apple demonstrates confidence by removing everything that isn't the product, and trusting the product to carry the page. Nothing about *what* Luora believes changed. What changed is which half of "quiet confidence" the site leads with — quiet, over confidence-as-warmth.

This is the throughline for every decision below: **when in doubt, cut, don't decorate.** Apple's design principle "Simplicity — not minimalism" is the working standard — every element on the page has to earn its place by serving the core purpose (show the curation, let someone buy), not by looking sparse for its own sake.

---

## 03 — Visual System v2

```json
{
  "chrome": {
    "background": "#FFFFFF — pure white, the only background color on the site",
    "text": "#000000 — pure black, all text",
    "secondary_text": "black at 55% opacity — no new hue introduced for hierarchy",
    "hairlines": "black at 12% opacity — dividers, borders",
    "accent_color": "none — no gold, no sand, no color accent anywhere in UI chrome"
  },
  "product_photography": {
    "rule": "Full, true color — never desaturated or forced monochrome",
    "rationale": "This is the Apple.com model: the chrome (nav, type, layout, background) is strictly black-and-white, but product photography is the one place color exists on the page, because a skincare customer needs to see the real cream texture and packaging color to trust a purchase. Stripping color from product photos would hurt conversion, not just aesthetics.",
    "practical_effect": "A white jar, a green serum bottle, a pink BB cream shade — all photograph true. The white canvas around them is what makes the product read as the only thing worth looking at."
  },
  "sc_code": {
    "treatment": "Black, Cooper Hewitt, small caps / letter-spaced label — no gold accent",
    "still_functions_as": "An editorial device (per luora-brand-guidelines.md §07) — the monochrome treatment doesn't remove its meaning, just its color"
  },
  "typography": {
    "SUPERSEDED_2026_09_05": "Display face is now Playfair Display (playfair_display_n7, Shopify-hosted), replacing Cooper Hewitt. Body is Jost (jost_n4), set in the theme editor. The 'typefaces_unchanged' line below records the v2 decision at the time and is no longer current.",
    "typefaces_unchanged": "Cooper Hewitt (display) + Montserrat (body) — no font change",
    "discipline_added": "Size-specific tracking and leading (tight/negative tracking at large display sizes, near-zero to slightly positive at body/label sizes) — see luora-website-redesign-concept-v2.md §04 for exact values"
  }
}
```

**Scope of this palette change:** digital/web only for now (luora.pl). Packaging, Instagram templates, and physical brand touchpoints keep the Ink Black / Warm Ivory system from `luora-brand-guidelines.md` until a deliberate decision is made to extend monochrome there too. Splitting it this way isn't indecision — a product photographed on white for the website and packaged in ivory/black in hand are not in conflict; many premium brands run a stricter web palette than their packaging.

---

## 04 — Voice Shift: From Story to Statement

The existing voice rules in `luora-brand-guidelines.md` §08 (confident, informed, no exclamation marks, ingredient-first) all still apply. What tightens is *length*. Compare:

| v1 (boutique warmth) | v2 (curatorial precision) |
|---|---|
| Three-sentence brand story + a bulleted list of three abstract values (Curation over volume / Authenticity / Quiet confidence) | One sentence. The product grid above it does the proving; the sentence doesn't have to. |
| Homepage hero + a separate proof-strip bar (21 products · 9 brands · 13 ingredients) | Proof folded into one small line under the CTA — present, not staged |
| SC– system explained in its own section with sample tags | SC– system shown working, next to real products, unexplained in prose |

The rule going forward: **if a sentence can be cut without losing information the visitor needs to decide or trust, cut it.** This isn't "write less" as a style tic — it's the same standard Apple applies to copy: plain language, no jargon, and every word has to justify the space it takes on a page that's otherwise empty.

**Example — updated hero, in the new register:**
> Koreańska pielęgnacja. Bez kompromisów.
> Wyselekcjonowana kolekcja produktów od marek, którym ufamy.
> [Zobacz kolekcję]

No added adjectives, no second paragraph. The whiteness around it is doing rhetorical work the old warm-ivory hero used soft imagery to do.

---

## 05 — What Stays Exactly the Same

- Audience personas, price positioning, primary/secondary markets (`luora-brand-guidelines.md` §01–03)
- SC– product code system and its underlying philosophy (§07) — only the color treatment changes
- Product catalogue, ingredient data, all 21 SKUs (`luora-product-catalogue.md`) — unchanged
- Core values: curation over volume, authenticity, quiet confidence, ingredient literacy — unchanged in substance, §02 above just reframes which value gets top billing visually
- Competitive positioning vs. Allegro resellers, YesStyle, drugstores (`luora-brand-context.md`) — unchanged

---

## 06 — What's Explicitly Out of Scope Here

- **Packaging** — stays Ink Black / Warm Ivory per existing guidelines until a separate decision is made
- **Instagram visual templates** — stays as documented in `luora-brand-style-guide.md` for now; a monochrome Instagram grid is a bigger decision (it's the brand's most-seen surface) and deserves its own conversation, not an inherited default from the website
- **A full rewrite of `luora-brand-guidelines.md`** — this document is the working reference for the build; formal edits to the source guideline files come after the direction is validated on the live site, not before

---

*Luora Brand Positioning v2 — 2026 · Reference for the coded homepage build · Companion to: luora-website-redesign-concept-v2.md · luora-brand-guidelines.md · luora-brand-context.md · luora-product-catalogue.md*
