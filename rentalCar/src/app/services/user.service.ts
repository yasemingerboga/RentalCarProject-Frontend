import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = 'https://localhost:44336/api/users/';
  getByUserId(email:string):Observable<SingleResponseModel<RegisterModel>>{
    let newpath=this.apiUrl+"getbymail?email="+email;
    return this.httpClient.get<SingleResponseModel<RegisterModel>>(newpath);
  }
}
