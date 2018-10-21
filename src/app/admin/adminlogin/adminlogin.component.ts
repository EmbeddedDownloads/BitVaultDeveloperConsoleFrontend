import { Component, OnInit } from '@angular/core';
import { HttpModule , Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { User } from 'app/models/user';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConstant } from 'app/app.constant';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
  providers: [httpService]
})
export class AdminloginComponent implements OnInit {
  complexForm : FormGroup;
  user = new User;
  constants: any = {};
  
  constructor(private myHttp: httpService, private router:Router, fb: FormBuilder, private utilsService: UtilsService) { 
    this.complexForm = fb.group({
      'username' : [null, Validators.required],
      'password': [null, Validators.required]      
    });
    this.constants = AppConstant;
  }

  ngOnInit() {
  console.log(this.utilsService.validateAdminSession());
    if(this.utilsService.validateAdminSession()){
      this.router.navigate(['admindashboard']);
    }else{return;}
  }

  login(){
    let dataUrl = AppConfig.ADMIN_LOGIN;
    this.user.loginType = "ADMIN";
    let body=this.user;
    this.myHttp.postRequestService(dataUrl,body).subscribe(
       data =>{
        if (data.status == 'success'){
          var avatar = null;
          if(data.result.avatarURL != null && data.result.avatarURL != ''){
            avatar = data.result.avatarURL;
          }else{
            avatar = "assets/images/user.png";
          }
          
          this.utilsService.setAdminDetail(data.result.avatarName, data.result.accessToken, avatar);
          this.utilsService.successToaster(AppConstant.LOGIN_SUCCESS);
          this.router.navigate(['admindashboard']);
        }else{
          this.utilsService.errorToasterBackend(data.result.message);  
        }
	   },error => {
        this.utilsService.internalServerError();
    });
  }
}