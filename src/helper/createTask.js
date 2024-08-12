"use strict";
exports.__esModule = true;
exports.TaskBuilder = exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(taskName, taskId) {
        this.taskDescription = "";
        this.dueDateTime = "";
        this.taskName = taskName;
        this.taskId = taskId;
    }
    return Task;
}());
exports.Task = Task;
var TaskBuilder = /** @class */ (function () {
    function TaskBuilder(taskName, taskId) {
        this.task = new Task(taskName, taskId);
    }
    TaskBuilder.prototype.setId = function (taskId) {
        this.task.taskId = taskId;
        return this;
    };
    TaskBuilder.prototype.setTaskDescription = function (taskDescription) {
        this.task.taskDescription = taskDescription || "";
        return this;
    };
    TaskBuilder.prototype.setDueDateTime = function (dueDateTime) {
        this.task.dueDateTime = dueDateTime || "";
        return this;
    };
    TaskBuilder.prototype.setCompletionStatus = function (status) {
        this.task.completed = status;
        return this;
    };
    TaskBuilder.prototype.build = function () {
        return this.task;
    };
    return TaskBuilder;
}());
exports.TaskBuilder = TaskBuilder;
