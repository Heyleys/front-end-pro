"use strict"

function getApiDataByUrl (url) {
    preloader.setAttribute('style','display: block');
    return fetch(url);
}

const preloader = document.getElementById('preloader');
const categoriesBox = document.getElementById("categories");
const OpencategoriesBox = document.getElementById("open-category");
const OpenElementBox = document.getElementById("open-element");
let categoriesArray = [];
let currentCategory = [];

getApiDataByUrl ("https://swapi.dev/api/")
.then((response) => {
    return response.json();
  })
    .then(function(res){
        preloader.setAttribute('style','display: none');
        const data = res;
        for (var key in data) {
            let tempObject = {
                url: data[key],
                name: key,
            }
            categoriesArray.push(tempObject);
        }
        categoriesBox.innerHTML = '';
        for (var key in categoriesArray) {
            categoriesBox.innerHTML += createButton(categoriesArray[key].name); 
        }
    });

categoriesBox.addEventListener("click", function(e){
    OpenElementBox.innerHTML = '';
    for(let i = 0; i < categoriesBox.children.length; i++) {
        categoriesBox.children[i].classList.remove("selected");
        if (categoriesBox.children[i] === e.target){
            categoriesBox.children[i].classList.add("selected");
            getApiDataByUrl (categoriesArray[i].url)
            .then((response) => {
                return response.json();
                })
            .then(function(data){
                preloader.setAttribute('style','display: none');
                OpencategoriesBox.innerHTML = "";
                currentCategory = data.results;
                currentCategory.forEach(element => {
                    OpencategoriesBox.innerHTML += createButton(element.name || element.title || "not name, not title found");
                });
                document.getElementById("title_open_category").innerText = categoriesArray[i].name;  
            })
        }
    }
})

function createButton (content) {
    return `<button class="categories-btn">${content}</button>`
}

OpencategoriesBox.addEventListener("click", function(e){
    OpenElementBox.innerHTML = '';
    for(var index = 0; index < OpencategoriesBox.children.length; index++) {
        OpencategoriesBox.children[index].classList.remove("selected");
        if(OpencategoriesBox.children[index] === e.target){
            document.getElementById("title_open_element").innerText = currentCategory[index].name || currentCategory[index].title;
            OpencategoriesBox.children[index].classList.add("selected");
            for (var key in currentCategory[index]) {
                if(key !== 'films' && key !== 'starships' && key !== 'vehicles' &&  key !== 'url' &&  key !== 'species' &&  key !== 'homeworld'){
                    OpenElementBox.innerHTML += `<div class="sort"><span>${key}</span><span class="brake">:</span><span>${currentCategory[index][key]}</span></div>`; 
                }
            }
        }
    }
});