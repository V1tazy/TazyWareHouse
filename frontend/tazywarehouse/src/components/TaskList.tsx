type TaskCard = {
    label: string
}

type Props = {
    taskList: TaskCard[]
}

const TaskList = ({taskList}: Props) => {


    return(

        <>
        {taskList.map((task) => {
            return(
                <div key={task.label}>
                    <input type="checkbox"></input>
                    {task.label}
                </div>
                
            )
        })}
        </>
    )
}


export { TaskList }