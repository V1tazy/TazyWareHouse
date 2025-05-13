"use client"

import { PRODUCT_LIST } from "@/@libs/data/products";
import CardList from "@/components/CardList";
import Filter from "@/components/Filter";
import PaginationBar from "@/components/PaginationBar";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";

export default function ProductPage() {

    const route = useRouter()
    return (
        <div className="flex flex-col bg-[#FFFFFF] min-h-screen pt-10">
            <SearchBar></SearchBar>

            <div className="flex mx-[200px] gap-10">
                <Filter></Filter>
                <div className="flex-1">
                    <CardList items={PRODUCT_LIST}/>

                </div>
            </div>

            <div className="mt-4 self-center-safe"> 
                <PaginationBar></PaginationBar>
            </div>
        </div>
    )
}