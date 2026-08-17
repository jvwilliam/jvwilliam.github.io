# CTA Review

**Status**: Active

## Description: 

Current implementation is directionally clean: semantic section, clear heading, visible action, and it now matches the site's open dark-theme treatment instead of feeling like a separate component. The hero-style text CTA also fits the existing typography better than the filled pill. 

## Main issues I'd improve: 

### 1. CTA lacks enough action emphasis

The [Contact](https://demo.url) link is visually close to a text link, while the heading is large and dominant. For a final CTA, the action should feel more decisive. Keep the no-border hero style, but make the link more intentional: 
- Use `font-size: 2.4rem` desktop.
- Use  accent color by defeault, not only on hover. 
- Keep underline hidden until hover/focus. 

### 2. Section feels too compressed

`padding: clamp(1rem, 1rem, 1rem)` technically gives 16px, but visually it is tight for a CTA section with a `300px min-height`. The content may look like it is floating too close to the edges. Better:

`padding: 1rem;`

If you want clamp syntax;

`padding: clamp(1rem, 1rem, 1rem);`

But from a UI standpoint, I'd recommend increasing vertical breathing room through layout, not padding. 

`min-height: 240px;`

or keep 300px if you want a strong closing band. 

### 3. Heading and CTA relationship could be tighter

The current grid uses gap: 2rem, but because the heading is large and the CTA is far right on desktop, they may feel disconnected. Recommendation: 

    .cta-section__inner {
        grid-template-columns: minmax(0, 760px) auto;
        justify-content: space-between;
    }

This keeps the heading width intentional and pushes the CTA cleanly to the right.

### 4. CTA copy is generic

"Contact" works, but it is less compelling than the homepage's `Let's Talk`. Since this is a service-oriented portfolio, I'd use: 
- Let's Talk
- Start a QA Conversation
- Discuss QA Support

Best fit with the existing site: `Let's Talk`.

### 5. Placeholder href should be temporary only
`href=#` is acceptable while building, but it creates a dead action. Before shipping, use: 

    href="mailto:contact@jvwilliam.com"

## Recommended Direction

Keep the open layout, keep the hero-style link, change the CTA label to `Let's Talk`, make it accent-colored by default, and tune the grid so the heading and action feel like on componsed section rather than two separate items. 