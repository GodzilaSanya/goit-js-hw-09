import getRandomHexColor from '../helpers/randomHexColor';

const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

start.addEventListener('click', changeColor);
stop.addEventListener('click', stopChange);

stop.style.opacity = 0.6;
stop.style.pointerEvents = 'none';

let timerId = null;

function changeColor() {
  start.style.opacity = 0.6;
  start.style.pointerEvents = 'none';
  stop.style.opacity = 1;
  stop.style.pointerEvents = 'auto';
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChange() {
  stop.style.opacity = 0.6;
  stop.style.pointerEvents = 'none';
  start.style.pointerEvents = 'auto';
  start.style.opacity = 1;
  clearInterval(timerId);
}
