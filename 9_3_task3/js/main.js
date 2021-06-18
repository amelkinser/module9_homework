// Задание 3.

// Напишите код приложения, интерфейс которого представляет собой input и кнопку.В input можно ввести любое число.При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
// Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.



// Функция-обертка над XMLHttpRequest, осуществляющая запрос
// url - урл, по которому будет осуществляться запрос
// callback - функция, которая вызовется при успешном выполнении
// и первым параметром получит объект-результат запроса

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
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
      </div>
      `;
    cards = cards + cardBlock; // набор карточек
  });
  cardsNode.innerHTML = cards; // карточки помещаем в cardsNode
}



// Создаётся контейнер для кнопки и поля ввода
const elementData = document.createElement("div"); 
elementData.classList.add("container"); elementData.classList.add("data");
elementData.innerHTML += `
  <label for="data__input">Число картинок: </label>
  <input type="input" name="data__input" id="data__input--numimg" placeholder="Введите число картинок">
`;
elementData.innerHTML += '<input type="button" class="data__btn" value="Принять">';
document.body.append(elementData);




// Создаётся контейнер для карточек с картинками
const elementCards = document.createElement("div"); 
elementCards.classList.add("container"); elementCards.classList.add("cards");
document.body.append(elementCards);
document.querySelector("#data__input--numimg").focus(); // фокус на поле "число картинок"




// Ищем ноду для вставки результата запроса
const cardsNode = document.querySelector('.cards');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.data__btn');

let numImage; // Общее число картинок




// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => { 
  let value;
  // получаем число картинок
  value = document.querySelector('#data__input--numimg').value;
  numImage = Number(value);

  // Проверки правильности ввода
  if (isNaN(numImage)) {
    alert("Ошибка! Введено не число!");
    return;
  }
  
  if (numImage < 1 || numImage > 10) {
    alert("Ошибка! Число вне диапазона от 1 до 10 !");
    return;
  }

  if ((numImage ^ 0) !== numImage) {
    alert("Ошибка! Число не является целым !");
    return;
  }

  // формирование адреса запроса
  let url = `https://picsum.photos/v2/list?limit=${numImage}`;
  // Функция запроса
  useRequest(url, displayResult); 
})


