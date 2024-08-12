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
exports.__esModule = true;
exports.markAsPendingInLS2 = exports.moveToMarkedComplete = exports.markAsCompletedInLS2 = exports.createNewTaskElement = exports.appendChildren = exports.createTaskElement = void 0;
var app_js_1 = require("../app.js");
var localStorageUtils_js_1 = require("../utils/localStorageUtils.js");
var taskUtils_js_1 = require("../utils/taskUtils.js");
var constants_js_1 = require("./constants.js");
var eventListenerCallbacks_js_1 = require("./eventListenerCallbacks.js");
function createTaskElement(taskObj) {
    var taskElement = document.createElement('div');
    taskElement.classList.add();
    var tName = document.createElement('p');
    tName.classList.add(constants_js_1.taskElementClasses.taskName);
    tName.textContent = taskObj.taskName;
    var tDescription = document.createElement('p');
    tDescription.textContent = taskObj.taskDescription || "";
    tDescription.classList.add(constants_js_1.taskElementClasses.taskDescription);
    var tDueDateTime = document.createElement('p');
    tDueDateTime.textContent = taskObj.dueDateTime || "";
    tDueDateTime.classList.add(constants_js_1.taskElementClasses.dueDateTime);
    var tId = document.createElement('p');
    tId.textContent = taskObj.taskId;
    tId.classList.add(constants_js_1.taskElementClasses.taskId);
    var completionStatus = document.createElement('p');
    completionStatus.textContent = String(taskObj.completed);
    completionStatus.classList.add(constants_js_1.taskElementClasses.completionStatus);
    var tDelete = document.createElement("button");
    tDelete.classList.add(constants_js_1.taskElementClasses.deleteTaskButton);
    tDelete.textContent = "Delete";
    tDelete.addEventListener('click', eventListenerCallbacks_js_1.deleteTaskButtonHandler);
    if (taskObj.completed === false) {
        taskElement.classList.add(constants_js_1.taskElementClasses.pendingTaskElement);
        var tMark = document.createElement("button");
        tMark.textContent = "Mark completed";
        tMark.classList.add(constants_js_1.taskElementClasses.markCompletedButton);
        tMark.addEventListener("click", eventListenerCallbacks_js_1.markTaskCompletedButtonHandler);
        appendChildren(taskElement, tId, tName, tDescription, completionStatus, tDueDateTime, tDelete, tMark);
    }
    else if (taskObj.completed === true) {
        taskElement.classList.add(constants_js_1.taskElementClasses.completedTaskElement);
        var tUnmark = document.createElement("button");
        tUnmark.textContent = "Unmark";
        tUnmark.classList.add(constants_js_1.taskElementClasses.unmarkButton);
        tUnmark.addEventListener("click", eventListenerCallbacks_js_1.unmarkButtonHandler);
        appendChildren(taskElement, tId, tName, tDescription, completionStatus, tDueDateTime, tDelete, tUnmark);
    }
    return taskElement;
}
exports.createTaskElement = createTaskElement;
function appendChildren(parent) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    children.forEach(function (child) {
        parent.appendChild(child);
    });
}
exports.appendChildren = appendChildren;
function createNewTaskElement(taskObj) {
    var taskElement = createTaskElement(taskObj);
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
    return __awaiter(this, void 0, void 0, function () {
        var tId, temp, tp, found, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tId = taskObj.taskId;
                    return [4 /*yield*/, (0, localStorageUtils_js_1.getJSON)()];
                case 1:
                    tp = _a.sent();
                    found = false;
                    for (i = 0; i < tp.length; i++) {
                        if (tp[i].taskId == tId) {
                            found = true;
                            tp[i].completed = true;
                            temp = tp[i];
                            break;
                        }
                    }
                    if (!(found === true)) return [3 /*break*/, 3];
                    temp = tp[i];
                    return [4 /*yield*/, (0, localStorageUtils_js_1.pushChangesToLocalStorage)(tp)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, found];
            }
        });
    });
}
exports.markAsCompletedInLS2 = markAsCompletedInLS2;
function moveToMarkedComplete(taskElementToBeMoved) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            taskElementToBeMoved.classList.add();
            if (app_js_1.completedTasksContainer === null) {
                alert(constants_js_1.alertMessages.completedTasksContainerNotFound);
                return [2 /*return*/];
            }
            app_js_1.completedTasksContainer.insertBefore(taskElementToBeMoved, app_js_1.completedTasksContainer.children[0]);
            (0, taskUtils_js_1.getCounts)();
            return [2 /*return*/];
        });
    });
}
exports.moveToMarkedComplete = moveToMarkedComplete;
function markAsPendingInLS2(taskObj) {
    return __awaiter(this, void 0, void 0, function () {
        var tId, temp, tp, found, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tId = taskObj.taskId;
                    return [4 /*yield*/, (0, localStorageUtils_js_1.getJSON)()];
                case 1:
                    tp = _a.sent();
                    found = false;
                    for (i = 0; i < tp.length; i++) {
                        if (tp[i].taskId == tId) {
                            found = true;
                            tp[i].completed = false;
                            temp = tp[i];
                            break;
                        }
                    }
                    if (!(found === true)) return [3 /*break*/, 3];
                    temp = tp[i];
                    return [4 /*yield*/, (0, localStorageUtils_js_1.pushChangesToLocalStorage)(tp)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, found];
            }
        });
    });
}
exports.markAsPendingInLS2 = markAsPendingInLS2;
