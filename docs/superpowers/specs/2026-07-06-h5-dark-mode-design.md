# H5 Dark Mode Design

Date: 2026-07-06
Branch: `h5_darkmodel`

## Goal

Add a site-wide dark mode for the Astro H5/static site without changing page layout, spacing, content hierarchy, or card dimensions. The default theme follows the user's system preference, and a header control lets the user switch between light and dark manually.

## User Experience

- First visit: use `prefers-color-scheme` to select light or dark.
- Manual switch: place a compact theme button in the top-right header action area, next to search.
- Persistence: store explicit user choice in `localStorage`.
- Accessibility: expose the button with `aria-label`, `aria-pressed`, and visible focus state.
- No layout deformation: the button uses a fixed square footprint and existing header spacing rules.

## Architecture

- `src/layouts/SiteLayout.astro`
  - Add an early inline theme boot script in `<head>` before the stylesheet to prevent a light/dark flash.
  - Add the header theme toggle button.
  - Bump the stylesheet asset version after CSS changes.
- `public/site.js`
  - Read and write the saved theme preference.
  - Apply `data-theme="light"` or `data-theme="dark"` to `<html>`.
  - Keep the button state and label synchronized.
  - React to system theme changes only when the user has not made a manual choice.
- `public/styles.css`
  - Keep existing light tokens as the default.
  - Add dark token overrides under `html[data-theme="dark"]`.
  - Replace or override hard-coded light surfaces, borders, shadows, and text colors that would break in dark mode.
  - Keep dimensions, display rules, grid/flex layout, padding, margin, and border radius stable.

## Visual Direction

Dark mode should use a practical "dark UI" palette: near-black page background, slightly raised card surfaces, softened borders, readable gray text, and the existing blue/teal accents adjusted for contrast. The result should feel like the current product in a dark environment, not a redesign.

## Testing

- Run the static test suite.
- Run an Astro production build.
- Inspect rendered pages in desktop and mobile widths, covering:
  - home
  - tool directory
  - tool detail
  - blog index
  - article detail
  - category pages
  - about
- Check both default system-following behavior and manual toggle persistence.

