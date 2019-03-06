import { Injectable } from '@angular/core';
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class CanloaddashboardService implements CanActivate,CanLoad{

  constructor(private _permissions : PermissionService , private _router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // let test = ;
    
    if(this._permissions.canLoadDashboard()){
      return true;
    }
    this._router.navigate(['/login']);
  }

  canLoad(route:Route){
    if(this._permissions.canLoadDashboard()){
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }
}
