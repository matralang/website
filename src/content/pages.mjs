const github = "https://github.com/matralang/matra"
const spec = `${github}/blob/develop/spec`
const cliRelease = "https://www.npmjs.com/package/@matra/cli/v/0.3.2-alpha.1"
const install = "npm install --save-exact @matra/core@0.3.0 @matra/html@0.3.0"
const cliInstall = "npm install --global @matra/cli@0.3.2-alpha.1"

const locales = {
  ja: {
    lang: "ja",
    otherLang: "en",
    languageLabel: "English",
    navigationLabel: "メインナビゲーション",
    homeUrl: "/",
    navigation: [
      { href: "/docs/#get-started", label: "Get Started" },
      { href: "/spec/", label: "仕様" },
      { href: "/examples/", label: "作例" },
    ],
    sitemapLabel: "サイトマップ",
    sitemapGroups: [
      {
        title: "サイト",
        links: [
          { href: "/docs/#get-started", label: "Get Started" },
          { href: "/about/", label: "設計思想" },
          { href: "/examples/", label: "作例" },
          { href: "/docs/", label: "ドキュメント" },
          { href: "/play/", label: "Playground" },
          { href: "/packages/", label: "Packages" },
          { href: "/blog/", label: "開発記録" },
        ],
      },
      {
        title: "仕様",
        links: [
          { href: "/spec/", label: "仕様一覧" },
          { href: "/spec/data-model/", label: "データモデル" },
          { href: "/spec/ast/", label: "AST" },
          { href: "/spec/grammar/", label: "文法 v0.3" },
          { href: "/spec/parser/", label: "parseと評価" },
        ],
      },
    ],
    footerText: "文書構造を記述し、評価し、変換する。",
    brandLabel: "Matra ホーム",
    sampleExplanation: "左は入力Markdown文書の全体です。matra.entryがmain.matraを入口に選び、matra.valuesがcontent.js.partのJavaScript式の結果をcontentとして渡します。contentは組み込み変数ではありません。h1はcontent.titleをそのまま使い、titleはJavaScript関数content.pageTitleを呼び出してサイト名を付けます。値の共有だけならJSONで足りますが、この例では関数を渡すために.js.partを使っています。関数はbuild時に実行され、生成HTMLには含まれません。",
  },
  en: {
    lang: "en",
    otherLang: "ja",
    languageLabel: "日本語",
    navigationLabel: "Main navigation",
    homeUrl: "/en/",
    navigation: [
      { href: "/en/docs/#get-started", label: "Get Started" },
      { href: "/en/spec/", label: "Specs" },
      { href: "/en/examples/", label: "Examples" },
    ],
    sitemapLabel: "Site map",
    sitemapGroups: [
      {
        title: "Explore",
        links: [
          { href: "/en/docs/#get-started", label: "Get Started" },
          { href: "/en/about/", label: "Language design" },
          { href: "/en/examples/", label: "Examples" },
          { href: "/en/docs/", label: "Documentation" },
          { href: "/en/play/", label: "Playground" },
          { href: "/en/packages/", label: "Packages" },
          { href: "/en/blog/", label: "Development log" },
        ],
      },
      {
        title: "Specifications",
        links: [
          { href: "/en/spec/", label: "Specification index" },
          { href: "/en/spec/data-model/", label: "Data model" },
          { href: "/en/spec/ast/", label: "AST" },
          { href: "/en/spec/grammar/", label: "Grammar v0.3" },
          { href: "/en/spec/parser/", label: "Parsing and evaluation" },
        ],
      },
    ],
    footerText: "Describe, evaluate, and transform document structure.",
    brandLabel: "Matra home",
    sampleExplanation: "The left panel shows the complete input Markdown document. matra.entry selects main.matra; matra.values makes the result of the content.js.part JavaScript expression available as content, not a built-in variable. h1 uses content.title directly; title calls the JavaScript function content.pageTitle to append the site name. Sharing a value alone would only need JSON, but this example uses .js.part to pass a function. The function runs at build time and is not included in the generated HTML.",
  },
}

function page(locale, route, languageRoute, copy) {
  const local = locales[locale]
  return {
    ...local,
    playgroundEnabled: false,
    sampleEnabled: true,
    specSections: null,
    specLegend: null,
    specLegendLabel: null,
    specLegendEnabled: false,
    getStarted: null,
    quickInstall: null,
    ...copy,
    route,
    languageUrl: languageRoute,
    githubUrl: github,
  }
}

const ja = (route, enRoute, copy) => page("ja", route, enRoute, copy)
const en = (route, jaRoute, copy) => page("en", route, jaRoute, copy)

const homeJa = {
  title: "Matra — 文書をコードで組み立てる構造言語",
  description: "技術書から実装へ。MatraのCLI導入、JavaScriptと接続する実行例、データモデル・AST・文法の仕様をまとめた技術者向けサイトです。",
  eyebrow: "MATRA / EXPERIMENTAL STRUCTURAL LANGUAGE",
  heading: "文書をコードで組み立てる。",
  intro: "Matraは、文書・データ・プログラムを共通構造で扱うことを目指す実験的な構造言語です。現在のv0.3では、文書構造を記述し、JavaScriptの値と接続し、文書ASTからHTMLを生成する経路を試せます。技術書典の技術書で設計に触れた方は、まずCLIで動かし、ソースと出力を比較しながら仕様・実装へ進んでください。",
  actions: [
    { href: "/docs/#get-started", label: "Get Started", className: "button primary" },
    { href: "/spec/", label: "仕様を読む", className: "button secondary" },
    { href: "/play/", label: "Playground", className: "button secondary" },
  ],
  releaseNote: "Core v0.3.0 / HTML v0.3.0。Node.js向けの実験版です。",
  quickInstall: {
    status: "実験版CLI。Node.js 22/24とnpmが必要です。",
    command: cliInstall,
  },
  sampleEyebrow: "SOURCE → DOCUMENT AST → HTML",
  sampleTitle: "ソースと生成結果を比較する",
  sampleDescription: "このサイト自身もMatraで生成しています。以下はbuildで実行するソースと実際のHTML出力です。Markdownの名前付きコードfenceを入口に、JavaScriptの値を参照して文書を評価し、文書ASTをHTML rendererへ渡します。",
  featuresEyebrow: "技術書の、その先へ",
  featuresTitle: "動かす。構造を読む。実装を追う。",
  cards: [
    { index: "01 / RUN", title: "CLIで最初のページを作る", text: "Node.js 22/24とnpmを用意し、version固定でCLIを導入。matra initからbuild・ローカルpreviewまで進めます。", links: [{ href: "/docs/#get-started", label: "Get Started →" }, { href: "/examples/", label: "実行例とSVG・MathMLデモ →" }] },
    { index: "02 / MODEL", title: "Data Model → AST → 文法", text: "tag・props・childrenとMatraJSONを起点に、文書値の表現、source構文、parseと評価の境界を確認します。", links: [{ href: "/spec/data-model/", label: "データモデルから読む →" }, { href: "/spec/parser/", label: "parseと評価 →" }] },
    { index: "03 / IMPLEMENTATION", title: "公開APIと実装を追う", text: "Coreの評価・AST変換とHTML rendererの責務を確認し、JavaScriptとの接続や自分のツールへの組み込みを検討します。", links: [{ href: "/packages/", label: "Packagesとソース →" }, { href: "/about/", label: "設計思想と技術的背景 →" }] },
  ],
  noticeEyebrow: "開発状況",
  noticeTitle: "実装済みの経路と、実験版の契約。",
  notice: "CLIとNode.js向けliterate APIは実験版です。buildは文書内のJavaScriptを実行するため、信頼するsourceだけを使ってください。PlaygroundはHTML限定、SVG・MathMLはCore/HTMLによる限定デモです。専用Graphics/Math APIや汎用sandboxを提供するものではありません。",
  noticeLink: "/docs/",
  noticeLinkLabel: "導入手順と公開API契約",
}

