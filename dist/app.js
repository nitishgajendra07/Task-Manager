import { documentElementClass, documentElementId } from "./components/constants.js";
import { addButtonHandler, addNewTaskButtonHandler, filterForCompletedButtonHandler, searchButtonHandler, sortByButtonHandler } from "./components/eventListenerCallbacks.js";
import { taskManager } from "./helper/observerPattern/Observable.js";
import { TaskObserver } from "./helper/observerPattern/TaskObserver.js";
import { getJSON } from "./utils/localStorageUtils.js";
import { display } from "./utils/taskUtils.js";
export let popupForm = document.querySelector(`${documentElementClass.cssClassSelector}${documentElementClass.popupForm}`);
export let tasksContainer = document.querySelector(`${documentElementClass.cssClassSelector}${documentElementClass.tasksContainer}`);
export let completedTasksContainer = document.querySelector(`${documentElementClass.cssClassSelector}${documentElementClass.completedTasksContainer}`);
export let addNewTask = document.getElementById(documentElementId.addNewTask);
export let add = document.getElementById(documentElementId.add);
export let tasksHeading = document.getElementById(documentElementId.tasksHeading);
export let completedTasksHeading = document.getElementById(documentElementId.completedTasksHeading);
export let searchInput = document.getElementById(documentElementId.searchInput);
export let searchButton = document.getElementById(documentElementId.searchButton);
export let filterButton = document.getElementById(documentElementId.filterButton);
export let sortBy = document.getElementById(documentElementId.sortBy);
window.addEventListener("load", main);
export async function main() {
    let taskData = await getJSON();
    taskManager.setAllTasks(taskData);
    let taskObserver = new TaskObserver();
    display(taskData);
    console.log(`${document.body.innerHTML}`);
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
