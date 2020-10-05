'use strict'

let linksList = [];

const el4 = document.querySelectorAll (".list")[0];

let add;

function render(){
    let element, linkAdd, el6;
    el4.innerHTML = '';
    let counter = 0;

    linksList.forEach((value) => {
        element = document.createElement("li");
        linkAdd = document.createElement("a");
        linkAdd.innerText = value;
        linkAdd.setAttribute ("href", value);
        element.appendChild(linkAdd);
        el4.appendChild(element);
        element.setAttribute ("class", "elementOfList");
        el6 = document.createElement("button");
        el6.innerText = 'Удалить';
        el6.setAttribute ("class", "delete-li");
        el6.setAttribute("onclick", "clearListElement(" + counter + ")");
        element.appendChild(el6);

        counter++;
    });     
}

function clearListElement(elementId){
    linksList.splice(elementId, 1);
    render();
}

function getLink () {
    add = prompt('type link');
    if(add !== null && add.trim() !== ''){
        linksList.push(add);
    }
    render();
}

function clearall() {
    linksList = [];
    render();
}