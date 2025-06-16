"use client"; // Client component for interactivity

import Card, { ICard } from "./Card";

export interface ICardList {
  items: ICard[];
}

export default function CardList({ items }: ICardList) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
}