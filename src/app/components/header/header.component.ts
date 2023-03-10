import { Component, OnInit} from '@angular/core';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ProductResponse } from 'src/app/shared/interface/product.inteface';
import { AccountService } from 'src/app/shared/services/account.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public total = 0
public isLogin = false
public loginUrl= ""
public loginPage= ""
  private basket:ProductResponse[]=[]
constructor(
  private orderService:OrdersService,
  private accountService:AccountService
){}
ngOnInit(): void {
  this.loadBasket()
  this.updateBasket()
  this.checkUserLogin()
  this.checkUpdateUserLogin()
}
loadBasket(): void{

if(localStorage.length > 0 && localStorage.getItem('basket')){
  this.basket = JSON.parse(localStorage.getItem('basket') as string)
}
this.getTotalPrice()
}
getTotalPrice(){
this.total = this.basket
.reduce((total:number, prod:ProductResponse) => total + prod.count * prod.price,0)


}
updateBasket(){
  this.orderService.changeBasket.subscribe(()=>{
    this.loadBasket()
  })
}

checkUserLogin():void
{
  const currentUser = JSON.parse(localStorage.getItem('currentUser')as string);
if(currentUser &&currentUser.role === ROLE.ADMIN){
 this.isLogin = true
this.loginUrl= "admin"
this.loginPage= "Admin"
}else if(currentUser &&currentUser.role === ROLE.USER){
  this.isLogin = true
  this.loginUrl= "cabinet"
  this.loginPage= "Cabinet"
}else{
  this.isLogin = false
  this.loginUrl= " "
  this.loginPage= ""
}
}
checkUpdateUserLogin(){
this.accountService.isUserLogin$.subscribe(()=>{
  this.checkUserLogin()
})
}
}
