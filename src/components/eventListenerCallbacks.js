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
exports.sortByButtonHandler = exports.searchButtonHandler = exports.filterForCompletedButtonHandler = exports.addButtonHandler = exports.addNewTaskButtonHandler = exports.unmarkButtonHandler = exports.markTaskCompletedButtonHandler = exports.deleteTaskButtonHandler = void 0;
var app_js_1 = require("../app.js");
var createTask_js_1 = require("../helper/createTask.js");
var Observable_js_1 = require("../helper/observerPattern/Observable.js");
var localStorageUtils_js_1 = require("../utils/localStorageUtils.js");
var taskUtils_js_1 = require("../utils/taskUtils.js");
var constants_js_1 = require("./constants.js");
function deleteTaskButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function () {
        var target, parentElement, taskObj;
        return __generator(this, function (_a) {
            e.preventDefault();
            target = e.target;
            parentElement = target.parentElement;
            taskObj = (0, taskUtils_js_1.getTaskObject)(parentElement);
            Observable_js_1.taskManager.deleteTask(taskObj);
            if (target.parentElement) {
                target.parentElement.remove();
            }
            (0, taskUtils_js_1.getCounts)();
            return [2 /*return*/];
        });
    });
}
exports.deleteTaskButtonHandler = deleteTaskButtonHandler;
function markTaskCompletedButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function () {
        var target, parentElement, taskObj;
        return __generator(this, function (_a) {
            e.preventDefault();
            target = e.target;
            if (!target)
                return [2 /*return*/];
            parentElement = target.parentElement;
            if (!parentElement)
                return [2 /*return*/];
            if (app_js_1.tasksContainer === null) {
                alert(constants_js_1.alertMessages.taskContainerNotFound);
                return [2 /*return*/];
            }
            taskObj = (0, taskUtils_js_1.getTaskObject)(parentElement);
            Observable_js_1.taskManager.markTaskAsCompleted(taskObj);
            app_js_1.tasksContainer.removeChild(parentElement);
            (0, taskUtils_js_1.getCounts)();
            return [2 /*return*/];
        });
    });
}
exports.markTaskCompletedButtonHandler = markTaskCompletedButtonHandler;
function unmarkButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function () {
        var target, parentElement, taskObj;
        return __generator(this, function (_a) {
            e.preventDefault();
            target = e.target;
            if (!target)
                return [2 /*return*/];
            parentElement = target.parentElement;
            if (!parentElement)
                return [2 /*return*/];
            taskObj = (0, taskUtils_js_1.getTaskObject)(parentElement);
            Observable_js_1.taskManager.markAsPending(taskObj);
            parentElement.remove();
            (0, taskUtils_js_1.checkForExpiredTasks)(app_js_1.tasksContainer);
            (0, taskUtils_js_1.getCounts)();
            return [2 /*return*/];
        });
    });
}
exports.unmarkButtonHandler = unmarkButtonHandler;
function addNewTaskButtonHandler(e) {
    e.preventDefault();
    app_js_1.popupForm.style.display = "block";
}
exports.addNewTaskButtonHandler = addNewTaskButtonHandler;
function addButtonHandler(e) {
    return __awaiter(this, void 0, void 0, function () {
        var target, parentElement, inputTask, inputDue, inputDescription, tId, taskObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    target = e.target;
                    if (!target)
                        return [2 /*return*/];
                    parentElement = target.parentElement;
                    if (!parentElement)
                        return [2 /*return*/];
                    inputTask = parentElement.children[1];
                    inputDue = parentElement.children[5];
                    inputDescription = parentElement.children[3];
                    if (inputTask.value === "") {
                        inputTask.focus();
                        return [2 /*return*/];
                    }
                    else if (new Date(inputDue.value) <= new Date()) {
                        alert(constants_js_1.alertMessages.dateInput);
                        inputDue.focus();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, localStorageUtils_js_1.computeNewId)()];
                case 1:
                    tId = _a.sent();
                    taskObj = new createTask_js_1.TaskBuilder(inputTask.value, tId)
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
                    return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var target, choice;
        return __generator(this, function (_a) {
            e.preventDefault();
            target = e.target;
            choice = target.value;
            (0, taskUtils_js_1.sortTasks)(choice);
            return [2 /*return*/];
        });
    });
}
exports.sortByButtonHandler = sortByButtonHandler;
