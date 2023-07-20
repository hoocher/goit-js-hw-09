const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBodyColor() {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
    console.log('Change');
  }, 1000);
}

function stopChangeBodyColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
}

startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);
