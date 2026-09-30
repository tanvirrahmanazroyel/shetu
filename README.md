# সেতু / SheTu — Mobile App UI (demo)

An animated **mobile app UI** for the SheTu matrimony platform, built to mirror the web
app's screens, palette and background animations. **HTML, CSS and vanilla JavaScript
only** — no framework, no build step, no bundler, no binary images.

Everything on screen is a **prototype with dummy data**. Nothing is wired to a server.

## Run it

Open `index.html` — that is the whole app. For GitHub Pages, publish the repository root;
the app is a single page and every asset path is relative, so it works from a project
subpath (`user.github.io/repo/`) with no configuration.

```bash
# or serve it locally
python3 -m http.server 8000
```

On a phone the app is the viewport. On a wider screen it sits inside a hardware frame so
it can be shown on a laptop without pretending to be a desktop site.

## What is in it

One page, a hash router, and ~120 screens across every section of the web app:

| Section | Screens |
| --- | --- |
| Public | landing, matrimony door, Connect door, search, profile, plans, stories, story, tips, tip, FAQ, about, safety, legal, classifieds (list / show / create), biodata maker, report a problem, sitemap, 404 / 403 / 419 / 500 |
| Auth | sign in, code sign-in, OTP, register (2 steps), verify email, forgot / reset password, staff sign in, candidate consent (confirm / confirmed / rejected) |
| Member | dashboard, search, shortlist, profile hub / edit / preview, photos, preferences, biodata, biodata poster, mailbox, thread, requests, notifications, verification (+ document, selfie), privacy, settings, referral, checkout, manual payment, invoices, family, family members, family room, family log |
| Connect | deck (draggable), people, matches, messenger, chat, profile, notifications, plans, settings |
| Family | dashboard, families, family profile, connection, introductions, introduction, meetings, video meeting, questions, guide, join, joined |
| Admin | dashboard, members, member, photo moderation, moderation, blocked words, verification queue, verification case, payments, pricing (+ edit), offers, coupons (+ edit), success fees, rewards, mail (+ compose, show), stories (+ edit), tips, hero slides, appearance, content, SEO, porichoy samples, problems, closures, export, messenger oversight, help bot, more |
| Operator | case queue, case, candidate, search |

`#sitemap` lists every route as a chip, so the whole thing can be walked through by hand.

## Theming

The palette is the web app's `public/css/app.css` tokens, ported verbatim:
two products × two themes.

- **Matrimony** — alta red on warm paper (`--brand:#7A1F3D`)
- **Connect** — botanical teal on cool paper (`--brand:#1B5249`)
- **Light / dark** — each product has both; dark is the same eight colours with the roles
  turned over.

Theme follows the system by default; the moon button in the app bar overrides it, and the
choice is remembered. The product swaps on `:root[data-mode="connect"]`, which is what
makes the Connect screens read as a different product rather than a different page.

## Animation

All of it is CSS on `transform` and `opacity` — both composited, so the fields cost the
compositor a few layers and the main thread nothing.

- **Aurora** — four blurred blobs on the brand ramp, behind every sign-in screen
- **Bokeh** — hexagonal out-of-focus lights, deterministic from a fixed seed, behind the
  landing page and the dashboard
- **Hearts** — rising, behind the matrimony door, the stories and the requests screen
- **Ribbons** — flowing luminous bands, behind the plan and guide screens
- **Globe** and **world map** — slow meridian turn and pulsing member pins
- **Stack transitions** — forward pushes in from the right and parks the old screen to the
  left; back reverses it; a tab switch cross-fades
- Reveal-on-scroll with stagger, word-by-word headlines, counters that climb once, ring and
  bar meters that fill, sheets and dialogs, ripples, a draggable swipe deck, skeleton
  shimmer, confetti, and a splash that removes itself

`prefers-reduced-motion` gets the same composition, standing still.

## Images

**There are no image files in this build.** Every portrait, cover and thumbnail is a
generated CSS sheet — a brand-ramp gradient, a soft drifting vignette and a monogram —
marked as a sample. Swap `UI.photo()` in `assets/js/ui.js` for real `<img>` tags when real
photography exists.

## Layout

```
index.html                  the whole app
assets/css/tokens.css       palette, typography, geometry, motion tokens
assets/css/base.css         shell, device frame, app bar, tab bar, forms, buttons
assets/css/components.css   cards, lists, chips, placeholders, sheets, chat, deck, plans
assets/css/animations.css   backgrounds, transitions, reveals, micro-motion
assets/css/screens.css      per-screen layout
assets/js/icons.js          inline SVG icon set
assets/js/data.js           all dummy data
assets/js/ui.js             HTML builders, toasts, sheets, reveals, counters, backgrounds
assets/js/screens-*.js      the screens, one file per section
assets/js/app.js            router, theme, tab bar, delegated actions
```

Adding a screen is one function on `window.SCREENS` returning
`{ appbar, body, tab, bg, after }`, plus a `data-go="<name>"` somewhere that reaches it.

## Note

This is a UI prototype: dummy data, no backend, no validation, no persistence beyond the
remembered theme. Text is placeholder copy in Bangla.
