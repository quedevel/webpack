# HMR
webpack에서 제공되는 유용한 개발기능입니다.  
물론 이전에 살펴보았던 webpack-dev-server만으로도 실시간 새로고침같은 유용한 기능으로 수정이 가능하지만, HMR 기능은 전체 빌드가 아닌 수정된 부분만의 업데이트를 지원합니다.  
단순히, devServer의 옵션만 추가해주면 설정이 완료됩니다.
```javascript
module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
...생략
```
프로그램이 무거울수록, 효과적인 방법입니다.  
물론 무조건 수정한 부분만 교체되는것은 아니며, 의존성등을 체크하여 교체가 필요한 부분부터 업데이트를 실행합니다.  
```
npm run start
```
