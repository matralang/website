import assert from "node:assert/strict"
import { demoDefinitions, renderDemo } from "../src/demos/render.mjs"

for (const definition of demoDefinitions) {
  const defaults = Object.fromEntries(definition.controls.map(control => [control.name, control.value]))
  const result = renderDemo(definition.id, defaults, "Demo")
  assert.equal(result.preview.tag, definition.id === "svg" ? "svg" : "math")
  assert.match(result.source, /let /)

  for (const control of definition.controls) {
    for (const invalid of [NaN, Infinity, -Infinity, undefined, null, "3", control.min - control.step, control.max + control.step, control.min + control.step / 2]) {
      assert.throws(() => renderDemo(definition.id, { ...defaults, [control.name]: invalid }, "Demo"), RangeError)
    }
  }
}

for (let count = 3; count <= 24; count++) {
  for (let size = 4; size <= 28; size++) {
    const { html } = renderDemo("svg", { count, size }, "Circles")
    assert.equal([...html.matchAll(/<g transform="rotate\(/g)].length, count)
    assert.equal([...html.matchAll(new RegExp(`cy="80" r="${size}"`, "g"))].length, count)
    assert.match(html, /viewBox="0 0 320 320"/)
    assert.match(html, /role="img" aria-label="Circles"/)
  }
}

for (let a = -5; a <= 5; a += 0.5) {
  for (let x = -10; x <= 10; x += 0.5) {
    const { html } = renderDemo("math", { a, x }, "Equation")
    assert.match(html, /<math display="block"><mrow>/)
    assert.match(html, /<msup>/)
    assert.ok(html.endsWith(`<mn>${a * x * x}</mn></mrow></math>`), `Incorrect result for a=${a}, x=${x}`)
  }
}

const escaped = renderDemo("svg", { count: 8, size: 16 }, "Circle <test> & label").html
assert.match(escaped, /aria-label="Circle &lt;test&gt; &amp; label"/)
for (const invalid of ['"label"', "\\label", "line\nbreak", "\tlabel"]) {
  assert.throws(() => renderDemo("svg", { count: 8, size: 16 }, invalid), /Demo labels/)
}
assert.throws(() => renderDemo("unknown", {}, "Demo"), /Unknown demo/)

console.log("demo rendering tests passed")
