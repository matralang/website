# Matra Website

Matraの公式サイトです。現在はGitHub Pagesでpreviewし、最終的に
`https://matralang.org` をcanonical domainとして運用します。

## Development

```sh
npm install
npm run build
npm run serve
```

## Information architecture

| Primary URL | Purpose | Future subdomain |
| --- | --- | --- |
| `/` | 公式トップ・入口 | `matralang.org` |
| `/docs/` | ドキュメント入口 | `docs.matralang.org` |
| `/spec/` | 言語仕様 | `docs.matralang.org/spec/` |
| `/play/` | Playground | `play.matralang.org` |
| `/examples/` | 作例 | — |
| `/packages/` | パッケージ一覧 | `api.matralang.org` |
| `/blog/` | 開発記録 | `blog.matralang.org` |

ページは`src/pages`、共通レイアウトは`src/layouts`、スタイルは`src/styles`に置きます。
GitHub Pagesのproject pathはworkflowから`SITE_BASE_PATH`として自動設定されます。
