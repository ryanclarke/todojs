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
        var discard = task.querySelector(".task-discard");
        var text = document.createTextNode(` ${text}`);

        label.setAttribute("for", taskId);
        checkbox.id = taskId;
        checkbox.onchange = todoTask.complete(checkbox, task);

        prioritize.onclick = todoTask.prioritize(list, task);
        discard.onclick = todoTask.discard(task);

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
    complete(input, task) {
        var event = function() {
            if (input.checked) {
                var todoList = document.getElementById("todo-list");
                todoList.removeChild(task);
                var doneList = document.getElementById("done-list");
                doneList.insertBefore(task, doneList.firstChild);
                task.onchange = todoTask.uncomplete(input, task);
            }
        }
        return event;
    },
    uncomplete(input, task) {
        var event = function() {
            if (!input.checked) {
                var doneList = document.getElementById("done-list");
                doneList.removeChild(task);
                var todoList = document.getElementById("todo-list");
                todoList.insertBefore(task, todoList.firstChild);
                task.onchange = todoTask.complete(input, task);
            }
        }
        return event;
    },
    prioritize(list, task) {
        var event = function() {
            list.insertBefore(task, task.previousSibling);
        }
        return event;
    },
    discard(task) {
        var event = function() {
            task.parentNode.removeChild(task);
        }
        return event;
    }
}

var domContentLoaded = function() {
    todoList.addTask("thing 1");
    todoList.addTask("thing 2");

    var addNewTask = document.getElementById("todo-add-task-input");
    addNewTask.focus();
    addNewTask.addEventListener("keyup", todoList.onEnterPressed);
}

document.addEventListener("DOMContentLoaded", domContentLoaded, true);
