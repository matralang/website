---
description: "Matraの宣言的サイト生成エンジンを使った試験ページです。"
lang: ja
navigationLabel: "メインナビゲーション"
homeLabel: "Matra ホーム"
homeUrl: /
languageRoute: /en/site-generation-preview/
otherLang: en
languageLabel: English
bodyText: "このサイトは、試験中のMatraサイト生成エンジンで全ページとアセットを生成しています。このページは、共通レイアウト、ルート出力、ページデータを確認するデモです。"
detailsLabel: "試験範囲"
detailsText: "site.componentsで読み込むCard部品をpageとlayoutから再利用し、通常のHTMLへ展開します。ページデータ、共通layout、directory形式URL、GitHub Pages base pathも確認できます。"
---

# サイト生成エンジンの試験ページ

The page body is kept as a named Matra block; its bilingual copy is supplied separately.

````page.matra
div.site-generation-preview {
  section.hero {
    div.shell.hero-inner {
      p.eyebrow { "SITE GENERATION / PREVIEW" }
      h1 { page.data.heading }
      p.lede { page.data.bodyText }
      div.actions {
        a.button.primary(href=page.data.languageRoute) {
          page.data.languageLabel
        }
      }
    }
  }
  section.features {
    div.shell {
      div.section-heading {
        p.eyebrow { page.data.detailsLabel }
        h2 { "全ページを共通の生成経路へ" }
      }
      div.feature-grid {
        Card({ className: "feature-card", title: "共通部品" }, [
          p { page.data.detailsText }
        ])
      }
    }
  }
}
````
