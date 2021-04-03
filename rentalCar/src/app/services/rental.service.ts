import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = 'https://localhost:44336/api/rentals/';
  getRentals():Observable<ListResponseModel<Rental>>{
    let newpath=this.apiUrl+"rentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newpath);
  }
  rentCar(rental:Rental):Observable<ResponseModel>{
    let newpath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newpath,rental);
  }
  getRentalsByCarId(carId:number):Observable<ResponseModel>{
    let newpath=this.apiUrl+"isValid?carId="+carId;
    return this.httpClient.get<ResponseModel>(newpath);
  }
  checkAvailability(rentDate:Date,carId:number){
    let newpath=this.apiUrl+"/checkavailability?rentDate="+rentDate+"&carId="+carId;
    return this.httpClient.get<ResponseModel>(newpath);
  }
}