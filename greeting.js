const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    printDate = document.querySelector(".date");
    
const eraseForm = document.querySelector(".toDoForm"); 

const USER_STORAGE = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_STORAGE, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function getTime() {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    printDate.innerText = `Today is ${month}月 ${day}日`;
  }

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    getTime();
    eraseForm.classList.remove("greetings");
} 

function loadName(){
    const currentUser = localStorage.getItem(USER_STORAGE);
    if(currentUser === null){
        // she or he is not
        askForName ();
    } else {
        // she or he is
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}

init();


