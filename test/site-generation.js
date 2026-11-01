import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { access, cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { buildSite } from "@matra/site-generation"

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
      files[entry.name] = await readFile(file, "utf8")
    }
  }
  return files
}

try {
  await cp(path.join(root, "src"), path.join(project, "src"), { recursive: true })
  await symlink(path.join(root, "node_modules"), path.join(project, "node_modules"), "dir")
  await writeFile(path.join(project, "package.json"), '{"type":"module"}\n')
  build()

  const manifestPath = path.join(output, ".matra-site-manifest.json")
  const initialManifest = JSON.parse(await readFile(manifestPath, "utf8"))
  assert.equal(initialManifest.files.length, 30)
  await writeFile(path.join(output, "unmanaged.txt"), "preserve")

  const extraAsset = path.join(project, ".matra-site", "assets", "obsolete.css")
  await writeFile(extraAsset, "body { color: red; }\n")
  await buildSite(project)
  await access(path.join(output, "assets", "obsolete.css"))

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
  await assert.rejects(access(path.join(output, "assets", "obsolete.css")), { code: "ENOENT" })
  assert.match(await readFile(path.join(output, "about-moved", "index.html"), "utf8"), /Updated migration heading/)
  assert.match(await readFile(path.join(output, "migration-added", "index.html"), "utf8"), /<title>Added migration page<\/title>/)
  assert.equal(await readFile(path.join(output, "unmanaged.txt"), "utf8"), "preserve")

  const successfulOutput = await snapshot(output)
  await writeFile(path.join(project, "src", "content", "page.matra"), "main { missing.value }\n")
  assert.throws(build, error => {
    assert.match(error.stderr, /Site build failed:/)
    return true
  })
  assert.deepEqual(await snapshot(output), successfulOutput, "failed renders must preserve output and manifest")
  await cp(path.join(root, "src", "content", "page.matra"), path.join(project, "src", "content", "page.matra"))

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
