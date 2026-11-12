import { evaluate, parse, staticValueToAST } from "@matra/core/browser-async"
import { toHTML } from "@matra/html"

self.addEventListener("message", async event => {
  const source = event.data?.source
  if (typeof source !== "string") {
    self.postMessage({ type: "error", name: "TypeError", message: "Expected Matra source text." })
    return
  }

  try {
    const ast = staticValueToAST(evaluate(await parse(source)))
    self.postMessage({ type: "result", html: toHTML(ast) })
  } catch (error) {
    self.postMessage({
      type: "error",
      name: error instanceof Error ? error.name : "Error",
      message: error instanceof Error ? error.message : String(error),
    })
  }
})
