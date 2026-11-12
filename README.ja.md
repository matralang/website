# Matra Website

[English](./README.md) | [日本語](./README.ja.md)

技術書典で頒布する技術書から訪れた技術者に向けた、Matraの公式websiteです。CLI導入、実行できる作例、Data Model・AST・文法の仕様、公開APIとソースへの導線を優先し、日英で整合させます。一般向けコンテンツの拡充はGUIビルダーの開発と合わせて検討し、ビルダーを提供済みとは扱いません。

## 開発

Node.js 22または24を使用します。

```sh
npm ci
npm test
npm run build
npm run serve
```

全ページとアセットを`@matra/site-generation`から出力します。Matraのtemplateは読みやすいMarkdown文書内の名前付きcode fenceで管理し、`src/content/page.md`がページ本文、`src/content/site.md`が共通の文書layoutです。site-generation previewではページ固有のコピーを各MarkdownのYAML front matterに置き、`src/site-generation-preview/pages.mjs`にはrouteなどの設定だけを残します。各ページにはMarkdownの`#`見出しをちょうど1つ必須とし、表示上の`h1`と文書の`<title>`の既定値にします。front matterに`title`を明記した場合だけ、文書の`<title>`を個別に上書きします。CSSとbrowser JavaScriptはそれぞれ独立したファイルです。`src/build.mjs`は名前付きMatra blockとfront matterを読み込み、作例の実行、デモデータの準備、esbuildによるbrowser scriptのbundleを行って、ページdata・source・layout・componentを`generateSite()`へ直接渡します。site-generation previewは`src/site-generation-preview/components/`の`Card(props, children)`部品をpageとlayoutの両方から再利用します。

ソースと出力の比較には、`src/content/example.md`全体と実際のrenderer出力を表示します。`content`の出どころが分かるように、Matraの入口だけでなくfront matterとJavaScriptの値fenceも含めます。値の接続は共通の日英説明で案内します。

作例は`content.title`を`h1`で使い、JavaScript関数`content.pageTitle`でサイト名を付けて`title`に使います。静的データの共有ではなく関数を渡すことで、`.js.part`を使う理由を示します。関数はbuild時に実行し、生成ページには含めません。

最新のCore・site-generation prereleaseは、literate文書内のnamed ESM module fence、fence間import、Python fenceに対応します。サイトのpage/layoutはsite rootから準備済み依存を解決し、build時の作例はrepository rootを指定します。共通helperやbuild時データ処理を分割・再利用できますが、現状のサイトのpage data記述がそれだけで短くなるわけではありません。Python実行は同梱Pyodideを使い、security sandboxではありません。

`generateSite()`にはpage dataとMatra sourceをJavaScript objectとして渡せるため、中間ファイルとしてMarkdown front matterを生成する必要はありません。previewでは各ページに記述したYAML front matterを読み、そのままAPIへ渡します。site-generation componentは`site.components`で指定した`.matra` sourceからcompileし、pageとlayoutに渡します。`fn Card(props, children) { ... }`を`Card({ title: "見出し" }, [p { "本文" }])`として呼び出せます。通常のHTMLへ展開され、FrontMatterやShadow DOMは不要です。previewではpageとlayoutの両方で利用例を確認できます。

対話デモとPlayground WorkerはCoreの非同期browser parserとESM code splittingを利用します。初期のstatic import graph全体を32 KB・128 KB以内に保ち、Acornは別chunkに出力して文書にJavaScript構文がある場合だけ読み込みます。必要時にはtokenizer chunkもdownloadするため、初期転送量を抑えるもので総bytesは減りません。browser buildではESM splittingを有効にし、すべてのchunkを公開する必要があります。

内容と表示を保てる範囲ではpretty HTMLを優先します。比較用作例はrendererの`pretty: true`を使います。現行rendererはインライン要素間や入れ子の整形済み領域に意味を持つ空白を挿入する場合があるため、任意文書を扱うPlaygroundとデモは通常出力を維持します。サイト本体も現行site-generation packageがpretty設定を公開していないため通常出力です。生成HTMLの後処理でこれらの制約を回避しないでください。

