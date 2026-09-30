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

On a phone the app **is** the viewport: the shell is pinned to the four corners and the
page itself never scrolls, so the browser's own chrome sliding away cannot push the tab bar
off screen. Only the inner body scrolls. On a wider screen the app sits inside a hardware
frame so it can be shown on a laptop without pretending to be a desktop site.

Checked at 320, 360, 375, 390, 412 and 430 wide and in landscape: no page scroll, no
horizontal overflow on any of the ~122 screens, and the tab bar always in view. Below
392px the gutter and type step down; below 352px the tab labels give way to their icons
and the denser grids drop to two columns. Form fields are held at 16px on touch screens,
because anything smaller makes iOS zoom in on focus and stay there.

Older browsers are handled rather than assumed: `color-mix()`, `clip-path: path()`, flex
`gap` and `:has()` each have a fallback or are avoided outright, so an app bar is never
left transparent on a phone a couple of versions behind.

## What is in it

One page, a hash router, and ~120 screens across every section of the web app:

| Section | Screens |
| --- | --- |
| Public | landing, matrimony door, Connect door, search, profile, plans, stories, story, tips, tip, FAQ, about, safety, legal, classifieds (list / show / create), biodata maker, report a problem, sitemap, 404 / 403 / 419 / 500 |
| Auth | sign in, code sign-in, OTP, register (2 steps), verify email, forgot / reset password, staff sign in, candidate consent (confirm / confirmed / rejected) |
| Member | dashboard, search, shortlist, profile hub / edit / preview, photos, preferences, biodata, biodata poster, mailbox, thread, requests, notifications, verification (+ document, selfie), privacy, settings, referral, checkout, manual payment, invoices, family, family members, family room, family log |
| পরিচয় (Porichoy) | the door itself (join panel, five example cards, the wall, the four promises), join / consent, deck (draggable), people, matches, messenger, chat, profile, notifications, plans, settings |
| Family | dashboard, families, family profile, connection, introductions, introduction, meetings, video meeting, questions, guide, join, joined |
| Admin | dashboard, members, member, photo moderation, moderation, blocked words, verification queue, verification case, payments, pricing (+ edit), offers, coupons (+ edit), success fees, rewards, mail (+ compose, show), stories (+ edit), tips, hero slides, appearance, content, SEO, **Porichoy examples** (the five cards, one form each), problems, closures, export, messenger oversight, help bot, more |
| Operator | case queue, case, candidate, search |

**The navigator** — the small grid button in the bottom-left corner never leaves. It opens a
searchable index of every screen in the build, grouped by section, with the current one
marked, so any screen is two presses away from any other. (`/` opens it on a keyboard.)
`#sitemap` lists the same routes as a full page.

### পরিচয় / Porichoy

Porichoy is the product's second door — the dating side — and it has its own page, not just
a tile. The door carries the join panel (the requirements answered, and what stands in the
way), the five example cards, the wall drawn between the two products, the four promises
and how the product works. The cards are **examples and the page says so**: the shipped five
are blurred silhouettes with invented first names, and the admin screen that sets them
repeats the rule — never a member, never anyone who could be taken for one. Joining is its
own screen with its own consent, and leaving is one button in Porichoy settings.

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
- **Love** — ❤️ 💞 💍 🌹 💌 and the rest drifting up behind the landing page, the
  dashboard, both doors, the stories, the requests and every sign-in screen; each one
  rises, sways and turns on its own clock, drawn by the platform's own emoji font so
  nothing is shipped for it
- **Hearts** — rising CSS hearts, layered under the love field
- **Ribbons** — flowing luminous bands, behind the plan and guide screens
- **Globe** and **world map** — slow meridian turn and pulsing member pins
- **Stack transitions** — forward pushes in from the right and parks the old screen to the
  left; back reverses it; a tab switch cross-fades
- Reveal-on-scroll with stagger, word-by-word headlines, counters that climb once, ring and
  bar meters that fill, sheets and dialogs, ripples, a draggable swipe deck, skeleton
  shimmer, confetti, and a splash that removes itself

`prefers-reduced-motion` gets the same composition, standing still.

## Images

**The app icon is the only image file in this build.** Every portrait, cover and thumbnail
is a generated CSS sheet — a brand-ramp gradient, a soft drifting vignette and a monogram —
marked as a sample. Swap `UI.photo()` in `assets/js/ui.js` for real `<img>` tags when real
photography exists.

## Icon and install

`assets/img/` holds the app icon at 512, 192, 180 and 64, plus a favicon. It is the tab
icon, the splash mark and the brand mark in the app bars, so the thing on a home screen and
the thing in the corner of the bar are the same object.

`site.webmanifest` makes the page installable: **Add to Home Screen** on iOS or **Install
app** on Android gives a standalone, portrait window with no browser chrome, the icon on
the home screen, and long-press shortcuts straight to search, messages and পরিচয়.

## Layout

```
index.html                  the whole app
site.webmanifest            name, colours and icons, so it installs to a home screen
assets/img/                 the app icon (the only image files here)
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
