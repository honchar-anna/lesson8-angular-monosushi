export interface Category{
   id:number,
   name:string,
   path:string,
   imgPath:string
}
export interface CategoryRequest{
   name:string,
   path:string,
   imgPath:string
}
export interface CategoryRespons extends CategoryRequest{
   id:number
}