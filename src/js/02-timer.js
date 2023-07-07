import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Функція для форматування чисел менше двох символів
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Функція для обчислення різниці в часі
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

// Отримуємо елементи DOM
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Ініціалізуємо flatpickr
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Обробник події натискання на кнопку "Start"
startButton.addEventListener('click', () => {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();
  const diff = selectedDate.getTime() - currentDate.getTime();

  if (diff <= 0) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }

  startButton.disabled = true;

  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = selectedDate.getTime() - currentTime.getTime();

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      startButton.disabled = false;
      Notiflix.Notify.success('Countdown finished');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);
});
