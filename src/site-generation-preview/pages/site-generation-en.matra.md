---
description: "A preview page built with Matra's declarative site-generation engine."
lang: en
navigationLabel: "Main navigation"
homeLabel: "Matra home"
homeUrl: /en/
languageRoute: /site-generation-preview/
otherLang: ja
languageLabel: 日本語
bodyText: "This site uses Matra's preview site-generation engine for all pages and assets. This page demonstrates a shared layout, route output, and page data."
detailsLabel: "Trial scope"
detailsText: "A Card component loaded through site.components is reused by both a page and its layout, then expanded to ordinary HTML. The preview also checks page data, shared layouts, directory-style URLs, and the GitHub Pages base path."
---

# Site generation engine preview

The page body is kept as a named Matra block; its bilingual copy is supplied separately.

````page.matra
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
        Card({ className: "feature-card", title: "Shared component" }, [
          p { page.data.detailsText }
        ])
      }
    }
  }
}
````
