# Matra Website

[English](./README.md) | [日本語](./README.ja.md)

The official Matra website. Following the v0.3 plan, it provides bilingual entry points, runnable examples, setup instructions, and links to the specifications as static HTML and CSS.

## Development

Use Node.js 22 or 24.

```sh
npm ci
npm test
npm run build
npm run serve
```

All pages and assets are published through `@matra/site-generation`. `src/content/pages.mjs` provides bilingual page data, `src/content/page.matra` renders page bodies, and `src/content/site.md` is the shared document layout. `src/build.mjs` executes the runnable example, prepares demo data, and bundles browser scripts with esbuild before calling the site generator once.

The build recreates `.matra-site/` as intermediate input and writes `matra.site.json` with the selected `SITE_BASE_PATH`. Both are generated, ignored files: edit the sources instead. Page data is passed as Markdown front matter, not injected JavaScript. Only build trusted Matra source; the literate API is experimental and Node.js-only.

To add, update, or remove a page, edit its Japanese and English definitions in `src/content/pages.mjs`, including navigation and sitemap links. Update the expected route list in `test/run.js` when changing public routes. The preview routes retain their own page/layout sources in `src/site-generation-preview/`, but now use the same build and output manifest as the rest of the site.

## URLs

| URL | Purpose |
| --- | --- |
| `/`, `/en/` | Japanese and English home pages |
| `/about/`, `/en/about/` | What Matra is |
| `/examples/`, `/en/examples/` | Build-time example and interactive SVG/MathML demos |
| `/docs/`, `/en/docs/` | Setup and documentation |
| `/spec/`, `/en/spec/` | v0.3 specifications and release scope |
| `/play/`, `/en/play/` | HTML-only browser Playground |
| `/packages/`, `/en/packages/` | Published packages |
| `/blog/`, `/en/blog/` | Development log |

The existing `/spec/data-model/`, `/spec/ast/`, `/spec/grammar/`, and `/spec/parser/` URLs remain available as overview pages. Set `SITE_BASE_PATH` for GitHub Pages project paths; CI obtains it from the Pages configuration.

The site-generation demonstration pages remain available at `/site-generation-preview/` and `/en/site-generation-preview/`.

Home links return to the matching language (`/` or `/en/`). `npm test` checks the full
Core/HTML/site-generation dependency tree, the complete expected route set, page metadata and headings,
internal links and script/stylesheet references with and without a base path, and byte-identical HTML
for every route on repeated builds. Isolated migration tests cover page addition, updates, deletion,
route changes, asset updates/deletion, unmanaged-file preservation, and output/manifest preservation
after page-rendering or asset-build failures.

The migration retains all 26 public routes. The stylesheet intentionally moves from `/app.css` to
`/assets/app.css`; browser bundle names are unchanged. During migration, all 24 pre-existing non-preview
pages matched the old HTML after this stylesheet URL substitution, and CSS/JavaScript contents matched.
The preview copy now describes the unified build. Browser checks of navigation, responsive layouts,
Playground execution, and demos remain necessary before publishing a release.

## Deployment

GitHub Pages deploys only from `production`. Push the verified commit to `production` to publish, or manually run the Pages workflow on that branch. The `github-pages` environment must allow only the `production` branch. Pushes to `develop` or `main` do not deploy.

## Scope

The website build uses the prereleases `@matra/core@0.3.1-site.0`, `@matra/site-generation@0.1.0-site.2`, and `@matra/html@0.3.1-site.0`. These versions are for trial use, not stable support. The literate API targets Node.js 22/24 and does not require Rust, a neighboring checkout, or an additional compiler download at runtime. The generated site is static HTML/CSS plus client/Worker assets for the Playground and focused demos.

`dist/.matra-site-manifest.json` tracks generated pages and assets between builds. The build does not delete `dist/`: the generator removes only obsolete managed files and preserves files outside the manifest. Failed builds preserve the previous published output and manifest. When migrating an existing `dist/` without a manifest, review and remove obsolete old outputs such as `app.css` manually; a fresh checkout generates only the new output paths.

Dependency audit warnings remain unresolved and are not cleared by this migration. Review `npm audit` and assess their impact before publishing.

`/examples/` and `/en/examples/` include an SVG demo with circle count/radius controls and a MathML `a × x²` demo with coefficient a/input x controls. Numeric inputs are checked for range and step before being passed into fixed Matra documents. The Core browser API and HTML renderer update both the preview and executed source. Arbitrary code is not accepted; execution runs on the main thread, not in a Worker. Initial results are generated at build time and remain visible without JavaScript (controls are disabled).

These demonstrate Core/HTML v0.3.0 document structure and browser-native SVG/MathML, not dedicated `@matra/graphics`/`@matra/math` API support, symbolic computation, or mathematical equivalence. Numeric calculation uses Core's basic arithmetic. Demo definitions, validation, and rendering live in `src/demos/render.mjs`; bilingual copy lives in `src/content/pages.mjs`. `npm test` verifies input bounds, output, bilingual pages, and base paths.

`/play/` and `/en/play/` provide an HTML-only browser Playground prototype. It bundles the Core browser API and HTML renderer into a Worker, with explicit Run, manual stop, a 10-second timeout, syntax/runtime error display, and a sandboxed iframe preview.

A representative integrated Chromium measurement was 3,374 bytes for the client (1,464 bytes gzip) and 17,588 bytes for the Worker (5,722 bytes gzip). A short sample responded in 25 ms on its first run and 16–18 ms over the next four runs. These are local observations, not performance guarantees.

The Playground is experimental and does not provide SVG, Math, JavaScript module imports, copy/download, or a general-purpose security sandbox. Worker termination and iframe sandboxing do not guarantee isolation from malicious source. Do not run untrusted source or input containing sensitive information. The `@matra/core/experimental/literate` API is also Node.js-only and provides no OS sandbox or timeout guarantee.
