'use strict'

function setupConfig (divider = 1) {
    return function (val) {
        divider = val / Math.round(divider);
        return divider; 
    }
}

const divide = setupConfig();
console.log(divide(1));
console.log(divide(7));
console.log(divide(70));
console.log(divide(2));