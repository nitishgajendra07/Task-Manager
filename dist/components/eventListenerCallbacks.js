"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByButtonHandler = exports.searchButtonHandler = exports.filterForCompletedButtonHandler = exports.addButtonHandler = exports.addNewTaskButtonHandler = exports.unmarkButtonHandler = exports.markTaskCompletedButtonHandler = exports.deleteTaskButtonHandler = void 0;
const app_js_1 = require("../app.js");
const createTask_js_1 = require("../helper/createTask.js");
const Observable_js_1 = require("../helper/observerPattern/Observable.js");
const localStorageUtils_js_1 = require("../utils/localStorageUtils.js");
const taskUtils_js_1 = require("../utils/taskUtils.js");
const constants_js_1 = require("./constants.js");
function deleteTaskButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let target = e.target;
        const parentElement = target.parentElement;
        let taskObj = (0, taskUtils_js_1.getTaskObject)(parentElement);
        Observable_js_1.taskManager.deleteTask(taskObj);
        if (target.parentElement) {
            target.parentElement.remove();
        }
        (0, taskUtils_js_1.getCounts)();
    });
}
exports.deleteTaskButtonHandler = deleteTaskButtonHandler;
function markTaskCompletedButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let target = e.target;
        if (!target)
            return;
        const parentElement = target.parentElement;
        if (!parentElement)
            return;
        if (app_js_1.tasksContainer === null) {
            alert(constants_js_1.alertMessages.taskContainerNotFound);
            return;
        }
        let taskObj = (0, taskUtils_js_1.getTaskObject)(parentElement);
        Observable_js_1.taskManager.markTaskAsCompleted(taskObj);
        app_js_1.tasksContainer.removeChild(parentElement);
        (0, taskUtils_js_1.getCounts)();
    });
}
exports.markTaskCompletedButtonHandler = markTaskCompletedButtonHandler;
function unmarkButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let target = e.target;
        if (!target)
            return;
        const parentElement = target.parentElement;
        if (!parentElement)
            return;
        let taskObj = (0, taskUtils_js_1.getTaskObject)(parentElement);
        Observable_js_1.taskManager.markAsPending(taskObj);
        parentElement.remove();
        (0, taskUtils_js_1.checkForExpiredTasks)(app_js_1.tasksContainer);
        (0, taskUtils_js_1.getCounts)();
    });
}
exports.unmarkButtonHandler = unmarkButtonHandler;
function addNewTaskButtonHandler(e) {
    e.preventDefault();
    app_js_1.popupForm.style.display = "block";
}
exports.addNewTaskButtonHandler = addNewTaskButtonHandler;
function addButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let target = e.target;
        if (!target)
            return;
        const parentElement = target.parentElement;
        if (!parentElement)
            return;
        let inputTask = parentElement.children[1];
        let inputDue = parentElement.children[5];
        let inputDescription = parentElement.children[3];
        if (inputTask.value === "") {
            inputTask.focus();
            return;
        }
        else if (new Date(inputDue.value) <= new Date()) {
            alert(constants_js_1.alertMessages.dateInput);
            inputDue.focus();
            return;
        }
        let tId = yield (0, localStorageUtils_js_1.computeNewId)();
        let taskObj = new createTask_js_1.TaskBuilder(inputTask.value, tId)
            .setTaskDescription(inputDescription.value)
            .setCompletionStatus(false)
            .setDueDateTime(inputDue.value)
            .build();
        Observable_js_1.taskManager.addTask(taskObj);
        (0, taskUtils_js_1.getCounts)();
        inputTask.value = "";
        inputDescription.value = "";
        inputDue.value = "";
        app_js_1.popupForm.style.display = "none";
    });
}
exports.addButtonHandler = addButtonHandler;
function filterForCompletedButtonHandler(e) {
    e.preventDefault();
    (0, taskUtils_js_1.filterForCompleted2)();
}
exports.filterForCompletedButtonHandler = filterForCompletedButtonHandler;
function searchButtonHandler(e) {
    e.preventDefault();
    (0, taskUtils_js_1.searchTask)(app_js_1.searchInput.value);
}
exports.searchButtonHandler = searchButtonHandler;
function sortByButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        let target = e.target;
        let choice = target.value;
        (0, taskUtils_js_1.sortTasks)(choice);
    });
}
exports.sortByButtonHandler = sortByButtonHandler;
