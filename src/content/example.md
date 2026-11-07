---
matra:
  entry: main.matra
  values:
    - content.js.part
---

```main.matra
html(lang="en") {
  head {
    title { content.pageTitle(content.title) }
  }
  body {
    h1 { content.title }
    p { content.description }
  }
}
```

```content.js.part
({
  title: "A page with Matra",
  description: "Describe the document, then generate semantic HTML.",
  pageTitle: title => `${title} | Matra`
})
```
