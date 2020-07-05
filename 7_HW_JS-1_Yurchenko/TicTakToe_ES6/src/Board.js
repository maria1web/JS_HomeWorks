class Board {
    constructor() { // записывает в св-ва нового объекта
                    // ссылку на сам эл-т игрового поля
        this.gameTableElement = document.getElementById('game');
    }


    /**
     * @param {Game} game
     * @param {Status} status
     */
    // инициализируем передачу параметров в класс Board из Game и Status
    init(game, status) {
        this.game = game;
        this.status = status;
    }

    /**
     * Отрисовка игрового поля
     */
    renderMap() {
        for (let row = 0; row < 3; row++) {     // создаем строку
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {     // добавляем в строку столбцы
                let td = document.createElement('td');
                td.dataset.row = row.toString();    // добавляем на страницу строки
                td.dataset.col = col.toString();     // добавляем на страницу столбцы
                tr.appendChild(td);
            }
        }
    }

    /**
     * Инициализация обработчиков событий.
     */
    initEventHandlers() { //назначаем на таблицу обработчик соб клика и при клике сработает метод cellClickHandler
        // Ставим обработчик, при клике на таблицу вызовется функция this.cellClickHandler.
        this.gameTableElement.addEventListener('click', event => this.game.cellClickHandler(event));
    }

    /**
     * Проверка что клик был по ячейке.
     * @param {Event} event
     * @param {HTMLElement} event.target
     * @returns {boolean} Вернет true, если клик был по ячейке, иначе false.
     */
    isClickByCell(event) {
        return event.target.tagName == 'TD'; // клик именно по тегу TD
    }

    /**
     * Проверка что в ячейку не ставили значение (крестик или нолик).
     * @param {Event} event
     * @param {HTMLElement} event.target
     * @returns {boolean} Вернет true, если ячейка пуста, иначе false.
     */
    isCellEmpty(event) {    // пуста ли ячейка
        // Получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row;    // получаем из события клика коорд строки
        let col = +event.target.dataset.col;    // получаем из события клика коорд столбца


        return this.status.mapValues[row][col] === ''; // и проверяем, что там действительно пусто
    }

    /**
     * Заполняет ячейку в которую кликнул пользователь в событии event.
     * @param {Event} event
     * @param {HTMLElement} event.target
     */
    fillCell(event) {
        // Получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row; // получаем из события клика коорд строки
        let col = +event.target.dataset.col; // получаем из события клика коорд столбца

        // Заполняем ячейку и ставим значение в массиве, в свойстве mapValues.
        // в массив массивов status.mapValues[row][col] с коорд ячейки ставим из status текущую фазу хода (phase) Х или 0
        this.status.mapValues[row][col] = this.status.phase;
        event.target.textContent = this.status.phase; // в свойство textContent ставим фазу
    }

}