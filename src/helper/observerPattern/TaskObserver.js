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
exports.TaskObserver = void 0;
var app_js_1 = require("../../app.js");
var taskComponents_js_1 = require("../../components/taskComponents.js");
var Observable_js_1 = require("./Observable.js");
var localStorageUtils_js_1 = require("../../utils/localStorageUtils.js");
var taskUtils_js_1 = require("../../utils/taskUtils.js");
var TaskObserver = /** @class */ (function () {
    function TaskObserver() {
        Observable_js_1.taskManager.addObserver(this);
    }
    TaskObserver.prototype.taskAddedOperation = function (task) {
        var taskElement = (0, taskComponents_js_1.createNewTaskElement)(task);
        (0, localStorageUtils_js_1.addNewTaskToLS)(task);
    };
    TaskObserver.prototype.taskCompletedOperation = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var validElement, completedTaskElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, taskComponents_js_1.markAsCompletedInLS2)(task)];
                    case 1:
                        validElement = _a.sent();
                        if (validElement) {
                            completedTaskElement = (0, taskComponents_js_1.createTaskElement)(task);
                            if (!completedTaskElement) {
                                return [2 /*return*/];
                            }
                            (0, taskComponents_js_1.moveToMarkedComplete)(completedTaskElement);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskObserver.prototype.taskPendingOperation = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var validElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, taskComponents_js_1.markAsPendingInLS2)(task)];
                    case 1:
                        validElement = _a.sent();
                        if (validElement) {
                            (0, taskComponents_js_1.createNewTaskElement)(task); // its name is deceptive it calls createTaskElement() and adds its return value at the top of taskContainer.children
                            (0, taskUtils_js_1.checkForExpiredTasks)(app_js_1.tasksContainer);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskObserver.prototype.taskDeletedOpearation = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var taskElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskElement = (0, taskComponents_js_1.createTaskElement)(task);
                        return [4 /*yield*/, (0, localStorageUtils_js_1.removeInLocalStorage)(task.taskId)];
                    case 1:
                        _a.sent(); //  UI taskElement is being deleted in the callback
                        return [2 /*return*/];
                }
            });
        });
    };
    return TaskObserver;
}());
exports.TaskObserver = TaskObserver;
