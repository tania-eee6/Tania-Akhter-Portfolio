# Tania Akhter — Personal Portfolio

Responsive multi-page portfolio in plain HTML, CSS and JavaScript. Works offline and on GitHub Pages — no build step.

## Pages
`index.html` Home · `about.html` · `education.html` · `skills.html` · `projects.html` · `experience.html` · `contact.html`

## Files
- `style.css` — all styling, with numbered sections and dark mode
- `script.js` — mobile menu, dark/light theme (remembers choice), photo fallback, scroll reveal, contact form
- `images/tania.jpg` — homepage portrait
- `images/photos/` — **put your own photos here** (see `PHOTOS-NEEDED.md`)
- `images/illustrations/` — original SVG artwork shown until a photo is added
- `images/university-campus.jpg` — your campus photo (default for the university slots)

## How photos work
Every picture on the site first looks for `images/photos/<name>.jpg`. If the file is missing it shows the illustration instead. Add a file with the right name and it appears automatically.

## Publish on GitHub Pages
Upload the folder contents to a repository, then Settings → Pages → Deploy from branch `main` / root.

## Contact form
The form opens the visitor's email app with the message filled in (no server needed). For a real inbox form, create a free form at formspree.io and set the `<form action>` to its URL.
