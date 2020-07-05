class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');      // получаем ссылки на кнопки Старт и Пауза
        this.pauseBtnEl = document.getElementById('pauseBtn');
    }

    /**
     * Метод назначает переданные функции в качестве обработчиков
     * событий клика на кнопки "Старт" и "Пауза".
     * @param {Function} startBtnClickHandler
     * @param {Function} pauseBtnClickHandler
     */
    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {      // при кликах вызываем функции
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }
}