var APP = {
    todoList: document.getElementById("todo-list"),
    doneList: document.getElementById("done-list"),
    newTaskInput: document.getElementById("todo-add-task-input")
};

var todoList = {
    taskTemplate: {
        original: document.querySelector("#task-template").content.firstElementChild,
        clone: function () {
            return document.importNode(this.original, true);
        }
    },
    addTask: function (text) {
        var task = this.taskTemplate.clone();
        var label = task.firstElementChild;
        var checkbox = label.firstElementChild;
        var prioritize = task.querySelector(".task-priority-increase");
        var discard = task.querySelector(".task-discard");
        var textNode = document.createTextNode(" " + text);

        checkbox.onchange = todoTask.complete(checkbox, task);

        prioritize.onclick = todoTask.prioritize(task);
        discard.onclick = todoTask.discard(task);

        label.appendChild(textNode);

        APP.todoList.appendChild(task);
    },
    onEnterPressed: function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            todoList.addTask(APP.newTaskInput.value);
            APP.newTaskInput.value = "";
        }
    }
};

var todoTask = {
    complete: function (input, task) {
        var event = function () {
            if (input.checked) {
                APP.todoList.removeChild(task);
                APP.doneList.insertBefore(task, APP.doneList.firstChild);
                task.onchange = todoTask.uncomplete(input, task);
            }
        };
        return event;
    },
    uncomplete: function (input, task) {
        var event = function () {
            if (!input.checked) {
                APP.doneList.removeChild(task);
                APP.todoList.insertBefore(task, APP.todoList.firstChild);
                task.onchange = todoTask.complete(input, task);
            }
        };
        return event;
    },
    prioritize: function (task) {
        var event = function () {
            task.parentNode.insertBefore(task, task.previousSibling);
        };
        return event;
    },
    discard: function (task) {
        var event = function () {
            task.parentNode.removeChild(task);
        };
        return event;
    }
};

var domContentLoaded = function () {
    todoList.addTask("thing 1");
    todoList.addTask("thing 2");

    APP.newTaskInput.focus();
    APP.newTaskInput.addEventListener("keyup", todoList.onEnterPressed);
};

document.addEventListener("DOMContentLoaded", domContentLoaded, true);
