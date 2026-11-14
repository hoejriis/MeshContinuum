# Visual identity

The one reference for how MeshContinuum looks. The words are set in the [product message brief](PRODUCT_MESSAGING.md). The artwork is in [`brand/`](../brand).

## The mark: Continuum

A figure-of-eight loop through four nodes, alternating turquoise and violet, on a navy tile. One unbroken path through several places: radios, observers and sites that keep in touch. It is drawn from scratch for this project. It uses no MeshCore artwork.

**MeshContinuum** is the project's name, and **MECON** its short form. They are one brand: MECON appears under or after the name, never as a separate logo.

## Files

| File | Use |
|---|---|
| `mark.svg` | The master: the mark on its navy tile. Anywhere from 48 px up |
| `mark-small.svg` | The same mark redrawn for 16 to 32 px: larger loop, thicker line, larger nodes. Favicons only |
| `mark-light.svg` | No tile, a navy line and outlined nodes, for light backgrounds |
| `mark-mono-navy.svg`, `mark-mono-white.svg` | One colour, for print, stamps and places where colour is not available |
| `lockup-dark.svg`, `lockup-light.svg` | The tile with "MeshContinuum" and "MECON", for dark and light backgrounds |
| `og.svg`, `og.png` | The 1200 × 630 social preview |
| `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180 px), `mark-512.png` | Exports from the SVGs. They are copied into the [site](../site/src) |

The SVGs are the masters. The lockups and the social preview set their text in the system's sans-serif font, so the lettering follows the platform. Re-export a PNG from its SVG at its exact pixel size, never by scaling another PNG.

## Palette

| Colour | Hex | Role |
|---|---|---|
| Navy | `#0D1736` | The tile, and text on light backgrounds |
| Violet | `#8B7CFF` | Two nodes; primary buttons on the site |
| Turquoise | `#25D6C9` | Two nodes; links on the site |
| Light surface | `#F5F7FB` | The loop on navy; text on dark backgrounds |

Contrast, measured as WCAG ratios:
- On navy: light surface 16.4:1, turquoise 9.7:1, violet 5.4:1.
- On white: navy 17.6:1, violet 3.3:1, turquoise 1.8:1. Turquoise is never used for text or thin lines on a light background. The light mark outlines its nodes in navy for that reason.

The site's dark theme uses `#0A1230` for the page and `#131D45` for panels. Its text and accents are at least 4.9:1 on both.

## Using it

- **Clear space:** at least a quarter of the tile's width on every side.
- **Smallest size:** 16 px for `mark-small.svg`, and 48 px for `mark.svg`.
- **Do not** recolour the nodes, add effects, rotate the mark, put it on a busy photo, or set the name in another typeface style. The name is upright and mixed case, never in capitals.
- **Do not** combine it with MeshCore's logo, or use it in a way that suggests MeshCore endorses MECON. MECON is an independent project built around MeshCore.

## Licence

The artwork is part of this repository, under [Apache-2.0](../LICENSE). Apache-2.0 grants no right to the project's names or marks: use them to refer to the project, not to present another project as this one.

MeshCore's own logo is in its repository's `logo/` folder. Its code is MIT-licensed, but no permission to use its marks has been sought or given, and none is needed for this mark.

## Not covered yet

The mark on device screens (the boot splash or an about page on a small OLED) is a separate, later step. It is not part of this identity's first release.
