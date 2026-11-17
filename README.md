# PixelMug App Gallery

This repository powers the public [PixelMug Applications organization profile](https://github.com/pixelmug-applications). Its gallery lives in [`profile/README.md`](profile/README.md); each application keeps its source code and documentation in its own repository.

## Update an application cover

1. Put a real image or short looping GIF in `profile/assets/`. Use the application slug as its filename, for example `block-drop.gif`. A 16:9 image showing the application on a real PixelMug works best. Keep the file small so the gallery loads quickly. The current SVGs are clearly marked placeholders.
2. In `profile/README.md`, find that application's card and change its `<img src="assets/block-drop.svg">` to the new filename. Update its alternative text to describe the actual image.
3. If a public demo video exists, add a **Demo** link to that card. Keep the **Source** link pointing to the application's own repository. Add a **Try it** or **Install** link only when that destination actually works.
4. Preview the rendered `profile/README.md` on GitHub before publishing. The image path is relative to `profile/README.md`, so `assets/name.gif` means `profile/assets/name.gif`.

You may delete the old placeholder SVG after switching the card to a real image. Do not replace an SVG's contents with a GIF while keeping the `.svg` extension.

## Add a new open-source application

1. Publish the complete application in its own public repository under [pixelmug-applications](https://github.com/pixelmug-applications). Keep private projects out of this gallery.
2. Add a two-column card to the appropriate category in `profile/README.md`: cover, name, one-sentence description, and **Source** link. Add **Demo** or **Try it** only when available.
3. Add its cover to `profile/assets/`. If no real media exists yet, run `node scripts/create-placeholder.mjs <slug> "Display Name" "#hexcolor"` and use `assets/<slug>.svg` in the card.
4. Check that the repository URL and cover render correctly on the organization Overview page. The six optional GitHub pinned repositories are curated separately in organization settings.

This gallery is maintained manually for now. There is no generated app index or GitHub Action to update.
