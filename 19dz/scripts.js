'use strict'
const initiatedAccordions = [];
let currentAccordionsId = null;

class Accordion {
    
    constructor(element){
        this.title = element;
        this.body = element.getElementsByClassName('body')[0].innerText;
        if(element.getElementsByClassName('body')[0].classList.contains('show')){
            this.state = 'opened';
        } else if(element.getElementsByClassName('body')[0].classList.contains('hide')){
            this.state = 'closed';
        }
    }

    toggle(){
        this.state == 'closed' ? this.open() : this.close();
    }

    open(){
        this.title.lastElementChild.classList.toggle("hide");
        this.title.lastElementChild.classList.toggle("show");
        this.title.firstElementChild.classList.add("open");
        this.state = 'opened';
    }

    close(){
        this.title.lastElementChild.classList.toggle("show");
        this.title.lastElementChild.classList.toggle("hide");
        this.title.firstElementChild.classList.remove("open");
        this.state = 'closed';
    }

}

function initAccordion(e){
    if(initiatedAccordions[e.target.parentElement.id] === undefined){
        initiatedAccordions[e.target.parentElement.id] = new Accordion(e.target.parentElement);
    }
}

document.getElementById('accordion').addEventListener("click", function(e){
    if(e.target.parentElement.classList.contains('category')){
        initAccordion(e);
        currentAccordionsId = e.target.parentElement.id;
        initiatedAccordions[currentAccordionsId].toggle();
    }
});
