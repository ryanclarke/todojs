var app = {
    todoList: document.getElementById("todo-list"),
    doneList: document.getElementById("done-list"),
    newTaskInput: document.getElementById("todo-add-task-input")
}

var todoList = {
    taskTemplate: {
        original: document.querySelector("#task-template").content.firstElementChild,
        clone() {
            return document.importNode(this.original, true);
        }
    },
    addTask(text) {
        var taskId = `${new Date().valueOf()}${Math.random()}`;

        var task = this.taskTemplate.clone();
        var label = task.firstElementChild;
        var checkbox = label.firstElementChild;
        var prioritize = task.querySelector(".task-priority-increase");
        var discard = task.querySelector(".task-discard");
        var text = document.createTextNode(` ${text}`);

        label.setAttribute("for", taskId);
        checkbox.id = taskId;
        checkbox.onchange = todoTask.complete(checkbox, task);

        prioritize.onclick = todoTask.prioritize(task);
        discard.onclick = todoTask.discard(task);

        label.appendChild(text);

        app.todoList.appendChild(task);
    },
    onEnterPressed(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            todoList.addTask(app.newTaskInput.value);
            app.newTaskInput.value = "";
        }
    }
}

var todoTask = {
    complete(input, task) {
        var event = function() {
            if (input.checked) {
                app.todoList.removeChild(task);
                app.doneList.insertBefore(task, app.doneList.firstChild);
                task.onchange = todoTask.uncomplete(input, task);
            }
        }
        return event;
    },
    uncomplete(input, task) {
        var event = function() {
            if (!input.checked) {
                app.doneList.removeChild(task);
                app.todoList.insertBefore(task, app.todoList.firstChild);
                task.onchange = todoTask.complete(input, task);
            }
        }
        return event;
    },
    prioritize(task) {
        var event = function() {
            task.parentNode.insertBefore(task, task.previousSibling);
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

    app.newTaskInput.focus();
    app.newTaskInput.addEventListener("keyup", todoList.onEnterPressed);
}

document.addEventListener("DOMContentLoaded", domContentLoaded, true);
