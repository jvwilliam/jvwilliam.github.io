# Reposition About Page CTA

**Status**: Ready for implementation

## Objective

Refine the About page CTA layout so the heading, supporting copy, and `Let's Talk` action follow a natural reading path, while preserving the current open-section design, site typography, and CTA underline interaction.

This is an implementation handoff document. It defines the desired change; it does not implement it.

## Current State

The About page CTA currently includes:

- Heading: `Flexible QA Support When Your Team Needs It`
- Supporting copy: `Need help covering a release, validating critical flows, or strengthening test coverage? Let's discuss where QA support can make the biggest impact.`
- CTA link: `Let's Talk`

The CSS places the heading and copy in the left column and the CTA link in the right column. A later adjustment moved the CTA link to the second row:

```css
.cta-section__button {
  grid-column: 2;
  grid-row: 2;
  align-self: end;
  justify-self: end;
}
```

This still feels visually awkward because the CTA is a text-style link, not a filled button. Placing a lightweight text CTA far right makes it feel detached and underpowered. The reader scans the heading and paragraph on the left, then has to jump to a separate right-side action.

## Recommended Change

Use a single-column CTA composition. Place the CTA link directly under the supporting copy on the left.

Recommended layout:

```text
Flexible QA Support When Your Team Needs It

Need help covering a release, validating critical flows, or strengthening test coverage? Let's discuss where QA support can make the biggest impact.

Let's Talk
```

Recommended CSS direction:

```css
.cta-section__inner {
  grid-template-columns: minmax(0, 760px);
  justify-content: start;
  row-gap: 1rem;
}

.cta-section__button {
  grid-column: 1;
  grid-row: auto;
  justify-self: start;
  margin-top: 0.5rem;
}
```

This makes the CTA feel like the natural next step after the copy. It also matches the homepage hero CTA pattern better because the no-border text link works strongest when it follows the content it completes.

## Scope

### Must Have

- Update only the CTA section layout on the About page.
- Preserve the existing CTA section markup unless a minimal structural change is necessary.
- Keep the existing section id and test IDs:
  - `section-cta`
  - `section-cta-container`
  - `section-cta-primaryHeading`
  - `section-cta-copy`
  - `section-cta-contactLink`
- Keep the current open-section treatment; do not add a card, border, translucent panel, or filled CTA button.
- Preserve the current pseudo-element underline hover behavior for CTA links.
- Use a single-column CTA layout on desktop and mobile:
  - Heading.
  - Supporting copy.
  - CTA link.
- Position the CTA link directly under the supporting copy.
- Keep the CTA left-aligned.

### Should Have

- Keep spacing tight enough that the CTA feels connected to the copy.
- Use a modest top margin on the CTA link if needed to separate it from the paragraph.
- Ensure the CTA does not overlap or visually collide with long heading/copy text.
- Keep the section responsive across common desktop, tablet, and mobile widths.

### Out Of Scope

- Rewriting CTA heading, supporting copy, or CTA label.
- Changing the placeholder CTA link destination.
- Redesigning the full About page.
- Changing navigation, footer, SEO metadata, analytics, structured data, or profile data.
- Introducing JavaScript, dependencies, frameworks, build tools, or new assets.

## Acceptance Criteria

- Given a desktop viewport, when the About page CTA is viewed, then the heading, supporting copy, and `Let's Talk` link appear in a single left-aligned column.
- Given a desktop viewport, when the About page CTA is viewed, then the `Let's Talk` link appears directly under the supporting copy.
- Given a mobile viewport, when the About page CTA is viewed, then the heading, supporting copy, and CTA link stack in a readable single-column order.
- Given a user hovers or focuses the CTA link, then only the custom pseudo-element underline appears.
- Given a keyboard user tabs to the CTA link, then focus remains visible.
- Given existing tests target CTA selectors, then the existing `data-testid` values continue to exist.

## Suggested CSS Direction

Change the CTA section from a left-content/right-action grid to a single-column layout:

```css
.cta-section__inner {
  grid-template-columns: minmax(0, 760px);
  justify-content: start;
  row-gap: 1rem;
}

.cta-section__button {
  grid-column: 1;
  grid-row: auto;
  justify-self: start;
  margin-top: 0.5rem;
}
```

Keep or simplify the mobile override so it does not fight the desktop layout:

```css
@media (max-width: 768px) {
  .cta-section__inner {
    grid-template-columns: 1fr;
  }

  .cta-section__button {
    grid-column: 1;
    grid-row: auto;
    justify-self: start;
  }
}
```

## Verification Checklist

- Serve the site locally with `python3 -m http.server 8000`.
- Open `http://localhost:8000/about/`.
- Confirm the CTA layout on desktop width.
- Confirm the CTA layout on mobile width.
- Confirm the CTA hover underline appears once, not twice.
- Confirm keyboard focus is visible on the CTA link.
- Confirm existing CTA test IDs are still present.
- Confirm no unrelated About page content changed.
