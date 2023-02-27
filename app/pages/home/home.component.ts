import { Component } from '@angular/core';
import { ProductResponse } from 'src/app/shared/interface/product.inteface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
