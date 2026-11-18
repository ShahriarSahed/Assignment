# AI use log

## E1 – Autokorjaamo Hakola website

- **Tool used:** ChatGPT.
- **Purpose:** Help understand the assignment and prepare a first draft of the four HTML pages, the client-side form checks, and the project plan.
- **Materials supplied:** The Autokorjaamo Hakola customer brief and Lecture 2 slides about Git, GitHub, HTML elements and E1 requirements.
- **AI assistance:** Suggested the page structure, navigation links, page text and JavaScript checks for the vehicle registration number and preferred date.
- **Student review and changes:** Review the E1 material and add the changes you personally make to the generated code here.
- **Testing:** Record the date and results after you validate all four published pages, test all navigation links, and test the form fields.

## E2 – CSS and responsive design

- **Tool used:** ChatGPT.
- **Purpose:** Help implement the E2 styling and responsive-design requirements.
- **Materials supplied:** Lecture 3, “Why CSS exists, and how it works”, and Lecture 4, “Layout and responsive design”.
- **AI assistance:** Prepared a shared stylesheet, a responsive layout, light/dark colour tokens, focus and preference rules, and drafts of moodboard.md and fixes.md. Helped complete the three-site review section in plan.md.
- **Existing code checked:** The four pages already included viewport meta tags, and contact.html already referenced the existing script.js file. These were kept; there was no script filename correction needed in this repository.
- **Student review and changes:** Read the CSS and documentation, test the site at different widths and in both colour schemes, and add your own design or code changes here.
- **Testing:** Add the actual date and results after you run the HTML validator, test the four pages, test the contact form, and check the published site.

## E3 – JavaScript, forms, local storage and popover

- **Tool used:** ChatGPT.
- **Materials supplied:** Lecture 5, “JavaScript in the browser”, and Lecture 6, “Forms, saving data and popovers”.
- **AI assistance:** Added a service-category filter, text search and live result count to listing.html; added accessible custom form errors, aria-describedby, focus on the first invalid field and a live status message to contact.html; added browser-local draft save, restore and clear behaviour using localStorage and JSON; added a native HTML popover menu; and extended the shared script.js and style.css.
- **Technical choices:** The same script.js is loaded with defer on all four pages. No JavaScript framework or external library was added. The form says “Your request is ready” but does not claim to send an email or create a booking because GitHub Pages has no form-processing server.
- **Privacy note:** The request draft is saved in the current browser on the current device. The page warns visitors not to save personal details on a shared device and provides a clear-draft button.
- **Student review:** Read the JavaScript and HTML, confirm that the behaviour matches the workshop brief, and record any changes you personally make.
- **Testing status:** E3 browser, keyboard, screen-reader and live-site checks are still pending. Do not mark E3 fully tested until you complete the checklist in the README and check the published site.
