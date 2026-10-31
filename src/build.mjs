import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { extractMatraMarkdown, staticValueToAST } from "@matra/core"
import { buildLiterate, runLiterate } from "@matra/core/experimental/literate"
import { toHTML } from "@matra/html"
import { buildSite } from "@matra/site-generation"
import { build as buildBrowserAssets } from "esbuild"
import pages from "./content/pages.mjs"
import { demoDefinitions, renderDemo } from "./demos/render.mjs"

const root = process.cwd()
const outputDir = path.join(root, "dist")
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

async function buildSiteGenerationPreview() {
  const project = await mkdtemp(path.join(tmpdir(), "matra-website-site-preview-"))
  try {
    await Promise.all([
      cp(path.join(root, "src", "site-generation-preview", "pages"), path.join(project, "pages"), {
        recursive: true,
      }),
      cp(
        path.join(root, "src", "site-generation-preview", "layouts"),
        path.join(project, "layouts"),
        { recursive: true },
      ),
    ])
    await writeFile(
      path.join(project, "matra.site.json"),
      JSON.stringify({
        version: 1,
        site: {
          pages: "pages",
          layouts: "layouts",
          defaultLayout: "site",
          output: "dist",
          format: "directory",
          basePath,
          data: {
            homeUrl: "/",
            footerText: "Learn languages. Connect through structure.",
            githubUrl: "https://github.com/matralang/matra",
          },
        },
      }),
    )
    const generated = await buildSite(project)
    for (const file of generated) {
      const relativePath = path.relative(path.join(project, "dist"), file)
      const destination = path.join(outputDir, relativePath)
      await mkdir(path.dirname(destination), { recursive: true })
      await cp(file, destination)
      console.log(`Generated site-generation preview ${relativePath}`)
    }
  } finally {
    await rm(project, { recursive: true, force: true })
  }
}

async function main() {
  const template = await readFile(path.join(contentDir, "site.md"), "utf8")
  const example = await readFile(path.join(contentDir, "example.md"), "utf8")
  const exampleSource = extractMatraMarkdown(example, { entry: "main.matra" }).source
  const exampleOutput = await renderLiterate(example, "example.md")
  const marker = "  __PAGE_DATA__\n"

  if (template.split(marker).length !== 2) {
    throw new Error("Site template must contain exactly one page data marker")
  }

  await rm(outputDir, { recursive: true, force: true })
  await mkdir(outputDir, { recursive: true })

  for (const page of pages) {
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
    const markdown = template.replace(marker, `  (${JSON.stringify(data)})\n`)
    const html = await renderLiterate(markdown, page.route)
    const relativePath = page.route === "/"
      ? "index.html"
      : path.join(page.route.replace(/^\/+|\/+$/g, ""), "index.html")
    const outputPath = path.join(outputDir, relativePath)
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, `<!doctype html>\n${html}\n`)
    console.log(`Generated ${relativePath}`)
  }

  await cp(path.join(root, "src", "styles", "app.css"), path.join(outputDir, "app.css"))
  await buildBrowserAssets({
    entryPoints: [
      path.join(root, "src", "playground", "playground.js"),
      path.join(root, "src", "playground", "playground-worker.js"),
      path.join(root, "src", "demos", "demos.js"),
    ],
    outdir: path.join(outputDir, "assets"),
    bundle: true,
    entryNames: "[name]",
    format: "esm",
    minify: true,
    platform: "browser",
    target: "es2020",
  })
  await buildSiteGenerationPreview()
}

main().catch(error => {
  console.error("Site build failed:", error)
  process.exitCode = 1
})
