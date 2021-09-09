# source map으로 디버깅 추적하기
여기까지 기본설정부터 loader, 출력에 대해 기초적인 설정 및 구성에 대해 알게되었습니다.  
하지만 우리가 작성한 스크립트 파일이 여러 엔트리에 나누어져 있고, 번들링시 합쳐지기 때문에 이제까지 우리가 하던대로 개발자 도구에서는 해당위치를 찾아가기에 어려움이 생기게 됩니다.  
이때 소스맵을 제공해주게 되면, 개발자도구에서 해당 원본소스로 맵핑이 가능해 집니다.

아래와 같이 webpack.config.js에 소스맵 제공을 위한 옵션을 적용합니다.
```javascript
module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    devtool: 'inline-source-map',
...생략
```
빌드 후 버튼을 클릭하면 alert2 함수를 호출하게 되므로 오류가 발생합니다.  
이때 개발자 console창에는 오류가 발생한 위치가 정확히 표시가 됩니다.  
index.bundle.js을 소스창에서 찾아가는 경우 소스맵도 같이 번들링이 되어 있기때문에,  
Source map detected.라는 메시지를 볼 수 있습니다.  
```
print.js:2 Uncaught ReferenceError: alert2 is not defined
    at HTMLButtonElement.e (print.js:2)
```