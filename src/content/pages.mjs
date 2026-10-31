const github = "https://github.com/matralang/matra"
const spec = `${github}/blob/develop/spec`
const install = "npm install --save-exact @matra/core@0.3.0 @matra/html@0.3.0"

const locales = {
  ja: {
    lang: "ja",
    otherLang: "en",
    languageLabel: "English",
    navigationLabel: "メインナビゲーション",
    homeUrl: "/",
    navigation: [
      { href: "/about/", label: "Matraとは" },
      { href: "/examples/", label: "作例" },
      { href: "/docs/", label: "ドキュメント" },
    ],
    footerText: "言語を学び、構造でつなぐ。",
    brandLabel: "Matra ホーム",
  },
  en: {
    lang: "en",
    otherLang: "ja",
    languageLabel: "日本語",
    navigationLabel: "Main navigation",
    homeUrl: "/en/",
    navigation: [
      { href: "/en/about/", label: "About" },
      { href: "/en/examples/", label: "Examples" },
      { href: "/en/docs/", label: "Docs" },
    ],
    footerText: "Learn languages. Connect through structure.",
    brandLabel: "Matra home",
  },
}

function page(locale, route, languageRoute, copy) {
  const local = locales[locale]
  return {
    ...local,
    playgroundEnabled: false,
    sampleEnabled: true,
    specSections: null,
    ...copy,
    route,
    languageUrl: languageRoute,
    githubUrl: github,
  }
}

const ja = (route, enRoute, copy) => page("ja", route, enRoute, copy)
const en = (route, jaRoute, copy) => page("en", route, jaRoute, copy)

const homeJa = {
  title: "Matra — 言語を学び、構造でつなぐ",
  description: "Matraは文書・データ・プログラムを共通構造で扱い、他の言語を学んで取り込むことを目指す実験的な構造言語です。",
  eyebrow: "構造で、言語をつなぐ",
  heading: "言語を学び、構造でつなぐ。",
  intro: "Matraは、文書・データ・プログラムを共通の構造で扱うことを目指す構造言語です。マークアップ言語やデータ記述言語、プログラミング言語の境界を越え、既存の言語を理解して取り込む「ラーニング」を中核に据えています。理想としては英語や日本語のような自然言語も置き換えられる記述体系を目指します。現在のv0.3で試せるのは、その一経路である文書からHTMLへの出力です。",
  actions: [
    { href: "/about/", label: "Matraとは", className: "button primary" },
    { href: "/examples/", label: "作例を見る", className: "button secondary" },
  ],
  releaseNote: "Core v0.3.0 / HTML v0.3.0。Node.js向けの実験版です。",
  sampleEyebrow: "現在の実装の一例",
  sampleTitle: "文書からHTMLを生成する",
  sampleDescription: "このサイトのbuildでは、名前付きコードfenceを持つMarkdown文書を実行し、Matra ASTをHTMLへ変換しています。これはMatraが目指す言語間の構造統合のうち、現在検証しているひとつの経路です。",
  featuresEyebrow: "Matraを使う",
  featuresTitle: "ひとつの構造で、表現をつなぐ。",
  cards: [
    { index: "01", title: "文書・データ・プログラムを統合", text: "マークアップ言語、データ記述言語、プログラミング言語を、共通の構造を通して扱うことを目指します。", links: [{ href: "/about/", label: "設計思想 →" }] },
    { index: "02", title: "他の言語を学び、取り込む", text: "既存の言語を理解してMatraの構造へ写し、変換や共有につなぐ「構造的ラーニング」が中核の構想です。", links: [{ href: "/about/", label: "ラーニングとは →" }] },
    { index: "03", title: "自然言語も視野に", text: "理想としては、英語や日本語のような自然言語に置き換わる記述体系も目指します。これは長期的なビジョンで、現在の実装機能ではありません。", links: [{ href: "/spec/", label: "現在の仕様と範囲 →" }] },
  ],
  noticeEyebrow: "開発状況",
  noticeTitle: "思想と、現在の実装範囲を分けて伝えます。",
  notice: "HTML限定のPlaygroundと、Core/HTML v0.3.0でSVG・MathMLを生成する限定デモを提供しています。専用Graphics/Math APIの対応や、汎用sandboxを保証するものではありません。",
  noticeLink: "/play/",
  noticeLinkLabel: "Playgroundの状況",
}

