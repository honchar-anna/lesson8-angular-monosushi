import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductResponse, ProductRequest } from '../interface/product.inteface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url = environment.BACKEND_URL
  public api = {products:`${this.url}/products`}
  constructor(
    private http:HttpClient
  ) { }
  getAll():Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(this.api.products)
  }
  getAllByCategore(category:string):Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(`${this.api.products}?category.path=${category}`)
  }
  getOne(id:number):Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.api.products}/${id}`)
  }
  create(products:ProductRequest):Observable<ProductResponse>{
    return this.http.post<ProductResponse>(this.api.products, products)
    }
    update(products:ProductRequest, id:number):Observable<ProductResponse>{
      return this.http.patch<ProductResponse>(`${this.api.products}/${id}`,products)
    }
    delete(id:number):Observable<void>{
      return this.http.delete<void>(`${this.api.products}/${id}`)
     }
}
