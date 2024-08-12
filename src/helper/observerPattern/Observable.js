"use strict";
exports.__esModule = true;
exports.taskManager = void 0;
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.allTasks = [];
        this.observers = [];
    }
    TaskManager.getInstance = function () {
        if (!TaskManager.instance) {
            return new TaskManager();
        }
        else {
            return TaskManager.instance;
        }
    };
    TaskManager.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    TaskManager.prototype.removeObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    };
    TaskManager.prototype.notifyTaskAdded = function (task) {
        this.observers.forEach(function (observer) {
            observer.taskAddedOperation(task);
        });
    };
    TaskManager.prototype.notifyTaskCompleted = function (task) {
        this.observers.forEach(function (observer) {
            observer.taskCompletedOperation(task);
        });
    };
    TaskManager.prototype.notifyTaskPending = function (task) {
        this.observers.forEach(function (observer) {
            observer.taskPendingOperation(task);
        });
    };
    TaskManager.prototype.notifyTaskDeleted = function (task) {
        this.observers.forEach(function (observer) {
            observer.taskDeletedOpearation(task);
        });
    };
    TaskManager.prototype.setAllTasks = function (tasks) {
        this.allTasks = tasks;
    };
    TaskManager.prototype.addTask = function (task) {
        this.allTasks.push(task);
        this.notifyTaskAdded(task);
    };
    TaskManager.prototype.markTaskAsCompleted = function (task) {
        var index = -1;
        for (var i = 0; i < this.allTasks.length; i++) {
            if (this.allTasks[i].taskId === task.taskId) {
                index = i;
            }
        }
        if (index >= 0) {
            this.allTasks[index].completed = true;
            var modifiedTask = this.allTasks[index];
            this.notifyTaskCompleted(modifiedTask);
        }
    };
    TaskManager.prototype.markAsPending = function (task) {
        var index = -1;
        for (var i = 0; i < this.allTasks.length; i++) {
            if (this.allTasks[i].taskId === task.taskId) {
                index = i;
            }
        }
        if (index >= 0) {
            this.allTasks[index].completed = false;
            var modifiedTask = this.allTasks[index];
            this.notifyTaskPending(modifiedTask);
        }
    };
    TaskManager.prototype.deleteTask = function (task) {
        var index = -1;
        for (var i = 0; i < this.allTasks.length; i++) {
            if (this.allTasks[i].taskId === task.taskId) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.allTasks.splice(index, 1);
            this.notifyTaskDeleted(task);
        }
    };
    return TaskManager;
}());
exports.taskManager = TaskManager.getInstance();
