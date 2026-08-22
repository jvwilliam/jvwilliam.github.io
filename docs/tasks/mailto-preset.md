# Mailto Preset Content

**Status**: Completed

## Objective

Set reusable `mailto:` subject and body presets for CTA/contact links, including header navigation contact links, maintained from `/assets/data/`, and rendered by JavaScript where possible.

## Product Outcome

Visitors who click a CTA email link should open their email client with a helpful prefilled subject and body, reducing friction and making it easier to start a useful QA support conversation.

## Current State

- CTA copy is managed in `assets/data/cta.json`.
- CTA links use `mailto:contact@jvwilliam.com`.
- `js/scripts.js` renders CTA content from `assets/data/cta.json`.
- Mailto subject/body presets are stored in `assets/data/cta.json` and encoded by JavaScript renderers for CTA sections and standalone contact links.

## Recommended Approach

Extend `assets/data/cta.json` to include optional mail preset fields per CTA:

```json
{
  "subject": "QA support inquiry",
  "body": "Hi JV,\n\nI'd like to discuss QA support for my web application.\n\nProject/context:\nTimeline:\nWhat we need help testing:\n\nThanks,"
}
```

Store unencoded plain text in JSON and let the JavaScript renderer encode the final `mailto:` URL.

## Must Have

- Store mailto preset content in `/assets/data/`, preferably inside `assets/data/cta.json`.
- Support per-CTA `subject` and `body` fields.
- Support standalone contact links using a stable mailto preset key.
- Render the final `mailto:` href with encoded `subject` and `body` via JavaScript.
- Preserve fallback static `mailto:contact@jvwilliam.com` links if JavaScript fails.
- Avoid hardcoding subject/body in HTML.
- Keep existing CTA test IDs unchanged.

## Should Have

- Use safe URL encoding in JavaScript.
- Keep mail body concise and editable.
- Use different presets for `home` and `about` CTAs if useful.
- Do not overwrite CTA fallback content when data is missing.
- Keep the recipient email unchanged unless a separate task approves it.

## Out Of Scope

- Contact forms.
- Backend email handling.
- Analytics tracking.
- Changing the recipient email.
- Adding third-party services.
- Rewriting CTA heading/copy outside the mailto preset fields.

## Acceptance Criteria

- Given CTA data includes `subject` and `body`, when the CTA renders, then the link href includes encoded mailto parameters.
- Given CTA data is missing `subject` or `body`, when the CTA renders, then the mailto link still works.
- Given JavaScript fails, when the page loads, then the fallback mailto link still opens an email client.
- Given special characters exist in subject/body, when rendered, then they are URL-encoded correctly.
- Given existing tests use CTA selectors, then `section-cta-contactLink` remains present.
- Given existing tests use nav selectors, then `nav-contact` remains present.
- Given the user clicks the CTA after JavaScript renders, then the email client opens with the intended recipient, subject, and body.

## Example CTA Data

```json
{
  "home": {
    "heading": "Ship Reliable Web Apps With Practical QA Support",
    "copy": "Get focused testing support for critical flows, regression coverage, and release confidence.",
    "linkLabel": "Let's Talk",
    "href": "mailto:contact@jvwilliam.com",
    "subject": "QA support inquiry",
    "body": "Hi JV,\n\nI'd like to discuss QA support for my web application.\n\nProject/context:\nTimeline:\nWhat we need help testing:\n\nThanks,"
  },
  "about": {
    "heading": "Flexible QA Support for Growing Teams",
    "copy": "Need help covering a release, validating critical flows, or strengthening test coverage? Let's discuss where QA support can make the biggest impact.",
    "linkLabel": "Let's Talk",
    "href": "mailto:contact@jvwilliam.com",
    "subject": "QA support inquiry",
    "body": "Hi JV,\n\nI'd like to discuss flexible QA support for an upcoming release or project.\n\nProject/context:\nTimeline:\nAreas where QA support may help:\n\nThanks,"
  }
}
```

## Implementation Notes

Use JavaScript to construct the final href:

```text
mailto:contact@jvwilliam.com?subject=...&body=...
```

Recommended rendering behavior:

- Parse the base recipient from `cta.href`.
- Build query parameters using `URLSearchParams`.
- Add `subject` only when present.
- Add `body` only when present.
- Assign the final string to the CTA link `href`.
- Keep fallback `href` unchanged if any required data is missing.

Do not manually encode the JSON values. Let JavaScript encode them.

## Verification Checklist

- Confirm `assets/data/cta.json` remains valid JSON.
- Confirm CTA links still work if JavaScript is disabled.
- Confirm CTA links include encoded `subject` and `body` after JavaScript renders.
- Confirm missing `subject` or `body` does not break the link.
- Confirm no `href="#"` is introduced for CTA contact links.
- Confirm existing `section-cta-contactLink` test IDs remain unchanged.
