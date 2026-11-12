import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { access, cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { renderLiterateDocument } from "@matra/site-generation"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const project = await mkdtemp(path.join(tmpdir(), "matra-website-migration-"))
const output = path.join(project, "dist")
const build = () => execFileSync(process.execPath, ["src/build.mjs"], {
  cwd: project,
  env: { ...process.env, SITE_BASE_PATH: "" },
  encoding: "utf8",
  stdio: "pipe",
})
async function snapshot(directory) {
  const files = {}
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      for (const [name, content] of Object.entries(await snapshot(file))) {
        files[`${entry.name}/${name}`] = content
      }
    } else {
      files[entry.name] = await readFile(file)
    }
  }
  return files
}

try {
  const modularDocument = [
    "---",
    "matra:",
    "  entry: main.matra",
    "  values:",
    "    - content.js",
    "---",
    "",
    "```main.matra",
    "h1 { content.title }",
    "```",
    "",
    "```content.js",
    'import { title } from "./shared.js"',
    "export { title }",
    "```",
    "",
    "```shared.js",
    'export const title = "Modular Matra"',
    "```",
  ].join("\n")
  assert.deepEqual(
    await renderLiterateDocument(modularDocument, {
      document: "modular.matra.md",
      moduleRoot: root,
    }),
    { tag: "h1", props: {}, children: ["Modular Matra"] },
  )

  await cp(path.join(root, "src"), path.join(project, "src"), { recursive: true })
  await symlink(path.join(root, "node_modules"), path.join(project, "node_modules"), "dir")
  await writeFile(path.join(project, "package.json"), '{"type":"module"}\n')
  build()
  await assert.rejects(access(path.join(project, "matra.site.json")), { code: "ENOENT" })
  await assert.rejects(access(path.join(project, ".matra-site", "pages")), { code: "ENOENT" })
  const componentPage = await readFile(path.join(output, "site-generation-preview", "index.html"), "utf8")
  assert.match(componentPage, /<article class="feature-card"><h3>共通部品<\/h3>/)
  assert.match(componentPage, /<article class="footer-card"><h3>Matra<\/h3>/)
  assert.match(componentPage, /<title>サイト生成エンジンの試験ページ<\/title>/)
  assert.match(componentPage, /<h1>サイト生成エンジンの試験ページ<\/h1>/)
  const componentPageEn = await readFile(path.join(output, "en", "site-generation-preview", "index.html"), "utf8")
  assert.match(componentPageEn, /<title>Site generation engine preview<\/title>/)
  assert.match(componentPageEn, /<h1>Site generation engine preview<\/h1>/)
  const previewMarkdownEn = path.join(project, "src", "site-generation-preview", "pages", "site-generation-en.matra.md")
  const previewSourceEn = await readFile(previewMarkdownEn, "utf8")
  await writeFile(previewMarkdownEn, previewSourceEn.replace(
    "---\n",
    '---\ntitle: "Custom preview title — Matra"\n',
  ))
  build()
  assert.match(
    await readFile(path.join(output, "en", "site-generation-preview", "index.html"), "utf8"),
    /<title>Custom preview title — Matra<\/title>/,
  )
  await writeFile(previewMarkdownEn, previewSourceEn)
  build()

  const previewMarkdown = path.join(project, "src", "site-generation-preview", "pages", "site-generation-ja.matra.md")
  const previewSource = await readFile(previewMarkdown, "utf8")
  const changedPreviewSource = previewSource.replace(
    "# サイト生成エンジンの試験ページ",
    "# Front matterの見出しより優先されるMarkdown見出し",
  )
  assert.notEqual(changedPreviewSource, previewSource)
  await writeFile(previewMarkdown, changedPreviewSource)
  build()
  assert.match(
    await readFile(path.join(output, "site-generation-preview", "index.html"), "utf8"),
    /<h1>Front matterの見出しより優先されるMarkdown見出し<\/h1>/,
  )
  await writeFile(previewMarkdown, previewSource)
  build()
  await writeFile(previewMarkdown, previewSource.replace(
    "# サイト生成エンジンの試験ページ",
    "サイト生成エンジンの試験ページ",
  ))
  assert.throws(build, error => {
    assert.match(error.stderr, /expected exactly one Markdown level-one heading/)
    return true
  })
  await writeFile(previewMarkdown, previewSource)
  build()

  const manifestPath = path.join(output, ".matra-site-manifest.json")
  const initialManifest = JSON.parse(await readFile(manifestPath, "utf8"))
  assert.equal(initialManifest.files.length, 37)
  await writeFile(path.join(output, "unmanaged.txt"), "preserve")

  const extraAsset = path.join(project, "src", "assets", "obsolete.css")
  await writeFile(extraAsset, "body { color: red; }\n")
  build()
  await access(path.join(output, "assets", "obsolete.css"))
  await rm(extraAsset)
  build()
  await assert.rejects(access(path.join(output, "assets", "obsolete.css")), { code: "ENOENT" })

  const pageData = path.join(project, "src", "content", "pages.mjs")
  await writeFile(pageData, `import pages from ${JSON.stringify(pathToFileURL(path.join(root, "src", "content", "pages.mjs")).href)}
export default [
  ...pages.filter(page => !["/blog/", "/en/blog/"].includes(page.route)).map(page =>
    page.route === "/about/" ? { ...page, route: "/about-moved/", heading: "Updated migration heading" } : page),
  { ...pages[0], route: "/migration-added/", title: "Added migration page" },
]
`)
  build()
  await assert.rejects(access(path.join(output, "blog", "index.html")), { code: "ENOENT" })
  await assert.rejects(access(path.join(output, "en", "blog", "index.html")), { code: "ENOENT" })
  await assert.rejects(access(path.join(output, "about", "index.html")), { code: "ENOENT" })
  assert.match(await readFile(path.join(output, "about-moved", "index.html"), "utf8"), /Updated migration heading/)
  assert.match(await readFile(path.join(output, "migration-added", "index.html"), "utf8"), /<title>Added migration page<\/title>/)
  assert.equal(await readFile(path.join(output, "unmanaged.txt"), "utf8"), "preserve")

  const successfulOutput = await snapshot(output)
  await writeFile(path.join(project, "src", "content", "page.md"), "main { missing.value }\n")
  assert.throws(build, error => {
    assert.match(error.stderr, /Site build failed:/)
    return true
  })
  assert.deepEqual(await snapshot(output), successfulOutput, "failed renders must preserve output and manifest")
  await cp(path.join(root, "src", "content", "page.md"), path.join(project, "src", "content", "page.md"))

  const css = path.join(project, "src", "styles", "app.css")
  await writeFile(css, `${await readFile(css, "utf8")}\n/* migration asset update */\n`)
  build()
  assert.match(await readFile(path.join(output, "assets", "app.css"), "utf8"), /migration asset update/)
  assert.equal(await readFile(path.join(output, "unmanaged.txt"), "utf8"), "preserve")
  const updatedOutput = await snapshot(output)
  await writeFile(path.join(project, "src", "demos", "demos.js"), 'import "./missing-module.js"\n')
  assert.throws(build, error => {
    assert.match(error.stderr, /Site build failed:/)
    return true
  })
  assert.deepEqual(await snapshot(output), updatedOutput, "failed asset builds must preserve output and manifest")
  console.log("site-generation migration tests passed")
} finally {
  await rm(project, { recursive: true, force: true })
}
