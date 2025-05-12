import { CARDS_LIST } from "@/@libs/data/card";
import { ICardList } from "@/@libs/models/ICardList";
import Card from "./Card";


export default function CardList({items}: ICardList){
    return(
        <div className="flex flex-col gap-[20px]">
        {items.map((item, index) => (
          <Card
            key={index}
            id = {item.id}
            image={item.image}
            title={item.title}
            details={item.details}
          />
        ))}
      </div>
    );
}