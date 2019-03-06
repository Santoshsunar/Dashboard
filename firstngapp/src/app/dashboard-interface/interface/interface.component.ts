import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Rule } from '../rule';
import { Tableheader } from '../tableheader';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Dropdown } from '../dropdown';
import { PaginationService } from '../pagination.service';
import { LocalstorageService } from '../localstorage.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { TableRule } from '../table-rule';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

  tableRules: FormGroup;

  tableData: Array<Rule> = [];
  tableHeader: Tableheader;

  formData: any = []

  accessType: Array<Dropdown> = [];
  protocols: Array<Dropdown> = [];

  rules: FormArray;
  origRules: FormGroup;

  ruleArray: FormGroup;

  pageSize = 10;

  totalSize: number;

  pageLength: number;

  constructor(private _fb: FormBuilder, private _paginationService: PaginationService,
    private _cdr: ChangeDetectorRef, private _localstorageService: LocalstorageService,
    private _searchService: SearchService) { }

  ngOnInit() {
    this.accessType = [
      { name: 'deny', value: 'deny' },
      { name: 'permit', value: 'permit' }
    ];

    this.protocols = [
      { name: 'tcp', value: 'tcp' },
      { name: 'ip', value: 'ip' },
      { name: 'udp', value: 'udp' }
    ];

    this._paginationService.tableDataSubject.subscribe((data) => {
      this.createPaginatedForm(data);
    });


    this._searchService.searchSubject.subscribe((value) => {
      let rule : TableRule = this._paginationService.searchTableData(value);
      this.createPaginatedForm(rule);
    });


    this.initForm();
  }

  addRule() {
    this.rules = this.tableRules.get('rules') as FormArray;
    this.rules.insert(0, this.createRow());
    this._paginationService.setTableData(this.tableRules);
  }

  createRow() {
    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/([1-9]|1[0-9]|2[0-9]|3[0-2]|(((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(0|128|192|224|240|248|252|254)\.0\.0)|(255\.255\.(0|128|192|224|240|248|252|254)\.0)|(255\.255\.255\.(0|128|192|224|240|248|252|254))))";
    return this._fb.group({
      protocol: ['', Validators.required],
      sourceIp: ['', [Validators.pattern(ipPattern), Validators.required]],
      destinationIp: ['', [Validators.pattern(ipPattern), Validators.required]],
      accessType: ['', Validators.required]
    });
  }

  delete(index: number) {
    let rules = this.tableRules.get('rules') as FormArray;
    rules.removeAt(index);
    this._paginationService.setTableData(this.tableRules);
  }

  formValueChangeListener() {
    this.tableRules.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((data) => {
      this.formData = data;
      this._localstorageService.setItem('table-rules', JSON.stringify(data));
      this.totalSize = this.formData['rules'].length;
    });
  }

  get rulesArray() {
    return this.ruleArray.get('rules') as FormArray;
  }

  createPaginatedForm(formValue: any) {
    this.pageLength = formValue.length;
    let ruleArray = this.ruleArray.get('rules') as FormArray;
    ruleArray.controls.splice(0, ruleArray.length);

    this.ruleArray.reset();
    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/([1-9]|1[0-9]|2[0-9]|3[0-2]|(((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(0|128|192|224|240|248|252|254)\.0\.0)|(255\.255\.(0|128|192|224|240|248|252|254)\.0)|(255\.255\.255\.(0|128|192|224|240|248|252|254))))";
    for (let i = 0; i < formValue.length; i++) {

      let formGroup = this._fb.group({
        protocol: [formValue[i].protocol, Validators.required],
        sourceIp: [formValue[i].sourceIp, [Validators.pattern(ipPattern), Validators.required]],
        destinationIp: [formValue[i].destinationIp, [Validators.pattern(ipPattern), Validators.required]],
        accessType: [formValue[i].accessType, Validators.required]
      });
      ruleArray.push(formGroup);
    }
  }



  initForm() {

    this.tableRules = this._fb.group({
      rules: this._fb.array([])
    });


    this.ruleArray = this._fb.group({
      rules: this._fb.array([])
    });

    this.formValueChangeListener();

    let tableRules = JSON.parse(localStorage.getItem('table-rules'));

    if (tableRules != null) {

      if(tableRules['rules'].length > 0){
        let ruleArray = this.tableRules.get('rules') as FormArray;
        for (let i = 0; i < tableRules['rules'].length; i++) {
          ruleArray.push(this.addRow(tableRules['rules'][i]));
        }
        this.pageLength = tableRules['rules'].length;
        this._paginationService.setTableData(this.tableRules);
      }



      if(tableRules['rules'].length == 0){
        this.addEmptyRow();
      }
    }



  }

  addRow(formValue: TableRule) {
    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/([1-9]|1[0-9]|2[0-9]|3[0-2]|(((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(0|128|192|224|240|248|252|254)\.0\.0)|(255\.255\.(0|128|192|224|240|248|252|254)\.0)|(255\.255\.255\.(0|128|192|224|240|248|252|254))))";
    return this._fb.group({
      protocol: [formValue.protocol, Validators.required],
      sourceIp: [formValue.sourceIp, [Validators.pattern(ipPattern), Validators.required]],
      destinationIp: [formValue.destinationIp, [Validators.pattern(ipPattern), Validators.required]],
      accessType: [formValue.accessType, Validators.required]
    });
  }


  addEmptyRow(){
    let formValue : TableRule = {protocol:'' , sourceIp : '' , destinationIp : '' , accessType : ''};
    let rules = this.tableRules.get('rules') as FormArray;
    rules.insert(0,this.addRow(formValue));
    this._paginationService.setTableData(this.tableRules);
  }

}
