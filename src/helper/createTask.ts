import { ITask } from "./interfaces"


export class Task implements ITask{
    taskId:string
    taskName:string
    taskDescription:string=""
    dueDateTime:string=""
    completed?:boolean
    constructor(taskName:string, taskId:string){
        this.taskName=taskName
        this.taskId=taskId
    }

}

export class TaskBuilder{
    task:Task
    constructor(taskName:string, taskId:string){
        this.task= new Task(taskName, taskId)

    }

    setId(taskId:string){
        this.task.taskId=taskId
        return this
    }

    setTaskDescription(taskDescription:string){
        this.task.taskDescription=taskDescription  || ""
        return this
    }

    setDueDateTime(dueDateTime:string){
        this.task.dueDateTime=dueDateTime || ""
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


