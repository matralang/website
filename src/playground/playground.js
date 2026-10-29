const panel = document.querySelector("[data-playground]")
if (!(panel instanceof HTMLElement)) throw new Error("Playground controls are missing.")

const editor = panel.querySelector("#playground-source")
const runButton = panel.querySelector("#playground-run")
const stopButton = panel.querySelector("#playground-stop")
const status = panel.querySelector("#playground-status")
const preview = panel.querySelector("#playground-preview")
if (
  !(editor instanceof HTMLTextAreaElement) ||
  !(runButton instanceof HTMLButtonElement) ||
  !(stopButton instanceof HTMLButtonElement) ||
  !(status instanceof HTMLElement) ||
  !(preview instanceof HTMLIFrameElement)
) {
  throw new Error("Playground controls are incomplete.")
}

const isJapanese = document.documentElement.lang === "ja"
const messages = isJapanese
  ? {
      running: "Matraを実行しています…",
      stopped: "実行を停止しました。",
      timeout: "10秒でタイムアウトしました。入力を見直して再実行してください。",
      error: "実行エラー",
      rendered: "HTMLを表示しました。応答時間:",
      unexpected: "Workerから予期しない応答がありました。",
    }
  : {
      running: "Running Matra…",
      stopped: "Execution stopped.",
      timeout: "Timed out after 10 seconds. Review the input and run it again.",
      error: "Execution error",
      rendered: "HTML rendered. Response time:",
      unexpected: "The Worker returned an unexpected response.",
    }

const timeoutMilliseconds = 10_000
let activeWorker
let timeout
let runStartedAt = 0

function resetControls() {
  runButton.disabled = false
  stopButton.disabled = true
}

function releaseWorker(worker) {
  if (activeWorker !== worker) return false
  worker.terminate()
  activeWorker = undefined
  window.clearTimeout(timeout)
  resetControls()
  return true
}

function makePreviewDocument(html) {
  const language = isJapanese ? "ja" : "en"
  return `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'"><style>body{margin:0;padding:24px;color:#19201d;background:#fffefa;font:16px/1.65 system-ui,sans-serif}*{box-sizing:border-box}img{max-width:100%}</style></head><body>${html}</body></html>`
}

function stopExecution(message) {
  if (!activeWorker) return
  releaseWorker(activeWorker)
  preview.srcdoc = ""
  status.dataset.state = "stopped"
  status.textContent = message
}

runButton.addEventListener("click", () => {
  if (activeWorker) return

  let worker
  try {
    worker = new Worker(new URL("./playground-worker.js", import.meta.url), {
      type: "module",
      name: "matra-playground",
    })
  } catch (error) {
    status.dataset.state = "error"
    status.textContent = `${messages.error}: ${error instanceof Error ? error.message : String(error)}`
    return
  }

  activeWorker = worker
  runStartedAt = performance.now()
  runButton.disabled = true
  stopButton.disabled = false
  preview.srcdoc = ""
  status.dataset.state = "running"
  status.textContent = messages.running

  timeout = window.setTimeout(() => {
    stopExecution(messages.timeout)
    status.dataset.state = "error"
  }, timeoutMilliseconds)

  worker.addEventListener("message", event => {
    if (!releaseWorker(worker)) return

    const result = event.data
    if (result?.type === "result" && typeof result.html === "string") {
      preview.srcdoc = makePreviewDocument(result.html)
      status.dataset.state = "success"
      status.textContent = `${messages.rendered} ${Math.round(performance.now() - runStartedAt)} ms`
      return
    }

    if (result?.type === "error" && typeof result.message === "string") {
      preview.srcdoc = ""
      status.dataset.state = "error"
      status.textContent = `${messages.error}${result.name ? ` (${result.name})` : ""}: ${result.message}`
      return
    }

    preview.srcdoc = ""
    status.dataset.state = "error"
    status.textContent = messages.unexpected
  })

  worker.addEventListener("error", event => {
    if (!releaseWorker(worker)) return
    preview.srcdoc = ""
    status.dataset.state = "error"
    status.textContent = `${messages.error}: ${event.message}`
  })

  worker.addEventListener("messageerror", () => {
    if (!releaseWorker(worker)) return
    preview.srcdoc = ""
    status.dataset.state = "error"
    status.textContent = messages.unexpected
  })

  worker.postMessage({ source: editor.value })
})

stopButton.addEventListener("click", () => stopExecution(messages.stopped))
