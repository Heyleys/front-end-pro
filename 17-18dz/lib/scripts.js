"use strict";

function getApiDataByUrl(url) {
  preloader.setAttribute('style', 'display: block');
  return fetch(url);
}

var preloader = document.getElementById('preloader');
var categoriesBox = document.getElementById("categories");
var OpencategoriesBox = document.getElementById("open-category");
var OpenElementBox = document.getElementById("open-element");
var categoriesArray = [];
var currentCategory = [];
getApiDataByUrl("https://swapi.dev/api/").then(function (response) {
  return response.json();
}).then(function (res) {
  preloader.setAttribute('style', 'display: none');
  var data = res;

  for (var key in data) {
    var tempObject = {
      url: data[key],
      name: key
    };
    categoriesArray.push(tempObject);
  }

  categoriesBox.innerHTML = '';

  for (var key in categoriesArray) {
    categoriesBox.innerHTML += createButton(categoriesArray[key].name);
  }
});
categoriesBox.addEventListener("click", function (e) {
  OpenElementBox.innerHTML = '';

  var _loop = function _loop(i) {
    categoriesBox.children[i].classList.remove("selected");

    if (categoriesBox.children[i] === e.target) {
      categoriesBox.children[i].classList.add("selected");
      getApiDataByUrl(categoriesArray[i].url).then(function (response) {
        return response.json();
      }).then(function (data) {
        preloader.setAttribute('style', 'display: none');
        OpencategoriesBox.innerHTML = "";
        currentCategory = data.results;
        currentCategory.forEach(function (element) {
          OpencategoriesBox.innerHTML += createButton(element.name || element.title || "not name, not title found");
        });
        document.getElementById("title_open_category").innerText = categoriesArray[i].name;
      });
    }
  };

  for (var i = 0; i < categoriesBox.children.length; i++) {
    _loop(i);
  }
});

function createButton(content) {
  return "<button class=\"categories-btn\">".concat(content, "</button>");
}

OpencategoriesBox.addEventListener("click", function (e) {
  OpenElementBox.innerHTML = '';

  for (var index = 0; index < OpencategoriesBox.children.length; index++) {
    OpencategoriesBox.children[index].classList.remove("selected");

    if (OpencategoriesBox.children[index] === e.target) {
      document.getElementById("title_open_element").innerText = currentCategory[index].name || currentCategory[index].title;
      OpencategoriesBox.children[index].classList.add("selected");

      for (var key in currentCategory[index]) {
        if (key !== 'films' && key !== 'starships' && key !== 'vehicles' && key !== 'url' && key !== 'species' && key !== 'homeworld') {
          OpenElementBox.innerHTML += "<div class=\"sort\"><span>".concat(key, "</span><span class=\"brake\">:</span><span>").concat(currentCategory[index][key], "</span></div>");
        }
      }
    }
  }
});