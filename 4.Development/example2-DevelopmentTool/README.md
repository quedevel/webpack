# Watch 사용하기
개발을 진행하면서 소스파일을 변경할 때 마다, 계속 터미널에서 소스를 빌드하는 과정은 개발생산성을 저하시키는 이유중 한가지가 될 수 있습니다.  
이에 webpack에서는 watch모드를 지원하여, 개발자가 소스코드를 변경할 시 자동으로 빌드해주는 기능을 담당합니다.

아래와 같이 package.json에서 watch모드를 실행하기 위한 npm 스크립트를 추가합니다.
```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "css-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "style-loader": "^3.2.1",
    "webpack": "^5.48.0",
    "webpack-cli": "^4.7.2"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```
이제까지 npm run build로 webpack을 빌드 후 화면을 변경했지만,  
이번에는 추가된 스크립트를 호출합니다.
```
npm run watch
```
build와 마찬가지로 처음 빌드를 실행하고, webpack이 종료되지 않고 감시모드로 진입합니다.  
이제 버튼을 눌러 오류가 나는 상태를 확인한 후, print.js파일을 수정하여 정상으로 얼럿이 노출되도록 변경합니다.  
터미널을 보고 있었다면 눈치챘을지도 모릅니다. webpack은 이미 소스의 변경을 감지하고 자동으로 빌드를 진행하였습니다.  
하지만 브라우저에서는 새로 변경된 리소스가 활성화 되려면 리프레쉬가 되어야 합니다.  
따로 빌드를 진행하지 않고 브라우저를 새로고침 한 후, 다시 버튼을 눌러 오류가 수정됬음을 확인합니다.

watch모드는 아주 유용하지만, 새로고침 없이 실시간 반영이 화면에도 적용되면 개발생산성을 더 높여 줄 수 있을것입니다.
이번엔 devServer옵션을 사용해 watch모드의 단점을 보안해 보겠습니다.  
감시중인 watch모드는 터미널에서 컨트롤+c로 중지시킵니다.

# dev-server 사용하기
아래와 같이 package.json에서 dev-server를 실행하기 위한 npm 스크립트를 추가합니다.
```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch",
    "start": "webpack serve --open"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "css-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "style-loader": "^3.2.1",
    "webpack": "^5.48.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```
webpack.config.js에서도 dev-server를 위한 옵션을 지정해 줍니다.
```javascript
module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
...생략
```
빌드된 파일이 출력되는 /dist폴더를 서버의 루트로 지정해 두었습니다.  
서버를 기동하기 위해 추가된 스크립트를 호출합니다.
```
npm run start
```
번들링이 완료된후 --open옵션에 의해 브라우저가 자동으로 열리고, 화면이 나옵니다.  
이제 다시 소스를 수정하면 브라우저를 새로고치지 않아도 바로 변경된 사항이 반영되어집니다.  
watch모드와 마찬가지로 터미널에서 컨트롤+c로 중지할 수 있습니다.