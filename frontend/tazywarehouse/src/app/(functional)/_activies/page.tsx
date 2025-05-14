import { ActiveList } from "@/components/ActiveList";
import { Suspense } from "react";


const ACTIVE_LIST = [
    {label : "Активность-1"},
    {label : "Активность-2"},
    {label : "Активность-3"}
]


export default function ActivitiesPage(){
    return(
        <div className="flex flex-col gap-4 w-full max-w-md p-8 bg-white drop-shadow-2xl">
            <h1 className="font-bold">Активность</h1>
            <ActiveList activeList={ACTIVE_LIST}/>
        </div>
    )
}