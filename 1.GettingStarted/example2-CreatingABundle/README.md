# 번들 실행
이 전 챕터에서 살펴본 환경셋팅에 추가로 index.html에 포함되어 있던 lodash 라이브러리 스크립트를 번들링에 포함하여 빌드를 해 보겠습니다.  
index.html은 아직 번들링 모듈에 포함되어 있지 않으므로 출력폴더에 미리 생성되어 있습니다. 이 후 챕터에서 다루어 집니다.  

lodash 번들링 예시를 위해 설치될 모듈은 npm에서 아래 명령어로 설치됩니다.
```
npm i lodash
```
이미 package.json에 의존성 스크립트가 추가 되어 있으므로 이부분은 건너뜁니다.

index.html파일에서도 lodash스크립트 호출부를 제거 했으므로 index.js 파일 안에서 import를 통해 lodash스크립트를 주입해 와야 합니다.  
그래야 webpack에서 해당 스크립트를 탐색결과에서 찾아내 번들링에 포함 시킬수 있습니다.
```javascript
import _ from 'lodash';

function component() {
    const element = document.createElement('div');
...생략
```

이제 웹팩 빌드를 시작합니다.  
아래 명령을 터미널에 입력후 실행하세요.
```
npx webpack

=> npx는 npm script 작성없이 바로 실행시킬수 있게 추가된 기능입니다. npm 5.2.0이상 부터 포함되어 있습니다.
```
빌드가 완료되면 webpack 기본 옵션에따라 dist폴더에 번들링된 파일이 출력되어집니다.
index.html파일을 열어 lodash가 번들링되어 오류없이 돌아가는 화면을 확인합니다.