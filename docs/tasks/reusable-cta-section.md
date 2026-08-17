# Reusable CTA Section

**Status**: Draft

## Objective

Define a practical approach for creating reusable call-to-action sections across static landing pages on this GitHub Pages site, while preserving the current plain HTML, CSS, and vanilla JavaScript architecture.

## Recommended Approach

Use a small JavaScript-powered CTA renderer backed by structured data, with static fallback markup on each page where the CTA appears.

This gives the site a reusable CTA pattern without introducing a framework, build step, package manager, or server-side templating. Each page can still work as static HTML if JavaScript fails, while shared copy, classes, and behavior can be managed in one place.

## Why This Fits This Site

- The project is static GitHub Pages HTML/CSS/JS.
- The existing site already uses `assets/data/profile.json` and JavaScript render functions.
- The site should stay lightweight and avoid build tooling.
- Landing pages may need different CTA copy while sharing the same layout and behavior.
- Static fallback content is useful for no-JavaScript rendering and SEO-friendly page content.

## Proposed Structure

### 1. Shared CTA Data

Add CTA definitions to a structured data file.

Recommended option:

```text
assets/data/cta.json
```

Example:

```json
{
  "about": {
    "heading": "Flexible QA Support for Growing Teams",
    "copy": "Need help covering a release, validating critical flows, or strengthening test coverage? Let's discuss where QA support can make the biggest impact.",
    "linkLabel": "Let's Talk",
    "href": "mailto:contact@jvwilliam.com"
  },
  "home": {
    "heading": "Ship Reliable Web Apps With Practical QA Support",
    "copy": "Get focused testing support for critical flows, regression coverage, and release confidence.",
    "linkLabel": "Let's Talk",
    "href": "mailto:contact@jvwilliam.com"
  }
}
```

Alternative option:

- Add a `cta` object to `assets/data/profile.json`.
- This is simpler if CTA copy is tightly tied to the profile data.
- Use a separate `cta.json` if CTA content may grow across multiple landing pages.

Recommended choice: use `assets/data/cta.json` once there are two or more page-specific CTAs.

### 2. Reusable HTML Contract

Each page that needs a CTA should include fallback markup with the same class and test-id contract.

Example:

```html
<section class="cta-section" id="section-cta" data-testid="section-cta" data-cta-key="about">
    <div class="cta-section__inner" id="section-cta-container" data-testid="section-cta-container">
        <h2 class="cta-section__heading" id="section-cta-primaryHeading" data-testid="section-cta-primaryHeading">Flexible QA Support for Growing Teams</h2>
        <p class="cta-section__copy" data-testid="section-cta-copy">Need help covering a release, validating critical flows, or strengthening test coverage? Let's discuss where QA support can make the biggest impact.</p>
        <a class="cta-section__button" href="mailto:contact@jvwilliam.com" data-testid="section-cta-contactLink">Let's Talk</a>
    </div>
</section>
```

The fallback content should be real, publishable copy rather than placeholder text. JavaScript can enhance or replace it when the CTA data loads.

### 3. Reusable CSS Component

Keep the CTA styling as a component in `css/styles.css`.

Recommended CSS responsibilities:

- `.cta-section`: outer spacing and section rhythm.
- `.cta-section__inner`: width constraint and alignment.
- `.cta-section__heading`: CTA heading typography.
- `.cta-section__copy`: supporting copy typography.
- `.cta-section__button`: action link styling.

Avoid page-specific styling inside the base CTA component. If a future page needs a variation, use a modifier class:

```html
<section class="cta-section cta-section--compact" ...>
```

Potential modifiers:

- `.cta-section--compact`
- `.cta-section--left`
- `.cta-section--center`
- `.cta-section--final`

Only add modifiers when there is a real second use case. Do not create variants preemptively.

### 4. Vanilla JavaScript Renderer

Add a small renderer to `js/scripts.js` that:

