# Phase 1 — Steps 2-5 dry run (no writes performed)

Generated 2026-09-07 from live schema verification (`graphql_schema` on `Mutation`, `ProductUpdateInput`, `CollectionInput`, `PublicationInput`, `MenuItemUpdateInput`, `PageCreateInput`). Nothing below has been sent to Shopify yet.

## Step 2 — productUpdate × 3 (handle fixes)

All three use:
```graphql
mutation FixHandle($input: ProductUpdateInput!) {
  productUpdate(product: $input) {
    product { id title handle }
    userErrors { field message }
  }
}
```

| Product | id | old handle | new handle |
|---|---|---|---|
| NIDA Youthful Formula™ Ultimate Moisturizing Cream | 16472317854045 | `nida-youthful-formula™-ultimate-moisturizing-cream-100-ml` | `nida-youthful-formula-ultimate-moisturizing-cream-100-ml` |
| NIDA α-Arbutin TXA Pure Tone Serum 50 ml | 16472318935389 | `nida-α-arbutin-txa-pure-tone-serum-50-ml` | `nida-alfa-arbutyna-txa-pure-tone-serum-50-ml` |
| NIDA Youthful Formula™ Yam Mucin ABCE Facial Cream 55 ml | 16472318214493 | `nida-youthful-formula™-yam-mucin-abce-facial-cream-55-ml` | `nida-youthful-formula-yam-mucin-abce-facial-cream-55-ml` |

Each variables payload: `{"input": {"id": "gid://shopify/Product/<id>", "handle": "<new handle>", "redirectNewHandle": true}}`. No other fields set — title/description/tags/images untouched.

Post-apply verification: `urlRedirects` query for path containing old handles; `curl -I` old → expect 301; `curl -I` new → expect 200.

## Step 3 — NIDA collection

```graphql
mutation { collectionCreate(input: $input) { collection { id handle } userErrors { field message } } }
```
```json
{
  "input": {
    "handle": "nida",
    "title": "NIDA",
    "sortOrder": "BEST_SELLING",
    "ruleSet": {
      "appliedDisjunctively": false,
      "rules": [
        { "column": "VENDOR", "relation": "EQUALS", "condition": "NIDA" },
        { "column": "TYPE", "relation": "NOT_EQUALS", "condition": "Pielęgnacja ust" }
      ]
    },
    "seo": {
      "title": "NIDA kosmetyki koreańskie – serum PDRN i kremy | Luora",
      "description": "Poznaj kosmetyki NIDA – koreańską markę z formułami opartymi na PDRN, peptydach i retinalu. Serum, kremy i pielęgnacja pod oczy. Wysyłka z Polski."
    },
    "descriptionHtml": "<exact HTML block from task spec, verbatim, not re-typed here>"
  }
}
```
The `TYPE NOT_EQUALS "Pielęgnacja ust"` clause excludes only *NIDA Overnight Lip Mask Very Berry* (the only NIDA product of that type), giving exactly 6 matches as confirmed against live `productType` values. `collectionByHandle(handle:"nida")` currently returns `null`, so this is a create, not an update.

Followed by:
```graphql
mutation { publishablePublish(id: $collectionId, input: [{publicationId: "gid://shopify/Publication/358221480285"}]) { userErrors { field message } } }
```
(`358221480285` = "Online Store" publication, confirmed live.)

## Step 4 — 15 remaining brand collections

Same two-call pattern (`collectionCreate` then `publishablePublish` for published ones). `seo.description` and `descriptionHtml` left empty per spec. Handle = ASCII slug. Rule logic: single `VENDOR EQUALS` where the vendor field is clean; `appliedDisjunctively: true` with an added `TITLE STARTS_WITH "<brand>"` rule where Step 1 found mislabeled strays (vendor="Luora" or a category value) — this is my reading of your "option 1" answer (build true-brand collections without touching product data). Flag me now if you meant something else.

| Brand | handle | true count | rule | publish? |
|---|---|---|---|---|
| Anua | anua | 11 | VENDOR=Anua OR TITLE^="Anua" | yes |
| VT Cosmetics | vt-cosmetics | 11 | VENDOR=VT Cosmetics OR TITLE^="VT Cosmetics" | yes |
| Arencia | arencia | 8 | VENDOR=Arencia OR TITLE^="Arencia" | yes |
| Medicube | medicube | 7 | VENDOR=Medicube OR TITLE^="Medicube" | yes |
| Centellian24 | centellian24 | 6 | VENDOR=Centellian24 OR TITLE^="Centellian24" | yes |
| ROUND LAB | round-lab | 5 | VENDOR=ROUND LAB (no strays) | yes |
| Purito | purito | 4 | VENDOR=Purito OR TITLE^="Purito" (case-insensitive match expected to also catch "PURITO"-titled item; will confirm actual count post-apply) | yes |
| Numbuzin | numbuzin | 4 | VENDOR=Numbuzin OR TITLE^="Numbuzin" | yes |
| Dr. Jart+ | dr-jart | 2 | VENDOR="Dr. Jart+" OR TITLE^="Dr. Jart+" | yes |
| SKIN1004 | skin1004 | 2 | VENDOR=SKIN1004 OR TITLE^="SKIN1004" | yes |
| COSRX | cosrx | 1 | VENDOR=COSRX | **no** (<2) |
| Isntree | isntree | 1 | VENDOR=Isntree | **no** (<2) |
| KOPHER | kopher | 1 | VENDOR=KOPHER | **no** (<2) |
| HaruHaru Wonder | haruharu-wonder | 1 | VENDOR=HaruHaru Wonder | **no** (<2) |
| Some By Mi | some-by-mi | 1 | TITLE^="Some By Mi" (no usable vendor value exists at all) | **no** (<2) |

