import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { access, readFile, readdir } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const readPage = relativePath => readFile(path.join(root, "dist", relativePath), "utf8")
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(entry => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? htmlFiles(entryPath) : entry.name.endsWith(".html") ? [entryPath] : []
  }))
  return nested.flat()
}

async function verifyInternalLinks(basePath = "") {
  const files = await htmlFiles(path.join(root, "dist"))
  for (const file of files) {
    const html = await readFile(file, "utf8")
    for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
      const url = new URL(href, "https://matralang.test")
      if (url.origin !== "https://matralang.test") continue

      let pathname = url.pathname
      if (basePath) {
        assert.ok(pathname === basePath || pathname.startsWith(`${basePath}/`), `${href} should use ${basePath}`)
        pathname = pathname.slice(basePath.length) || "/"
      }

      let relativePath = pathname.replace(/^\/+/, "")
      if (!relativePath || relativePath.endsWith("/")) relativePath += "index.html"
      else if (!path.extname(relativePath)) relativePath = path.join(relativePath, "index.html")
      await access(path.join(root, "dist", relativePath))
    }
  }
}

const build = (basePath = "") => execFileSync("npm", ["run", "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, SITE_BASE_PATH: basePath },
})

build()

const index = await readPage("index.html")
const englishIndex = await readPage("en/index.html")
const about = await readPage("about/index.html")
const englishAbout = await readPage("en/about/index.html")
const examples = await readPage("examples/index.html")
const englishExamples = await readPage("en/examples/index.html")
const play = await readPage("play/index.html")
const englishPlay = await readPage("en/play/index.html")
const spec = await readPage("spec/index.html")
const legacyModelRoute = await readPage("spec/data-model/index.html")
const css = await readPage("app.css")
const playgroundClient = await readPage("assets/playground.js")
const playgroundWorker = await readPage("assets/playground-worker.js")

assert.match(index, /^<!doctype html>/)
assert.match(index, /<html lang="ja">/)
assert.match(index, /<title>Matra — 文書の構造からWebページをつくる<\/title>/)
assert.match(index, /href="\/en\/" lang="en">English/)
assert.match(englishIndex, /<html lang="en">/)
assert.match(englishIndex, /href="\/" lang="ja">日本語/)
assert.match(about, /文書を、構造として書く/)
assert.match(englishAbout, /Write documents as structure/)
assert.match(about, /whitepaper-v0\.3\.ja\.md/)
assert.match(englishAbout, /whitepaper-v0\.3\.md/)
assert.match(examples, /実際のrenderer出力/)
assert.match(englishExamples, /actual renderer output/)
assert.match(index, /&lt;article&gt;&lt;h2&gt;A page with Matra&lt;\/h2&gt;/)
assert.match(index, /article \{\s+h2 \{ content\.title \}/)
assert.match(play, /id="playground"/)
assert.match(englishPlay, /id="playground"/)
assert.match(play, /src="\/assets\/playground\.js" type="module"/)
assert.match(play, /sandbox=""/)
assert.match(play, /HTML modeのみ/)
assert.match(englishPlay, /HTML mode only/)
assert.doesNotMatch(play, /content\.title/)
assert.match(spec, /文書Morphionと数式Morphionは別の概念/)
assert.match(legacyModelRoute, /文書Morphion規則/)
for (const page of [index, englishIndex]) {
  assert.match(page, /Core v0\.3\.0 \/ HTML v0\.3\.0/)
}
for (const locale of ["", "en/"]) {
  const examples = await readPage(`${locale}examples/index.html`)
  const packages = await readPage(`${locale}packages/index.html`)
  assert.match(examples, /npm install --save-exact @matra\/core@0\.3\.0 @matra\/html@0\.3\.0/)
  assert.doesNotMatch(packages, /alpha|prerelease|先行配布版/)
  assert.match(packages, /v0\.3\.0/)
}
for (const file of await htmlFiles(path.join(root, "dist"))) {
  assert.doesNotMatch(await readFile(file, "utf8"), /0\.3\.0-alpha/)
}
assert.doesNotMatch(index, /v0\.2/)
assert.doesNotMatch(index, /assets\/playground\.js/)
assert.match(playgroundClient, /playground-worker\.js/)
assert.match(playgroundWorker, /Expected Matra source text/)
assert.doesNotMatch(playgroundWorker, /node:(fs|path|url)/)
assert.ok(
  Buffer.byteLength(playgroundClient) < 12_000,
  `Playground client bundle should stay under 12 KB (was ${Buffer.byteLength(playgroundClient)} bytes)`,
)
assert.ok(
  Buffer.byteLength(playgroundWorker) < 128_000,
  `Playground Worker bundle should stay under 128 KB (was ${Buffer.byteLength(playgroundWorker)} bytes)`,
)
assert.match(css, /prefers-reduced-motion/)
await verifyInternalLinks()

const originalHash = createHash("sha256").update(index).digest("hex")
const playgroundClientHash = createHash("sha256").update(playgroundClient).digest("hex")
const playgroundWorkerHash = createHash("sha256").update(playgroundWorker).digest("hex")
build()
assert.equal(
  createHash("sha256").update(await readPage("index.html")).digest("hex"),
  originalHash,
  "repeated builds should produce byte-identical home pages",
)
assert.equal(
  createHash("sha256").update(await readPage("assets/playground.js")).digest("hex"),
  playgroundClientHash,
  "repeated builds should produce byte-identical Playground client assets",
)
assert.equal(
  createHash("sha256").update(await readPage("assets/playground-worker.js")).digest("hex"),
  playgroundWorkerHash,
  "repeated builds should produce byte-identical Playground Worker assets",
)

build("/website")
const basePathIndex = await readPage("index.html")
const basePathPlay = await readPage("play/index.html")
assert.match(basePathIndex, /href="\/website\/app\.css"/)
assert.match(basePathIndex, /href="\/website\/docs\/"/)
assert.match(basePathIndex, /href="\/website\/en\/"/)
assert.match(basePathPlay, /href="\/website\/examples\/"/)
assert.match(basePathPlay, /src="\/website\/assets\/playground\.js"/)
assert.doesNotMatch(basePathIndex, /href="\/(?!website\/|https?:\/\/)/)
await verifyInternalLinks("/website")
await access(path.join(root, "dist", "assets", "playground.js"))
await access(path.join(root, "dist", "assets", "playground-worker.js"))

console.log("site build test passed")
