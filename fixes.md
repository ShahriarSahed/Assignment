# Broken / fixed notes – E2

## 1. Missing shared stylesheet

**Problem:** The four HTML pages did not link to a shared stylesheet, so they had no consistent E2 visual design or responsive layout.

**Fix:** Added one `style.css` file and linked it from `index.html`, `about.html`, `listing.html` and `contact.html`. It contains the colour, font, spacing, Flexbox, Grid, responsive, dark-mode, focus, reduced-motion and print rules.

**How to check:** Open each page and confirm that the same header, navigation, typography and footer styling appear. In the Network panel, confirm that `style.css` loads successfully (HTTP 200 or 304).

## 2. Existing contact-form script kept

**Existing item checked:** `contact.html` already loads `script.js`, and the repository already contains a file with that exact name. No filename correction was needed in this repository.

**How to check:** Open `contact.html`, open Developer Tools → Network, reload the page and check that `script.js` loads successfully. Then try an invalid registration number and a date in the past.

## 3. Responsive and accessibility checks

**Existing item kept:** All four pages already had a viewport meta tag. Those tags were kept so mobile browsers use the device width.

**Fix:** The stylesheet uses a mobile-first layout, wrapping navigation, fluid headings, flexible service cards, visible keyboard focus and system colour preferences. No inline styles or CSS frameworks were added.

**How to check:** Test at 320 px, 360 px, 768 px and 1280 px. At 320 px, there should be no sideways scrolling. Use Tab to move through links and form controls, and test both light and dark system themes.
