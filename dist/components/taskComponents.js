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
exports.markAsPendingInLS2 = exports.moveToMarkedComplete = exports.markAsCompletedInLS2 = exports.createNewTaskElement = exports.appendChildren = exports.createTaskElement = void 0;
const app_js_1 = require("../app.js");
const localStorageUtils_js_1 = require("../utils/localStorageUtils.js");
const taskUtils_js_1 = require("../utils/taskUtils.js");
const constants_js_1 = require("./constants.js");
const eventListenerCallbacks_js_1 = require("./eventListenerCallbacks.js");
function createTaskElement(taskObj) {
    let taskElement = document.createElement('div');
    taskElement.classList.add();
    let tName = document.createElement('p');
    tName.classList.add(constants_js_1.taskElementClasses.taskName);
    tName.textContent = taskObj.taskName;
    let tDescription = document.createElement('p');
    tDescription.textContent = taskObj.taskDescription || "";
    tDescription.classList.add(constants_js_1.taskElementClasses.taskDescription);
    let tDueDateTime = document.createElement('p');
    tDueDateTime.textContent = taskObj.dueDateTime || "";
    tDueDateTime.classList.add(constants_js_1.taskElementClasses.dueDateTime);
    let tId = document.createElement('p');
    tId.textContent = taskObj.taskId;
    tId.classList.add(constants_js_1.taskElementClasses.taskId);
    let completionStatus = document.createElement('p');
    completionStatus.textContent = String(taskObj.completed);
    completionStatus.classList.add(constants_js_1.taskElementClasses.completionStatus);
    let tDelete = document.createElement("button");
    tDelete.classList.add(constants_js_1.taskElementClasses.deleteTaskButton);
    tDelete.textContent = "Delete";
    tDelete.addEventListener('click', eventListenerCallbacks_js_1.deleteTaskButtonHandler);
    if (taskObj.completed === false) {
        taskElement.classList.add(constants_js_1.taskElementClasses.pendingTaskElement);
        let tMark = document.createElement("button");
        tMark.textContent = "Mark completed";
        tMark.classList.add(constants_js_1.taskElementClasses.markCompletedButton);
        tMark.addEventListener("click", eventListenerCallbacks_js_1.markTaskCompletedButtonHandler);
        appendChildren(taskElement, tId, tName, tDescription, completionStatus, tDueDateTime, tDelete, tMark);
    }
    else if (taskObj.completed === true) {
        taskElement.classList.add(constants_js_1.taskElementClasses.completedTaskElement);
        let tUnmark = document.createElement("button");
        tUnmark.textContent = "Unmark";
        tUnmark.classList.add(constants_js_1.taskElementClasses.unmarkButton);
        tUnmark.addEventListener("click", eventListenerCallbacks_js_1.unmarkButtonHandler);
        appendChildren(taskElement, tId, tName, tDescription, completionStatus, tDueDateTime, tDelete, tUnmark);
    }
    return taskElement;
}
exports.createTaskElement = createTaskElement;
function appendChildren(parent, ...children) {
    children.forEach((child) => {
        parent.appendChild(child);
    });
}
exports.appendChildren = appendChildren;
function createNewTaskElement(taskObj) {
    let taskElement = createTaskElement(taskObj);
    if (taskElement == null) {
        alert(constants_js_1.alertMessages.taskCreationFailed);
        return;
    }
    if (app_js_1.tasksContainer) {
        app_js_1.tasksContainer.insertBefore(taskElement, app_js_1.tasksContainer.children[0]);
    }
}
exports.createNewTaskElement = createNewTaskElement;
function markAsCompletedInLS2(taskObj) {
    return __awaiter(this, void 0, void 0, function* () {
        let tId = taskObj.taskId;
        let temp;
        let tp = yield (0, localStorageUtils_js_1.getJSON)();
        let found = false;
        let i;
        for (i = 0; i < tp.length; i++) {
            if (tp[i].taskId == tId) {
                found = true;
                tp[i].completed = true;
                temp = tp[i];
                break;
            }
        }
        if (found === true) {
            temp = tp[i];
            yield (0, localStorageUtils_js_1.pushChangesToLocalStorage)(tp);
        }
        return found;
    });
}
exports.markAsCompletedInLS2 = markAsCompletedInLS2;
function moveToMarkedComplete(taskElementToBeMoved) {
    return __awaiter(this, void 0, void 0, function* () {
        taskElementToBeMoved.classList.add();
        if (app_js_1.completedTasksContainer === null) {
            alert(constants_js_1.alertMessages.completedTasksContainerNotFound);
            return;
        }
        app_js_1.completedTasksContainer.insertBefore(taskElementToBeMoved, app_js_1.completedTasksContainer.children[0]);
        (0, taskUtils_js_1.getCounts)();
    });
}
exports.moveToMarkedComplete = moveToMarkedComplete;
function markAsPendingInLS2(taskObj) {
    return __awaiter(this, void 0, void 0, function* () {
        let tId = taskObj.taskId;
        let temp;
        let tp = yield (0, localStorageUtils_js_1.getJSON)();
        let found = false;
        let i;
        for (i = 0; i < tp.length; i++) {
            if (tp[i].taskId == tId) {
                found = true;
                tp[i].completed = false;
                temp = tp[i];
                break;
            }
        }
        if (found === true) {
            temp = tp[i];
            yield (0, localStorageUtils_js_1.pushChangesToLocalStorage)(tp);
        }
        return found;
    });
}
exports.markAsPendingInLS2 = markAsPendingInLS2;
