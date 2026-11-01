---
matra:
  entry: layout.matra
---
```layout.matra
html(lang=page.data.lang) {
  head {
    meta(charset="utf-8") {}
    meta(name="viewport" content="width=device-width, initial-scale=1") {}
    meta(name="description" content=page.data.description) {}
    meta(name="theme-color" content="#f5f4ed") {}
    title { page.data.title }
    link(rel="stylesheet" href="/assets/app.css") {}
  }
  body {
    header.site-header {
      div.shell.nav-shell {
        a.brand(href=page.data.homeUrl) {
          span.brand-mark { "M" }
          span { "Matra" }
        }
        nav(aria-label=page.data.navigationLabel) {
          a(href=page.data.homeUrl) { page.data.homeLabel }
          a(href=page.data.languageRoute lang=page.data.otherLang) {
            page.data.languageLabel
          }
        }
      }
    }
    main { ...page.content }
    footer.site-footer {
      div.shell.footer-inner {
        p { site.data.footerText }
        a(href=site.data.githubUrl) { "GitHub" }
      }
    }
  }
}
```
