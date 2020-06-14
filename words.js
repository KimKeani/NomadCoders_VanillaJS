const message = document.querySelector(".message");

const MSG_NUMBER = 10;

function paintMsg(msgNumber) {
    const todaysMsg = dayMsg[msgNumber]
    message.innerText = todaysMsg;
}

const dayMsg = [
    "The road to success and the road to failure are almost exactly the same.",
    "It is better to fail in originality than to succeed in imitation.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "All progress takes place outside the comfort zone.",
    "Success usually comes to those who are too busy to be looking for it.",
    "The way to get started is to quit talking and begin doing.",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    "Success seems to be connected with action. Successful people keep moving.",
    "In order to succeed, we must first believe that we can.",
    "The only place where success comes before work is in the dictionary."
]

function genRandom(){
    const number = Math.floor(Math.random() * MSG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintMsg(randomNumber);
}

init();