buildはbrowser bundleの一時stagingとして`.matra-site/assets/`を作り直し、そのpathを`generateSite()`へ渡します。ページ・layoutの生成ファイルやsite configは書き出さず、dataとsourceをmemory上で直接渡します。信頼できるMatra sourceだけをbuild対象にしてください。literate APIは実験的なNode.js APIです。

ロゴ素材は`src/assets/brand/`にまとめています。`logo-horizontal.svg`（マークの右にパス化したMatraLangの文字）はヘッダー・フッター用、`logo-stacked.svg`（マークの下に文字）は縦組み用、`logo-mark.svg`（マークのみ）はfavicon用、`og-image.png`はSNS用の1280×800画像です。ロゴを差し替える際は各SVGを更新し、PNGを再生成してください。例えばlibrsvgとImageMagickを使う場合は`rsvg-convert -w 1120 -h 560 src/assets/brand/logo-stacked.svg | magick png:- -background '#f3f7fd' -gravity center -extent 1280x800 -alpha remove -alpha off PNG24:src/assets/brand/og-image.png`を実行します。ロゴの縦横比は保ったまま1280×800のキャンバス中央に配置します。これらの素材はbuild時に`assets/brand/`へコピーされます。サイトUIはロゴの青（`#006fe5`）を基調に、濃い青と青みのある淡色を組み合わせています。OGP画像の絶対URLには`SITE_ORIGIN`（既定値は`https://www.matralang.org`、末尾のスラッシュなし）と`SITE_BASE_PATH`を使用します。

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

website buildは`@matra/core@0.3.1-site.4`、`@matra/site-generation@0.1.0-site.5`、`@matra/html@0.3.1-site.0`のprereleaseを使います。prereleaseは試験利用向けで、安定版のサポートを示しません。literate APIはNode.js 22/24向けで、利用時のRust・隣接checkout・compilerの追加downloadは不要です。生成後のサイトは静的HTML/CSSとPlayground・限定デモ用のclient/Worker assetです。

`dist/.matra-site-manifest.json`に生成したページとアセットを記録し、build間で保持します。buildは`dist/`全体を削除せず、不要になった一覧内のファイルだけを削除し、一覧外のファイルは保持します。build失敗時は旧出力と生成一覧を維持します。一覧のない既存`dist/`から移行するときは、古い`app.css`など不要な旧出力を手動で確認・整理してください。新しいcheckoutからのbuildでは新しい出力先だけを生成します。

依存関係のaudit警告は未対応で、この移行では解消しません。公開前に`npm audit`で内容と影響を確認してください。

`/examples/`と`/en/examples/`には、円の個数・半径を変えるSVGデモと、係数a・入力xを変えるMathMLの`a × x²`デモがあります。固定のMatra文書に範囲・刻み幅を検証した数値を渡し、Core browser APIとHTML rendererで表示と実行ソースを更新します。任意コードは受け付けず、Workerではなくメインスレッドで実行します。初期結果はbuildで生成するため、JavaScript無効時も閲覧できます（操作は無効）。

これらはCore/HTML v0.3.0による文書構造とブラウザ標準SVG・MathMLのデモです。専用の`@matra/graphics`・`@matra/math` APIの対応、記号計算、数学的同値性を示すものではありません。数値計算はCoreの基本算術を使います。デモの定義と検証・生成処理は`src/demos/render.mjs`、日英の案内は`src/content/pages.mjs`にあります。`npm test`で入力範囲、出力、日英ページ、base pathを検証します。

`/play/`と`/en/play/`ではHTML mode限定のbrowser Playgroundを提供します。Core browser APIとHTML rendererをWorker内でbundleし、明示的なRun、手動停止、10秒timeout、構文・実行error表示、sandboxed iframe previewを実装しています。

Integrated Chromiumでの代表計測はclient 3,374 bytes（gzip 1,464 bytes）、Worker 17,588 bytes（gzip 5,722 bytes）です。短い作例の初回応答は25 ms、続く4回は16–18 msでした。これはローカル環境での測定値であり、性能保証ではありません。

Playgroundは実験的な試作で、SVG・Math・JavaScript module import、copy/download、汎用security sandboxは提供しません。Worker終了とiframe sandboxは悪意あるsourceの隔離保証ではありません。信頼できないsourceや機密情報を含む入力は実行しないでください。`@matra/core/experimental/literate`もNode.js向けで、OS sandboxやtimeout保証はありません。
