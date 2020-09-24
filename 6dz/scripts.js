'use strict'

let inputData;
let converted;
let temp;
let stringsArray = [];
let numbersArray = [];
let integersArray = [];
let floatArray = [];

do {
    inputData = prompt( 'Введите данные');
    if (inputData !== null && inputData !== '') {
        temp = inputData;
        converted = Number(inputData);
        if (Number.isNaN(converted)) {
            stringsArray.push(temp);
        } else {
            numbersArray.push(converted);
            if(Number.isInteger(converted)){
                integersArray.push(converted);
            } else {
                floatArray.push(converted);
            }
        }
    }
} while(inputData !== null)

let result = {
    allValues: numbersArray.concat(stringsArray),
    elements: numbersArray.concat(stringsArray).length,
    minInteger: Math.min(...integersArray),
    maxInteger: Math.max(...integersArray),
    arithmeticMean: integersArray.reduce(function(sum, current) {return sum + current;}, 0) / numbersArray.length,
    evenPositiveIntegerElements: integersArray.filter((value) => {if(value > 0 && value % 1 === 0 && value % 2 === 0) {return value;} }).length,
    negativeElements: numbersArray.filter((value) => {if(value < 0){return value;}}).length,
    fractionSum: floatArray.reduce(function(sum, current) {return sum + current;}, 0),
};

console.log(result);