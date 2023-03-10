import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedCountDown = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.startBtn.disabled = true;
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      Notify.success('Please click on start!');
      refs.startBtn.disabled = false;
      selectedCountDown = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);

class CountDown {
  constructor() {
    this.intervalId = null;
    refs.startBtn.disabled = true;
  }
  startCountDown() {
    this.intervalId = setInterval(() => {
      const deltaTime = selectedCountDown.getTime() - Date.now();
      const componentsCountDown = convertMs(deltaTime);
      this.updateComponentsCountDown(componentsCountDown);

      if (deltaTime < 999) {
        this.stopCountDown();
      }
    }, 1000);
  }

  updateComponentsCountDown({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }

  stopCountDown() {
    clearInterval(this.intervalId);
  }
}
const countDown = new CountDown();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  countDown.startCountDown();
});
