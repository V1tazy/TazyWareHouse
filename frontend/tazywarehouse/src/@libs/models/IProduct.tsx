import { IProductEntity } from "./Base/IProductEntity";



export interface IProduct extends IProductEntity{
        supplier: string;
        quantity: number;
        measurement: string;
        warehouse: string;
}
