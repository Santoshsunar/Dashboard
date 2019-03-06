import { Injectable } from '@angular/core';
import { Login } from './login';
import {  BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  /**
   * Use of behavioral subject as it stores the previous value 
   */
  loginSubject : BehaviorSubject<Login> = new BehaviorSubject<Login>(null);

  constructor() { 

    let loginDetails : string = localStorage.getItem('login-details');

    let login : Login = JSON.parse(loginDetails);
    
    if(login == undefined){
      localStorage.setItem('login-details' , JSON.stringify({username:'admin' , password :'admin'}));
      
    }

  }

  setCookie(){
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 1000*240; //600 minutes
    now.setTime(expireTime);

    document.cookie = 'nubewelldashboard='+ expireTime +';expires='+now.toUTCString()+';path=/';
    console.log(document.cookie);

  }

  getCookie(name:string){
    let cookieName = name+"=";
    let cookieDoc = document.cookie.split('-');
    for(let i=0; i <cookieDoc.length;i++){
      let cookie = cookieDoc[i];
      console.log(cookie);
      if (cookie.indexOf(cookieName) == 0){
        console.log(cookie);
        return cookie.substring(cookieName.length,cookie.length);
      }
    }

  }

  deleteCookie(name :String){
    let now = new Date(0);
    let expireTime = now.getTime();
    now.setTime(expireTime);

      document.cookie = document.cookie+';expires='+now.toUTCString()+';path=/'; 
  }

  login(login:Login){
    let loginData : string = localStorage.getItem('login-details');
    let loginDetails : Login = JSON.parse(loginData);
    if(login.username == loginDetails.username && login.password == loginDetails.password){
      return true;
    }
    return false;
  }
  
}
