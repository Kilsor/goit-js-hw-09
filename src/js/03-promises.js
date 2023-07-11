// Підключення бібліотеки Notiflix
import Notiflix from 'notiflix';

// Створення функції createPromise, яка повертає новий проміс
function createPromise(position, delay) {
  // Створення нового проміса з функцією виконання (executor function)
  return new Promise((resolve, reject) => {
    // Генерація випадкового значення для визначення виконання або відхилення промісу
    const shouldResolve = Math.random() > 0.3;
    // Встановлення таймеру для затримки виконання або відхилення промісу
    setTimeout(() => {
      // Виклик функції resolve, якщо проміс повинен виконатись
      if (shouldResolve) {
        resolve({ position, delay });
        // Виклик функції reject, якщо проміс повинен відхилитись
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
// Прикріплення обробників подій до форми, які відслідковують подію 'submit'
document.querySelector('.form').addEventListener('submit', function (event) {
  // Відміна стандартної дії браузера по події 'submit' форми
  event.preventDefault();
  // Отримання значень з полів форми
  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);
  // Цикл для створення вказаної кількості промісів
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      // Обробка виконання промісу
      .then(({ position, delay }) => {
        // Виклик функції Notiflix.Notify.success для відображення спливаючого повідомлення успішного виконання
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      // Обробка відхилення промісу
      .catch(({ position, delay }) => {
        // Виклик функції Notiflix.Notify.failure для відображення спливаючого повідомлення відхилення
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    // Збільшення затримки для наступного промісу на вказаний крок
    delay += step;
  }
});
