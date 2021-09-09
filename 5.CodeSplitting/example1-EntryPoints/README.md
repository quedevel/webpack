# 코드 분할
webpack을 통하여 번들링하는 이유중 한가지는 로딩시간의 단축으로 볼수도 있습니다.  
SPA의 경우 처음 로딩시간은 일반웹페이지보다 비슷하거나 늦어질 수도 있지만, 결국 모든 리소스를 한번에 로드 한 후에 페이지 이동에 지연시간이 일어나지 않게되어 사용자경험적인 측면에서 좋은 환경을 제공할 수도 있습니다.  
이 외에도 다양한 이유와 목적으로 번들링 작업이 필요하게 되지만 코드 분할없이 중복되는 코드가 같이 포함되어 빌드가 된다면 그 목적을 잃어버렸다고 볼 수 있습니다.

코드 분할의 접근 방식은 3가지가 있습니다.  
* 엔트리 포인트: webpack설정의 엔트리에서 수동으로 분할합니다.
* 중복의 방지: 엔트리의 의존성옵션이나 SplitChunksPlugin을 사용해 중복청크를 제거, 분할합니다.
* 동적 삽입: 모듈내에서 promise를 통해 필요한 경우에 코드를 호출합니다.

## 1.엔트리 포인트
기존 작업에서 another.js를 생성하여 index.js와 마찬가지로 lodash라이브러리를 포함시켰습니다.  
이상태로 빌드를 진행할 경우 두 파일 모두 lodash라이브러리를 포함하여 번들링을 하게됩니다.  
```javascript
module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another.js',
    },
...생략
```
코드는 분할이 되었지만 공통 모듈의 경우 중복이 되게됩니다.  
아래 명령으로 중복 번들링을 실행시키고 로그를 살펴봅니다.
```
npm run build
```

## 2.중복의 방지
엔트리 포인트를 분할하여 사용할 때 중복으로 사용되는 모듈을 공유옵션으로 빼는것 입니다.  
```javascript
module.exports = {
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'commonLib',
        },
        another: {
            import: './src/another.js',
            dependOn: 'commonLib',
        },
        commonLib: 'lodash',
    },
...생략
```
여기서 각 엔트리 포인트중 공통으로 라이브러리를 사용하는 부분에 dependOn옵션으로 공통 라이브러리를 호출하는 엔트리 명을 지정해 주었습니다.  
이렇게하면 중복으로 번들링 되는 오류를 피할 수 있습니다.  
또한 dependOn으로 공유 할 수 있는 라이브러리는 배열로 한 개의 엔트리로 묶어서 공유도 가능합니다.  
다시 빌드를 하면 기존과는 다르게 각 파일로 번들이 완료되며 용량이 줄어들었으며, 의존시키는 엔트리도 생성된 결과를 확인 할 수 있습니다.  
아래 명령으로 중복방지된 번들링을 실행시키고 로그를 살펴봅니다.
```
npm run build2
```
추가로, SPA환경에서 다중 엔트리 포인트를 사용 할 경우 오류가 발생할 수 있습니다.  
아래와 같이 옵션을 추가하여 방지 할 수 있습니다.
```javascript
module.exports = {
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'commonLib',
        },
        another: {
            import: './src/another.js',
            dependOn: 'commonLib',
        },
        commonLib: 'lodash',
    },
    optimization: {
      runtimeChunk: 'single',
    },
...생략
```

다른 방법으로는 SplitChunksPlugin이 있습니다.  
아래와 같이 플러그인이 중복되는 청크를 자동으로 분리시키게 요청할 수 있습니다.  
```javascript
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        another: './src/another.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
    },
...생략
```
아래 명령으로 플러그인에게 중복방지를 위임한 번들링을 실행시키고 로그를 살펴봅니다.
```
npm run build3
```
자동으로 공유된 모듈이 생성되며 분리되어 집니다.

## 3.동적 삽입
webpack은 commonJS를 지원합니다.  
```javascript
function getComponent() {
    const element = document.createElement('div');

    return import('lodash').then(({ default: _ }) => {
        const element = document.createElement('div');
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;
    }).catch((error) => 'An error occurred while loading the component');
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```
아래 명령으로 동적삽입으로를 번들링을 실행시키고 로그를 살펴봅니다.
```
npm run build4
```