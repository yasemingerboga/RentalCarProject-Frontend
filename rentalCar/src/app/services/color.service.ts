import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = 'https://localhost:44336/api/colors/';
  getColors():Observable<ListResponseModel<Color>> {
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  add(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  getColorsByColorId(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl+"getbycolorid?colorId="+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }
  update(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
