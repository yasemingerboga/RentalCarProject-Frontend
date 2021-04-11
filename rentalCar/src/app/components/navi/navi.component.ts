import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user:LoginModel;
  constructor(private localStorageService:LocalStorageService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user=>{
      if(user){
        this.user=user;
      }
    })
  }
}
