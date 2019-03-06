import { Component, OnInit } from '@angular/core';
import {PaginationService } from '../pagination.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-pagination-options',
  templateUrl: './pagination-options.component.html',
  styleUrls: ['./pagination-options.component.css']
})
export class PaginationOptionsComponent implements OnInit {

  constructor(private _paginationService : PaginationService) { }

  pageSize : number;
  pageObject : any = [];
  pageNumber : any;

  pageNumberSubject : Subject<any> = new Subject<any>();

  ngOnInit() {
   this._paginationService.dataSizeSubject.subscribe((size) => {
     if(size <=10){
       this.pageSize = 1;
       this._paginationService.pageChanged(this.pageSize);
     }else{
        this.pageSize = Math.floor(size/10);
        if(size%10 < 10){
          this.pageSize += 1;
        }
     }
      this.createPageObject();
    });

  }


  createPageObject(){
    this.pageObject = [];
    for(let i=1; i <=this.pageSize ; i++){
      this.pageObject.push({name : i , value : i , selected : false});
    }
    this.pageObject.unshift({name : 'Prev', value : 'Prev' , selected : false});
    this.pageObject.unshift({name : 'First' , value :'First' , selected : false});
    this.pageObject.push({name :'Next' , value : 'Last', selected : false});
    this.pageObject.push({name : 'Last', value : 'Last', selected : false});
  }

  pageClicked(pageNo : any){

    switch(pageNo){
      case 'Prev' :
      if(this.pageNumber == 1){
        return;
      }
      this.pageNumber = this.pageNumber-1 ; 
      break;
      case 'Next':
      this.pageNumber++;
      break;
      case 'First':
      this.pageNumber = 1;
      break;
      case 'Last':
      this.pageNumber = this.pageSize;
      break;
      default:
      this.pageNumber = pageNo;
      break;
    }
    this._paginationService.pageChanged(this.pageNumber);
  }

}
