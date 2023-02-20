export interface Discount{
   id:number,
   data:Date,
   name:string,
   title:string,
   text:string,
   imgPath:string
}
export interface DiscountRequest{
   data:Date,
   name:string,
   title:string,
   text:string,
   imgPath:string
}
export interface DiscountRespons extends DiscountRequest{
   id:number
}