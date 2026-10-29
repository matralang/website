---
matra:
  entry: main.matra
  values:
    - content.js.part
---

# Matra website

The site is generated from named Matra and JavaScript fences. Build-time execution uses
the experimental Node.js literate API; the published output is static HTML and CSS.

```main.matra
html(lang=content.lang) {
  head {
    meta(charset="utf-8") {}
    meta(name="viewport" content="width=device-width, initial-scale=1") {}
    meta(name="description" content=content.description) {}
    meta(name="theme-color" content="#f5f4ed") {}
    title { content.title }
    link(rel="stylesheet" href="/app.css") {}
  }
  body {
    header(class="site-header") {
      div(class="shell nav-shell") {
        a(class="brand" href=content.homeUrl aria-label=content.brandLabel) {
          span(class="brand-mark") { "M" }
          span { "Matra" }
        }
        nav(aria-label=content.navigationLabel) {
          ...for (item in content.navigation) {
            a(href=item.href) { item.label }
          }
          a(class="language-link" href=content.languageUrl lang=content.otherLang) {
            content.languageLabel
          }
        }
      }
    }
    main {
      section(class="hero") {
        div(class="shell hero-inner") {
          p(class="eyebrow") { content.eyebrow }
          h1 { content.heading }
          p(class="lede") { content.intro }
          div(class="actions") {
            ...for (action in content.actions) {
              a(class=action.className href=action.href) { action.label }
            }
          }
          p(class="release-note") { content.releaseNote }
        }
      }
      section(class="showcase") {
        div(class="shell") {
          div(class="section-heading") {
            p(class="eyebrow") { content.sampleEyebrow }
            h2 { content.sampleTitle }
            p { content.sampleDescription }
          }
          div(class="showcase-grid") {
            article(class="code-card") {
              header(class="code-header") {
                span { "MATRA" }
                small { "main.matra" }
              }
              pre { code { content.sampleSource } }
            }
            article(class="code-card") {
              header(class="code-header") {
                span { "HTML" }
                small { "generated output" }
              }
              pre { code { content.sampleOutput } }
            }
          }
        }
      }
      section(class="features") {
        div(class="shell") {
          div(class="section-heading") {
            p(class="eyebrow") { content.featuresEyebrow }
            h2 { content.featuresTitle }
          }
          div(class="feature-grid") {
            ...for (card in content.cards) {
              article(class="feature-card") {
                p(class="card-index") { card.index }
                h3 { card.title }
                p { card.text }
                ...for (link in card.links) {
                  a(class="text-link" href=link.href) { link.label }
                }
              }
            }
          }
        }
      }
      section(class="notice-section") {
        div(class="shell notice-card") {
          div {
            p(class="eyebrow") { content.noticeEyebrow }
            h2 { content.noticeTitle }
            p { content.notice }
          }
          a(class="button secondary" href=content.noticeLink) { content.noticeLinkLabel }
        }
      }
    }
    footer(class="site-footer") {
      div(class="shell footer-inner") {
        a(class="brand footer-brand" href=content.homeUrl) {
          span(class="brand-mark") { "M" }
          span { "Matra" }
        }
        p { content.footerText }
        a(href=content.githubUrl) { "GitHub" }
      }
    }
  }
}
```

```content.js.part
  __PAGE_DATA__
```