const homeEn = {
  title: "Matra — Build documents with code",
  description: "From the technical book to working code: CLI setup, runnable JavaScript integration, and Matra's data model, AST, and grammar specifications for developers.",
  eyebrow: "MATRA / EXPERIMENTAL STRUCTURAL LANGUAGE",
  heading: "Build documents with code.",
  intro: "Matra is an experimental structural language aiming to handle documents, data, and programs through a shared structure. In v0.3, you can describe document structure, connect JavaScript values, and generate HTML from a document AST. If you came here from the technical book at TechBookFest, start with the CLI, compare source with output, then explore the specifications and implementation.",
  actions: [
    { href: "/en/docs/#get-started", label: "Get Started", className: "button primary" },
    { href: "/en/spec/", label: "Read the specs", className: "button secondary" },
    { href: "/en/play/", label: "Playground", className: "button secondary" },
  ],
  releaseNote: "Core v0.3.0 / HTML v0.3.0, experimental releases for Node.js.",
  quickInstall: {
    status: "Experimental CLI. Requires Node.js 22/24 and npm.",
    command: cliInstall,
  },
  sampleEyebrow: "SOURCE → DOCUMENT AST → HTML",
  sampleTitle: "Compare source with generated output",
  sampleDescription: "This site is itself generated with Matra. Below are the build-executed source and actual HTML output. A named Markdown code fence selects the entry, the document is evaluated with JavaScript values, and its document AST is passed to the HTML renderer.",
  featuresEyebrow: "Beyond the technical book",
  featuresTitle: "Run it. Read the model. Trace the implementation.",
  cards: [
    { index: "01 / RUN", title: "Create your first page with the CLI", text: "Use Node.js 22/24 and npm to install a pinned CLI version, then go from matra init to a build and local preview.", links: [{ href: "/en/docs/#get-started", label: "Get Started →" }, { href: "/en/examples/", label: "Runnable examples and SVG/MathML demos →" }] },
    { index: "02 / MODEL", title: "Data Model → AST → Grammar", text: "Start with tag, props, children, and MatraJSON, then examine document value representation, source syntax, and the boundary between parsing and evaluation.", links: [{ href: "/en/spec/data-model/", label: "Start with the data model →" }, { href: "/en/spec/parser/", label: "Parsing and evaluation →" }] },
    { index: "03 / IMPLEMENTATION", title: "Explore the public APIs and source", text: "Understand the responsibilities of Core evaluation, AST conversion, and the HTML renderer before integrating JavaScript or building your own tools.", links: [{ href: "/en/packages/", label: "Packages and source →" }, { href: "/en/about/", label: "Language design and technical background →" }] },
  ],
  noticeEyebrow: "Project status",
  noticeTitle: "Implemented paths and experimental contracts.",
  notice: "The CLI and Node.js literate API are experimental. Builds execute document JavaScript, so use trusted source only. The Playground is HTML-only; SVG/MathML are focused Core/HTML demos. These do not provide dedicated Graphics/Math APIs or a general-purpose sandbox.",
  noticeLink: "/en/docs/",
  noticeLinkLabel: "Setup and public API contract",
}

const aboutJa = {
  title: "設計思想 — Matra",
  description: "Matraの共通文書構造、構造的ラーニングの設計思想、JavaScriptとの値の境界とHTML出力の実装範囲。",
  eyebrow: "LANGUAGE DESIGN",
  heading: "構文と、文書構造と、出力を分ける。",
  intro: "Matraは、文書・データ・プログラムを共通の構造で扱うことを目指します。設計の起点は、sourceの書き方と文書値の表現、rendererによる出力を分けることです。現在のv0.3では、JavaScriptとの値の境界と文書ASTからHTMLへの経路を検証しています。技術書の補助資料として、基礎仕様と公開APIの契約を参照してください。",
  actions: [
    { href: "/spec/data-model/", label: "データモデルを読む", className: "button primary" },
    { href: "/docs/#get-started", label: "Get Started", className: "button secondary" },
  ],
  releaseNote: "v0.3は実験版です。安定した互換性や一般的なsandbox保証を約束しません。",
  sampleEyebrow: "IMPLEMENTED PATH",
  sampleTitle: "JavaScriptの値から文書AST、HTMLへ",
  sampleDescription: "Node.js buildでは、Markdown中で入口とJavaScript値を指定し、Matraの実行結果をHTML rendererへ渡します。",
  featuresEyebrow: "設計の考え方",
  featuresTitle: "共通構造と、処理の境界。",
  cards: [
    { index: "01", title: "tag・props・children", text: "文書nodeとJSON互換valueをData Modelで定義し、ASTはobject形式、MatraJSONは交換形式として同じ文書構造を表します。sourceの構文木とは区別します。", links: [{ href: "/spec/data-model/", label: "Data Model →" }, { href: "/spec/ast/", label: "ASTと相互変換 →" }] },
    { index: "02", title: "parseと評価は別の操作", text: "sourceをMatraModuleへparseする処理と、明示的に評価して値を得る処理を分けます。文書ASTへの変換やHTML描画も、それぞれ別の段階です。", links: [{ href: "/spec/parser/", label: "parseと評価の契約 →" }, { href: `${spec}/literate-modules.ja.md`, label: "literate API契約 →" }] },
    { index: "03", title: "構造的ラーニングという構想", text: "他の言語を理解して共通構造へ取り込み、変換や再利用につなげる設計思想です。文書・データ・プログラムの統合を目指す長期構想であり、v0.3で完成した機能ではありません。", links: [{ href: `${spec}/whitepaper-v0.3.ja.md`, label: "v0.3の技術的背景 →" }] },
  ],
  noticeEyebrow: "何を検証するか",
  noticeTitle: "まずはコードと仕様を入口に。",
  notice: "現在のサイトは技術書の読者と、言語・ツールの実装に関心のある技術者を対象にしています。一般向けコンテンツの拡充はGUIビルダーの開発と合わせて検討します。GUIビルダーを提供済みとする案内ではありません。",
  noticeLink: "/spec/",
  noticeLinkLabel: "v0.3の範囲を見る",
}

const aboutEn = {
  title: "Language design — Matra",
  description: "Matra's shared document structure, structural learning vision, JavaScript value boundaries, and implemented HTML output path.",
  eyebrow: "LANGUAGE DESIGN",
  heading: "Separate syntax, document structure, and output.",
  intro: "Matra aims to handle documents, data, and programs through a shared structure. Its design separates source notation, document value representation, and renderer output. Current v0.3 work verifies JavaScript value boundaries and the path from document AST to HTML. Use the foundational specifications and public API contracts as companion material to the technical book.",
  actions: [
    { href: "/en/spec/data-model/", label: "Read the data model", className: "button primary" },
    { href: "/en/docs/#get-started", label: "Get Started", className: "button secondary" },
  ],
  releaseNote: "v0.3 is experimental. It does not promise stable compatibility or a general-purpose sandbox.",
  sampleEyebrow: "IMPLEMENTED PATH",
  sampleTitle: "From JavaScript values to document AST and HTML",
  sampleDescription: "A Node.js build selects an entry and JavaScript values in Markdown, then sends the Matra result to the HTML renderer.",
  featuresEyebrow: "How the pieces fit",
  featuresTitle: "Shared structure, explicit processing boundaries.",
  cards: [
    { index: "01", title: "tag, props, and children", text: "The Data Model defines document nodes and JSON-compatible values. The AST object form and MatraJSON exchange form represent the same document structure, distinct from the source syntax tree.", links: [{ href: "/en/spec/data-model/", label: "Data Model →" }, { href: "/en/spec/ast/", label: "AST and conversion →" }] },
    { index: "02", title: "Parsing and evaluation are separate", text: "Parsing source into a MatraModule is separate from explicitly evaluating it to obtain a value. Document AST conversion and HTML rendering are further distinct stages.", links: [{ href: "/en/spec/parser/", label: "Parsing and evaluation contract →" }, { href: `${spec}/literate-modules.md`, label: "Literate API contract →" }] },
    { index: "03", title: "The structural learning vision", text: "Understanding other languages and mapping them into a shared structure enables transformation and reuse. This is a long-term vision for unifying documents, data, and programs, not a completed v0.3 capability.", links: [{ href: `${spec}/whitepaper-v0.3.md`, label: "v0.3 technical background →" }] },
  ],
  noticeEyebrow: "What is being verified",
  noticeTitle: "Start with code and specifications.",
  notice: "This site currently serves technical-book readers and developers interested in language and tool implementation. Broader introductory content is planned alongside GUI builder development; this does not announce an available GUI builder.",
  noticeLink: "/en/spec/",
  noticeLinkLabel: "Read the v0.3 scope",
}

