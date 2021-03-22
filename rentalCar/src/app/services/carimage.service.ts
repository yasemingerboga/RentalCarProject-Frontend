import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = 'https://localhost:44336/api/';
  getByCarId(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath=this.apiUrl+"carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
