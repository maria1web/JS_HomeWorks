class Score {
    constructor() {
        this.currentEl = document.querySelector('.current');    // получаем тек.счет (currentEl)
        this.toWinEl = document.querySelector('.toWin');        // получаем остаток очков до выигрыша(toWinEl)
    }

    /**
     * @param {Settings} settings настройки игры
     */
    init(settings) {
        this.settings = settings;
    }

    /**
     * Метод устанавливает текущий счет игрока.
     * @param {string} text
     */
    setCurrent(text) {
        this.currentEl.textContent = text;
    }

    /**
     * Метод устанавливает количество очков, необходимых
     * для выигрыша.
     * @param {string} text
     */
    setToWin(text) {                   // получаем текст
        this.toWinEl.textContent = text;        // записываем его в toWinEl
    }
}