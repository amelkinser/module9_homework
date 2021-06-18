
// Задание 1.

// Вам дана заготовка и результат, который вы должны получить.Ваша задача — написать код, который будет преобразовывать XML в JS - объект и выводить его в консоль.


// Этап 1. Подготовка данных 

// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;
console.log('Исходный XML-код: ', xmlString);

// Этап 2. Получение данных 

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод
const listNode = xmlDOM.querySelector("list");
const studentNode1 = listNode.querySelector('list > student:first-child');
const nameNode1 = studentNode1.querySelector("name");
const langAttr_for_nameNode1 = nameNode1.getAttribute('lang');
const firstNode1 = nameNode1.querySelector("first");
const secondNode1 = nameNode1.querySelector("second");
const age1 = studentNode1.querySelector("age");
const prof1 = studentNode1.querySelector("prof");


const studentNode2 = listNode.querySelector('list > student:last-child');
const nameNode2 = studentNode2.querySelector("name");
const langAttr_for_nameNode2 = nameNode2.getAttribute('lang');
const firstNode2 = nameNode2.querySelector("first");
const secondNode2 = nameNode2.querySelector("second");
const age2 = studentNode2.querySelector("age");
const prof2 = studentNode2.querySelector("prof");


// Этап 3. Запись данных в результирующий объект 

const result = {
  list: [
    {
      name: firstNode1.textContent + ' ' + secondNode1.textContent,
      age: Number(age1.textContent),
      prof: prof1.textContent,
      lang: langAttr_for_nameNode1
    },
    {
      name: firstNode2.textContent + ' ' + secondNode2.textContent,
      age: Number(age2.textContent),
      prof: prof2.textContent,
      lang: langAttr_for_nameNode2
    }
  ]
};

console.log('Результирующий JS-объект:\n', result);
