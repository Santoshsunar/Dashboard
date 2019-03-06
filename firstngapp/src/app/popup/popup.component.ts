import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {


  showPopup: boolean = false;
  @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private _popupService: PopupService) { }

  ngOnInit() {
    this._popupService.popupSubject.subscribe((value) => {
      this.showPopup = true;
    });
  }


  closeDialog() {
    this.showPopup = false;
    this.dialogClosed.emit(this.showPopup);
  }

  openDialog() {

  }
}
