import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  isLogin:boolean;
  constructor(private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.isLoginMethod();
  }

  isLoginMethod(){
    if(this.localStorageService.getLocalStorage("token")){
      this.isLogin=true;
    }
    else{
      this.isLogin=false;
    }
  }
}
