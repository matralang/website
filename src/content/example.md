---
matra:
  entry: main.matra
  values:
    - content.js.part
---

# A generated page fragment

This small example is compiled and run during the website build. The website displays
the source fence and the exact HTML renderer output side by side.

```main.matra
article {
  h2 { content.title }
  p { content.description }
}
```

```content.js.part
({
  title: "A page with Matra",
  description: "Describe the document, then generate semantic HTML."
})
```
