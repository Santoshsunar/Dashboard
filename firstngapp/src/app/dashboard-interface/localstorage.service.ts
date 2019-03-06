import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }


  setItem(itemKey : string , value : string){
    localStorage.setItem(itemKey , value);
  }

  getItem(itemKey :string ){
    localStorage.getItem(itemKey);
  }
}
