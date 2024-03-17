import { Task } from "../createTask.js"
import { ITaskObservable } from "../interfaces.js";
import { TaskObserver } from "./TaskObserver.js"




class TaskManager implements ITaskObservable{
    static instance:TaskManager;

    private allTasks:Task[]=[]

    private observers:TaskObserver[]=[]

    private constructor(){

    }

    static getInstance(){
        if(!TaskManager.instance){
            return new TaskManager()
        }
        else{
            return TaskManager.instance
        }
    }

    addObserver(observer: TaskObserver): void {
        this.observers.push(observer)
    }

    removeObserver(observer: TaskObserver): void {
        const index= this.observers.indexOf(observer)
        if(index>=0){
            this.observers.splice(index,1)
        }
    }

    notifyTaskAdded(task: Task): void {
        this.observers.forEach((observer:TaskObserver)=>{
            observer.taskAddedOperation(task)
        })
    }

    notifyTaskCompleted(task: Task): void {
        this.observers.forEach((observer:TaskObserver)=>{
            observer.taskCompletedOperation(task)
        })
    }

    notifyTaskPending(task:Task){
        this.observers.forEach((observer:TaskObserver)=>{
            observer.taskPendingOperation(task)
        })
    }

    notifyTaskDeleted(task:Task):void{
        this.observers.forEach((observer:TaskObserver)=>{
            observer.taskDeletedOpearation(task)
        })
    }




    setAllTasks(tasks:Task[]){
        this.allTasks=tasks
    }

    addTask(task:Task){
        this.allTasks.push(task)
        this.notifyTaskAdded(task)
    }

    markTaskAsCompleted(task:Task){
        let index= -1
        for(let i=0 ;i<this.allTasks.length;i++){
            if(this.allTasks[i].taskId===task.taskId){
                index =i
            }
        }
        if(index>=0){
            this.allTasks[index].completed=true
            let modifiedTask=this.allTasks[index]
            this.notifyTaskCompleted(modifiedTask)
        }
    }

    markAsPending(task:Task){
        let index= -1
        for(let i=0 ;i<this.allTasks.length;i++){
            if(this.allTasks[i].taskId===task.taskId){
                index =i
            }
        }
        if(index>=0){
            this.allTasks[index].completed=false
            let modifiedTask=this.allTasks[index]
            this.notifyTaskPending(modifiedTask)
        }
    }

    deleteTask(task:Task){
        let index= -1
        for(let i=0;i<this.allTasks.length;i++){
            if(this.allTasks[i].taskId===task.taskId){
                index=i
                break;
            }
        }
        if(index>=0){
            this.allTasks.splice(index,1)
            this.notifyTaskDeleted(task)
        }
    }
    


}

export let taskManager:TaskManager=TaskManager.getInstance()