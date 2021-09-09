# CSS, Style Loader
엔트리에 css파일이 포함되어 있거나, js파일에서 css파일을 import하는 경우 css를 불러오는 모듈입니다.  
module아래로 rules를 가지는 구조로 되어 있으며, 각 배열을 순차적으로 돌면서 엔트리에서 가져온 의존관계의 데이터 덩어리들을 해석합니다.  
각 모듈의 매칭은 rules아래의 test구문에 정의된 정규표현식에 맞는 파일을 대상으로 합니다.

```javascript
const path = require('path');

module.exports = {
    entry: ['./src/index.js', './src/style.css'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['css-loader']
            },
        ],
    },
}
```
하지만 데이터만 불러와서는 사용할 수 없습니다.  
불러온 css데이터를 html에 포함시키는 style-loader모듈을 같이 사용하면, 웹 페이지에 스타일시트를 포함시켜 화면을 꾸며줄 수 있습니다.

다음과 같이 변경 하고, 엔트리에서 불러오던 style.css도 index.js파일 내부에 import 구문으로 변경합니다.
```javascript
//webpack.config.js
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
        ],
    },
}

//index.js
import _ from 'lodash';
import './style.css';

function component() {
...생략
```
loader가 복수개로 늘어난 경우, 우측부터 데이터해석을 진행하여 좌측의 loader로 해석된 결과를 전달합니다.

index.html파일을 열어 번들링이 된것을 확인합니다.  
css-loader에 의해 해석된 style.css파일이 style-loader에 의해 head태그 내부에 추가된 것을 확인 할 수 있습니다.