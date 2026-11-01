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

全ページとアセットを`@matra/site-generation`から出力します。`src/content/pages.mjs`が日英のページデータ、`src/content/page.matra`が本文、`src/content/site.md`が共通の文書layoutです。`src/build.mjs`は作例の実行、デモデータの準備、esbuildによるブラウザー用scriptのbundleを行い、サイト生成を1回呼び出します。

buildは中間入力として`.matra-site/`を作り直し、`SITE_BASE_PATH`を反映した`matra.site.json`を書き出します。どちらもgit管理外の生成物なので、source側を編集してください。ページデータはJavaScriptの注入ではなくMarkdown front matterで渡します。信頼できるMatra sourceだけをbuild対象にしてください。literate APIは実験的なNode.js APIです。

ページの追加・更新・削除は`src/content/pages.mjs`の日英定義と、関連するnavigation・サイトマップを編集します。公開routeを変更するときは`test/run.js`の期待route一覧も更新してください。試験ページのpage/layout sourceは`src/site-generation-preview/`に残しますが、他のページと同じbuild・生成一覧で管理します。

## URL

| URL | 内容 |
| --- | --- |
| `/`、`/en/` | 日英の公式入口 |
| `/about/`、`/en/about/` | Matraの説明 |
| `/examples/`、`/en/examples/` | buildで実行する作例とSVG・MathMLの操作デモ |
| `/docs/`、`/en/docs/` | 導入・ドキュメント |
| `/spec/`、`/en/spec/` | v0.3仕様とrelease範囲 |
| `/play/`、`/en/play/` | HTML限定のbrowser Playground |
| `/packages/`、`/en/packages/` | 公開package |
| `/blog/`、`/en/blog/` | 開発記録 |

既存の`/spec/data-model/`、`/spec/ast/`、`/spec/grammar/`、`/spec/parser/` URLも概要ページへ接続しています。GitHub Pagesのproject pathは`SITE_BASE_PATH`で指定し、CIではPagesの設定から自動取得します。

サイト生成のデモページは引き続き`/site-generation-preview/`と`/en/site-generation-preview/`です。

ホームリンクは同じ言語の入口（`/`または`/en/`）へ戻ります。`npm test`はCore・HTML・site-generationの
依存ツリー全体、期待する全route、ページのmetadata・見出し、base pathあり・なしの内部リンクと
script・stylesheet参照、再build時の全routeのHTML byte一致を確認します。独立した移行テストでは、
ページ追加・更新・削除、route変更、アセット更新・削除、一覧外ファイルの保持、
ページ生成・アセットbuild失敗時の旧出力と生成一覧の保持を確認します。

移行では全26公開routeを維持します。stylesheetは意図的に`/app.css`から`/assets/app.css`へ変更し、
ブラウザー用bundle名は維持します。移行時の比較では、既存の試験ページ以外の24ページは
stylesheet URLの置換後に旧HTMLと一致し、CSS・JavaScriptの内容も一致しました。
試験ページの説明は統合後のbuildに合わせて更新しています。
release公開前には、navigation、responsive表示、Playground実行、デモをブラウザーで確認してください。

## デプロイ

GitHub Pagesは`production`からのみデプロイします。検証済みcommitを`production`へpushするか、同branchでPages workflowを手動実行すると公開します。`github-pages` environmentの許可branchも`production`のみに設定します。`develop`や`main`へのpushではデプロイしません。

## 対応範囲

website buildは`@matra/core@0.3.1-site.0`、`@matra/site-generation@0.1.0-site.2`、`@matra/html@0.3.1-site.0`のprereleaseを使います。prereleaseは試験利用向けで、安定版のサポートを示しません。literate APIはNode.js 22/24向けで、利用時のRust・隣接checkout・compilerの追加downloadは不要です。生成後のサイトは静的HTML/CSSとPlayground・限定デモ用のclient/Worker assetです。

`dist/.matra-site-manifest.json`に生成したページとアセットを記録し、build間で保持します。buildは`dist/`全体を削除せず、不要になった一覧内のファイルだけを削除し、一覧外のファイルは保持します。build失敗時は旧出力と生成一覧を維持します。一覧のない既存`dist/`から移行するときは、古い`app.css`など不要な旧出力を手動で確認・整理してください。新しいcheckoutからのbuildでは新しい出力先だけを生成します。

依存関係のaudit警告は未対応で、この移行では解消しません。公開前に`npm audit`で内容と影響を確認してください。

`/examples/`と`/en/examples/`には、円の個数・半径を変えるSVGデモと、係数a・入力xを変えるMathMLの`a × x²`デモがあります。固定のMatra文書に範囲・刻み幅を検証した数値を渡し、Core browser APIとHTML rendererで表示と実行ソースを更新します。任意コードは受け付けず、Workerではなくメインスレッドで実行します。初期結果はbuildで生成するため、JavaScript無効時も閲覧できます（操作は無効）。

これらはCore/HTML v0.3.0による文書構造とブラウザ標準SVG・MathMLのデモです。専用の`@matra/graphics`・`@matra/math` APIの対応、記号計算、数学的同値性を示すものではありません。数値計算はCoreの基本算術を使います。デモの定義と検証・生成処理は`src/demos/render.mjs`、日英の案内は`src/content/pages.mjs`にあります。`npm test`で入力範囲、出力、日英ページ、base pathを検証します。

`/play/`と`/en/play/`ではHTML mode限定のbrowser Playgroundを提供します。Core browser APIとHTML rendererをWorker内でbundleし、明示的なRun、手動停止、10秒timeout、構文・実行error表示、sandboxed iframe previewを実装しています。

Integrated Chromiumでの代表計測はclient 3,374 bytes（gzip 1,464 bytes）、Worker 17,588 bytes（gzip 5,722 bytes）です。短い作例の初回応答は25 ms、続く4回は16–18 msでした。これはローカル環境での測定値であり、性能保証ではありません。

Playgroundは実験的な試作で、SVG・Math・JavaScript module import、copy/download、汎用security sandboxは提供しません。Worker終了とiframe sandboxは悪意あるsourceの隔離保証ではありません。信頼できないsourceや機密情報を含む入力は実行しないでください。`@matra/core/experimental/literate`もNode.js向けで、OS sandboxやtimeout保証はありません。
