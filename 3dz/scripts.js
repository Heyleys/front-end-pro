const name = prompt ('Вас приветствует Ваш элекетронный помощник! Подскажите как Вас зовут?');
alert ('Привет ' + name + ', рад видеть Вас!');

const answer1 = prompt ('Что привело вас на эту страничку?');
alert ('Спасибо источнику!');

const answer2 = prompt ('Сколько вам лет?');
const control = confirm ('Вы уверены что Вам ' + answer2 + '?');
alert (control + ' Верю на слово что вам ' + answer2 + '! Хорошего дня!');

let box = {
    name,
    answer1,
    answer2,
}

console.log(box.name + " " + box.answer1 + " " + box.answer2);
console.log(name);
console.log(answer1);
console.log(answer2);
console.log(control);