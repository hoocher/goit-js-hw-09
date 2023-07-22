import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hourTimer = document.querySelector('[data-hours]');
const minsTimer = document.querySelector('[data-minutes]');
const secTimer = document.querySelector('[data-seconds]');
const timersEl = document.querySelector('.timer');

timersEl.style.display = 'Flex';
timersEl.style.gap = '30px';
timersEl.style.justifyContent = 'center';

let timeInTimer = null;

let inputedData = null;
let timeToTimer = 0;
const date = new Date();
startBtnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onClose();
  },
};
const fp = flatpickr(inputEl, options);

function onClose() {
  inputedData = fp.selectedDates[0];
  if (inputedData <= date) {
    window.alert('Please choose a date in the future');
  } else {
    timeToTimer = inputedData - date;
    startBtnEl.disabled = false;
    timerTime();
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function timerTime() {
  timeInTimer = convertMs(timeToTimer);
  const { days, hours, minutes, seconds } = timeInTimer;

  daysTimer.textContent = addLeadingZero(days);
  hourTimer.textContent = addLeadingZero(hours);
  minsTimer.textContent = addLeadingZero(minutes);
  secTimer.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  startBtnEl.disabled = 'true';
  let myTimer = setInterval(() => {
    timeToTimer -= 1000;
    if (timeToTimer <= 0) {
      clearInterval(myTimer);
    } else {
      timerTime();
    }
  }, 1000);
}

startBtnEl.addEventListener('click', startTimer);
