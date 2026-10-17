# Anakrisis — website

Static website (plain HTML, CSS and a little JavaScript). No build step: what is in this
repository is exactly what GitHub Pages publishes.

## Structure

```
index.html                    Home: thesis + the line (one screen)
the-view/                     The view
the-way/                      The way
the-instruments/              The instruments (overview)
  lorem/ ipsum/ dolor/ sit-amet/   one page per instrument
the-origin/                   The origin (portrait)
the-dialogue/                 The dialogue (demo request form)
imprint/  privacy/            Legal pages (templates, to be completed)
404.html                      Page not found
assets/css/site.css           All styles (colours and fonts at the top)
assets/js/site.js             Lexicon words, contact settings, form
assets/img/                   favicon, portrait, social preview image
assets/fonts/                 Self-hosted fonts (see below)
```

Every page is a folder with an `index.html`, so URLs look like `anakrisis.eu/the-view/`.

## Publish on GitHub Pages

1. Create a new **public** repository on github.com (e.g. `anakrisis-site`).
   GitHub Pages on a free account requires a public repository.
2. On the repository page: **Add file → Upload files**, drag in **all the contents** of this
   folder (not the folder itself), then **Commit changes**. The hidden `.nojekyll` file is
   optional: if your computer hides it, the site works anyway.
3. **Settings → Pages → Build and deployment**: Source *Deploy from a branch*,
   Branch `main`, folder `/ (root)` → **Save**.
4. After a minute or two the site is online at `https://<your-username>.github.io/anakrisis-site/`.

## Custom domain

1. Buy the domain at a registrar.
2. In the repository: **Settings → Pages → Custom domain**, enter e.g. `www.anakrisis.eu`
   and save (GitHub creates a `CNAME` file in the repository).
3. At the registrar, add the DNS records:
   - `www` → `CNAME` → `<your-username>.github.io`
   - for the bare domain `anakrisis.eu`, four `A` records:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. When the certificate is ready, tick **Enforce HTTPS**.
5. In every page the social-preview tag uses `https://www.anakrisis.eu` — change it if
   the domain is different (search for `og:image`).

## Where to edit

| What | Where |
|---|---|
| Texts (currently Lorem ipsum) | the `index.html` of each page |
| Greek lexicon in the footer | `assets/js/site.js` → `LEXICON` |
| Contact email / form service | `assets/js/site.js` → `CONFIG` |
| Colours and fonts | top of `assets/css/site.css` |
| Instrument names | home `index.html`, `the-instruments/index.html`, the folder names |

Keep the two rules of the design system: **lapis** marks what has been understood
(one key phrase per title, selections, the current position), **cinabro** marks the decision
and appears at most once per screen.

## Demo request form

The site is static, so the form needs a place to send the data:

- **Default:** opens the visitor's email client with the request pre-filled
  (`CONFIG.contactEmail`).
- **Recommended:** create a form on a form service (e.g. Formspree), and paste its endpoint
  URL in `CONFIG.formEndpoint`. Requests then arrive by email and the visitor sees a thank-you
  message. Mention the service in the privacy notice.

## Fonts & GDPR

The fonts (Instrument Sans, GFS Didot) are **self-hosted** in `assets/fonts/` and declared at
the top of `assets/css/site.css`, so no page loads anything from Google Fonts (in Germany,
loading Google Fonts from Google's servers without consent has been judged a GDPR violation,
LG München I, 2022). Do not add Google Fonts `<link>` tags back. See `assets/fonts/README.txt`.

## Legal pages

A business website in Germany needs an **Imprint** (Impressum) and a **Privacy notice**
(Datenschutzerklärung). `imprint/` and `privacy/` contain only a structure to fill in:
complete them and have them checked before publishing.

## Preview locally

Because links point to folders (`the-view/`), open the site through a small local server:

```
cd anakrisis-site
python3 -m http.server 8000
```

then visit `http://localhost:8000`.
