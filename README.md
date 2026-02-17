# Simple Logo Gallery

A WordPress block that displays a row of logos normalized for consistent visual weight using [react-logo-soup](https://github.com/sanity-labs/react-logo-soup). The block exposes its own simple spacing and size controls, and renders via React on the front end.

## Description

Simple Logo Gallery lets you pick multiple logo images from the Media Library and renders them in a row with normalized size and visual weight. A small React app (react-logo-soup) runs both in the editor and on the front end to keep the layout consistent.

## Features

- Select multiple logos from the Media Library (multi-select supported)
- Logos are normalized client-side by `react-logo-soup` for consistent appearance
- **Gap** control (numeric slider) to set the space between logos
- **Size** control (numeric slider) to adjust the base size used for normalization
- Dynamic PHP render + React hydration view script (no saved HTML)

## Installation

1. Copy the `simple-logo-gallery` folder to `wp-content/plugins/`
2. Activate the plugin in the Plugins screen
3. Add the “Simple Logo Gallery” block from the block inserter

## Usage

1. Add the **Simple Logo Gallery** block.
2. In the placeholder, drag-and-drop logos or click to open the Media Library and select one or more images.
3. After logos are selected, use the **Edit** button in the block toolbar to change or reorder the selection.
4. In the sidebar under **Dimensions**, use:
   - **Block spacing** to control the gap between logos.
   - **Size** to control the base size used by `react-logo-soup` when normalizing logos.

## Development

### Prerequisites

- Node.js (v14+)
- npm
- Composer (for PHP linting)

### Setup

```bash
npm install
composer install
```

### Build

```bash
npm run build
```

This runs two Webpack builds:

- `src/editor.js` → `dist/editor.js` (editor script, uses WordPress’ React)
- `src/view.js` → `dist/view.js` (front-end view, bundles React + ReactDOM)

After the view bundle is built, `scripts/write-view-asset.js` writes `dist/view.asset.php` so WordPress can enqueue the script with a generated version.

### Development

```bash
npm run start
```

### Lint / format

- Lint: `npm run lint` (JS, PHP)
- Format: `npm run format` (JS)

## Notes

- Logo images are analyzed client-side (canvas). Use same-origin or CORS-enabled image URLs for reliable behavior.
- Gap and Size are stored as plain numeric attributes; the React view script reads those values from `data-block-gap` and `data-base-size` and passes them directly to `react-logo-soup`.

## License

GPL-2.0-or-later. See [LICENSE](LICENSE).
