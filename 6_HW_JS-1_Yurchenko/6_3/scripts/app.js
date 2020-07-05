// получаем коллекцию кнопок, из них собираем объект типа "кнопка"?
let basketBtns = document.querySelectorAll('.toBasketBtn');
//берем все кнопки "В корзину" и слушаем клики по ним
// перебираем их и устанавливаем значения свойств
basketBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let id = event.srcElement.dataset.id;
        let price = event.srcElement.dataset.price;
        let name = event.srcElement.dataset.name;
        // вот этот объект basket с методом addProduct
        basket.addProduct({ id: id, price: price, name: name })
    });
});

let basket = {
    products: {},

    /**
     * Метод добавляет продукт в корзину.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProduct(product) {
        this.addProductToObject(product);
        this.renderProductInBasket(product);
        this.renderTotalSum();
        this.addRemoveBtnsListeners();
    },


    /**
     * Обработчик события клика по кнопке удаления товара.
     * @param {MouseEvent} event
     */
    removeProductListener(event) { // событие - клик по кнопке "trash bin"
        //console.log(this); this будет указывать на кнопку "trash bin", а не на объект basket
        //здесь мы используем basket вместо this, потому что контекст вызова не имеет
        //этих методов и нам надо явно обратиться к нашему объекту корзины
        basket.removeProduct(event);   // удаляем из объекта basket
        basket.renderTotalSum();        // пересчитываем сумму в корзине
    },


    /**
     * Метод удаляет продукт из объекта продуктов, а также из корзины на странице.
     * @param {MouseEvent} event
     */
    removeProduct(event) {
        let id = event.srcElement.dataset.id;
        this.removeProductFromObject(id);       //из объекта
        this.removeProductFromBasket(id);       //из корзины на странице
    },

    /**
     * Метод удаляет товар из видимой части корзины. Если количество больше 1, то просто уменьшает его.
     * @param {string} id
     */
    removeProductFromBasket(id) {
        // получаем кол-во эл-тов по его id
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        // если в кол-ве стоит 1
        if (countTd.textContent == 1) {
            // удаляем элемент целиком (тег tr - вся строка таблицы)
            countTd.parentNode.remove();
        } else {
            // иначе просто уменьшаем цифру в графе кол-во на 1
            countTd.textContent--;
        }
    },

    /**
     * Метод удаляет продукт из объекта с продуктами.
     * @param {string} id
     */
    removeProductFromObject(id) {
        // проверяем по id продукта кол-во (по аналогии с removeProductFromBasket)
        if (this.products[id].count == 1) {
            delete this.products[id];
        } else {
            this.products[id].count--;
        }
    },

    /**
     * Добавляем слушателей события клика по кнопкам удалить.
     */
    addRemoveBtnsListeners() {
        // получаем все кнопки
        let btns = document.querySelectorAll('.productRemoveBtn');
        // итерируемся по ним (перебираем их по порядку)
        for (let i = 0; i < btns.length; i++) {
            // каждую кнопку назначаем слушателем события "клика"
            // и в качестве обработчика клика применяем к ней метод removeProductListener
            //важно указать именно this.removeProductListener, чтобы это была одна и та же
            //функция, а не несколько одинаковых.
            btns[i].addEventListener('click', this.removeProductListener);
        }
    },

    /**
     * Метод отображает общую сумму заказа в корзине.
     */
    renderTotalSum() {
        // находим элемент с классом total и в его свойство textContent записываем значение общ суммы
        document.querySelector('.total').textContent = this.getTotalSum();
    },


    /**
     * Метод считает стоимость всех продуктов в корзине.
     * @returns {number}
     */
    getTotalSum() {
        let sum = 0;                        // нач знач-е суммы
        // итерируемся по объекту в корзине и получаем его "ключи" его элементов  (id номера атрибутов в коллекции корзины)
        for (let key in this.products) {
            // в общую сумму складываем все значения цен товаров * на кол-во
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },


    /**
     * Метод добавляет продукт в объект с продуктами.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProductToObject(product) {
        //  если id неопределен, нет его в корзине, то
        if (this.products[product.id] == undefined) {
            // записываем его атрибуты в свойства и задаём кол-во 1
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                count: 1
            }
        } else {
          // иначе просто увеличиваем количество
            this.products[product.id].count++;
        }
    },

    /**
     * Метод отрисовывает продукт в корзине, если там такой уже есть просто
     * увеличивает счетчик на 1.
     * @param {{ id: string, price: string, name: string }} product
     * @returns
     */
    renderProductInBasket(product) {
        // проверяем есть ли id продукта в корзине
        let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);
        // если есть, увеличиваем счетчик на 1
        if (productExist) {
            productExist.textContent++;
            return; // и выходим из метода
        }
        // если такого продукта не обнаружено
        // в переменную productRow присваивается строка таблицы с шапкой
        // которая будет встраиваться в html-разметку
        // стр 79 создаём элемент с id и кол-вом 1
        // стр 80 отрисовываем иконку для удаления из корзины
        let productRow = `
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>                
                <td class="productCount" data-id="${product.id}">1</td>                 
                <td><i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i></td>
            </tr>
        `;
        // находим тег tbody
        let tbody = document.querySelector('tbody');
        // встваляем разметку перед закрывающим тегом
        tbody.insertAdjacentHTML("beforeend", productRow);
    },

};
