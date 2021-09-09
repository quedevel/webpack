# 출력 파일명
캐싱은 네트워크의 요청을 줄이며, 웹페이지의 로딩속도를 향상시키려는 이유로 자주 사용되는 기술입니다.  
하지만 소스코드가 변경되는 등 새로이 요청을 보내야 할때는 어려움을 겪는 경우가 많습니다.  
webpack에서 지원되는 기능을 이용하여 코드가 변경되는 경우 다시 리소스를 가져올 수 있는 방법을 공유합니다.

이미 앞선 내용에서 몇번 나왔던 [name], [id]등의 내용이 지금 설명하는 기능중 하나 입니다.  
번들링 후 출력하는 옵션에서 fileName에 적용되었습니다.
```javascript
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
...생략
```
```
npm run build
```
이렇게 빌드를 실행하게되면 index.[hash].js 라는 파일로 출력이 되어집니다.  
1. [name]: 엔트리의 이름인 index를 가져올 수 있습니다.
2. [id]: 내부에 사용된 청크의 id를 가져올 수 있습니다.
3. [contenthash]: 콘텐츠에서 생성된 해시를 가져올 수 있습니다.

이 전에 적용했던 런타임별 청크분할에서도 적용할 수 있습니다.
```javascript
optimization: {
    runtimeChunk: 'single',
},
```
```
npm run build2
```
이러면 청크별로 개별의 분할 캐싱이 가능합니다.  
cache그룹별로 관리하는 기능도 있습니다.
```javascript
optimization: {
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
            },
        },
    },
},
```
```
npm run build3
```
결과 로그를 보면 런타임,모듈벤터,엔트리 세가지로 분리되어 좀 더 세밀하게 캐싱관리가 가능해진것을 확인할 수 있습니다.  
하지만 index.js의 의존성문제가 있으므로, 이 파일이 변경되면  
index의 번들이 변경되고 -> 모듈id가 변경되니 vendor가 변경되고 -> runtime이 변경됩니다.  
따라서 작게 쪼개어 캐싱된 의미가 사라지고 전부 다시 빌드가 되어버립니다.  
이를 방지할 수 있는 옵션이 있습니다.
```javascript
optimization: {
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
            },
        },
    },
    moduleIds: 'deterministic'
},
```
위 옵션으로 vendor해시의 변경을 유지할 수 있습니다.