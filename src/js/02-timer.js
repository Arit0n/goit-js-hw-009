import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const text = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minut = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds');

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  },
};
flatpickr(text, options);
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
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
buttonStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let timerMs = new Date(text.value) - new Date();
    console.log(timerMs);

    if (timerMs > 0) {
      let timerObject = convertMs(timerMs);
      day.textContent = addLeadingZero(timerObject.days);
      hour.textContent = addLeadingZero(timerObject.hours);
      minut.textContent = addLeadingZero(timerObject.minutes);
      second.textContent = addLeadingZero(timerObject.seconds);
    } else {
      Notiflix.Notify.success('Finish');
      clearInterval(timer);
    }
  }, 1000);
});
