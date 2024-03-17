
import { documentElementClass, documentElementId } from "./components/constants.js";
import { addButtonHandler, addNewTaskButtonHandler, filterForCompletedButtonHandler, searchButtonHandler, sortByButtonHandler } from "./components/eventListenerCallbacks.js";
import { Task } from "./helper/createTask.js";
import { taskManager } from "./helper/observerPattern/Observable.js";
import { TaskObserver } from "./helper/observerPattern/TaskObserver.js";
import { getJSON } from "./utils/localStorageUtils.js";
import { display } from "./utils/taskUtils.js";




export let popupForm=document.querySelector(`${documentElementClass.cssClassSelector}${documentElementClass.popupForm}`) as HTMLDivElement;


export let tasksContainer=document.querySelector(`${documentElementClass.cssClassSelector}${documentElementClass.tasksContainer}`) as HTMLDivElement;

export let completedTasksContainer=document.querySelector(`${documentElementClass.cssClassSelector}${documentElementClass.completedTasksContainer}`) as HTMLDivElement;


export let addNewTask=document.getElementById(documentElementId.addNewTask) as HTMLButtonElement;

export let add=document.getElementById(documentElementId.add) as HTMLButtonElement;

export let tasksHeading=document.getElementById(documentElementId.tasksHeading);

export let completedTasksHeading=document.getElementById(documentElementId.completedTasksHeading);

export let searchInput=document.getElementById(documentElementId.searchInput) as HTMLInputElement;

export let searchButton= document.getElementById(documentElementId.searchButton) as HTMLButtonElement;

export let filterButton=document.getElementById(documentElementId.filterButton);

export let sortBy=document.getElementById(documentElementId.sortBy) as HTMLSelectElement;

window.addEventListener("load",main);

export async function main(){

    let taskData:Task[]= await getJSON();
    taskManager.setAllTasks(taskData)
    let taskObserver:TaskObserver= new TaskObserver()



    display(taskData);
    console.log(`${document.body.innerHTML}`);
 
    addNewTask.addEventListener("click",addNewTaskButtonHandler);

    
    if(!add) return;
    add.addEventListener("click",addButtonHandler);

    if(searchButton !== null){
        searchButton.addEventListener("click",searchButtonHandler)
    }
  
    if(filterButton !== null){
        filterButton.addEventListener("click",filterForCompletedButtonHandler)
    }
   
    if(sortBy !== null){
        sortBy.addEventListener("change",sortByButtonHandler);

    }
 

}




















