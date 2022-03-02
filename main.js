'use strict';

const slides = document.querySelectorAll(".slide"),
slider = document.querySelector('.slide-wrapper'),
sliderWrapInn = document.querySelector(".slide-wrapper-inner"),
sliderWrapper = document.querySelector(".flex-wrapper"),
prev = document.querySelector('[data-slide="prev"]'),
next = document.querySelector('[data-slide="next"]'),
total = document.querySelector('#total'),
current= document.querySelector('#current'),
dots = document.querySelectorAll(".dot"),
dotsWrapper = document.querySelector(".dots-wrapper"),
width = window.getComputedStyle(slider).width,
slideWidth = slides[0].offsetWidth;

let slideIndex = 1;
let offset = 0;
let x1 = null;
let y1 = null;
let posThreshold = slideWidth * 0.1;


next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

document.addEventListener('touchstart', function(event){
    const firstTouch = event.touches[0];
    x1 = firstTouch.pageX;
    y1 = firstTouch.pageY;

}, false );

document.addEventListener('touchmove', function (event){
 if ( !x1 || !y1 ) {
     return false;
 }
 let x2 = event.touches[0].pageX;
 let y2 = event.touches[0].pageY;

 let xDiff = x2 - x1;
 let yDiff = y2 - y1;

 if (Math.abs(xDiff)>Math.abs(yDiff)) {
     if ( xDiff >= posThreshold ) nextSlide();
     else prevSlide();
  x1 = null;
  y1 = null;
}, false);


function init() {
    console.log('resize');
    slideWidth; 
    sliderWrapInn.style.width = width*slides.length+'px';
    slides.forEach (item => {
        item.style.width = width+'px';
        });
        rollSlide();
}

window.addEventListener('resize', init);
init();

function rollSlide() {
    sliderWrapInn.style.transform = 'translate(-' + slideIndex*width + 'px)';
}

if ( slides.length<10 ) {
    total.textContent =`0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;

}

sliderWrapInn.style.width = 25*slides.length + '%',
sliderWrapInn.style.display = 'flex',
sliderWrapInn.style.transition = '0.5s all';

slides.forEach (slide=> {
    slide.style.width = width;
});

function nextSlide() {
if (offset == +width.slice(0,width.length - 2) * (slides.length - 1)){
    offset = 0;
} else {
    offset += +width.slice(0,width.length - 2);
}
sliderWrapInn.style.transform = `translateX(-${offset}px)`;
if ( slideIndex == slides.length ) {
    slideIndex = 1;
    } else {
    slideIndex++;
    }
    rollSlide();
if ( slides.length<10 ) {
    current.textContent =`0${slideIndex}`;
 } else {
  current.textContent = slideIndex;
  }  
  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex - 1].style.opacity = 1;   
}

function prevSlide() {
    if (offset == 0) {
        offset = +width.slice(0,width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0,width.length - 2);
    }
    sliderWrapInn.style.transform = `translateX(-${offset}px)`;
    if ( slideIndex == 1 ) {
        slideIndex = slides.length;
        } else {
        slideIndex--;
        }
        rollSlide();
    if ( slides.length<10 ) {
        current.textContent =`0${slideIndex}`;
     } else {
      current.textContent = slideIndex;
      }        
       dots.forEach(dot => dot.style.opacity = '.5');
       dots[slideIndex - 1].style.opacity = 1;
}

dots.forEach (dot => {
  dot.addEventListener('click', (e) => {
  let slideTo = e.target.getAttribute('data-slide-to');
  

  slideIndex = slideTo;
   offset = +width.slice(0,width.length - 2)* (slideTo  -1 );
    sliderWrapInn.style.transform = `translateX(-${offset}px)`;
    rollSlide();
    if ( slides.length < 10 ) {
     current.textContent = `0${slideIndex}`;
} else {
     current.textContent = slideIndex;
 } 
 dots.forEach(dot => dot.style.opacity = '.5');
 dots[slideIndex - 1].style.opacity = 1;
   });
});

