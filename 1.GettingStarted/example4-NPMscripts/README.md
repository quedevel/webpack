# NPM run 스크립트
지금까지 npx를 활용하여 webpack을 실행시켰습니다.  
하지만 전달해야 할 인자의 값이 많아지거나, 다양한 셋팅의 명령을 사용해야 한다면 이것을 일일히 작성하는것은 매우 번거롭고, 때론 오타로 잘못된 명령을 입력 할 때도 있습니다.  
이것을 node설정에 등록하여 놓고 호출하는 방법으로 쉽고 간편하게 해결할 수 있습니다.

```json
{
  "scripts": {
      "호출명": "실행할 명령"
  }
}
```

package.json 중 "scripts"에 실행할 값을 넣고 아래 명령어로 호출합니다.
```
npm run 호출명
```
이번 챕터의 package.json파일 에서는 호출명을 "build"로 지정하여, 호출시 webpack을 실행시킵니다.  
index.html파일을 열어 번들링이 된것을 확인합니다.