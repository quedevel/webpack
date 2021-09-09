# Font Loader (Asset Modules)
이미지 로더에서 설명했던 Asset Module을 폰트에서도 같이 사용합니다.  
아래와 같이 폰트용 규칙을 추가합니다.

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
        ],
    },
}
```

그리고 폰트가 적용되는것을 확인하기 위해 style.css에 폰트를 적용시킵니다.
```css
@font-face {
    font-family: 'Nanum Gothic';
    src: url('./NanumGothic.woff2') format('woff2'),
         url('./NanumGothic.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

.hello {
...생략
    font-family: "Nanum Gothic";
}
```

이제 처음에 보이던 Hello webpack이라는 텍스트는 폰트가 적용됩니다.  
index.html파일을 열어 번들링이 된것을 확인합니다.