`seo.title` for each: `"<Brand> kosmetyki koreańskie | Luora"` (all ≤ 60 chars — longest is "HaruHaru Wonder kosmetyki koreańskie | Luora" at 45 chars).

Example payload (Anua):
```json
{
  "input": {
    "handle": "anua",
    "title": "Anua",
    "sortOrder": "BEST_SELLING",
    "ruleSet": {
      "appliedDisjunctively": true,
      "rules": [
        { "column": "VENDOR", "relation": "EQUALS", "condition": "Anua" },
        { "column": "TITLE", "relation": "STARTS_WITH", "condition": "Anua" }
      ]
    },
    "seo": { "title": "Anua kosmetyki koreańskie | Luora", "description": "" },
    "descriptionHtml": ""
  }
}
```

`./out/brand-copy-draft.md` already written (content only — not pushed to Shopify).

## Step 5 — Navigation

**New page** (`pageCreate`):
```json
{
  "page": {
    "title": "Koreańskie marki kosmetyczne",
    "handle": "marki",
    "isPublished": true,
    "body": "<ul><li><a href=\"/collections/anua\">Anua</a></li><li><a href=\"/collections/arencia\">Arencia</a></li><li><a href=\"/collections/centellian24\">Centellian24</a></li><li><a href=\"/collections/dr-jart\">Dr. Jart+</a></li><li><a href=\"/collections/medicube\">Medicube</a></li><li><a href=\"/collections/nida\">NIDA</a></li><li><a href=\"/collections/numbuzin\">Numbuzin</a></li><li><a href=\"/collections/purito\">Purito</a></li><li><a href=\"/collections/round-lab\">ROUND LAB</a></li><li><a href=\"/collections/skin1004\">SKIN1004</a></li><li><a href=\"/collections/vt-cosmetics\">VT Cosmetics</a></li></ul>",
    "metafields": [
      { "namespace": "global", "key": "title_tag", "type": "single_line_text_field", "value": "Koreańskie marki kosmetyczne | Luora" }
    ]
  }
}
```
(Page objects have no direct `seo` input field in this API version — SEO title is set via the standard `global.title_tag` metafield, confirmed against the live `Page`/`PageCreateInput` schema.) List includes only the 11 collections being published this run (10 brands + NIDA); the 5 unpublished thin brands are excluded from the hub page until they clear the ≥2-product threshold.

**Main menu** (`menuUpdate`, full array required — before/after diff):

Before: `Sklep` (with 3 sub-groups) → `Zestawy pielęgnacyjne` → `O nas`.

After: `Sklep` (unchanged) → **`Marki` (new)** → `Zestawy pielęgnacyjne` (unchanged) → `O nas` (unchanged).

New "Marki" item:
```json
{
  "title": "Marki",
  "type": "PAGE",
  "resourceId": "<new page id from pageCreate>",
  "items": [
    {"title":"Anua","type":"COLLECTION","resourceId":"<anua collection id>"},
    {"title":"Arencia","type":"COLLECTION","resourceId":"<arencia collection id>"},
    {"title":"Centellian24","type":"COLLECTION","resourceId":"<centellian24 collection id>"},
    {"title":"Dr. Jart+","type":"COLLECTION","resourceId":"<dr-jart collection id>"},
    {"title":"Medicube","type":"COLLECTION","resourceId":"<medicube collection id>"},
    {"title":"NIDA","type":"COLLECTION","resourceId":"<nida collection id>"},
    {"title":"Numbuzin","type":"COLLECTION","resourceId":"<numbuzin collection id>"},
    {"title":"Purito","type":"COLLECTION","resourceId":"<purito collection id>"},
    {"title":"ROUND LAB","type":"COLLECTION","resourceId":"<round-lab collection id>"},
    {"title":"SKIN1004","type":"COLLECTION","resourceId":"<skin1004 collection id>"},
    {"title":"VT Cosmetics","type":"COLLECTION","resourceId":"<vt-cosmetics collection id>"}
  ]
}
```
Every existing item (all 3 top-level items, all sub-items, all ids) is preserved as-is in the `items` array sent to `menuUpdate` — nothing dropped, only "Marki" inserted at index 1.

**Footer menu** (`menuUpdate`): same "Marki" item (parent + 11 children) appended after the existing 3 items (O nas, Kontakt, Instagram) — all 3 existing items preserved unchanged.

## Open items before I apply
1. Confirm the "option 1" reading above for the 16 mislabeled-vendor products (OR'd VENDOR/TITLE rules) is what you intended.
2. Confirm handle `dr-jart` for Dr. Jart+ (dropped the `+`/`.` per your ASCII-only slug rule — matches your own example list style).
3. Confirm Purito rule catching both "Purito" and "PURITO"-titled item is acceptable (I'll verify actual matched count immediately after creating it, before moving on).
4. Say "apply" (or similar) to execute Steps 2–5 for real.
