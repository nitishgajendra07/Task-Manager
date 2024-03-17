





export let alertMessages={
    dateInput:"Date should be greater than now",
    taskContainerNotFound:"taskContainer is not present check html page",
    completedTasksContainerNotFound:"completedTasksContainer is empty. check HTML page",
    taskElementFieldsAbsent:`taskElement does not have all fields`,
    completedTaskFieldsAbsent:`completedTaskElement does not have all fields`,
    taskNameAbsent:"taskNameElement absent",
    taskNameTextContentAbsent:"taskNameELement textContent absent",
    taskCreationFailed:"could not create a task. Try again"

}


export let taskElementClasses={
    taskElement:"taskElement",
    taskName:"taskName",
    taskDescription:"taskDescription",
    dueDateTime:"dueDateTime",
    taskId:"taskId",
    completionStatus:"completionStatus",
    deleteTaskButton:"deleteTaskButton",
    pendingTaskElement:"pendingTaskElement",
    markCompletedButton:"markCompletedButton",
    unmarkButton:"unmarkButton",
    completedTaskElement:"completedTaskElement",
    expired:"expired"

}

export let documentElementId={
    totalCount:"totalCount",
    tasksCount:"tasksCount",
    completedTasksCount:"completedTasksCount",
    addNewTask:"addNewTask",
    add:"add",
    tasksHeading:"tasksHeading",
    completedTasksHeading:"completedTasksHeading",
    searchInput:"searchInput",
    searchButton:"searchButton",
    filterButton:"filterButton",
    sortBy:"sortBy"
}

export let documentElementClass={
    cssClassSelector:".",
    popupForm : "popupForm",
    tasksContainer:"tasksContainer",
    completedTasksContainer:"completedTasksContainer"
}

export let placeHolders={
    Total : "Total : ",
    TasksToBeCompleted:"Tasks to be Completed: " ,
    Completed : "Completed : "
}

export let taskObjProps={
    taskId:"taskId",
    taskName:"taskName",
    taskDescription:"taskDescription",
    dueDateTime:"dueDateTime",
    completed:"completed"
}