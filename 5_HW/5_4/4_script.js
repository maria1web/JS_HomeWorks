'use strict'

// получаем коллекцию кнопок документа и сохраняем их в константу allButtons
const allButtons = document.querySelectorAll('.btn-details');

// для каждой кнопки из коллекции
allButtons.forEach(function (button) {

    // применяем функцию-обработчик клика
    button.addEventListener('click', function(event) {

        // которая вернет описание карточки товара как объект со свойствами
        getCardAsObject(event);
    });
});

/**
 * Функция обрабатывает клик по кнопке в карточке товара
 * и попеременно вызывает функции для показа или скрытия текста о товаре
 * @param {MouseEvent} clickedButtonEvent - событие клика
 */
function getCardAsObject(clickedButtonEvent) {
    //clickedButtonEvent.target - элемент по которому кликают (сама кнопка)
    //clickedButtonEvent.target.parentNode - родительский узел элемента клика (родит. див кнопки)
    const cardNode = clickedButtonEvent.target.parentNode;

    //создаём объект со след. свойствами:
    const card = {
        wrap: cardNode, // элемент div с классом .product
        img: cardNode.querySelector('.item-img'), // картинка внутри .product
        productName: cardNode.querySelector('.productName'), // .productName, внутри .product
        button: cardNode.querySelector('.btn-details'), // здесь button, внутри .product
    };

    //считываем в константу текст на нажатой кнопке:
    const textOnButton = card.button.innerText;

    // и проверяем:
    if (textOnButton === 'Details') {
    // то выполняем функцию
        showMoreText(card);
    } else if (textOnButton === 'Cansel') {
        hideMoreText(card);
    }
}                       // конец функции getCardAsObject

/**
 * Функция скрывает текст с описанием товара.
 * @param {Object} card
 * @param {HTMLDivElement} card.wrap
 * @param {HTMLImageElement} card.img
 * @param {HTMLDivElement} card.productName
 * @param {HTMLButtonElement} card.button
 */
function hideMoreText(card) {
    // картинке внутри .product ставим стиль display: block
    card.img.style.display = 'block';

    // внутри .product находим элемент с классом .description и удаляем его
    card.wrap.querySelector('.description').remove();

    // 5.2 кнопке, которая внутри .product ставим текст "Details"
    card.button.innerText = 'Details';
}

/**
 * Функция показывает текст с описанием товара.
 * @param {Object} card
 * @param {HTMLDivElement} card.wrap
 * @param {HTMLImageElement} card.img
 * @param {HTMLDivElement} card.productName
 * @param {HTMLButtonElement} card.button
 */

function showMoreText(card) {
    // скрываем картинку (в стили элемента соотв свойству img добавляем display = 'none'  )
    card.img.style.display = 'none';

    // в константу textInstead определяем текст для показа вместо картинки
    const textInstead = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        ' Adipisci animi eaque, ipsum nisi quas tempora voluptas! Accusantium, ' +
        'aliquam architecto culpa cupiditate debitis deserunt dignissimos doloremque eligendi esse ex' +
        ' harum impedit odio odit omnis perspiciatis quam quisquam ratione saepe tempora unde! ' +
        'Commodi consectetur harum nesciunt praesentium provident quasi repudiandae, sunt tempora!';

    // после закрывающего тега элемента productName вставляем
    // новый div class='description с текстом из константы textInstead
    card.productName.insertAdjacentHTML("afterend", `<div class='description'>${textInstead}</div>`);

    // вместо надписи "Details" на кнопке вставляем текст 'Cansel'
    card.button.innerText = 'Cansel';
}











