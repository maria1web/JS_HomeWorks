class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];      // массив с направлениями движения

        this.body = [{          // массив с координатами движения
            x: 1,
            y: 1,
        }];

        this.direction = 'down';
    }

    /**
     * @param {Settings} settings настройки игры
     */
    init(settings) {
        this.settings = settings;
    }

    /**
     * Меняем направление движения.
     * @param {string} newDirection направление может быть down, up, left, right.
     * @throws {Error} при передаче не корректного направления выбрасывается ошибка.
     */
    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) { // проверяе корректное ли направление передано
            throw new Error('Передано не верное направление. Вы передали: ' + newDirection);
        }
        if (this.isPassedOppositeDirection(newDirection)) {  // проверяем не передано ли противоположное движению направление
            return;
        }
        this.direction = newDirection;
    }

    /**
     * Метод проверяет, является ли переданное направление, противоположным
     * тому куда сейчас движется змейка.
     * @param {string} newDirection новое направление, может быть up, down, right, left.
     * @returns {boolean} true если новое направление противоположно текущему,
     * иначе false.
     */
    isPassedOppositeDirection(newDirection) {
        if (this.direction == 'down' && newDirection == 'up') {
            return true;
        }
        if (this.direction == 'up' && newDirection == 'down') {
            return true;
        }
        if (this.direction == 'left' && newDirection == 'right') {
            return true;
        }
        if (this.direction == 'right' && newDirection == 'left') {
            return true;
        }
        return false;
    }

    /**
     * Метод осуществляет шаг змейки. Добавляет ячейку перед существующим
     * положением головы и удаляет одну ячейку в хвосте.
     */
    performStep() {
        let currentHeadCoords = this.body[0];  // берем текущее положение змеиной головы
        let newHeadCoords = {                  // создаём объект с новыми координатами
            x: currentHeadCoords.x,
            y: currentHeadCoords.y,
        };
        // передвигаем эти нов коорд в зависимости от выбранного напрваления:
        switch (this.direction) {
            case "down":
                newHeadCoords.y++;
                break;
            case "up":
                newHeadCoords.y--;
                break;
            case "left":
                newHeadCoords.x--;
                break;
            case "right":
                newHeadCoords.x++;
                break;
        }

        //если голова уходит за правый край
        if (newHeadCoords.x > this.settings.colsCount) {  // проверяем если коорд Х больше кол-ва колонок
            newHeadCoords.x = 1;                // тогда новая коорд по Х у головы теперь = 1
        }
        //если голова уходит за нижний край
        if (newHeadCoords.y > this.settings.rowsCount) {
            newHeadCoords.y = 1;
        }
        //если голова уходит за левый край
        if (newHeadCoords.x == 0) {
            newHeadCoords.x = this.settings.colsCount;
        }
        //если голова уходит за верхний край
        if (newHeadCoords.y == 0) {
            newHeadCoords.y = this.settings.rowsCount;
        }

        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    /**
     * Метод дублирует в массиве объектов представляющих тело змейки
     * последнюю ячейку, т.е. в массиве в конце оказываются два
     * одинаковых объекта. Когда метод performStep в самом конце
     * удаляет последний элемент массива, он удаляет сдублированный
     * объект, таким образом тело змейки растет.
     */
    increaseBody() {
        // обращаемся к массиву body в bodyLastCell сохраняем последний элемент
        let bodyLastCell = this.body[this.body.length - 1];
        let newBodyLastCell = { // копируем координаты bodyLastCell в переменную newBodyLastCell
            x: bodyLastCell.x,
            y: bodyLastCell.y,
        };
        this.body.push(newBodyLastCell); // добавляем newBodyLastCell в конец массива body
    }
}
