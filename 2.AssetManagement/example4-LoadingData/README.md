# Data Loader
개발을 진행하다 보면 JSON, XML, CSV등 다양한 데이터 타입을 가져와 사용해야할 일들이 많습니다.  
이번 로더는 기본지원이 되는 JSON을 제외하고 XML과 CSV를 읽어와 처리하는 로더입니다.  
아래와 같이 로더 규칙을 추가합니다.

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
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
        ],
    },
}
```

가상의 데이터를 파일에서 가져옵니다.  
index.js에서 해당 데이터 모듈을 import후 console.log에 출력되는 예제입니다.  
index.html파일을 열어 번들링이 된것을 확인합니다.