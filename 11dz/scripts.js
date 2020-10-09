'use strict'

let sliderLiItem, currentLiElementNumber, miniaturesContainer, miniature, clickedImage;

let sliderContainer = document.querySelector(".your-class");
let sliderCollection = sliderContainer.children;
let sliderData = [];
for (let item of sliderCollection) {
    let imageData = {};
    imageData.imagePath = item.firstElementChild.getAttribute("src");

    sliderData.push(imageData);
}

sliderContainer.innerHTML = '';

let sliderUl = document.createElement("ul");
sliderUl.setAttribute("id","slides");
miniaturesContainer = document.createElement("div");
miniaturesContainer.classList.add("container-mini");
sliderData.forEach((element, index) => {
    currentLiElementNumber = index + 1;
    sliderLiItem = document.createElement("li");
    sliderLiItem.classList.add("slide");
    sliderLiItem.classList.add("img");
    if(currentLiElementNumber === 1){
        sliderLiItem.classList.add("showing");
    }
    sliderLiItem.setAttribute("id","photo"+currentLiElementNumber);
    sliderLiItem.style.backgroundImage = "url('"+element.imagePath+"')";

    miniature = document.createElement("div");
    miniature.classList.add("mini");
    miniature.classList.add("img");
    miniature.setAttribute("id","miniature"+currentLiElementNumber);
    miniature.style.backgroundImage = "url('"+element.imagePath+"')";

    sliderUl.appendChild(sliderLiItem);
    miniaturesContainer.appendChild(miniature);
});

let previousButton = document.createElement("button");
previousButton.classList.add("controls");
previousButton.setAttribute("id","previous");

let nextButton = document.createElement("button");
nextButton.classList.add("controls");
nextButton.setAttribute("id","next");

sliderContainer.appendChild(sliderUl);
   
sliderContainer.appendChild(previousButton);
sliderContainer.appendChild(nextButton);

sliderContainer.appendChild(miniaturesContainer);


sliderData.forEach((element, index) => {
    currentLiElementNumber = index + 1;
    document.getElementById("photo"+currentLiElementNumber).addEventListener("click" , createModal);
    document.getElementById("photo"+currentLiElementNumber).addEventListener("click" , () => {
        clickedImage = document.getElementById("modal-style");
        clickedImage.setAttribute("class","img");
        clickedImage.style.backgroundImage = "url('"+element.imagePath+"')";
    });

    document.getElementById("miniature"+currentLiElementNumber).addEventListener("click" , () => {
        goToSlide(index);
    });
  
});

function createModal() {
    const modal = document.createElement("div");
    modal.id = "modal-style";
    const close = document.createElement("button");
    modal.appendChild(close);
    close.classList.add("style-close-button");
    close.innerText = "X";
    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";
    wrapper.appendChild(modal);
    modal.addEventListener("click", function(e){
        e.stopPropagation();
    });

    document.body.appendChild(wrapper);
    wrapper.addEventListener("click", function (){
        this.remove();
    })
    close.addEventListener("click", function (){
        wrapper.remove();
    })
}

var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;

function nextSlide() {
    goToSlide(currentSlide+1);
}
 
function previousSlide() {
    goToSlide(currentSlide-1);
}
 
function goToSlide(n) {
    slides[currentSlide].classList.remove("showing");
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].classList.add("showing");
}

var next = document.getElementById('next');
var previous = document.getElementById('previous');
 
next.onclick = function() {
    nextSlide();
};
previous.onclick = function() {
    previousSlide();
};

