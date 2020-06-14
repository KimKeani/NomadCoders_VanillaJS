const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList =  document.querySelector(".js-toDoList"),
    doneList = document.querySelector(".js-doneList");

const TODO_LS = 'toDos'
const DONE_LS = 'dones'

let toDos = [];
let dones = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
    });
    toDos = cleanToDos;
    saveToDos();
}

function deleteDone(event){
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);
    const cleanDones = dones.filter(function(done){
        return done.id !== parseInt(li.id)
    });
    dones = cleanDones;
    saveDones();
}

function saveToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}
function saveDones() {
    localStorage.setItem(DONE_LS, JSON.stringify(dones));
}

function doneTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
    });
    toDos = cleanToDos;
    saveToDos();
    const doneLi = document.createElement("li");
    const doneDelBtn = document.createElement("button");
    const span = document.createElement("span");
    doneDelBtn.innerText = "❌";
    const text = li.querySelector(".spanData").innerText;
    span.innerText = text;
    const newId = dones.length + 1;
    doneDelBtn.addEventListener("click", deleteDone);
    doneLi.appendChild(doneDelBtn);
    doneLi.appendChild(span);
    doneLi.id = newId;
    doneList.appendChild(doneLi);
    const doneObj= {
        text : text,
        id : newId
    };
    dones.push(doneObj);
    saveDones();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button")
    const span = document.createElement("span");
    span.classList.add("spanData");
    //element 만들기
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    doneBtn.innerText = "⭕";
    span.innerText = text;
    //만든 element 에 정의 해주기
    delBtn.addEventListener("click", deleteTodo);
    doneBtn.addEventListener("click", doneTodo);
    //버튼에 대한 이벤트 리스너를 적용시켜주기
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.appendChild(span);
    li.id = newId
    //리스트를 완성하기
    toDoList.appendChild(li);
    //toDoList 의 UL 에 만든 리스트를 append 시켜주기(html 상에서 일어난 일)
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    //우리가 만든 array 에 html 에 있는 리스트와 동일한 정보를 push 해주기
    saveToDos();
}

function paintDone(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = dones.length + 1;
    delBtn.innerText = "❌";
    span.innerText = text;
    delBtn.addEventListener("click", deleteDone);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId
    doneList.appendChild(li);
    const doneObj = {
        text: text,
        id: newId
    };
    dones.push(doneObj);
    saveDones();
};

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function laodTODos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function loadDone() {
    const loadedDone = localStorage.getItem(DONE_LS);
    if(loadedDone !== null){
        const parsedDones = JSON.parse(loadedDone);
        parsedDones.forEach(function(done){
            paintDone(done.text);
        });
    }
}

function init() {
    laodTODos();
    loadDone();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();



