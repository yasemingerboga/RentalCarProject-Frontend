import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserInformation } from '../models/userInformation';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  
  constructor(private httpClient:HttpClient) { }
  apiUrl = 'https://localhost:44336/api/userinformations/';
  getByUserId(userId:number):Observable<SingleResponseModel<UserInformation>>{
    let newpath=this.apiUrl+"getbyuserid?userId="+userId;
    return this.httpClient.get<SingleResponseModel<UserInformation>>(newpath);
  }
  add(userInformation:UserInformation){
    let newpath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newpath,userInformation);
  }
  delete(userInformation:UserInformation){
    let newpath=this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newpath,userInformation);
  }
  update(userInformation:UserInformation){
    let newpath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newpath,userInformation);
  }
}
