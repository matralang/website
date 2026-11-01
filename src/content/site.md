---
matra:
  entry: layout.matra
---

# Matra website

Shared document layout for site-generation. Page data is supplied by the build.

```layout.matra
let content = page.data;
html(lang=content.lang) {
  head {
    meta(charset="utf-8") {}
    meta(name="viewport" content="width=device-width, initial-scale=1") {}
    meta(name="description" content=content.description) {}
    meta(name="theme-color" content="#f5f4ed") {}
    title { content.title }
    link(rel="stylesheet" href="/assets/app.css") {}
    if (content.playgroundEnabled) {
      script(src="/assets/playground.js" type="module") {}
    }
    if (content.demosEnabled) {
      script(src="/assets/demos.js" type="module") {}
    }
  }
  body {
    header.site-header {
      div.shell.nav-shell {
        a.brand(href=content.homeUrl aria-label=content.brandLabel) {
          span.brand-mark { "M" }
          span { "Matra" }
        }
        nav(aria-label=content.navigationLabel) {
          ...for (item in content.navigation) {
            a(href=item.href) { item.label }
          }
          a.language-link(href=content.languageUrl lang=content.otherLang) {
            content.languageLabel
          }
        }
      }
    }
    ...page.content
    footer.site-footer {
      div.shell.footer-layout {
        nav.footer-sitemap(aria-label=content.sitemapLabel) {
          ...for (group in content.sitemapGroups) {
            section.footer-group {
              h2 { group.title }
              ...for (item in group.links) {
                a(href=item.href) { item.label }
              }
            }
          }
        }
        div.footer-inner {
          a.brand.footer-brand(href=content.homeUrl) {
            span.brand-mark { "M" }
            span { "Matra" }
          }
          p { content.footerText }
          a(href=content.githubUrl) { "GitHub" }
        }
      }
    }
  }
}
```
