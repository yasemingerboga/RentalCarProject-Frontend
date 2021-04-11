import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:44336/api/cards/';
  constructor(private httpClient: HttpClient) {}

  CheckCreditCard(cardNumber: string): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'check?cardNumber=' + cardNumber;
    return this.httpClient.get<ResponseModel>(newUrl);
  }
}
