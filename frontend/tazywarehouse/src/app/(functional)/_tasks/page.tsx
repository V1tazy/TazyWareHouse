import { TaskList } from "@/components/TaskList"


const TASK_LIST = [
    {label : "Задание-1"},
    {label : "Задание-2"},
    {label : "Задание-3"}
]


export default function TaskPage(){
    return(
        <div className="flex flex-col gap-4 w-full max-w-md p-8 bg-white drop-shadow-2xl">
            <h1 className="font-bold">Задачи</h1>
            <TaskList taskList={TASK_LIST}></TaskList>
        </div>
    )
}