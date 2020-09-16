'use strict'

let operand1;
let operator;
let operand2;

function operandNotValid(operand) {
  if (isNaN(operand)) {
    alert('Вы ввели нечисловое значение, пожалуйта введите заново.');
    return true;
  } 
  return false;
};

function inputIsNotValid(input){
    //Очистка от пробелов
    input = input.trim();

    if(input === null){
        //Знаю что мы это еще не проходили но пришлось погуглить как предусмотреть нажатие отмены
        throw 'Ну отмена так отмена. Пока';
    } else if(input === ''){
        alert('Пустое значение - недопустимо');
        return true;
    }
    return false;
}

function operatorNotValid(operator) {
    const validOperatorsList = ['+','-','*','/','**','%'];

    if (validOperatorsList.indexOf(operator) !== -1) {
        return false;
    } 
    alert('Оператор не найден');
    return true;
    
}

function calculate(operand1, operand2, operator) {
  switch (operator) {
      case '+':
          return operand1 + operand2;
      break;
      case '-':
          return operand1 - operand2;
      break;
      case '*': 
          return operand1 * operand2;
      break;
      case '/':
          return operand1 / operand2;
      break;
      case '**':
          return operand1 ** operand2;
      break;
      case '%':
          return operand1 % operand2;
      break;
      default:
          alert('Оператор не найден');
      break;
  }
}

try {
    do {
      operand1 = prompt('Введите первое число');
    } while (operandNotValid(operand1) || inputIsNotValid(operand1))
    operand1 = Number(operand1);
      
    do {
      operator = prompt('Введите оператор')
    } while (inputIsNotValid(operator) || operatorNotValid(operator));
      
    do {
      operand2 = prompt('Введите второе число');
    } while (operandNotValid(operand2) || inputIsNotValid(operand2));
    operand2 = Number(operand2);
      
    let resultCalc = calculate (operand1, operand2, operator)
      
    if (!Number.isNaN(resultCalc)) {
       alert (operand1 + ' ' + operator + ' ' + operand2 + ' ' + '=' + ' ' + resultCalc);
    }
}
catch(errorMessage){
    alert(errorMessage);
}

