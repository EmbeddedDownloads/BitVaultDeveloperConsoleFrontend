import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { User } from 'app/models/user';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchingPasswords } from 'app/validators/validators';
import { AppConstant } from 'app/app.constant';
import {AppConfig} from 'app/app.config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  complexForm1 : FormGroup;
  complexFormOrg : FormGroup;
  user = new User;
  appConfig: any = {};
  constants: any = {};

  constructor(private myHttp: httpService, private router:Router, fb:FormBuilder, private utilsService: UtilsService) {
    this.user.signupAs = "Individual";    
    this.complexForm1 = fb.group({
      'username' : [null, Validators.compose([Validators.required, Validators.maxLength(30) ]) ],
      'signupAs' : [null, Validators.required],
      'email': [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
      'confirmPassword' : ['', Validators.required],
      'signupReason' : [null, Validators.required],
      'TermAndCond' : [null, Validators.required],
      'orgName' :[null],
      'accEmail' :[null],
      'website' :[null]
    }, {validator: matchingPasswords('password', 'confirmPassword')});

    this.complexFormOrg = fb.group({
      'orgName' :[null, Validators.required],
      'accEmail' :[null, Validators.required],
      'website' :[null, Validators.required]
    });

    this.constants = AppConstant;
    this.appConfig = AppConfig;
  }

  ngOnInit() { }

  signup() {
    if(this.user.TermAndCond == null || this.user.TermAndCond == false){
      this.utilsService.errorToaster(this.constants.REQUIRED_TERM_CONDITION);
      return false;
    }

    this.myHttp.postRequestService(AppConfig.DEV_SIGNUP,this.user).subscribe(
       data =>{
        if (data.status == 'success')
          this.user.signUpMsg = data.result.message;
        else
          this.utilsService.errorToaster(data.result.message);
	   },error => {
	  		this.utilsService.stopLoader(); 
        this.utilsService.errorToaster(this.constants.INTERNAL_SERVER_ERROR);	  		
       });    
  }

  signupAsInduvidual(){
    if(this.user.signupAs =='Individual'){
      this.user.orgName ="";
      this.user.accEmail ="";
      this.user.website ="";
    }
  }
}