const examplesJa = {
  title: "作例 — Matra",
  description: "MatraからHTMLを生成する最小例と、操作できるSVG・MathMLの限定デモ。",
  eyebrow: "作例",
  heading: "書いた文書が、HTMLになる。",
  intro: "Matraの入口、JavaScript値、HTML rendererをひとつの短い例で確認できます。掲載しているsourceはwebsite buildでも実行し、右側には実際のrenderer出力を表示しています。",
  actions: [
    { href: "/docs/#get-started", label: "自分の環境で試す", className: "button primary" },
    { href: "/examples/#demos", label: "SVG・数式を操作する", className: "button secondary" },
    { href: "/spec/", label: "仕様を読む", className: "button secondary" },
  ],
  releaseNote: "サンプルはwebsite buildで実行されます。コードのJavaScript値を信頼できる環境でのみ実行してください。",
  sampleEyebrow: "実行されるサンプル",
  sampleTitle: "JavaScript関数と値からHTML文書を生成",
  sampleDescription: "この例をNode.jsで再現する手順は、導入ページにあります。",
  demosEnabled: true,
  demosTitle: "値を変えて、図と数式を見る。",
  demosDescription: "スライダーや入力欄を操作すると、固定のMatra文書を再実行し、表示とソースを更新します。",
  demosScope: "Core/HTML v0.3.0の文書APIから、ブラウザ標準のSVG・MathMLを生成します。専用の@matra/graphics・@matra/math APIや数式の記号計算ではありません。任意コードの実行や外部module importは提供しません。",
  demosInitialStatus: "初期結果を表示しています。操作にはJavaScriptを有効にしてください。",
  demosSourceLabel: "実行したMatraソースを見る",
  demoCopy: {
    svg: {
      title: "SVG：円を並べる",
      description: "円の個数と大きさを変えて、繰り返しと回転によるパターンを試します。",
      labels: { count: "円の個数", size: "円の半径" },
    },
    math: {
      title: "MathML：a × x²",
      description: "係数aと入力xを変え、数式の組版と数値結果を確認します。計算はCoreの基本算術です。",
      labels: { a: "係数 a", x: "入力 x" },
    },
  },
  featuresEyebrow: "次に見るもの",
  featuresTitle: "境界を知ってから、広げる。",
  cards: [
    { index: "01", title: "HTML page", text: "Matraで文書構造を、JavaScriptでデータや関数を記述し、HTMLを生成します。", links: [{ href: "/docs/", label: "導入手順 →" }] },
    { index: "02", title: "SVG・数式", text: "Core/HTMLで生成するSVG・MathMLの限定デモを操作できます。専用Graphics/Math APIとは別の経路です。", links: [{ href: "/examples/#demos", label: "デモを操作する →" }, { href: `${spec}/release-v0.3.ja.md`, label: "release計画 →" }] },
    { index: "03", title: "Webでの編集", text: "HTML限定のPlaygroundでMatra文書を編集・実行できます。Workerの停止と10秒timeoutに対応しています。", links: [{ href: "/play/", label: "Playgroundを試す →" }] },
  ],
  noticeEyebrow: "再現性",
  noticeTitle: "配布packageをversion固定して利用する。",
  notice: install,
  noticeLink: "/docs/",
  noticeLinkLabel: "導入方法",
}

const examplesEn = {
  title: "Examples — Matra",
  description: "A runnable Matra-to-HTML example and interactive, focused SVG/MathML demos.",
  eyebrow: "EXAMPLES",
  heading: "Write a document. Get HTML.",
  intro: "See the Matra entry, JavaScript values, and HTML renderer in one short example. The website build executes this source and shows the actual renderer output beside it.",
  actions: [
    { href: "/en/docs/#get-started", label: "Run it locally", className: "button primary" },
    { href: "/en/examples/#demos", label: "Try SVG and math", className: "button secondary" },
    { href: "/en/spec/", label: "Read the scope", className: "button secondary" },
  ],
  releaseNote: "The sample runs during the site build. Execute JavaScript values only in an environment you trust.",
  sampleEyebrow: "Runnable example",
  sampleTitle: "Generate an HTML document from JavaScript values and a function",
  sampleDescription: "The setup page explains how to reproduce this example with Node.js.",
  demosEnabled: true,
  demosTitle: "Change a value. See the picture and equation.",
  demosDescription: "Sliders and inputs re-run fixed Matra documents, updating both the preview and source.",
  demosScope: "The Core/HTML v0.3.0 document APIs generate browser-native SVG and MathML. These are not the dedicated @matra/graphics or @matra/math APIs, nor symbolic computation. Arbitrary code execution and external module imports are not provided.",
  demosInitialStatus: "Showing the initial result. Enable JavaScript to use the controls.",
  demosSourceLabel: "View the executed Matra source",
  demoCopy: {
    svg: {
      title: "SVG: arrange circles",
      description: "Change the circle count and radius to explore a pattern made with repetition and rotation.",
      labels: { count: "Circle count", size: "Circle radius" },
    },
    math: {
      title: "MathML: a × x²",
      description: "Change coefficient a and input x to see equation typesetting and a numeric result. Calculation uses Core's basic arithmetic.",
      labels: { a: "Coefficient a", x: "Input x" },
    },
  },
  featuresEyebrow: "Explore next",
  featuresTitle: "Know the boundary before extending it.",
  cards: [
    { index: "01", title: "HTML page", text: "Describe document structure in Matra, data and functions in JavaScript, and generate HTML.", links: [{ href: "/en/docs/", label: "Setup instructions →" }] },
    { index: "02", title: "SVG and math", text: "Try focused SVG/MathML demos generated with Core/HTML. This is a separate path from the dedicated Graphics/Math APIs.", links: [{ href: "/en/examples/#demos", label: "Try the demos →" }, { href: `${spec}/release-v0.3.md`, label: "Release plan →" }] },
    { index: "03", title: "Editing in a browser", text: "Edit and run Matra documents in the HTML-only Playground, with Worker termination and a 10-second timeout.", links: [{ href: "/en/play/", label: "Try the Playground →" }] },
  ],
  noticeEyebrow: "Reproducibility",
  noticeTitle: "Pin the published package versions.",
  notice: install,
  noticeLink: "/en/docs/",
  noticeLinkLabel: "Installation",
}

const playJa = {
  title: "Playground — Matra",
  description: "WorkerでHTML modeを試せる、制限を明示したMatra browser Playgroundです。",
  eyebrow: "BROWSER PLAYGROUND",
  heading: "文書を、HTMLで試す。",
  intro: "現行v0.3のCore browser APIでMatra文書を実行し、HTML previewを生成する試作です。実行はWorkerで行い、応答がない場合は10秒で停止します。",
  actions: [
    { href: "/play/#playground", label: "Playgroundを試す", className: "button primary" },
    { href: "/examples/", label: "Node.jsの作例", className: "button secondary" },
    { href: "/docs/", label: "導入手順", className: "button secondary" },
  ],
  releaseNote: "このPlaygroundはHTML modeのみ。SVG・MathMLの限定デモは作例ページにあります。専用Math API・JavaScript module importは対象外です。",
  sampleEyebrow: "HTML PLAYGROUND",
  sampleTitle: "Matraを編集して実行",
  sampleDescription: "実行は明示操作です。Workerを停止でき、出力はscriptとnetworkを無効にしたsandboxed iframeに表示します。",
  playgroundEnabled: true,
  playgroundLabel: "Matra document",
  playgroundRunLabel: "実行",
  playgroundStopLabel: "停止",
  playgroundPreviewLabel: "HTML preview",
  playgroundHelp: "MatraのHTML文書だけを実行します。JavaScriptは実行されず、一般的なsecurity sandboxではありません。",
  playgroundInitialStatus: "実行するとHTML previewを表示します。",
  playgroundSource: `article {
  h1 { "こんにちは、Matra。" }
  p { "文書を編集して、実行してください。" }
  ul {
    ...for (item in ["HTML", "Worker", "Preview"]) {
      li { item }
    }
  }
}`,
  featuresEyebrow: "試作の対応範囲",
  featuresTitle: "HTMLだけを、明示的に実行。",
  cards: [
    { index: "01", title: "HTML文書", text: "現行Coreのparse・evaluate・document AST変換とHTML rendererを使用します。", links: [] },
    { index: "02", title: "Workerで停止", text: "同期loopも停止操作または10秒の期限でWorkerごと終了します。構文・実行エラーは画面に表示します。", links: [] },
    { index: "03", title: "明示的な制限", text: "JavaScript、SVG、Math、copy/download、汎用sandboxは提供しません。previewはscriptとnetworkを制限します。", links: [{ href: `${spec}/release-v0.3.ja.md`, label: "v0.3計画 →" }] },
  ],
  noticeEyebrow: "実験版の注意",
  noticeTitle: "信頼できないコードの安全な実行環境ではありません。",
  notice: "Workerの停止とiframeの制限は一般的なsecurity sandbox保証ではありません。機密情報を含む入力や、信頼できないsourceを実行しないでください。",
  noticeLink: "/examples/",
  noticeLinkLabel: "Node.js作例を見る",
}

