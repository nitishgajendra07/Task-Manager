export class Task {
    constructor(taskName, taskId) {
        this.taskDescription = "";
        this.dueDateTime = "";
        this.taskName = taskName;
        this.taskId = taskId;
    }
}
export class TaskBuilder {
    constructor(taskName, taskId) {
        this.task = new Task(taskName, taskId);
    }
    setId(taskId) {
        this.task.taskId = taskId;
        return this;
    }
    setTaskDescription(taskDescription) {
        this.task.taskDescription = taskDescription || "";
        return this;
    }
    setDueDateTime(dueDateTime) {
        this.task.dueDateTime = dueDateTime || "";
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
