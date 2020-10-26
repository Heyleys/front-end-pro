'use strict'
$( document ).ready(function() {
    let edit_comment_index = 0;
    let templateComment = getCommentTemplate();
    let commentsFromLocalStorage = getFromLocalStorage();
    let validationErrors = [];

    commentsFromLocalStorage.forEach((comment) => {
        renderNewComment(comment);
    });

    function getFromLocalStorage(){
        let arr = [];
        if(localStorage.getItem('comments') !== null){
            arr = localStorage.getItem('comments');
            arr = JSON.parse(arr);
        }
        return arr;
    }

    function getCommentTemplate() {
        let template = $('#comment-list').html();
        $('#comment-list').html('');
        return template;
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
        $("#comment-list").append(newCommentsHtml);
        $("#comment-list").children().last().slideDown();
    }
    
    $('#send_button').click(function(){
        var date = moment();

        let newComment = {
            name: $('#user_name').val(),
            body: $('#comment').val(),
            isEdited: false,
            date: date.subtract(10, 'days').calendar(),
        };

        let validationResult = validateComment(newComment.name, newComment.body);
        $('#errors').hide();
        if(validationResult === true){
            renderNewComment(newComment);
            commentsFromLocalStorage.push(newComment);
            localStorage.setItem('comments', JSON.stringify(commentsFromLocalStorage));
        } else if(validationResult.length > 0){
            let errors = '';
            validationResult.forEach((error) => {
                errors += '<span class="error valid_name">'+error+'</span>';
            });
            $('#errors').html(errors);
            $('#errors').slideDown();

        }
        
    });
        
    $('#comment-list').click(function(event){
        if(event.target.id){
            if(event.target.id === 'delete'){
                var allComments = $("#comment-list");
                var search = event.target.parentNode.parentNode.parentNode;
                var delete_comment_index = allComments.children().index(search);
                commentsFromLocalStorage.splice(delete_comment_index, 1);
                localStorage.setItem('comments', JSON.stringify(commentsFromLocalStorage));
                var deletedChild = $('#comment-list').children().eq(delete_comment_index);
                deletedChild.slideUp();
            } else if (event.target.id === 'edit'){
                $('#modal').fadeIn();
                var allComments = $("#comment-list");
                var search = event.target.parentNode.parentNode.parentNode;
                var eci = allComments.children().index(search);
                $('#edit-modal-name').val($('#comment-list').children().eq(eci).find('.name').html());
                $('#edit-modal-body').val($('#comment-list').children().eq(eci).find('.comment-body').html());
            
                edit_comment_index = allComments.children().index(search);
            }
        }        
    });
    
    $('#cancel_button').click(function(){
        $('#modal').fadeOut();
    });

    $('#editCommentButton').click(function(){
        var editedChild = $('#comment-list').children().eq(edit_comment_index);
        editedChild.find('.name').html($('#edit-modal-name').val());
        editedChild.find('.comment-body').html($('#edit-modal-body').val());
        editedChild.find('.edited').html('Отредактировано');
        commentsFromLocalStorage[edit_comment_index].name = $('#edit-modal-name').val();
        commentsFromLocalStorage[edit_comment_index].body = $('#edit-modal-body').val();
        commentsFromLocalStorage[edit_comment_index].isEdited = true;
        localStorage.setItem('comments', JSON.stringify(commentsFromLocalStorage));
        $('#modal').fadeOut();
    });

    function validateComment(name, body) {
        let nameValidation = validate({fieldName: 'name', fieldValue: name}, {required: true, minLength: 3, maxLength: 50})
        let bodyValidation = validate({fieldName: 'body', fieldValue: body}, {required: true, minLength: 2, maxLength: 300})
        validationErrors = nameValidation.concat(bodyValidation);
            if(validationErrors.length > 0){
                return validationErrors;
            } else {
                return true;
            }
    }

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
});