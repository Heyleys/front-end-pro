'use strict'

let doctor = {
    greetingWord: 'Hello',
    title: 'dr.',
    wish: 'Have a nice day',
    sayGreetings: function(name){
        return `${this.greetingWord}, ${this.title} ${name}! ${this.wish}`;
    }
}

let colleague = {
    greetingWord: 'Hi',
    title: 'dear',
    wish: 'Regards, John',
    sayGreetings: function(name){
        return `${this.greetingWord}, ${this.title} ${name}! ${this.wish}`;
    }
}

function greetings(name){
    console.log(this.sayGreetings(name));
}
const helloDoctor = greetings.bind(doctor);
const helloColleague = greetings.bind(colleague);
helloDoctor('Watson');
helloColleague('Kristy');