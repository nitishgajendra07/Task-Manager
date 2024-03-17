import { completedTasksContainer, tasksContainer } from "../app.js";
import { Task } from "../helper/createTask.js";
import { getJSON, pushChangesToLocalStorage } from "../utils/localStorageUtils.js";
import { checkForExpiredTasks, getCounts, getParticularTaskPart, getTaskObject } from "../utils/taskUtils.js";
import { alertMessages, taskElementClasses } from "./constants.js";
import { deleteTaskButtonHandler, markTaskCompletedButtonHandler, unmarkButtonHandler } from "./eventListenerCallbacks.js";



export function createTaskElement(taskObj: Task) {
    let taskElement = document.createElement('div') as HTMLDivElement;
    taskElement.classList.add()

    let tName = document.createElement('p') as HTMLParagraphElement;
    tName.classList.add(taskElementClasses.taskName);
    tName.textContent = taskObj.taskName;

    let tDescription = document.createElement('p');
    tDescription.textContent = taskObj.taskDescription || "";
    tDescription.classList.add(taskElementClasses.taskDescription);

    let tDueDateTime = document.createElement('p') as HTMLParagraphElement;
    tDueDateTime.textContent = taskObj.dueDateTime || "";
    tDueDateTime.classList.add(taskElementClasses.dueDateTime);


    let tId = document.createElement('p') as HTMLParagraphElement;

        tId.textContent = taskObj.taskId
        tId.classList.add(taskElementClasses.taskId)

    let completionStatus = document.createElement('p') as HTMLParagraphElement;
        completionStatus.textContent = String(taskObj.completed);
        completionStatus.classList.add(taskElementClasses.completionStatus);

    let tDelete = document.createElement("button") as HTMLButtonElement;
    tDelete.classList.add(taskElementClasses.deleteTaskButton);
    tDelete.textContent = "Delete";
    tDelete.addEventListener('click', deleteTaskButtonHandler);


    if (taskObj.completed === false) {
        taskElement.classList.add(taskElementClasses.pendingTaskElement);

        let tMark = document.createElement("button") as HTMLButtonElement;
        tMark.textContent = "Mark completed";
        tMark.classList.add(taskElementClasses.markCompletedButton);
        tMark.addEventListener("click", markTaskCompletedButtonHandler);
        appendChildren(taskElement, tId, tName, tDescription, completionStatus, tDueDateTime, tDelete, tMark);
    }
    else if (taskObj.completed === true) {
        taskElement.classList.add(taskElementClasses.completedTaskElement);

        let tUnmark = document.createElement("button");
        tUnmark.textContent = "Unmark";
        tUnmark.classList.add(taskElementClasses.unmarkButton);
        tUnmark.addEventListener("click", unmarkButtonHandler);
        appendChildren(taskElement, tId, tName, tDescription, completionStatus, tDueDateTime, tDelete, tUnmark);
    }

    return taskElement;
}

export function appendChildren(parent: HTMLElement, ...children: HTMLElement[]) {
    children.forEach((child) => {
        parent.appendChild(child);
    });
}

export function createNewTaskElement(taskObj: Task) {
    let taskElement = createTaskElement(taskObj);
    if (taskElement == null) {
        alert(alertMessages.taskCreationFailed);
        return;
    }
    if (tasksContainer) {
        tasksContainer.insertBefore(taskElement, tasksContainer.children[0]);
    }
}

export async function markAsCompletedInLS2(taskObj:Task){
    let tId:string=taskObj.taskId

        let temp: Task;
        let tp = await getJSON();
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
        }
        return found;
}

export async function moveToMarkedComplete(taskElementToBeMoved: HTMLDivElement) {

    taskElementToBeMoved.classList.add();
    if (completedTasksContainer === null) {
        alert(alertMessages.completedTasksContainerNotFound);
        return;
    }
    completedTasksContainer.insertBefore(taskElementToBeMoved, completedTasksContainer.children[0]);
    getCounts()
}

export async function markAsPendingInLS2(taskObj:Task){
    let tId:string=taskObj.taskId

        let temp: Task;
        let tp = await getJSON()
        let found = false;
        let i;
        for (i = 0; i < tp.length; i++) {
            if (tp[i].taskId == tId) {
                found = true;
                tp[i].completed = false;

                temp = tp[i];
                break;
            }
        }
        if (found === true) {
            temp = tp[i]
            await pushChangesToLocalStorage(tp)
        }
        return found
}
