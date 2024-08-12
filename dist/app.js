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
exports.main = exports.sortBy = exports.filterButton = exports.searchButton = exports.searchInput = exports.completedTasksHeading = exports.tasksHeading = exports.add = exports.addNewTask = exports.completedTasksContainer = exports.tasksContainer = exports.popupForm = void 0;
const constants_js_1 = require("./components/constants.js");
const eventListenerCallbacks_js_1 = require("./components/eventListenerCallbacks.js");
const Observable_js_1 = require("./helper/observerPattern/Observable.js");
const TaskObserver_js_1 = require("./helper/observerPattern/TaskObserver.js");
const localStorageUtils_js_1 = require("./utils/localStorageUtils.js");
const taskUtils_js_1 = require("./utils/taskUtils.js");
exports.popupForm = document.querySelector(`${constants_js_1.documentElementClass.cssClassSelector}${constants_js_1.documentElementClass.popupForm}`);
exports.tasksContainer = document.querySelector(`${constants_js_1.documentElementClass.cssClassSelector}${constants_js_1.documentElementClass.tasksContainer}`);
exports.completedTasksContainer = document.querySelector(`${constants_js_1.documentElementClass.cssClassSelector}${constants_js_1.documentElementClass.completedTasksContainer}`);
exports.addNewTask = document.getElementById(constants_js_1.documentElementId.addNewTask);
exports.add = document.getElementById(constants_js_1.documentElementId.add);
exports.tasksHeading = document.getElementById(constants_js_1.documentElementId.tasksHeading);
exports.completedTasksHeading = document.getElementById(constants_js_1.documentElementId.completedTasksHeading);
exports.searchInput = document.getElementById(constants_js_1.documentElementId.searchInput);
exports.searchButton = document.getElementById(constants_js_1.documentElementId.searchButton);
exports.filterButton = document.getElementById(constants_js_1.documentElementId.filterButton);
exports.sortBy = document.getElementById(constants_js_1.documentElementId.sortBy);
window.addEventListener("load", main);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let taskData = yield (0, localStorageUtils_js_1.getJSON)();
        Observable_js_1.taskManager.setAllTasks(taskData);
        let taskObserver = new TaskObserver_js_1.TaskObserver();
        (0, taskUtils_js_1.display)(taskData);
        console.log(`${document.body.innerHTML}`);
        exports.addNewTask.addEventListener("click", eventListenerCallbacks_js_1.addNewTaskButtonHandler);
        if (!exports.add)
            return;
        exports.add.addEventListener("click", eventListenerCallbacks_js_1.addButtonHandler);
        if (exports.searchButton !== null) {
            exports.searchButton.addEventListener("click", eventListenerCallbacks_js_1.searchButtonHandler);
        }
        if (exports.filterButton !== null) {
            exports.filterButton.addEventListener("click", eventListenerCallbacks_js_1.filterForCompletedButtonHandler);
        }
        if (exports.sortBy !== null) {
            exports.sortBy.addEventListener("change", eventListenerCallbacks_js_1.sortByButtonHandler);
        }
    });
}
exports.main = main;
