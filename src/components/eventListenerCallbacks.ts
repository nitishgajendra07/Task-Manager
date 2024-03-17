import { completedTasksContainer, popupForm, searchInput, tasksContainer } from "../app.js";
import { Task, TaskBuilder } from "../helper/createTask.js";
import { taskManager } from "../helper/observerPattern/Observable.js";
import { addNewTaskToLS, computeNewId, getJSON, pushChangesToLocalStorage, removeInLocalStorage } from "../utils/localStorageUtils.js";
import { checkForExpiredTasks, filterForCompleted, filterForCompleted2, getCounts, getParticularTaskPart, getTaskObject, searchTask, sortTasks } from "../utils/taskUtils.js";
import { alertMessages } from "./constants.js";


export async function deleteTaskButtonHandler(e:MouseEvent){
    e.preventDefault();
    let target=e.target as HTMLButtonElement;

    const parentElement = target.parentElement as HTMLDivElement;

    let taskObj:Task=getTaskObject(parentElement)
    taskManager.deleteTask(taskObj)

    if(target.parentElement){
        target.parentElement.remove();
    }
    getCounts();
}

export async function markTaskCompletedButtonHandler(e:MouseEvent){
    e.preventDefault();
    let target=e.target as HTMLButtonElement;
    if(!target) return;

    
    const parentElement = target.parentElement as HTMLDivElement;
    if(!parentElement) return;

    if(tasksContainer === null){
        alert(alertMessages.taskContainerNotFound);
        return;
    }

    let taskObj=getTaskObject(parentElement)
    taskManager.markTaskAsCompleted(taskObj)
    tasksContainer.removeChild(parentElement);
    getCounts();
}

export async function unmarkButtonHandler(e:MouseEvent){
    e.preventDefault();
    let target=e.target as HTMLButtonElement;
    if(!target) return;
 
    const parentElement = target.parentElement as HTMLDivElement;
    if(!parentElement) return;

    let taskObj:Task= getTaskObject(parentElement)
    taskManager.markAsPending(taskObj)

    parentElement.remove();
    checkForExpiredTasks(tasksContainer)
    getCounts();
}



export function addNewTaskButtonHandler(e:MouseEvent){
    e.preventDefault();
    popupForm.style.display="block";
}

export async function addButtonHandler(e:MouseEvent){
    e.preventDefault()

    let target=e.target as HTMLElement
    if(!target) return;

    const parentElement = target.parentElement as HTMLDivElement;
    if(!parentElement) return;
 
    let inputTask=parentElement.children[1] as HTMLInputElement;
 
    let inputDue= parentElement.children[5] as HTMLInputElement;

    let inputDescription=parentElement.children[3] as HTMLInputElement;

    if(inputTask.value===""){
        inputTask.focus();
        return;
    }
    
    else if(new Date(inputDue.value) <= new Date()){
        alert(alertMessages.dateInput);
        inputDue.focus();
        return;
    }   
    let tId:string=await computeNewId()
    let taskObj:Task=new TaskBuilder(inputTask.value, tId)  
                        .setTaskDescription(inputDescription.value)
                        .setCompletionStatus(false)
                        .setDueDateTime(inputDue.value)
                        .build();


    taskManager.addTask(taskObj);


    getCounts();
    inputTask.value="";
    inputDescription.value="";
    inputDue.value="";
    popupForm.style.display="none";
}



export function filterForCompletedButtonHandler(e:MouseEvent){
    e.preventDefault();
    filterForCompleted2();
}

export function searchButtonHandler(e:MouseEvent){
    e.preventDefault();
    searchTask(searchInput.value);
}

export async function sortByButtonHandler(e:Event) {
    e.preventDefault();
    let target = e.target as HTMLSelectElement;
    let choice = target.value;

    sortTasks(choice);
}