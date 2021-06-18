// Задание 4.

// Напишите код приложения, интерфейс которого представляет собой input и кнопку.В input можно ввести любое число.При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.


// Создаётся контейнер для кнопки и поля ввода
const elementData = document.createElement("div"); 
elementData.classList.add("container"); elementData.classList.add("data");
elementData.innerHTML += `
  <p class="data__input-title">Ширина картинки:</p>
  <input type="input" name="data__input" id="data__input--widht" placeholder="Введите ширину картинки">`;
elementData.innerHTML += `
  <p class="data__input-title">Высота картинки:</p>
  <input type="input" name="data__input" id="data__input--height" placeholder="Введите высоту картинки">`;
elementData.innerHTML += '<input type="button" class="data__btn" value="Запрос">';
document.body.append(elementData);




// Создаётся контейнер для карточек с картинками
const elementCards = document.createElement("div"); 
elementCards.classList.add("container"); elementCards.classList.add("cards");
document.body.append(elementCards);

document.querySelector("#data__input--widht").focus(); // фокус на поле "Ширина картинки"




// Ищем ноду для вставки результата запроса
const cardsNode = document.querySelector('.cards');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.data__btn');

let heightImage; // Высота картинки
let widthImage;  // Ширина картинки




// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {

  let value;
  // получаем число картинок
  value = document.querySelector('#data__input--widht').value;
  widthImage = Number(value);

  // Проверки правильности ввода
  if (isNaN(widthImage)) {
    alert("Ошибка при вводе ширины! Введено не число!");
    return;
  }

  if (widthImage < 100 || widthImage > 300) {
    alert("Ошибка при вводе ширины! Число вне диапазона от 100 до 300 !");
    return;
  }

  if ((widthImage ^ 0) !== widthImage) {
    alert("Ошибка при вводе ширины! Число не является целым !");
    return;
  }


  value = document.querySelector('#data__input--height').value;
  heightImage = Number(value);

  // Проверки правильности ввода
  if (isNaN(heightImage)) {
    alert("Ошибка при вводе высоты! Введено не число!");
    return;
  }

  if (heightImage < 100 || heightImage > 300) {
    alert("Ошибка при вводе высоты! Число вне диапазона от 100 до 300 !");
    return;
  }

  if ((heightImage ^ 0) !== heightImage) {
    alert("Ошибка при вводе высоты! Число не является целым !");
    return;
  }

  // формирование адреса запроса
  let url = `https://picsum.photos/${widthImage}/${heightImage}`;

  // Функция запроса
  (async () => {
    let response = await fetch(url);

    let blob = await response.blob(); //  скачиваем как Blob-объект

    // выводим на экран
    let src = URL.createObjectURL(blob);
    let card = `<img class="cards__item-img" src="${src}"/>`;
    cardsNode.innerHTML = card;
  })()


})


