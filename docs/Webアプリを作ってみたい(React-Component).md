# Webアプリを作ってみたい(React-Component)

Reactをいじる環境ができたので、Componentをいじってみる。

## ディレクトリ構成

[ここ](https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d)の構成がしっくりきたので、真似してみる。（英語読めないけど）

`./src/components/component_name/index.js,style.css and resources`

みたいな形にする。

### mainみたいなのは？

これがroutingする名前と一緒になる？のであれば、src直下でもいいのか？
使い回す気は無いので、とりあえずsrc直下に置いとく。

## 単純なボタンをComponentとして追加する

```./src/components/BlueButton/index.js
import React, {Component} from 'react'
import './style.css'

class BlueButton extends Component {
  render () {
    return (
      <button type="button">Blue</button>
    )
  }
}

export default BlueButton
```

```./src/components/BlueButton/style.css
button {
    background-color: blue;
}
```

## 表示するためにAppにBlueButtonを追加する

```./src/components/App/index.js

// ...

import BlueButton from '../BlueButton'

// ...

   <BlueButton />

```

青いボタンが表示される。
importする対象をディレクトリにすると、配下のindex.jsをみてくれるっぽい。

## もう一つボタンを追加してみる

```./src/components/RedButton/index.js
import React, {Component} from 'react'
import './style.css'

class RedButton extends Component {
  render () {
    return (
      <button type="button">Red</button>
    )
  }
}

export default RedButton
```

```./src/components/RedButton/style.css
button {
    background-color: red;
}
```

## 表示するためにAppにRedButtonを追加する

```./src/components/App/index.js

// ...

import BlueButton from '../BlueButton'
import RedButton from '../RedButton'

// ...

   <BlueButton />
   <RedButton />

```

青と赤のボタンが表示される。
と思ったけどダメ:cry:
両方とも赤になる。

問題はcssにある。それぞれの.jsでimportすれば個別にstyleとして展開されないかなと思ったがそう上手くはいかないらしい。
単純にcssの仕様を理解していないだけかも知れないけどちょっと残念。

cssのセレクタを`button`から`.RedButton`,`.BlueButton`としてcssが適用されるようにclassNameをそれぞれ設定する。

```./src/components/BlueButton/index.js
import React, {Component} from 'react'
import './style.css'

class BlueButton extends Component {
  render () {
    return (
      <button className="BlueButton" type="button">Blue</button>
    )
  }
}

export default BlueButton
```

```./src/components/BlueButton/style.css
.BlueButton {
    background-color: blue;
}
```

```./src/components/RedButton/index.js
import React, {Component} from 'react'
import './style.css'

class RedButton extends Component {
  render () {
    return (
      <button className="RedButton" type="button">Red</button>
    )
  }
}

export default RedButton
```

```./src/components/RedButton/style.css
.RedButton {
    background-color: red;
}
```

これでいける。

## 複数個出したいとき

```./src/components/Number/index.js
import React, {Component} from 'react'

class Number extends Component {
  render () {
    return (
        <p>0</p>
        <p>1</p>
    )
  }
}

export default Number
```

これで0,1が表示されて欲しいけど・・・ダメ。
jsxでreturnできるのは１つの要素だけ（子はいくつでもいい）
なので、`<div>`で囲む必要がある。

```./src/components/Number/index.js
import React, {Component} from 'react'

class Number extends Component {
  render () {
    return (
      <div>
        <p>0</p>
        <p>1</p>
      </div>
    )
  }
}

export default Number
```

これで表示される。

## 違うんすよ。繰り返しで可変個数表示したいんですよ

テンプレートエンジンであれば、ループが書けるけどReactだとどうするの？ってこと。

```./src/components/Number/index.js
import React, {Component} from 'react'

class Number extends Component {
  render () {
    return (
      <div>
        for (let i = 0; i < 2; i++ ) {
          <p>{i}</p>
        }
      </div>
    )
  }
}

export default Number
```

みたいなことがしたい。(上はNG)

listに突っ込めばいけるらしい。

```./src/components/Number/index.js
import React, {Component} from 'react'

class Number extends Component {
  getNumbers () {
    let numbers = []
    for (let i = 0; i < 2; i++) {
      numbers.push(<p>{i}</p>)
    }
    return numbers
  }
  render () {
    return (
      <div>
        {this.getNumbers()}
      </div>
    )
  }
}

export default Number
```

_getNumbers()_でlistに`<p>`の要素をpushして返す。
`{}`で囲まれている部分は式展開される。

ちなみに、文字として`{}`が使いたいときは、

```jsx
{` {aaa} `}
```

みたいにすればいい。

## いやいや、指定回数追加したいんですけど

プロパティ指定でループ回数が決まるようにする。

```./src/components/Number/index.js
import React, {Component} from 'react'

class Number extends Component {
  getNumbers () {
    let numbers = []
    for (let i = 0; i < this.props.count; i++) {
      numbers.push(<p>{i}</p>)
    }
    return numbers
  }
  render () {
    return (
      <div>
        {this.getNumbers()}
      </div>
    )
  }
}

export default Number
```

```./src/components/App/index.js
// ...

    <Number count="3"/>

// ...
```

`this.props.count`でcount属性の値が取得できる。
多分count部分はなんでもよくて、勝手に属性になる。

## 気まぐれでtestしたらwarning出たんですけど

Warning: Each child in an array or iterator should have a unique "key" prop.

と言われる。

[ここを参照](https://qiita.com/koba04/items/a4d23245d246c53cd49d)して直す。

```./src/components/Number/index.js
import React, {Component} from 'react'

class Number extends Component {
  getNumbers () {
    let numbers = []
    for (let i = 0; i < this.props.count; i++) {
      numbers.push(<p key={i}>{i}</p>)
    }
    return numbers
  }
  render () {
    return (
      <div>
        {this.getNumbers()}
      </div>
    )
  }
}

export default Number
```