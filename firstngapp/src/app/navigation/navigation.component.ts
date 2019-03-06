import { Component, OnInit } from '@angular/core';
import { NavigationOptions } from '../navigation-options';
import { Path } from '../routes.enum';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navigationOptions: Array<NavigationOptions> = [
    { name : 'Dashboard' , path : '' , isSelected:false},
    { name : 'Interface' , path : Path.INTERFACE ,  isSelected:true},
    { name : 'Settings' , path : '' , isSelected:false},
    { name : 'Users' , path : '' , isSelected:false},
    { name : 'File Upload' , path : '' , isSelected:false},
    { name : 'Alias' , path : '' , isSelected:false },
    { name : 'Custom Protocols' , path : '' , isSelected:false}
  ]

  constructor(private _activatedroute : ActivatedRoute , private _router : Router) { }

  ngOnInit() {

  }

}
