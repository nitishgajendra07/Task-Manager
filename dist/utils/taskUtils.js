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
exports.isTask = exports.searchTask = exports.sortTasks = exports.removeAllPageContents = exports.filterForCompleted2 = exports.getAllTasksInCurrentDisplay = exports.getParticularTaskPart = exports.getTaskObject = exports.filterForCompleted = exports.getCompletedTasksCount = exports.getIncompleteTasksCount = exports.getTotalCount = exports.getCounts = exports.checkForExpiredTasks = exports.display = void 0;
const app_js_1 = require("../app.js");
const constants_js_1 = require("../components/constants.js");
const taskComponents_js_1 = require("../components/taskComponents.js");
const createTask_js_1 = require("../helper/createTask.js");
const localStorageUtils_js_1 = require("./localStorageUtils.js");
function display(arrayOfObjectsToBeDisplayed) {
    while (app_js_1.tasksContainer.firstChild) {
        app_js_1.tasksContainer.removeChild(app_js_1.tasksContainer.firstChild);
    }
    while (app_js_1.completedTasksContainer.firstChild) {
        app_js_1.completedTasksContainer.removeChild(app_js_1.completedTasksContainer.firstChild);
    }
    let temp;
    for (let i = 0; i < arrayOfObjectsToBeDisplayed.length; i++) {
        temp = arrayOfObjectsToBeDisplayed[i];
        if (temp.completed === false) {
            let taskElement = (0, taskComponents_js_1.createTaskElement)(temp);
            if (taskElement == null) {
                alert(constants_js_1.alertMessages.taskElementFieldsAbsent);
            }
            else {
                app_js_1.tasksContainer.append(taskElement);
            }
        }
        else if (temp.completed === true) {
            let completedTaskElement = (0, taskComponents_js_1.createTaskElement)(temp);
            if (completedTaskElement == null) {
                alert(constants_js_1.alertMessages.completedTaskFieldsAbsent);
            }
            else {
                app_js_1.completedTasksContainer.append(completedTaskElement);
            }
        }
    }
    checkForExpiredTasks(app_js_1.tasksContainer);
    getCounts();
}
exports.display = display;
function checkForExpiredTasks(elementList) {
    for (let i = 0; i < elementList.children.length; i++) {
        let dueDateTimeParent = getParticularTaskPart(elementList.children[i], constants_js_1.taskElementClasses.dueDateTime);
        let dueDateTime = dueDateTimeParent === null || dueDateTimeParent === void 0 ? void 0 : dueDateTimeParent.textContent;
        if (typeof dueDateTime === "string") {
            if (new Date(dueDateTime) <= new Date()) {
                elementList.children[i].classList.remove(constants_js_1.taskElementClasses.pendingTaskElement);
                elementList.children[i].classList.add(constants_js_1.taskElementClasses.expired);
            }
        }
    }
}
exports.checkForExpiredTasks = checkForExpiredTasks;
let totalCount = document.getElementById(constants_js_1.documentElementId.totalCount);
let tasksCount = document.getElementById(constants_js_1.documentElementId.tasksCount);
let completedTasksCount = document.getElementById(constants_js_1.documentElementId.completedTasksCount);
function getCounts() {
    return __awaiter(this, void 0, void 0, function* () {
        let tp = yield (0, localStorageUtils_js_1.getJSON)();
        if (totalCount) {
            totalCount.textContent = `${constants_js_1.placeHolders.Total} ${getTotalCount(tp)}`;
        }
        if (tasksCount) {
            tasksCount.textContent = `${constants_js_1.placeHolders.TasksToBeCompleted} ${getIncompleteTasksCount(tp)}`;
        }
        if (completedTasksCount) {
            completedTasksCount.textContent = `${constants_js_1.placeHolders.Completed} ${getCompletedTasksCount(tp)}`;
        }
    });
}
exports.getCounts = getCounts;
function getTotalCount(tp) {
    return tp.length;
}
exports.getTotalCount = getTotalCount;
function getIncompleteTasksCount(tp) {
    let tasksCount = tp.reduce((acc, taskObject) => {
        if (taskObject.completed === false) {
            acc += 1;
        }
        return acc;
    }, 0);
    return tasksCount;
}
exports.getIncompleteTasksCount = getIncompleteTasksCount;
function getCompletedTasksCount(tp) {
    let completedTasksCount = tp.reduce((acc, taskObject) => {
        if (taskObject.completed === true) {
            acc = acc + 1;
        }
        return acc;
    }, 0);
    return completedTasksCount;
}
exports.getCompletedTasksCount = getCompletedTasksCount;
function filterForCompleted() {
    return __awaiter(this, void 0, void 0, function* () {
        let newList;
        let tp = yield (0, localStorageUtils_js_1.getJSON)();
        newList = tp.filter((taskObject) => {
            return taskObject.completed === true;
        });
        removeAllPageContents();
        display(newList);
    });
}
exports.filterForCompleted = filterForCompleted;
function getTaskObject(taskElement) {
    var _a;
    let tNameParent = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.taskName);
    if (!tNameParent) {
        alert(constants_js_1.alertMessages.taskNameAbsent);
        throw new Error;
    }
    if (tNameParent.textContent === null) {
        alert(constants_js_1.alertMessages.taskNameTextContentAbsent);
        throw new Error;
    }
    let tName = tNameParent.textContent;
    let tDescriptionParent = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.taskDescription);
    if (tDescriptionParent === undefined) {
        throw new Error;
    }
    if (tDescriptionParent.textContent === null) {
        throw new Error;
    }
    let tDescription = tDescriptionParent.textContent || "";
    let tIdParent = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.taskId);
    if (tIdParent == undefined) {
        throw new Error;
    }
    if (tIdParent.textContent == null) {
        throw new Error;
    }
    let tId = tIdParent.textContent;
    let tDueDateTime = ((_a = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.dueDateTime)) === null || _a === void 0 ? void 0 : _a.textContent) || "";
    let tCompletionStatusParent = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.completionStatus);
    let tCompletionStatus;
    if (tCompletionStatusParent.textContent === "true") {
        tCompletionStatus = true;
    }
    else {
        tCompletionStatus = false;
    }
    let taskObj = new createTask_js_1.TaskBuilder(tName, tId)
        .setTaskDescription(tDescription)
        .setCompletionStatus(tCompletionStatus)
        .setDueDateTime(tDueDateTime)
        .build();
    return taskObj;
}
exports.getTaskObject = getTaskObject;
function getParticularTaskPart(taskElement, classToLookFor) {
    let newList = Array.from(taskElement.children);
    let particularTaskPart = newList.find((element) => {
        if (element.classList.contains(classToLookFor))
            return true;
    });
    return particularTaskPart;
}
exports.getParticularTaskPart = getParticularTaskPart;
function getAllTasksInCurrentDisplay() {
    let newTaskElementList = [...Array.from(app_js_1.tasksContainer.children), ...Array.from(app_js_1.completedTasksContainer.children)];
    let newTaskObjectList = [];
    newTaskElementList.forEach((taskElement) => {
        let taskObj = getTaskObject(taskElement);
        newTaskObjectList.push(taskObj);
    });
    return newTaskObjectList;
}
exports.getAllTasksInCurrentDisplay = getAllTasksInCurrentDisplay;
function filterForCompleted2() {
    return __awaiter(this, void 0, void 0, function* () {
        let newTaskElementList = [...Array.from(app_js_1.tasksContainer.children), ...Array.from(app_js_1.completedTasksContainer.children)];
        let newTaskObjectList = [];
        newTaskElementList.forEach((taskElement) => {
            let taskObj = getTaskObject(taskElement);
            newTaskObjectList.push(taskObj);
        });
        let filteredObjectList = newTaskObjectList.filter((taskObj) => {
            return taskObj.completed === true;
        });
        removeAllPageContents();
        display(filteredObjectList);
    });
}
exports.filterForCompleted2 = filterForCompleted2;
function removeAllPageContents() {
    while (app_js_1.tasksContainer.firstChild) {
        app_js_1.tasksContainer.removeChild(app_js_1.tasksContainer.firstChild);
    }
    while (app_js_1.completedTasksContainer.firstChild) {
        app_js_1.completedTasksContainer.removeChild(app_js_1.completedTasksContainer.firstChild);
    }
    if (app_js_1.addNewTask) {
        app_js_1.addNewTask.remove();
    }
    if (app_js_1.tasksHeading) {
        app_js_1.tasksHeading.remove();
    }
    if (app_js_1.completedTasksHeading) {
        app_js_1.completedTasksHeading.remove();
    }
}
exports.removeAllPageContents = removeAllPageContents;
function sortTasks(choice) {
    let allTaskObjectsInDisplay = getAllTasksInCurrentDisplay();
    let newList = allTaskObjectsInDisplay.slice();
    const customSortAZ = (a, b) => {
        let first = a.taskName.toLowerCase();
        let second = b.taskName.toLowerCase();
        return first > second ? 1 : first < second ? -1 : 0;
    };
    const customSortZA = (a, b) => {
        let first = a.taskName.toLowerCase();
        let second = b.taskName.toLowerCase();
        return first > second ? -1 : first < second ? 1 : 0;
    };
    const customSortByDate = (a, b) => {
        if (!a.dueDateTime)
            return 1;
        if (!b.dueDateTime)
            return -1;
        return new Date(a.dueDateTime) > new Date(b.dueDateTime) ? 1 : -1;
    };
    if (choice === "A-Z") {
        newList.sort(customSortAZ);
    }
    else if (choice === "Z-A") {
        newList.sort(customSortZA);
    }
    else if (choice === "date") {
        newList.sort(customSortByDate);
    }
    display(newList);
}
exports.sortTasks = sortTasks;
function searchTask(str) {
    return __awaiter(this, void 0, void 0, function* () {
        let t, temp;
        let allTaskObjectsInDisplay = getAllTasksInCurrentDisplay();
        let newList;
        newList = allTaskObjectsInDisplay.filter(function (taskObject) {
            return taskObject.taskName.toLowerCase().includes(str.toLowerCase());
        });
        display(newList);
    });
}
exports.searchTask = searchTask;
function isTask(obj) {
    let result = ((typeof obj === "object") &&
        (constants_js_1.taskObjProps.taskId in obj && typeof obj.taskId === "string") &&
        (constants_js_1.taskObjProps.taskName in obj && typeof obj.taskName === "string") &&
        (constants_js_1.taskObjProps.taskDescription in obj && typeof obj.taskDescription === "string") &&
        (constants_js_1.taskObjProps.dueDateTime in obj && typeof obj.dueDateTime === "string") &&
        (constants_js_1.taskObjProps.completed in obj && typeof obj.completed === "boolean"));
    return result;
}
exports.isTask = isTask;
