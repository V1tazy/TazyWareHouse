"use client"; // Client component for interactivity

import { ICardList } from "@/@libs/models/ICardList";
import Card from "./Card";

export default function CardList({ items }: ICardList) {
  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 ? (
        items.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            image={item.image}
            title={item.title}
            details={item.details}
            type={item.type}
          />
        ))
      ) : (
        <p className="text-center text-sm text-gray-500">Продукты не найдены.</p>
      )}
    </div>
  );
}