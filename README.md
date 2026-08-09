# partners_pfr — FIDIA PARTNERS 就労情報サイト

就労継続支援B型事業所の利用者が、自分のペースで「働き方の選択肢」をのぞくための静かな情報サイトです。

**公開URL:** https://bakabo2st.github.io/partners_pfr/  
**リポジトリ:** https://github.com/bakabo2st/partners_pfr

---

## ローカルで作業を始める

```sh
# クローン
git clone https://github.com/bakabo2st/partners_pfr.git
cd partners_pfr

# 依存関係のインストール（Node.js 22 以上が必要）
npm install

# 開発サーバー起動（http://localhost:4321/partners_pfr/）
npm run dev

# ビルド確認
npm run build
```

> Node.js のバージョンは 22.12.0 以上が必須です（Astro v7 の要件）。  
> `node -v` で確認し、古い場合は [nodejs.org](https://nodejs.org/) からアップデートしてください。

---

## デプロイ

`main` ブランチに push すると GitHub Actions が自動でビルド＆デプロイします。  
手動で再デプロイしたい場合は GitHub の Actions タブから `Deploy to GitHub Pages` を `Run workflow` で起動できます。

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Astro 7.2 (static output) |
| 言語 | TypeScript |
| コンテンツ管理 | Astro Content Collections（`src/content/` の Markdown） |
| スタイル | プレーン CSS（CSS 変数でブランドカラー管理） |
| フォント | Zen Maru Gothic（見出し）+ Zen Kaku Gothic New（本文）|
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions（Node 22） |

---

## ディレクトリ構成

```
src/
  content.config.ts        # コレクションのスキーマ定義（Zod）
  content/
    workStyles/            # 働き方の見本カード（.md）
    accommodations/        # 配慮の例（.md）
    voices/                # 先輩の声（.md）
    guides/                # 働き方の解説（.md）
    columns/               # コラム（.md）
  data/
    jobs.json              # hw_downloader が出力する求人データ（週次更新予定）
  layouts/
    Base.astro             # 共通レイアウト（ヘッダー・フッター・CSS変数）
  components/
    WorkStyleCard.astro    # 働き方カード
    SectionHeader.astro    # セクション見出し（四弁の花モチーフ）
    JobCard.astro          # 求人カード（/jobs ページ用）
  pages/
    index.astro            # トップページ
    jobs.astro             # 求人・外部リンクページ
    guides/[id].astro      # ガイド詳細ページ（動的ルート）
public/
  robots.txt              # クローラー全除外（noindex 運用）
.github/workflows/
  deploy.yml              # GitHub Actions デプロイ設定
```

---

## ページ構成

| URL | 内容 |
|-----|------|
| `/partners_pfr/` | トップ（ヒーロー・働き方の見本・配慮例・求人バナー・読みもの・先輩の声・相談） |
| `/partners_pfr/jobs/` | 週替わり求人・ガイドへのリンク・外部求人サービス |
| `/partners_pfr/guides/kyujinhyo/` | 求人票の見方（ガイド記事） |

---

## コンテンツの追加・編集

コンテンツは `src/content/` 以下の Markdown ファイルを編集するだけです。  
GitHub のブラウザエディタで直接編集 → コミットするとデプロイまで自動で進みます。

### workStyles（働き方の見本）

`src/content/workStyles/` に `.md` ファイルを追加します。

```markdown
---
title: "週3日・データ入力（在宅）"
tags: ["週3日", "在宅", "自分のペース"]
hours: "1日4時間ほど"
days: "週3日"
place: "在宅"            # "在宅" / "通勤" / "どちらも" のいずれか
summary: "やわらかい一言説明"
---
本文（やわらかい語り口で短く）
```

### accommodations（配慮の例）

`src/content/accommodations/` に `.md` ファイルを追加します。

```markdown
---
title: "〇〇の配慮を相談した人がいます"
category: "通院"         # 任意。時間 / 環境 / コミュニケーション / 通院 など
---
本文（「〜してもらった人がいます」「〜を相談していいです」の形で）
```

### voices（先輩の声）

`src/content/voices/` に `.md` ファイルを追加します。

```markdown
---
quote: "短い一言（1〜2文）"
who: "30代・データ入力の仕事"   # 実在の個人が特定されない形に
---
補足（任意・短く）
```

### columns（コラム）

`src/content/columns/` に `.md` ファイルを追加します。

```markdown
---
title: "コラムのタイトル"
kind: "休憩"             # 任意。"休憩" / "通常" など
---
本文（300〜600字目安。答えを出さない短文）
```

### guides（ガイド記事）

`src/content/guides/` に `.md` ファイルを追加します。  
ファイル名が URL のスラッグになります（例: `kyujinhyo.md` → `/guides/kyujinhyo/`）。

```markdown
---
title: "記事タイトル"
---
本文（事実情報を淡々と。励ましすぎない）
```

---

## ブランドカラー（CSS 変数）

```css
--ink:       #483840;   /* メインテキスト。プラム寄りのチャコール */
--rose:      #E0A8A8;   /* アクセント専用。文字色には使わない */
--bg:        #FAF6F4;   /* 背景。温かいオフホワイト */
--rose-tint: #F7EBEB;   /* 淡いローズ。カード背景・区切りに */
--line:      #E8DDDB;   /* 罫線・境界 */
```

**ルール:** `--rose` を文字色に使うとコントラスト不足になるため、必ずアクセント（装飾・罫線・バッジ背景）に限定します。

---

## 求人データの更新（jobs.json）

`src/data/jobs.json` を差し替えると `/jobs/` ページの求人一覧が更新されます。

```json
[
  {
    "job_number": "12345-67890",
    "title": "一般事務（短時間勤務）",
    "company": "○○株式会社",
    "location": "大阪府○○市",
    "employment_type": "パートタイム",
    "hours_text": "9:00〜14:00（休憩30分）",
    "detail_url": "https://...",
    "matched_conditions": "週20時間以内・在宅可",
    "score": 85
  }
]
```

hw_downloader（別リポジトリ）が出力した `jobs.json` を手動またはスクリプトでここにコピーして push します。

---

## 現在のコンテンツ一覧

### workStyles（5件）
| ファイル | タイトル |
|--------|--------|
| jimu-tanki.md | 週4日・1日5時間の事務補助 |
| zaitat-pc.md | 週3日・在宅でのデータ入力 |
| seibi-part.md | 週5日・清掃スタッフ（午前のみ） |
| karui-sagyou.md | 週2日・梱包・仕分け作業 |
| hybrid-jimu.md | 週3日・在宅と出勤を組み合わせた事務 |

### accommodations（3件）
| ファイル | タイトル |
|--------|--------|
| tsuin.md | 通院の日に休めるよう相談した人がいます |
| shomen-shiji.md | 口頭でなく書面で指示してもらっている人がいます |
| gyomu-ryou.md | 業務の量を少しずつ増やしてもらった人がいます |

### columns（2件）
| ファイル | タイトル |
|--------|--------|
| kyukei.md | 休憩は、取っていいものです |
| tameshi.md | 仕事は「試しに始めてみる」ことができます |

### guides（1件）
| ファイル | タイトル |
|--------|--------|
| kyujinhyo.md | 求人票の見方 |

### voices（2件）
| ファイル | 一言 |
|--------|------|
| 30dai-futsuka.md | 週2日から始めて、半年後には週4日になっていました。 |
| zaitat-hajime.md | 在宅で始めたら、通勤のことを気にしなくてよくなって、少し楽になりました。 |

---

## 今後の予定

- [ ] hw_downloader → jobs.json の週次更新スクリプト（別リポジトリ連携）
- [ ] guides 追加（「障害者雇用とは」「オープン・クローズって？」など）
- [ ] voices 追加（利用者の実際の声、本人同意のうえで）
- [ ] Git連携CMS の導入検討（Sveltia CMS / Decap CMS）
- [ ] アクセス解析の導入（Cloudflare Web Analytics または GoatCounter）
- [ ] ロゴ画像（`public/logo.png`）の配置

---

## 設計上の禁止事項（意図的に入れないもの）

- ログイン・会員登録・ユーザー識別
- 個人を追跡するトラッキング（Cookie, プロファイリング）
- ランキング・閲覧数・「人気の」表示
- 「今すぐ応募」「残りわずか」などの煽り
- 健康・医療情報（睡眠・服薬・ストレッチなど）
- 内省ワーク（診断・気持ちを書かせるなど）
- 派手なアニメーション・自動再生・点滅・音

詳細は `CLAUDE.md` を参照してください。
