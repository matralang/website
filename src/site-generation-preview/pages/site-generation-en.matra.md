---
matra:
  entry: page.matra
site:
  route: /en/site-generation-preview/
  data:
    title: Site generation engine preview — Matra
    description: A preview page built with Matra's declarative site-generation engine.
    lang: en
    navigationLabel: Main navigation
    homeLabel: Matra home
    languageRoute: /site-generation-preview/
    otherLang: ja
    languageLabel: 日本語
    heading: Site generation engine preview
    bodyText: This page uses Matra's preview site-generation engine for a Markdown page, a shared layout, and route output. The existing website build and other pages are unchanged.
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
        h2 { "A small trial without replacing the existing site" }
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
