import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from '../helpers/convertMs';
import addLeadingZero from '../helpers/addLeadingZero';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const start = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMin = document.querySelector('span[data-minutes]');
const timerSec = document.querySelector('span[data-seconds]');

start.addEventListener('click', startTimer);

resetTimer();

let timerValue = null;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      start.style.pointerEvents = 'auto';
      start.style.opacity = 1;
      timerValue = selectedDates[0];
      setTimer();
      Notify.success("Date's correct 👌");
    } else if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
    }
  },
};

function startTimer() {
  timerId = setInterval(() => {
    if (timerValue > new Date()) {
      setTimer();
    } else if (timerValue <= new Date()) {
      Report.success('Success', 'Time is up', 'Okay', resetTimer);
      clearInterval(timerId);
    }
  }, 1000);
}

function setTimer() {
  const { days, hours, minutes, seconds } = convertMs(timerValue - new Date());
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMin.textContent = addLeadingZero(minutes);
  timerSec.textContent = addLeadingZero(seconds);
}

function resetTimer() {
  start.style.opacity = 0.6;
  start.style.pointerEvents = 'none';
}

flatpickr('#datetime-picker', options);
