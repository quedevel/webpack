# HtmlWebpackPlugin 설정
이제까지 실습하면서 결과물 출력 폴더인 dist에는 확인을 위한 index.html이 항상 셋팅되어 있었습니다.  
이젠 html생성 플러그인을 추가하여 index파일도 같이 빌드를 지시하는 실습입니다.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
...생략
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Output Management from Plugin',
        }),
    ],
}
```
엔트리 포인트가 2개로 늘었고, 아웃풋에는 엔트리의 이름값을 받아와 파일명에 적용 할 수 있도록 [name]이 적용되었습니다.  
또한 플러그인이 적용되어 html을 번들링 해 줄수있는 HtmlWebpackPlugin이 추가되었습니다.  
자동으로 index.html내 모든 태그를 자동으로 생성해주며 필요한 옵션들을 붙여줍니다.  
또한, 플러그인 옵션에 적용한 title이 페이지에 적용된것도 확인할 수 있습니다.

output옵션중 [id]나 [hash]등을 사용하면 캐싱되는 오류 등에서 해결될 수는 있지만 번들링되는 dist폴더에는 필요없는 파일이 계속해서 쌓일수가 있습니다.  
해결하기 위한 좋은 옵션이 있습니다.
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
...생략
}
```
clean옵션을 추가로 주게되면 번들링시 기존폴더에 쌓인 불필요한 파일들을 지우고 새로 생성하게됩니다.