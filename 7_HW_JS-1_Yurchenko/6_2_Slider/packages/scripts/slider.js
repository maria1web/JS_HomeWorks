document.head.insertAdjacentHTML('afterbegin', '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" crossorigin="anonymous">');

let slider = document.querySelector('.slider'); // див обертки слайдера

// Создаем иконку загрузки
let loadIcon = document.createElement('i'); // создаем объект иконки загрузки = спиннера
loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement('afterbegin', loadIcon); // вставляем его

// Создаем левую стрелку
let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement('beforeend', leftArrow);

// Создаем правую стрелку
let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement('beforeend', rightArrow);

// Ждем когда весь контент целиком загрузится
window.addEventListener('load', function () {
    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    });

    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();
    });

    // Инициализация слайдера, предварительная настройка
    images.init();
    // Скрываем иконку загрузки
    hideLoadIcon(loadIcon);
});

/**
 * Функция скрывает иконку загрузки
 * @param {HTMLElement} loadIcon
 */
function hideLoadIcon(loadIcon) {
    loadIcon.style.display = 'none';
}

/**
 * Функция берет у элемента слайдера его data-атрибуты размеров,
 * и если они определены, то самому слайдеру меняет размеры.
 * @param {HTMLDivElement} slider
 */
function setSizes(slider) {      // устанавливаем нужные нам размеры для слайдера, берём их из дата-атрибутов
    let width = slider.getAttribute('data-width');
    let height = slider.getAttribute('data-height');
    if (width !== null && width !== '') {
        slider.style.width = width;
    }
    if (height !== null && height !== '') {
        slider.style.height = height;
    }
}
setSizes(slider);

// Объект слайдера
let images = {
    /* {int} Номер текущего изображения; получаем коллекцию дивов с изображениями*/
    currentIdx: 0,

    /* {HTMLDivElement[]} slides элементы слайдов; сохраняем ёё в свойство slides */
    slides: [],
    
    /** Получаем все слайды и показываем первый слайд. */
    init() {
        this.slides = document.querySelectorAll('.slider-item');
        this.showImageWithCurrentIdx(); // метод "Покажи картинку из коллекции по текущему индексу"
    },

    /** Берем слайд с текущим индексом и убираем у него класс
     * hidden-slide. Т.О. нужный слайд отображается на экране*/
    showImageWithCurrentIdx() {
        this.slides[this.currentIdx].classList.remove('hidden-slide');
    },

    /** Всем слайдам добавляем класс hidden-slide. */
    hideVisibleImages() {
        document
            .querySelector('.slider-item:not(.hidden-slide)')
            .classList.add ('hidden-slide');

        /*this.slides.forEach(function (slide) {
            slide.classList.add('hidden-slide');
        });*/
    },

    /** Переключиться на предыдущее изображение. */
    setNextLeftImage() {
        this.hideVisibleImages();
        if (this.currentIdx == 0) {             // если мы находимся на самом левом слайде
            this.currentIdx = this.slides.length - 1;  // из длины массива со слайдами (3) вычтем 1 и перейдем на самый правый слайд
        } else {
            this.currentIdx--;              // в противном случае уменьшим индекс слайда на 1
        }
        // анимация перелистывания слайдов влево
        const currentSlide = this.slides[this.currentIdx];   // берем индекс текущего слайда
        currentSlide.classList.add('slider-rightToLeftAnimation'); // в список классов добавляем класс из css slider-rightToLeftAnimation
        currentSlide.classList.remove('hidden-slide');      // удаляя при этом класс hidden-slide у этого слайда
        setTimeout(() => {
            currentSlide.classList.remove('slider-rightToLeftAnimation'); // через полсекунды удаляем класс slider-rightToLeftAnimation
        }, 500);
       // this.showImageWithCurrentIdx();     // отобразим текущий слайд
    },

    /** Переключиться на следующее изображение. */
    setNextRightImage() {
        this.hideVisibleImages();
        if (this.currentIdx == this.slides.length - 1) { // если мы находимся на самом правом слайде (текущий индекс не равен ли 2-ке)
            this.currentIdx = 0;                        // меняем индекс на 0 (самый левый слайд)
        } else {
            this.currentIdx++;          // в противном случае увеличиваем индекс слайда на 1
        }
        // анимация перелистывания слайдов вправо
        const currentSlide = this.slides[this.currentIdx];
        currentSlide.classList.add('slider-leftToRightAnimation');
        currentSlide.classList.remove('hidden-slide');
        setTimeout(() => {
            currentSlide.classList.remove('slider-leftToRightAnimation');
        }, 500);

        //this.showImageWithCurrentIdx();     // отобразим текущий слайд
    },
};
