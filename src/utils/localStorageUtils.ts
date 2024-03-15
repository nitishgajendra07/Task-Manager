import { isTask } from "../app.js";

import { Task } from "../helper/createTask.js";

export async function getJSON(): Promise<Task[]> {
    let data=await localStorage.getItem("tasks");
    let dataParsed:Task[];
    if(data === null){
        dataParsed=[];
    }
    else{
        try{
            dataParsed= JSON.parse(data)
            if(Array.isArray(dataParsed)  && dataParsed.every((obj)=>{return isTask(obj)}) ){
                
            }
            else{
                dataParsed=[]
                localStorage.setItem("tasks","[]")
            }
            
        }
        catch(e){
            dataParsed=[]
            localStorage.setItem("tasks","[]")
            
        }
        
    }
    return dataParsed

}

export async function pushChangesToLocalStorage(tp:Task[]){
    localStorage.setItem("tasks",JSON.stringify(tp));
    console.log("In pushChangesTols",localStorage.getItem("tasks"));
    return localStorage.getItem("tasks")
}

export async function removeInLocalStorage(taskId:string){
    let t,temp;
    let tp= await getJSON()
    
        temp={};    
        for(let i=0;i<tp.length;i++){
            if(tp[i].taskId===taskId.toString()){
                tp.splice(i,1);
                break;
            }           
        }
        await pushChangesToLocalStorage(tp) 
        // getCounts(tp)
        return tp
}