import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private _loginService : LoginService) { }


  canLoadDashboard(){
    let cookie = this._loginService.getCookie("nubewelldashboard");

    if(cookie != undefined && cookie != ""){
      return true;
    }
    return false;
  }
}
