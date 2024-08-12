"use strict";
exports.__esModule = true;
exports.taskObjProps = exports.placeHolders = exports.documentElementClass = exports.documentElementId = exports.taskElementClasses = exports.alertMessages = void 0;
exports.alertMessages = {
    dateInput: "Date should be greater than now",
    taskContainerNotFound: "taskContainer is not present check html page",
    completedTasksContainerNotFound: "completedTasksContainer is empty. check HTML page",
    taskElementFieldsAbsent: "taskElement does not have all fields",
    completedTaskFieldsAbsent: "completedTaskElement does not have all fields",
    taskNameAbsent: "taskNameElement absent",
    taskNameTextContentAbsent: "taskNameELement textContent absent",
    taskCreationFailed: "could not create a task. Try again"
};
exports.taskElementClasses = {
    taskElement: "taskElement",
    taskName: "taskName",
    taskDescription: "taskDescription",
    dueDateTime: "dueDateTime",
    taskId: "taskId",
    completionStatus: "completionStatus",
    deleteTaskButton: "deleteTaskButton",
    pendingTaskElement: "pendingTaskElement",
    markCompletedButton: "markCompletedButton",
    unmarkButton: "unmarkButton",
    completedTaskElement: "completedTaskElement",
    expired: "expired"
};
exports.documentElementId = {
    totalCount: "totalCount",
    tasksCount: "tasksCount",
    completedTasksCount: "completedTasksCount",
    addNewTask: "addNewTask",
    add: "add",
    tasksHeading: "tasksHeading",
    completedTasksHeading: "completedTasksHeading",
    searchInput: "searchInput",
    searchButton: "searchButton",
    filterButton: "filterButton",
    sortBy: "sortBy"
};
exports.documentElementClass = {
    cssClassSelector: ".",
    popupForm: "popupForm",
    tasksContainer: "tasksContainer",
    completedTasksContainer: "completedTasksContainer"
};
exports.placeHolders = {
    Total: "Total : ",
    TasksToBeCompleted: "Tasks to be Completed: ",
    Completed: "Completed : "
};
exports.taskObjProps = {
    taskId: "taskId",
    taskName: "taskName",
    taskDescription: "taskDescription",
    dueDateTime: "dueDateTime",
    completed: "completed"
};
