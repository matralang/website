---
matra:
  entry: main.matra
  values:
    - content.js.part
---

# Compose a page with Matra packages

```main.matra
html(lang="en") {
  head {
    title { content.pageTitle(content.title) }
  }
  body {
    header {
      p { "MATRA / PACKAGE EXAMPLES" }
      h1 { content.title }
      p { content.description }
    }
    main {
      ...for (item in content.packages) {
        section(id=item.id) {
          h2 { item.name }
          p { item.description }
          pre { code { item.example } }
        }
      }
    }
    footer {
      p { "These package workflows are experimental; check each package's release notes." }
    }
  }
}
```

```content.js.part
({
  title: "Compose a page with Matra packages",
  description: "Use the CLI to start a project, Core to evaluate Matra documents, and site-generation to build a site.",
  pageTitle: title => `${title} | Matra`,
  packages: [
    {
      id: "cli",
      name: "@matra/cli",
      description: "Create and preview a starter project with the experimental CLI.",
      example: "npm install --global @matra/cli@0.3.2-alpha.3\nmatra init hello\ncd hello && matra dev"
    },
    {
      id: "core",
      name: "@matra/core",
      description: "Build and run a literate Matra document in Node.js.",
      example: 'const value = await runLiterate(await buildLiterate(source))'
    },
    {
      id: "site-generation",
      name: "@matra/site-generation",
      description: "Generate pages from Matra templates, page data, and a shared layout.",
      example: 'await generateSite({ root, output: "dist", pages })'
    }
  ]
})
```
