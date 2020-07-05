'use strict';

function Post(author, text) {       // создание функции-конструктора (шаблона объекта) для создания объектов типа Post
                                    // с орпеделенными данными и поведением (методы)
    this.author = author;           // this-ключевое слово имени(перем) того объекта, который будет использовать эту ф-ю
                                    // this помогает избежать дублирования кода
    this.text = text;               // author и text - свойства объекта
    this.show =  function (){       // добавление метода (функции объекта, оперирующей его св-вами),
                                    // можно без слова function:    show: () {...} или this.show = () {...}
        alert (this.author + ' says: '+ this.text + '!');
    }
}

const post1 = new Post('Admin', 'я - суперадмин');  // вызываем ф-к с помощью ключ.слова new,
      post1.show();                               // передавая ему параметры свойств. show это тоже свойство объекта
     // ф-к возвращает новый готовый объект (писать return не нужно)
     // + появится сообщение: Admin says: я - суперадмин.

console.log(post1.author);       // Admin        - вызов объекта с определённым свойством.
console.log(post1.text);        // я - суперадмин

const post2 = new Post('User', 'я - суперюзер');
      post2.show();         // появится сообщение: User says: я - суперюзер.

console.log(post2.author);      // User
console.log(post2.text);        // я - суперюзер