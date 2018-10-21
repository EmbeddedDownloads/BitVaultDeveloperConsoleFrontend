import {Injectable} from '@angular/core';
//import {Response} from "angular2/http";

@Injectable()
export class AccountRequestService {
  private accountRequest={};
    
  constructor() {       
    console.log('Inside service');        
  }

  setAccountDetail (request:any) {
    this.accountRequest = request;
  }
 
  getAccountDetail () {
    return this.accountRequest;
  }

}