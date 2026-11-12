import { cp, mkdir, readFile, rm } from "node:fs/promises"
import path from "node:path"
import { extractMatraMarkdown, staticValueToAST } from "@matra/core"
import { buildLiterate, runLiterate } from "@matra/core/experimental/literate"
import { toHTML } from "@matra/html"
import { generateSite } from "@matra/site-generation"
import { build as buildBrowserAssets } from "esbuild"
import { load as loadYaml } from "js-yaml"
import pages from "./content/pages.mjs"
import { demoDefinitions, renderDemo } from "./demos/render.mjs"
import previewPages from "./site-generation-preview/pages.mjs"

const root = process.cwd()
const projectDir = path.join(root, ".matra-site")
const assetsDir = path.join(projectDir, "assets")
const contentDir = path.join(root, "src", "content")
const previewDir = path.join(root, "src", "site-generation-preview")
const basePath = normalizeBasePath(process.env.SITE_BASE_PATH ?? "")
const siteOrigin = process.env.SITE_ORIGIN ?? "https://www.matralang.org"
const canonicalBaseUrl = `${siteOrigin}${basePath}`

const originUrl = new URL(siteOrigin)
if (!["http:", "https:"].includes(originUrl.protocol) || originUrl.origin !== siteOrigin) {
  throw new Error("SITE_ORIGIN must be an HTTP(S) origin without a path or trailing slash")
}

function normalizeBasePath(value) {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, "")
  return trimmed ? `/${trimmed}` : ""
}

async function renderLiterate(markdown, document) {
  const bundle = await buildLiterate(markdown, { document, moduleRoot: root })
  const value = await runLiterate(bundle, { moduleRoot: root })
  return toHTML(staticValueToAST(value), { basePath, pretty: true })
}

async function readMatraSource(markdownPath, entry) {
  const markdown = await readFile(markdownPath, "utf8")
  return extractMatraMarkdown(markdown, { entry }).source
}

async function readFrontMatter(markdownPath) {
  const markdown = await readFile(markdownPath, "utf8")
  const opening = /^(?:\uFEFF)?---[ \t]*\r?\n/.exec(markdown)
  if (!opening) throw new Error(`${markdownPath}: expected YAML front matter`)
  const rest = markdown.slice(opening[0].length)
  const closing = /(?:^|\r?\n)---[ \t]*(?:\r?\n|$)/.exec(rest)
  if (!closing) throw new Error(`${markdownPath}: unclosed YAML front matter`)
  const data = loadYaml(rest.slice(0, closing.index))
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new TypeError(`${markdownPath}: YAML front matter must be an object`)
  }
  return data
}

async function main() {
  const [template, siteLayout, card, example] = await Promise.all([
    readMatraSource(path.join(contentDir, "page.md"), "page.matra"),
    readMatraSource(path.join(contentDir, "site.md"), "layout.matra"),
    readFile(path.join(previewDir, "components", "Card.matra"), "utf8"),
    readFile(path.join(contentDir, "example.md"), "utf8"),
  ])
  const exampleSource = example.trim()
  const exampleOutput = await renderLiterate(example, "example.md")

  await rm(projectDir, { recursive: true, force: true })
  await mkdir(assetsDir, { recursive: true })
  await Promise.all([
    cp(path.join(root, "src", "styles", "app.css"), path.join(assetsDir, "app.css")),
    cp(path.join(root, "src", "assets"), assetsDir, { recursive: true }),
  ])
  await buildBrowserAssets({
    entryPoints: [
      path.join(root, "src", "playground", "playground.js"),
      path.join(root, "src", "playground", "playground-worker.js"),
      path.join(root, "src", "demos", "demos.js"),
    ],
    outdir: assetsDir,
    bundle: true,
    splitting: true,
    entryNames: "[name]",
    chunkNames: "chunks/[name]-[hash]",
    format: "esm",
    minify: true,
    platform: "browser",
    target: "es2020",
  })

  const generatedPages = await Promise.all(pages.map(async page => {
    const data = {
      ...page,
      canonicalUrl: `${canonicalBaseUrl}${page.route}`,
      playgroundEnabled: page.playgroundEnabled ?? false,
      demosEnabled: page.demosEnabled ?? false,
      demos: page.demosEnabled ? await Promise.all(demoDefinitions.map(async definition => {
        const copy = page.demoCopy[definition.id]
        const values = Object.fromEntries(definition.controls.map(control => [control.name, control.value]))
        return {
          ...definition,
          ...copy,
          controls: definition.controls.map(control => ({
            ...control,
            label: copy.labels[control.name],
            inputId: `demo-${definition.id}-${control.name}`,
          })),
          ...await renderDemo(definition.id, values, copy.title),
        }
      })) : [],
      sampleSource: exampleSource,
      sampleOutput: exampleOutput,
    }
    return {
      kind: "matra",
      route: page.route,
      source: template,
      data,
      document: `pages${page.route === "/" ? "/index" : page.route.slice(0, -1)}.matra`,
    }
  }))
  const generatedPreviewPages = await Promise.all(previewPages.map(async page => {
    const markdownPath = path.join(previewDir, page.source)
    const [source, data] = await Promise.all([
      readMatraSource(markdownPath, "page.matra"),
      readFrontMatter(markdownPath),
    ])
    return {
      kind: "matra",
      route: page.route,
      source,
      layout: page.layout,
      data,
      document: page.document,
    }
  }))

  const generated = await generateSite({
    root,
    output: "dist",
    assets: ".matra-site/assets",
    basePath,
    defaultLayout: "site",
    data: {
      footerText: "Learn languages. Connect through structure.",
      githubUrl: "https://github.com/matralang/matra",
      canonicalBaseUrl,
      ogImage: `${siteOrigin}${basePath}/assets/brand/og-image.png`,
    },
    layouts: {
      site: { source: siteLayout, document: "src/content/site.md" },
      preview: {
        source: await readMatraSource(
          path.join(previewDir, "layouts", "site.matra.md"),
          "layout.matra",
        ),
        document: "src/site-generation-preview/layouts/site.matra.md",
      },
    },
    components: {
      Card: {
        source: card,
        document: "src/site-generation-preview/components/Card.matra",
      },
    },
    pages: [...generatedPages, ...generatedPreviewPages],
  })
  for (const file of generated) console.log(`Generated ${path.relative(root, file)}`)
}

main().catch(error => {
  console.error("Site build failed:", error)
  process.exitCode = 1
})
