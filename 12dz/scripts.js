'use strict'
var todo_list = ['Вымыть пол'];
var done_list = [];
var removed_list = [];

const appTemplate = `
<div class="wrapper">
    <div class="header todo_list">
        <h1>Список дел</h1>
        <input type="text" placeholder="Введите новое дело..." id="toDoEl">
        <span class="addBtn" onclick="addToTodoList()">Добавить</span>
    </div>{{todo_list}}<div class="header done_list">
        <h1>Выполненные</h1>
    </div>
    {{done_list}}
    <div class="header removed_list">
        <h1>Удаленные</h1>
    </div>
    {{removed_list}}
</div>
`;

function renderApp(){
    var template = appTemplate;
    template = template.replace('{{todo_list}}',buildTodoList(todo_list));
    template = template.replace('{{done_list}}',buildDoneList(done_list));
    template = template.replace('{{removed_list}}',buildRemovedList(removed_list));
    document.body.innerHTML = template;
}

renderApp();

function buildTodoList(todo_array){
    var ul = document.createElement('ul');
    ul.classList.add('todo_list');
    todo_array.forEach((element, index) => {
        var li = document.createElement('li');
        var listContent = `<input type="checkbox" onclick="addItemToCompleted(${index})" /><span class="item">${element}</span><button class="delete-button" onclick="addItemToRemoved(${index})" >X</button>`;
        li.innerHTML = listContent;
        ul.appendChild(li);
    });
    return ul.outerHTML;
}

function buildDoneList(todo_array){
    var ul = document.createElement('ul');
    ul.classList.add('done_list');
    todo_array.forEach((element, index) => {
        var li = document.createElement('li');
        var listContent = `<input type="checkbox" onclick="addItemToTodo(${index})" checked /><span class="item">${element}</span>`;
        li.innerHTML = listContent;
        ul.appendChild(li);
    });
    return ul.outerHTML;
}

function buildRemovedList(todo_array){
    var ul = document.createElement('ul');
    ul.classList.add('removed_list');
    todo_array.forEach((element, index) => {
        var li = document.createElement('li');
        var listContent = `<span class="crossed item">${element}</span> <button class="delete-button" onclick="removeForever(${index})" >X</button>`;
        li.innerHTML = listContent;
        ul.appendChild(li);
    });
    return ul.outerHTML;
}

function addToTodoList(template) {
    var inputValue = document.getElementById('toDoEl').value;
    if(inputValue == "") {
       alert("Введите ваше дело!");
    } else {
        todo_list.push(inputValue);
        renderApp();
    }
}

function addItemToRemoved(id){
    removed_list.push(todo_list[id]);
    todo_list.splice(id, 1);
    renderApp();
}

function addItemToCompleted(id){
    done_list.push(todo_list[id]);
    todo_list.splice(id, 1);
    renderApp();
}

function addItemToTodo(id){
    todo_list.push(done_list[id]);
    done_list.splice(id, 1);
    renderApp();
}

function removeForever(id){
    removed_list.splice(id, 1);
    renderApp();
}