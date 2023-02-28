import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from 'src/app/shared/interface/product.inteface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit{
public infoProduct!:ProductResponse

constructor(
  private productService: ProductService,
  private activatedRoute: ActivatedRoute,
  private orderService:OrdersService
){}

ngOnInit(): void {
  this.activatedRoute.data.subscribe(response=>{
    this.infoProduct = response['productInfo']
  })

}

productCount(infoProduct:ProductResponse, value:boolean){
  if(value){
    ++this.infoProduct.count
  }else if(!value && infoProduct.count>1){
    --this.infoProduct.count
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
