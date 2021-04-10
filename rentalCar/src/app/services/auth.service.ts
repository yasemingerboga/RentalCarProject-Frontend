import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44336/api/auth/';
  constructor(private httpClient:HttpClient,
    private localStorageService:LocalStorageService) { }
  register(registerModel:RegisterModel){
    let newPath=this.apiUrl+"register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }
  isAuthenticated(){
    return this.localStorageService.getLocalStorage("token");
  }
  login(loginModel:LoginModel){
    let newPath=this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }
}
