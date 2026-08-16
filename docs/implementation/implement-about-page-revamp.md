# Implement About Page Revamp

**Status**: Completed

## Objective

Create a static dedicated About page at `/about/` that contains the existing About, Experience, and Tools & Technologies content, while keeping the home page focused on the service offer and primary conversion path.

This is an implementation handoff document. It defines what the future coding task should deliver; it does not implement the change.

## Source Product Brief

- Product brief: `docs/tasks/About Page Revamp.md`
- Resolved decisions:
  - About page URL should be `/about/`.
  - Home page should include a compact credibility teaser for now.
  - Experience should be removed from the top-level navigation.
  - Tech should be removed from the top-level navigation for now.
  - Existing copy should stay exactly as it is for now.

## User Outcome

Visitors who want more credibility detail can navigate to a dedicated About page and review JV William Andal's background, work history, tools, certification, and contact paths without the home page becoming resume-heavy.

## Implementation Scope

### Must Have

- Add a dedicated About page that resolves at `/about/` on GitHub Pages.
- Move the existing `#section-about` content from the home page to the About page.
- Move the existing `#section-experience` content from the home page to the About page.
- Move the existing `#section-competency` content from the home page to the About page.
- Keep the current About, Experience, and Tools & Technologies copy exactly as it is for now.
- Preserve existing dynamic rendering from `assets/data/profile.json` for:
  - Experience timeline content.
  - Programming Languages & Technologies.
  - Platforms & Tools.
- Keep useful static fallback content for moved sections when JavaScript or JSON loading fails.
- Update top-level navigation so it includes `About` but does not include `Experience` or `Tech`.
- Point the `About` top-level navigation item to `/about/`.
- Keep home-page navigation free of links to removed in-page anchors.
- Add a compact credibility teaser on the home page that links to `/about/`.
- Preserve existing SEO-critical home-page metadata, Google Analytics, structured data, `CNAME`, and GitHub Actions workflow.
- Preserve relevant `data-testid` attributes unless an intentional downstream test update is documented.

### Should Have

- Give the About page its own metadata:
  - `<title>`
  - meta description
  - canonical URL for `https://jvwilliam.com/about/`
  - Open Graph title, description, URL, site name, type, and image
- Keep a clear path from the About page back to the home page.
- Keep the mobile hamburger menu behavior consistent across the home page and About page.
- Use one primary `h1` on the About page and preserve logical heading order for moved sections.
- Reuse the existing stylesheet and design language before adding new scoped styles.
- Keep JavaScript defensive when a page does not contain every render target.

### Out Of Scope

- Rewriting About, Experience, Tools, certification, or service copy.
- Changing roles, dates, employers, certifications, profile claims, links, or contact details.
- Adding new social links or contact channels.
- Adding a framework, package manager, bundler, or build step.
- Redesigning the full visual system.
- Changing the external Playwright repository or GitHub Actions workflow unless separately requested.

## Page Requirements

### Home Page

- Keep the home page focused on the current service positioning.
- Remove the full About, Experience, and Tools & Technologies sections from the home page after they are available on `/about/`.
- Keep `#section-expertise` available because existing hero and navigation flows reference Expertise.
- Add a compact credibility teaser using existing copy or a minimal non-rewriting treatment.
- The teaser should link to `/about/`.
- The teaser should not duplicate the full Experience timeline, full tool lists, or full About bio.

### About Page

- The page should be available at `/about/`.
- The page should include:
  - Existing About/profile content.
  - Existing Experience timeline.
  - Existing Tools & Technologies content.
  - Existing profile image, ISTQB badge link, LinkedIn link, and email link.
- The page should support dynamic rendering from `assets/data/profile.json`.
- The page should remain useful if JavaScript is unavailable.
- The page should use the same header, navigation, and footer pattern as the home page.

## Navigation Requirements

- Top-level navigation should not include `Experience`.
- Top-level navigation should not include `Tech`.
- Top-level navigation should include `About` and link to `/about/`.
- Home-page section links should only point to sections that still exist on the home page.
- About-page navigation should allow users to return to relevant home-page sections where appropriate.
- Mobile navigation should open, close, and follow links correctly on both pages.

