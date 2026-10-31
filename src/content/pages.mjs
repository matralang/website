const github = "https://github.com/matralang/matra"
const spec = `${github}/tree/develop/spec`
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
      { index: "01", title: "文書data model", text: "Matra ASTとMorphionの対応規則、値と順序の保持。", links: [{ href: `${spec}/data-model.ja.md`, label: "文書モデル →" }] },
      { index: "02", title: "文法とAPI", text: "v0.3の文法、program API、評価・document ASTへの変換。", links: [{ href: `${spec}/grammar.ja.md`, label: "文法仕様 →" }, { href: `${spec}/literate-modules.ja.md`, label: "literate API →" }] },
      { index: "03", title: "release範囲", text: "P0/P1/P2、検証例、既知の制限とPlayground移行判断。", links: [{ href: `${spec}/release-v0.3.ja.md`, label: "v0.3計画 →" }] },
    ]
  : [
      { index: "01", title: "Document data model", text: "The mapping between the Matra AST and Morphion, including value and order preservation.", links: [{ href: `${spec}/data-model.md`, label: "Document model →" }] },
      { index: "02", title: "Grammar and APIs", text: "The v0.3 grammar, program API, evaluation, and conversion to document AST.", links: [{ href: `${spec}/grammar.md`, label: "Grammar →" }, { href: `${spec}/literate-modules.md`, label: "Literate API →" }] },
      { index: "03", title: "Release scope", text: "P0/P1/P2, verification examples, known limitations, and the Playground migration decision.", links: [{ href: `${spec}/release-v0.3.md`, label: "v0.3 plan →" }] },
    ]

const specCopy = (locale) => locale === "ja"
  ? {
      title: "仕様とv0.3の範囲 — Matra",
      description: "Matra v0.3の文書モデル、言語間接続、出力経路とrelease範囲。",
      eyebrow: "仕様と範囲",
      heading: "実装と検証の範囲を確認する。",
      intro: "v0.3は、文書モデル、既存JavaScriptとの明示的な接続、再現できるHTML/CSS出力を整える実験版です。このwebsiteは現行v0.3の利用者向け入口で、規範的な定義はMatra repositoryの仕様書を参照してください。",
      actions: [{ href: `${spec}/release-v0.3.ja.md`, label: "release計画を読む", className: "button primary" }, { href: "/en/spec/", label: "English", className: "button secondary" }],
      releaseNote: "仕様v0.3、個別npm package version、compiler ABIは別々に管理されます。",
      sampleEyebrow: "優先経路",
      sampleTitle: "文書から、静的HTMLへ",
      sampleDescription: "文書記述 → JavaScriptの値・関数 → 文書AST → HTML/CSSを優先して検証します。",
      featuresEyebrow: "一次資料",
      featuresTitle: "詳細な定義は仕様書へ。",
      cards: specCards(locale),
      noticeEyebrow: "区別すること",
      noticeTitle: "文書Morphionと数式Morphionは別の概念です。",
      notice: "文書Morphionの指数はAST内の位置やproperty keyを示し、数式Morphionの指数は基底に対する冪です。文書からHTMLを出力する例ではMorphion変換を必要としません。",
      noticeLink: `${spec}/data-model.ja.md`,
      noticeLinkLabel: "文書data model",
    }
  : {
      title: "Specifications and v0.3 scope — Matra",
      description: "Matra v0.3 document model, language connections, output path, and release scope.",
      eyebrow: "SPECIFICATIONS AND SCOPE",
      heading: "Know what is implemented and verified.",
      intro: "v0.3 is an experiment to establish a document model, an explicit connection to existing JavaScript, and reproducible HTML/CSS output. This website is a user-facing entry point; refer to the Matra repository for normative definitions.",
      actions: [{ href: `${spec}/release-v0.3.md`, label: "Read the release plan", className: "button primary" }, { href: "/spec/", label: "日本語", className: "button secondary" }],
      releaseNote: "Specification v0.3, individual npm package versions, and compiler ABI are managed separately.",
      sampleEyebrow: "Priority path",
      sampleTitle: "From document to static HTML",
      sampleDescription: "The first verification path is document source → JavaScript values/functions → document AST → HTML/CSS.",
      featuresEyebrow: "Primary sources",
      featuresTitle: "Read the normative documents.",
      cards: specCards(locale),
      noticeEyebrow: "Keep distinct",
      noticeTitle: "Document Morphion and math Morphion are different concepts.",
      notice: "Document Morphion exponents identify AST positions and property keys; math Morphion exponents are powers of bases. HTML generation does not require document Morphion conversion.",
      noticeLink: `${spec}/data-model.md`,
      noticeLinkLabel: "Document data model",
    }

