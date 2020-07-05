'use strict';
const products = [
    {
        id: 3,
        price: 127,
        photos: ["1.jpg", "2.jpg",]
    },
    {
        id: 5,
        price: 499,
        photos: []
    },
    {
        id: 10,
        price: 26,
        photos: ["3.jpg"]
    },
    {
        id: 8,
        price: 78,
    },
];

let filteredPhotos = products.filter(prod => 'photos' in prod && prod.photos.length > 0);   // фильтрация по наличию фотографий в объекте
                                                                                            // (помимо наличия свойства, проверяем также
                                                                                            // заполненность массива фотками)
console.log(filteredPhotos);

let sortedByPriceLowOnTop = products.sort(function (prodNext, prodFirst) {   // сортировка по возрастанию цены
    return prodNext.price - prodFirst.price;
});
console.log(sortedByPriceLowOnTop);



