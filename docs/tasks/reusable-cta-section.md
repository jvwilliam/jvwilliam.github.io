# Reusable CTA Section

**Status**: Completed

## Objective

Create a reusable call-to-action section pattern that can be used across static landing pages while preserving the site's plain HTML, CSS, vanilla JavaScript architecture, SEO-friendly fallback content, accessibility, and existing visual theme.

## Product Outcome

Visitors should see clear, page-relevant calls to action that feel consistent across the site and give them an obvious next step after reading service, credibility, or landing page content.

The site maintainer should be able to reuse the CTA pattern on future pages without duplicating styling logic, introducing a framework, or creating brittle page-specific markup.

## Target Users

- Startup founders and product owners evaluating QA support.
- Engineering leads reviewing service fit and credibility.
- Visitors who need a clear next step after reading page-specific proof or service content.
- The site maintainer updating CTA copy across static pages.

## Problem

CTA sections can become inconsistent as more landing pages are added. Without a defined reusable contract, each page may drift in markup, styling, hover behavior, test selectors, and link handling.

This site needs a reusable CTA pattern that stays static-site friendly and can evolve from simple static markup to optional shared data later.

## Recommended Implementation Decision

Use a reusable static HTML/CSS component with `assets/data/cta.json` and a defensive JavaScript renderer because the CTA is now shared by the home page and About page.

This remains static-site friendly because:

- The site currently works as static HTML.
- Static fallback content is better for SEO and no-JavaScript visitors.
- The fallback CTA content remains in each page.
- Shared JSON centralizes page-specific CTA copy.
- The renderer leaves fallback content in place if data loading fails.

## Proposed Scope

### Must Have

- Define one reusable CTA HTML contract using the existing `cta-section` class family.
- Preserve static fallback CTA markup on every page where the CTA appears.
- Preserve existing CTA `data-testid` values:
  - `section-cta`
  - `section-cta-container`
  - `section-cta-primaryHeading`
  - `section-cta-copy`
  - `section-cta-contactLink`
- Keep CTA styling in `css/styles.css`.
- Keep the component compatible with GitHub Pages static hosting.
- Do not introduce a framework, package manager, bundler, build step, or external dependency.
- Keep CTA copy page-relevant and publishable; do not use placeholder text in production-ready markup.
- Keep the CTA accessible with semantic section markup, a logical heading level, meaningful link text, visible focus, and no duplicate hover underline.
- Keep the existing pseudo-element underline behavior for text-style CTA links.

### Should Have

- Use the current centered CTA composition as the default variant:
  - Centered heading.
  - Centered supporting copy.
  - Centered CTA link.
  - Width-constrained inner container.
- Keep the component responsive without page-specific overrides.
- Use CSS custom properties or modifier classes only when they reduce real duplication.
- Use `data-cta-key` on reusable CTA sections.
- Store page-specific CTA copy in `assets/data/cta.json`.
- Use a defensive JavaScript renderer to hydrate CTA content.
- Leave fallback content untouched if CTA data loading fails.

### Could Have

- Add modifier classes for genuine future variants, such as:
  - `cta-section--compact`
  - `cta-section--left`
  - `cta-section--final`
- Add page-specific CTA analytics hooks if conversion tracking is later required.
- Add a secondary CTA only if a future landing page has a clear secondary action.

### Out Of Scope

- Rewriting all landing page copy.
- Changing global navigation behavior.
- Changing SEO metadata, Google Analytics, structured data, profile data, or external workflows.
- Adding unused visual variants before there is a real page need.
- Introducing any build tooling or frontend framework.
- Replacing the existing site-wide typography or visual theme.

## Reusable CTA HTML Contract

Each reusable CTA should follow this shape:

```html
<section class="cta-section" id="section-cta" data-testid="section-cta">
    <div class="cta-section__inner" id="section-cta-container" data-testid="section-cta-container">
        <h2 class="cta-section__heading" id="section-cta-primaryHeading" data-testid="section-cta-primaryHeading">Page-specific CTA heading</h2>
        <p class="cta-section__copy" data-testid="section-cta-copy">Page-specific CTA supporting copy.</p>
        <a class="cta-section__button" href="mailto:contact@jvwilliam.com" data-testid="section-cta-contactLink">Let's Talk</a>
    </div>
</section>
```

The fallback content must be useful on its own. Do not rely on JavaScript to make the CTA understandable.

## Default CTA Design Requirements

