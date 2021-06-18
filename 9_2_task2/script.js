
// Задание 2.

// Вам дана заготовка и результат, который вы должны получить.Ваша задача — написать код, который будет преобразовывать JSON в JS - объект и выводить его в консоль.


// Этап 1. Подготовка данных 

// JSON, который мы будем парсить
let jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

console.log('Исходная JSON-строка:', jsonString);

// Этап 2. Получение данных 
const data = JSON.parse(jsonString);
const list = data.list;

// Этап 3. Запись данных в результирующий объект 

const result = {
  list: [
    {
      name: list[0].name,
      age: Number(list[0].age),
      prof: list[0].prof,
    },
    {
      name: list[1].name,
      age: Number(list[1].age),
      prof: list[1].prof,
    }
  ]
};

console.log('Результирующий JS-объект:\n', result);


