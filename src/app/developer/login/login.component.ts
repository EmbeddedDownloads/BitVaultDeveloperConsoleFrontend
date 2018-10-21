import { Component, OnInit } from '@angular/core';
import { HttpModule , Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import { User } from 'app/models/user';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  complexForm : FormGroup;
  user = new User;
  constants: any = {};
  userStatus: boolean = false;
  payment:number = 1;
  amount:number;
  formAction:string;
  token:string;
  userId:string;
  
  constructor(private myHttp: httpService, private router:Router, fb: FormBuilder, private utilsService: UtilsService) { 
    this.complexForm = fb.group({
      'username' : [null, Validators.required],
      'password': [null, Validators.required]     
    });
    this.constants = AppConstant;
  }

  ngOnInit() {
    if(this.utilsService.validateSession())
      this.router.navigate(['dashboard']);
    else return;
  }
  
  login(){
    this.user.loginType = "";
    this.myHttp.postRequestService(AppConfig.DEV_LOGIN,this.user).subscribe(
       data =>{
        if (data.status == 'success') {
          if(data.result.paymentStatus == 'PENDING' || data.result.paymentStatus == 'FAILED') {
            this.userStatus=true;
            this.amount = data.result.paybleAmount;
            this.formAction = AppConfig.SERVER_URL+'gourl/index.php';
            this.token = data.result.accessToken;
            this.userId = data.result.userId;
            return false;
          }
          var avatar = null;
          if(data.result.avatarURL != null)
            avatar = data.result.avatarURL;
          if(data.result.loginType != undefined && data.result.loginType != null)
            this.utilsService.setUserDetail(data.result.avatarName, data.result.accessToken, avatar, data.result.loginType);
          else
            this.utilsService.setUserDetail(data.result.avatarName, data.result.accessToken, avatar, ''); 
          this.utilsService.successToaster(AppConstant.LOGIN_SUCCESS); 
          this.router.navigate(['dashboard']);        
        }else{
         this.utilsService.errorToasterBackend(data.result.message);      
        }
	   },error => {
        this.utilsService.stopLoader();
        this.utilsService.errorToasterBackend(this.constants.INTERNAL_SERVER_ERROR);        
      });
  }

  submitPayment(){
    console.log(this.payment);
    if(this.payment==1){
     this.myHttp.postRequestService(AppConfig.PAYPAL_PAYMENT,{"userId":this.userId, "paybleAmount":this.amount}).subscribe(
       data =>{
        if (data.status == 'success') {
          window.location.href=data.result.paymentURL;  
        }else{
         this.utilsService.errorToasterBackend(data.result.message);      
        }
     },error => {
        this.utilsService.stopLoader(); 
        this.utilsService.errorToasterBackend(this.constants.INTERNAL_SERVER_ERROR);        
      });
    }
  } 


}