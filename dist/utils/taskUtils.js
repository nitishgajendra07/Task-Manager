import { addNewTask, completedTasksContainer, completedTasksHeading, tasksContainer, tasksHeading } from "../app.js";
import { alertMessages, documentElementId, placeHolders, taskElementClasses, taskObjProps } from "../components/constants.js";
import { createTaskElement } from "../components/taskComponents.js";
import { TaskBuilder } from "../helper/createTask.js";
import { getJSON } from "./localStorageUtils.js";
export function display(arrayOfObjectsToBeDisplayed) {
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }
    while (completedTasksContainer.firstChild) {
        completedTasksContainer.removeChild(completedTasksContainer.firstChild);
    }
    let temp;
    for (let i = 0; i < arrayOfObjectsToBeDisplayed.length; i++) {
        temp = arrayOfObjectsToBeDisplayed[i];
        if (temp.completed === false) {
            let taskElement = createTaskElement(temp);
            if (taskElement == null) {
                alert(alertMessages.taskElementFieldsAbsent);
            }
            else {
                tasksContainer.append(taskElement);
            }
        }
        else if (temp.completed === true) {
            let completedTaskElement = createTaskElement(temp);
            if (completedTaskElement == null) {
                alert(alertMessages.completedTaskFieldsAbsent);
            }
            else {
                completedTasksContainer.append(completedTaskElement);
            }
        }
    }
    checkForExpiredTasks(tasksContainer);
    getCounts();
}
export function checkForExpiredTasks(elementList) {
    for (let i = 0; i < elementList.children.length; i++) {
        let dueDateTimeParent = getParticularTaskPart(elementList.children[i], taskElementClasses.dueDateTime);
        let dueDateTime = dueDateTimeParent === null || dueDateTimeParent === void 0 ? void 0 : dueDateTimeParent.textContent;
        if (typeof dueDateTime === "string") {
            if (new Date(dueDateTime) <= new Date()) {
                elementList.children[i].classList.remove(taskElementClasses.pendingTaskElement);
                elementList.children[i].classList.add(taskElementClasses.expired);
            }
        }
    }
}
let totalCount = document.getElementById(documentElementId.totalCount);
let tasksCount = document.getElementById(documentElementId.tasksCount);
let completedTasksCount = document.getElementById(documentElementId.completedTasksCount);
export async function getCounts() {
    let tp = await getJSON();
    if (totalCount) {
        totalCount.textContent = `${placeHolders.Total} ${getTotalCount(tp)}`;
    }
    if (tasksCount) {
        tasksCount.textContent = `${placeHolders.TasksToBeCompleted} ${getIncompleteTasksCount(tp)}`;
    }
    if (completedTasksCount) {
        completedTasksCount.textContent = `${placeHolders.Completed} ${getCompletedTasksCount(tp)}`;
    }
}
export function getTotalCount(tp) {
    return tp.length;
}
export function getIncompleteTasksCount(tp) {
    let tasksCount = tp.reduce((acc, taskObject) => {
        if (taskObject.completed === false) {
            acc += 1;
        }
        return acc;
    }, 0);
    return tasksCount;
}
export function getCompletedTasksCount(tp) {
    let completedTasksCount = tp.reduce((acc, taskObject) => {
        if (taskObject.completed === true) {
            acc = acc + 1;
        }
        return acc;
    }, 0);
    return completedTasksCount;
}
export async function filterForCompleted() {
    let newList;
    let tp = await getJSON();
    newList = tp.filter((taskObject) => {
        return taskObject.completed === true;
    });
    removeAllPageContents();
    display(newList);
}
export function getTaskObject(taskElement) {
    var _a;
    let tNameParent = getParticularTaskPart(taskElement, taskElementClasses.taskName);
    if (!tNameParent) {
        alert(alertMessages.taskNameAbsent);
        throw new Error;
    }
    if (tNameParent.textContent === null) {
        alert(alertMessages.taskNameTextContentAbsent);
        throw new Error;
    }
    let tName = tNameParent.textContent;
    let tDescriptionParent = getParticularTaskPart(taskElement, taskElementClasses.taskDescription);
    if (tDescriptionParent === undefined) {
        throw new Error;
    }
    if (tDescriptionParent.textContent === null) {
        throw new Error;
    }
    let tDescription = tDescriptionParent.textContent || "";
    let tIdParent = getParticularTaskPart(taskElement, taskElementClasses.taskId);
    if (tIdParent == undefined) {
        throw new Error;
    }
    if (tIdParent.textContent == null) {
        throw new Error;
    }
    let tId = tIdParent.textContent;
    let tDueDateTime = ((_a = getParticularTaskPart(taskElement, taskElementClasses.dueDateTime)) === null || _a === void 0 ? void 0 : _a.textContent) || "";
    let tCompletionStatusParent = getParticularTaskPart(taskElement, taskElementClasses.completionStatus);
    let tCompletionStatus;
    if (tCompletionStatusParent.textContent === "true") {
        tCompletionStatus = true;
    }
    else {
        tCompletionStatus = false;
    }
    let taskObj = new TaskBuilder(tName, tId)
        .setTaskDescription(tDescription)
        .setCompletionStatus(tCompletionStatus)
        .setDueDateTime(tDueDateTime)
        .build();
    return taskObj;
}
export function getParticularTaskPart(taskElement, classToLookFor) {
    let newList = [...taskElement.children];
    let particularTaskPart = newList.find((element) => {
        if (element.classList.contains(classToLookFor))
            return true;
    });
    return particularTaskPart;
}
export function getAllTasksInCurrentDisplay() {
    let newTaskElementList = [...tasksContainer.children, ...completedTasksContainer.children];
    let newTaskObjectList = [];
    newTaskElementList.forEach((taskElement) => {
        let taskObj = getTaskObject(taskElement);
        newTaskObjectList.push(taskObj);
    });
    return newTaskObjectList;
}
export async function filterForCompleted2() {
    let newTaskElementList = [...tasksContainer.children, ...completedTasksContainer.children];
    let newTaskObjectList = [];
    newTaskElementList.forEach((taskElement) => {
        let taskObj = getTaskObject(taskElement);
        newTaskObjectList.push(taskObj);
    });
    let filteredObjectList = newTaskObjectList.filter((taskObj) => {
        return taskObj.completed === true;
    });
    removeAllPageContents();
    display(filteredObjectList);
}
export function removeAllPageContents() {
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }
    while (completedTasksContainer.firstChild) {
        completedTasksContainer.removeChild(completedTasksContainer.firstChild);
    }
    if (addNewTask) {
        addNewTask.remove();
    }
    if (tasksHeading) {
        tasksHeading.remove();
    }
    if (completedTasksHeading) {
        completedTasksHeading.remove();
    }
}
export function sortTasks(choice) {
    let allTaskObjectsInDisplay = getAllTasksInCurrentDisplay();
    if (choice == "A-Z") {
        let newList;
        function customSort(a, b) {
            let first = a.taskName.toLowerCase();
            let second = b.taskName.toLowerCase();
            let swap = 0;
            if (first > second) {
                swap = 1;
            }
            else if (first < second) {
                swap = -1;
            }
            return swap;
        }
        newList = allTaskObjectsInDisplay.slice();
        newList.sort(customSort);
        display(newList);
    }
    else if (choice === "Z-A") {
        let newList;
        function customSort(a, b) {
            let first = a.taskName.toLowerCase();
            let second = b.taskName.toLowerCase();
            let swap = 0;
            if (first > second) {
                swap = -1;
            }
            else if (first < second) {
                swap = 1;
            }
            return swap;
        }
        newList = allTaskObjectsInDisplay.slice();
        newList.sort(customSort);
        display(newList);
    }
    else if (choice == "date") {
        let newList;
        function customSort(a, b) {
            if (a.dueDateTime === undefined) {
                a.dueDateTime = "";
            }
            if (b.dueDateTime === undefined) {
                b.dueDateTime = "";
            }
            let first = a.dueDateTime.toLowerCase();
            let second = b.dueDateTime.toLowerCase();
            let swap = 0;
            if (a.dueDateTime === "") {
                return 1;
            }
            if (b.dueDateTime === "") {
                return -1;
            }
            if (first > second) {
                swap = 1;
            }
            else if (first < second) {
                swap = -1;
            }
            return swap;
        }
        newList = allTaskObjectsInDisplay.slice();
        newList.sort(customSort);
        display(newList);
    }
}
export async function searchTask(str) {
    let t, temp;
    let allTaskObjectsInDisplay = getAllTasksInCurrentDisplay();
    let newList;
    newList = allTaskObjectsInDisplay.filter(function (taskObject) {
        return taskObject.taskName.toLowerCase().includes(str.toLowerCase());
    });
    display(newList);
}
export function isTask(obj) {
    let result = ((typeof obj === "object") &&
        (taskObjProps.taskId in obj && typeof obj.taskId === "string") &&
        (taskObjProps.taskName in obj && typeof obj.taskName === "string") &&
        (taskObjProps.taskDescription in obj && typeof obj.taskDescription === "string") &&
        (taskObjProps.dueDateTime in obj && typeof obj.dueDateTime === "string") &&
        (taskObjProps.completed in obj && typeof obj.completed === "boolean"));
    return result;
}
