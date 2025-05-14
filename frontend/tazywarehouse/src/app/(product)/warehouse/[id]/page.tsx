"use client"

import { useParams } from "next/navigation";
import ActionsBar from "./_actionsBar/page";
import StatsPage from "./_stats/page";



export default function WareHouseAboutPage(){
    
    const params = useParams()

    return(
        <div>
            Подробности склада номер {params?.id}
            <StatsPage></StatsPage>
            <ActionsBar></ActionsBar>
        </div>
    )
}