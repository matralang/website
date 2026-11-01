# AGENTS.md

## コマンド

- Node.js: 22または24
- インストール: `npm ci`
- テスト: `npm test`
- ビルド: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- ローカル表示: `npm run serve`（先にbuildが必要）
- buildしてローカル表示: `npm run dev`

## 開発ルール

- 日英のページ・作例・案内は、特別な理由がない限り両言語で整合させる。
- サイトは`src/content/pages.mjs`の日英データ、`src/content/page.matra`の本文、`src/content/site.md`の共通layoutから`@matra/site-generation`で生成する。
- `.matra-site/`、`matra.site.json`、`dist/`は生成物のため直接編集・commitしない。`dist/.matra-site-manifest.json`は削除同期に使うため、通常のbuildで`dist/`全体を削除しない。
- 公開routeを変える場合は日英のnavigation・サイトマップと`test/run.js`の期待route一覧も更新する。
- buildは実験的なNode.js向けliterate APIで文書中のコードを実行する。信頼できるsourceだけをbuild対象にする。
- `@matra/core`と`@matra/html`は公開packageを使う。隣接するmatra checkoutへの依存を追加しない。
- PlaygroundはHTML mode限定である。Workerとiframeを一般的なsecurity sandboxとして説明せず、未対応機能を対応済みと扱わない。
- 変更後は関連するtestを実行し、ページ生成や表示動作を変えた場合は`npm test`と`npm run build`の両方を確認する。

## ドキュメント

- Markdown文書を追加・更新する場合は、既存の文体と構成に合わせる。
- 利用者向けの変更は日本語版・英語版の対応ページも確認する。
