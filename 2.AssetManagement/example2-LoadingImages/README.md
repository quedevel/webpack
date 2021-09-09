# Images Loader (Asset Modules)
엔트리에 포함된 이미지파일이나 폰트 등, 웹자원들은 웹팩5에 내장된 에셋모듈로 처리가 가능합니다.
이전 버전의 웹팩에서는 raw-loader, url-loader, file-loader등의 로더로 사용하는게 일반적인 방법입니다.  
에셋모듈과 기존의 로더를 같이 사용할 시 module의 유형을 추가해 중복처리를 방지할 수 있습니다.  
이후 에셋모듈에서 자세히 설명합니다.

```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
}
```
기존의 css loader 규칙아래에 이미지 처리를 위한 규칙을 적용합니다.  
이는 css파일만이 아니라 이미지 파일이 적용되는 모든곳의 이미지 처리를 가능케 합니다.  
이번 예제의 경우 style.css의 배경이미지 처리와 index.js에서 스크립트로 이미지 태그가 추가되며,
해당 이미지 리소스가 웹팩에서 번들링하며 파일명도 청크id로 변경되는것을 확인할 수 있습니다.

index.html파일을 열어 번들링이 된것을 확인합니다.