import { addNewTask, completedTasksContainer, completedTasksHeading, tasksContainer, tasksHeading } from "../app.js";
import { createTaskElement } from "../components/taskComponents.js";
import { getJSON } from "./localStorageUtils.js";
// let tasksContainer=document.querySelector(".tasksContainer") as HTMLDivElement;
// let completedTasksContainer=document.querySelector(".completedTasksContainer") as HTMLDivElement;
export function display(arrayOfObjectsToBeDisplayed) {
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }
    while (completedTasksContainer.firstChild) {
        completedTasksContainer.removeChild(completedTasksContainer.firstChild);
    }
    let temp;
    ;
    for (let i = 0; i < arrayOfObjectsToBeDisplayed.length; i++) {
        temp = arrayOfObjectsToBeDisplayed[i];
        if (temp.completed === false) {
            tasksContainer.append(createTaskElement(temp));
        }
        else if (temp.completed === true) {
            completedTasksContainer.append(createTaskElement(temp));
        }
    }
    checkForExpiredTasks(tasksContainer);
    getCounts();
}
export function checkForExpiredTasks(elementList) {
    console.log("entered checkForExpiredTasks");
    for (let i = 0; i < elementList.children.length; i++) {
        let dueDateTime = elementList.children[i].children[3].textContent;
        if (dueDateTime) {
            if (new Date(dueDateTime) <= new Date()) {
                elementList.children[i].classList.remove("pendingTaskElement");
                elementList.children[i].classList.add("expired");
                console.log("added expired for ", elementList.children[i]);
            }
        }
    }
}
let totalCount = document.getElementById("totalCount");
let tasksCount = document.getElementById("tasksCount");
let completedTasksCount = document.getElementById("completedTasksCount");
console.log("count Elements", totalCount, tasksCount, completedTasksCount);
export async function getCounts() {
    let tp = await getJSON();
    if (totalCount) {
        console.log("totalCount", totalCount);
        totalCount.textContent = `Total : ${getTotalCount(tp)}`;
    }
    if (tasksCount) {
        tasksCount.textContent = `Tasks to be Completed: ${getIncompleteTasksCount(tp)}`;
    }
    if (completedTasksCount) {
        completedTasksCount.textContent = `Completed : ${getCompletedTasksCount(tp)}`;
    }
}
export function getTotalCount(tp) {
    return tp.length;
}
export function getIncompleteTasksCount(tp) {
    let tasksCount = tp.reduce((acc, taskObject) => {
        if (taskObject.completed === false) {
            acc += 1;
        }
        return acc;
    }, 0);
    return tasksCount;
}
export function getCompletedTasksCount(tp) {
    let completedTasksCount = tp.reduce((acc, taskObject) => {
        if (taskObject.completed === true) {
            acc = acc + 1;
        }
        return acc;
    }, 0);
    return completedTasksCount;
}
export async function filterForCompleted() {
    let newList;
    let tp = await getJSON();
    newList = tp.filter((taskObject) => {
        return taskObject.completed === true;
    });
    removeAllPageContents();
    display(newList);
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
export function sortTasks(choice, tp) {
    if (choice == "A-Z") {
        let newList;
        function customSort(a, b) {
            let first = a.taskName.toLowerCase();
            let second = b.taskName.toLowerCase();
            let swap = 0;
            if (first > second) {
                swap = 1;
            }
            else if (first < second) {
                swap = -1;
            }
            return swap;
        }
        newList = tp.slice();
        newList.sort(customSort);
        display(newList);
    }
    else if (choice === "Z-A") {
        let newList;
        function customSort(a, b) {
            let first = a.taskName.toLowerCase();
            let second = b.taskName.toLowerCase();
            let swap = 0;
            if (first > second) {
                swap = -1;
            }
            else if (first < second) {
                swap = 1;
            }
            return swap;
        }
        newList = tp.slice();
        newList.sort(customSort);
        display(newList);
    }
    else if (choice == "date") {
        let newList;
        function customSort(a, b) {
            if (a.dueDateTime === undefined) {
                a.dueDateTime = "";
            }
            if (b.dueDateTime === undefined) {
                b.dueDateTime = "";
            }
            let first = a.dueDateTime.toLowerCase();
            let second = b.dueDateTime.toLowerCase();
            let swap = 0;
            if (a.dueDateTime === "") {
                return 1;
            }
            if (b.dueDateTime === "") {
                return -1;
            }
            if (first > second) {
                swap = 1;
            }
            else if (first < second) {
                swap = -1;
            }
            return swap;
        }
        newList = tp.slice();
        newList.sort(customSort);
        display(newList);
    }
}
export async function searchTask(str) {
    let t, temp;
    let tp = await getJSON();
    let newList;
    newList = tp.filter(function (taskObject) {
        return taskObject.taskName.toLowerCase().includes(str.toLowerCase());
    });
    display(newList);
}
