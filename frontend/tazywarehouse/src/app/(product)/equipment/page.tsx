import { EQUIPMENT_LIST } from "@/@libs/data/equipment";
import { PRODUCT_LIST } from "@/@libs/data/products";
import CardList from "@/components/CardList";
import Filter from "@/components/Filter";
import PaginationBar from "@/components/PaginationBar";



export default function EquipmentPage(){

    return(
        <div>
            <CardList items={EQUIPMENT_LIST}></CardList>
            <PaginationBar></PaginationBar>
        </div>
    )
}