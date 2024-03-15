import { addButtonHandler, addNewTaskButtonHandler, filterForCompletedButtonHandler, searchButtonHandler, sortByButtonHandler } from "./components/eventListenerCallbacks.js";
import { getJSON } from "./utils/localStorageUtils.js";
import { display } from "./utils/taskUtils.js";
export let popupForm = document.querySelector(".popupForm");
console.log("app.ts/js");
// localStorage.setItem("tasks","[1,2,3]")
export let tasksContainer = document.querySelector(".tasksContainer");
console.log("tasksContainer", tasksContainer);
export let completedTasksContainer = document.querySelector(".completedTasksContainer");
console.log("completedTasksContainer", completedTasksContainer);
export let addNewTask = document.querySelector("#addNewTask");
export let add = document.querySelector("#add");
export let tasksHeading = document.getElementById("tasksHeading");
export let completedTasksHeading = document.getElementById("completedTasksHeading");
export let searchInput = document.getElementById("searchInput");
export let searchButton = document.getElementById("searchButton");
export let filterButton = document.getElementById("filterButton");
export let sortBy = document.getElementById("sortBy");
window.addEventListener("load", main);
export async function main() {
    console.log("main");
    let taskData = await getJSON();
    console.log(taskData);
    display(taskData);
    addNewTask.addEventListener("click", addNewTaskButtonHandler);
    if (!add)
        return;
    add.addEventListener("click", addButtonHandler);
    if (searchButton !== null) {
        searchButton.addEventListener("click", searchButtonHandler);
    }
    if (filterButton !== null) {
        filterButton.addEventListener("click", filterForCompletedButtonHandler);
    }
    if (sortBy !== null) {
        sortBy.addEventListener("change", sortByButtonHandler);
    }
}
export function isTask(obj) {
    let result = ((typeof obj === "object") &&
        ("taskId" in obj && typeof obj.taskId === "string") &&
        ("taskName" in obj && typeof obj.taskName === "string") &&
        ("taskDescription" in obj && typeof obj.taskDescription === "string") &&
        ("dueDateTime" in obj && typeof obj.dueDateTime === "string") &&
        ("completed in obj" && typeof obj.completed === "boolean"));
    return result;
}
