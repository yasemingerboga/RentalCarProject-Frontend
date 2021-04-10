import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorage(token:string,data:string){
    localStorage.setItem(token,data);
  }
  getLocalStorage(token:string){
    if(localStorage.getItem(token)){
      return true;
    }
    else{
      return false;
    }
  }
  deleteLocalStorage(token:string){
    localStorage.removeItem(token);
  }
}