- Finds every `[data-cta-key]` section.
- Loads `assets/data/cta.json`.
- Looks up the matching CTA by key.
- Updates heading, copy, link label, and href using safe DOM APIs.
- Leaves fallback content untouched if data is missing or loading fails.

Example implementation direction:

```js
const ctaSections = document.querySelectorAll('[data-cta-key]');

function renderCtas(ctas = {}) {
    ctaSections.forEach(section => {
        const key = section.dataset.ctaKey;
        const cta = ctas[key];
        if (!cta) return;

        const heading = section.querySelector('[data-testid="section-cta-primaryHeading"]');
        const copy = section.querySelector('[data-testid="section-cta-copy"]');
        const link = section.querySelector('[data-testid="section-cta-contactLink"]');

        if (heading && cta.heading) heading.textContent = cta.heading;
        if (copy && cta.copy) copy.textContent = cta.copy;
        if (link && cta.linkLabel) link.textContent = cta.linkLabel;
        if (link && cta.href) link.href = cta.href;
    });
}
```

Use `textContent` and direct attribute assignment. Do not inject HTML from JSON.

## Recommended Implementation Phases

### Phase 1: CSS And Markup Contract

- Finalize the CTA HTML structure.
- Keep current `data-testid` values stable.
- Keep CTA fallback content in each page.
- Move all styling into the reusable `.cta-section` class family.

### Phase 2: Shared Data

- Add `assets/data/cta.json`.
- Define CTA content by page key.
- Add `data-cta-key` to CTA sections.

### Phase 3: JavaScript Enhancement

- Add a defensive CTA renderer to `js/scripts.js`.
- Fetch CTA data after `DOMContentLoaded`.
- Render only when CTA sections exist.
- Keep fallback content if fetch fails.

### Phase 4: Reuse On New Landing Pages

- Copy the CTA HTML contract into new static pages.
- Set the page-specific `data-cta-key`.
- Add page-specific CTA copy to `assets/data/cta.json`.
- Reuse existing CSS and hover behavior.

## Accessibility Requirements

- CTA section should use a semantic `<section>`.
- CTA heading should use the correct heading level for the page.
- CTA link text should be meaningful on its own, such as `Let's Talk` or `Discuss QA Support`.
- If the CTA opens email, use a valid `mailto:` href.
- Keep visible keyboard focus on the CTA link.
- Do not rely only on color to show hover/focus; preserve the underline animation.
- Avoid empty placeholder links before production.

## Testing And Verification

- Confirm each page displays fallback CTA content before JavaScript enhancement.
- Confirm CTA data renders when `assets/data/cta.json` loads.
- Confirm missing CTA keys do not throw errors.
- Confirm failed CTA data fetch does not remove fallback content.
- Confirm the CTA hover underline appears once, not twice.
- Confirm keyboard focus is visible.
- Confirm mobile and desktop layouts remain readable.
- Confirm existing `data-testid` selectors remain stable.

## Benefits

- Keeps the site static and GitHub Pages-compatible.
- Avoids unnecessary frameworks or build tools.
- Makes CTA copy reusable and easier to update.
- Preserves SEO-friendly fallback content.
- Keeps JavaScript defensive and lightweight.
- Supports multiple landing pages with page-specific CTA messaging.

## Risks And Tradeoffs

- Static fallback copy can drift from `cta.json` if both are edited manually.
- Fetching CTA JSON introduces a small client-side dependency, though fallback content protects the page.
- Reusing one CTA component too broadly can make every page feel the same if page-specific copy is not maintained.
- Adding too many modifier classes can make the CSS harder to reason about.

## Recommendation

Start with the reusable CSS and HTML contract now. Add `assets/data/cta.json` and JavaScript rendering only when there are at least two landing pages that need different CTA copy.

For the current About page alone, static markup plus shared `.cta-section` CSS is enough. For multiple landing pages, use `data-cta-key` and a small defensive renderer so each page can reuse the same component while keeping page-specific copy.
