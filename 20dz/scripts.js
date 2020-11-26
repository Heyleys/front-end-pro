'use strict'

const chatbot = document.getElementById('chatbot');
const container = document.getElementById('container');
const chatContainer = document.getElementById('chat_container');
const userInput = document.getElementById('user_input');
const sendMessageButton = document.getElementById('send_message');
let isChatbotOpened = false;
let isChatbotWelcomed = false;
let userInputData = '';
let idleTime = 0;

let questions = {
    previous: null,
    current: null
};

sendMessageButton.addEventListener('click', async () => {
    sendMessage();
});

userInput.addEventListener('keypress', async function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
  })

function sendMessage(){
    sendUserMessage(userInput.value);
    if(userInputData === 'флюгенхаймен'){
        hideChatbot();
    } else {
        if(questions.current === null){
            questions.current = setTimeout(async () => {
                let sentence = await sentenceMessage();
                sendBotMessage(sentence);
            },imitateChatbotDelay());
        } else if(questions.current !== null){
            questions.previous = questions.current;
            clearTimeout(questions.previous);
            questions.current = setTimeout(async () => {
                let sentence = await sentenceMessage();
                sendBotMessage(sentence);
            },imitateChatbotDelay());
        }
    }
        
}

chatbot.addEventListener('click',async () => {
    toggleChatbot();
    if(!isChatbotWelcomed){
        let greeting = await greetingMessage();
        setTimeout(() => {
            sendBotMessage(greeting);
            isChatbotWelcomed = true;
        },imitateChatbotDelay())
    }
});

function imitateThinking(callback){
    
}

function showChatbot(){
    isChatbotOpened = true;
    container.classList.toggle('hide');
    container.classList.toggle('show');
    console.log('Chatbot opened');
}

function hideChatbot(){
    isChatbotOpened = false;
    container.classList.toggle('show');
    container.classList.toggle('hide');
    console.log('Chatbot closed');
}

function toggleChatbot(){
    if(isChatbotOpened){
        hideChatbot();
    } else if(!isChatbotOpened){
        showChatbot();
    }
}

function sendUserMessage(messageText){
    userInputData = messageText;
    let newMessage = document.createElement('div');
    newMessage.classList.add('message_style');
    newMessage.classList.add('human');
    newMessage.innerHTML = messageText;
    chatContainer.appendChild(newMessage); 
    userInput.value = '';
}

function sendBotMessage(messageText){
    let newMessage = document.createElement('div');
    newMessage.classList.add('message_style');
    newMessage.classList.add('bot');
    newMessage.innerHTML = messageText;
    chatContainer.appendChild(newMessage);
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

function imitateChatbotDelay(){
    let minThinkTime = 1;
    let maxThinkTime = 8;
    return getRandomInt(minThinkTime, maxThinkTime) * 1000;
}

async function getDataJson(){
    let response = await fetch('http://127.0.0.1:8080/data.json');

    if (response.ok) {
      let json = await response.json();
      return json;
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
}

async function greetingMessage() {
    let promise = await getDataJson();
    return promise.greetings[getRandomInt(0,promise.greetings.length-1)];
}

async function sentenceMessage() {
    let promise = await getDataJson();
    return promise.sentences[getRandomInt(0,promise.sentences.length-1)];
}

function makeEachSecond(callback){
    setInterval(() => {
        callback();
    }, 1000);
}

makeEachSecond(() => {
    idleTime++;
    if(idleTime > 120 && isChatbotOpened){
        hideChatbot();
    }
});

document.addEventListener('mousemove', e => {
    idleTime = 0;
});