# Webアプリを作ってみたい(研修行ってきた)

会社のお金でReact/Reduxの研修に行ってきたのでいろいろと情報をまとめていく。

## そもそもの話

今まで、`create-react-app`でアプリを作ってみていたので、根本がよくわかっていなかった。
まずはそこら辺から。

### jsx

*React*の記法はjavascript+xmlで構成された*Facebook*が作った独自拡張構文。
[JSX](https://facebook.github.io/jsx/)

なので、そのままではブラウザで実行できない。

### babel

トランスパイラと言われるツール。ES2015以降をそれより前の構文に戻してくれるのが主体だが、Facebookが出資していて、JSXのトランスパイルも行うようになっている。
[Babel](https://babeljs.io/)

### webpack

疑問なくファイル分割してたけど、*webpack*のおかげで分割できていた。
importで引っ張ってきてくれてないの？って疑問は残るけど。
[webpack](https://webpack.js.org/)

parcelが出てきたので主流が変わるかも。

### create-react-app

*create-react-app*を使用しない場合、*babel*の設定、*webpack*の設定が必要になる。
*create-react-app*では、*react-script*を使っているっぽい。中身は見れていない。

package.jsonを見ればコマンドが書いてあるので、なんとなく何やってくれてるかはわかるはず。
`start`はデバッグ（多分*webpack-dev-server*が立ち上がってる）、`build`で`webpack -p`相当のことをしてると思う。

## UIComponentについて

UIComponentは

1. クラス型（statefull）
2. 関数型（stateless）

の順番で出来てきた。
関数の方が簡単で早い。
関数型プログラミングが流行ったのもあるかも。
実際は、*state*はreduxで代用できるので、クラス型 or 関数型を決めるのは、
ライフサイクルイベントが必要かどうか？になる。

## Reduxについて

*redux*は*flux*を実装したもの。これはjavascriptに対するライブラリ。
*react-redux*が*React*用の*redux*。
目指すところはタイムマシンデバッグらしい。*redux-dev-tool*を使うと意味がわかる。
*store*の変化をトレースできるようになっている。

*React*としては、UIComponentがツリー構造になっているので、家系図が離れているUIComponentとデータのやり取りをする場合に、ツリーをなんとかしてたどる必要があった。
これに対して、*store*用意して、みんな参照すればいいとなったのが経緯っぽい。

今後は、*React*として、*Context API*が実装されるらしいので、*redux*を使うか？は再考の余地あり。

[ここ](https://techracho.bpsinc.jp/hachi8833/2018_03_13/53183)が参考になるかも。

## npm

```パッケージ情報を取得する
npm info package
```

```バージョン指定で取得する
npm install package@version
```
