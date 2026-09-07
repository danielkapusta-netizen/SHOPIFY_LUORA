# Phase 1 — SEO Structure (Brand Axis): Final Report

Store: luora.pl. Run date: 2026-09-07. All changes made via the Shopify Admin GraphQL API (live-authenticated MCP connector), verified against the live storefront. Full call-by-call log: `./logs/phase1-20260907T153321Z.log`. Pre-mutation snapshots: `./backup/20260907T153321Z/`.

## Before / after

| Area | Before | After |
|---|---|---|
| Brand navigation | None — no brand collections, no "Marki" menu item | 16 brand collections (NIDA + 15 others), "Marki" in main menu and footer, `/pages/marki` hub page |
| NIDA product handles | 3 products with literal `™`/`α` in handle, breaking URLs/feeds | All 3 fixed, old URLs 301-redirect to new handles (verified live) |
| `vendor` field data quality | Undocumented — assumed usable as-is | Audited: 16 real brands clean, 9 products mislabeled `vendor="Luora"`, 7 mislabeled with a product category. Not modified (out of scope); collections built around it instead (see below) |
| Existing 16 collections (oczyszczanie, tonery, serum, …) | — | Untouched, confirmed unchanged in post-run snapshot |
| Product page vendor link | N/A | Confirmed the theme never links vendor to `/collections/vendors?q=` — no fix needed, no theme touched |

## Step 1 — Vendor audit

73 products, 22 distinct `vendor` values. Full data: `./out/vendors.json`. Key finding, confirmed with you before proceeding: 16 products (22% of catalog) had unusable vendor values — 9 tagged `vendor="Luora"` (the store name) and 7 tagged with a product category (`"BB Cream"`, `"Face Cream"`, `"Foam Cleanser"`, `"Sleeping Mask"`, `"Serum"`, `"Color Correcting Cream"`) instead of a brand. No spelling-variant issues found among the 16 real brand values. No empty/whitespace vendors.

## Step 2 — Handle fixes (3, not 2)

You confirmed fixing a third malformed handle discovered during the audit, alongside your original two:

| Product | Old handle | New handle | Redirect | New URL |
|---|---|---|---|---|
| NIDA Youthful Formula™ Ultimate Moisturizing Cream | `nida-youthful-formula™-ultimate-moisturizing-cream-100-ml` | `nida-youthful-formula-ultimate-moisturizing-cream-100-ml` | 301 ✓ | 200 ✓ |
| NIDA α-Arbutin TXA Pure Tone Serum 50 ml | `nida-α-arbutin-txa-pure-tone-serum-50-ml` | `nida-alfa-arbutyna-txa-pure-tone-serum-50-ml` | 301 ✓ | 200 ✓ |
| NIDA Youthful Formula™ Yam Mucin ABCE Facial Cream 55 ml | `nida-youthful-formula™-yam-mucin-abce-facial-cream-55-ml` | `nida-youthful-formula-yam-mucin-abce-facial-cream-55-ml` | 301 ✓ | 200 ✓ |

Titles, descriptions, images, tags, prices untouched. Verified via `urlRedirects` query and live `curl -I` on all six URLs.

## Step 3 — NIDA collection

