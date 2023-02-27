import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { CategoryRespons } from '../interface/category.interface';
import { CategoryRequest } from 'src/app/shared/interface/category.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoryServiesService {
  public url = environment.BACKEND_URL
public api = {category:`${this.url}/category`}
constructor(
  private http:HttpClient
) { }
getAll():Observable<CategoryRespons[]>{
  return this.http.get<CategoryRespons[]>(this.api.category)
}
create(categorys:CategoryRequest):Observable<CategoryRespons>{
return this.http.post<CategoryRespons>(this.api.category, categorys)
}
update(category:CategoryRequest, id:number):Observable<CategoryRespons>{
  return this.http.patch<CategoryRespons>(`${this.api.category}/${id}`,category)
}
delete(id:number):Observable<void>{
 return this.http.delete<void>(`${this.api.category}/${id}`)
}
}
