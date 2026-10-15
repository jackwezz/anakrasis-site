# Anakrasis — design notes

Decisions taken while designing the site. Read this before changing anything.

## Positioning

- Anakrasis is a data-services company with several applications ("instruments").
- Mission (owner's words, to be written as final copy by the owner): guide people to make
  decisions by creating an interpretive layer that turns data into usable information —
  *a reading lens on digital disorder*.
- The site sells a vision and a mission, not "another technology".
- All narrative copy is written by the owner. Until then: **Lorem ipsum only**, never
  invented marketing text, no tech-bro tone, no buzzwords.

## Structure

- Five stations on one line, read left to right:
  **The view → The way → The instruments → The origin → The dialogue**
  (vision, mission, products, company, contact).
- Home = one screen, no scrolling: one thesis sentence + the line with the five stations.
- Inner pages: the line becomes the navigation at the top, on the same five columns as the
  home (so each station rises straight up). Home is reached from the logo and from the
  "Home" link in the footer, next to Imprint and Privacy. The current station is a larger
  lapis dot with a halo and a lapis label; the path ahead of it is paler. The line ends at
  The dialogue.
- No numbering anywhere (01–05, A–D, 01 / 08): the line already says "sequence".
- Inside The instruments a second row under the trail lists All · the four instruments
  (current one underlined, as on the home).

## Movement between pages

The transition tells the structure: the line of the home rises and becomes the trail, each
station name flies to its place; going Home it comes back down. Between inner pages the
trail stays still: the lapis line (the path walked) grows or shrinks to the new station and
the position point slides along it — the line connects, it never reappears. An instrument's name grows into the title
of its page (from the home or from the overview) and shrinks back. Content leaves quickly
and arrives after the line has settled — nothing overlaps for long.
One duration (0.72s) and one curve for everything that moves; content leaves in the first
third and arrives in the rest, so two pages are never superimposed.
Built with cross-document View Transitions (CSS only); browsers without them simply change
page. The marble background is a pre-rendered image (assets/img/marble.jpg): a live SVG
filter made every page change stutter. The home intro (line drawn, stations appearing) plays only on the first visit of a
session; the lexicon keeps its word across pages.
- The top line is the only navigation: no kicker repeating the station name above the title,
  no previous/next block at the bottom. Nothing is said twice on the same screen.
- Inner pages fit one screen on desktop: title, lead and text share the same left edge
  (title on top, lead left, text right). Copy must stay short — about two paragraphs per
  station; longer text simply scrolls.
- Avoid: slide/PowerPoint layouts (one statement per screen with prev/next),
  bullet lists that read like shopping lists, scattered/blurred layouts (they say chaos),
  decorative charts, stock imagery, AI-generated imagery.

## Colour — Lapis & Cinabro (variant "Marmo")

| Role | Name | Hex | Use |
|---|---|---|---|
| Field | Marmo | `#F4F3F0` | background, faint marble veining |
| Order | Inchiostro | `#0D1430` | text, structure |
| Understanding | Lapis | `#2340B0` | one key phrase per title, selection, current position, the line |
| Decision | Cinabro | `#C63B22` | the end point of the line / the decision — at most once per screen |
| Secondary text | | `#4B5166` | |
| Labels | | `#9A9FB0` | |

Proportions on a typical screen: ~78% field, ~15% ink, ~6% lapis, ~1% cinabro.

## Type

- **Instrument Sans** only (normal width for reading, width 75 for labels).
- **GFS Didot** only for Greek words.
- Fonts are self-hosted (GDPR, see README).

## Signature

"The line that becomes a point": a lapis line (the path of understanding) ending in a
cinabro point (the decision). Used for the home path, the navigation, the "next" links.
The mark: a lapis ring (the lens) with a cinabro dot off-centre (the selected datum).

## Lexicon

Footer carousel: one Greek word, transliteration, one or two lines of explanation.
Current words are placeholders — to be replaced with the owner's campaign words
(`assets/js/site.js`).

## Imagery

- The origin: the founder's portrait, **original photo, unretouched** (no background
  replacement, no crop).
- No other images for now.

## Open items

- Final copy for every page (owner).
- Campaign words for the lexicon.
- Contact email and form service (`assets/js/site.js`).
- Imprint and Privacy content; custom domain.