You confirmed the collection should show **6** products (not the catalog's 7 `vendor="NIDA"` products). Rule: `vendor EQUALS "NIDA" AND product_type NOT_EQUALS "Pielęgnacja ust"` — cleanly excludes only the Overnight Lip Mask (a lip product, never mentioned in the copy), landing on exactly 6. Published to Online Store. Copy pushed verbatim, no edits. Verified: `/collections/nida` → 200, 6 products, `<title>` and `<h1>` render as specified.

**Follow-up edit (post-launch):** at your request, shortened `descriptionHtml` — removed the "Co wyróżnia formuły NIDA" ingredient/PPM list entirely, kept the intro paragraph and "Dla kogo" section verbatim, and replaced the generic routine section with a new "Gotowe rutyny NIDA" section containing two concrete product bundles built from the 6 real products in the collection (regeneration/firmness bundle: Salmon PDRN Peptide Serum + Revive Eye Cream + Youthful Formula™ Ultimate Moisturizing Cream; pigmentation bundle: α-Arbutin TXA Pure Tone Serum + Youthful Formula™ Yam Mucin ABCE Facial Cream). `seo.title`/`seo.description`/`ruleSet`/`sortOrder`/`handle` unchanged. Verified live (after CDN cache refresh) — old text gone, new sections present.

## Step 4 — Remaining 15 brand collections

Built on your confirmed approach: where Step 1 found mislabeled products, each collection's rule is `VENDOR EQUALS "<brand>" OR TITLE STARTS_WITH "<brand>"` (disjunctive) so the collection reflects the true brand without touching any product data. Where no strays existed, a single `VENDOR EQUALS` rule was used.

| Brand | Handle | Products | Published? |
|---|---|---|---|
| Anua | anua | 11 | Yes |
| VT Cosmetics | vt-cosmetics | 11 | Yes |
| Arencia | arencia | 8 | Yes |
| Medicube | medicube | 7 | Yes |
| Centellian24 | centellian24 | 6 | Yes |
| ROUND LAB | round-lab | 5 | Yes |
| Purito | purito | 4 | Yes |
| Numbuzin | numbuzin | 5 | Yes |
| Dr. Jart+ | dr-jart | 2 | Yes |
| SKIN1004 | skin1004 | 2 | Yes |
| COSRX | cosrx | 1 | No (<2 products) |
| Isntree | isntree | 1 | No (<2 products) |
| KOPHER | kopher | 1 | No (<2 products) |
| HaruHaru Wonder | haruharu-wonder | 1 | No (<2 products) |
| Some By Mi | some-by-mi | 1 | No (<2 products; also has no usable `vendor` value at all — rule is title-only) |

**Correction to the dry-run plan**: Numbuzin actually has 5 matching products, not the 4 stated in `phase1-dryrun-plan.md` (an arithmetic slip on my part when drafting the table — the live OR rule correctly caught both of its mislabeled strays). All other counts matched the plan exactly, verified live via `curl` (200 for all 10 published, 404 for all 5 unpublished) and confirmed present in `/sitemap_collections_1.xml` (the 5 unpublished ones correctly absent).

`./out/brand-copy-draft.md` has full draft copy for all 15 — **not pushed to Shopify**; every collection's live `seo.description` and `descriptionHtml` are still empty pending your edits and a future `--push-copy` pass.

## Step 5 — Navigation

- New page `/pages/marki`, title "Koreańskie marki kosmetyczne", SEO title set via the `global.title_tag` metafield (Shopify's `Page` object has no separate SEO input field in this API version — this metafield is the standard mechanism). Body lists the 11 published brand collections, alphabetical.
- Main menu: "Marki" inserted between "Sklep" and "Zestawy pielęgnacyjne", 11 children (alphabetical). Verified live: homepage HTML contains "Marki" in the nav; every pre-existing menu item (all IDs) is preserved — confirmed by diffing the pre-mutation `backup/.../menus.json` snapshot against the live menu after the update.
- Footer menu: same "Marki" item with the same 11 children appended after the 3 existing items (O nas, Kontakt, Instagram) — all preserved.

## Step 6 — Duplicate vendor pages

**No fix needed, no theme touched.** Pulled the actual live theme's files via the Admin API (theme "Luora v2 — Curatorial Precision", the MAIN theme) rather than trusting the git mirror. Checked every file referencing `vendor` (`snippets/card-product.liquid`, `snippets/facets.liquid`, `sections/main-collection-product-grid.liquid`, `sections/related-products.liquid`, `sections/featured-product.liquid`, `sections/main-product.liquid`): vendor is rendered as plain text in a `show_vendor` toggle (default off) or used as a hidden search-query field in facets — **nowhere is it linked to `/collections/vendors?q=`**. This theme doesn't have the duplicate-page problem the task describes (likely already addressed in this custom Dawn derivative). No duplicate theme was created since there was nothing to edit.

## Step 7 — Verification summary

| Check | Result |
|---|---|
| All 10 published brand collections + NIDA return 200 with expected product count | ✓ |
| All 5 unpublished brand collections return 404 | ✓ |
| `/collections/nida` = exactly 6 products | ✓ |
| Both original NIDA URLs (+ the 3rd fixed one) return 301 to new handles | ✓ |
| "Marki" renders in live main-menu HTML | ✓ |
| No pre-existing menu item lost (main or footer) | ✓ (diffed against pre-mutation backup) |
| New collections appear in `/sitemap_collections_1.xml` | ✓ (all 11 published ones present; 5 unpublished correctly absent) |
| Structured data present | ✓ — `application/ld+json` (Organization + Product schema) present on both a collection page and a product page. Full Google Rich Results Test submission not run (requires a browser tool this session doesn't have) — the JSON-LD blocks themselves parse as valid schema.org markup by inspection |
| 16 pre-existing named collections unchanged | ✓ (confirmed against `backup/.../collections.json`) |
| No product modified beyond the 3 handle fixes | ✓ |

## Flagged but not fixed (needs your input)

1. **16 products with unusable `vendor` values** (9× `"Luora"`, 7× a category value) — see `./out/vendors.json` for the exact list. Collections now correctly include them via title-matching, but the underlying product data is still wrong and will keep causing problems (e.g. Shopify's own storefront vendor filter/facets, POS, any app reading `vendor`) until fixed. Recommend a Phase 2 pass to correct `vendor` on these 16 products directly.
2. **5 single-SKU brands left unpublished**: COSRX, Isntree, KOPHER, HaruHaru Wonder, Some By Mi. Collections exist and are correctly ruled, just hidden from the storefront and excluded from the "Marki" page/menu until they have ≥2 products or you choose to publish anyway.
3. **`brand-copy-draft.md` needs your edit pass** before a `--push-copy` run — includes 5 sections marked `TODO: needs input` (the five unpublished thin brands) where I didn't have enough catalog depth to write a full narrative without padding.
4. **Some By Mi has no vendor tag at all** in Shopify — its one product is mislabeled `vendor="Face Cream"`. Its collection rule is title-only (`TITLE STARTS_WITH "Some By Mi"`), which is more fragile long-term than a vendor-based rule.
5. **Standalone reusable script**: per your go-ahead earlier in this session, all of Phase 1 was executed directly through the live-authenticated Shopify MCP connector rather than a standalone `SHOPIFY_STORE_DOMAIN`/`SHOPIFY_ADMIN_ACCESS_TOKEN`-driven CLI script with `--dry-run`/`--apply` flags, since no token was available in this sandbox. If you want that literal reusable script (for CI or future headless re-runs), that's a follow-up task once a real Admin API token is supplied.
6. **Rich Results Test**: I confirmed valid-looking JSON-LD is present, but didn't run an actual submission to Google's tool (no browser available this session). Worth a quick manual check if you want full confidence.

## Everything else confirmed untouched
Product titles, descriptions, prices, inventory, images, reviews app, Merchant Center, Search Console, and blog content were not touched, per your explicit Phase 2 exclusions.
