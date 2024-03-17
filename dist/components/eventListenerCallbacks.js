import { popupForm, searchInput, tasksContainer } from "../app.js";
import { TaskBuilder } from "../helper/createTask.js";
import { taskManager } from "../helper/observerPattern/Observable.js";
import { computeNewId } from "../utils/localStorageUtils.js";
import { checkForExpiredTasks, filterForCompleted2, getCounts, getTaskObject, searchTask, sortTasks } from "../utils/taskUtils.js";
import { alertMessages } from "./constants.js";
export async function deleteTaskButtonHandler(e) {
    e.preventDefault();
    let target = e.target;
    const parentElement = target.parentElement;
    let taskObj = getTaskObject(parentElement);
    taskManager.deleteTask(taskObj);
    if (target.parentElement) {
        target.parentElement.remove();
    }
    getCounts();
}
export async function markTaskCompletedButtonHandler(e) {
    e.preventDefault();
    let target = e.target;
    if (!target)
        return;
    const parentElement = target.parentElement;
    if (!parentElement)
        return;
    if (tasksContainer === null) {
        alert(alertMessages.taskContainerNotFound);
        return;
    }
    let taskObj = getTaskObject(parentElement);
    taskManager.markTaskAsCompleted(taskObj);
    tasksContainer.removeChild(parentElement);
    getCounts();
}
export async function unmarkButtonHandler(e) {
    e.preventDefault();
    let target = e.target;
    if (!target)
        return;
    const parentElement = target.parentElement;
    if (!parentElement)
        return;
    let taskObj = getTaskObject(parentElement);
    taskManager.markAsPending(taskObj);
    parentElement.remove();
    checkForExpiredTasks(tasksContainer);
    getCounts();
}
export function addNewTaskButtonHandler(e) {
    e.preventDefault();
    popupForm.style.display = "block";
}
export async function addButtonHandler(e) {
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
        alert(alertMessages.dateInput);
        inputDue.focus();
        return;
    }
    let tId = await computeNewId();
    let taskObj = new TaskBuilder(inputTask.value, tId)
        .setTaskDescription(inputDescription.value)
        .setCompletionStatus(false)
        .setDueDateTime(inputDue.value)
        .build();
    taskManager.addTask(taskObj);
    getCounts();
    inputTask.value = "";
    inputDescription.value = "";
    inputDue.value = "";
    popupForm.style.display = "none";
}
export function filterForCompletedButtonHandler(e) {
    e.preventDefault();
    filterForCompleted2();
}
export function searchButtonHandler(e) {
    e.preventDefault();
    searchTask(searchInput.value);
}
export async function sortByButtonHandler(e) {
    e.preventDefault();
    let target = e.target;
    let choice = target.value;
    sortTasks(choice);
}
