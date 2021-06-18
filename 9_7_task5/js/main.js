// Задание 5.

// Написать код приложения, интерфейс которого состоит из двух input и кнопки.В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
// Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.
// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса(использовать localStorage).



// Функция-обертка над XMLHttpRequest, осуществляющая запрос
// url - адрес, по которому будет осуществляться запрос
// callback - функция, которая вызовется при успешном выполнении
// и первым параметром получит объект-результат запроса

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      console.log('resultJSON', xhr.response); // Принятый JSON-объект
      const result = JSON.parse(xhr.response); // JS-объект 
      console.log("resultJS", result);
      localStorage.setItem('resultJSON', JSON.stringify(result)); // Сохранение принятого JSON-объекта в localStorage
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function () {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};



// Функция обработки полученного результата
// apiData - объект с результатом запроса

function displayResult(apiData) {
  let cards = '';

  apiData.forEach(item => {
    // Формируется карточка с картинкой и заголовком 
    const cardBlock = ` 
      <div class="cards__item">
        <div class="cards__item-title"> <h2>${item.author}</h2> </div>
        <img class="cards__item-img" src="${item.download_url}"/>
      </div>`;
    cards = cards + cardBlock; // набор карточек
  });
  cardsNode.innerHTML = cards; // карточки помещаем в cardsNode
}



// Создаётся контейнер для кнопки и полей ввода
const elementData = document.createElement("div");
elementData.classList.add("container"); elementData.classList.add("data");
elementData.innerHTML += `
  <p class="data__input-title">Номер страницы:</p>
  <input type="input" name="data__input" id="data__input--numpage" placeholder="Введите номер страницы">`;
elementData.innerHTML += `
  <p class="data__input-title">Лимит:</p>
  <input type="input" name="data__input" id="data__input--limit" placeholder="Введите лимит">`;
elementData.innerHTML += '<input type="button" class="data__btn" value="Запрос">';
document.body.append(elementData);



// Создаётся контейнер для карточек с картинками
const elementCards = document.createElement("div");
elementCards.classList.add("container"); elementCards.classList.add("cards");
document.body.append(elementCards);

document.querySelector("#data__input--numpage").focus(); // фокус на поле "Номер страницы"



// Ищем ноду для вставки результата запроса
const cardsNode = document.querySelector('.cards');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.data__btn');

let numPage;     // Номер страницы
let limitImage;  // Лимит



// Обработчик кнопки "Запрос"
btnNode.addEventListener('click', (event) => {

  let value;

  // получаем число картинок
  value = document.querySelector('#data__input--numpage').value;
  numPage = Number(value);
  value = document.querySelector('#data__input--limit').value;
  limitImage = Number(value);

  // Проверки правильности ввода
  let err_numPage = 0;
  let err_limitImage = 0;

  if (isNaN(numPage)) err_numPage = 1;
  else if (numPage < 1 || numPage > 10) err_numPage = 1;
  else if ((numPage ^ 0) !== numPage) err_numPage = 2;

  if (isNaN(limitImage)) err_limitImage = 1;
  else if (limitImage < 1 || limitImage > 10) err_limitImage = 1;
  else if ((limitImage ^ 0) !== limitImage) err_limitImage = 2;

  if (err_numPage === 1 && err_limitImage === 1) {
    alert("Ошибка! Номер страницы и лимит вне диапазона от 1 до 10!");
    return;
  }

  if (err_numPage === 1) {
    alert("Ошибка! Номер страницы вне диапазона от 1 до 10!");
    return;
  }

  if (err_numPage === 2) {
    alert("Ошибка! Число в поле <Номер страницы> не является целым !");
    return;
  }


  if (err_limitImage === 1) {
    alert("Ошибка! Лимит вне диапазона от 1 до 10!");
    return;
  }

  if (err_limitImage === 2) {
    alert("Ошибка! Число в поле <Лимит> не является целым !");
    return;
  }

  // формирование адреса запроса
  let url = `https://picsum.photos/v2/list?page=${numPage}&limit=${limitImage}`;

  let urlRequest = localStorage.getItem('urlRequest'); // Читаем из localStorage ранее сохранённый адрес запроса
  if (urlRequest === url) { // Если адрес из localStorage совпадает с текущим, то запрос XMLHttpRequest не делаем. 
    console.log('urlStorage', urlRequest);
    let resultJSON = localStorage.getItem('resultJSON'); // Читаем из localStorage JSON-строку
    console.log('result_JSON_Storage', resultJSON);
    let result = JSON.parse(resultJSON);                 // Преобразуем JSON-строку в JS-объект
    console.log('result_JS_Storage', result);
    displayResult(result);                               // Передаём JS-объект в ф-ю для прорисовки
  }
  else { // Если запрос происходит по новому адресу, не совпадающему с тем, к-й был сохранён в localStorage
    console.log('urlNew', url);
    localStorage.setItem('urlRequest', url);
    // Вызываем ф-ю, выполняющую XMLHttpRequest - запрос
    useRequest(url, displayResult);
  }
})