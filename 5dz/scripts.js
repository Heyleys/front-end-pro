'use strict'

let operator;
let number;
let numbers = [];

function checkIsOperatorValid (operator) {
    if (operator === "+" || operator === "*"){
        return true;
    }
    alert('Оператор не найден, введите заново.');
    return false;
}

function checkIsOperandValid (number) {
    if (!number || number % 1 != 0 || number.length > 6 || isNaN(+number) || number === Infinity || number < Number.MIN_SAFE_INTEGER || number > Number.MAX_SAFE_INTEGER) {
        alert('Не валидное значение, введите заново.');
        return false;
    }
    return true;
}

const sum = (numbersArray = []) => {
    if(Array.isArray(numbersArray)){
        let result = 0;
        for (let i = 0; i < numbersArray.length; i++) {
            result += numbersArray[i];
        }
        return result;
    } else {
        message('Не валидное значение. Должен быть массив');
    }
}

const mult = (numbersArray = []) => {
    if(Array.isArray(numbersArray)){
        let result = 1;
        for (let i = 0; i < numbersArray.length; i++) {
            result *= numbersArray[i];
        }
        return result;
    } else {
        message('Не валидное значение. Должен быть массив');
    }
}

function defineArithmeticFunction (operator) {
    switch (operator) {
        case '+':
            return sum;
        case '*':
            return mult;
    }    
}

function getUserData(message, validationCallback){
    let Input = prompt(message);
    if(Input === null){
        return null;
    }
    if(validationCallback(Input.trim())){
        return Input.trim();
    }
    return false;
}

function collectNumbers(input){
    if(input){
        numbers.push(Number(input));
    }
}

function resultValidation (result) {
    if (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER) {
        alert("Число выходит за рамки допустимых значений");
        return false;
    }
    return true;
}

function message (text) {
    alert(text);   
}

function calculate(numbers = [], callback){
    return callback(numbers);
}

do {
    operator = getUserData('Введите оператор (* or +)', checkIsOperatorValid);
} while(!(operator || operator === null))
const arithmeticCallback = defineArithmeticFunction (operator);

if(operator){
    do {
        number = getUserData('Введите число. Нажмите отмену для завершения операции (не менее 2х значений)', checkIsOperandValid);
        collectNumbers(number);
    } while(!(number === null))
    
    let result = calculate(numbers, arithmeticCallback);
    
    if(resultValidation(result) && numbers.length > 1){
        message(numbers.join(' ' + operator + ' ') +' = ' +result);
    }
} else {
    message('Вы вышли из программы');
}