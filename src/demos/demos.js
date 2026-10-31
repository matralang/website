import { renderDemo } from "./render.mjs"

for (const panel of document.querySelectorAll("[data-demo]")) {
  const inputs = [...panel.querySelectorAll("input")]
  const preview = panel.querySelector("[data-demo-preview]")
  const source = panel.querySelector("[data-demo-source]")
  const status = panel.querySelector("[data-demo-status]")
  const japanese = document.documentElement.lang === "ja"

  function update() {
    try {
      const values = {}
      for (const input of inputs) {
        const valid = input.validity.valid && input.value !== ""
        input.setAttribute("aria-invalid", String(!valid))
        if (!valid) {
          const label = panel.querySelector(`label[for="${input.id}"]`).textContent
          throw new RangeError(japanese
            ? `${label}: ${input.min}〜${input.max}の範囲で、刻み幅${input.step}の数値を入力してください。`
            : `${label}: enter a number from ${input.min} to ${input.max}, in steps of ${input.step}.`)
        }
        values[input.name] = input.valueAsNumber
        panel.querySelector(`output[for="${input.id}"]`).textContent = input.value
      }
      const result = renderDemo(panel.dataset.demo, values, panel.dataset.demoLabel)
      preview.innerHTML = result.html
      source.textContent = result.source
      status.dataset.state = "success"
      status.textContent = japanese ? "表示とMatraソースを更新しました。" : "Preview and Matra source updated."
    } catch (error) {
      preview.replaceChildren()
      source.textContent = ""
      status.dataset.state = "error"
      status.textContent = error instanceof Error ? error.message : String(error)
    }
  }

  for (const input of inputs) {
    input.disabled = false
    input.addEventListener("input", update)
  }
  update()
}
