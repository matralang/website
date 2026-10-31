---
matra:
  entry: main.matra
  values:
    - content.js.part
---

# Matra website

The site is generated from named Matra and JavaScript fences. Build-time execution uses
the experimental Node.js literate API; the published output is static HTML and CSS
with browser scripts for the Playground and focused demos.

```main.matra
html(lang=content.lang) {
  head {
    meta(charset="utf-8") {}
    meta(name="viewport" content="width=device-width, initial-scale=1") {}
    meta(name="description" content=content.description) {}
    meta(name="theme-color" content="#f5f4ed") {}
    title { content.title }
    link(rel="stylesheet" href="/app.css") {}
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
    main {
      section.hero {
        div.shell.hero-inner {
          p.eyebrow { content.eyebrow }
          h1 { content.heading }
          p.lede { content.intro }
          div.actions {
            ...for (action in content.actions) {
              a(class=action.className href=action.href) { action.label }
            }
          }
          p.release-note { content.releaseNote }
        }
      }
      section.showcase {
        div.shell {
          div.section-heading {
            p.eyebrow { content.sampleEyebrow }
            h2 { content.sampleTitle }
            p { content.sampleDescription }
          }
          if (content.specSections) {
            div.spec-document {
              ...for (section in content.specSections) {
                article.spec-section {
                  p.card-index { section.index }
                  h3 { section.title }
                  p { section.text }
                  if (section.code) {
                    pre { code { section.code } }
                  }
                }
              }
            }
          }
          if (content.sampleEnabled && !content.playgroundEnabled && !content.specSections) {
            div.showcase-grid {
              article.code-card {
                header.code-header {
                  span { "MATRA" }
                  small { "main.matra" }
                }
                pre { code { content.sampleSource } }
              }
              article.code-card {
                header.code-header {
                  span { "HTML" }
                  small { "generated output" }
                }
                pre { code { content.sampleOutput } }
              }
            }
          }
          if (content.playgroundEnabled) {
            div.playground-panel(id="playground" data-playground="true") {
              div.playground-heading {
                div {
                  p.eyebrow { "MATRA DOCUMENT" }
                  h3 { content.playgroundLabel }
                }
                div.playground-actions {
                  button.button.primary(id="playground-run" type="button") {
                    content.playgroundRunLabel
                  }
                  button.button.secondary(id="playground-stop" type="button" disabled=true) {
                    content.playgroundStopLabel
                  }
                }
              }
              p.playground-help { content.playgroundHelp }
              div.playground-grid {
                div.playground-editor {
                  label(for="playground-source") { content.playgroundLabel }
                  textarea(
                    id="playground-source"
                    rows="16"
                    spellcheck="false"
                    autocapitalize="off"
                    autocomplete="off"
                    aria-label=content.playgroundLabel
                  ) { content.playgroundSource }
                }
                div.playground-output {
                  p.playground-output-label { content.playgroundPreviewLabel }
                  iframe(
                    id="playground-preview"
                    title=content.playgroundPreviewLabel
                    sandbox=""
                    referrerpolicy="no-referrer"
                  ) {}
                }
              }
              p.playground-status(
                id="playground-status"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              ) { content.playgroundInitialStatus }
            }
          }
        }
      }
      if (content.demosEnabled) {
        section.showcase.demo-section(id="demos") {
          div.shell {
            div.section-heading {
              p.eyebrow { "INTERACTIVE DEMOS" }
              h2 { content.demosTitle }
              p { content.demosDescription }
            }
            p.playground-help { content.demosScope }
            div.showcase-grid {
              ...for (demo in content.demos) {
                article.demo-card(data-demo=demo.id data-demo-label=demo.title) {
                  h3 { demo.title }
                  p.playground-help { demo.description }
                  div.demo-controls {
                    ...for (control in demo.controls) {
                      div.demo-control {
                        label(for=control.inputId) { control.label }
                        output(for=control.inputId) { control.value }
                        input(
                          id=control.inputId name=control.name type=control.type
                          min=control.min max=control.max step=control.step value=control.value
                          disabled=true required=true aria-describedby=("demo-status-" + demo.id)
                        ) {}
                      }
                    }
                  }
                  div.demo-preview(data-demo-preview=true) { demo.preview }
                  p.playground-status(
                    id=("demo-status-" + demo.id)
                    data-demo-status=true role="status" aria-live="polite" aria-atomic="true"
                  ) { content.demosInitialStatus }
                  details.demo-source {
                    summary { content.demosSourceLabel }
                    pre { code(data-demo-source=true) { demo.source } }
                  }
                }
              }
            }
          }
        }
      }
      section.features {
        div.shell {
          div.section-heading {
            p.eyebrow { content.featuresEyebrow }
            h2 { content.featuresTitle }
          }
          div.feature-grid {
            ...for (card in content.cards) {
              article.feature-card {
                p.card-index { card.index }
                h3 { card.title }
                p { card.text }
                ...for (link in card.links) {
                  a.text-link(href=link.href) { link.label }
                }
              }
            }
          }
        }
      }
      section.notice-section {
        div.shell.notice-card {
          div {
            p.eyebrow { content.noticeEyebrow }
            h2 { content.noticeTitle }
            p { content.notice }
          }
          a.button.secondary(href=content.noticeLink) { content.noticeLinkLabel }
        }
      }
    }
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

```content.js.part
  __PAGE_DATA__
```
