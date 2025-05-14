type ActiveCard = {
    label: string
}

type Props = {
    activeList: ActiveCard[]
}

const ActiveList = ({activeList}: Props) => {
    return(

        <>
        {activeList.map((active) => {
            return(
                <div key={active.label}>
                    {active.label}
                </div>
            )
        })}
        </>
    )
}


export { ActiveList }