const playEn = {
  title: "Playground — Matra",
  description: "An explicitly limited Matra browser Playground for trying HTML mode in a Worker.",
  eyebrow: "BROWSER PLAYGROUND",
  heading: "Try a document as HTML.",
  intro: "This prototype runs Matra documents with the current v0.3 Core browser API and renders an HTML preview. Execution runs in a Worker and stops after 10 seconds if it does not respond.",
  actions: [
    { href: "/en/play/#playground", label: "Open the Playground", className: "button primary" },
    { href: "/en/examples/", label: "Node.js examples", className: "button secondary" },
    { href: "/en/docs/", label: "Setup instructions", className: "button secondary" },
  ],
  releaseNote: "HTML mode only. Focused SVG/MathML demos are on the examples page. Dedicated Math APIs and JavaScript module imports are out of scope.",
  sampleEyebrow: "HTML PLAYGROUND",
  sampleTitle: "Edit and run Matra",
  sampleDescription: "Execution requires an explicit action. A Worker can be stopped, and output is shown in a sandboxed iframe with scripts and network access disabled.",
  playgroundEnabled: true,
  playgroundLabel: "Matra document",
  playgroundRunLabel: "Run",
  playgroundStopLabel: "Stop",
  playgroundPreviewLabel: "HTML preview",
  playgroundHelp: "Runs Matra HTML documents only. JavaScript is not executed; this is not a general-purpose security sandbox.",
  playgroundInitialStatus: "Run the document to update the HTML preview.",
  playgroundSource: `article {
  h1 { "Hello, Matra." }
  p { "Edit this document, then run it." }
  ul {
    ...for (item in ["HTML", "Worker", "Preview"]) {
      li { item }
    }
  }
}`,
  featuresEyebrow: "Prototype scope",
  featuresTitle: "HTML only, with explicit execution.",
  cards: [
    { index: "01", title: "HTML documents", text: "Uses the current Core parser, evaluator, document AST conversion, and HTML renderer.", links: [] },
    { index: "02", title: "Stop the Worker", text: "The Worker is terminated by the stop button or a 10-second deadline. Syntax and runtime errors are shown on the page.", links: [] },
    { index: "03", title: "Explicit limitations", text: "JavaScript, SVG, Math, copy/download, and a general-purpose sandbox are not provided. The preview restricts scripts and network access.", links: [{ href: `${spec}/release-v0.3.md`, label: "v0.3 plan →" }] },
  ],
  noticeEyebrow: "Experimental",
  noticeTitle: "This is not a safe execution environment for untrusted code.",
  notice: "Worker termination and iframe restrictions are not a general-purpose security sandbox. Do not run untrusted source or input containing sensitive information.",
  noticeLink: "/en/examples/",
  noticeLinkLabel: "View Node.js examples",
}

const docsCards = (locale) => locale === "ja"
  ? [
      { index: "01", title: "作例", text: "Matra、JavaScript、HTML rendererをつなぐ最小の実行例です。", links: [{ href: "/examples/", label: "作例を見る →" }] },
      { index: "02", title: "v0.3仕様", text: "文書data model、文法、公開literate APIの一次資料です。", links: [{ href: "/spec/", label: "仕様一覧 →" }] },
      { index: "03", title: "パッケージ", text: "検証対象となるCoreとHTMLの公開packageを案内します。", links: [{ href: "/packages/", label: "package一覧 →" }] },
    ]
  : [
      { index: "01", title: "Examples", text: "A minimal runnable path connecting Matra, JavaScript, and the HTML renderer.", links: [{ href: "/en/examples/", label: "View examples →" }] },
      { index: "02", title: "v0.3 specifications", text: "Primary sources for the document data model, grammar, and public literate API.", links: [{ href: "/en/spec/", label: "Browse specifications →" }] },
      { index: "03", title: "Packages", text: "Published Core and HTML packages included in the verification scope.", links: [{ href: "/en/packages/", label: "View packages →" }] },
    ]

const docsCopy = (locale) => locale === "ja"
  ? {
      title: "ドキュメント — Matra",
      description: "Matra v0.3の導入、作例、仕様、packageの入口。",
      eyebrow: "ドキュメント",
      heading: "CLIで動かし、APIで組み込む。",
      intro: "技術書で読んだ構造を、自分の環境で確かめるための入口です。まずGet Startedでページを生成し、次にJavaScriptと接続する実行例、Core・HTMLの公開API、文法と評価の契約へ進んでください。",
      actions: [{ href: "/docs/#get-started", label: "Get Started", className: "button primary" }, { href: "/examples/", label: "実行例を見る", className: "button secondary" }, { href: "/spec/", label: "仕様を読む", className: "button secondary" }],
      releaseNote: "対応環境: Node.js 22/24。literate APIは実験的なNode.js APIです。",
      sampleEyebrow: "最初の一歩",
      sampleTitle: "CoreとHTMLを導入",
      sampleDescription: "固定versionで導入し、READMEと公開API契約を参照します。",
      featuresEyebrow: "読む・試す",
      featuresTitle: "目的に合わせて進む。",
      cards: docsCards(locale),
      noticeEyebrow: "注意",
      noticeTitle: "安定版と実験版を区別してください。",
      notice: "literate APIの互換性、OS sandbox、timeout保証はありません。公開API契約にある対応範囲を先に確認してください。",
      noticeLink: `${spec}/literate-modules.ja.md`,
      noticeLinkLabel: "公開API契約",
    }
  : {
      title: "Documentation — Matra",
      description: "Entry points for Matra v0.3 setup, examples, specifications, and packages.",
      eyebrow: "DOCUMENTATION",
      heading: "Run the CLI. Integrate the APIs.",
      intro: "Test the structures you read about in the technical book on your own machine. Generate a page with Get Started, then explore the runnable JavaScript integration, Core/HTML public APIs, and grammar and evaluation contracts.",
      actions: [{ href: "/en/docs/#get-started", label: "Get Started", className: "button primary" }, { href: "/en/examples/", label: "Run the example", className: "button secondary" }, { href: "/en/spec/", label: "Read the specs", className: "button secondary" }],
      releaseNote: "Supported setup: Node.js 22/24. The literate API is experimental and Node.js-only.",
      sampleEyebrow: "First step",
      sampleTitle: "Install Core and HTML",
      sampleDescription: "Install exact versions and refer to the README and public API contract.",
      featuresEyebrow: "Read and try",
      featuresTitle: "Choose your next step.",
      cards: docsCards(locale),
      noticeEyebrow: "Important",
      noticeTitle: "Distinguish stable and experimental scope.",
      notice: "The literate API does not provide compatibility guarantees, an OS sandbox, or a timeout guarantee. Review the public API contract first.",
      noticeLink: `${spec}/literate-modules.md`,
      noticeLinkLabel: "Public API contract",
    }

const specCards = (locale) => locale === "ja"
  ? [
      { index: "01", title: "基礎仕様 — Data Model", text: "文書nodeとvalueが何を表すかを定める基礎です。tag・props・childrenの構造、JSON互換value、MatraJSON、文書Morphionを定義します。", links: [{ href: "/spec/data-model/", label: "Data Modelを読む →" }, { href: `${spec}/data-model.ja.md`, label: "規範的な定義 →" }] },
      { index: "02", title: "基礎仕様 — AST", text: "Data Modelを処理系が扱うobject形式で表したものです。visitor・transformer・rendererでの利用と、MatraJSONとの相互変換を定義します。", links: [{ href: "/spec/ast/", label: "ASTを読む →" }, { href: `${spec}/ast.ja.md`, label: "規範的な定義 →" }] },
      { index: "03", title: "現行仕様 — 文法 v0.3", text: "Matra sourceの式、node構築、XML-style markup、parseと静的取得の規則。基礎仕様のData Model／ASTとは役割が異なります。", links: [{ href: "/spec/grammar/", label: "文法を読む →" }, { href: `${spec}/grammar.ja.md`, label: "規範的な定義 →" }] },
      { index: "04", title: "parseと評価", text: "MatraModule、静的取得、明示的な評価の役割を整理します。", links: [{ href: "/spec/parser/", label: "parseと評価を読む →" }, { href: `${spec}/program.ja.md`, label: "Program仕様 →" }] },
      { index: "05", title: "release範囲", text: "検証対象、既知の制限、公開packageのrelease条件。", links: [{ href: `${spec}/release-v0.3.ja.md`, label: "v0.3計画 →" }] },
    ]
  : [
      { index: "01", title: "Foundation — Data Model", text: "Defines what document nodes and values represent: the tag/props/children structure, JSON-compatible values, MatraJSON, and document Morphion.", links: [{ href: "/en/spec/data-model/", label: "Read the Data Model →" }, { href: `${spec}/data-model.md`, label: "Normative definition →" }] },
      { index: "02", title: "Foundation — AST", text: "Defines the object form in which tools work with the Data Model, including its use by visitors, transformers, and renderers and its conversion to MatraJSON.", links: [{ href: "/en/spec/ast/", label: "Read about the AST →" }, { href: `${spec}/ast.md`, label: "Normative definition →" }] },
      { index: "03", title: "Current specification — Grammar v0.3", text: "The current rules for Matra source expressions, node construction, XML-style markup, parsing, and static retrieval. It has a different role from the foundational Data Model and AST.", links: [{ href: "/en/spec/grammar/", label: "Read the grammar →" }, { href: `${spec}/grammar.md`, label: "Normative definition →" }] },
      { index: "04", title: "Parsing and evaluation", text: "The roles of MatraModule, static retrieval, and explicit evaluation.", links: [{ href: "/en/spec/parser/", label: "Read about parsing →" }, { href: `${spec}/program.md`, label: "Program specification →" }] },
      { index: "05", title: "Release scope", text: "Verification targets, known limitations, and publication conditions for released packages.", links: [{ href: `${spec}/release-v0.3.md`, label: "v0.3 plan →" }] },
    ]

