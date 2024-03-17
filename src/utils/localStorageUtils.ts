

import { Task } from "../helper/createTask.js";
import { isTask } from "./taskUtils.js";

export async function getJSON(): Promise<Task[]> {
    let data=await localStorage.getItem("tasks");
    let dataParsed:Task[];
    if(data === null){
        dataParsed=[];
    }
    else{
        try{
            dataParsed= JSON.parse(data);
            if(Array.isArray(dataParsed)  && dataParsed.every((obj)=>{return isTask(obj)}) ){
            }
            else{
                dataParsed=[];
                localStorage.setItem("tasks","[]");
            }
        }
        catch(e){
            dataParsed=[];
            localStorage.setItem("tasks","[]");
        }
    }
    return dataParsed;
}

export async function pushChangesToLocalStorage(tp:Task[]){
    await localStorage.setItem("tasks",JSON.stringify(tp));
}

export async function removeInLocalStorage(taskId:string){
    let t,temp;
    let tp= await getJSON();
       
        for(let i=0;i<tp.length;i++){
            if(tp[i].taskId===taskId.toString()){
                tp.splice(i,1);
                break;
            }           
        }
        await pushChangesToLocalStorage(tp);
        return tp;
}

export async function addNewTaskToLS(taskObj:Task){ 
    let tp=await getJSON(); 

    tp.unshift(taskObj);
    await pushChangesToLocalStorage(tp);
}

export async function computeNewId(){
    let tp= await getJSON()

    let newId=0
    if(tp.length >0){
        let max=0;
        for(let i=0; i<tp.length; i++){
            let taskIdnum=parseInt(tp[i].taskId!);
            if(taskIdnum>max){
                max= taskIdnum;
            }
        }
         newId=max+1;
    }
    else{
        newId=1;
    }
    return newId.toString();
}