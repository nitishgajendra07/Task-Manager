import { popupForm, searchInput, tasksContainer } from "../app.js";
import { TaskBuilder } from "../helper/createTask.js";
import { getJSON, pushChangesToLocalStorage, removeInLocalStorage } from "../utils/localStorageUtils.js";
import { filterForCompleted, getCounts, searchTask, sortTasks } from "../utils/taskUtils.js";
import { dateInputAlert } from "./constants.js";
import { createNewTaskElement, moveToMarkedComplete, moveToPending } from "./taskComponents.js";
export async function deleteTaskButtonHandler(e) {
    e.preventDefault();
    let target = e.target;
    if (!target)
        return;
    const parentElement = target.parentElement;
    if (!parentElement)
        return;
    if (!parentElement.children[0].textContent)
        return;
    await removeInLocalStorage(parentElement.children[0].textContent);
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
        console.log("taskContainer is not present check html page");
        return;
    }
    await moveToMarkedComplete(parentElement);
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
    await moveToPending(parentElement);
    parentElement.remove();
    getCounts();
}
export function addNewTaskButtonHandler(e) {
    e.preventDefault();
    popupForm.style.display = "block";
}
export async function addButtonHandler(e) {
    e.preventDefault();
    console.log("add clicked");
    let tp = await getJSON();
    console.log(tp);
    let target = e.target;
    if (!target)
        return;
    const parentElement = target.parentElement;
    if (!parentElement)
        return;
    console.log(parentElement.children);
    let inputTask = parentElement.children[1];
    console.log("inputTask", inputTask);
    let inputDue = parentElement.children[5];
    console.log("inputDue", inputDue);
    let inputDescription = parentElement.children[3];
    console.log("inputDescription", inputDescription);
    if (inputTask.value === "") {
        inputTask.focus();
        return;
    }
    else if (new Date(inputDue.value) <= new Date()) {
        console.log("due", inputDue.value);
        alert(dateInputAlert);
        inputDue.focus();
        return;
    }
    console.log("inputTask.value= ", inputTask.value);
    let temp = new TaskBuilder(inputTask.value)
        .setId(computeNewId(tp))
        .setTaskDescription(inputDescription.value)
        .setCompletionStatus(false)
        .setDueDateTime(inputDue.value)
        .build();
    console.log("after buld()", temp);
    tp.unshift(temp);
    console.log("tp before pushiong", tp);
    await pushChangesToLocalStorage(tp);
    getCounts();
    createNewTaskElement(temp);
    // let check=await getJSON()
    // console.log("check",check);
    getCounts();
    console.log("after createNewTaskElement()", localStorage.getItem("tasks"));
    inputTask.value = "";
    inputDescription.value = "";
    inputDue.value = "";
    popupForm.style.display = "none";
}
function computeNewId(tp) {
    // let tp= await getJSON()
    console.log("entered computenewI");
    console.log(tp);
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
}
export function filterForCompletedButtonHandler(e) {
    e.preventDefault();
    filterForCompleted();
}
export function searchButtonHandler(e) {
    e.preventDefault();
    if (searchInput !== null)
        searchTask(searchInput.value);
}
export async function sortByButtonHandler(e) {
    e.preventDefault();
    let target = e.target;
    let choice = target.value;
    let tp = await getJSON();
    sortTasks(choice, tp);
}
