# Luora — Website Redesign Concept v2
> Supersedes: `luora-website-redesign-concept.md` (v1, Purito-inspired structure)
> Direction change: monochrome palette · radical simplification · Apple design principles applied
> Version: 2026-08 · For: luora.pl · Status: concept only — no code yet, build comes next

---

## 00 — What Changed and Why

v1 translated Purito's structure into Luora's existing brand system and ended up with nine homepage sections — hero, proof strip, SC– philosophy, four ingredient blocks, concern grid, best-sellers, brand story, social strip, footer. Direction now:

1. **Cut it down.** Too many things competing for attention.
2. **Color: pure white background, black text.** A deliberate departure from the written guideline in `luora-brand-guidelines.md` §04 ("never use pure white — always Warm Ivory"). Noted here as an intentional brand-direction change, not an oversight — worth formally updating the guideline doc once this ships.
3. **Apple design principles**, not Purito's structure, now drive the layout logic.

The relevant Apple principle for the "too many things" problem is **Simplicity — not minimalism**: *"Strip the unnecessary so the core purpose shines; burying everything in one place looks minimal but isn't simple."* That's the test applied to every section below — not "does this look sparse," but "does removing this make the core purpose clearer, or does it just hide something the visitor still needs?" Ingredient education and concern-based browsing are real and valuable — they move to their own pages instead of disappearing, per Apple's *"show the common path first, advanced options one level deeper."*

---

## 01 — Color System v2

```json
{
  "color_v2": {
    "background": { "name": "White", "hex": "#FFFFFF", "role": "Only background color. No ivory, no sand, no dark sections." },
    "text_primary": { "name": "Black", "hex": "#000000", "role": "Headlines, body, wordmark" },
    "text_secondary": { "name": "Black, 55% opacity", "hex": "rgba(0,0,0,0.55)", "role": "Captions, metadata, secondary copy — a tint of black, not a new hue" },
    "hairline": { "name": "Black, 12% opacity", "hex": "rgba(0,0,0,0.12)", "role": "Dividers, card borders, table rules" },
    "inverted_moments": { "name": "Black fill / White text", "role": "Reserved for one or two high-emphasis moments only (e.g. primary CTA button) — not full sections" }
  },
  "rules": [
    "No sections with black backgrounds — v1's alternating black/ivory sections are gone",
    "No Sand Gold, no Desert Sand, no Warm Gray as named colors — all secondary hierarchy comes from black at reduced opacity",
    "SC– codes lose their gold accent color and become black, set apart by weight/size only (Cooper Hewitt, small caps) — the code still reads as a device, just monochrome",
    "The only fill color anywhere is black; the only surface is white"
  ]
}
```

**Flag for the brand docs:** if this direction ships, `luora-brand-guidelines.md` §04 and the "ai_image_generation_overrides" note in the style guide should be updated to reflect the new rule — right now both explicitly protect Warm Ivory as the only background. Worth a deliberate decision on whether this monochrome direction is homepage-only or replaces the palette everywhere (packaging, Instagram, product photography backgrounds).

---

## 02 — What Gets Cut, Kept, or Demoted

| v1 section | v2 decision | Why |
|---|---|---|
| Hero | **Kept, tightened.** One headline, one line, one CTA. Proof-strip stats folded into a single small line under the CTA instead of their own bar. | Core purpose: say what Luora is, in one breath. |
| Proof strip (21 products · 9 brands…) | **Merged into hero**, no longer a standalone section. | A stat bar competing with the hero for the first screen is exactly the "too many things" problem. |
| SC– philosophy section (full section, sample tags) | **Cut as a section. Reduced to one sentence**, placed near the product grid where the code is actually visible. | The *idea* is worth keeping, an essay-length section explaining it isn't — show the code doing its job rather than explaining the concept in prose. |
| 4 ingredient hero blocks | **Moved off the homepage** to a dedicated `/skladniki` page linked from the nav. | Real content, wrong location — this is Apple's "advanced options one level deeper," not a deletion. |
| Concern grid (6 cards) | **Moved into the product page as a filter**, not a homepage section. | Same logic — it's a shopping tool, not a homepage statement. |
| Best sellers / SC– Wybrane | **Kept, shrunk.** 4 products instead of 6, no decorative icon panel — just the product, code, name, price. | This is the actual job of the homepage: let someone see what's for sale. |
| Brand story (split layout + 3 value bullets) | **Kept, cut to one short paragraph.** No bulleted value list. | One honest sentence beats three abstract nouns ("Curation over volume," "Authenticity," "Quiet confidence") that don't mean anything until proven — and the product grid above it is the proof. |
| Instagram / social strip | **Cut from homepage.** Instagram link moves to the footer only. | Not essential to the core purpose of a shopping homepage; a grid of placeholder tiles was decoration, not function. |
| Footer | **Kept, minimal.** | Needed for wayfinding (Apple: *"Where can I go? How do I get out?"*). |

