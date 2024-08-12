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
exports.main = exports.sortBy = exports.filterButton = exports.searchButton = exports.searchInput = exports.completedTasksHeading = exports.tasksHeading = exports.add = exports.addNewTask = exports.completedTasksContainer = exports.tasksContainer = exports.popupForm = void 0;
var constants_js_1 = require("./components/constants.js");
var eventListenerCallbacks_js_1 = require("./components/eventListenerCallbacks.js");
var Observable_js_1 = require("./helper/observerPattern/Observable.js");
var TaskObserver_js_1 = require("./helper/observerPattern/TaskObserver.js");
var localStorageUtils_js_1 = require("./utils/localStorageUtils.js");
var taskUtils_js_1 = require("./utils/taskUtils.js");
exports.popupForm = document.querySelector("".concat(constants_js_1.documentElementClass.cssClassSelector).concat(constants_js_1.documentElementClass.popupForm));
exports.tasksContainer = document.querySelector("".concat(constants_js_1.documentElementClass.cssClassSelector).concat(constants_js_1.documentElementClass.tasksContainer));
exports.completedTasksContainer = document.querySelector("".concat(constants_js_1.documentElementClass.cssClassSelector).concat(constants_js_1.documentElementClass.completedTasksContainer));
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
    return __awaiter(this, void 0, void 0, function () {
        var taskData, taskObserver;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, localStorageUtils_js_1.getJSON)()];
                case 1:
                    taskData = _a.sent();
                    Observable_js_1.taskManager.setAllTasks(taskData);
                    taskObserver = new TaskObserver_js_1.TaskObserver();
                    (0, taskUtils_js_1.display)(taskData);
                    console.log("".concat(document.body.innerHTML));
                    exports.addNewTask.addEventListener("click", eventListenerCallbacks_js_1.addNewTaskButtonHandler);
                    if (!exports.add)
                        return [2 /*return*/];
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
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
