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

    var task = document.createElement("div");
    task.classList.add("todo-list-task");
    task.classList.add("pure-form");
    task.classList.add("pure-u-1");

    var label = document.createElement("label");
    var id = `${new Date().valueOf()}${Math.random()}`;
    label.setAttribute("for", id);
    label.classList.add("pure-checkbox");

    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.onchange = function() {
        if (input.checked) {
            list.removeChild(task);
        }
    };
    task.appendChild(input);

    var text = document.createTextNode(" " + text);
    task.appendChild(text);

    list.appendChild(task);
};

var domContentLoaded = function() {
    newTodoItem("thing 1");
    newTodoItem("thing 2");
    
    document.getElementById("todo-add-task-input").addEventListener("keyup", addTaskToTodoList);
};

document.addEventListener("DOMContentLoaded", domContentLoaded, true);
