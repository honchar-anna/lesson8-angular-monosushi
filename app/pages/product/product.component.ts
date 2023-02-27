import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/shared/interface/product.inteface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
public userProduct:ProductResponse[] = []
  constructor(
    private productServer:ProductService
  ) { }

  ngOnInit() {
    this.getAll()
  }
getAll():void{
  this.productServer.getAll().subscribe(data=>{
    this.userProduct = data
  })
}
}
