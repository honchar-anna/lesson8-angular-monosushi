import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { DiscountRequest } from '../interface/dicount.interface';
import { DiscountRespons } from '../interface/dicount.interface';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DiscountService implements Resolve<DiscountRespons>{
 public url = environment.BACKEND_URL
public api = {dicount:`${this.url}/dicount`}
constructor(
  private http:HttpClient
) { }
getAll():Observable<DiscountRespons[]>{
  return this.http.get<DiscountRespons[]>(this.api.dicount)
}
getOne(id:number):Observable<DiscountRespons>{
  return this.http.get<DiscountRespons>(`${this.api.dicount}/${id}`)
}
create(dicount:DiscountRequest):Observable<DiscountRespons>{
return this.http.post<DiscountRespons>(this.api.dicount, dicount)
}
update(dicount:DiscountRequest, id:number):Observable<DiscountRespons>{
  return this.http.patch<DiscountRespons>(`${this.api.dicount}/${id}`,dicount)
}
delete(id:number):Observable<void>{
 return this.http.delete<void>(`${this.api.dicount}/${id}`)
}
resolve(act:ActivatedRouteSnapshot): Observable<DiscountRespons>{
  return this.http.get<DiscountRespons>(`${this.api.dicount}/${act.paramMap.get('id')}`)
 }
}
