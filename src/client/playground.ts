import { parse } from "@matra/core"
import { toSVG } from "@matra/graphics"
import { toHTML } from "@matra/html"

const source = required<HTMLTextAreaElement>("matra-source")
const status = required<HTMLElement>("playground-status")
const stats = required<HTMLElement>("source-stats")
const astOutput = required<HTMLElement>("ast-output")
const htmlOutput = required<HTMLElement>("html-output")
const svgOutput = required<HTMLElement>("svg-output")
const preview = required<HTMLIFrameElement>("preview-frame")
const errorCard = required<HTMLElement>("playground-error")
const errorMessage = required<HTMLElement>("playground-error-message")
const copyButton = required<HTMLButtonElement>("copy-output")
const downloadButton = required<HTMLButtonElement>("download-output")
const renderMode = required<HTMLSelectElement>("render-mode")

const examples: Record<string, string> = {
  card: `article.card {
  p.eyebrow\`MATRA / HTML\`
  h2\`Structure first.\`
  p\`Edit this source and watch it render.\`
  a.button.primary[href="/spec/"] \`Read the spec\`
  hr;
}`,
  list: `$root {
  h2\`Specification\`
  ol {
    li\`Data Model\`
    li\`AST\`
    li\`Grammar\`
    li\`Parser\`
  }
}`,
  poster: `svg(
  defs(linearGradient(stop(offset="0%", stop-color="#c8f135"), stop(offset="100%", stop-color="#39b7ff"), id="glow")),
  rect(x=0, y=0, width=640, height=400, rx=28, fill="#101814"),
  circle(cx=500, cy=90, r=180, fill="url(#glow)", opacity=0.88),
  text("MATRA", x=48, y=210, fill="#ffffff", font-size=72, font-weight=700),
  text("structure becomes image", x=52, y=252, fill="#c8f135", font-size=22),
  width=640, height=400
)`,
  orbit: `svg(
  rect(x=0, y=0, width=480, height=480, fill="#f3f1e9"),
  circle(cx=240, cy=240, r=150, fill="none", stroke="#193e30", stroke-width=2),
  circle(cx=240, cy=240, r=82, fill="none", stroke="#193e30", stroke-width=2, stroke-dasharray="8 12"),
  circle(cx=390, cy=240, r=22, fill="#c8f135", stroke="#101814", stroke-width=4),
  circle(cx=240, cy=158, r=12, fill="#39b7ff"),
  circle(cx=240, cy=240, r=34, fill="#101814"),
  width=480, height=480
)`,
}

let activePanel = "preview"
let latestOutputs = { ast: "", html: "", svg: "" }
let latestMode: "html" | "svg" = "html"
let timer = 0

function render(): void {
  const value = source.value
  stats.textContent = `${value.length} chars · ${value.split("\n").length} lines`

  try {
    const ast = parse(value)
    const html = toHTML(ast)
    const mode = renderMode.value === "auto"
      ? (ast.tag === "svg" || (ast.tag === "$root" && ast.children.some(child => isNode(child) && child.tag === "svg")) ? "svg" : "html")
      : renderMode.value as "html" | "svg"
    const svg = mode === "svg" ? toSVG(ast, { pretty: true }) : ""
    latestMode = mode
    latestOutputs = { ast: JSON.stringify(ast, null, 2), html, svg }
    astOutput.textContent = latestOutputs.ast
    htmlOutput.textContent = html
    svgOutput.textContent = svg || "SVG modeを選択すると、ここにSVG sourceが表示されます。"
    preview.srcdoc = previewDocument(mode === "svg" ? svg : html, mode)
    errorCard.hidden = true
    status.textContent = `Valid Matra · ${mode.toUpperCase()}`
    status.classList.remove("is-error")
  } catch (error) {
    errorMessage.textContent = error instanceof Error ? error.message : String(error)
    errorCard.hidden = false
    status.textContent = "Invalid source"
    status.classList.add("is-error")
  }
}

function scheduleRender(): void {
  window.clearTimeout(timer)
  timer = window.setTimeout(render, 120)
}

function selectPanel(name: string): void {
  activePanel = name
  document.querySelectorAll<HTMLElement>(".result-tab").forEach(tab => {
    const active = tab.dataset.panel === name
    tab.classList.toggle("active", active)
    tab.setAttribute("aria-selected", String(active))
  })
  document.querySelectorAll<HTMLElement>(".result-view").forEach(panel => {
    panel.classList.toggle("active", panel.id === `panel-${name}`)
  })
}

source.addEventListener("input", scheduleRender)
renderMode.addEventListener("change", render)
document.querySelectorAll<HTMLButtonElement>(".example-button").forEach(button => {
  button.addEventListener("click", () => {
    source.value = examples[button.dataset.example ?? "card"]
    if ((button.dataset.example ?? "").startsWith("poster") || button.dataset.example === "orbit") {
      renderMode.value = "auto"
    }
    render()
    source.focus()
  })
})

document.querySelectorAll<HTMLButtonElement>(".result-tab").forEach(button => {
  button.addEventListener("click", () => selectPanel(button.dataset.panel ?? "preview"))
})

copyButton.addEventListener("click", async () => {
  const output = outputForPanel(activePanel)
  await navigator.clipboard.writeText(output)
  copyButton.textContent = "Copied"
  window.setTimeout(() => { copyButton.textContent = "Copy" }, 1200)
})

downloadButton.addEventListener("click", () => {
  const content = latestMode === "svg" ? latestOutputs.svg : latestOutputs.html
  const extension = latestMode === "svg" ? "svg" : "html"
  const blob = new Blob([content], { type: latestMode === "svg" ? "image/svg+xml" : "text/html" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `matra-output.${extension}`
  link.click()
  URL.revokeObjectURL(link.href)
})

function outputForPanel(panel: string): string {
  if (panel === "ast") return latestOutputs.ast
  if (panel === "svg") return latestOutputs.svg
  if (panel === "preview") return latestMode === "svg" ? latestOutputs.svg : latestOutputs.html
  return latestOutputs.html
}

function previewDocument(output: string, mode: "html" | "svg"): string {
  return `<!doctype html><html><head><style>
    :root{font-family:system-ui,sans-serif;color:#101814;background:#fbfaf5}
    body{margin:0;padding:32px}.graphics-preview{min-height:calc(100vh - 64px);display:grid;place-items:center}.graphics-preview svg{display:block;max-width:100%;height:auto;max-height:calc(100vh - 64px);filter:drop-shadow(0 18px 36px #10181422)}.card,.demo{max-width:520px;padding:28px;border:1px solid #d9d9cf;border-radius:14px;background:white}
    .eyebrow{color:#657800;font:12px monospace;letter-spacing:.12em}.button{display:inline-block;margin-top:10px;padding:10px 16px;border-radius:999px;background:#101814;color:white;text-decoration:none}
  </style></head><body>${mode === "svg" ? `<main class="graphics-preview">${output}</main>` : output}</body></html>`
}

function isNode(value: unknown): value is { tag: string } {
  return typeof value === "object" && value !== null && "tag" in value
}

function required<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id)
  if (!element) throw new Error(`Missing playground element: ${id}`)
  return element as T
}

render()
