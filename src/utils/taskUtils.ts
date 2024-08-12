import { addNewTask, completedTasksContainer, completedTasksHeading, tasksContainer, tasksHeading } from "../app.js";
import { alertMessages, documentElementId, placeHolders, taskElementClasses, taskObjProps } from "../components/constants.js";
import { createTaskElement } from "../components/taskComponents.js";
import { Task, TaskBuilder } from "../helper/createTask.js";
import { getJSON } from "./localStorageUtils.js";



export function display(arrayOfObjectsToBeDisplayed: Task[]) {

    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }

    while (completedTasksContainer.firstChild) {
        completedTasksContainer.removeChild(completedTasksContainer.firstChild);
    }

    let temp: Task;

    for (let i = 0; i < arrayOfObjectsToBeDisplayed.length; i++) {
        temp = arrayOfObjectsToBeDisplayed[i];

        if (temp.completed === false) {
            let taskElement = createTaskElement(temp);
            if (taskElement == null) {
                alert(alertMessages.taskElementFieldsAbsent);
            }
            else {
                tasksContainer.append(taskElement);
            }

        }
        else if (temp.completed === true) {
            let completedTaskElement = createTaskElement(temp);
            if (completedTaskElement == null) {
                alert(alertMessages.completedTaskFieldsAbsent);
            } else {
                completedTasksContainer.append(completedTaskElement);
            }

        }
    }
    checkForExpiredTasks(tasksContainer);
    getCounts();


}

export function checkForExpiredTasks(elementList: HTMLDivElement) {
    for (let i = 0; i < elementList.children.length; i++) {
        let dueDateTimeParent = getParticularTaskPart(elementList.children[i] as HTMLDivElement, taskElementClasses.dueDateTime);
        let dueDateTime = dueDateTimeParent?.textContent;
        if (typeof dueDateTime === "string") {
            if (new Date(dueDateTime) <= new Date()) {
                elementList.children[i].classList.remove(taskElementClasses.pendingTaskElement);
                elementList.children[i].classList.add(taskElementClasses.expired);
            }
        }
    }
}

let totalCount = document.getElementById(documentElementId.totalCount);
let tasksCount = document.getElementById(documentElementId.tasksCount);
let completedTasksCount = document.getElementById(documentElementId.completedTasksCount);



export async function getCounts() {
    let tp: Task[] = await getJSON()
    if (totalCount) {
        totalCount.textContent = `${placeHolders.Total} ${getTotalCount(tp)}`;
    }
    if (tasksCount) {
        tasksCount.textContent = `${placeHolders.TasksToBeCompleted} ${getIncompleteTasksCount(tp)}`;
    }

    if (completedTasksCount) {
        completedTasksCount.textContent = `${placeHolders.Completed} ${getCompletedTasksCount(tp)}`;
    }

}
export function getTotalCount(tp: Task[]) {
    return tp.length;
}
export function getIncompleteTasksCount(tp: Task[]) {

    let tasksCount = tp.reduce((acc: number, taskObject: Task) => {
        if (taskObject.completed === false) {
            acc += 1;

        }
        return acc;
    }, 0)
    return tasksCount;
}

export function getCompletedTasksCount(tp: Task[]) {
    let completedTasksCount = tp.reduce((acc, taskObject) => {
        if (taskObject.completed === true) {
            acc = acc + 1

        }
        return acc
    }, 0)
    return completedTasksCount
}


export async function filterForCompleted() {
    let newList;
    let tp = await getJSON()
    newList = tp.filter((taskObject) => {
        return taskObject.completed === true
    })

    removeAllPageContents()
    display(newList);
}

export function getTaskObject(taskElement: HTMLDivElement) {

    let tNameParent = getParticularTaskPart(taskElement, taskElementClasses.taskName)
    if (!tNameParent) {
        alert(alertMessages.taskNameAbsent)
        throw new Error
    }
    if (tNameParent.textContent === null) {
        alert(alertMessages.taskNameTextContentAbsent)
        throw new Error
    }
    let tName: string = tNameParent.textContent

    let tDescriptionParent = getParticularTaskPart(taskElement, taskElementClasses.taskDescription)
    if (tDescriptionParent === undefined) {
        throw new Error
    }
    if(tDescriptionParent.textContent===null){
        throw new Error
    }
    let tDescription: string = tDescriptionParent.textContent || ""

    let tIdParent = getParticularTaskPart(taskElement, taskElementClasses.taskId)
    if (tIdParent == undefined) {
        throw new Error
    }
    if (tIdParent.textContent == null) {
        throw new Error
    }
    let tId: string = tIdParent.textContent

    let tDueDateTime: string = getParticularTaskPart(taskElement, taskElementClasses.dueDateTime)?.textContent || "" 

    let tCompletionStatusParent = getParticularTaskPart(taskElement, taskElementClasses.completionStatus)
    let tCompletionStatus: boolean
    if (tCompletionStatusParent!.textContent === "true") {
        tCompletionStatus = true
    }
    else {                                           
        tCompletionStatus = false
    }

    let taskObj: Task = new TaskBuilder(tName, tId)
        .setTaskDescription(tDescription)
        .setCompletionStatus(tCompletionStatus)
        .setDueDateTime(tDueDateTime)
        .build()

    return taskObj

}

