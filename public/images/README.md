# Image guide

Every image in this folder is a **placeholder** (a soft brand-colored SVG with a
label) so the site looks complete and never shows a broken image link. None of
them are real photographs, and none are pulled from an external URL.

## Replacing placeholders with real photos

When you have real, consented photographs, drop them into this folder using
the **same file name**, changing only the extension (`.svg` → `.jpg`), then
update the single `import` line at the top of the component listed below.

| Placeholder file        | Used in                          | Replace with |
|--------------------------|-----------------------------------|---------------|
| `hero-children.svg`      | `src/components/Hero.jsx`         | `hero-children.jpg` — wide shot, happy children in a natural community setting |
| `about-children.svg`     | `src/pages/About.jsx`             | `about-children.jpg` — children learning or playing |
| `education.svg`          | `src/data/programs.js`            | `education.jpg` |
| `nutrition.svg`          | `src/data/programs.js`            | `nutrition.jpg` |
| `healthcare.svg`         | `src/data/programs.js`            | `healthcare.jpg` |
| `community.svg`          | `src/data/programs.js`            | `community.jpg` |
| `story-1.svg`            | `src/data/stories.js`             | `story-1.jpg` |
| `story-2.svg`            | `src/data/stories.js`             | `story-2.jpg` |
| `story-3.svg`            | `src/data/stories.js`             | `story-3.jpg` |
| `cta-background.svg`     | `src/components/CTASection.jsx`   | `cta-background.jpg` — wide, darker-toned image (text overlays it) |
| `impact-map.svg`         | `src/pages/Impact.jsx`            | `impact-map.jpg` or a real map graphic |
| `gallery-1.svg` … `gallery-4.svg` | `src/components/Gallery.jsx` (Home + About) | `gallery-1.jpg` … `gallery-4.jpg` — landscape, 1200px wide |
| `donate-side.svg`        | `src/pages/Donate.jsx`            | `donate-side.jpg` — a warm, close-up portrait works well |
| `contact-side.svg`       | `src/pages/Contact.jsx`           | `contact-side.jpg` — your team or office |
| `involve-banner.svg`     | `src/pages/GetInvolved.jsx`       | `involve-banner.jpg` — wide banner, volunteers in action |
| `favicon.svg`            | `index.html`                      | Keep as-is, or replace with a designed mark |

Recommended real-photo specs: JPG or WEBP, 1600px wide minimum for hero/CTA
images, 800px for cards, optimized/compressed for web. Always use images the
Foundation has consent and rights to use, especially photographs of children.
