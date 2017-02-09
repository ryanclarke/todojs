var todoList = {
    taskTemplate: {
        original: document.querySelector("#task-template").content.firstElementChild,
        clone() {
            return document.importNode(this.original, true);
        }
    },
    addTask(text) {
        var taskId = `${new Date().valueOf()}${Math.random()}`;

        var list = document.getElementById("todo-list");

        var task = this.taskTemplate.clone();
        var label = task.firstElementChild;
        var checkbox = label.firstElementChild;
        var prioritize = task.querySelector(".task-priority-increase");
        var text = document.createTextNode(` ${text}`);

        label.setAttribute("for", taskId);
        checkbox.id = taskId;
        checkbox.onchange = todoTask.completed(checkbox, list, task);

        prioritize.onclick = todoTask.prioritize(list, task);

        label.appendChild(text);

        list.appendChild(task);
    },
    onEnterPressed(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            var input = document.getElementById("todo-add-task-input");
            todoList.addTask(input.value);
            input.value = "";
        }
    }
}

var todoTask = {
    completed(input, list, task) {
        var event = function() {
            if (input.checked) {
                list.removeChild(task);
            }
        }
        return event;
    },
    prioritize(list, task) {
        var event = function() {
            list.insertBefore(task, task.previousSibling);
        }
        return event;
    }
}

var domContentLoaded = function() {
    todoList.addTask("thing 1");
    todoList.addTask("thing 2");

    document.getElementById("todo-add-task-input").addEventListener("keyup", todoList.onEnterPressed);
}

document.addEventListener("DOMContentLoaded", domContentLoaded, true);
