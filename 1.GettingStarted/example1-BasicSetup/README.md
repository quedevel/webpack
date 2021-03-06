# 기본설정
webpack의 설치입니다.  
기본적으로 webpack은 nodejs환경 위에서 구동되는 번들러입니다.  
따라서 nodejs를 통해서 설치를 진행합니다.

기본적으로는 시작폴더를 처음 구성하였을 때 아무 파일도 없고 npm을 통한 프로젝트 구성을 위해 초기화를 시작합니다.

```
npm init -y

=> -y (y플래그로 기본셋팅값을 자동으로 생성시킵니다. human-readable로는 --yes)
```
터미널환경에서 위 명령어를 실행시키면 npm사용을 위한 기본적인 패키지구성 정보파일이 생성됩니다.  
지금은 스터디셋팅을 위해 기본적인 환경구성파일이 셋팅된 상태를 공유 하였습니다.  
하지만 npm으로 webpack을 설치하고 사용하기 위해서는 추가로 실행해야 할 명령어가 더 있습니다.

```
npm i webpack webpack-cli -D

=> i (install의 축약명령어 입니다.)
=> -D (개발환경 의존성을 위한 플래그입니다. human-readable로는 --save-dev)
```
위 명령어로 webpack과 webpack command line interface를 설치할 수 있습니다.  
앞으로 각 챕터에서는 빠른설치를 위해 아래 명령어로 설치를 대신합니다.

```
npm ci

=> ci로 인스톨 하는 경우가 일반적인 install보다 좀 더 빠른 성능을 보이는것으로 알려져 있습니다!
```

여기까지 기본적인 webpack실행환경을 위한 구조를 살펴봤습니다.  
번들 생성은 다음챕터부터 시작합니다.