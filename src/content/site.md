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
          if (content.specSections) {
            div(class="spec-document") {
              ...for (section in content.specSections) {
                article(class="spec-section") {
                  p(class="card-index") { section.index }
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
          if (content.playgroundEnabled) {
            div(class="playground-panel" id="playground" data-playground="true") {
              div(class="playground-heading") {
                div {
                  p(class="eyebrow") { "MATRA DOCUMENT" }
                  h3 { content.playgroundLabel }
                }
                div(class="playground-actions") {
                  button(id="playground-run" class="button primary" type="button") {
                    content.playgroundRunLabel
                  }
                  button(id="playground-stop" class="button secondary" type="button" disabled=true) {
                    content.playgroundStopLabel
                  }
                }
              }
              p(class="playground-help") { content.playgroundHelp }
              div(class="playground-grid") {
                div(class="playground-editor") {
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
                div(class="playground-output") {
                  p(class="playground-output-label") { content.playgroundPreviewLabel }
                  iframe(
                    id="playground-preview"
                    title=content.playgroundPreviewLabel
                    sandbox=""
                    referrerpolicy="no-referrer"
                  ) {}
                }
              }
              p(
                class="playground-status"
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
        section(class="showcase demo-section" id="demos") {
          div(class="shell") {
            div(class="section-heading") {
              p(class="eyebrow") { "INTERACTIVE DEMOS" }
              h2 { content.demosTitle }
              p { content.demosDescription }
            }
            p(class="playground-help") { content.demosScope }
            div(class="showcase-grid") {
              ...for (demo in content.demos) {
                article(class="demo-card" data-demo=demo.id data-demo-label=demo.title) {
                  h3 { demo.title }
                  p(class="playground-help") { demo.description }
                  div(class="demo-controls") {
                    ...for (control in demo.controls) {
                      div(class="demo-control") {
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
                  div(class="demo-preview" data-demo-preview=true) { demo.preview }
                  p(
                    id=("demo-status-" + demo.id) class="playground-status"
                    data-demo-status=true role="status" aria-live="polite" aria-atomic="true"
                  ) { content.demosInitialStatus }
                  details(class="demo-source") {
                    summary { content.demosSourceLabel }
                    pre { code(data-demo-source=true) { demo.source } }
                  }
                }
              }
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