**Net result:** nine sections become four — Hero, Selected Products, one-line Brand Statement, Footer. Everything cut still exists; it moved to where someone looking for it would go, not off the site.

---

## 03 — New Homepage Structure

```
NAV        LUORA          Sklep · Składniki · O nas          [cart]

HERO       Koreańska pielęgnacja. Bez kompromisów.
           Wyselekcjonowana kolekcja produktów od marek, którym ufamy.
           [Zobacz kolekcję]
           21 produktów · 9 marek · źródła z Korei   ← one small line, not a bar

SELECTED   "Wybrane z kolekcji."
           4 products. Each: SC–code (black, small caps) · name · price.
           No icon panels, no decorative framing — the product is the content.

STATEMENT  "Nie sprzedajemy stu marek — wybieramy dziewięć.
            Każdy produkt przechodzi przez naszą selekcję, zanim trafi do sklepu."
           [Poznaj naszą selekcję →]  (links to /o-nas, full story lives there)

FOOTER     LUORA          O nas · Kontakt · Instagram          © 2026
```

Everything else from v1 — ingredient education, concern-based browsing, full brand story, SC– philosophy — becomes real content on `/skladniki`, `/sklep` (with concern filters), and `/o-nas`, reachable from the three nav links. The homepage's only job is: say what Luora is, show what's for sale, say why to trust it, get out cleanly.

---

## 04 — Typography, Applied With Apple's Discipline

Same typefaces as before — Cooper Hewitt (display) and Montserrat (body) aren't being replaced, just disciplined the way Apple disciplines type at every size:

```json
{
  "typography_v2": {
    "principle": "Tracking and leading are size-specific, never one fixed value across the scale (Apple Design §15).",
    "display_large": {
      "use": "H1 hero headline",
      "tracking": "-0.02em (tightened — large type reads too loose at 0)",
      "leading": "1.05 (tight, large text doesn't need room to breathe between lines)"
    },
    "display_medium": {
      "use": "H2 section headers",
      "tracking": "-0.01em",
      "leading": "1.15"
    },
    "body": {
      "use": "Paragraphs, product names",
      "tracking": "0em to +0.005em (small text wants slightly positive tracking for legibility, not negative)",
      "leading": "1.7"
    },
    "label": {
      "use": "SC– codes, eyebrows, nav",
      "tracking": "+0.08em to +0.12em, uppercase, small size",
      "leading": "1"
    },
    "hierarchy_rule": "Build hierarchy from weight + size + leading together, not size alone — a Cooper Hewitt Bold label at small size can outrank a Regular headline if the moment calls for it."
  }
}
```

---

## 05 — Interaction Principles for the Build (for next phase, not this doc)

When this becomes code, carry over from Apple Design:

- **Buttons respond on press, not release** — instant `:active` state, no waiting for click-up.
- **Hover/press feedback uses a critically-damped spring feel** (snap to state, no bounce) — reserve any overshoot for genuinely momentum-driven interactions (a dragged carousel), not a button fade.
- **Nav bar, if sticky, is a translucent material** (`backdrop-filter: blur()`) over content scrolling underneath, not a hard-edged opaque bar — but since the palette is now pure white-on-white, this needs a hairline or shadow-on-scroll instead of a color shift to stay legible (§12's "never stack a light translucent surface on another" applies directly: white blur over a white page needs an edge cue).
- **Reduced motion:** cross-fade instead of slide/spring for anyone with `prefers-reduced-motion` set; no exceptions.
- **Wayfinding stays intact** even with less on the page: every screen should still answer *where am I, where can I go* — the leaner nav (Sklep · Składniki · O nas) needs to carry that weight now that homepage sections aren't doing it implicitly.

---

## 06 — Open Decisions Before Build

A short list — not blocking, just worth a yes/no before code starts:

1. **Is monochrome homepage-only, or does it replace Ink Black/Warm Ivory everywhere** (packaging, Instagram templates, product photography backgrounds)? This doc assumes homepage-only unless told otherwise.
2. **SC– accent color:** dropped to black-only per §01. Confirm that's right, or if a single restrained accent (even a grayscale one) should survive for the product code specifically.
3. **Cooper Hewitt + Montserrat stay** — not being replaced, only disciplined per §04. Confirm no typeface change was intended alongside the color change.

---

*Luora Website Redesign Concept v2 — 2026 · Supersedes v1 structure, keeps v1's product data and catalogue mapping · Companion to: luora-brand-guidelines.md · luora-brand-style-guide.md · luora-brand-context.md*
