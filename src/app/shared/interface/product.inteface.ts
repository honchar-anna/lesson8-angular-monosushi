import { CategoryRespons } from "./category.interface"

export interface ProductRequest{
   category:CategoryRespons,
   name:string,
   ingredients:string
   weight:string
   price:number,
   imgPath:string,
   count:number

}
export interface ProductResponse extends ProductRequest{
id:number

}