const homeEn = {
  title: "Matra — Learn languages. Connect through structure.",
  description: "Matra is an experimental structural language aiming to bring documents, data, and programs into a shared structure and learn from other languages.",
  eyebrow: "Connect languages through structure",
  heading: "Learn languages. Connect through structure.",
  intro: "Matra aims to handle documents, data, and programs through a shared structure. It crosses the boundaries of markup, data-description, and programming languages, with 'learning'—understanding and incorporating other languages—at its core. Its ideal reaches as far as a notation that could stand in for natural languages such as English and Japanese. In v0.3, the path you can try is narrower: generating HTML from a document.",
  actions: [
    { href: "/en/about/", label: "What is Matra?", className: "button primary" },
    { href: "/en/examples/", label: "See examples", className: "button secondary" },
  ],
  releaseNote: "Core v0.3.0 / HTML v0.3.0, experimental releases for Node.js.",
  sampleEyebrow: "One example of the current implementation",
  sampleTitle: "Generate HTML from a document",
  sampleDescription: "This site's build runs a Markdown document with named code fences, then renders the Matra document value as HTML. It is one path currently being verified toward Matra's broader goal of connecting languages through structure.",
  featuresEyebrow: "Using Matra",
  featuresTitle: "Connect forms of expression through one structure.",
  cards: [
    { index: "01", title: "Unify documents, data, and programs", text: "Matra aims to handle markup, data-description, and programming languages through a shared structure.", links: [{ href: "/en/about/", label: "Design philosophy →" }] },
    { index: "02", title: "Learn from and incorporate other languages", text: "Structural learning—understanding other languages, mapping them into Matra's structure, and enabling transformation and reuse—is central to the vision.", links: [{ href: "/en/about/", label: "About structural learning →" }] },
    { index: "03", title: "Natural languages are also in view", text: "The ideal includes a notation that could stand in for languages such as English and Japanese. This is a long-term vision, not a capability of the current implementation.", links: [{ href: "/en/spec/", label: "Current scope →" }] },
  ],
  noticeEyebrow: "Project status",
  noticeTitle: "The vision and current implementation are distinct.",
  notice: "An HTML-only Playground and focused SVG/MathML demos using Core/HTML v0.3.0 are available. These do not promise dedicated Graphics/Math API support or a general-purpose sandbox.",
  noticeLink: "/en/play/",
  noticeLinkLabel: "Playground status",
}

