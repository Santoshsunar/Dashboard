import { Pipe, PipeTransform } from '@angular/core';
import { Rule } from './rule';
import { FormArray, FormGroup, FormControl,AbstractControl } from '@angular/forms';

@Pipe({
  name: 'pagination',
  pure:false
})
export class PaginationPipe implements PipeTransform {

  transform(FormControlArray: FormArray, pageSize : string , pageNumber : string): any {
    let startIndex = (parseInt(pageNumber)- 1) * parseInt(pageSize);
    let endIndex = startIndex + parseInt(pageSize);
    if(FormControlArray .length == 0){
      return FormControlArray;
    }
    console.log(FormControlArray.getRawValue());

    return (<Array<FormGroup>>FormControlArray.getRawValue()).filter((x, index)=>{
      return (x.value['index'] >= startIndex && x.value['index'] <= endIndex);
    })
  //  return FormControlArray;
  }

}
