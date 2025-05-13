import { User } from "../User";
import { IEntity } from "./IEntity";




export interface IRoom extends IEntity{
    title: string,
    Address: string,
    ResponsiblePerson: User
}