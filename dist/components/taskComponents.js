import { completedTasksContainer, tasksContainer } from "../app.js";
import { getJSON, pushChangesToLocalStorage } from "../utils/localStorageUtils.js";
import { checkForExpiredTasks, getCounts } from "../utils/taskUtils.js";
import { deleteTaskButtonHandler, markTaskCompletedButtonHandler, unmarkButtonHandler } from "./eventListenerCallbacks.js";
export function createTaskElement(taskObj) {
    let taskElement = document.createElement('div');
    // taskElement.setAttribute('class',"taskElement");
    let tName = document.createElement('p');
    tName.classList.add("taskName");
    tName.textContent = taskObj.taskName;
    let tDescription = document.createElement('p');
    if (taskObj.taskDescription) {
        tDescription.textContent = taskObj.taskDescription || "  ";
        tDescription.classList.add("taskDescription");
    }
    let tDueDateTime = document.createElement('p');
    if (taskObj.dueDateTime) {
        tDueDateTime.textContent = taskObj.dueDateTime;
        tDueDateTime.classList.add("dueDateTime");
    }
    let tId = document.createElement('p');
    if (taskObj.taskId) {
        tId.textContent = taskObj.taskId;
    }
    let completionStatus = document.createElement('p');
    if (taskObj.completed !== undefined) {
        completionStatus.textContent = String(taskObj.completed);
    }
    let tDelete = document.createElement("button");
    tDelete.classList.add('deleteTaskButton');
    tDelete.textContent = "Delete";
    tDelete.addEventListener('click', deleteTaskButtonHandler);
    if (taskObj.completed === false) {
        taskElement.classList.add("pendingTaskElement");
        // if(taskElement.classList.contains("completedTaskElement")){
        //     taskElement.classList.remove("completedTaskElement")
        // }
        let tMark = document.createElement("button");
        tMark.textContent = "Mark completed";
        tMark.addEventListener("click", markTaskCompletedButtonHandler);
        appendChildren(taskElement, tId, tName, tDescription, tDueDateTime, tDelete, tMark);
    }
    else if (taskObj.completed === true) {
        taskElement.classList.add("completedTaskElement");
        // if(taskElement.classList.contains("pendingTaskElement")){
        //     taskElement.classList.remove("pendingTaskElement")
        // }
        let tUnmark = document.createElement("button");
        tUnmark.innerText = "Unmark";
        tUnmark.addEventListener("click", unmarkButtonHandler);
        appendChildren(taskElement, tId, tName, tDescription, tDescription, tDelete, tUnmark);
    }
    // let brTag=document.createElement("br")
    return taskElement;
}
export function appendChildren(parent, ...children) {
    children.forEach((child) => {
        parent.appendChild(child);
    });
}
export function createNewTaskElement(taskObj) {
    let taskElement = createTaskElement(taskObj);
    if (tasksContainer) {
        tasksContainer.insertBefore(taskElement, tasksContainer.children[0]);
    }
}
export async function moveToMarkedComplete(taskElementToBeMoved) {
    let t, temp;
    // let taskName=taskElementToBeMoved.children[0].textContent;
    let tId = taskElementToBeMoved.children[0].textContent;
    let tp = await getJSON();
    // temp;
    let found = false;
    let i;
    for (i = 0; i < tp.length; i++) {
        if (tp[i].taskId == tId) {
            found = true;
            tp[i].completed = true;
            temp = tp[i];
            break;
        }
    }
    if (found === true) {
        temp = tp[i];
        await pushChangesToLocalStorage(tp);
        let movedTask = createTaskElement(temp);
        // if(movedTask.classList.contains("pendingTaskElement")){
        //     movedTask.classList.remove("pendingTaskElement")
        // }
        movedTask.classList.add("completedTaskElement");
        if (completedTasksContainer === null) {
            console.log("completedTasksContainer is empty. check HTML page");
            return;
        }
        completedTasksContainer.insertBefore(movedTask, completedTasksContainer.children[0]);
    }
    getCounts();
}
export async function moveToPending(completedTaskElement) {
    let t, temp;
    let tp = await getJSON();
    let found = false;
    let i;
    for (i = 0; i < tp.length; i++) {
        if (tp[i].taskId === completedTaskElement.children[0].textContent) {
            found = true;
            tp[i].completed = false;
            break;
        }
    }
    if (found === true) {
        temp = tp[i];
        await pushChangesToLocalStorage(tp);
        createNewTaskElement(temp);
    }
    checkForExpiredTasks(tasksContainer);
}
