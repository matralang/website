import { sectionPage } from "./_section"

export default sectionPage(
  "PACKAGES",
  "公式パッケージ",
  "Matraのparser、renderer、domain packageを一覧できます。",
  [
    { href: "https://github.com/matralang/matra/tree/main/packages/core", label: "@matra/core", detail: "AST、parser、visitor、transformer。" },
    { href: "https://github.com/matralang/matra/tree/main/packages/html", label: "@matra/html", detail: "Matra ASTのHTML renderer。" },
    { href: "https://github.com/matralang/matra/tree/main/packages/graphics", label: "@matra/graphics", detail: "Graphics domainの表現と描画。" },
  ],
)
