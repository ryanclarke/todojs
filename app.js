var task = {
    create: function(text) {
        var taskId = `${new Date().valueOf()}${Math.random()}`;

        var list = document.getElementById("todo-list");

        var task = document.createElement("div");
        task.classList.add("todo-list-task");
        task.classList.add("pure-form-aligned");
        task.classList.add("pure-u-1");

        var label = document.createElement("label");
        label.setAttribute("for", taskId);
        label.classList.add("pure-checkbox");
        task.appendChild(label);

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = taskId;
        checkbox.onchange = onTaskChecked(checkbox, list, task);
        label.appendChild(checkbox);

        var text = document.createTextNode(` ${text}`);
        label.appendChild(text);

        list.appendChild(task);
    }
}

var addTaskToTodoList = function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        var input = document.getElementById("todo-add-task-input");
        task.create(input.value);
        input.value = "";
    }
}

var onTaskChecked = function(input, list, task) {
    var event = function() {
        if (input.checked) {
            list.removeChild(task);
        }
    }
    return event;
}

var domContentLoaded = function() {
    task.create("thing 1");
    task.create("thing 2");
    
    document.getElementById("todo-add-task-input").addEventListener("keyup", addTaskToTodoList);
}

document.addEventListener("DOMContentLoaded", domContentLoaded, true);
