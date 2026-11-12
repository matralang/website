# Site-generation preview layout

This layout demonstrates sharing a component between the page and the document shell.

````layout.matra
html(lang=page.data.lang) {
  head {
    meta(charset="utf-8") {}
    meta(name="viewport" content="width=device-width, initial-scale=1") {}
    meta(name="description" content=page.data.description) {}
    meta(name="theme-color" content="#f3f7fd") {}
    meta(property="og:type" content="website") {}
    meta(property="og:title" content=page.data.title) {}
    meta(property="og:description" content=page.data.description) {}
    meta(property="og:image" content=site.data.ogImage) {}
    meta(property="og:url" content=site.data.canonicalBaseUrl + page.route) {}
    title { page.data.title }
    link(rel="canonical" href=site.data.canonicalBaseUrl + page.route) {}
    script(src="https://www.googletagmanager.com/gtag/js?id=G-V6HKP5JTEV" async=true) {}
    script { "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-V6HKP5JTEV');" }
    link(rel="icon" type="image/svg+xml" href="/assets/brand/logo-mark.svg") {}
    link(rel="stylesheet" href="/assets/app.css") {}
  }
  body {
    header.site-header {
      div.shell.nav-shell {
        a.brand(href=page.data.homeUrl aria-label=page.data.homeLabel) {
          img.brand-logo(src="/assets/brand/logo-horizontal.svg" alt="" width="360" height="100") {}
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
        Card({ className: "footer-card", title: "Matra" }, [
          p { site.data.footerText },
          a(href=site.data.githubUrl) { "GitHub" }
        ])
      }
    }
  }
}
````
