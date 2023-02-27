import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
public uploadPercent= 0
constructor(
  private storege:Storage
) { }

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

deleteuploadFile(imgPath:string):Promise<void>{
  const task = ref(this.storege, imgPath)
  return deleteObject(task)
  }
}

