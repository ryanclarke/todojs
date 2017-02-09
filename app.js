var task = {
    template: {
        original: document.querySelector("#task-template").content.firstElementChild,
        clone() {
            return document.importNode(this.original, true)
        }
    },
    addToList(text) {
        var taskId = `${new Date().valueOf()}${Math.random()}`;

        var list = document.getElementById("todo-list");

        var task = this.template.clone();
        var label = task.firstElementChild;
        var checkbox = label.firstElementChild;
        var text = document.createTextNode(` ${text}`);

        label.setAttribute("for", taskId);
        checkbox.id = taskId;
        checkbox.onchange = onTaskChecked(checkbox, list, task);

        label.appendChild(text);

        list.appendChild(task);
    }
}

var addTaskToTodoList = function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        var input = document.getElementById("todo-add-task-input");
        task.addToList(input.value);
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
    task.addToList("thing 1");
    task.addToList("thing 2");
    
    document.getElementById("todo-add-task-input").addEventListener("keyup", addTaskToTodoList);
}

document.addEventListener("DOMContentLoaded", domContentLoaded, true);