const aboutJa = {
  title: "Matraとは — Matra",
  description: "Matraが目指す構造言語とラーニングの思想、v0.3で検証している経路、現在の制限について。",
  eyebrow: "MATRAとは",
  heading: "言語を学び、構造でつなぐ。",
  intro: "Matraは、文書・データ・プログラムを共通の構造で扱うことを目指す実験的な構造言語です。既存の言語を理解してMatraの構造へ取り込み、変換や共有につなげる「構造的ラーニング」を設計の軸にしています。理想としては英語や日本語のような自然言語も置き換えられる記述体系を視野に入れています。現在のv0.3は、その一部としてJavaScriptとの接続や文書からHTMLへの出力を検証しています。",
  actions: [
    { href: "/examples/", label: "生成例を見る", className: "button primary" },
    { href: "/docs/", label: "導入する", className: "button secondary" },
  ],
  releaseNote: "v0.3は実験版です。安定した互換性や一般的なsandbox保証を約束しません。",
  sampleEyebrow: "小さな例",
  sampleTitle: "文書の意味を保ってHTMLへ",
  sampleDescription: "Node.js buildでは、Markdown中で入口とJavaScript値を指定し、Matraの実行結果をHTML rendererへ渡します。",
  featuresEyebrow: "設計の考え方",
  featuresTitle: "言語の垣根を、構造で越える。",
  cards: [
    { index: "01", title: "文書・データ・コードを共通構造へ", text: "Matraは文書、JSONのようなデータ、プログラムをひとつの構造で表現し、相互変換できる言語を目指します。", links: [{ href: `${spec}/data-model.ja.md`, label: "現在の文書data model →" }] },
    { index: "02", title: "ラーニングを設計の軸に", text: "「構造的ラーニング」は、他の言語を理解してMatraへ取り込み、その構造を活かす考え方です。現在のv0.3が扱う範囲は限定されています。", links: [{ href: `${spec}/whitepaper-v0.3.ja.md`, label: "v0.3の技術的背景 →" }] },
    { index: "03", title: "自然言語も長期的な視野に", text: "理想としては、英語や日本語のような自然言語に置き換わる記述体系も目指します。これは将来のビジョンであり、現在の機能ではありません。", links: [] },
    { index: "04", title: "現在のv0.3で検証すること", text: "JavaScriptとの値の境界や文書ASTからHTMLへの出力を検証しています。literate APIはNode.js向けの実験版で、汎用sandboxなどは提供しません。", links: [{ href: `${spec}/literate-modules.ja.md`, label: "公開API契約 →" }] },
  ],
  noticeEyebrow: "何を検証するか",
  noticeTitle: "現在の実装を、Matraの全体像と混同しない。",
  notice: "v0.3のHTML出力や限定デモは、構造的ラーニングの思想全体や文書・データ・プログラムの統合が完成したことを示すものではありません。実装済みの範囲と長期的な目標を分けて確認してください。",
  noticeLink: "/spec/",
  noticeLinkLabel: "v0.3の範囲を見る",
}

