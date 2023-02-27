import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductResponse } from 'src/app/shared/interface/product.inteface';
import {CategoryRespons } from 'src/app/shared/interface/category.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryServiesService } from 'src/app/shared/services/categoryServies.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  public isUploaded = false
  public isOpen = false
  public editStatus = false
  public form = 'none'
  public productForm !:FormGroup
  private currentCategoryId = 0
public uploadPercent  = 0
  private currentProductId = 0
  public adminProduct:ProductResponse[] = []
  public adminCategory:CategoryRespons[] = []

  constructor(
    private fb:FormBuilder,
    private productServis:ProductService,
    private categoreServis:CategoryServiesService,
private imgServis:ImageService,
private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.initProductForm()
    this.loadCategories()
    this.loadProduct()
    }
  initProductForm():void{
    this.productForm = this.fb.group({
      category:[null,Validators.required ],
      name:[null ,  Validators.required],
      ingredients:[null, Validators.required],
      weight:[null, Validators.required],
      price:[null, Validators.required],
     imgPath:[null,Validators.required],
     count:[1]
    })
  }
  loadProduct():void{
    this.productServis.getAll().subscribe(data=>{
      this.adminProduct = data
      this.productForm.patchValue({
        category:this.adminCategory[0].id
      })
    })
  }
  loadCategories():void{
    this.categoreServis.getAll().subscribe(data=>{
     
      this.adminCategory = data
    })
  }
show(){
  this.form = ''
}
  add(): void{
if(this.editStatus){
  this.productServis.update(this.productForm.value, this.currentProductId).subscribe(()=>{
    this.loadProduct()})
    this.toastr.success('Product save');
  }
else{
  this.toastr.success('Product add');

  this.productServis.create(this.productForm.value).subscribe(()=>{
    this.loadProduct()


  })}
  this.form = 'none'
  this.editStatus= false
  this.productForm.reset()
this.isUploaded = false
  }
  
  
  edit(product:ProductResponse):void{
    console.log(product);
    this.productForm.patchValue({
      category:product.category,
      name:product.name,
      weight:product.weight,
      price:product.price,
      ingredients:product.ingredients,
      imgPath:product.imgPath
    })
    this.editStatus = true
    this.currentProductId = product.id
    this.isUploaded = true

  }
  delete(product:ProductResponse): void{
    this.toastr.success('Product delete');

    this.productServis.delete(product.id).subscribe(()=>{
      this.loadProduct()
    })
  }

  upload(event:any):void{
    const file = event.target.files[0]
    this.imgServis.uploadFile('images', file.name, file)
    .then(data=>{
      this.productForm.patchValue({
        imgPath:data
      });
      this.isUploaded=true
    })
    .catch(err=>{
      console.error(err);
      
    })
  }
deleteImg(){
  this.imgServis.deleteuploadFile(this.valueByControl('imgPath'))
  .then(()=>{
    console.log('delete');

    this.isUploaded = false
    this.productForm.patchValue({ imgPath:null})
  })
  .catch(err=>{
    console.log(err);
    
  })
}
     valueByControl(control:string):string{
      return this.productForm.get(control)?.value
     }


}
