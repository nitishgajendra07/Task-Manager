
import { addButtonHandler, addNewTaskButtonHandler, filterForCompletedButtonHandler, searchButtonHandler, sortByButtonHandler } from "./components/eventListenerCallbacks.js";
import { Task } from "./helper/createTask.js";
import { getJSON } from "./utils/localStorageUtils.js";
import { display } from "./utils/taskUtils.js";




export let popupForm=document.querySelector(".popupForm") as HTMLDivElement;

console.log("app.ts/js");
// localStorage.setItem("tasks","[1,2,3]")


export let tasksContainer=document.querySelector(".tasksContainer") as HTMLDivElement;
console.log("tasksContainer",tasksContainer);
export let completedTasksContainer=document.querySelector(".completedTasksContainer") as HTMLDivElement;
console.log("completedTasksContainer",completedTasksContainer);

export let addNewTask=document.querySelector("#addNewTask") as HTMLButtonElement;

export let add=document.querySelector("#add") as HTMLButtonElement;

export let tasksHeading=document.getElementById("tasksHeading");

export let completedTasksHeading=document.getElementById("completedTasksHeading");

export let searchInput=document.getElementById("searchInput") as HTMLInputElement;

export let searchButton= document.getElementById("searchButton") as HTMLButtonElement;

export let filterButton=document.getElementById("filterButton");

export let sortBy=document.getElementById("sortBy") as HTMLSelectElement;

window.addEventListener("load",main);

export async function main(){
    console.log("main");
    let taskData= await getJSON();
    console.log(taskData);
    display(taskData);
    
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














export function isTask(obj:Task):obj is Task{
    let result= (
                  (typeof obj === "object") &&
                  ("taskId" in obj && typeof obj.taskId==="string") &&
                  ("taskName" in obj && typeof obj.taskName==="string") &&
                  ("taskDescription" in obj && typeof obj.taskDescription==="string") &&
                  ("dueDateTime" in obj && typeof obj.dueDateTime==="string") &&
                  ("completed in obj" && typeof obj.completed==="boolean")
                );
    return result;

}





