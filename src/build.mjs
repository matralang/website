import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { extractMatraMarkdown, staticValueToAST } from "@matra/core"
import { buildLiterate, runLiterate } from "@matra/core/experimental/literate"
import { toHTML } from "@matra/html"
import pages from "./content/pages.mjs"

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
}

main().catch(error => {
  console.error("Site build failed:", error)
  process.exitCode = 1
})
