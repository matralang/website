---
matra:
  entry: main.matra
  values:
    - content.js.part
---

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
