import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductResponse } from 'src/app/shared/interface/product.inteface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
public userProducts:ProductResponse[] = []
public userProduct!:ProductResponse
private eventSubscription!:Subscription
  constructor(
    private productServer:ProductService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
  private orderService:OrdersService

  ) {
    this.eventSubscription =this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.getAll()
      }})
   }

  ngOnInit() {}
getAll():void{
  const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
  this.productServer.getAllByCategore(categoryName).subscribe(data=>{
    this.userProducts = data
  })
}

ngOnDestroy(): void {
  this.eventSubscription.unsubscribe()
}
productCount(userProduct:ProductResponse, value:boolean){
  if(value){
    ++userProduct.count
  }else if(!value && userProduct.count>1){
    --userProduct.count
  }
}
addBasket(infoProduct:ProductResponse){
  let basket:ProductResponse[]= []
  if(localStorage.length > 0 && localStorage.getItem('basket')){
    basket = JSON.parse(localStorage.getItem('basket') as string)
  if(basket.some(prod=> prod.id === infoProduct.id)){
  const index = basket.findIndex(prod=> prod.id === infoProduct.id)
  basket[index].count += infoProduct.count
  }else{
  basket.push(infoProduct)
  
  }
  }else{
    basket.push(infoProduct)
    
    }
  localStorage.setItem('basket', JSON.stringify(basket))
  infoProduct.count = 1
  this.orderService.changeBasket.next(true)
  
  }
}
