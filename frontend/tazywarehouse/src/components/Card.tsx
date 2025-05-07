"use client"

import { ICard } from "@/@libs/models/ICard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";


export default function Card({ image, title, details}: ICard) {

    const router = useRouter()

    return (
      <div
        className="flex items-start self-stretch bg-[#FFFFFF] pt-[13px] pb-[13px] pl-[8px] pr-[8px] rounded-[20px]"
        style={{
          boxShadow: '0px 4px 4px #00000040',
        }}
      >
        
        <div className="w-[100px] h-[100px] bg-[#D9D9D9] rounded-[10px] mr-[20px] flex items-center justify-center">
            <img src={image} alt={title} className="w-full h-full object-fill" />
        </div>

        <div className="flex flex-col shrink-0 items-start">
          <h1 className="text-[#000000] text-[20px] mb-[10px]">{title}</h1>
          {details.map((detail, index) => (
            <span key={index} className="text-[#000000] text-[12px] mb-[10px]">
              {detail.label}: {detail.value}
            </span>
          ))}
        </div>

        <div className="flex-1 self-stretch" />


        <div className="flex flex-col shrink-0 items-center mt-[9px]">
          <button 
            className="flex items-center justify-center pt-[9px] pb-[9px] px-[20px] rounded-[10px] border-0 bg-[#FFFFFF] text-[#5037DF]"
            type="button"
            onClick={() => router.push("/product/edit/")}
          >Редактировать</button>
          <button className="flex items-center justify-center pt-[9px] pb-[9px] px-[20px] rounded-[10px] border-0 text-[#FFFFFF] bg-[#5037DF]">Описание</button>
        </div>
      </div>
    );
  }