## JavaScript Requirements

- `js/scripts.js` should not throw errors when a render target is missing from the current page.
- Experience rendering should run only when the Experience container exists.
- Tools rendering should run only when the language and platform containers exist.
- Expertise rendering should run only when the Expertise container exists.
- Mobile navigation behavior should work across both pages.
- Dynamic content rendered from JSON should continue escaping unsafe text.

## SEO And Metadata Requirements

- Preserve current home-page SEO metadata unless a page-specific link must change because content moved.
- Add About-page-specific metadata instead of duplicating the home-page canonical URL.
- Keep Open Graph image usage intentional and valid.
- Preserve Google Analytics setup.
- Preserve structured data unless a separate SEO task approves changes.

## Accessibility Requirements

- Preserve meaningful link text.
- Preserve useful alt text for meaningful images.
- Keep icon-only controls labeled with accessible names.
- Keep keyboard focus visible and navigation reachable.
- Ensure heading order remains logical after sections are moved.
- Ensure external links opened in a new tab use `rel="noopener noreferrer"`.

## Acceptance Criteria

- Given a visitor opens `https://jvwilliam.com/about/`, when the page loads, then the About page displays existing About/profile content.
- Given a visitor opens `/about/`, when profile data loads successfully, then the Experience timeline renders from `assets/data/profile.json`.
- Given a visitor opens `/about/`, when profile data loads successfully, then Programming Languages & Technologies and Platforms & Tools render from `assets/data/profile.json`.
- Given JavaScript fails or `assets/data/profile.json` cannot load, when the About page renders, then fallback About, Experience, and Tools content remains visible enough to understand JV's background.
- Given a visitor is on the home page, when they use top-level navigation, then `Experience` and `Tech` are not shown as top-level nav items.
- Given a visitor is on the home page, when they select `About`, then navigation opens `/about/`.
- Given a visitor is on the home page, when they view the main content, then a compact credibility teaser is available and links to `/about/`.
- Given a visitor is on the home page, when they click any navigation item, then no link targets a removed home-page section.
- Given a visitor is on the About page, when they use navigation, then they can return to the home page or relevant home-page sections.
- Given a visitor uses a mobile viewport, when they open and select an item from the hamburger menu, then the menu closes and the selected destination works on both pages.
- Given a keyboard user tabs through either page, then links and menu controls are reachable with visible focus.
- Given external links open in a new tab, then each one includes `rel="noopener noreferrer"`.
- Given the About page is crawled, then it has a canonical URL of `https://jvwilliam.com/about/`.
- Given the home page is crawled, then existing SEO-critical metadata, analytics, and structured data are not accidentally removed.
- Given existing external Playwright tests depend on `data-testid` values, then selectors are preserved or required test updates are documented.

## Verification Checklist

- Serve the site locally with `python3 -m http.server 8000`.
- Open `http://localhost:8000/` and confirm the home page loads.
- Open `http://localhost:8000/about/` and confirm the About page loads.
- Confirm home-page top navigation excludes `Experience` and `Tech`.
- Confirm home-page `About` navigation opens `/about/`.
- Confirm the home-page credibility teaser links to `/about/`.
- Confirm the About page shows About/profile, Experience, and Tools & Technologies content.
- Confirm Experience data renders from `assets/data/profile.json`.
- Confirm tools data renders from `assets/data/profile.json`.
- Confirm the browser console has no runtime errors on either page.
- Confirm hamburger menu behavior on mobile width for both pages.
- Confirm layout at mobile and desktop widths.
- Confirm external links still point to intended destinations.
- Confirm SEO-critical metadata and Google Analytics remain present.

## Implementation Notes

- Prefer a directory-style page such as `about/index.html` so the public URL is `/about/`.
- Reuse existing markup, CSS classes, and JavaScript render functions where practical.
- Keep edits small and focused around page extraction, navigation, defensive rendering, and About-page metadata.
- Do not edit `assets/data/profile.json` unless a separate content update is approved.
- Do not rename `data-testid` values unless the external Playwright tests are intentionally updated.

## Remaining Product Questions

- None for this implementation pass. The previously open questions have been resolved in `docs/tasks/About Page Revamp.md`.