const aboutEn = {
  title: "What is Matra? — Matra",
  description: "Learn about Matra's structural-language vision and learning philosophy, the path being verified in v0.3, and its current limitations.",
  eyebrow: "ABOUT MATRA",
  heading: "Learn languages. Connect through structure.",
  intro: "Matra is an experimental structural language aiming to handle documents, data, and programs through a shared structure. Its design centers on 'structural learning': understanding other languages, incorporating them into Matra's structure, and enabling transformation and reuse. Its ideal reaches as far as a notation that could stand in for natural languages such as English and Japanese. The current v0.3 verifies only part of this vision, including its connection to JavaScript and generating HTML from documents.",
  actions: [
    { href: "/en/examples/", label: "See generated output", className: "button primary" },
    { href: "/en/docs/", label: "Get started", className: "button secondary" },
  ],
  releaseNote: "v0.3 is experimental. It does not promise stable compatibility or a general-purpose sandbox.",
  sampleEyebrow: "A small example",
  sampleTitle: "Preserve document meaning in HTML",
  sampleDescription: "A Node.js build selects an entry and JavaScript values in Markdown, then sends the Matra result to the HTML renderer.",
  featuresEyebrow: "How the pieces fit",
  featuresTitle: "Cross language boundaries through structure.",
  cards: [
    { index: "01", title: "One structure for documents, data, and code", text: "Matra aims to represent documents, data such as JSON, and programs in a shared structure that can be transformed across forms.", links: [{ href: `${spec}/data-model.md`, label: "Current document data model →" }] },
    { index: "02", title: "Learning as a design principle", text: "'Structural learning' means understanding other languages, incorporating them into Matra, and making use of their structure. The current v0.3 scope is limited.", links: [{ href: `${spec}/whitepaper-v0.3.md`, label: "v0.3 technical background →" }] },
    { index: "03", title: "Natural languages in the long-term vision", text: "The ideal includes a notation that could stand in for natural languages such as English and Japanese. This is a future vision, not a current capability.", links: [] },
    { index: "04", title: "What v0.3 verifies today", text: "It verifies JavaScript value boundaries and rendering document ASTs as HTML. The literate API is experimental and Node.js-only; it is not a general-purpose sandbox.", links: [{ href: `${spec}/literate-modules.md`, label: "Public API contract →" }] },
  ],
  noticeEyebrow: "What is being verified",
  noticeTitle: "Do not confuse today's implementation with the whole vision.",
  notice: "The v0.3 HTML output and focused demos do not mean that structural learning or the unification of documents, data, and programs is complete. Keep the implemented scope distinct from Matra's long-term goals.",
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
    { href: "/examples/#demos", label: "SVG・数式を操作する", className: "button primary" },
    { href: "/docs/", label: "自分の環境で試す", className: "button primary" },
    { href: "/spec/", label: "仕様を読む", className: "button secondary" },
  ],
  releaseNote: "サンプルはwebsite buildで実行されます。コードのJavaScript値を信頼できる環境でのみ実行してください。",
  sampleEyebrow: "実行されるサンプル",
  sampleTitle: "MatraからHTML fragmentを生成",
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
    { href: "/en/examples/#demos", label: "Try SVG and math", className: "button primary" },
    { href: "/en/docs/", label: "Run it locally", className: "button primary" },
    { href: "/en/spec/", label: "Read the scope", className: "button secondary" },
  ],
  releaseNote: "The sample runs during the site build. Execute JavaScript values only in an environment you trust.",
  sampleEyebrow: "Runnable example",
  sampleTitle: "Generate an HTML fragment from Matra",
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
      heading: "使い始めるための入口。",
      intro: "versionを固定した導入手順、buildで実行できる作例、公式仕様へのリンクをまとめています。v0.3の範囲と制限を確認して利用してください。",
      actions: [{ href: "/examples/", label: "実行例を見る", className: "button primary" }, { href: "/spec/", label: "仕様を読む", className: "button secondary" }],
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
      heading: "A clear place to start.",
      intro: "Find the pinned installation steps, a build-executed example, and links to the official specifications. Review the v0.3 scope and limitations before using it.",
      actions: [{ href: "/en/examples/", label: "Run the example", className: "button primary" }, { href: "/en/spec/", label: "Read the specs", className: "button secondary" }],
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
      { index: "01", title: "データモデル", text: "tag・props・childrenで表すnode、JSON互換value、MatraJSONと、Matra設計者が提唱した文書Morphionの考え方。", links: [{ href: "/spec/data-model/", label: "データモデルを読む →" }, { href: `${spec}/data-model.ja.md`, label: "規範的な定義 →" }] },
      { index: "02", title: "AST", text: "visitor・transformer・rendererが使うobject形式と、MatraJSONとの相互変換。", links: [{ href: "/spec/ast/", label: "ASTを読む →" }, { href: `${spec}/ast.ja.md`, label: "規範的な定義 →" }] },
      { index: "03", title: "文法 v0.3", text: "式、node構築、XML-style markup、parseと静的取得の現行仕様。", links: [{ href: "/spec/grammar/", label: "文法を読む →" }, { href: `${spec}/grammar.ja.md`, label: "規範的な定義 →" }] },
      { index: "04", title: "parseと評価", text: "MatraModule、静的取得、明示的な評価の役割を整理します。", links: [{ href: "/spec/parser/", label: "parseと評価を読む →" }, { href: `${spec}/program.ja.md`, label: "Program仕様 →" }] },
      { index: "05", title: "release範囲", text: "検証対象、既知の制限、公開packageのrelease条件。", links: [{ href: `${spec}/release-v0.3.ja.md`, label: "v0.3計画 →" }] },
    ]
  : [
      { index: "01", title: "Data model", text: "Nodes built from tag, props, and children; JSON-compatible values, MatraJSON, and document Morphion, an original concept proposed by Matra's designer.", links: [{ href: "/en/spec/data-model/", label: "Read the data model →" }, { href: `${spec}/data-model.md`, label: "Normative definition →" }] },
      { index: "02", title: "AST", text: "The object-form representation used by visitors, transformers, and renderers, and its lossless conversion to MatraJSON.", links: [{ href: "/en/spec/ast/", label: "Read about the AST →" }, { href: `${spec}/ast.md`, label: "Normative definition →" }] },
      { index: "03", title: "Grammar v0.3", text: "The current rules for expressions, node construction, XML-style markup, parsing, and static retrieval.", links: [{ href: "/en/spec/grammar/", label: "Read the grammar →" }, { href: `${spec}/grammar.md`, label: "Normative definition →" }] },
      { index: "04", title: "Parsing and evaluation", text: "The roles of MatraModule, static retrieval, and explicit evaluation.", links: [{ href: "/en/spec/parser/", label: "Read about parsing →" }, { href: `${spec}/program.md`, label: "Program specification →" }] },
      { index: "05", title: "Release scope", text: "Verification targets, known limitations, and publication conditions for released packages.", links: [{ href: `${spec}/release-v0.3.md`, label: "v0.3 plan →" }] },
    ]