const specCopy = (locale) => locale === "ja"
  ? {
      title: "仕様とv0.3の範囲 — Matra",
      description: "Matraの現行文法v0.3と、基礎となるデータモデル・ASTの仕様。",
      sampleEnabled: false,
      eyebrow: "仕様と範囲",
      heading: "まずData ModelとASTから読む。",
      intro: "Data Modelは文書nodeとvalueの意味・構造を定める基礎仕様、ASTはそのモデルを処理系で扱うobject形式です。その上でGrammar v0.3が現在のsource構文とparse・評価の契約を定めます。Data Model／ASTはv0.2、現行文法はv0.3で、版と役割は別です。",
      actions: [{ href: "/spec/data-model/", label: "Data Modelを読む", className: "button primary" }, { href: "/spec/grammar/", label: "文法を読む", className: "button secondary" }, { href: `${spec}/release-v0.3.ja.md`, label: "release計画", className: "button secondary" }],
      releaseNote: "仕様v0.3、個別npm package version、compiler ABIは別々に管理されます。",
      sampleEyebrow: "仕様を読む順序",
      sampleTitle: "文書の値を定める基礎仕様から",
      sampleDescription: "最初にData Modelでnodeとvalueを理解し、次にASTで処理系内の表現を確認します。Grammar v0.3はMatra sourceの書き方と処理を定めます。package versionと言語仕様versionは独立しており、規範的な要件は各一次資料を参照してください。",
      featuresEyebrow: "仕様を読む",
      featuresTitle: "テーマごとの解説と一次資料。",
      cards: specCards(locale),
      noticeEyebrow: "区別すること",
      noticeTitle: "仕様の適用範囲を確認してください。",
      notice: "Data Model／AST v0.2は値の表現を定義し、Grammar v0.3は現行source文法・parse・静的取得を定義します。旧Parser v0.2は歴史的資料です。HTML描画やtag固有の意味は別domainの仕様です。",
      noticeLink: `${spec}/data-model.ja.md`,
      noticeLinkLabel: "文書data model",
    }
  : {
      title: "Specifications and v0.3 scope — Matra",
      description: "The current Matra v0.3 grammar and the foundational data model and AST specifications.",
      sampleEnabled: false,
      eyebrow: "SPECIFICATIONS AND SCOPE",
      heading: "Start with the Data Model and AST.",
      intro: "The Data Model defines the meaning and structure of document nodes and values; the AST is the object form tools use to work with that model. Grammar v0.3 then defines current Matra source syntax, parsing, and evaluation. The Data Model and AST are v0.2, while the current grammar is v0.3: their versions and roles are distinct.",
      actions: [{ href: "/en/spec/data-model/", label: "Read the Data Model", className: "button primary" }, { href: "/en/spec/grammar/", label: "Read the grammar", className: "button secondary" }, { href: `${spec}/release-v0.3.md`, label: "Release plan", className: "button secondary" }],
      releaseNote: "Specification v0.3, individual npm package versions, and compiler ABI are managed separately.",
      sampleEyebrow: "A reading order",
      sampleTitle: "Begin with the foundations of document values",
      sampleDescription: "First learn the node and value model; then see how the AST represents it inside tools. Grammar v0.3 defines how Matra source is written and processed. Package versions are independent of language specification versions; consult each primary source for normative requirements.",
      featuresEyebrow: "Read the specifications",
      featuresTitle: "Topic guides and primary sources.",
      cards: specCards(locale),
      noticeEyebrow: "Keep distinct",
      noticeTitle: "Check each specification's scope.",
      notice: "Data Model/AST v0.2 define value representation; Grammar v0.3 defines the current source syntax, parsing, and static retrieval. Parser v0.2 is historical. HTML rendering and tag-specific semantics belong to separate domains.",
      noticeLink: `${spec}/data-model.md`,
      noticeLinkLabel: "Document data model",
    }

const packageCards = (locale) => locale === "ja"
  ? [
      { index: "01", title: "@matra/core", text: "文法、program評価、文書AST、文書nodeを指数と値の対応で表すMorphion形式への変換、browser API、experimental/literate API。v0.3.0。", links: [{ href: `${github}/tree/develop/packages/core`, label: "Core source →" }] },
      { index: "02", title: "@matra/html", text: "文書ASTをHTMLへ変換し、文字列・属性のescapeとbase pathに対応。v0.3.0。", links: [{ href: `${github}/tree/develop/packages/html`, label: "HTML source →" }] },
      { index: "03", title: "別domain package", text: "Graphics・Math・Compute Engineは個別の検証対象です。このsiteの依存として、すべてを公開済み・完成済みとは扱いません。", links: [{ href: `${spec}/release-v0.3.ja.md`, label: "優先度と範囲 →" }] },
    ]
  : [
      { index: "01", title: "@matra/core", text: "Grammar, program evaluation, document AST, conversion to Matra's proposed exponent-to-value representation of document nodes (Morphion), browser API, and the experimental literate API. v0.3.0.", links: [{ href: `${github}/tree/develop/packages/core`, label: "Core source →" }] },
      { index: "02", title: "@matra/html", text: "Renders document AST to HTML with text/attribute escaping and base-path support. v0.3.0.", links: [{ href: `${github}/tree/develop/packages/html`, label: "HTML source →" }] },
      { index: "03", title: "Other domain packages", text: "Graphics, Math, and Compute Engine have separate verification scopes; this site does not present them all as published or complete.", links: [{ href: `${spec}/release-v0.3.md`, label: "Priorities and scope →" }] },
    ]

const packagesCopy = (locale) => locale === "ja"
  ? {
      title: "Packages — Matra",
      description: "Matra v0.3の公開対象となるCoreとHTML package。",
      eyebrow: "PACKAGES",
      heading: "公開packageと検証範囲。",
      intro: "websiteの再現可能なHTML出力経路は、npmで公開されたCore・HTML v0.3.0 packageをversion固定して利用します。その他のpackageの公開状況や完成度は、それぞれの配布物とrelease記録で確認してください。",
      actions: [{ href: "/docs/", label: "導入する", className: "button primary" }, { href: `${github}/tree/develop/packages`, label: "全packageを見る", className: "button secondary" }],
      releaseNote: "v0.3.0の正式公開対象はCoreとHTMLです。全packageの完成を意味しません。",
      sampleEyebrow: "検証対象",
      sampleTitle: "websiteのbuildを再現する依存",
      sampleDescription: "正確なversionと配布上の制限を確認してから導入してください。",
      featuresEyebrow: "パッケージ",
      featuresTitle: "役割と公開状態を分けて確認。",
      cards: packageCards(locale),
      noticeEyebrow: "環境",
      noticeTitle: "literate APIはNode.js 22/24を対象とします。",
      notice: "同梱compilerにより、利用時のRust・checkout・追加downloadは不要です。APIは実験的で、信頼した入力のみ実行してください。",
      noticeLink: `${spec}/literate-modules.ja.md`,
      noticeLinkLabel: "公開・配布契約",
    }
  : {
      title: "Packages — Matra",
      description: "Published Core and HTML packages in the Matra v0.3 scope.",
      eyebrow: "PACKAGES",
      heading: "Published packages and verification scope.",
      intro: "The website's reproducible HTML path uses the npm-published Core and HTML v0.3.0 packages at pinned versions. Check each package's distribution and release notes for the publication status and completeness of other packages.",
      actions: [{ href: "/en/docs/", label: "Get started", className: "button primary" }, { href: `${github}/tree/develop/packages`, label: "Browse all packages", className: "button secondary" }],
      releaseNote: "The formal v0.3.0 publication covers Core and HTML, not completion of every package.",
      sampleEyebrow: "Verification target",
      sampleTitle: "Dependencies used by the website build",
      sampleDescription: "Check exact versions and distribution limitations before installing.",
      featuresEyebrow: "Packages",
      featuresTitle: "Check role and publication status separately.",
      cards: packageCards(locale),
      noticeEyebrow: "Environment",
      noticeTitle: "The literate API targets Node.js 22/24.",
      notice: "The bundled compiler means Rust, a checkout, and an additional download are not required at runtime. The API is experimental; run only trusted input.",
      noticeLink: `${spec}/literate-modules.md`,
      noticeLinkLabel: "Public distribution contract",
    }

const playCopy = (locale) => locale === "ja" ? playJa : playEn

