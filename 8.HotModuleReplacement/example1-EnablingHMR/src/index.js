import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import printMe from './print.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    // 이 라인이 동작하려면 현재 스크립트를 통해 포함된 Lodash가 필요합니다.
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    // 원래 있던 div 에 이미지를 추가합니다.
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);
    // 버튼을 추가합니다.
    btn.innerHTML = 'Click me!';
    btn.onclick = printMe;
  
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('HMR update accepted!');
        // printMe();
    })
}