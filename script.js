// Autokorjaamo Hakola: E3 browser interactions.
// This is the only JavaScript file used by the site. Every page loads it with defer.

(() => {
    "use strict";

    // E3 listing page: category filters, text search and an accessible result count.
    function initServiceListing() {
        const serviceList = document.getElementById("service-list");
        if (!serviceList) {
            return;
        }

        const cards = Array.from(serviceList.querySelectorAll(".service-card"));
        const filterButtons = Array.from(
            document.querySelectorAll("#service-filters [data-filter]")
        );
        const searchInput = document.getElementById("service-search");
        const status = document.getElementById("service-status");

        let activeFilter = "all";

        function updateListing() {
            const searchTerm = searchInput.value.trim().toLocaleLowerCase();
            let visibleCount = 0;

            for (const card of cards) {
                const matchesFilter =
                    activeFilter === "all" || card.dataset.category === activeFilter;
                const matchesSearch = card.textContent
                    .toLocaleLowerCase()
                    .includes(searchTerm);

                card.hidden = !(matchesFilter && matchesSearch);

                if (!card.hidden) {
                    visibleCount += 1;
                }
            }

            for (const button of filterButtons) {
                button.setAttribute(
                    "aria-pressed",
                    String(button.dataset.filter === activeFilter)
                );
            }

            if (visibleCount === 0) {
                status.textContent =
                    "No services match your search. Try another word or filter.";
            } else {
                status.textContent =
                    "Showing " + visibleCount + " of " + cards.length + " services.";
            }
        }

        for (const button of filterButtons) {
            button.addEventListener("click", () => {
                activeFilter = button.dataset.filter;
                updateListing();
            });
        }

        searchInput.addEventListener("input", updateListing);
        updateListing();
    }

    // E3 contact page: accessible validation, a saved draft and a clear status.
    function initServiceRequestForm() {
        const form = document.getElementById("service-request-form");
        if (!form) {
            return;
        }

        const fields = Array.from(form.querySelectorAll("input, textarea, select"));
        const status = document.getElementById("form-status");
        const draftStatus = document.getElementById("draft-status");
        const clearDraftButton = document.getElementById("clear-draft");
        const registrationInput = document.getElementById("registration");
        const preferredDayInput = document.getElementById("preferred-day");
        const storageKey = "hakola-service-request-draft";

        const fieldLabels = {
            "customer-name": "Your name",
            registration: "Vehicle registration number",
            problem: "Service description",
            phone: "Your phone number",
            email: "Your email address",
            "preferred-day": "Preferred day"
        };

        // Use the visitor's local date rather than a UTC date.
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const todayString = year + "-" + month + "-" + day;

        preferredDayInput.min = todayString;

        function checkRegistrationNumber() {
            const value = registrationInput.value.trim();

            // A string made only of phone-number characters is probably in the
            // wrong field. The HTML pattern handles other format mistakes.
            if (value !== "" && /^[+0-9\s()-]+$/.test(value)) {
                registrationInput.setCustomValidity(
                    "This looks like a phone number. Enter the vehicle registration number here, for example ABC-123."
                );
            } else {
                registrationInput.setCustomValidity("");
            }
        }

        function messageFor(field) {
            const validity = field.validity;
            const label = fieldLabels[field.id] || "This field";

            if (validity.customError) {
                return field.validationMessage;
            }
            if (validity.valueMissing) {
                return label + " is required.";
            }
            if (validity.typeMismatch && field.type === "email") {
                return "Enter an email address in the format name@example.com.";
            }
            if (validity.patternMismatch && field.id === "registration") {
                return "Enter a vehicle registration number, for example ABC-123.";
            }
            if (validity.patternMismatch && field.id === "phone") {
                return "Use 6–20 characters: digits, spaces, +, brackets or hyphens.";
            }
            if (validity.tooShort && field.id === "problem") {
                return "Please describe the problem in at least 10 characters.";
            }
            if (validity.rangeUnderflow && field.id === "preferred-day") {
                return "Choose today or a future date.";
            }

            return "Check the information in " + label.toLocaleLowerCase() + ".";
        }

        function showError(field, message) {
            const error = document.getElementById(field.id + "-error");
            if (error) {
                error.textContent = message;
            }
            field.setAttribute("aria-invalid", "true");
        }

        function clearError(field) {
            const error = document.getElementById(field.id + "-error");
            if (error) {
                error.textContent = "";
            }
            field.removeAttribute("aria-invalid");
        }

        function validateField(field) {
            if (field.id === "registration") {
                checkRegistrationNumber();
            }

            if (field.validity.valid) {
                clearError(field);
                return true;
            }

            showError(field, messageFor(field));
            return false;
        }

        function saveDraft() {
            try {
                const data = Object.fromEntries(new FormData(form));
                localStorage.setItem(storageKey, JSON.stringify(data));
                draftStatus.textContent =
                    "Your draft is saved automatically in this browser on this device.";
            } catch (error) {
                draftStatus.textContent =
                    "Draft saving is unavailable in this browser. Your request has not been sent.";
            }
        }

        function restoreDraft() {
            try {
                const stored = localStorage.getItem(storageKey);
                if (!stored) {
                    draftStatus.textContent =
                        "Your entries are saved automatically in this browser on this device.";
                    return;
                }

                const saved = JSON.parse(stored);
                if (saved && typeof saved === "object" && !Array.isArray(saved)) {
                    for (const [name, value] of Object.entries(saved)) {
                        const field = form.elements.namedItem(name);
                        if (field && typeof field.value === "string") {
                            field.value = String(value);
                        }
                    }

                    draftStatus.textContent =
                        "Your saved draft has been restored in this browser.";
                }
            } catch (error) {
                draftStatus.textContent =
                    "The saved draft could not be read. You can enter your details again.";
            }
        }

        function removeDraft() {
            try {
                localStorage.removeItem(storageKey);
                return true;
            } catch (error) {
                return false;
            }
        }

        // Restore the saved values before listening for changes.
        restoreDraft();

        function handleFieldChange(event) {
            const field = event.target;
            if (!fields.includes(field)) {
                return;
            }

            if (
                field.id === "registration" &&
                field.getAttribute("aria-invalid") === "true"
            ) {
                checkRegistrationNumber();
            }

            // After an error is shown, clear it as soon as the field is valid.
            if (field.getAttribute("aria-invalid") === "true" && field.validity.valid) {
                clearError(field);
            }

            saveDraft();
        }

        form.addEventListener("input", handleFieldChange);
        form.addEventListener("change", handleFieldChange);

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let firstInvalid = null;

            for (const field of fields) {
                if (!validateField(field) && firstInvalid === null) {
                    firstInvalid = field;
                }
            }

            if (firstInvalid) {
                status.textContent =
                    "Please correct the highlighted fields. The first field that needs attention has been focused.";
                firstInvalid.focus();
                return;
            }

            // GitHub Pages has no form-processing server. Be clear that this is
            // only a checked request draft, not an email or a confirmed booking.
            status.textContent =
                "Your request is ready. It has not been sent. The workshop's IT partner must connect this form to the workshop's email before online requests can be received.";

            const draftRemoved = removeDraft();
            draftStatus.textContent = draftRemoved
                ? "The saved draft has been cleared because the request is ready."
                : "The request is ready, but this browser could not clear the saved draft.";
        });

        clearDraftButton.addEventListener("click", () => {
            form.reset();
            for (const field of fields) {
                clearError(field);
                if (field.id === "registration") {
                    field.setCustomValidity("");
                }
            }
            removeDraft();
            status.textContent = "Saved draft cleared. No request has been sent.";
            draftStatus.textContent =
                "Your draft has been cleared from this browser.";
        });
    }

    initServiceListing();
    initServiceRequestForm();
})();
