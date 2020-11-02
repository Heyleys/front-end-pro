'use strict'

function setDate(initTime) {
    const hours = document.querySelector('.hours');
    const minutes = document.querySelector('.minutes');
    const seconds = document.querySelector('.seconds');

    const now = new Date(initTime);
    const secs = now.getSeconds();
    const mins = now.getMinutes();
    const hrs = now.getHours();

    if (hrs < 10) {
        hours.innerHTML = '0' + hrs;
    } else {
        hours.innerHTML = hrs;
    }
    
    if (mins < 10) {
        minutes.innerHTML = '0' + mins;
    } else {
        minutes.innerHTML = mins;
    }

    if (secs < 10) {
        seconds.innerHTML = '0' + secs;
    } else {
        seconds.innerHTML = secs;
    }
}

function runPresetupedClock(initTime = null){
    if(initTime === null){
        initTime = new Date();
    }
    initTime = Date.parse(initTime);
    let timeIncrementStep = 1000;
    setDate(initTime);
    setInterval(function(){
        initTime += timeIncrementStep;
        setDate(initTime);
    },1000);
}

//You can input any hardcoded starting datetime or not use a param for using current timestamp as default param
runPresetupedClock();