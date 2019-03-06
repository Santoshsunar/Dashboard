import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchSubject : Subject<any> = new Subject<any>();
  constructor() { }

  gridSearch(searchPhrase : any){
    this.searchSubject.next(searchPhrase);
  }
}