const getStarted = (locale) => locale === "ja"
  ? {
      title: "Get Started：npmでページを作る",
      status: "Windows・macOS向けの実験版です。Node.js 22/24とnpmを使います。",
      sections: [
        { title: "1. Node.jsを用意", text: "WindowsまたはmacOSにNode.js 22または24とnpmをインストールし、ターミナルを開きます。PowerShellでも同じコマンドを使えます。", code: "node --version\nnpm --version", link: "https://nodejs.org/en/download", linkLabel: "Node.js公式ダウンロード" },
        { title: "2. CLIを導入", text: "次のコマンドで実験版をversion固定してインストールします。PowerShellのスクリプト実行制限で失敗する場合はnpm.cmdとmatra.cmdを使います。コマンドが見つからない場合はnpmのprefixとPATHを確認してください。", code: `${cliInstall}\nmatra --version`, link: "https://docs.npmjs.com/cli/v11/commands/npm-prefix", linkLabel: "npm prefixの説明" },
        { title: "3. ページを作成", text: "helloは存在しないディレクトリを指定します。dist/index.htmlを開くか、表示されたlocalhostのURLでプレビューします。更新後のブラウザ再読み込みは手動、終了はCtrl+Cです。", code: "matra init hello\ncd hello\nmatra build\nmatra dev", link: cliRelease, linkLabel: "npmの公開package" },
      ],
      notice: "実験版です。buildは文書内のJavaScriptを実行するため、信頼する文書だけを使ってください。OS sandboxや実行時間の保証はありません。キャンペーンの案内・サポート期間は別途お知らせします。",
    }
  : {
      title: "Get Started: create a page with npm",
      status: "An experimental release for Windows and macOS using Node.js 22/24 and npm.",
      sections: [
        { title: "1. Install Node.js", text: "Install Node.js 22 or 24 and npm on Windows or macOS, then open a terminal. The same commands work in PowerShell.", code: "node --version\nnpm --version", link: "https://nodejs.org/en/download", linkLabel: "Official Node.js download" },
        { title: "2. Install the CLI", text: "Install the experimental version with this pinned command. If PowerShell blocks scripts, use npm.cmd and matra.cmd instead. If the global command is not found, check npm's prefix and PATH.", code: `${cliInstall}\nmatra --version`, link: "https://docs.npmjs.com/cli/v11/commands/npm-prefix", linkLabel: "About npm prefix" },
        { title: "3. Create a page", text: "Choose a directory that does not exist for hello. Open dist/index.html or preview the displayed localhost URL. Refresh the browser manually after changes and stop with Ctrl+C.", code: "matra init hello\ncd hello\nmatra build\nmatra dev", link: cliRelease, linkLabel: "Published npm package" },
      ],
      notice: "This is experimental. Builds execute document JavaScript, so use trusted documents only. No OS sandbox or execution timeout is guaranteed. Campaign information and support dates will be announced separately.",
    }

function withSample(copy) {
  return {
    ...copy,
    sampleSource: "",
    sampleOutput: "",
  }
}

const pages = [
  ja("/", "/en/", withSample(homeJa)),
  en("/en/", "/", withSample(homeEn)),
  ja("/about/", "/en/about/", withSample(aboutJa)),
  en("/en/about/", "/about/", withSample(aboutEn)),
  ja("/examples/", "/en/examples/", withSample(examplesJa)),
  en("/en/examples/", "/examples/", withSample(examplesEn)),
  ja("/docs/", "/en/docs/", withSample({ ...docsCopy("ja"), getStarted: getStarted("ja") })),
  en("/en/docs/", "/docs/", withSample({ ...docsCopy("en"), getStarted: getStarted("en") })),
  ja("/spec/", "/en/spec/", withSample(specCopy("ja"))),
  en("/en/spec/", "/spec/", withSample(specCopy("en"))),
  ja("/play/", "/en/play/", withSample(playCopy("ja"))),
  en("/en/play/", "/play/", withSample(playCopy("en"))),
  ja("/packages/", "/en/packages/", withSample(packagesCopy("ja"))),
  en("/en/packages/", "/packages/", withSample(packagesCopy("en"))),
  ja("/blog/", "/en/blog/", withSample({
    ...docsCopy("ja"),
    title: "開発記録 — Matra",
    eyebrow: "開発記録",
    heading: "公開できる記録から。",
    intro: "Matra v0.3の設計判断・検証状況は、更新日と対象commitを含むrepositoryのspecificationとrelease noteを一次情報として公開します。",
    featuresTitle: "進行状況を追う。",
    noticeTitle: "現時点で個別の記事はありません。",
    notice: "計画やローカル検証を、公開済みreleaseや完了済みのwebsite移行と誤認させないよう、記録を確認してから掲載します。",
  })),
  en("/en/blog/", "/blog/", withSample({
    ...docsCopy("en"),
    title: "Development log — Matra",
    eyebrow: "DEVELOPMENT LOG",
    heading: "Publish what can be verified.",
    intro: "Design decisions and verification status for Matra v0.3 are published in repository specifications and release notes with their dates and target commits.",
    featuresTitle: "Follow the work.",
    noticeTitle: "There are no individual posts yet.",
    notice: "We will verify each update before publication so a plan or local check is not mistaken for a release or a completed website migration.",
  })),
]

const matraNodeCode = (tag, props, children) => [
  { type: "plain", text: "[" },
  { type: "tag", text: JSON.stringify(tag) },
  { type: "plain", text: ", " },
  { type: "props", text: JSON.stringify(props) },
  { type: "plain", text: ", " },
  { type: "children", text: JSON.stringify(children) },
  { type: "plain", text: "]" },
]

