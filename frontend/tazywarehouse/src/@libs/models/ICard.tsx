import { IEntity } from "./Base/IEntity";



export interface ICard extends IEntity{
    image? : string
    details: {label: string; value: string}
    type: string
}