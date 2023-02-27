import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Discount } from 'src/app/shared/interface/dicount.interface';
import { DiscountRequest,DiscountRespons } from 'src/app/shared/interface/dicount.interface';
import { ref } from '@firebase/storage';
import { DiscountService } from 'src/app/shared/services/discount.service';
@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.css']
})
export class AdminDiscountComponent {
  public editStatus = false
  public discountForm !:FormGroup
  private currentDiscountId = 0
  public uploadPercent!:number
  public isUploaded = false
  public form = 'none'
  public adminDiscount:Discount[] = []

  constructor(
    private fb:FormBuilder,
    private discountServis:DiscountService,
    private storege:Storage
  ){}
  ngOnInit(): void {
    this.initDiscountForm()
    this.loadCategories()
    }
  initDiscountForm():void{
    this.discountForm = this.fb.group({
    data:[null],
    name:[null, Validators.required],
    title:[null, Validators.required],
   text:[null, Validators.required],
   imgPath:[null, Validators.required]
    })
  }
  loadCategories():void{
    this.discountServis.getAll().subscribe(data=>{
      this.adminDiscount = data
    })
  }
  show(){
    this.form = ''
  }
  add(){
    if(this.editStatus){
    this.discountServis.update(this.discountForm.value,this.currentDiscountId).subscribe(()=>{
    this.loadCategories()})
    }
  else{
  
    this.discountServis.create(this.discountForm.value).subscribe(()=>{
      this.loadCategories()
    })}
    this.editStatus= false
    this.discountForm.reset()
  this.isUploaded = false
  this.form = 'none'
  }
  edit(discount:DiscountRespons):void{
    console.log(discount);
    this.discountForm.patchValue({
      data:Date,
      name:discount.name,
      title:discount.title,
      text:discount.text,
      imgPath:discount.imgPath
    })
    this.editStatus = true
    this.currentDiscountId = discount.id
    this.isUploaded = true
    this.form = ''
  }
  delete(discount:DiscountRespons){
    this.discountServis.delete(discount.id).subscribe(()=>{
      this.loadCategories()
    })
  }
  upload(event:any):void{
    const file = event.target.files[0]
    this.uploadFile('images', file.name, file)
    .then(data=>{
      this.discountForm.patchValue({
        imgPath:data
      });
      this.isUploaded=true
    })
    .catch(err=>{
      console.error(err);
      
    })
  }
    async uploadFile(folder:string,name:string,file:File | null):Promise<string>{
  const path = `${folder}/${name}`;
  let url = '';
  if(file){
    try{
     const storegRef =  ref(this.storege, path)
  const task = uploadBytesResumable(storegRef,file);
  percentage(task).subscribe(data=>{
    this.uploadPercent = data.progress
  });
  await task;
  url = await getDownloadURL(storegRef)
    }catch(e:any){
      console.error(e);
      console.error('neok');
      
    }
  
  }
  else{console.log('no ok');
  }
  return Promise.resolve(url)
  }
   valueByControl(control:string):string{
    return this.discountForm.get(control)?.value
   }
  deleteImg():void{
    const task = ref(this.storege, this.valueByControl('imgPath'))
    deleteObject(task).then(()=>{
      console.log('delete');
  
      this.isUploaded = false
      this.discountForm.patchValue({
        imgPath:null
      })
    })
  }
}