const specDetails = [
  {
    path: "data-model",
    jaLink: `${spec}/data-model.ja.md`,
    enLink: `${spec}/data-model.md`,
    jaTitle: "Data Model — Matra",
    enTitle: "Data Model — Matra",
    jaDescription: "Matra Data Model v0.2が定義する文書node、value、等価性、MatraJSONの概要。",
    enDescription: "An overview of the document nodes, values, equality, and MatraJSON defined by Matra Data Model v0.2.",
    jaEyebrow: "基礎仕様 01 / DATA MODEL",
    enEyebrow: "FOUNDATION 01 / DATA MODEL",
    jaHeading: "Data Model — 文書nodeとvalueの定義。",
    enHeading: "Data Model — the definition of document nodes and values.",
    jaIntro: "Data Model v0.2は、domainに依存しないMatra文書の意味と形を定義する基礎仕様です。nodeのtag・props・children、valueとして許される型、文書の等価性、MatraJSONでの交換方法を定めます。Grammar v0.3やpackage versionとは別の仕様です。",
    enIntro: "Data Model v0.2 is the foundation that defines the meaning and shape of domain-independent Matra documents. It specifies node tag/props/children, allowed value types, document equality, and exchange through MatraJSON. It is separate from Grammar v0.3 and package versions.",
    jaSpecLegendLabel: "MatraJSONの色分け",
    enSpecLegendLabel: "MatraJSON color key",
    jaSpecLegend: [
      { type: "tag", label: "tag — nodeの名前" },
      { type: "props", label: "props — 属性データ" },
      { type: "children", label: "children — 順序付きの子要素" },
    ],
    enSpecLegend: [
      { type: "tag", label: "tag — node name" },
      { type: "props", label: "props — property data" },
      { type: "children", label: "children — ordered child values" },
    ],
    jaSections: [
      { index: "01 / NODE", title: "nodeはtag・props・children", text: "文書はroot nodeをちょうど1つ持ちます。tagはnodeを識別するstring、propsはstring keyからvalueへのmap、childrenはnodeまたはvalueの順序付きlistです。tag名に組み込みのHTML的意味はありません。", codeParts: matraNodeCode("p", { class: "lead" }, ["Hello", 0]) },
      { index: "02 / VALUE", title: "JSON互換の値", text: "valueはstring、有限number、boolean、null、valueのlist、string-keyed mapです。undefined、function、symbol、bigint、非有限number、循環構造は含みません。childの順序とscalarの型は保持されます。", code: '["group", {}, [\n  ["item", {}, ["one"]],\n  ["item", {}, ["two"]]\n]]' },
      { index: "03 / MATRAJSON", title: "交換形式は3要素配列", text: "MatraJSON nodeは[tag, props, children]で表します。children直下でこの形に合う配列はnodeとして読みますが、property valueなどの配列内部をnodeとして再解釈しません。node形式と紛らわしいvalue配列はmapまたは配列で包んで区別します。", codeParts: matraNodeCode("div", { data: [["chart", {}, []]] }, []) },
      { index: "04 / EQUALITY", title: "値と順序を保つ", text: "2つの文書はtag、property key/value、child valueと順序が再帰的に等しいとき等価です。propertyのserialize順序は意味を持ちません。source positionはparser metadataで、等価性と標準MatraJSONには含まれません。", code: null },
      { index: "05 / MATRA独自の提案", title: "文書モーフィオン", text: "モーフィオンはMatra設計者が提唱した独自概念です。文書nodeを「指数から値への有限写像」として捉え、数値指数0をtag、正整数nをchildren[n - 1]、文字列keyをprops[key]に対応させます。ここでの指数は文書構造の位置を示すためのもので、一般に確立した用語や数式の冪演算を意味しません。変換制約を含む正式な定義は一次資料を参照してください。", code: null },
    ],
    enSections: [
      { index: "01 / NODE", title: "A node has tag, props, and children", text: "A document has exactly one root node. Its tag is a string identifying the node; props is a map from string keys to values; children is an ordered list of nodes or values. Tag names have no built-in HTML semantics.", codeParts: matraNodeCode("p", { class: "lead" }, ["Hello", 0]) },
      { index: "02 / VALUE", title: "JSON-compatible values", text: "Values are strings, finite numbers, booleans, null, lists of values, and maps with string keys. They exclude undefined, functions, symbols, bigints, non-finite numbers, and cyclic structures. Child order and scalar types are preserved.", code: '["group", {}, [\n  ["item", {}, ["one"]],\n  ["item", {}, ["two"]]\n]]' },
      { index: "03 / MATRAJSON", title: "A three-element exchange form", text: "A MatraJSON node is [tag, props, children]. A matching array directly under children is read as a node, but arrays nested inside property values are not recursively reinterpreted as nodes. Wrap ambiguous value arrays in a map or another array.", codeParts: matraNodeCode("div", { data: [["chart", {}, []]] }, []) },
      { index: "04 / EQUALITY", title: "Preserve values and order", text: "Documents are equivalent when their tags, property keys and values, child values, and child order are recursively equal. Property serialization order is not significant. Source positions are parser metadata, excluded from equality and standard MatraJSON.", code: null },
      { index: "05 / MATRA'S PROPOSAL", title: "Document Morphion", text: "Morphion is an original concept proposed by Matra's language designer. It models a document node as a finite mapping from exponents to values: numeric exponent 0 identifies the tag, positive integer n identifies children[n - 1], and string key identifies props[key]. Here, exponents are structural addresses—not an established general term or mathematical power operations. See the primary source for the formal definition and conversion constraints.", code: null },
    ],
  },
  {
    path: "ast",
    jaLink: `${spec}/ast.ja.md`,
    enLink: `${spec}/ast.md`,
    jaTitle: "AST — Matra",
    enTitle: "AST — Matra",
    jaDescription: "Matra AST v0.2とData Modelの関係、処理系内のnode表現、MatraJSONとの相互変換。",
    enDescription: "How Matra AST v0.2 relates to the Data Model, represents nodes in tools, and converts to and from MatraJSON.",
    jaEyebrow: "基礎仕様 02 / AST",
    enEyebrow: "FOUNDATION 02 / AST",
    jaHeading: "AST — Data Modelを扱うobject形式。",
    enHeading: "AST — the object form of the Data Model.",
    jaIntro: "AST v0.2は、Data Modelで定義した文書nodeとvalueをvisitor・transformer・rendererが扱うためのメモリ内object表現です。Matra sourceの構文木（MatraModule）とは異なり、Data Modelとは別種の言語値でもありません。MatraJSONとの相互変換で同じ文書構造を保ちます。",
    enIntro: "AST v0.2 is the in-memory object representation that lets visitors, transformers, and renderers work with the document nodes and values defined by the Data Model. It is distinct from the syntax tree for Matra source (MatraModule), and it is not a separate kind of language value. Conversion to and from MatraJSON preserves the same document structure.",
    jaSections: [
      { index: "01 / SHAPE", title: "nodeの形", text: "意味を持つfieldはtag、props、childrenです。propsとchildrenの中身はデータモデルのvalueに従います。実装はsource positionなどのmetadataを追加できますが、意味上の値を変えてはいけません。", code: 'type MatraScalar = string | number | boolean | null\ntype MatraValue =\n  | MatraScalar\n  | MatraValue[]\n  | { [key: string]: MatraValue }\n\ninterface MatraAST {\n  tag: string\n  props: Record<string, MatraValue>\n  children: Array<MatraAST | MatraValue>\n}' },
      { index: "02 / CONVERSION", title: "MatraJSONと相互変換", text: "object形式の{tag, props, children}とMatraJSONの[tag, props, children]は、再帰的かつ情報を失わずに相互変換できなければなりません。tag、value、scalar型、子node、child順序を保ちます。可変list/mapは意図しない共有を避けるためcopyすることが推奨されます。", code: '{ tag: "item", props: {}, children: ["one"] }\n// MatraJSON: ["item", {}, ["one"]]' },
      { index: "03 / SOURCE POSITION", title: "位置情報はmetadata", text: "AST nodeは任意でpositionを持てます。start/end pointのoffsetは0始まり、lineとcolumnは1始まりです。位置情報は文書値の等価性に含まれず、3要素のMatraJSONには出力しません。", code: null },
      { index: "04 / VALIDATION", title: "nodeを検証する", text: "tagがstringでない、propsがstring-keyed value mapでない、childrenがlistでない、またはchildがAST node/valueでない場合、validatorはnodeを拒否します。", code: null },
    ],
    enSections: [
      { index: "01 / SHAPE", title: "Node shape", text: "The semantic fields are tag, props, and children. Values inside props and children follow the data model. Implementations may add metadata such as source positions, but must not change semantic values.", code: 'type MatraScalar = string | number | boolean | null\ntype MatraValue =\n  | MatraScalar\n  | MatraValue[]\n  | { [key: string]: MatraValue }\n\ninterface MatraAST {\n  tag: string\n  props: Record<string, MatraValue>\n  children: Array<MatraAST | MatraValue>\n}' },
      { index: "02 / CONVERSION", title: "Convert to and from MatraJSON", text: "The object form {tag, props, children} and MatraJSON [tag, props, children] must convert recursively without losing information. Preserve tag, values, scalar types, nested nodes, and child order. Copying mutable lists and maps is recommended to avoid accidental sharing.", code: '{ tag: "item", props: {}, children: ["one"] }\n// MatraJSON: ["item", {}, ["one"]]' },
      { index: "03 / SOURCE POSITION", title: "Positions are metadata", text: "An AST node may carry a position. Start/end offsets are zero-based; line and column are one-based. Positions are excluded from document-value equality and omitted from the three-element MatraJSON form.", code: null },
      { index: "04 / VALIDATION", title: "Validate nodes", text: "A validator rejects nodes whose tag is not a string, props is not a string-keyed value map, children is not a list, or child is neither an AST node nor a model value.", code: null },
    ],
  },
  {
    path: "grammar",
    jaLink: `${spec}/grammar.ja.md`,
    enLink: `${spec}/grammar.md`,
    jaTitle: "文法 v0.3 — Matra",
    enTitle: "Grammar v0.3 — Matra",
    jaHeading: "現行source文法。",
    enHeading: "The current source grammar.",
    jaIntro: "文法v0.3は一般のMatra sourceの構文とparse・評価の契約を定義します。旧Core v0.2の構文との互換性は保証されません。ここでは主要な形を説明し、完全な規則・診断・共通fixtureは一次資料に委ねます。",
    enIntro: "Grammar v0.3 defines the syntax and parsing/evaluation contract for general Matra source. Compatibility with old Core v0.2 syntax is not guaranteed. This page introduces the main forms; consult the primary source for complete rules, diagnostics, and shared fixtures.",
    jaSections: [
      { index: "01 / PROGRAM", title: "文と区切り", text: "sourceは宣言や式からなる文の並びです。文は改行またはsemicolonで区切り、閉じbraceやsource末尾の直前では区切りを省略できます。括弧内では改行できますが、括弧外で式を次行へ継続する一般規則はありません。", code: 'let title = "Hello"\nfn label(value) {\n  strong { value }\n}' },
      { index: "02 / NODE", title: "式と文書node", text: "関数・constructor callは任意のvalueを返す式です。文書nodeはtagの後にclass shorthand、括弧内の属性を置き、本文braceでchildを構築します。属性は完全な式を値にでき、同じkeyは後の値で上書きされます。", code: 'article.card#intro(title="Welcome") {\n  h1 { "Hello" }\n  p { "A Matra document." }\n}' },
      { index: "03 / CONTROL", title: "制御式とchild展開", text: "if/else_if/else、for、while、do-untilを使えます。ifは選択したblockの値、forは各反復blockの値のlistを返します。node本文の各式はchildを1つ追加し、...expressionはarrayを一段だけ展開します。nullも値モデル上は保持されます。", code: 'let rows = for (item in ["one", "two"]) {\n  li { item }\n}\nul { ...rows }' },
      { index: "04 / MARKUP", title: "XML-style markup", text: "文書profileではXML-style markupを式として書けます。属性値は引用符付きstringで、本文textと子要素は保持され、標準文字参照は復号されます。Matra式の本文補間は行いません。完全なXML/HTML互換ではなく、終了tagや不正属性などは厳密に拒否します。", code: '<img src="image.png" />\n<p>Hello <strong>Matra</strong>!</p>' },
      { index: "05 / EXPRESSION", title: "式・scope・適用範囲", text: "literal、reference、array/object、member access、call、単項・二項演算、制御式が使えます。blockはlexical scopeを持ち、関数は宣言時scopeを捕捉します。v0.3の文書profileにはmodule import、型推論、複数行string、一般的な後置block call、括弧外の改行継続は含まれません。", code: null },
    ],
    enSections: [
      { index: "01 / PROGRAM", title: "Statements and separators", text: "A source is a sequence of statements such as declarations and expressions. Separate statements with a newline or semicolon; a separator may be omitted before a closing brace or at end of source. Newlines are allowed inside parentheses, but there is no general continuation of expressions outside them.", code: 'let title = "Hello"\nfn label(value) {\n  strong { value }\n}' },
      { index: "02 / NODE", title: "Expressions and document nodes", text: "Function and constructor calls are expressions that can return any value. A document node is a tag followed by optional class shorthand, parenthesized attributes, and a body block containing children. Attribute values may be full expressions; later values replace earlier entries with the same key.", code: 'article.card#intro(title="Welcome") {\n  h1 { "Hello" }\n  p { "A Matra document." }\n}' },
      { index: "03 / CONTROL", title: "Control expressions and child spread", text: "Use if/else_if/else, for, while, and do-until. An if returns the selected block's value; for returns a list of each completed iteration's block value. Each expression in a node body adds one child; ...expression spreads an array one level. null remains part of the value model.", code: 'let rows = for (item in ["one", "two"]) {\n  li { item }\n}\nul { ...rows }' },
      { index: "04 / MARKUP", title: "XML-style markup", text: "The document profile accepts XML-style markup as an expression. Quoted attribute strings, body text, and child elements are retained; standard character references are decoded. Matra expressions are not interpolated into markup text. This is not full XML/HTML compatibility; malformed attributes and closing tags are rejected.", code: '<img src="image.png" />\n<p>Hello <strong>Matra</strong>!</p>' },
      { index: "05 / EXPRESSION", title: "Expressions, scope, and limits", text: "Expressions include literals, references, arrays/objects, member access, calls, unary/binary operators, and control expressions. Blocks have lexical scope; functions capture their declaration scope. The v0.3 document profile excludes module imports, type inference, multiline strings, general trailing-block calls, and line continuation outside parentheses.", code: null },
    ],
  },
  {
    path: "parser",
    jaLink: `${spec}/grammar.ja.md`,
    enLink: `${spec}/grammar.md`,
    jaTitle: "parseと評価 — Matra",
    enTitle: "Parsing and evaluation — Matra",
    jaHeading: "構文木・値・ASTを区別する。",
    enHeading: "Distinguish modules, values, and ASTs.",
    jaIntro: "文法v0.3ではparseと評価は別の操作です。parse結果は構文を保持するMatraModuleであり、単一の文書nodeや評価済みASTではありません。",
    enIntro: "In Grammar v0.3, parsing and evaluation are separate operations. Parsing returns a MatraModule that preserves source structure, not a single document node or an evaluated AST.",
    jaSections: [
      { index: "01 / PARSE", title: "parseはsource全体を読む", text: "parse(source)はsource全体を解析し、宣言・式を保持するMatraModuleを返します。単一root nodeを要求せず、構文エラー時に部分結果を成功値として返しません。構文木と評価済み文書valueは別の段階です。", code: 'const module = parse(source)\n// module is syntax, not the evaluated document AST' },
      { index: "02 / STATIC", title: "evaluateStaticは静的に分かる値だけ", text: "literal、array、object、先行する静的let、およびそれらのみからなるnodeや静的arrayのchild展開は静的に取得できます。未解決reference、member、call、operator、制御式、代入など、実行が必要な式では静的取得エラーになります。暗黙に実行へ切り替わりません。", code: 'const value = evaluateStatic(module)' },
      { index: "03 / EVALUATE", title: "実行はevaluateで明示する", text: "動的な式の値が必要な場合はevaluate(module)を明示して使います。これによりparseが実行と混同されず、静的取得も安全なfallbackとして振る舞います。信頼できないsourceを安全に実行するsandboxを意味するものではありません。", code: 'const result = evaluate(module)\nconst ast = staticValueToAST(result)' },
      { index: "04 / AST", title: "AST変換は評価値から", text: "文書rendererに渡すobject形式ASTは、評価済みvalueをstaticValueToAST()で変換して得ます。MatraModule、runtime value、document ASTは異なる役割です。旧Parser v0.2のsyntaxMode契約は現行v0.3に適用しません。", code: null },
    ],
    enSections: [
      { index: "01 / PARSE", title: "parse reads the entire source", text: "parse(source) parses the whole source and returns a MatraModule containing declarations and expressions. It does not require one root node and never returns a partial result as success after a syntax error. Syntax and evaluated document values are distinct stages.", code: 'const module = parse(source)\n// module is syntax, not the evaluated document AST' },
      { index: "02 / STATIC", title: "evaluateStatic only retrieves static values", text: "Literals, arrays, objects, preceding static lets, nodes built only from these, and child spreads of static arrays can be retrieved statically. Unresolved references, members, calls, operators, control expressions, assignments, and other expressions requiring execution produce a static-evaluation error. There is no implicit execution fallback.", code: 'const value = evaluateStatic(module)' },
      { index: "03 / EVALUATE", title: "Execution is explicit with evaluate", text: "When a dynamic expression must run, call evaluate(module) explicitly. This keeps parsing distinct from execution and prevents static retrieval from behaving like a silent fallback. It does not provide a sandbox for safely running untrusted source.", code: 'const result = evaluate(module)\nconst ast = staticValueToAST(result)' },
      { index: "04 / AST", title: "Convert evaluated values to AST", text: "The object-form AST passed to a document renderer is produced from an evaluated value with staticValueToAST(). MatraModule, runtime value, and document AST have different roles. The old Parser v0.2 syntaxMode contract does not apply to current v0.3.", code: null },
    ],
  },
]

