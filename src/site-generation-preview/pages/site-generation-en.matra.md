---
matra:
  entry: page.matra
site:
  route: /en/site-generation-preview/
  layout: preview
  data:
    title: Site generation engine preview — Matra
    description: A preview page built with Matra's declarative site-generation engine.
    lang: en
    navigationLabel: Main navigation
    homeLabel: Matra home
    homeUrl: /en/
    languageRoute: /site-generation-preview/
    otherLang: ja
    languageLabel: 日本語
    heading: Site generation engine preview
    bodyText: This site uses Matra's preview site-generation engine for all pages and assets. This page demonstrates a shared layout, route output, and page data.
    detailsLabel: Trial scope
    detailsText: This checks isolated page data, a shared layout, directory-style URLs, and the GitHub Pages base path. External data extensions and watch mode are not included.
---
```page.matra
div.site-generation-preview {
  section.hero {
    div.shell.hero-inner {
      p.eyebrow { "SITE GENERATION / PREVIEW" }
      h1 { page.data.heading }
      p.lede { page.data.bodyText }
      div.actions {
        a.button.primary(href=page.data.languageRoute) {
          page.data.languageLabel
        }
      }
    }
  }
  section.features {
    div.shell {
      div.section-heading {
        p.eyebrow { page.data.detailsLabel }
        h2 { "One generation pipeline for every page" }
      }
      div.feature-grid {
        article.feature-card {
          p { page.data.detailsText }
        }
      }
    }
  }
}
```
