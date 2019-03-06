import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {


  popupSubject : Subject<boolean> = new Subject<boolean>();

  constructor() { }

  openPopup(){
    this.popupSubject.next(true);
  }
}