for (const detail of specDetails) {
  const jaRoute = `/spec/${detail.path}/`
  const enRoute = `/en/spec/${detail.path}/`
  pages.push(
    ja(jaRoute, enRoute, withSample({
      ...specCopy("ja"),
      title: detail.jaTitle,
      description: detail.jaDescription ?? detail.jaIntro,
      eyebrow: detail.jaEyebrow ?? "仕様と範囲",
      heading: detail.jaHeading,
      intro: detail.jaIntro,
      specLegend: detail.jaSpecLegend ?? [],
      specLegendLabel: detail.jaSpecLegendLabel ?? "",
      specLegendEnabled: Boolean(detail.jaSpecLegend),
      specSections: detail.jaSections.map(section => ({ ...section, codeParts: section.codeParts ?? null })),
      actions: [{ href: detail.jaLink, label: "完全な仕様書を読む", className: "button primary" }, { href: "/spec/", label: "仕様一覧", className: "button secondary" }],
      noticeTitle: "このページは概要です。",
      notice: "このページは要約です。規範的な定義、全API契約、検証fixtureはリンク先のMatra仕様書を参照してください。",
      noticeLink: detail.jaLink,
      noticeLinkLabel: "一次資料",
    })),
    en(enRoute, jaRoute, withSample({
      ...specCopy("en"),
      title: detail.enTitle,
      description: detail.enDescription ?? detail.enIntro,
      eyebrow: detail.enEyebrow ?? "SPECIFICATIONS AND SCOPE",
      heading: detail.enHeading,
      intro: detail.enIntro,
      specLegend: detail.enSpecLegend ?? [],
      specLegendLabel: detail.enSpecLegendLabel ?? "",
      specLegendEnabled: Boolean(detail.enSpecLegend),
      specSections: detail.enSections.map(section => ({ ...section, codeParts: section.codeParts ?? null })),
      actions: [{ href: detail.enLink, label: "Read the full specification", className: "button primary" }, { href: "/en/spec/", label: "Specifications", className: "button secondary" }],
      noticeTitle: "This page is an overview.",
      notice: "This page is a summary. Refer to the linked Matra specification for normative definitions, complete API contracts, and verification fixtures.",
      noticeLink: detail.enLink,
      noticeLinkLabel: "Primary source",
    })),
  )
}

export default pages.map(pageData => ({
  ...pageData,
  sampleEyebrow: pageData.sampleEyebrow ?? (pageData.lang === "ja" ? "実行例" : "RUNNABLE EXAMPLE"),
  sampleTitle: pageData.sampleTitle ?? (pageData.lang === "ja" ? "書いた文書からHTMLを生成" : "Generate HTML from a document"),
  sampleDescription: pageData.sampleDescription ?? (pageData.lang === "ja"
    ? "この例はwebsite buildで実行し、Matraのrendererで生成したHTMLを表示しています。"
    : "This example runs during the website build and displays the HTML produced by Matra's renderer."),
  featuresEyebrow: pageData.featuresEyebrow ?? (pageData.lang === "ja" ? "できること" : "CAPABILITIES"),
  featuresTitle: pageData.featuresTitle ?? (pageData.lang === "ja" ? "現在の範囲" : "Current scope"),
  noticeEyebrow: pageData.noticeEyebrow ?? (pageData.lang === "ja" ? "注意" : "NOTE"),
}))
