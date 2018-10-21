import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import { LoginComponent } from 'app/developer/login/login.component';
import { AppConstant } from 'app/app.constant';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import { LoaderService } from 'app/shared/loader.service';

@Injectable()
export class UtilsService{
private toasterService: ToasterService;
const: string;
  constructor(private router:Router, toasterService: ToasterService, private loaderService: LoaderService){
    this.toasterService = toasterService;
  }

 /** Get user name after login **/
  getUserName() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    if(currentUser != undefined && currentUser != null){
      var token = currentUser.token; // your token
      var avatarName = currentUser.name;
      return currentUser;
      }else{
        this.router.navigate(['login']);
      }
  }

  /** Validate user details from local browser */
  validateUser() {
  	var currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    if(currentUser != undefined && currentUser != null){
      var token = currentUser.token; // your token
      var avatarName = currentUser.name;
      return currentUser;
      }else{
        this.router.navigate(['login']);
      }
  }

  /** Save user details in local browser */
  setUserDetail(name:string, token:string, avatar:string, loginType:string) {
    if(avatar != null){
      if(loginType != null)
      localStorage.setItem('currentUser', JSON.stringify({ name: name, token: token, avatar:avatar, loginType:loginType}));
      else
        localStorage.setItem('currentUser', JSON.stringify({ name: name, token: token,avatar:avatar}));
    }else{
     if(loginType != null && loginType != undefined) 
      localStorage.setItem('currentUser', JSON.stringify({ name: name, token: token, loginType:loginType}));
     else
      localStorage.setItem('currentUser', JSON.stringify({ name: name, token: token})); 
    }  
  }

  /* * Logout User session */
  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  /** Get admin name **/
  getAdminName() {
    var currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    if(currentAdmin != undefined && currentAdmin != null){
      return currentAdmin;
      }else{      
        this.logoutAdmin();
      }
  }

 /** VALIDATE ADMIN*/
  validateAdmin() {
    var currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    if(currentAdmin != undefined && currentAdmin != null){
      var token = currentAdmin.token; // your token 
      return currentAdmin;
      }else{
        this.logoutAdmin();
      }
  }

  /**SET ADMIN DETAILS*/
  setAdminDetail(name:string, token:string, avatar:string) {
    if(avatar != null){
      localStorage.setItem('currentAdmin', JSON.stringify({ name: name, token: token, avatar:avatar}));
    }else{
      localStorage.setItem('currentAdmin', JSON.stringify({ name: name, token: token }));
    }
  } 

  /**LOGOUT ADMIN*/
  logoutAdmin(){
    localStorage.removeItem('currentAdmin');
    this.router.navigate(['adminlogin']);
  }

  /**SUCCESS TOSTER */
  successToaster(msg) {
    this.toasterService.pop('success', msg);
  }

  /* Show backend message to user in toaster */
  errorToasterBackend(msg) {
    this.toasterService.pop('error', msg);
  }

  /* Show warning message to user in toaster */
  warnToaster(msg) {
    this.toasterService.pop('warning', msg);
  }

  /**ERROR TOSTER */
  errorToaster(msg) {
    this.toasterService.pop('error', msg);
  }

  /** Validate user details from local browser */
  validateSession() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser != undefined && currentUser != null){
      return true;
    }else{
      return false;
    }
  }

  /** VALIDATE ADMIN SESSION*/
  validateAdminSession() {
    var currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
    if(currentAdmin != undefined && currentAdmin != null){
      return true;
    }else{
      return false;
    }
  }

  /** STOP LOADER**/
  stopLoader(){
    this.loaderService.display(false);
  }

  /** Internal Server Error**/
  internalServerError(){
    this.stopLoader();
    this.errorToaster("Internal Server Error!");
    this.logoutAdmin();
  }

  handleError(errorData, userType){
    this.loaderService.display(false);
    if(errorData.status == 500 &&
    JSON.parse(errorData._body).result.message == "JWT Token invalid" ||
    JSON.parse(errorData._body).result.message == "JWT Token expired" ||
    JSON.parse(errorData._body).result.message == "Invalid JWT token"
    ){
      this.errorToaster("Session has been expired. Please login to continue");
    
      if(userType == 'admin')
        this.logoutAdmin();     
      else if(userType == 'developer')
        this.logout();
    }else{
      this.errorToaster("Internal server error occured, Please try again");
    }
  }

  //FUNCTION TO READ ERROR MSG
  readErrorMsg(errorMsg) {
    if(errorMsg.message != undefined){
      var value = '';
      if( typeof errorMsg.message === 'string' ) {
        this.errorToaster(errorMsg.message);
      }else{
        for (var key in errorMsg){
          if(value != '')
            value = errorMsg.message[key];
          else
            value = errorMsg.message[key];

          this.errorToaster(value);
        }
      }          
    }else  if( typeof errorMsg === 'string' ) {
      this.errorToaster(errorMsg);
    }else if(typeof errorMsg === "object"){
      for (var key in errorMsg){
          if(value != '')
            value = errorMsg[key];
          else
            value = errorMsg[key];

          this.errorToaster(value); 
        }
    }else{
      this.errorToaster(errorMsg);
    }
  }

  backClicked() {
    window.history.back();
  }
  
  /** Save Application Id details in local browser */
  setAppID(id:number, version:any, title:any) {
    if(id != null)
      localStorage.setItem('currentAppId', JSON.stringify({ id: id, version: version, title: title }));
    else
     localStorage.setItem('currentAppId', JSON.stringify({ id: id, version: version, title: title}));  
  }

  /** Validate Application Id details from local browser */
  getAppID() {
    var currentAppId = JSON.parse(localStorage.getItem('currentAppId')); 
    if(currentAppId != undefined && currentAppId != null){
      return currentAppId;
      }else{
        this.router.navigate(['admindashboard']);
      }
  }

  /** Save developer Application Id details in local browser */
  devsetAppID(id:number, version:any, apptitle:any) {
    if(id != null)
      localStorage.setItem('devcurrentAppId', JSON.stringify({ id: id, version: version, title: apptitle }));
    else
     localStorage.setItem('devcurrentAppId', JSON.stringify({ id: id, version: version, title: apptitle}));
  }

  /** Validate developer Application Id details from local browser */
  devgetAppID() {
    var devcurrentAppId = JSON.parse(localStorage.getItem('devcurrentAppId')); 
    if(devcurrentAppId != undefined && devcurrentAppId != null){
      return devcurrentAppId;
      }else{
        //this.router.navigate(['dashboard']);
      }
  }

}