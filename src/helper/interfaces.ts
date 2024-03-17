import { Task } from "./createTask"
import { TaskObserver } from "./observerPattern/TaskObserver"

export interface ITask{
    taskId:string
    taskName:string
    description?:string
    dueDateTime?:string
    completed?:boolean
}

export interface ITaskObservable {
    addObserver(observer: TaskObserver): void;
    removeObserver(observer: TaskObserver): void;
    notifyTaskAdded(task: Task): void;
    notifyTaskCompleted(task: Task): void;
}
