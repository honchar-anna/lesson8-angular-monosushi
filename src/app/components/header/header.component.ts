import { Component, OnInit} from '@angular/core';
import { ProductResponse } from 'src/app/shared/interface/product.inteface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public total = 0

  private basket:ProductResponse[]=[]
constructor(
  private orderService:OrdersService
){}
ngOnInit(): void {
  this.loadBasket()
  this.updateBasket()
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

}
