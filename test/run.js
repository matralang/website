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
  env: { ...process.env, SITE_BASE_PATH: basePath, SITE_ORIGIN: "https://www.matralang.org" },
})

execFileSync("npm", ["ls", "@matra/core", "@matra/html", "@matra/site-generation"], {
  cwd: root,
  stdio: "inherit",
})

async function verifyPreviewNavigation(basePath = "") {
  for (const [locale, home, label, languageRoute, languageLabel, route] of [
    ["", "/", "Matra ホーム", "/en/site-generation-preview/", "English", "/site-generation-preview/"],
    ["en/", "/en/", "Matra home", "/site-generation-preview/", "日本語", "/en/site-generation-preview/"],
  ]) {
    const html = await readPage(`${locale}site-generation-preview/index.html`)
    const canonicalUrl = `https://www.matralang.org${basePath}${route}`
    assert.ok(html.includes(`<a href="${basePath}${home}" aria-label="${label}" class="brand">`))
    assert.ok(html.includes(`<a href="${basePath}${home}">${label}</a>`))
    assert.ok(html.includes(`src="${basePath}/assets/brand/logo-horizontal.svg"`))
    assert.ok(html.includes(`href="${basePath}/assets/brand/logo-mark.svg"`))
    assert.ok(html.includes('content="#f3f7fd"'))
    assert.ok(html.includes(`content="https://www.matralang.org${basePath}/assets/brand/og-image.png"`))
    assert.ok(html.includes(`<meta property="og:url" content="${canonicalUrl}">`))
    assert.ok(html.includes(`<link rel="canonical" href="${canonicalUrl}">`))
    assert.ok(html.includes('<script src="https://www.googletagmanager.com/gtag/js?id=G-V6HKP5JTEV" async></script>'))
    assert.ok(html.includes("gtag('config', 'G-V6HKP5JTEV');"))
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
const exampleSource = (await readFile(path.join(root, "src/content/example.md"), "utf8")).trim()
const exampleOutput = `<html lang="en">
  <head>
    <title>A page with Matra | Matra</title>
  </head>
  <body>
    <h1>A page with Matra</h1>
    <p>Describe the document, then generate semantic HTML.</p>
  </body>
</html>`
for (const page of pages) {
  const html = await readPage(`${page.route.slice(1)}index.html`)
  const canonicalUrl = `https://www.matralang.org${page.route}`
  assert.ok(html.includes(`<html lang="${page.lang}">`), page.route)
  assert.ok(html.includes(`<title>${escapeHTML(page.title)}</title>`), page.route)
  assert.ok(html.includes(`<meta name="description" content="${escapeHTML(page.description)}">`), page.route)
  assert.ok(html.includes('<meta name="theme-color" content="#f3f7fd">'), page.route)
  assert.ok(html.includes(`<meta property="og:title" content="${escapeHTML(page.title)}">`), page.route)
  assert.ok(html.includes(`<meta property="og:description" content="${escapeHTML(page.description)}">`), page.route)
  assert.ok(html.includes('<meta property="og:image" content="https://www.matralang.org/assets/brand/og-image.png">'), page.route)
  assert.ok(html.includes(`<meta property="og:url" content="${canonicalUrl}">`), page.route)
  assert.ok(html.includes(`<link rel="canonical" href="${canonicalUrl}">`), page.route)
  assert.ok(html.includes('<script src="https://www.googletagmanager.com/gtag/js?id=G-V6HKP5JTEV" async></script>'), page.route)
  assert.ok(html.includes("gtag('config', 'G-V6HKP5JTEV');"), page.route)
  assert.ok(html.includes('href="/assets/brand/logo-mark.svg"'), page.route)
  assert.equal((html.match(/src="\/assets\/brand\/logo-horizontal\.svg"/g) ?? []).length, 2, page.route)
  assert.ok(html.includes(`<h1>${escapeHTML(page.heading)}</h1>`), page.route)
  assert.ok(html.includes(`href="${page.homeUrl}" aria-label=`), page.route)
  assert.ok(html.includes(`href="${page.languageUrl}" lang="${page.otherLang}"`), page.route)
  const navigation = html.match(/<nav aria-label="(?:メインナビゲーション|Main navigation)">([\s\S]*?)<\/nav>/)?.[1]
  assert.ok(navigation, page.route)
  for (const item of page.navigation) {
    assert.ok(navigation.includes(`<a href="${item.href}">${escapeHTML(item.label)}</a>`), page.route)
  }
  assert.equal(page.navigation[0].href, `${page.lang === "ja" ? "" : "/en"}/docs/#get-started`)
  assert.equal(page.navigation[1].href, `${page.lang === "ja" ? "" : "/en"}/spec/`)
  if (page.sampleEnabled && !page.playgroundEnabled && !page.specSections) {
    assert.ok(html.includes(`<code>${escapeHTML(exampleSource)}</code>`), page.route)
    assert.ok(html.includes(`<code>${escapeHTML(exampleOutput)}</code>`), page.route)
    assert.ok(html.includes(escapeHTML(page.sampleExplanation)), page.route)
    assert.ok(html.includes("<small>example.md</small>"), page.route)
  }
}
const manifest = JSON.parse(await readPage(".matra-site-manifest.json"))
const generatedChunks = manifest.files.filter(file => file.startsWith("assets/chunks/"))
assert.ok(generatedChunks.some(file => file.includes("javascript-block-")))
const generatedChunkSources = await Promise.all(generatedChunks.map(readPage))
assert.ok(generatedChunkSources.some(source => /import\(["'][^"']*javascript-block-/.test(source)))
assert.deepEqual(manifest, {
  version: 1,
  files: [...expectedPages, "assets/app.css", "assets/demos.js", "assets/playground.js", "assets/playground-worker.js",
    "assets/brand/logo-horizontal.svg", "assets/brand/logo-mark.svg", "assets/brand/logo-stacked.svg",
    "assets/brand/og-image.png", ...generatedChunks].sort(),
})
for (const name of ["logo-horizontal.svg", "logo-mark.svg", "logo-stacked.svg", "og-image.png"]) {
  assert.deepEqual(
    await readFile(path.join(root, "dist/assets/brand", name)),
    await readFile(path.join(root, "src/assets/brand", name)),
  )
}
const ogImage = await readFile(path.join(root, "dist/assets/brand/og-image.png"))
assert.deepEqual(ogImage.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
assert.equal(ogImage.readUInt32BE(16), 1280)
assert.equal(ogImage.readUInt32BE(20), 800)

const index = await readPage("index.html")
const englishIndex = await readPage("en/index.html")
for (const [home, status, link] of [
  [index, "実験版CLI", "/docs/#get-started"],
  [englishIndex, "Experimental CLI", "/en/docs/#get-started"],
]) {
  assert.ok(home.includes(status))
  assert.ok(home.includes("<code>npm install --global @matra/cli@0.3.2-alpha.1</code>"))
  assert.ok(home.includes(`href="${link}"`))
}
for (const [file, status] of [
  ["docs/index.html", "Windows・macOS向けの実験版"],
  ["en/docs/index.html", "An experimental release for Windows and macOS"],
]) {
  const docs = await readPage(file)
  assert.ok(docs.includes('id="get-started"'))
  assert.ok(docs.includes(status))
  assert.ok(docs.includes("npm install --global @matra/cli@0.3.2-alpha.1"))
  assert.ok(docs.includes("matra init hello"))
  assert.ok(docs.includes("matra dev"))
}
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
assert.match(index, /<title>Matra — 文書をコードで組み立てる構造言語<\/title>/)
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
for (const [html, prefix, book] of [
  [index, "", "技術書典"],
  [englishIndex, "/en", "TechBookFest"],
]) {
  assert.ok(html.includes(book))
  const actions = html.match(/<div class="actions">([\s\S]*?)<\/div>/)?.[1]
  assert.ok(actions)
  assert.ok(actions.startsWith(`<a class="button primary" href="${prefix}/docs/#get-started">Get Started</a>`))
  for (const route of ["/spec/", "/play/"]) {
    assert.ok(actions.includes(`href="${prefix}${route}"`))
  }
  for (const route of ["/examples/", "/spec/data-model/", "/spec/parser/", "/packages/", "/about/"]) {
    assert.ok(html.includes(`<a href="${prefix}${route}" class="text-link">`))
  }
  assert.ok(html.includes("SOURCE → DOCUMENT AST → HTML"))
  for (const stage of ["01 / RUN", "02 / MODEL", "03 / IMPLEMENTATION"]) {
    assert.ok(html.includes(`<p class="card-index">${stage}</p>`))
  }
}
assert.match(index, /文書・データ・プログラム/)
assert.match(englishIndex, /documents, data, and programs/)
assert.match(about, /構造的ラーニング/)
assert.match(englishAbout, /structural learning/)
assert.match(about, /長期構想/)
assert.match(englishAbout, /long-term vision/)
assert.match(about, /GUIビルダーを提供済みとする案内ではありません/)
assert.match(englishAbout, /does not announce an available GUI builder/)
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
async function initialBundleBytes(entry, visited = new Set()) {
  if (visited.has(entry)) return 0
  visited.add(entry)
  const source = await readPage(entry)
  let bytes = Buffer.byteLength(source)
  const imports = [...source.matchAll(/\bimport\s*(?:\{[^}]*\}\s*from\s*)?["']([^"']+)["']/g)]
  for (const [, specifier] of imports) {
    if (specifier.startsWith(".")) {
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(entry), specifier))
      bytes += await initialBundleBytes(target, visited)
    }
  }
  return bytes
}
assert.ok(await initialBundleBytes("assets/demos.js") < 32_000, "Demos' initial static bundle should stay under 32 KB")
assert.match(index, /title \{ content\.pageTitle\(content\.title\) \}/)
assert.match(index, /h1 \{ content\.title \}/)
assert.match(play, /id="playground"/)
assert.match(englishPlay, /id="playground"/)
assert.match(play, /src="\/assets\/playground\.js" type="module"/)
assert.match(play, /sandbox=""/)
assert.match(play, /HTML modeのみ/)
assert.match(englishPlay, /HTML mode only/)
assert.doesNotMatch(play, /content\.title/)
assert.match(spec, /Data Model／AST v0\.2/)
assert.match(spec, /まずData ModelとASTから読む/)
assert.match(spec, /基礎仕様 — Data Model/)
assert.match(spec, /基礎仕様 — AST/)
assert.match(spec, /Grammar v0\.3/)
assert.match(spec, /旧Parser v0\.2/)
assert.match(spec, /github\.com\/matralang\/matra\/blob\/develop\/spec\/data-model\.ja\.md/)
assert.doesNotMatch(spec, /class="showcase-grid"/)
assert.match(dataModel, /children/)
assert.match(dataModel, /MatraJSON/)
assert.match(dataModel, /文書モーフィオン/)
assert.match(dataModel, /Matra設計者が提唱した独自概念/)
assert.match(dataModel, /一般に確立した用語や/)
assert.match(dataModel, /Data Model — 文書nodeとvalueの定義/)
assert.match(dataModel, /class="syntax-tag">&quot;p&quot;<\/span>/)
assert.match(dataModel, /class="syntax-props">\{&quot;class&quot;:&quot;lead&quot;\}<\/span>/)
assert.match(dataModel, /class="syntax-children">\[&quot;Hello&quot;,0\]<\/span>/)
assert.match(dataModel, /<code>\[<span class="syntax-tag">&quot;p&quot;<\/span>, /)
assert.match(dataModel, /aria-label="MatraJSONの色分け"/)
assert.doesNotMatch(dataModel, /テーマごとの解説と一次資料/)
assert.match(englishDataModel, /JSON-compatible values/)
assert.match(englishDataModel, /aria-label="MatraJSON color key"/)
assert.match(englishDataModel, /original concept proposed by Matra/)
assert.match(englishDataModel, /not an established general term/)
assert.match(astSpec, /interface MatraAST/)
assert.match(astSpec, /位置情報はmetadata/)
assert.match(astSpec, /AST — Data Modelを扱うobject形式/)
assert.match(astSpec, /MatraModule/)
assert.doesNotMatch(astSpec, /テーマごとの解説と一次資料/)
assert.match(englishAstSpec, /Convert to and from MatraJSON/)
assert.match(englishAstSpec, /distinct from the syntax tree/)
assert.doesNotMatch(englishAstSpec, /Topic guides and primary sources/)
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
assert.ok(
  await initialBundleBytes("assets/playground-worker.js") < 128_000,
  "Playground Worker's initial static bundle should stay under 128 KB",
)
assert.match(css, /prefers-reduced-motion/)
assert.match(css, /--brand: #006fe5/)
assert.match(css, /--paper: #f3f7fd/)
assert.doesNotMatch(css, /#245a43|#d8f278|#6f9c2a/)
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
assert.match(basePathIndex, /href="\/website\/assets\/brand\/logo-mark\.svg"/)
assert.match(basePathIndex, /src="\/website\/assets\/brand\/logo-horizontal\.svg"/)
assert.match(basePathIndex, /content="https:\/\/www\.matralang\.org\/website\/assets\/brand\/og-image\.png"/)
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
