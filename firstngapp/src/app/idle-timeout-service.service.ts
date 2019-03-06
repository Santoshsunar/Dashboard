import { Injectable } from '@angular/core';
import { Subscription, Observable, Subject , timer } from 'rxjs';
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutServiceService {
 
  timeoutMiliSecond : number;

  private sessionAliveTime : number;

  timeOutSubject : Subject<boolean> = new Subject<boolean>();

  expireSessionSubject : Subject<boolean> = new Subject<boolean>();

  timeOutFlag : boolean = true;

  timoutSubscription : any;


  constructor() {


  }


  setSessionAliveTime(time : number){
    this.timeoutMiliSecond = time; //converts millisecond to seconds

    console.log('timeout at : ' + new Date(time));
    this.startTimer();
  }

  startTimer() {
    if(this.timoutSubscription != undefined){
      this.timoutSubscription.unsubscribe();
    }
    const timeObservable = timer(new Date(this.timeoutMiliSecond));

    this.timoutSubscription = timeObservable.subscribe( () =>{
      if(this.timeOutFlag){
        this.timeOutSubject.next(true);
        this.timeOutFlag = false;
      }else{
        this.expireSessionSubject.next(true)
      }
    });
  }


  resetTimer(){
    let expiryTime = (2*60*1000);

    this.setSessionAliveTime(expiryTime);
  }

}