const specCopy = (locale) => locale === "ja"
  ? {
      title: "仕様とv0.3の範囲 — Matra",
      description: "Matraの現行文法v0.3と、基礎となるデータモデル・ASTの仕様。",
      sampleEnabled: false,
      eyebrow: "仕様と範囲",
      heading: "Matraの仕様を読む。",
      intro: "データモデル、AST、文法、parseと評価の役割をまとめます。現行のソース文法はv0.3、データモデルとASTの基礎仕様はv0.2です。構文と評価の定義はv0.3文法仕様を正本とし、旧Parser v0.2の契約は現行仕様として扱いません。",
      actions: [{ href: `${spec}/release-v0.3.ja.md`, label: "release計画を読む", className: "button primary" }, { href: "/en/spec/", label: "English", className: "button secondary" }],
      releaseNote: "仕様v0.3、個別npm package version、compiler ABIは別々に管理されます。",
      sampleEyebrow: "仕様の版と役割",
      sampleTitle: "基礎モデルと現行文法を区別する",
      sampleDescription: "パッケージ版と言語仕様版は独立しています。以下の概要は読みやすさのための案内で、細部の規範的要件は各一次資料を参照してください。",
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
      heading: "Read the Matra specifications.",
      intro: "This section summarizes the data model, AST, grammar, and the roles of parsing and evaluation. The current source grammar is v0.3; the foundational data model and AST specifications are v0.2. The v0.3 grammar is normative for syntax and evaluation; the old Parser v0.2 contract is historical, not current.",
      actions: [{ href: `${spec}/release-v0.3.md`, label: "Read the release plan", className: "button primary" }, { href: "/spec/", label: "日本語", className: "button secondary" }],
      releaseNote: "Specification v0.3, individual npm package versions, and compiler ABI are managed separately.",
      sampleEyebrow: "Specification versions and roles",
      sampleTitle: "Distinguish the foundational model from the current grammar",
      sampleDescription: "Package versions and language specification versions are independent. These summaries are guides; consult each primary source for normative requirements.",
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
  ja("/docs/", "/en/docs/", withSample(docsCopy("ja"))),
  en("/en/docs/", "/docs/", withSample(docsCopy("en"))),
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

const specDetails = [
  {
    path: "data-model",
    jaLink: `${spec}/data-model.ja.md`,
    enLink: `${spec}/data-model.md`,
    jaTitle: "データモデル — Matra",
    enTitle: "Data model — Matra",
    jaHeading: "Matra文書を値として表す。",
    enHeading: "Represent Matra documents as values.",
    jaIntro: "データモデルv0.2は、domainに依存しない文書nodeと値を定義します。現行のソース文法はv0.3で、package versionとは別に管理されます。",
    enIntro: "Data Model v0.2 defines domain-independent document nodes and values. The current source grammar is v0.3; specification and package versions are managed separately.",
    jaSections: [
      { index: "01 / NODE", title: "nodeはtag・props・children", text: "文書はroot nodeをちょうど1つ持ちます。tagはnodeを識別するstring、propsはstring keyからvalueへのmap、childrenはnodeまたはvalueの順序付きlistです。tag名に組み込みのHTML的意味はありません。", code: '["p", {"class": "lead"}, ["Hello", 0]]' },
      { index: "02 / VALUE", title: "JSON互換の値", text: "valueはstring、有限number、boolean、null、valueのlist、string-keyed mapです。undefined、function、symbol、bigint、非有限number、循環構造は含みません。childの順序とscalarの型は保持されます。", code: '["group", {}, [\n  ["item", {}, ["one"]],\n  ["item", {}, ["two"]]\n]]' },
      { index: "03 / MATRAJSON", title: "交換形式は3要素配列", text: "MatraJSON nodeは[tag, props, children]で表します。children直下でこの形に合う配列はnodeとして読みますが、property valueなどの配列内部をnodeとして再解釈しません。node形式と紛らわしいvalue配列はmapまたは配列で包んで区別します。", code: '["div", {"data": [["chart", {}, []]]}, []]' },
      { index: "04 / EQUALITY", title: "値と順序を保つ", text: "2つの文書はtag、property key/value、child valueと順序が再帰的に等しいとき等価です。propertyのserialize順序は意味を持ちません。source positionはparser metadataで、等価性と標準MatraJSONには含まれません。", code: null },
      { index: "05 / MATRA独自の提案", title: "文書モーフィオン", text: "モーフィオンはMatra設計者が提唱した独自概念です。文書nodeを「指数から値への有限写像」として捉え、数値指数0をtag、正整数nをchildren[n - 1]、文字列keyをprops[key]に対応させます。ここでの指数は文書構造の位置を示すためのもので、一般に確立した用語や数式の冪演算を意味しません。変換制約を含む正式な定義は一次資料を参照してください。", code: null },
    ],
    enSections: [
      { index: "01 / NODE", title: "A node has tag, props, and children", text: "A document has exactly one root node. Its tag is a string identifying the node; props is a map from string keys to values; children is an ordered list of nodes or values. Tag names have no built-in HTML semantics.", code: '["p", {"class": "lead"}, ["Hello", 0]]' },
      { index: "02 / VALUE", title: "JSON-compatible values", text: "Values are strings, finite numbers, booleans, null, lists of values, and maps with string keys. They exclude undefined, functions, symbols, bigints, non-finite numbers, and cyclic structures. Child order and scalar types are preserved.", code: '["group", {}, [\n  ["item", {}, ["one"]],\n  ["item", {}, ["two"]]\n]]' },
      { index: "03 / MATRAJSON", title: "A three-element exchange form", text: "A MatraJSON node is [tag, props, children]. A matching array directly under children is read as a node, but arrays nested inside property values are not recursively reinterpreted as nodes. Wrap ambiguous value arrays in a map or another array.", code: '["div", {"data": [["chart", {}, []]]}, []]' },
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
    jaHeading: "処理系が扱うobject形式。",
    enHeading: "The object form used by tools.",
    jaIntro: "AST v0.2はvisitor・transformer・rendererが使うメモリ内node形式です。MatraJSONと同じデータモデルを表し、別種の言語値ではありません。",
    enIntro: "AST v0.2 is the in-memory node form used by visitors, transformers, and renderers. It represents the same data model as MatraJSON; it is not a separate kind of language value.",
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
      heading: detail.jaHeading,
      intro: detail.jaIntro,
      specSections: detail.jaSections,
      actions: [{ href: detail.jaLink, label: "完全な仕様書を読む", className: "button primary" }, { href: "/spec/", label: "仕様一覧", className: "button secondary" }],
      noticeTitle: "このページは概要です。",
      notice: "このページは要約です。規範的な定義、全API契約、検証fixtureはリンク先のMatra仕様書を参照してください。",
      noticeLink: detail.jaLink,
      noticeLinkLabel: "一次資料",
    })),
    en(enRoute, jaRoute, withSample({
      ...specCopy("en"),
      title: detail.enTitle,
      heading: detail.enHeading,
      intro: detail.enIntro,
      specSections: detail.enSections,
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
