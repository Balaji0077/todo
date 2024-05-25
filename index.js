let todoItemsContainer = document.getElementById("todoItemsContainer");
let buttonSave = document.getElementById("buttonsave");

function getFromLocalStorage() {
    let stringified = localStorage.getItem("todo");
    let parseArray = JSON.parse(stringified);
    if (parseArray === null) {
        return [];
    } else {
        return parseArray;
    }

}


let todoList = getFromLocalStorage();
let todoCounter = todoList.length;

buttonSave.onclick = function() {
    localStorage.setItem("todo", JSON.stringify(todoList));
}

function strikeOff(checkId, labelId, todoId) {
    let check = document.getElementById(checkId);
    let label = document.getElementById(labelId);
    label.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachItem) {
        let eachTodoItem = "todoId" + eachItem.uniqueNo;
        if (eachTodoItem === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }





}

function ondelete(todoId) {
    let deleteElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(deleteElement);
    let index = todoList.findIndex(function(eachItem) {
        let updateId = "todoId" + eachItem.uniqueNo;
        if (eachItem.uniqueNo === updateId) {
            return true;
        }

    });
    todoList.splice(index, 1);

}

function createAndAppendTodo(todo) {
    let checkId = "checkId" + todo.uniqueNo;
    let labelId = "labelId" + todo.uniqueNo;
    let todoId = "todoId" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row", "mb-4");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;


    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    labelContainer.appendChild(labelElement);
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    inputElement.onclick = function() {
        strikeOff(checkId, labelId, todoId);
    }


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.onclick = function() {
        ondelete(todoId);
    }
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
}

function add() {
    todoCounter = todoCounter + 1;
    let inp = document.getElementById("todoUserInput");
    let inpval = inp.value;
    let newTodo = {
        text: inpval,
        uniqueNo: todoCounter,
        isChecked: false
    };
    if (inp.value === "") {
        alert("Enter valid input");
        return;
    }
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    inp.value = " ";

}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
let btn = document.getElementById("btnAdd");
btn.onclick = function() {
    add();
}