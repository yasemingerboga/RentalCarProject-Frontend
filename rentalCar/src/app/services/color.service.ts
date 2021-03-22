import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = 'https://localhost:44336/api/colors/getall';
  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }
}