const packageCards = (locale) => locale === "ja"
  ? [
      { index: "01", title: "@matra/core", text: "文法、program評価、文書AST、Morphion変換、browser API、experimental/literate API。v0.3.0。", links: [{ href: `${github}/tree/develop/packages/core`, label: "Core source →" }] },
      { index: "02", title: "@matra/html", text: "文書ASTをHTMLへ変換し、文字列・属性のescapeとbase pathに対応。v0.3.0。", links: [{ href: `${github}/tree/develop/packages/html`, label: "HTML source →" }] },
      { index: "03", title: "別domain package", text: "Graphics・Math・Compute Engineは個別の検証対象です。このsiteの依存として、すべてを公開済み・完成済みとは扱いません。", links: [{ href: `${spec}/release-v0.3.ja.md`, label: "優先度と範囲 →" }] },
    ]
  : [
      { index: "01", title: "@matra/core", text: "Grammar, program evaluation, document AST, Morphion conversion, browser API, and the experimental literate API. v0.3.0.", links: [{ href: `${github}/tree/develop/packages/core`, label: "Core source →" }] },
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
    jaTitle: "文書data model — Matra",
    enTitle: "Document data model — Matra",
    jaHeading: "Matra文書の表現。",
    enHeading: "How Matra documents are represented.",
    jaIntro: "nodeはtag・ordered children・keyed propertiesとして表現されます。v0.3では指数0をtag、正整数をchild位置、文字列をproperty keyに対応させる文書Morphion規則を定義します。",
    enIntro: "A node is represented by a tag, ordered children, and keyed properties. v0.3 defines document Morphion mappings for tag at exponent zero, positive child positions, and string property keys.",
  },
  {
    path: "ast",
    jaLink: `${spec}/ast.ja.md`,
    enLink: `${spec}/ast.md`,
    jaTitle: "文書AST — Matra",
    enTitle: "Document AST — Matra",
    jaHeading: "評価済みの文書node。",
    enHeading: "Evaluated document nodes.",
    jaIntro: "parse()はMatraModuleを返します。静的評価または明示評価を行い、staticValueToAST()でrendererが扱う文書ASTへ変換します。ModuleとASTは異なる型・役割です。",
    enIntro: "parse() returns a MatraModule. After static or explicit evaluation, staticValueToAST() converts the result to the document AST used by renderers. A Module and an AST have distinct types and roles.",
  },
  {
    path: "grammar",
    jaLink: `${spec}/grammar.ja.md`,
    enLink: `${spec}/grammar.md`,
    jaTitle: "文法 — Matra",
    enTitle: "Grammar — Matra",
    jaHeading: "現行v0.3の文書構文。",
    enHeading: "The current v0.3 document syntax.",
    jaIntro: "文書nodeの構築には本文{}を使います。値の式や関数呼び出しは文書構築と区別します。旧parserのparse optionや旧document shorthandはv0.3のAPIとして案内しません。",
    enIntro: "Document nodes are constructed with a body {}. Value expressions and function calls remain distinct from document construction. The old parser options and document shorthand are not presented as v0.3 APIs.",
  },
  {
    path: "parser",
    jaLink: `${spec}/program.ja.md`,
    enLink: `${spec}/program.md`,
    jaTitle: "Program API — Matra",
    enTitle: "Program API — Matra",
    jaHeading: "parseと評価を分ける。",
    enHeading: "Parsing and evaluation are separate.",
    jaIntro: "parse(source)はprogram moduleを返します。evaluateStatic()は静的に取得できる範囲に限定され、実行が必要な式にはEvaluationRequiredErrorを返します。必要な場合のみevaluate()で明示実行します。",
    enIntro: "parse(source) returns a program module. evaluateStatic() is limited to statically retrievable values and throws EvaluationRequiredError for expressions requiring execution. Use evaluate() only when execution is intended.",
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
      actions: [{ href: detail.jaLink, label: "完全な仕様書を読む", className: "button primary" }, { href: "/spec/", label: "v0.3の範囲", className: "button secondary" }],
      noticeTitle: "このページは概要です。",
      notice: "規範的な定義、API、検証契約はMatra repositoryのcurrent specificationを参照してください。",
      noticeLink: detail.jaLink,
      noticeLinkLabel: "一次資料",
    })),
    en(enRoute, jaRoute, withSample({
      ...specCopy("en"),
      title: detail.enTitle,
      heading: detail.enHeading,
      intro: detail.enIntro,
      actions: [{ href: detail.enLink, label: "Read the full specification", className: "button primary" }, { href: "/en/spec/", label: "v0.3 scope", className: "button secondary" }],
      noticeTitle: "This page is an overview.",
      notice: "Refer to the current specification in the Matra repository for normative definitions, APIs, and verification contracts.",
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
