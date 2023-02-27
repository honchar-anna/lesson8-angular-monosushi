import { Component } from '@angular/core';
import { DiscountRespons } from 'src/app/shared/interface/dicount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent {
public userDiscount:DiscountRespons[]= []

constructor(
  private discountService:DiscountService
){}

ngOnInit(): void {
this.getDiscounts()
}

getDiscounts():void{
  this.discountService.getAll().subscribe(data=>{
    this.userDiscount = data
  })
}

}

