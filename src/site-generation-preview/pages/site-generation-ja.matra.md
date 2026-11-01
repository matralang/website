---
matra:
  entry: page.matra
site:
  route: /site-generation-preview/
  layout: preview
  data:
    title: サイト生成エンジンの試験ページ — Matra
    description: Matraの宣言的サイト生成エンジンを使った試験ページです。
    lang: ja
    navigationLabel: メインナビゲーション
    homeLabel: Matra ホーム
    homeUrl: /
    languageRoute: /en/site-generation-preview/
    otherLang: en
    languageLabel: English
    heading: サイト生成エンジンの試験ページ
    bodyText: このサイトは、試験中のMatraサイト生成エンジンで全ページとアセットを生成しています。このページは、共通レイアウト、ルート出力、ページデータを確認するデモです。
    detailsLabel: 試験範囲
    detailsText: ページデータの分離、共通レイアウト、directory形式のURL、GitHub Pages base pathを確認します。外部データ拡張やwatch機能は含みません。
---
```page.matra
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
        article.feature-card {
          p { page.data.detailsText }
        }
      }
    }
  }
}
```
