'use strict'
const modWind = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const showWindBtn = document.querySelector('.show-btn');

closeBtn.addEventListener('click', function(){
    modWind.classList.remove('vanishIn');
    modWind.classList.add('vanishOut');
    setTimeout(function() {modWind.classList.add('hidden')
    }, 1000);

    showWindBtn.classList.remove('vanishOut', 'hidden');
    showWindBtn.classList.add('magictime', 'vanishIn');
});

showWindBtn.addEventListener('click', function(){
    modWind.classList.remove('vanishOut','hidden');
    modWind.classList.add('magictime', 'vanishIn');

    showWindBtn.classList.remove('vanishIn');
    showWindBtn.classList.add('vanishOut');
    setTimeout(function() {showWindBtn.classList.add('hidden')
    }, 1000);
});

document.addEventListener('pageshow', function(){
    showWindBtn.classList.remove('hidden')
})





