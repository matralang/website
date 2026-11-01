import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { extractMatraMarkdown, staticValueToAST } from "@matra/core"
import { buildLiterate, runLiterate } from "@matra/core/experimental/literate"
import { toHTML } from "@matra/html"
import { buildSite } from "@matra/site-generation"
import { build as buildBrowserAssets } from "esbuild"
import pages from "./content/pages.mjs"
import { demoDefinitions, renderDemo } from "./demos/render.mjs"

const root = process.cwd()
const projectDir = path.join(root, ".matra-site")
const pagesDir = path.join(projectDir, "pages")
const layoutsDir = path.join(projectDir, "layouts")
const assetsDir = path.join(projectDir, "assets")
const contentDir = path.join(root, "src", "content")
const basePath = normalizeBasePath(process.env.SITE_BASE_PATH ?? "")

function normalizeBasePath(value) {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, "")
  return trimmed ? `/${trimmed}` : ""
}

async function renderLiterate(markdown, document) {
  const bundle = await buildLiterate(markdown, { document })
  const value = await runLiterate(bundle)
  return toHTML(staticValueToAST(value), { basePath })
}

async function main() {
  const template = await readFile(path.join(contentDir, "page.matra"), "utf8")
  const example = await readFile(path.join(contentDir, "example.md"), "utf8")
  const exampleSource = extractMatraMarkdown(example, { entry: "main.matra" }).source
  const exampleOutput = await renderLiterate(example, "example.md")
  await rm(projectDir, { recursive: true, force: true })
  await Promise.all([
    mkdir(pagesDir, { recursive: true }),
    mkdir(layoutsDir, { recursive: true }),
    mkdir(assetsDir, { recursive: true }),
  ])
  await Promise.all([
    cp(path.join(contentDir, "site.md"), path.join(layoutsDir, "site.matra.md")),
    cp(path.join(root, "src", "site-generation-preview", "pages"), path.join(pagesDir, "preview"), {
      recursive: true,
    }),
    cp(
      path.join(root, "src", "site-generation-preview", "layouts", "site.matra.md"),
      path.join(layoutsDir, "preview.matra.md"),
    ),
  ])

  for (const [index, page] of pages.entries()) {
    const data = {
      ...page,
      playgroundEnabled: page.playgroundEnabled ?? false,
      demosEnabled: page.demosEnabled ?? false,
      demos: page.demosEnabled ? demoDefinitions.map(definition => {
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
          ...renderDemo(definition.id, values, copy.title),
        }
      }) : [],
      sampleSource: exampleSource,
      sampleOutput: exampleOutput,
    }
    const metadata = {
      matra: { entry: "page.matra" },
      site: { route: page.route, data },
    }
    await writeFile(
      path.join(pagesDir, `page-${index}.matra.md`),
      `---\n${JSON.stringify(metadata)}\n---\n\`\`\`page.matra\n${template}\n\`\`\`\n`,
    )
  }

  await cp(path.join(root, "src", "styles", "app.css"), path.join(assetsDir, "app.css"))
  await buildBrowserAssets({
    entryPoints: [
      path.join(root, "src", "playground", "playground.js"),
      path.join(root, "src", "playground", "playground-worker.js"),
      path.join(root, "src", "demos", "demos.js"),
    ],
    outdir: assetsDir,
    bundle: true,
    entryNames: "[name]",
    format: "esm",
    minify: true,
    platform: "browser",
    target: "es2020",
  })
  await writeFile(
    path.join(root, "matra.site.json"),
    `${JSON.stringify({
      version: 1,
      site: {
        pages: ".matra-site/pages",
        layouts: ".matra-site/layouts",
        assets: ".matra-site/assets",
        defaultLayout: "site",
        output: "dist",
        format: "directory",
        basePath,
        data: {
          footerText: "Learn languages. Connect through structure.",
          githubUrl: "https://github.com/matralang/matra",
        },
      },
    }, null, 2)}\n`,
  )
  const generated = await buildSite(root)
  for (const file of generated) console.log(`Generated ${path.relative(root, file)}`)
}

main().catch(error => {
  console.error("Site build failed:", error)
  process.exitCode = 1
})
