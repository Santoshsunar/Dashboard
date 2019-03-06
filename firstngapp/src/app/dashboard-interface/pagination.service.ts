import { Injectable } from '@angular/core';
import { Rule } from './rule';
import { FormArray,FormBuilder, FormGroup } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { TableRule } from './table-rule';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  tableData : FormGroup;
  
  dataSize : number;

  formValue : any = [];

  dataSizeSubject : BehaviorSubject<any> = new BehaviorSubject<any>(0);

  tableDataSubject : Subject<any> = new Subject<any>();

  pageNumber : number = 1 ;
  constructor(private _fb : FormBuilder) { }

  setTableData(tableData : FormGroup ){
    this.tableData = tableData;
    this.getTableData(this.pageNumber,10);
    this.dataSize = this.tableData.value.rules.length;
    this.dataSizeSubject.next(this.dataSize);
  }

  getTableData(pagenumber : number, pageSize : number){
    let startIndex = (pagenumber- 1) * pageSize;
    let endIndex = startIndex + pageSize;
    let formArray = this.tableData.get('rules') as FormArray;

    let formArrayLength = formArray.length;

    if(endIndex >= formArrayLength){
      endIndex = formArrayLength;
    }

    this.formValue = this.tableData.value;
    this.formValue = this.formValue['rules'].slice(startIndex , endIndex);
    console.log(this.tableData);
    this.tableDataSubject.next(this.formValue);
  }


  getNumberOfPages(){
    let dataSize = this.tableData.value;
    return dataSize.rules;
  }

  pageChanged(pageNumber){
    this.pageNumber = pageNumber;
    this.getTableData(pageNumber , 10);
  }


  searchTableData(searchPhrase : string){
    let formValue = this.tableData.value['rules'];

    formValue = formValue.filter( (value) =>{
       if((value.sourceIp.includes(searchPhrase)) || (value.destinationIp.includes(searchPhrase)) || (value.protocol.includes(searchPhrase)) || (value.accessType.includes(searchPhrase))){
         return value;
       }
    });

    return formValue;

  }

}
