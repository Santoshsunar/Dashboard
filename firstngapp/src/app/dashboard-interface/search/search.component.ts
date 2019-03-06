import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime , distinctUntilChanged } from'rxjs/operators';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchSubject : Subject<string> = new Subject<string>();
  searchInput : string;
  constructor(private _searchService : SearchService) { }

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300),distinctUntilChanged()).subscribe(value =>{
      this.inputValueChanged(value);
   });
  }

  inputValueChanged(event){
    this._searchService.gridSearch(event);
  }

}
