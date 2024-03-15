export class Task {
    constructor(taskName) {
        this.taskName = taskName;
    }
}
export class TaskBuilder {
    constructor(taskName) {
        this.task = new Task(taskName);
    }
    setId(taskId) {
        this.task.taskId = taskId;
        return this;
    }
    setTaskDescription(taskDescription) {
        this.task.taskDescription = taskDescription;
        return this;
    }
    setDueDateTime(dueDateTime) {
        this.task.dueDateTime = dueDateTime;
        return this;
    }
    setCompletionStatus(status) {
        this.task.completed = status;
        return this;
    }
    build() {
        return this.task;
    }
}
// function createElement(taskObj:Task){
//     taskElement=document.createElement("div")
// }