export function getParticularTaskPart(taskElement: HTMLDivElement, classToLookFor: string) {
    let newList = Array.from(taskElement.children)
    let particularTaskPart = newList.find((element) => {
        if (element.classList.contains(classToLookFor))
            return true
    })

    return particularTaskPart

}


export function getAllTasksInCurrentDisplay(): Task[] {
    let newTaskElementList = [...Array.from(tasksContainer.children), ...Array.from(completedTasksContainer.children)]

    let newTaskObjectList: Task[] = []

    newTaskElementList.forEach((taskElement) => {
        let taskObj: Task = getTaskObject(taskElement as HTMLDivElement)
        newTaskObjectList.push(taskObj)
    })
    return newTaskObjectList
}

export async function filterForCompleted2() {

    let newTaskElementList = [...Array.from(tasksContainer.children), ...Array.from(completedTasksContainer.children)]

    let newTaskObjectList: Task[] = []


    newTaskElementList.forEach((taskElement) => {
        let taskObj: Task = getTaskObject(taskElement as HTMLDivElement)
        newTaskObjectList.push(taskObj)
    })
    let filteredObjectList: Task[] = newTaskObjectList.filter((taskObj) => {
        return taskObj.completed === true
    })

    removeAllPageContents();
    display(filteredObjectList);
}

export function removeAllPageContents() {

    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }

    while (completedTasksContainer.firstChild) {
        completedTasksContainer.removeChild(completedTasksContainer.firstChild);
    }
    if (addNewTask) {
        addNewTask.remove();
    }
    if (tasksHeading) {
        tasksHeading.remove();
    }
    if (completedTasksHeading) {
        completedTasksHeading.remove();
    }

}


export function sortTasks(choice: string) {
    let allTaskObjectsInDisplay = getAllTasksInCurrentDisplay();
    let newList: Task[] = allTaskObjectsInDisplay.slice();

    const customSortAZ = (a: Task, b: Task) => {
        let first = a.taskName.toLowerCase();
        let second = b.taskName.toLowerCase();
        return first > second ? 1 : first < second ? -1 : 0;
    };

    const customSortZA = (a: Task, b: Task) => {
        let first = a.taskName.toLowerCase();
        let second = b.taskName.toLowerCase();
        return first > second ? -1 : first < second ? 1 : 0;
    };

    const customSortByDate = (a: Task, b: Task) => {
        if (!a.dueDateTime) return 1;
        if (!b.dueDateTime) return -1;
        return new Date(a.dueDateTime) > new Date(b.dueDateTime) ? 1 : -1;
    };

    if (choice === "A-Z") {
        newList.sort(customSortAZ);
    } else if (choice === "Z-A") {
        newList.sort(customSortZA);
    } else if (choice === "date") {
        newList.sort(customSortByDate);
    }

    display(newList);
}


export async function searchTask(str: string) {
    let t, temp;
    let allTaskObjectsInDisplay = getAllTasksInCurrentDisplay()
    let newList;
    newList = allTaskObjectsInDisplay.filter(function (taskObject) {

        return taskObject.taskName.toLowerCase().includes(str.toLowerCase());
    })

    display(newList);
}


export function isTask(obj:Task):obj is Task{
    let result= (
                  (typeof obj === "object") &&
                  (taskObjProps.taskId in obj && typeof obj.taskId==="string") &&
                  (taskObjProps.taskName in obj && typeof obj.taskName==="string") &&
                  (taskObjProps.taskDescription in obj && typeof obj.taskDescription==="string") &&
                  (taskObjProps.dueDateTime in obj && typeof obj.dueDateTime==="string") &&
                  (taskObjProps.completed in obj && typeof obj.completed==="boolean")
                );
    return result;

}