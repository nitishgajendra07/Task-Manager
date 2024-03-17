import { tasksContainer } from "../../app.js";
import { createNewTaskElement, createTaskElement,  markAsCompletedInLS2, markAsPendingInLS2, moveToMarkedComplete } from "../../components/taskComponents.js";
import { taskManager } from "./Observable.js";
import { addNewTaskToLS, removeInLocalStorage } from "../../utils/localStorageUtils.js";
import { Task } from "../createTask.js";
import { checkForExpiredTasks } from "../../utils/taskUtils.js";

export interface ITaskObserver {
    taskAddedOperation(task: Task): void;
    taskCompletedOperation(task: Task): void;
    taskPendingOperation(task:Task):void;
    taskDeletedOpearation(task: Task): void;
}

export class TaskObserver implements ITaskObserver {




    constructor() {
        taskManager.addObserver(this)
    }
    taskAddedOperation(task: Task): void {
        let taskElement = createNewTaskElement(task)

        addNewTaskToLS(task)
    }
    async taskCompletedOperation(task: Task) {

        let validElement=await markAsCompletedInLS2(task)
        if(validElement){
            let completedTaskElement=createTaskElement(task)
            if(!completedTaskElement){
                return
            }
            moveToMarkedComplete(completedTaskElement)
        }
    }

    async taskPendingOperation(task: Task) {
        let validElement=await markAsPendingInLS2(task)
        if(validElement){
            createNewTaskElement(task);  // its name is deceptive it calls createTaskElement() and adds its return value at the top of taskContainer.children
            checkForExpiredTasks(tasksContainer)
        }
    }

    async taskDeletedOpearation(task: Task){  // study this async nature
        let taskElement=createTaskElement(task)
        await removeInLocalStorage(task.taskId);//  UI taskElement is being deleted in the callback
    }

}

