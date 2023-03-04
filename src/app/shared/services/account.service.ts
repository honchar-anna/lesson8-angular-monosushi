import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interface/account.inteface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$=new Subject<boolean>()
  public url = environment.BACKEND_URL

  public api = {auth:`${this.url}/auth`}
  constructor(
    private http:HttpClient
  ) { }

  login(credential:Login):Observable<any>{
return this,this.http.get(`${this.api.auth}?email=${credential.email}&pasword=${credential.password}`)
  }
  
}
