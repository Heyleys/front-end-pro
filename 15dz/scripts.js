'use strict'

let arrayOfCommentsObjects = getCommentsFromStorage();
let templateComment = getCommentTemplate();
let validationErrors = [];
let range = null;

function getRange(elem) { 
    if((elem.tagName === "TEXTAREA" && elem.id === 'comment')) {
        return [elem.selectionStart,elem.selectionEnd];
    }
    return null;
}

function getSelect(){
    return getRange(document.activeElement);
}

function rangeCheck(){
    if(range !== null && range[0] !== range[1]){
        return true;
    }
    return false;
}
  function replaceWith(chars){
      if(rangeCheck()){
            let string = document.getElementById("comment").value;
            string = [string.slice(0, range[0]), chars, string.slice(range[0])].join('');
            let output = [string.slice(0, range[1]+2), chars, string.slice(range[1]+2)].join('');
            document.getElementById("comment").value = output;
          
      }
  }

  function makeBold(){
      if(rangeCheck()){
        replaceWith('**');
      }
  }

  function makeCursive(){
    if(rangeCheck()){
        replaceWith('__');
    }
  }

  function makeCrossed(){
    if(range !== null){
        replaceWith('--');    
    }
  }

  document.getElementById('makeBold').addEventListener('click', function(event){
    event.preventDefault();
    makeBold();
  });

  document.getElementById('makeCursive').addEventListener('click', function(event){
    event.preventDefault();
    makeCursive();
  });

  document.getElementById('makeCrossed').addEventListener('click', function(event){
    event.preventDefault();
    makeCrossed();
  });

function getCommentTemplate() {
    let templateCommentPlaceholder = document.getElementById("comment-list");
    let template = templateCommentPlaceholder.innerHTML;
    templateCommentPlaceholder.innerHTML = '';
    return template;
}

function parseBody(body){    
    //Игнорировать html тэги, введенные пользователем в тело комментария
    body = body.replace(/<[A-Za-z]+>/g, "");
    body = body.replace(/<[\/A-Za-z]+>/g, "")

    //ссылки вида http://google.com должны автоматически определяться, сохраняться как html тэг и по нажатию открывать ссылку
    let arrayOfLinks = body.match(/https?:\/\/.+?\.\w+/g);
    if(arrayOfLinks !== null){
        arrayOfLinks.forEach((link) => {
            body = body.replace(link, "<a target='_blank' href='"+link+"'>"+link+"<\/a>");
        });
    }

    //**ТЕКСТ** жирный текст // --ТЕКСТ-- перечеркнутый текст // __ТЕКСТ__ курсив
    let arrayOfFats = body.match(/\*\*.*\*\*/g);
    let trimmedleft, trimmedright;
    if(arrayOfFats !== null){
        arrayOfFats.forEach((string) => {
            trimmedleft = string.substring(2);
            trimmedright = trimmedleft.substring(0,trimmedleft.length - 2);
            body = body.replace(string, "<b>"+trimmedright+"<\/b>");
        });
    }

    let arrayOfCrossed = body.match(/\-\-.*\-\-/g);
    if(arrayOfCrossed !== null){
        arrayOfCrossed.forEach((string) => {
            trimmedleft = string.substring(2);
            trimmedright = trimmedleft.substring(0,trimmedleft.length - 2);
            body = body.replace(string, "<strike>"+trimmedright+"<\/strike>");
        });
    }
    
    let arrayOfCursive = body.match(/\_\_.*\_\_/g);
    if(arrayOfCursive !== null){
        arrayOfCursive.forEach((string) => {
            trimmedleft = string.substring(2);
            trimmedright = trimmedleft.substring(0,trimmedleft.length - 2);
            body = body.replace(string, "<i>"+trimmedright+"<\/i>");
        });
    }

    return body;
}



function replaceCommentTemplateWithCommentObject (comment) {

let parsedTemplate = templateComment.replace("{{comment_name}}", comment.name);
    parsedTemplate = parsedTemplate.replace("{{comment_date}}", comment.date);
    parsedTemplate = parsedTemplate.replace("{{comment_body}}", comment.body);
    parsedTemplate = parsedTemplate.replace("{{comment_isEdited}}", comment.isEdited ? "Редактировано" : "");
    return parsedTemplate;
}

function renderNewComment(newComment) {
    let newCommentsHtml = replaceCommentTemplateWithCommentObject(newComment);
    let templateCommentPlaceholder = document.getElementById("comment-list");
    templateCommentPlaceholder.innerHTML += newCommentsHtml;
}

function createCommentObject() {
let parsedBody = parseBody(document.getElementById("comment").value.trim());

const date = new Date();
   return {
        name: document.getElementById("user_name").value.trim(),
        body: parsedBody,
        date: date.getDate()+'.'+ date.getMonth()+'.'+date.getFullYear(),
        isEdited: false,
    } 
}

