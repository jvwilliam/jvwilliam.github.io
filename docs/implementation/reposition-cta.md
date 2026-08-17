# Reposition About Page CTA

**Status**: Ready for implementation

## Objective

Refine the About page CTA layout so the supporting copy and `Let's Talk` action feel connected, while preserving the current open-section design, site typography, and CTA underline interaction.

This is an implementation handoff document. It defines the desired change; it does not implement it.

## Current State

The About page CTA currently includes:

- Heading: `Flexible QA Support When Your Team Needs It`
- Supporting copy: `Need help covering a release, validating critical flows, or strengthening test coverage? Let's discuss where QA support can make the biggest impact.`
- CTA link: `Let's Talk`

The CSS places the heading and copy in the left column and the CTA link in the right column. The CTA link currently spans both rows:

```css
.cta-section__button {
  grid-column: 2;
  grid-row: 1 / span 2;
  justify-self: end;
}
```

This keeps the desktop layout clean, but the action can feel visually detached from the supporting copy because the reader scans the heading and paragraph on the left, then has to jump to the right-side action.

## Recommended Change

Keep the two-column desktop layout, but reposition the CTA link so it aligns with the supporting copy instead of spanning the full heading/copy block.

Recommended desktop placement:

```css
.cta-section__button {
  grid-column: 2;
  grid-row: 2;
  align-self: end;
  justify-self: end;
}
```

This keeps the heading dominant while making the action feel like the natural next step after the paragraph.

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
- Keep the desktop layout as two columns:
  - Left column: heading and supporting copy.
  - Right column: CTA link.
- Position the CTA link on the second row, aligned with the supporting copy.
- Preserve mobile stacking order:
  - Heading.
  - Supporting copy.
  - CTA link.

### Should Have

- Keep spacing tight enough that the CTA feels connected to the copy.
- Keep the CTA right-aligned on desktop and left-aligned on mobile.
- Ensure the CTA does not overlap or visually collide with long heading/copy text.
- Keep the section responsive across common desktop, tablet, and mobile widths.

### Out Of Scope

- Rewriting CTA heading, supporting copy, or CTA label.
- Changing the placeholder CTA link destination.
- Redesigning the full About page.
- Changing navigation, footer, SEO metadata, analytics, structured data, or profile data.
- Introducing JavaScript, dependencies, frameworks, build tools, or new assets.

## Acceptance Criteria

- Given a desktop viewport, when the About page CTA is viewed, then the heading and supporting copy appear stacked in the left column.
- Given a desktop viewport, when the About page CTA is viewed, then the `Let's Talk` link appears in the right column aligned with the supporting copy row.
- Given a mobile viewport, when the About page CTA is viewed, then the heading, supporting copy, and CTA link stack in a readable single-column order.
- Given a user hovers or focuses the CTA link, then only the custom pseudo-element underline appears.
- Given a keyboard user tabs to the CTA link, then focus remains visible.
- Given existing tests target CTA selectors, then the existing `data-testid` values continue to exist.

## Suggested CSS Direction

Adjust the CTA button grid placement from spanning two rows to occupying the second row:

```css
.cta-section__button {
  grid-column: 2;
  grid-row: 2;
  align-self: end;
  justify-self: end;
}
```

Keep or confirm the mobile override resets the placement:

```css
@media (max-width: 768px) {
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
