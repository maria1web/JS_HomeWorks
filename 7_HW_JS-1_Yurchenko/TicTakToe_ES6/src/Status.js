class Status {
    constructor() {
        this.status = 'playing';    // в статусе playing храними значения полей и текущая фаза хода
        this.mapValues = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.phase = 'X';
    }

    /**
     * Проверка что мы "играем", что игра не закончена.
     * @returns {boolean} Вернет true, статус игры "играем", иначе false.
     */
    isStatusPlaying() {
        return this.status === 'playing';
    }

    /**
     * Ставит статус игры в "остановлена".
     */
    setStatusStopped() {
        this.status = 'stopped';
    }

    /**
     * Меняет фигуру (крестик или нолик).
     */
    togglePhase() { // меняем фазу хода
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
}