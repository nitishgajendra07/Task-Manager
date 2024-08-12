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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.isTask = exports.searchTask = exports.sortTasks = exports.removeAllPageContents = exports.filterForCompleted2 = exports.getAllTasksInCurrentDisplay = exports.getParticularTaskPart = exports.getTaskObject = exports.filterForCompleted = exports.getCompletedTasksCount = exports.getIncompleteTasksCount = exports.getTotalCount = exports.getCounts = exports.checkForExpiredTasks = exports.display = void 0;
var app_js_1 = require("../app.js");
var constants_js_1 = require("../components/constants.js");
var taskComponents_js_1 = require("../components/taskComponents.js");
var createTask_js_1 = require("../helper/createTask.js");
var localStorageUtils_js_1 = require("./localStorageUtils.js");
function display(arrayOfObjectsToBeDisplayed) {
    while (app_js_1.tasksContainer.firstChild) {
        app_js_1.tasksContainer.removeChild(app_js_1.tasksContainer.firstChild);
    }
    while (app_js_1.completedTasksContainer.firstChild) {
        app_js_1.completedTasksContainer.removeChild(app_js_1.completedTasksContainer.firstChild);
    }
    var temp;
    for (var i = 0; i < arrayOfObjectsToBeDisplayed.length; i++) {
        temp = arrayOfObjectsToBeDisplayed[i];
        if (temp.completed === false) {
            var taskElement = (0, taskComponents_js_1.createTaskElement)(temp);
            if (taskElement == null) {
                alert(constants_js_1.alertMessages.taskElementFieldsAbsent);
            }
            else {
                app_js_1.tasksContainer.append(taskElement);
            }
        }
        else if (temp.completed === true) {
            var completedTaskElement = (0, taskComponents_js_1.createTaskElement)(temp);
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
    for (var i = 0; i < elementList.children.length; i++) {
        var dueDateTimeParent = getParticularTaskPart(elementList.children[i], constants_js_1.taskElementClasses.dueDateTime);
        var dueDateTime = dueDateTimeParent === null || dueDateTimeParent === void 0 ? void 0 : dueDateTimeParent.textContent;
        if (typeof dueDateTime === "string") {
            if (new Date(dueDateTime) <= new Date()) {
                elementList.children[i].classList.remove(constants_js_1.taskElementClasses.pendingTaskElement);
                elementList.children[i].classList.add(constants_js_1.taskElementClasses.expired);
            }
        }
    }
}
exports.checkForExpiredTasks = checkForExpiredTasks;
var totalCount = document.getElementById(constants_js_1.documentElementId.totalCount);
var tasksCount = document.getElementById(constants_js_1.documentElementId.tasksCount);
var completedTasksCount = document.getElementById(constants_js_1.documentElementId.completedTasksCount);
function getCounts() {
    return __awaiter(this, void 0, void 0, function () {
        var tp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, localStorageUtils_js_1.getJSON)()];
                case 1:
                    tp = _a.sent();
                    if (totalCount) {
                        totalCount.textContent = "".concat(constants_js_1.placeHolders.Total, " ").concat(getTotalCount(tp));
                    }
                    if (tasksCount) {
                        tasksCount.textContent = "".concat(constants_js_1.placeHolders.TasksToBeCompleted, " ").concat(getIncompleteTasksCount(tp));
                    }
                    if (completedTasksCount) {
                        completedTasksCount.textContent = "".concat(constants_js_1.placeHolders.Completed, " ").concat(getCompletedTasksCount(tp));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getCounts = getCounts;
function getTotalCount(tp) {
    return tp.length;
}
exports.getTotalCount = getTotalCount;
function getIncompleteTasksCount(tp) {
    var tasksCount = tp.reduce(function (acc, taskObject) {
        if (taskObject.completed === false) {
            acc += 1;
        }
        return acc;
    }, 0);
    return tasksCount;
}
exports.getIncompleteTasksCount = getIncompleteTasksCount;
function getCompletedTasksCount(tp) {
    var completedTasksCount = tp.reduce(function (acc, taskObject) {
        if (taskObject.completed === true) {
            acc = acc + 1;
        }
        return acc;
    }, 0);
    return completedTasksCount;
}
exports.getCompletedTasksCount = getCompletedTasksCount;
function filterForCompleted() {
    return __awaiter(this, void 0, void 0, function () {
        var newList, tp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, localStorageUtils_js_1.getJSON)()];
                case 1:
                    tp = _a.sent();
                    newList = tp.filter(function (taskObject) {
                        return taskObject.completed === true;
                    });
                    removeAllPageContents();
                    display(newList);
                    return [2 /*return*/];
            }
        });
    });
}
exports.filterForCompleted = filterForCompleted;
function getTaskObject(taskElement) {
    var _a;
    var tNameParent = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.taskName);
    if (!tNameParent) {
        alert(constants_js_1.alertMessages.taskNameAbsent);
        throw new Error;
    }
    if (tNameParent.textContent === null) {
        alert(constants_js_1.alertMessages.taskNameTextContentAbsent);
        throw new Error;
    }
    var tName = tNameParent.textContent;
    var tDescriptionParent = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.taskDescription);
    if (tDescriptionParent === undefined) {
        throw new Error;
    }
    if (tDescriptionParent.textContent === null) {
        throw new Error;
    }
    var tDescription = tDescriptionParent.textContent || "";
    var tIdParent = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.taskId);
    if (tIdParent == undefined) {
        throw new Error;
    }
    if (tIdParent.textContent == null) {
        throw new Error;
    }
    var tId = tIdParent.textContent;
    var tDueDateTime = ((_a = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.dueDateTime)) === null || _a === void 0 ? void 0 : _a.textContent) || "";
    var tCompletionStatusParent = getParticularTaskPart(taskElement, constants_js_1.taskElementClasses.completionStatus);
    var tCompletionStatus;
    if (tCompletionStatusParent.textContent === "true") {
        tCompletionStatus = true;
    }
    else {
        tCompletionStatus = false;
    }
    var taskObj = new createTask_js_1.TaskBuilder(tName, tId)
        .setTaskDescription(tDescription)
        .setCompletionStatus(tCompletionStatus)
        .setDueDateTime(tDueDateTime)
        .build();
    return taskObj;
}
exports.getTaskObject = getTaskObject;
function getParticularTaskPart(taskElement, classToLookFor) {
    var newList = Array.from(taskElement.children);
    var particularTaskPart = newList.find(function (element) {
        if (element.classList.contains(classToLookFor))
            return true;
    });
    return particularTaskPart;
}
exports.getParticularTaskPart = getParticularTaskPart;
function getAllTasksInCurrentDisplay() {
    var newTaskElementList = __spreadArray(__spreadArray([], Array.from(app_js_1.tasksContainer.children), true), Array.from(app_js_1.completedTasksContainer.children), true);
    var newTaskObjectList = [];
    newTaskElementList.forEach(function (taskElement) {
        var taskObj = getTaskObject(taskElement);
        newTaskObjectList.push(taskObj);
    });
    return newTaskObjectList;
}
exports.getAllTasksInCurrentDisplay = getAllTasksInCurrentDisplay;
function filterForCompleted2() {
    return __awaiter(this, void 0, void 0, function () {
        var newTaskElementList, newTaskObjectList, filteredObjectList;
        return __generator(this, function (_a) {
            newTaskElementList = __spreadArray(__spreadArray([], Array.from(app_js_1.tasksContainer.children), true), Array.from(app_js_1.completedTasksContainer.children), true);
            newTaskObjectList = [];
            newTaskElementList.forEach(function (taskElement) {
                var taskObj = getTaskObject(taskElement);
                newTaskObjectList.push(taskObj);
            });
            filteredObjectList = newTaskObjectList.filter(function (taskObj) {
                return taskObj.completed === true;
            });
            removeAllPageContents();
            display(filteredObjectList);
            return [2 /*return*/];
        });
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
    var allTaskObjectsInDisplay = getAllTasksInCurrentDisplay();
    var newList = allTaskObjectsInDisplay.slice();
    var customSortAZ = function (a, b) {
        var first = a.taskName.toLowerCase();
        var second = b.taskName.toLowerCase();
        return first > second ? 1 : first < second ? -1 : 0;
    };
    var customSortZA = function (a, b) {
        var first = a.taskName.toLowerCase();
        var second = b.taskName.toLowerCase();
        return first > second ? -1 : first < second ? 1 : 0;
    };
    var customSortByDate = function (a, b) {
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
    return __awaiter(this, void 0, void 0, function () {
        var t, temp, allTaskObjectsInDisplay, newList;
        return __generator(this, function (_a) {
            allTaskObjectsInDisplay = getAllTasksInCurrentDisplay();
            newList = allTaskObjectsInDisplay.filter(function (taskObject) {
                return taskObject.taskName.toLowerCase().includes(str.toLowerCase());
            });
            display(newList);
            return [2 /*return*/];
        });
    });
}
exports.searchTask = searchTask;
function isTask(obj) {
    var result = ((typeof obj === "object") &&
        (constants_js_1.taskObjProps.taskId in obj && typeof obj.taskId === "string") &&
        (constants_js_1.taskObjProps.taskName in obj && typeof obj.taskName === "string") &&
        (constants_js_1.taskObjProps.taskDescription in obj && typeof obj.taskDescription === "string") &&
        (constants_js_1.taskObjProps.dueDateTime in obj && typeof obj.dueDateTime === "string") &&
        (constants_js_1.taskObjProps.completed in obj && typeof obj.completed === "boolean"));
    return result;
}
exports.isTask = isTask;
