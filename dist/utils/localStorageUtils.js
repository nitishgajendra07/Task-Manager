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
exports.computeNewId = exports.addNewTaskToLS = exports.removeInLocalStorage = exports.pushChangesToLocalStorage = exports.getJSON = void 0;
const taskUtils_js_1 = require("./taskUtils.js");
function getJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield localStorage.getItem("tasks");
        let dataParsed;
        if (data === null) {
            dataParsed = [];
        }
        else {
            try {
                dataParsed = JSON.parse(data);
                if (Array.isArray(dataParsed) && dataParsed.every((obj) => { return (0, taskUtils_js_1.isTask)(obj); })) {
                }
                else {
                    dataParsed = [];
                    localStorage.setItem("tasks", "[]");
                }
            }
            catch (e) {
                dataParsed = [];
                localStorage.setItem("tasks", "[]");
            }
        }
        return dataParsed;
    });
}
exports.getJSON = getJSON;
function pushChangesToLocalStorage(tp) {
    return __awaiter(this, void 0, void 0, function* () {
        yield localStorage.setItem("tasks", JSON.stringify(tp));
    });
}
exports.pushChangesToLocalStorage = pushChangesToLocalStorage;
function removeInLocalStorage(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        let t, temp;
        let tp = yield getJSON();
        for (let i = 0; i < tp.length; i++) {
            if (tp[i].taskId === taskId.toString()) {
                tp.splice(i, 1);
                break;
            }
        }
        yield pushChangesToLocalStorage(tp);
        return tp;
    });
}
exports.removeInLocalStorage = removeInLocalStorage;
function addNewTaskToLS(taskObj) {
    return __awaiter(this, void 0, void 0, function* () {
        let tp = yield getJSON();
        tp.unshift(taskObj);
        yield pushChangesToLocalStorage(tp);
    });
}
exports.addNewTaskToLS = addNewTaskToLS;
function computeNewId() {
    return __awaiter(this, void 0, void 0, function* () {
        let tp = yield getJSON();
        let newId = 0;
        if (tp.length > 0) {
            let max = 0;
            for (let i = 0; i < tp.length; i++) {
                let taskIdnum = parseInt(tp[i].taskId);
                if (taskIdnum > max) {
                    max = taskIdnum;
                }
            }
            newId = max + 1;
        }
        else {
            newId = 1;
        }
        return newId.toString();
    });
}
exports.computeNewId = computeNewId;
