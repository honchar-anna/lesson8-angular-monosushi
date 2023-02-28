import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountRespons } from 'src/app/shared/interface/dicount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.css']
})
export class DiscountInfoComponent {
public userdicount!:DiscountRespons

constructor(
  private discountService:DiscountService,
  private activatedRoute: ActivatedRoute,
){}

ngOnInit(): void {
  this.activatedRoute.data.subscribe(response=>{
    this.userdicount = response['discountInfo']
  })
// this.loadProduct()
}

loadProduct():void{
  // const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  // this.discountService.getOne(id).subscribe(data=>{
  //   this.userdicount = data
  // })
}
}
