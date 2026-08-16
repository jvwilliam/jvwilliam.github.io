# About Page Revamp

**Status**: Active

## Product Outcome

Create a dedicated About page that gives visitors a deeper view of JV William Andal's background, experience, and working toolkit without overloading the home page. The home page should remain focused on the service offer, while the About page should support trust-building for startup founders, product owners, engineering leads, and small web product teams evaluating QA support.

## Problem

The current site is a single-page experience where the personal background, career timeline, and tools stack live alongside the main service positioning. This makes the home page carry two jobs at once:

- Explain the QA testing service offer quickly.
- Present resume-style proof points and personal background.

A separate About page would let the home page stay sharper as a conversion page while giving interested visitors a clear place to review credibility, experience, technologies, certification, and contact options.

## Target Users

- Startup founders and indie product owners evaluating whether JV is credible enough to contact.
- Engineering or QA leads checking experience, tools, and domain fit.
- Recruiters or partners who want resume-style background details.
- Returning visitors who already understand the offer and want more context about the person behind it.

## Desired Behavior

Visitors can open an About page from the primary navigation and find the existing About content, Experience timeline, and Tools & Technologies content in one cohesive page. The home page keeps service-focused sections and links to the About page when visitors want deeper background.

## Current-State Notes

- `index.html` currently contains `#section-experience`, `#section-competency`, and `#section-about`.
- Navigation currently links to in-page anchors for `Experience`, `Tech`, and `About`.
- `js/scripts.js` dynamically renders experience data from `assets/data/profile.json` into `#section-experience-container`.
- `js/scripts.js` dynamically renders programming languages and platforms into `#section-language-list` and `#section-platform-list`.
- Static fallback markup for the Experience section already exists in `index.html`.
- The About section includes profile imagery, ISTQB badge link, short personal copy, LinkedIn, and email links.
- Existing `data-testid` attributes should be preserved unless tests are intentionally updated.

## Assumptions

- The new page will be a static GitHub Pages-compatible file, likely `about.html`, with no framework or build step.
- Existing content should be moved, not rewritten, unless a separate copy update is approved.
- The home page should not duplicate the full Experience timeline, Tools & Technologies list, or About bio after the revamp.
- SEO-critical metadata on the home page should remain intact.
- The About page can reuse existing CSS, JavaScript, profile data, and image assets.

## Proposed Scope

### Must Have

- Add a dedicated About page accessible from the site navigation.
- Move the current `section-about` content to the About page.
- Move the current Experience section to the About page.
- Move the current Tools & Technologies section to the About page.
- Update navigation so `About` points to the About page instead of the old home-page anchor.
- Keep home-page navigation useful after the moved sections are removed.
- Preserve dynamic rendering from `assets/data/profile.json` for experience and tools.
- Preserve existing profile image, ISTQB badge, LinkedIn link, and email link.
- Preserve accessibility basics, including meaningful alt text, keyboard navigation, and external-link safety.
- Preserve relevant `data-testid` values or document required downstream test updates.

### Should Have

- Add About-page-specific metadata: title, description, canonical URL, and Open Graph tags.
- Keep a clear path back to the home page from the About page.
- Include a contact CTA on the About page after the credibility sections.
- Review heading hierarchy so the About page has one primary `h1` and logical section headings.
- Keep the mobile hamburger menu behavior consistent across both pages.
- Ensure the About page works if profile JSON fails to load by retaining useful fallback content.

### Could Have

- Add a concise intro section at the top of the About page that frames the page around background, credibility, and tools.
- Add a short home-page teaser linking to the About page, such as "See experience and tools".
- Add breadcrumbs or a simple active navigation state if it fits the existing design.
- Add structured data updates if a separate SEO task confirms the right schema changes.

### Out Of Scope

- Rewriting resume history, dates, employers, certifications, or skill claims.
- Adding new social links or contact channels without confirmation.
- Introducing a framework, package manager, bundler, routing library, or build step.
- Redesigning the full visual system.
- Removing Google Analytics, canonical metadata, Open Graph metadata, `CNAME`, or GitHub Actions workflow.
- Changing external Playwright repository behavior unless test updates are explicitly requested.

## Recommended Page Structure

### Home Page After Revamp

- Top navigation
- Hero
- Expertise
- Service CTA
- Optional short About teaser
- Footer

### About Page

- Top navigation
- About intro/profile section using current `section-about` content
- Experience timeline using current `section-experience` content and profile JSON rendering
- Tools & Technologies using current `section-competency` content and profile JSON rendering
- Contact/social CTA
- Footer

