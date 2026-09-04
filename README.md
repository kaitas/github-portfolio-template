# はじめてのポートフォリオを公開する

作品を並べた自分のWebサイトを、GitHub Pagesで無料公開するためのテンプレートです。
プログラミング、HTML、ターミナルが分からなくても、ブラウザだけで始められます。

## 最初に選ぶ

### A. 何を書けばよいか分からない

**ウィザードを使ってください。** 質問に答えると、自己紹介、作品、リンク、色を入れた
`index.html`ができます。入力内容は外部へ送信されません。

→ [ウィザードを使う手順](#a-ウィザードを使う)

### B. 自分の内容とデザインで作りたい

**ウィザードを使う必要はありません。** `index.html`と`style.css`を直接編集してください。
公開に必要なのは基本的にこの2ファイルと`images`フォルダだけです。

→ [自分でHTMLを編集する手順](#b-自分でhtmlを編集する)

### C. AIコーディングアシスタントと作りたい

AIに「作品を追加して」「色を変えて」と頼めます。初めて使う人向けの説明と、そのまま使える
依頼文を[`AGENTS.md`](AGENTS.md)に用意しています。

→ [AIと編集する手順](#c-aiコーディングアシスタントと編集する)

完成形の参考として、制作者のポートフォリオも見られます。

- 公開サイト: https://kaitas.github.io/
- GitHub上のファイル: https://github.com/kaitas/kaitas.github.io

これは長年育てたサイトなので、最初から同じ量を用意する必要はありません。作品1点と短い自己紹介だけで十分です。

---

## 先に自分のリポジトリを作る

「リポジトリ」は、このサイトのファイルを置くGitHub上のフォルダです。

1. このGitHubページ上部の緑色の **Use this template** を押す
2. **Create a new repository** を押す
3. **Owner**を選ぶ
4. **Repository name**に`my-portfolio`など半角英数字の名前を入れる
5. 授業の指示がなければ**Public**を選ぶ
6. **Create repository**を押す

授業からOrganization名を指定されている場合は、OwnerでそのOrganizationを選びます。
選べない場合は、教員またはOrganization管理者に確認してください。

> **公開してはいけない情報**
> 本名、学籍番号、住所、電話番号、学校のメールアドレス、APIキー、パスワードは載せないでください。
> 表示名には活動名、ハンドルネーム、イニシャルを使えます。

## GitHub Pagesを有効にする

1. 自分のリポジトリ上部の **Settings** を押す
2. 左側の **Pages** を押す
3. **Build and deployment**の**Source**で **GitHub Actions** を選ぶ
4. 上部の **Actions** を押し、`pages`が完了するまで1〜2分待つ

緑色のチェックが付けば公開されています。公開URLは次の形です。

```text
https://<Owner名>.github.io/<リポジトリ名>/
```

例: Ownerが`example-university`、リポジトリ名が`my-portfolio`の場合

```text
https://example-university.github.io/my-portfolio/
```

Actionsの実行結果にある**Summary**にも、判定されたOwnerと公開URLが表示されます。

---

## A. ウィザードを使う

### 1. ウィザードを開く

公開URLの最後に`wizard.html`を付けます。

```text
https://<Owner名>.github.io/<リポジトリ名>/wizard.html
```

### 2. 質問に答える

次の内容を順番に選びます。

1. 活動名と肩書き
2. 興味、得意なこと、将来やりたいこと
3. 作品のタイトル、画像、説明
4. GitHub、YouTubeなどの公開用リンク
5. スタイルと色
6. 生成AI利用の表示、RSL、公開前の確認

画像は`images/work-01.png`のような名前で指定します。画像そのものは後からGitHubへ入れます。

### 3. 2つのファイルを保存する

- **完成した index.html を保存**: 公開ページ本体です
- **編集用 portfolio.json を保存**: 後日ウィザードへ読み込み、続きを編集するための控えです

`portfolio.json`だけではWebサイトになりません。公開には`index.html`を使います。

### RSLについて

RSLは、サイトの内容をAIがどのように利用できるかを機械向けに示す設定です。
このテンプレートの現在の設定は**AI学習を無料で許可する**です。

- 設定ファイル: [`rsl.xml`](rsl.xml)
- AI向けのファイル案内: [`robots.txt`](robots.txt)
- ウィザードで作るHTMLには`rsl.xml`への案内と、画面上の説明が入ります

ウィザードで「AIによる利用を許可しない」を選ぶと、生成するHTMLからRSL宣言を外します。
その場合は公開リポジトリの`rsl.xml`と`robots.txt`も削除し、許可する宣言を残さないでください。

### 4. 完成したindex.htmlをGitHubへ入れる

1. 自分のリポジトリで **Add file** → **Upload files** を押す
2. 保存した`index.html`を選ぶ
3. 同名ファイルを置き換える確認が出たら進む
4. **Commit changes**を押す
5. Actionsが終わるまで1〜2分待つ

「Commit」は、変更内容をGitHubへ保存する操作です。

### 5. 作品画像を入れる

1. リポジトリの`images`フォルダを押す
2. **Add file** → **Upload files**を押す
3. `work-01.png`などの画像を選ぶ
4. **Commit changes**を押す

画像名はウィザードへ入力した名前と完全に一致させます。大文字と小文字も区別されます。

### 6. 後から直す

`wizard.html`を開き、最後の画面にある**portfolio.jsonを読み込んで再編集**を選びます。
前回保存した`portfolio.json`を読み込み、直した`index.html`を再びGitHubへ入れます。

---

## B. 自分でHTMLを編集する

ウィザードのファイルは削除して構いません。次だけ残せば公開できます。

```text
index.html    ページの内容
style.css     色やレイアウト
images/       作品画像
```

削除してよいウィザード用ファイル:

```text
wizard.html
wizard.js
```

### GitHub上で文章を直す

1. `index.html`を押す
2. 右上の鉛筆マークを押す
3. `<!-- ▼ ここから書き換えます -->`と`<!-- ▲ ここまで -->`の間を直す
4. **Commit changes**を押す

### 作品を増やす

`index.html`の次のまとまりを、`</figure>`まで丸ごとコピーして貼ります。

```html
<figure class="work">
  ...
</figure>
```

コピーした部分の画像名、タイトル、年、説明を書き換えます。

### 色を変える

`style.css`の最初にある3色を書き換えます。

```css
--accent: #0b7285;
--bg: #ffffff;
--text: #1a1a2e;
```

---

## C. AIコーディングアシスタントと編集する

AIコーディングアシスタントは、同じフォルダのファイルを読み、依頼に合わせて編集するAIです。
このリポジトリでは[`AGENTS.md`](AGENTS.md)が、AIに守ってほしいルールを伝えます。

初めての場合は、AIへ次の文章をそのまま送ってください。

```text
このリポジトリのAGENTS.mdを先に読んでください。
私はGitHubとHTMLの初心者です。
分からないことは一度に1つだけ質問し、変更後は何をしたか簡単に説明してください。
まず、私のポートフォリオを作るために必要なことを質問してください。
```

作品画像を`images`へ入れた後なら、次のように頼めます。

```text
index.htmlに作品を1つ追加してください。
タイトルは「夜の図書館」、制作年は2026年です。
画像はimages/work-01.pngです。
説明は「静かな空間に残る人の気配を3DCGで表現しました」です。
```

OpenCodeを使う場合は`opencode.json`が利用できます。APIキーはファイルへ書かず、環境変数に設定します。

```bash
export AICU_API_KEY=aicu_live_xxx
opencode
```

- APIキー発行: https://api.aicu.ai/dashboard/keys
- 利用方法: https://api.aicu.ai/docs/ja/

---

## うまくいかないとき

| 症状 | 確認すること |
|---|---|
| 公開URLが404になる | Settings → Pages → Sourceが**GitHub Actions**か |
| 変更が反映されない | Actionsの`pages`が終わるまで1〜2分待ったか |
| Actionsが赤い印になる | その実行を開き、赤い行のメッセージを読む |
| 画像が表示されない | `images`内の名前とHTMLの名前が完全に同じか |
| Organizationで実行できない | 教員・管理者にActionsとPagesが許可されているか確認 |
| ウィザードで続きを開けない | 前回保存した`portfolio.json`を選んでいるか |

GitHubのリポジトリURLと、完成したWebサイトのURLは別です。提出時は通常、`.github.io`を含む
**公開URL**を提出します。

## 公開前に確認する

- 本名や学籍番号など、公開不要な個人情報がない
- SNSは公開用アカウントである
- 写真の位置情報や、背景に写った住所・名札を確認した
- 他人の顔、音楽、画像、キャラクターを公開してよい
- 自分の担当範囲と使用ツールが分かる
- 生成AIを使った作品では、その事実と必要な制作記録を残した

このテンプレートには生成AI利用の表示と、各作品のプロンプトを記録する欄があります。
制作過程を残すことは、作品が自分の意図と試行によって作られたことを説明する助けになります。

---

## 教員・Organization管理者向け

授業で配布する前に次を確認してください。

1. Settings → General → **Template repository**を有効にする
2. OrganizationのSettings → ActionsでGitHub Actionsを許可する
3. 学生が授業用リポジトリを作成できるようにする
4. Owner、リポジトリ名、公開範囲、提出期限を学生へ指定する
5. テスト用リポジトリを作り、Pages公開とウィザードのHTTPS動作を確認する

GitHub Classroomでは、このリポジトリを課題のスターターコードとして指定できます。
ワークフローはビルドを行わず、`main`のファイルをそのまま公開します。テンプレート文言や画像不足は
警告しますが、締切直前の公開を妨げないようデプロイは止めません。

## ライセンス

MIT Licenseです。授業や個人制作で自由に改変できます。クレジット表記は不要です。
