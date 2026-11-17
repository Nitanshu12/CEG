# CEG website

Website for the Centre for Economic Growth, built with Next.js (JavaScript) and plain CSS.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| Folder | What it holds |
|---|---|
| `content/` | All text and data: site details, menu, About copy, research areas, people, publications, events, images. **Edit content here.** |
| `lib/content.js` | The content layer. Pages get everything through these functions. To connect a CMS later, change only this file. |
| `app/` | One folder per page (`about`, `research`, `publications`, `people`, `events`, `contact`, `work-with-us`). |
| `components/` | Reusable pieces: header, footer, cards, lists, forms. |
| `styles/` | Plain CSS. `tokens.css` holds every colour, font and spacing value. |
| `public/images/` | Photo files. |

## Common changes

- **Change a colour or font:** `styles/tokens.css`.
- **Change the menu:** `content/navigation.js`.
- **Add a publication, event or person:** add an entry to the matching file in `content/`. The pages and links are created automatically.
- **Replace a photo:** put the file in `public/images/` and update its entry in `content/images.js`. Remove the `credit` field for CEG's own photos.
- **Add a team photo:** add the image to `content/images.js` and set `photo` on the person in `content/people.js`.
- **Swap in the real logo:** `components/Logo.js`.

## Still placeholder

- All publications and events (`content/publications.js`, `content/events.js`).
- Contact details and social links (`content/site.js`).
- "Work with us" copy (`app/work-with-us/page.js`).
- All photos are stand-ins from Wikimedia Commons, credited on `/credits`.
- The contact form is not connected: set `endpoint` in `components/ContactForm.js`.
- The language selector offers English only.
