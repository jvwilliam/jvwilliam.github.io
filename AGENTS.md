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

## Repository / Branch Workflow
The user owns and manages the Git branch workflows. Branches are read-only from the agent's perspective. 

Agents must never: 
- Create, switch, rename, merge, rebase, or delete branches. 
- Create, move, remove, or manage Git worktrees. 
- Checkout another branch or commit. 
- Do not touch project files if the current branch is `main` or `master`.
- If the current branch is `main` or `master`, stop and ask the user to create or switch to a feature branch first.
- Check `git status` before editing so existing user changes are visible.
- Never overwrite, reset, revert, or clean up user changes unless the user explicitly asks.
- Commit, push, or open a pull request.
- After changes, summarize what changed and list any verification performed.

The user will perform all branch changes, commits, pushes, merges, rebases, and pull-request operations. 

### Before implementation changes
Before making any implementation change, inspect the current branch and working tree using read-only Git commands such as: 
```
git branch --show-current
git branch --short --branch
```
Then follow these rules: 
1. If the current branch is `main` or `master`, stop before editing and ask the user to create and switch to an implementation branch. 
2. If another branch is already checked out, inspect and check if there are existing changes. If there are existing changes, confirm if the user wants to continue to that branch. If no changes exists, continue on that branch.
3. Always preserve existing changes if user chooses to continue on a branch with existing changes.  Do not overwrite, discard, reset, clean, stash, or revert the existing changes. 
4. Do not require a particular implementation-branch name. 
5. Do not ask the user to rename an acceptable existing branch. 
6. Do not move or attempt to move the task to another branch. 
7. If there is no current branch, the repository is unaivalable, or the branch state cannot be determined, stop before implementation and ask the user to establish and check out an implementation branch.
8. If existing changes overlap the intended implementation and cannot be safely preserved, stop and ask the user how to proceed. 

Branch inspection is a safety check, not permission to modify Git state. 


### Work that does not require an implementation branch
The following work does not require the user to create or switch to a new branch: 
- Product discovery, documentation, or feature/user story definition. 
- Architecture analysis, decision, documentation or review. 
- Security analysis, documentation, or review. 
- QA planning, test execution, test analysis, or reporting. 
- Repository inspection and diagnostic investigation that do not modify files. 

These activities may proceed on main, master, or another branch. Agents may create or update non-implementation artifacts such as specifications, decision records, test plans, and review reports when the user has requested them. 

If any of these activities expands into implementation - such as changing runtime code, tests, assets, dependencies, build configuration, or application behavior - perform the branch and working-tree first and apply the implementation rules above. 

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

## CSS Reuse, Consistency, and Refactoring Rules
The existing CSS codebase is the source of truth. Always prioritize reusing and improving existing styles over introducing new CSS rules. 

### Mandatory Rules
1. Inspect Before Creating
    - Before writing any CSS, inspect the existing stylesheets, components, design tokens, utility classes, and CSS architecture. 
    - Search for existing selectors, classes, variables, and component styles that already achieve the required appearance or behavior. 
    - Understand how existing styles are organized before making changes. 
2. Reuse Existing CSS
    - Reuse existing CSS classes, design tokens, variables, and component styles whenever possible. 
    - If an existing selector can accommodate the requested change, modify that selector instead of creating another one. 
    - Avoid creating new classes when an existing class can be extended or reused without introducing unintended side effects. 
3. Refactor Instead of Duplicating
    - Never introduce duplicate CSS declarations or selectors unnecessarily.
    - If similar CSS rules already exist, evaluate whether they should be consolidated into a shared rule. 
    - Update the original declaration instead of appending another override at the bottom of a stylesheet. 
    - Remove obsolete or conflicting declarations when refactoring. 
    - Preserve the existing design system and visual consistency. 
4. Avoid CSS Overrides and Patches
    - Do not solve styling problems by repeatedly appending new CSS rules. 
    - Avoid unnecessary specificity escalation, excessive !important declarations, and redundant selectors. 
    - Do not introduce additional media queries if an existing responsive rules can be updated. 
    - Avoid creating multiple rules for the same selector across different stylesheets unless the existing architecture intentionally requires it. 
5. Respect Component and Styling Architecture
    - Follow the existing naming conventions and CSS organization. 
    - Keep styles scoped appropriately to their intended components. 
    - Avoid introducing global styles that unintentionally affect unrelated components. 
    - Use existing CSS variables and design tokens for colors, spacing, typography, borders, and other shared properties. 
6. New CSS Required Justification
    - Introduce new CSS selectors or declarations only when existing styles cannot reasonably accommodate the requirement. 
    - Before introducing new styles, verify that an equivalent implementation does not already exist. 
    - Prefer extending reusable components or styles over creating isolated implementations. 
    - If a new rule is neccesary, ensure it does not duplicate existing functionality. 

### No CSS Patching Policy
When a styling requirement is not satisfied: 
1. Investigate why the existing CSS is not producing the expected result. 
2. Identify the original declaration responsible for the behavior. 
3. Determine whether the issue is caused by specificity, inheritance, cascade order, component structure, or responsive rules. 
4. Fix the underlying cause at its source. 
5. Do not append another CSS rules simply to override the existing implementation. 

Appending CSS overrides without investigating the original implementation is considered incorrect solution unless explicitly justified by the existing architecture. 


### Required Validation Before Completion
Before considering a frontend styling task complete: 

- Review all modified CSS files. 
- Check for duplicates selectors and declarations. 
- Check for conflicting or redundant overrides. 
- Verify that existing responsive styles remain consistent.
- Confirm that shared components have not been unintentionally affected. 
- Remove obsolete CSS introduced or made unneccesary by the changes. 
- Verify the final appearance and behavior. 

**Important**: A visually correct implementation is not sufficient if it introduces unneccesary CSS duplication or technical debt. 

The objective is to maintain a clean, reusable, consistent, and maintenable CSS while satisfying the requested UI requirements.

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

## Change Handoff
After making authorized implementation changes: 
- Leave all changes uncommitted. 
- Report the files changes and the validations performed (if applicable).
- Clearly identify any remaining risks, failures, or follow-up work (if any).
- Hand control back to the user for branch/repository operations. 

## Completion Report
Always Summarize: 
- What changed. 
- Which tests or builds were executed and their results (if applicable).
- Any remaining ambuguities, limitation, or follow-up work.
- The active branch name.
- Include the skill used. (ex. Skill used: Product Strategy Specialist).