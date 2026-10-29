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

The site is generated from named Matra/JavaScript fences in `src/content/site.md` and content in `src/content/pages.mjs`. The build executes the Markdown document through `@matra/core/experimental/literate` and renders HTML with `@matra/html`. The literate API is experimental and Node.js-only; build only source you trust.

## URLs

| URL | Purpose |
| --- | --- |
| `/`, `/en/` | Japanese and English home pages |
| `/about/`, `/en/about/` | What Matra is |
| `/examples/`, `/en/examples/` | Example executed during the build |
| `/docs/`, `/en/docs/` | Setup and documentation |
| `/spec/`, `/en/spec/` | v0.3 specifications and release scope |
| `/play/`, `/en/play/` | Current v0.3 Playground status |
| `/packages/`, `/en/packages/` | Published packages |
| `/blog/`, `/en/blog/` | Development log |

The existing `/spec/data-model/`, `/spec/ast/`, `/spec/grammar/`, and `/spec/parser/` URLs remain available as overview pages. Set `SITE_BASE_PATH` for GitHub Pages project paths; CI obtains it from the Pages configuration.

## Scope

Website dependencies are pinned to the published `@matra/core@0.3.0-alpha.0` and `@matra/html@0.3.0-alpha.0`. The literate API targets Node.js 22/24 and does not require Rust, a neighboring checkout, or an additional compiler download at runtime. The generated website is static HTML/CSS.

The browser Playground is not published because v0.3 compatibility, interruption and reruns, isolated previews, and real-browser measurements have not been verified. Node.js examples provide the alternative path. The literate API does not provide an OS sandbox or timeout guarantee.
