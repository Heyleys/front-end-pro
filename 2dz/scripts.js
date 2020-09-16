"use strict"

function bodyMassIndexCalculation (weightInKilos, growthInMeters) {
    return weightInKilos / growthInMeters ** 2;
}

let growthInSantimeters = Number(prompt("Ваш рост в см?"));
let weightInKilos = Number(prompt("Ваш вес в кг?"));

growthInSantimeters = growthInSantimeters || 155;
weightInKilos = weightInKilos || 55;

const growthInMeters = growthInSantimeters / 100;

const bodyMassIndex = bodyMassIndexCalculation(weightInKilos, growthInMeters);

alert(`Ваш ИМТ ${bodyMassIndex}`);

console.log("рост в м. " + growthInMeters);
console.log("ИМТ " + bodyMassIndex);
