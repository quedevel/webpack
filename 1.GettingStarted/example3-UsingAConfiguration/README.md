# webpack 환경설정 파일 사용
앞서 webpack빌드 실행시 아무런 환경설정 셋팅 없는 기본값으로 실행이 되었습니다.  
이번엔 기본 셋팅파일명인 webpack.config.js를 사용해 빌드를 실행해 봅니다.

webpack.config.js파일을 열어보면 아래와 같은 스크립트가 작성되어 있습니다.
```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    }
}
```
위 환경설정 파일중 webpack이 참조할 엔트리 포인트를 "entry"값으로 제공합니다.  
단일 엔트리일 경우 위와 같이 축약형을 쓸 수 있지만 여러개의 엔트리 포인트가 필요한 경우 배열로 전달 가능합니다.
```javascript
module.exports = {
    entry: ['./src/index.js', './src/index2.js'],
    output: {
        filename: 'bundle.js',
    },
};
```
"output"값으로 설정된 부분중 path는 nodejs의 모둘을 빌려와 windows, linux등의 각 OS 시스템별 위치값을 알아서 해석한 후, 뒤에 "dist"값을 경로로 추가하여 반환해 사용합니다.  
추가로 인자값을 더 넘기는 경우, 각 인자는 하위 폴더로 연결됩니다.

이제 위 환경설정 파일을 이용해 빌드를 합니다.
```
npx webpack --config webpack.config.js
```
index.html파일을 열어 번들링 된 파일이 기존 main.js에서 index.js로 변경되어 페이지가 잘 노출되고 있는지 확인합니다.