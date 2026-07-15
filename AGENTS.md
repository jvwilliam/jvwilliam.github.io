# AGENTS.md

## Project Overview

This repository is a static GitHub Pages website for JV William Andal. It serves as a personal website, online resume, and QA testing services profile focused on web application testing, functional testing, test automation, quality engineering, and web application security testing.

The site is built with plain HTML, CSS, and JavaScript. It is hosted through GitHub Pages using the custom domain configured in `CNAME`.

## Project Structure

- `index.html` contains the main page markup, SEO metadata, Open Graph tags, Google Analytics setup, structured data, and fallback/static content.
- `css/styles.css` contains the active site styling.
- `css/styles-backup.css` is a backup stylesheet and should not be treated as the primary source of truth unless explicitly requested.
- `js/scripts.js` handles navigation behavior, profile rendering, timeline animation, and dynamic content loading.
- `assets/data/profile.json` stores structured resume/profile data used by JavaScript render functions.
- `assets/img/` contains profile images, favicons, Open Graph image assets, and site manifest assets.
- `.github/workflows/playwright.yml` runs external Playwright tests from `jvwilliam/jvwilliam-playwright`.

## Repository Workflow

- Always check the current Git branch before making codebase changes.
- Do not touch project files if the current branch is `main` or `master`.
- If the current branch is `main` or `master`, stop and ask the user to create or switch to a feature branch first.
- Use feature branches for all edits. Prefer branch names that describe the work, such as `codex/update-agent-instructions` or `codex/seo-copy-update`.
- Check `git status` before editing so existing user changes are visible.
- Do not overwrite, revert, or clean up user changes unless the user explicitly asks.
- Keep commits focused by topic when the user asks for commits.
- Do not force push, reset hard, delete branches, or rewrite history unless the user explicitly requests it.
- After changes, summarize what changed and list any verification performed.

## Guard Rails

- Do not modify project files unless the user explicitly asks for edits.
- Before changing content, determine whether the update belongs in `index.html`, `assets/data/profile.json`, or both.
- Preserve SEO-critical metadata in `index.html`, including:
  - `<title>`
  - meta description
  - canonical URL
  - Open Graph tags
  - structured data JSON-LD
  - Google Analytics tag
- Preserve existing `data-testid` attributes unless the user explicitly asks to change test selectors.
- Treat `assets/data/profile.json` as user-facing resume data. Do not invent roles, dates, certifications, clients, locations, or claims.
- Keep external profile/contact links accurate and intentional. Do not add new social/contact links without user confirmation.
- Do not remove `CNAME` or change the custom domain unless explicitly requested.
- Do not remove or disable the GitHub Actions workflow unless explicitly requested.
- Do not assume Playwright tests live in this repository. The current workflow checks out the external `jvwilliam/jvwilliam-playwright` repository.
- Avoid introducing build tools, frameworks, package managers, or bundlers unless the user explicitly requests a larger technical migration.
- Keep the site lightweight and compatible with static GitHub Pages hosting.
- Prefer small, focused changes over broad rewrites.
- Preserve accessibility basics:
  - meaningful link text
  - valid heading order where practical
  - usable keyboard navigation
  - alt text for meaningful images
  - ARIA labels on icon-only or menu controls
- Preserve security hygiene:
  - use `rel="noopener noreferrer"` for external links opened with `target="_blank"`
  - escape dynamic content rendered from JSON
  - do not add secrets, API keys, or private tokens to the repo

## Coding Style

- Use plain HTML, CSS, and vanilla JavaScript.
- Match the existing naming style for CSS classes and section IDs.
- Keep JavaScript defensive around missing DOM elements.
- Keep user-facing copy professional, concise, and aligned with QA/testing services.
- Use existing CSS variables where possible before adding new colors.
- Avoid unnecessary dependencies.
- Keep comments useful and brief.

## Verification

This project does not currently require a package install or local build step.

To preview locally, use a simple static server from the repository root:

    python3 -m http.server 8000

Then open:

    http://localhost:8000

Before finishing changes, verify:

- The page still loads as a static site.
- Navigation anchors still work.
- Mobile hamburger menu still works.
- Dynamic profile data still renders from `assets/data/profile.json`.
- No important SEO, analytics, or structured data was accidentally removed.
- No test selectors were renamed unintentionally.
- External links still point to the intended destinations.
- Responsive layout works on mobile and desktop widths.