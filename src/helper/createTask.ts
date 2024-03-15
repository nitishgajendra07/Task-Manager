import { deleteTaskButtonHandler } from "../components/eventListenerCallbacks.js"
import { ITask } from "../types.js"
import { removeInLocalStorage } from "../utils/localStorageUtils.js"


export class Task implements ITask{
    taskId?:string
    taskName:string
    taskDescription?:string
    dueDateTime?:string
    completed?:boolean
    constructor(taskName:string){
        this.taskName=taskName
    }

}



export class TaskBuilder{
    task:Task
    constructor(taskName:string){
        this.task= new Task(taskName)

    }

    setId(taskId:string){
        this.task.taskId=taskId
        return this
    }

    setTaskDescription(taskDescription:string){
        this.task.taskDescription=taskDescription
        return this
    }

    setDueDateTime(dueDateTime:string){
        this.task.dueDateTime=dueDateTime
        return this
    }

    setCompletionStatus(status:boolean){
        this.task.completed=status
        return this
    }

    build(){
        return this.task
    }
}


// function createElement(taskObj:Task){
//     taskElement=document.createElement("div")

// }








