# Webアプリを作ってみたい(環境構築)

騙し騙し仕事してきたけど珍しく勉強してみようと思ったので、Webアプリを作ってみる

## 環境

macOS 10.13.1 (17B1003)

## やりたいこと

聞いたことあるからReactを触ってみる。
どんなアプリにするかは決めてない。

## 環境構築していく

###node

- nodebrew
  - nodeのバージョン管理してくれるやつ。homebrewで入れる

```bash
brew install nodebrew
nodebrew -v
```

- node 8.9.3(LTSの新しいやつ)を使う

```bash
nodebrew ls-remote
nodebrew install 8.9.3
nodebrew list
nodebrew use 8.9.3
node -v
npm -v
```

- npmをupdate

```bash
npm install -g npm
```

- yarnを入れる

```bash
npm install -g yarn
```

- reactのテンプレートを作成

```bash
npx create-react-app sample-app
```

- 起動してみる

```bash
cd sample-app
yarn start
```

ブラウザが立ち上がって、Reactロゴが表示されれば成功。

## VSCode

デバッグできるのがVSCodeとWebStormだけらしい。atomでも出来そうだけど。

### ブラウザでデバッグ

- `Debugger for chrome`をinstall
- launch.jsonをcreate-react-appのREADMEと同じように変更
- コンソールからサーバーをスタートさせる
- VSCodeでデバッグ開始

### テストをデバッグ

- launch.jsonに以下のような構成を追加

```json:launch.json
        {
            "name": "Debug CRA Tests",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "${workspaceRoot}/node_modules/react-scripts/bin/react-scripts.js",
            "args": [
              "test",
              "--runInBand",
              "--no-cache",
              "--env=jsdom"
            ],
            "cwd": "${workspaceRoot}",
            "protocol": "inspector",
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        },

```

## lint

セミコロンが嫌いなので、starndardにする。
create-react-appのREADMEに載っている`react-app`だとエラーがでなさ過ぎる。
create-react-appが何に準拠してるかよくわからない。（airbnb?）

- プロジェクトルートに`.eslintrc`を用意

```.eslintrc
{
  "extends": "standard"
}
```

- eslintをかけながら必要なnode_moduleを入れていく

```bash
./node_module/.bin/eslint .
```

今回必要だったもの

```bash
yarn add eslint-config-standard
yarn add eslint-plugin-node
yarn add eslint-plugin-promise
yarn add eslint-plugin-standard
```

- errorが出力されればOK
- エラーをとる

```bash
./node_module/.bin/eslint --fix .
```

これでセミコロンとか文法系のエラーが取れるはず。
あとは設定の問題

### 'React' is defined but never used

Reactを認識してないから出るエラー。
以下を`.eslintrc`に追加。

```.eslintrc
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-uses-react": 2
  }

```

### 'App' is defined but never used

これもReactがらみ。独自タグを認識できていない。

```.eslintrc
  "plugins": [
    "react"
  ],
  "rules": {
+  "react/jsx-uses-vars": 2,
   "react/jsx-uses-react": 2
  }

```

### 'it' is not defined

jestが認識できていない。
以下を追加。

```.eslintrc
  "env": {
    "jest": true
  },
```

### 'URL' is not defined と 'fetch' is not defined

browser?

```.eslintrc
  "env": {
+   "browser": true,
    "jest": true
  },

```

### 最終的に

```.eslintrc
{
  "extends": "standard",
  "plugins": [
    "react",
  ],
  "env": {
    "browser": true,
    "jest": true
  },
  "rules": {
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2
  }
}

```

### VScodeでもlint

- `ESLint`をinstall
- 設定から`eslint.autoFixOnSave`をtrueにする。
