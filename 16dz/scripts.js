'use strict'

const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

function setDate() {
    const now = new Date();
    const secs = now.getSeconds();
    const mins = now.getMinutes();
    const hrs = now.getHours();

    hours.innerHTML = hrs;

    if (secs < 10) {
        seconds.innerHTML = '0' + secs;
    } else {
        seconds.innerHTML = secs;
    }
    
    if (mins < 10) {
        minutes.innerHTML = '0' + mins;
    } else {
        minutes.innerHTML = mins;
    }
}

setInterval(setDate,1000);