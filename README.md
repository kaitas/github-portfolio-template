# GitHub Portfolio Template

**作品を並べて公開するだけの、いちばん小さいポートフォリオ。**

ターミナルもコマンドも使いません。**ブラウザだけで完結します。**
プログラミングの経験がなくても、30分で自分の作品集が公開できます。

生成AIで作った作品を並べる前提で作ってありますが、写真でも絵でも構いません。

大学・授業の GitHub Organization で、教員がテンプレートを配布し、学生が各自の
リポジトリから GitHub Pages を公開する使い方に対応しています。

---

## 手順

### 1. 自分のリポジトリを作る

このページの上にある緑色の **「Use this template」** → **「Create a new repository」**。

- リポジトリ名は何でも構いません（例: `my-portfolio`）
- 授業から Organization 名を指定されている場合は、**Owner** でその Organization を選びます
- 公開範囲は授業の指示に従ってください。指示がなければ **Public** を選びます

> Organization にリポジトリを作れない場合は、教員・管理者に作成権限を確認してください。
> 個人アカウントに作る場合は、Owner を自分のユーザー名にします。

### 2. 公開を有効にする

作ったリポジトリで **Settings** → 左メニューの **Pages**。

- **Source** を **GitHub Actions** に変更

これで公開の準備ができました。

Organization の設定によっては、最初の実行に教員・管理者の承認が必要です。
また、Settings → Actions → General → Workflow permissions が制限されている場合も、
管理者に確認してください。

### 3. 中身を書き換える

`index.html` を開いて、鉛筆マーク（✏️）を押すと編集できます。

```html
<!-- ▼ ここから書き換えます -->
<h1>あなたの名前</h1>
...
<!-- ▲ ここまで -->
```

この目印の間だけ書き換えれば大丈夫です。
書き換えたら、下の **Commit changes** を押します。

### 4. 作品の画像を入れる

`images` フォルダを開いて **Add file** → **Upload files**。

画像をドラッグして **Commit changes**。

ファイル名は `work-01.png` のように、`index.html` に書いた名前と合わせてください。

### 5. 作品を増やす

`index.html` の中の、この部分をまるごとコピーして貼り付けます。

```html
<figure class="work">
  ...
</figure>
```

貼り付けたら、タイトル・画像ファイル名・説明を書き換えます。

### 6. 公開URLを確認する

1〜2分待つと、ここに公開されます。

```
https://<Owner名>.github.io/<リポジトリ名>/
```

Organization に作った場合の Owner 名は Organization 名です。
たとえば `example-university` Organization の `my-portfolio` なら、
`https://example-university.github.io/my-portfolio/` です。

Actions の実行結果を開くと、ワークフローがOwnerを自動判定し、**Summary** に
「Organizationまたは個人アカウント」と公開URLを表示します。

**このURLを提出します。** リポジトリのURLではありません。

---

## うまくいかないとき

| 症状 | 見るところ |
|---|---|
| ページが出ない（404） | Settings → Pages の Source が **GitHub Actions** になっているか |
| 変更が反映されない | 1〜2分待つ。それでも出なければ Actions タブで失敗していないか |
| 画像が出ない | ファイル名が `index.html` の記述と一致しているか（大文字小文字も区別されます） |
| Actionsを実行できない | Organization の教員・管理者に、Actions と Pages の利用が許可されているか確認 |

Actions タブに赤い✗が出ていたら、クリックすると理由が読めます。

---

## 教員・Organization 管理者向け

授業で配布する前に、次を設定してください。

1. リポジトリの **Settings** → **General** → **Template repository** を有効にする
2. Organization の **Settings** → **Actions** で GitHub Actions の利用を許可する
3. Organization のポリシーで、学生が授業用リポジトリを作成できるようにする
4. 学生に Owner（Organization名）、リポジトリ名、公開範囲、提出期限を指定する
5. テスト用リポジトリをテンプレートから1つ作り、Pages公開まで確認する

このテンプレートのワークフローはビルドを行わず、`main` ブランチのファイルをそのまま
Pagesへ公開します。テンプレート文言や画像不足は警告しますが、締切直前の公開を妨げないよう
デプロイ自体は止めません。

ワークフローでは `github.event.repository.owner.type` からOwner種別を取得します。
Organization名を設定ファイルへ直書きする必要はなく、テンプレートから作られた各リポジトリで
自動的に判定されます。判定結果と公開URLはActionsのSummaryで確認できます。

GitHub Classroomを使う場合は、このリポジトリを課題のスターターコードとして指定できます。
Classroomで作成された学生リポジトリでも、各リポジトリの Pages と Actions がOrganizationの
ポリシーで許可されている必要があります。

---

## AI に手伝ってもらう

このリポジトリには [`AGENTS.md`](AGENTS.md) があります。
Claude Code などに作業を頼むと、そこに書いた前提を読んでから作業します。

頼み方の例:

```
index.html の作品を1つ増やしてください。
タイトルは「夜の図書館」、第3回の作品です。
画像は images/work-03.png です。
```

---

## 忘れずに

フッターに**生成AIを使った旨の記載**を入れてあります。
生成AIを使っていない場合は消して構いませんが、**使った場合は残すことを勧めます。**

各作品の「使ったプロンプト」も同じです。
作品だけでは「意図して作った1枚」と「何度も試した中の当たり」を区別できません。
プロンプトがその区別の根拠になります。

制作の過程を残しておくと、あとで自分を守る材料になります。


---

## ライセンス

MIT License. 自由に使ってください。クレジットも不要です。

改変して自分のテンプレートにするのも歓迎です。

---

## AIと一緒に編集したい人へ（オプション）

このテンプレートには [OpenCode](https://opencode.ai/ja) の設定ファイル `opencode.json` が入っています。
リポジトリを手元に clone して、[api.aicu.ai のダッシュボード](https://api.aicu.ai/dashboard/keys)で発行した
API キーを環境変数に入れるだけで、AIコーディングエージェントに編集を頼めます。

```bash
export AICU_API_KEY=aicu_live_xxx   # 自分のキーに置き換え
opencode                            # 起動して /models → aicu/kimi-k2.7-code
```

キーは環境変数から読む設計なので、**このファイルに書き込む必要はありません**
（書かないでください。公開リポジトリに載ります）。
使い方の詳細: [api.aicu.ai/docs/ja](https://api.aicu.ai/docs/ja/)
