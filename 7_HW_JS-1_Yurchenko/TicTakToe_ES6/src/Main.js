// после запуска (load) запускаются все классы и методы
window.addEventListener('load', function() {
    const game = new Game();        // создаём класс Игры
    const board = new Board();      // создаём класс игрового поля
    const status = new Status();    // создаём класс статуса игры

    board.init(game, status);       // передача параметров в board
    game.init(status, board);        // передача параметров в game

    board.renderMap();              // метод отрисовывающий игр поле
    board.initEventHandlers();      // назначаем слушателей события
});