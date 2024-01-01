import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const selectedDate = document.querySelector('#datetime-picker');
const spanDays = document.querySelector(`[data-days]`);
const spanHours = document.querySelector(`[data-hours]`);
const spanMinutes = document.querySelector(`[data-minutes]`);
const spanSeconds = document.querySelector(`[data-seconds]`);

startBtn.disabled = true;

startBtn.addEventListener('click', onClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

const timer = {
  start() {
    const id = setInterval(() => {
      const currentTime = new Date();
      const ms = fp.selectedDates[0] - currentTime;
      const { days, hours, minutes, seconds } = convertMs(ms);

      convertMs(ms);

      if (ms < 1000) {
        clearInterval(id);
        selectedDate.disabled = false;
      }

      spanDays.textContent = pad(days);
      spanHours.textContent = pad(hours);
      spanMinutes.textContent = pad(minutes);
      spanSeconds.textContent = pad(seconds);
    }, 1000);
  },
};

function onClick() {
  startBtn.disabled = true;
  selectedDate.disabled = true;

  timer.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
