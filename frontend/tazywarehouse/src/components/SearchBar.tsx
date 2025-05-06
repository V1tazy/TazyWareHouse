"use client"

import { useState } from "react";

export default function SearchBar() {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Поиск: ${search}`);
    };

    return (
        <form 
            className="flex items-stretch mb-[43px] mx-[194px]" 
            onSubmit={handleSearch}
        >
            <input
                placeholder="Введите наименование товара"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="flex-1 text-[#000000] bg-[#D9D9D9] text-[24px] py-[13px] px-[20px] mr-[20px] rounded-[10px] border-0 focus:outline-none"
            />
            <button
                type="submit"
                className="flex items-center justify-center bg-[#5037DF] text-white text-[24px] px-[51px] rounded-[10px] border-0"
                style={{
                    boxShadow: '0px 4px 4px #00000040',
                }}
            >
                Найти
            </button>
        </form>
    )
}