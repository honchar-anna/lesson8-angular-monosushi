import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, Storage, uploadBytesResumable } from '@angular/fire/storage';

import { Category, CategoryRespons } from 'src/app/shared/interface/category.interface';

import { CategoryServiesService } from 'src/app/shared/services/categoryServies.service';
import { ref } from '@firebase/storage';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {
  public editStatus = false
public categoryForm !:FormGroup
private currentCategoryId = 0
public uploadPercent!:number
public isUploaded = false
public adminCategory:Category[] = []
constructor(
  private fb:FormBuilder,
  private categoryServis:CategoryServiesService,
  private storege:Storage
){

}
ngOnInit(): void {
  this.initCategoryForm()
  this.loadCategories()
  }
initCategoryForm():void{
  this.categoryForm = this.fb.group({
    name:[null ,  Validators.required],
    path:[null, Validators.required],
   imgPath:[null, Validators.required  ]
  })
}
loadCategories():void{
  this.categoryServis.getAll().subscribe(data=>{
    this.adminCategory = data
  })
}
add(){
  if(this.editStatus){
  this.categoryServis.update(this.categoryForm.value,this.currentCategoryId).subscribe(()=>{
  this.loadCategories()})
  }
else{

  this.categoryServis.create(this.categoryForm.value).subscribe(()=>{
    this.loadCategories()
  })}
  this.editStatus= false
  this.categoryForm.reset()
this.isUploaded = false
}


edit(category:CategoryRespons):void{
  console.log(category);
  this.categoryForm.patchValue({
    name:category.name,
    path:category.path,
    imgPath:category.imgPath
  })
  this.editStatus = true
  this.currentCategoryId = category.id
  this.isUploaded = true
}
delete(category:CategoryRespons){
  this.categoryServis.delete(category.id).subscribe(()=>{
    this.loadCategories()
  })
}
upload(event:any):void{
  const file = event.target.files[0]
  this.uploadFile('images', file.name, file)
  .then(data=>{
    this.categoryForm.patchValue({
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
  return this.categoryForm.get(control)?.value
 }
deleteImg():void{
  const task = ref(this.storege, this.valueByControl('imgPath'))
  deleteObject(task).then(()=>{
    console.log('delete');

    this.isUploaded = false
    this.categoryForm.patchValue({
      imgPath:null
    })
  })
}
}