## User Stories

```markdown
As a startup founder,
I want a dedicated About page with JV's background and experience,
so that I can quickly decide whether he is credible enough to contact.
```

```markdown
As an engineering lead,
I want to review JV's work history and tools in one place,
so that I can assess fit for our stack and QA workflow.
```

```markdown
As a site visitor on mobile,
I want the navigation to take me to the correct page or section,
so that I can browse without broken anchors or confusing menu behavior.
```

## Acceptance Criteria

- Given a visitor is on the home page, when they select `About` in the navigation, then the site opens the dedicated About page.
- Given a visitor is on the About page, when the page loads, then the current About bio, profile image, ISTQB badge, LinkedIn link, and email link are visible.
- Given profile data loads successfully, when the About page renders, then the Experience timeline is populated from `assets/data/profile.json`.
- Given profile data loads successfully, when the About page renders, then Programming Languages & Technologies and Platforms & Tools are populated from `assets/data/profile.json`.
- Given JavaScript fails or profile JSON cannot load, when the About page renders, then visitors still see useful fallback content for the moved sections.
- Given a visitor uses a mobile viewport, when they open and select an item from the hamburger menu, then the menu closes and navigation works.
- Given the home page no longer contains the moved sections, when a visitor uses the home-page navigation, then no link points to a removed in-page anchor.
- Given a visitor is on either page, when they use keyboard navigation, then interactive links and menu controls are reachable and visible.
- Given external links open in a new tab, then they include `rel="noopener noreferrer"`.
- Given existing automated tests rely on `data-testid` values, then preserved selectors continue to exist or required selector updates are documented.
- Given the About page is crawled, then it has a relevant `<title>`, meta description, canonical URL, and Open Graph tags.

## Implementation Handoff

This is a handoff for a separate implementation task, not an implementation performed under this product-strategy pass.

- Determine whether the new page should be `about.html` at the repository root.
- Move the `#section-about`, `#section-experience`, and `#section-competency` markup from `index.html` to the About page.
- Update `js/scripts.js` so dynamic rendering works on pages where some target containers do not exist.
- Keep JavaScript defensive around missing DOM elements because the home page and About page will have different section containers.
- Update navigation links on both pages for cross-page navigation, for example home links to `index.html#section-expertise` and About links to `about.html`.
- Preserve or intentionally update `data-testid` selectors used by the external Playwright workflow.
- Reuse `css/styles.css` and add only scoped styles needed for the About page layout.
- Avoid edits to `assets/data/profile.json` unless content changes are separately approved.

## Risks And Dependencies

- External Playwright tests may expect the current single-page anchors and selectors.
- Dynamic render functions currently assume some containers exist; moving sections can cause runtime errors unless scripts remain defensive.
- Duplicate IDs can occur if sections are copied instead of moved.
- SEO metadata needs deliberate About-page values to avoid duplicate home-page metadata.
- Static fallback content can drift from JSON-rendered content if both are maintained manually.

## Verification Checklist

- Home page loads as a static page.
- About page loads as a static page.
- Home-page navigation has no broken links.
- About-page navigation works from desktop and mobile.
- Hamburger menu opens and closes on both pages.
- Experience timeline renders from `assets/data/profile.json`.
- Tools & Technologies render from `assets/data/profile.json`.
- Fallback content remains meaningful if JavaScript or JSON loading fails.
- Existing external links still point to intended destinations.
- External new-tab links use `rel="noopener noreferrer"`.
- Layout is checked at mobile and desktop widths.
- No SEO, analytics, structured data, `CNAME`, or GitHub Actions configuration is accidentally removed.

## Open Questions

- Should the About page URL be `/about.html` or `/about/`?
  - Answer: Use `/about/`.
- Should the home page include a compact credibility teaser after the move?
  - Answer: Yes, include a compact credibility teaser for now.
- Should Experience remain in the primary nav, point to `about.html#section-experience`, or be removed from top-level navigation?
  - Answer: Remove Experience from the top-level navigation.
- Should Tools & Technologies remain in the primary nav, point to `about.html#section-competency`, or be available only within the About page?
  - Answer: Remove Tech from the top-level navigation for now.
- Should About-page copy stay exactly as-is, or should it be tightened during implementation?
  - Answer: Keep copy exactly as it is for now.

## Recommended Next Action

Run a separate implementation task to create the static About page, move the selected sections, update navigation, and verify static rendering. Because this task used the product-strategy-specialist role, implementation should be handled as a separate coding task with explicit approval.