function setCommentsToStorage() {
    localStorage.setItem('comments', JSON.stringify(arrayOfCommentsObjects));
}

function getCommentsFromStorage() {
    if(localStorage.getItem('comments') !== null){
        return JSON.parse(localStorage.getItem('comments'));
    }
    return [];
}

function pushCommentObjectToCommentArray(objectComment) {
    arrayOfCommentsObjects.push(objectComment);
    setCommentsToStorage();
}

let addCommentButton = document.getElementById("send_button");
addCommentButton.addEventListener("click", function () {
    let commentObject = createCommentObject();
    let validationResult = validateComment(commentObject.name, commentObject.body);
    let errorsBlock = document.getElementById('errors');
    errorsBlock.innerHTML = '';
    if(validationResult === true){
        pushCommentObjectToCommentArray(commentObject);
        renderNewComment(commentObject);
    } else if(validationResult.length > 0){
        //show errors
       
        let errors = '';
        validationResult.forEach((error) => {
            errors += '<span class="error valid_name">'+error+'</span>';
        });
        errorsBlock.innerHTML = errors;
    }
    let edit;
    edit = document.getElementById("edit");
    let modal =  document.getElementById("modal");

})

let cancelButton = document.getElementById("cancel_button");
cancelButton.addEventListener("click", function () {
    modal.classList.remove("view");
})


document.getElementById("comment-list").onclick = function(event) {
    if(event.target.className === 'delete'){
        let target = event.target.parentElement.parentElement.parentElement;
        let parent = target.parentElement;
        let index = Array.prototype.indexOf.call(parent.children, target);
        arrayOfCommentsObjects.splice(index,1);
        target.remove();
        setCommentsToStorage();
    } else if(event.target.className === 'edit'){
        let target = event.target.parentElement.parentElement.parentElement;
        let parent = target.parentElement;
        let index = Array.prototype.indexOf.call(parent.children, target);
        document.getElementById('edit-comment-id').value = index;
        let editNameField = document.getElementById('edit-modal-name').value = arrayOfCommentsObjects[index].name;
        let editBodyField = document.getElementById('edit-modal-body').value = arrayOfCommentsObjects[index].body;
        modal.classList.add("view");
    }
  };

document.getElementById("editCommentButton").addEventListener("click", function () {
    let index = document.getElementById('edit-comment-id').value;
    arrayOfCommentsObjects[index].name = document.getElementById('edit-modal-name').value;
    arrayOfCommentsObjects[index].body = document.getElementById('edit-modal-body').value;
    arrayOfCommentsObjects[index].isEdited = true;
    let comments = document.getElementById("comment-list").children;
    comments[index].outerHTML = replaceCommentTemplateWithCommentObject(arrayOfCommentsObjects[index]);
    setCommentsToStorage();
    modal.classList.remove("view");
})

function validate(valueObj, rule) {
    let errors = [];

    if(rule.required === true){
        if(!valueObj.fieldValue){
            errors.push('Поле '+valueObj.fieldName + ' обязательно к заполнению.');
        }
    }
    if(valueObj.fieldValue.length > 0){
        if(rule.minLength && valueObj.fieldValue.length < rule.minLength){
            errors.push('Длина поля ' + valueObj.fieldName + ' должна быть минимум '+rule.minLength+' символов. '+valueObj.fieldValue.length+' дано.');
        }
        if(rule.maxLength && valueObj.fieldValue.length > rule.maxLength){
            errors.push('Длина поля ' +valueObj.fieldName + ' должна быть максимум '+rule.maxLength+' символов. '+valueObj.fieldValue.length+' дано.');
        }
    }
   
    return errors;
}

function init() {
    arrayOfCommentsObjects.forEach((commentObject) => {
        renderNewComment(commentObject);
    });
}

function validateComment(name, body) {
//Custom check for name
//Имя пользователя должно состоять не более, чем из 3х слов и каждое слово должно быть с большой буквы (в противном случае показывать ошибку);
let nameValidation;
if(/^[А-ЯA-Z][a-zа-я]+(\s[A-ZА-Я][a-zа-я]+)?(\s[A-ZА-Я][a-zа-я]+)?$/.test(name)){
    nameValidation = [];
} else {
    nameValidation = ['Имя пользователя должно состоять не более, чем из 3х слов и каждое слово должно быть с большой буквы'];
}

let nameValidation2 = validate({fieldName: 'name', fieldValue: name}, {required: true, minLength: 3, maxLength: 50})
nameValidation = nameValidation.concat(nameValidation2);

let bodyValidation = validate({fieldName: 'body', fieldValue: body}, {required: true, minLength: 2, maxLength: 300})
validationErrors = nameValidation.concat(bodyValidation);
    if(validationErrors.length > 0){
        return validationErrors;
    } else {
        return true;
    }
}

document.addEventListener('selectionchange', () => {
    //Define range of seleted
    range = getSelect();
  });

init();