- The CTA should use the existing dark page background and should not introduce a card, border, translucent panel, or filled button unless a separate design task approves a variant.
- The CTA section should follow the same vertical rhythm as other major page sections.
- The CTA inner content should be centered and width-constrained.
- The heading should use the site's heading typography.
- The supporting copy should use the site's lead-copy style.
- The CTA link should use the text-style CTA pattern with the custom pseudo-element underline.
- The CTA should work cleanly on mobile and desktop without overlapping text or awkward orphan words where practical.

## Future Data-Driven Enhancement

When there are at least two landing pages with different CTA content, add:

```text
assets/data/cta.json
```

Each CTA entry should include:

- `heading`
- `copy`
- `linkLabel`
- `href`

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

If shared CTA data is added, CTA sections should include a page-specific key:

```html
<section class="cta-section" id="section-cta" data-testid="section-cta" data-cta-key="about">
```

## Future JavaScript Renderer Requirements

The CTA renderer should:

- Find all `[data-cta-key]` CTA sections.
- Load `/assets/data/cta.json`.
- Match each section to its CTA data by key.
- Update heading, copy, link label, and href using safe DOM APIs.
- Use `textContent` for text updates.
- Assign `href` directly after validating that a value exists.
- Leave static fallback content unchanged when:
  - No CTA sections exist.
  - The fetch fails.
  - A CTA key is missing.
  - A CTA field is missing.
- Avoid injecting HTML from JSON.
- Avoid throwing runtime errors on pages without CTA sections.

## User Stories

```markdown
As a visitor,
I want each landing page to end with a clear next step,
so that I know how to start a QA support conversation.
```

```markdown
As a startup founder or product owner,
I want CTA copy that matches the page I just read,
so that the action feels relevant to my current need.
```

```markdown
As the site maintainer,
I want one reusable CTA pattern,
so that landing pages stay visually consistent and easy to update.
```

```markdown
As a keyboard user,
I want the CTA link to be reachable and visibly focused,
so that I can take action without using a mouse.
```

## Acceptance Criteria

- Given a page includes a CTA section, when JavaScript is disabled, then the CTA heading, copy, and link remain visible.
- Given a page includes a CTA section, when viewed on desktop, then the CTA content is centered, readable, and width-constrained.
- Given a page includes a CTA section, when viewed on mobile, then the CTA content remains readable and does not overlap.
- Given a user hovers or focuses the CTA link, then only one custom underline appears.
- Given a keyboard user tabs to the CTA link, then focus is visible.
- Given automated tests target CTA selectors, then existing CTA `data-testid` values are preserved.
- Given a CTA link is production-ready, then it does not use `href="#"`.
- Given the reusable CTA component is added to another static page, then no new dependency or build step is required.
- Given future CTA JSON data fails to load, then static fallback content remains unchanged.
- Given a page does not include a CTA section, then any future CTA renderer does not throw a runtime error.

## Verification Checklist

- Confirm CTA fallback markup renders without JavaScript.
- Confirm CTA layout works at desktop width.
- Confirm CTA layout works at mobile width.
- Confirm CTA link hover/focus behavior has no duplicate underline.
- Confirm CTA keyboard focus is visible.
- Confirm CTA copy and link destination are page-appropriate.
- Confirm existing CTA `data-testid` selectors are present.
- Confirm no new dependencies, package managers, frameworks, or build steps were introduced.
- If a future data renderer is added, confirm missing data and failed fetch states preserve fallback content.

## Risks And Tradeoffs

- Static fallback copy can drift from future CTA JSON if both are edited manually.
- Fetching CTA JSON would introduce a small client-side dependency, though fallback content protects the page.
- Reusing one CTA component too broadly can make every page feel generic if page-specific copy is not maintained.
- Adding too many modifier classes can make the CSS harder to reason about.
- Keeping the CTA as a text-style link may be visually subtle on some landing pages; use a filled-button variant only if a future design task justifies it.

## Open Questions

- Which pages besides About will need CTA sections?
  - Answer: Homepage 
- Should the final production CTA link always use `mailto:contact@jvwilliam.com`, or will any page require a different destination?
  - Answer: Yes for now.
- Will conversion tracking be needed for CTA clicks?
  - Answer: Can be out of scope for now.
- Should future CTA copy live in `assets/data/cta.json` or remain static in each page until more pages exist?
  - Answer: Yes, should live in `assets/data/cta.json`

## Recommendation

For the current implementation pass, standardize reusable CTA markup/CSS, use `assets/data/cta.json` for home/About CTA copy, and keep the renderer defensive so static fallback content remains the source of resilience.
