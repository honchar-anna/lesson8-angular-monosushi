import { CategoryRespons } from "./category.interface"

export interface ProductRequest{
   category:CategoryRespons,
   name:string,
   ingredients:string
   weight:number
   price:number,
   imgPath:string,

}
export interface ProductResponse extends ProductRequest{
id:number

}