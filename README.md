# Autokorjaamo Hakola – E1, E2 and E3 website project

## Pages and files

- index.html – home page
- about.html – about the workshop
- listing.html – services page with category filters, text search and a result count (E3)
- contact.html – accessible service request form with validation and a browser-local draft (E3)
- style.css – shared responsive styling, E2 colour schemes and E3 component styles
- script.js – shared deferred JavaScript for listing filters, contact validation, local draft storage and form status
- plan.md – website proposal and customer requirements
- moodboard.md – E2 design reasoning, colours, fonts and references
- fixes.md – broken/fixed notes and checks
- ai-log.md – AI use log; review it and keep it accurate

The site uses a native HTML popover menu in the page header. It does not use a JavaScript framework or external library.

## Open in Visual Studio Code

1. Download and extract this project folder, or clone the repository:
   git clone https://github.com/ShahriarSahed/Assignment.git
2. Open Visual Studio Code.
3. Choose **File → Open Folder** and select the project folder.
4. Open index.html in a browser. Live Server is recommended when testing local storage.

## E3 testing checklist

- On listing.html, test all category buttons using both mouse and keyboard.
- Search for words such as “brakes”, “tyres” and “servicing”; combine search with each category filter.
- Confirm the result status changes and that no-match results are explained.
- On contact.html, submit the empty form and confirm that errors appear, are linked to fields and focus moves to the first error.
- Test an invalid email, an invalid registration number, an invalid phone number and a past date. Fix each field and confirm its error clears.
- Enter valid details and confirm the status says “Your request is ready” without claiming that an email was sent.
- Type part of a request, reload the page and confirm that the draft is restored. Test the clear-draft button too.
- Open the “Good to know” popover with the keyboard. Check that Tab reaches its links, Escape closes it, and the menu opens beneath its button.
- Use the Tab key through all pages. Confirm all links, buttons, search input and form fields are reachable and visibly focused.
- Check the browser console for JavaScript errors.
- Test the four pages at 320 px, 360 px, 768 px and 1280 px, with no horizontal scrolling at 320 px.
- Test light and dark colour schemes.
- Validate all four HTML pages at https://validator.w3.org/nu/.

## E1 and E2 checks to keep passing

- Confirm all four pages load style.css and script.js.
- Test navigation links and the published GitHub Pages site.
- Check the responsive layout, colour schemes and focus indicators.
- Keep plan.md, moodboard.md and fixes.md in the repository.

## Important: form and privacy

The service request is checked in the browser only. GitHub Pages does not process the form, send an email or create a booking. The workshop's IT partner must connect it to a real form-processing service before it can receive online requests.

The form draft is stored in local storage in the current browser on the current device. It is not sent to the workshop. Do not save personal details on a shared device; use “Clear saved draft” when finished.

The customer brief does not contain the business's phone number, email address, street address, opening hours, logo or prices. Do not invent these details; ask the customer for them.
