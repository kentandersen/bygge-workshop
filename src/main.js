import time from './time/time';

const timeEl = document.querySelector('time');
function renderTime() {
  timeEl.innerHTML = time();
  setTimeout(renderTime, 1000);
}

renderTime();
