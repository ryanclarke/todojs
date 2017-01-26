var addTaskToTodoList = function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        var input = document.getElementById("todo-add-task-input");
        newTodoItem(input.value);
        input.value = "";
    }
}

var newTodoItem = function(text) {
    var list = document.getElementById("todo-list");

    var grid = document.createElement("div");
    grid.classList.add("pure-u-1");

    var todoItem = document.createElement("div");
    todoItem.classList.add("todo-list-task");
    todoItem.classList.add("pure-form");
    grid.appendChild(todoItem);

    var label = document.createElement("label");
    var id = `${new Date().valueOf()}${Math.random()}`;
    label.setAttribute("for", id);
    label.classList.add("pure-checkbox");
    label.innerHTML = `<input id="${id}" type="checkbox"> ${text}`;
    todoItem.appendChild(label);

    list.appendChild(grid);
};

var domContentLoaded = function() {
    newTodoItem("thing 1");
    newTodoItem("thing 2");
    
    document.getElementById("todo-add-task-input").addEventListener("keyup", addTaskToTodoList);
};

document.addEventListener("DOMContentLoaded", domContentLoaded, true);
