import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(
    private router:Router,
    private accountService:AccountService
  ){}
  
  
  logOut(){
this.router.navigate(['/'])
localStorage.removeItem('currentUser')
this.accountService.isUserLogin$.next(true)
  }
}
