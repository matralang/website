# Matra Website

[English](./README.md) | [日本語](./README.ja.md)

Matraの公式websiteです。v0.3計画に沿って、一般向けの日英入口、実行できる作例、導入手順、仕様への導線を静的HTML/CSSとして生成します。

## 開発

Node.js 22または24を使用します。

```sh
npm ci
npm test
npm run build
npm run serve
```

サイトは`src/content/site.md`の名前付きMatra/JavaScript fenceと`src/content/pages.mjs`の内容から生成します。buildでは`@matra/core/experimental/literate`を使い、Markdown文書を実行して`@matra/html`でHTMLへ変換します。literate APIは実験的なNode.js APIで、信頼したsourceだけをbuildしてください。

## URL

| URL | 内容 |
| --- | --- |
| `/`、`/en/` | 日英の公式入口 |
| `/about/`、`/en/about/` | Matraの説明 |
| `/examples/`、`/en/examples/` | buildで実行する作例 |
| `/docs/`、`/en/docs/` | 導入・ドキュメント |
| `/spec/`、`/en/spec/` | v0.3仕様とrelease範囲 |
| `/play/`、`/en/play/` | HTML限定のbrowser Playground |
| `/packages/`、`/en/packages/` | 公開package |
| `/blog/`、`/en/blog/` | 開発記録 |

既存の`/spec/data-model/`、`/spec/ast/`、`/spec/grammar/`、`/spec/parser/` URLも概要ページへ接続しています。GitHub Pagesのproject pathは`SITE_BASE_PATH`で指定し、CIではPagesの設定から自動取得します。

## 対応範囲

websiteの依存は公開済みの`@matra/core@0.3.0`と`@matra/html@0.3.0`に固定しています。literate APIはNode.js 22/24向けで、利用時のRust・隣接checkout・compilerの追加downloadは不要です。生成後のサイトは静的HTML/CSSとPlayground用の小さなclient/Worker assetです。

`/play/`と`/en/play/`ではHTML mode限定のbrowser Playgroundを提供します。Core browser APIとHTML rendererをWorker内でbundleし、明示的なRun、手動停止、10秒timeout、構文・実行error表示、sandboxed iframe previewを実装しています。

Integrated Chromiumでの代表計測はclient 3,374 bytes（gzip 1,464 bytes）、Worker 17,588 bytes（gzip 5,722 bytes）です。短い作例の初回応答は25 ms、続く4回は16–18 msでした。これはローカル環境での測定値であり、性能保証ではありません。

Playgroundは実験的な試作で、SVG・Math・JavaScript module import、copy/download、汎用security sandboxは提供しません。Worker終了とiframe sandboxは悪意あるsourceの隔離保証ではありません。信頼できないsourceや機密情報を含む入力は実行しないでください。`@matra/core/experimental/literate`もNode.js向けで、OS sandboxやtimeout保証はありません。
