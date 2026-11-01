import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { access, readFile, readdir } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import pages from "../src/content/pages.mjs"
import "./demos.js"

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
    for (const [, href] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
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

execFileSync("npm", ["ls", "@matra/core", "@matra/html", "@matra/site-generation"], {
  cwd: root,
  stdio: "inherit",
})

async function verifyPreviewNavigation(basePath = "") {
  for (const [locale, home, label, languageRoute, languageLabel] of [
    ["", "/", "Matra ホーム", "/en/site-generation-preview/", "English"],
    ["en/", "/en/", "Matra home", "/site-generation-preview/", "日本語"],
  ]) {
    const html = await readPage(`${locale}site-generation-preview/index.html`)
    assert.ok(html.includes(`<a href="${basePath}${home}" class="brand">`))
    assert.ok(html.includes(`<a href="${basePath}${home}">${label}</a>`))
    assert.ok(html.includes(`<a href="${basePath}${languageRoute}" lang=`))
    assert.ok(html.includes(`>${languageLabel}</a>`))
    assert.ok(!html.includes("/website/website/"))
  }
}

build()
await verifyPreviewNavigation()

const routes = [
  "", "about/", "blog/", "docs/", "examples/", "packages/", "play/",
  "site-generation-preview/", "spec/", "spec/ast/", "spec/data-model/",
  "spec/grammar/", "spec/parser/",
]
const expectedPages = routes.flatMap(route => [`${route}index.html`, `en/${route}index.html`]).sort()
assert.deepEqual(
  (await htmlFiles(path.join(root, "dist"))).map(file => path.relative(path.join(root, "dist"), file).split(path.sep).join("/")).sort(),
  expectedPages,
)
const escapeHTML = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;")
for (const page of pages) {
  const html = await readPage(`${page.route.slice(1)}index.html`)
  assert.ok(html.includes(`<html lang="${page.lang}">`), page.route)
  assert.ok(html.includes(`<title>${escapeHTML(page.title)}</title>`), page.route)
  assert.ok(html.includes(`<meta name="description" content="${escapeHTML(page.description)}">`), page.route)
  assert.ok(html.includes(`<h1>${escapeHTML(page.heading)}</h1>`), page.route)
  assert.ok(html.includes(`href="${page.homeUrl}" aria-label=`), page.route)
  assert.ok(html.includes(`href="${page.languageUrl}" lang="${page.otherLang}"`), page.route)
}
const manifest = JSON.parse(await readPage(".matra-site-manifest.json"))
assert.deepEqual(manifest, {
  version: 1,
  files: [...expectedPages, "assets/app.css", "assets/demos.js", "assets/playground.js", "assets/playground-worker.js"].sort(),
})

const index = await readPage("index.html")
const englishIndex = await readPage("en/index.html")
const about = await readPage("about/index.html")
const englishAbout = await readPage("en/about/index.html")
const examples = await readPage("examples/index.html")
const englishExamples = await readPage("en/examples/index.html")
const play = await readPage("play/index.html")
const englishPlay = await readPage("en/play/index.html")
const spec = await readPage("spec/index.html")
const dataModel = await readPage("spec/data-model/index.html")
const englishDataModel = await readPage("en/spec/data-model/index.html")
const astSpec = await readPage("spec/ast/index.html")
const englishAstSpec = await readPage("en/spec/ast/index.html")
const grammarSpec = await readPage("spec/grammar/index.html")
const englishGrammarSpec = await readPage("en/spec/grammar/index.html")
const parserSpec = await readPage("spec/parser/index.html")
const englishParserSpec = await readPage("en/spec/parser/index.html")
const css = await readPage("assets/app.css")
const playgroundClient = await readPage("assets/playground.js")
const playgroundWorker = await readPage("assets/playground-worker.js")
const demosClient = await readPage("assets/demos.js")
const siteGenerationJa = await readPage("site-generation-preview/index.html")
const siteGenerationEn = await readPage("en/site-generation-preview/index.html")

assert.match(index, /^<!doctype html>/)
assert.match(index, /<html lang="ja">/)
assert.match(index, /<title>Matra — 言語を学び、構造でつなぐ<\/title>/)
assert.match(index, /href="\/en\/" lang="en" class="language-link">English/)
assert.match(englishIndex, /<html lang="en">/)
assert.match(englishIndex, /href="\/" lang="ja" class="language-link">日本語/)
assert.match(siteGenerationJa, /<html lang="ja">/)
assert.match(siteGenerationJa, /<title>サイト生成エンジンの試験ページ — Matra<\/title>/)
assert.match(siteGenerationJa, /共通レイアウト、ルート出力/)
assert.match(siteGenerationEn, /<html lang="en">/)
assert.match(siteGenerationEn, /<title>Site generation engine preview — Matra<\/title>/)
assert.match(siteGenerationEn, /shared layout, route output/)
for (const [page, label, hrefs] of [
  [index, "サイトマップ", ["/about/", "/examples/", "/docs/", "/play/", "/packages/", "/blog/", "/spec/", "/spec/data-model/", "/spec/ast/", "/spec/grammar/", "/spec/parser/"]],
  [englishIndex, "Site map", ["/en/about/", "/en/examples/", "/en/docs/", "/en/play/", "/en/packages/", "/en/blog/", "/en/spec/", "/en/spec/data-model/", "/en/spec/ast/", "/en/spec/grammar/", "/en/spec/parser/"]],
]) {
  assert.match(page, new RegExp(`aria-label="${label}"`))
  for (const href of hrefs) assert.ok(page.includes(`href="${href}"`), `Missing sitemap link: ${href}`)
}
for (const page of [index, about]) {
  assert.match(page, /文書・データ・プログラム/)
  assert.match(page, /ラーニング/)
  assert.match(page, /英語や日本語/)
  assert.match(page, /現在のv0\.3/)
}
for (const page of [englishIndex, englishAbout]) {
  assert.match(page, /documents, data, and programs/)
  assert.match(page, /learning/)
  assert.match(page, /English and Japanese/)
  assert.match(page, /v0\.3/)
}
assert.doesNotMatch(about, /初版白書/)
assert.doesNotMatch(englishAbout, /first whitepaper/i)
assert.match(about, /whitepaper-v0\.3\.ja\.md/)
assert.match(englishAbout, /whitepaper-v0\.3\.md/)
assert.match(examples, /実際のrenderer出力/)
assert.match(englishExamples, /actual renderer output/)
for (const page of [examples, englishExamples]) {
  assert.match(page, /src="\/assets\/demos\.js" type="module"/)
  assert.match(page, /id="demos"/)
  assert.match(page, /data-demo="svg"/)
  assert.match(page, /data-demo="math"/)
  assert.match(page, /<svg viewBox="0 0 320 320"/)
  assert.match(page, /<math display="block">/)
  assert.match(page, /<mn>18<\/mn>/)
  assert.match(page, /id="demo-svg-count"[^>]*min="3" max="24" step="1" value="8" disabled/)
  assert.match(page, /id="demo-math-x"[^>]*min="-10" max="10" step="0.5" value="3" disabled/)
  assert.match(page, /data-demo-source/)
  assert.match(page, /@matra\/graphics/)
  assert.match(page, /@matra\/math/)
}
assert.match(examples, /専用の@matra/)
assert.match(englishExamples, /not the dedicated/)
assert.doesNotMatch(index, /assets\/demos\.js/)
assert.doesNotMatch(play, /assets\/demos\.js/)
assert.doesNotMatch(demosClient, /node:(fs|path|url)/)
assert.ok(Buffer.byteLength(demosClient) < 32_000, "Focused demos bundle should stay under 32 KB")
assert.match(index, /&lt;article&gt;&lt;h2&gt;A page with Matra&lt;\/h2&gt;/)
assert.match(index, /article \{\s+h2 \{ content\.title \}/)
assert.match(play, /id="playground"/)
assert.match(englishPlay, /id="playground"/)
assert.match(play, /src="\/assets\/playground\.js" type="module"/)
assert.match(play, /sandbox=""/)
assert.match(play, /HTML modeのみ/)
assert.match(englishPlay, /HTML mode only/)
assert.doesNotMatch(play, /content\.title/)
assert.match(spec, /Data Model／AST v0\.2/)
assert.match(spec, /Grammar v0\.3/)
assert.match(spec, /旧Parser v0\.2/)
assert.match(spec, /github\.com\/matralang\/matra\/blob\/develop\/spec\/data-model\.ja\.md/)
assert.doesNotMatch(spec, /class="showcase-grid"/)
assert.match(dataModel, /children/)
assert.match(dataModel, /MatraJSON/)
assert.match(dataModel, /文書Morphion/)
assert.match(dataModel, /Matra設計者が提唱した独自概念/)
assert.match(dataModel, /一般に確立した用語や/)
assert.match(englishDataModel, /JSON-compatible values/)
assert.match(englishDataModel, /original concept proposed by Matra/)
assert.match(englishDataModel, /not an established general term/)
assert.match(astSpec, /interface MatraAST/)
assert.match(astSpec, /位置情報はmetadata/)
assert.match(englishAstSpec, /Convert to and from MatraJSON/)
assert.match(grammarSpec, /文法 v0\.3/)
assert.match(grammarSpec, /XML-style markup/)
assert.match(grammarSpec, /childを1つ追加/)
assert.match(englishGrammarSpec, /Control expressions and child spread/)
assert.match(englishGrammarSpec, /not full XML\/HTML compatibility/)
assert.match(parserSpec, /MatraModule/)
assert.match(parserSpec, /evaluateStatic/)
assert.match(parserSpec, /旧Parser v0\.2のsyntaxMode契約は現行v0\.3に適用しません/)
assert.match(englishParserSpec, /There is no implicit execution fallback/)
assert.match(englishParserSpec, /old Parser v0\.2 syntaxMode contract does not apply/)
for (const page of [dataModel, englishDataModel, astSpec, englishAstSpec, grammarSpec, englishGrammarSpec, parserSpec, englishParserSpec]) {
  assert.doesNotMatch(page, /class="showcase-grid"/)
}
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
const demosClientHash = createHash("sha256").update(demosClient).digest("hex")
const pageHashes = new Map(await Promise.all(
  (await htmlFiles(path.join(root, "dist"))).map(async file => [
    file,
    createHash("sha256").update(await readFile(file)).digest("hex"),
  ]),
))
build()
assert.deepEqual((await htmlFiles(path.join(root, "dist"))).sort(), [...pageHashes.keys()].sort())
for (const [file, hash] of pageHashes) {
  assert.equal(createHash("sha256").update(await readFile(file)).digest("hex"), hash, file)
}
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
assert.equal(
  createHash("sha256").update(await readPage("assets/demos.js")).digest("hex"),
  demosClientHash,
  "repeated builds should produce byte-identical demo assets",
)

build("/website")
await verifyPreviewNavigation("/website")
const basePathIndex = await readPage("index.html")
const basePathPlay = await readPage("play/index.html")
assert.match(basePathIndex, /href="\/website\/assets\/app\.css"/)
assert.match(basePathIndex, /href="\/website\/docs\/"/)
assert.match(basePathIndex, /href="\/website\/en\/"/)
assert.match(basePathIndex, /href="\/website\/spec\/grammar\/"/)
assert.match(basePathPlay, /href="\/website\/examples\/"/)
assert.match(basePathPlay, /src="\/website\/assets\/playground\.js"/)
for (const locale of ["", "en/"]) {
  assert.match(await readPage(`${locale}examples/index.html`), /src="\/website\/assets\/demos\.js"/)
}
assert.doesNotMatch(basePathIndex, /href="\/(?!website\/|https?:\/\/)/)
await verifyInternalLinks("/website")
await access(path.join(root, "dist", "assets", "playground.js"))
await access(path.join(root, "dist", "assets", "playground-worker.js"))
await access(path.join(root, "dist", "assets", "demos.js"))

await import("./site-generation.js")

console.log("site build test passed")
