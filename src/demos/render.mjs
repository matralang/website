import { evaluate, parse, staticValueToAST } from "@matra/core/browser"
import { toHTML } from "@matra/html"

export const demoDefinitions = [
  {
    id: "svg",
    controls: [
      { name: "count", type: "range", min: 3, max: 24, step: 1, value: 8 },
      { name: "size", type: "range", min: 4, max: 28, step: 1, value: 16 },
    ],
  },
  {
    id: "math",
    controls: [
      { name: "a", type: "range", min: -5, max: 5, step: 0.5, value: 2 },
      { name: "x", type: "number", min: -10, max: 10, step: 0.5, value: 3 },
    ],
  },
]

export function renderDemo(id, values, label) {
  const definition = demoDefinitions.find(demo => demo.id === id)
  if (!definition) throw new TypeError(`Unknown demo: ${id}`)
  if (typeof label !== "string" || /["\\\p{Cc}]/u.test(label)) {
    throw new TypeError("Demo labels must be single-line text without quotes, backslashes, or control characters.")
  }
  for (const control of definition.controls) {
    const value = values[control.name]
    if (
      !Number.isFinite(value) || value < control.min || value > control.max ||
      !Number.isInteger((value - control.min) / control.step)
    ) {
      throw new RangeError(`Invalid ${control.name}: expected ${control.min}–${control.max}, step ${control.step}.`)
    }
  }

  const source = id === "svg"
    ? `let count = ${values.count};
let size = ${values.size};
let indices = ${JSON.stringify(Array.from({ length: values.count }, (_, index) => index))};
svg(viewBox="0 0 320 320" role="img" aria-label=${JSON.stringify(label)}) {
  title { ${JSON.stringify(label)} }
  circle(cx=160 cy=160 r=80 fill="none" stroke="#d9ddd5") {}
  ...for (i in indices) {
    g(transform="rotate(" + (i * 360 / count) + " 160 160)") {
      circle(cx=160 cy=80 r=size fill="#245a43" fill-opacity=0.65) {}
    }
  }
}`
    : `let a = ${values.a};
let x = ${values.x};
let result = a * x * x;
math(display="block") {
  mrow {
    mn { a }
    mo { "×" }
    msup {
      mrow {
        mo { "(" }
        mn { x }
        mo { ")" }
      }
      mn { 2 }
    }
    mo { "=" }
    mn { result }
  }
}`

  const preview = staticValueToAST(evaluate(parse(source)))
  return { source, preview, html: toHTML(preview) }
}
