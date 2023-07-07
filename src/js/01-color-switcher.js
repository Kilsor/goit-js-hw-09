const startButton = document.querySelector('[data-start]'); // Отримуємо посилання на кнопку "Start" за допомогою селектора атрибута
const stopButton = document.querySelector('[data-stop]'); // Отримуємо посилання на кнопку "Stop" за допомогою селектора атрибута

let intervalId = null; // Ініціалізуємо змінну для збереження ідентифікатора інтервалу

// Функція, яка повертає випадковий шестнадцятковий колір
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Функція, яка виконується при натисканні кнопки "Start"
function start() {
  startButton.disabled = true; // Вимикаємо кнопку "Start", щоб уникнути багаторазового натискання
  intervalId = setInterval(() => {
    // Запускаємо інтервал, який змінює колір фону кожну секунду
    document.body.style.backgroundColor = getRandomHexColor(); // Змінюємо колір фону
  }, 1000);
}

// Функція, яка виконується при натисканні кнопки "Stop"
function stop() {
  startButton.disabled = false; // Включаємо кнопку "Start"
  clearInterval(intervalId); // Зупиняємо інтервал
}

startButton.addEventListener('click', start); // Додаємо слухач подій для кнопки "Start"
stopButton.addEventListener('click', stop); // Додаємо слухач подій для кнопки "Stop"
