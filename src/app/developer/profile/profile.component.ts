import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { httpService } from 'app/shared/http.service';
import { Http, Headers,RequestOptions } from '@angular/http';
import { UtilsService } from 'app/shared/utils.service';
import { User } from 'app/models/user';
import {Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchingPasswords } from 'app/validators/validators';
import { AppConstant } from 'app/app.constant';
import {AppConfig} from 'app/app.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm : FormGroup;
  changePasswordForm : FormGroup;
  user = new User;
  appConfig: any = {};
  constants: any = {};

  constructor(private myHttp: httpService, private router:Router, fb:FormBuilder, private utilsService: UtilsService) { 
    this.profileForm = fb.group({
      'username' : [null, Validators.compose([Validators.required, Validators.maxLength(30) ]) ],
      'altEmail' : [null, Validators.compose([Validators.maxLength(30) ]) ],
    });
    this.changePasswordForm = fb.group({
      'oldPassword' : [null, Validators.compose([Validators.required, Validators.maxLength(30) ]) ],
      'newPassword' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
      'confirmPassword' : ['', Validators.required],
    }, {validator: matchingPasswords('newPassword', 'confirmPassword')});

    this.constants = AppConstant;
    this.appConfig = AppConfig;
  }

  ngOnInit() {
    if(this.utilsService.validateUser())
    {
      this.myHttp.getUserRequest(AppConfig.GET_DEV_PROFILE_URL).subscribe(
         data =>{
          if (data.status == 'success')
          {        
            this.user.username = data.result.username;
            this.user.avatar = data.result.avatarURL;          
            this.user.email = data.result.email;   
            this.user.altEmail = data.result.altEmail;
          }else
          {
           this.utilsService.errorToasterBackend(data.status);      
          }
       },error => {
          this.utilsService.handleError(error, 'developer');     
      });
    }
  }

  uploadAvatar(event){    
    var fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.user.avatar = file;      
    }else return false;
    
    var formData = new FormData(); 
    formData.append('file', this.user.avatar);
    formData.append('type',  '');
    let headers = new Headers();
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateUser().token);
      
    let options = new RequestOptions({ headers: headers });
    let url = AppConfig.API_BASE_URL+AppConfig.UPLOAD_DEV_AVATAR_URL;
    
    this.myHttp.uploadAvatar(url, formData, options)
    .subscribe(
        data => {
          if (data.status == this.constants.SUCCESS){
            this.user.avatar = data.result.avatarURL;
            var storedUserDetails = this.utilsService.validateUser();
            this.utilsService.setUserDetail(storedUserDetails.name, storedUserDetails.token, this.user.avatar, storedUserDetails.loginType);
            this.utilsService.successToaster(this.constants.APP_UPLOADED_DETAILS_SUCCESS);
            location.reload();
          }else{
            var storedUserDetails = this.utilsService.validateUser();
            this.user.username = storedUserDetails.name;
            this.user.avatar = storedUserDetails.avatar;          
            this.user.email = storedUserDetails.email;   
            
            this.utilsService.readErrorMsg(data.result);
          }
        },error => {
           this.utilsService.handleError(error, 'developer');                  
    });
  }

  updateProfileDetails(){    
    this.myHttp.putRequestDeveloperService(AppConfig.UPDATE_DEV_PROFILE_URL,this.user).subscribe(
       data =>{
        if (data.status == 'success')
        {
          var storedUserDetails = this.utilsService.validateUser();
          this.utilsService.setUserDetail(this.user.username, storedUserDetails.token, storedUserDetails.avatar, storedUserDetails.loginType);
          this.utilsService.successToaster(this.constants.PROFILE_UPDATE_SUCCESS);
          location.reload();        
        }else
        {     
          this.utilsService.readErrorMsg(data.result);
        }
     },error => {
      console.log("errrr");
        this.utilsService.handleError(error, 'developer');     
    });
  }

  deleteAvatar() {
    var isConfirmed = confirm("Are you sure you want to delete your profile image?");
    if(!isConfirmed)
      return false;

    var data = {"type":""};
    this.myHttp.deleteServiceDeveloper(AppConfig.DELETE_DEV_AVATAR_URL,data).subscribe(
       data =>{
        if (data.status == 'success'){
          this.user.avatar="";
          var storedUserDetails = this.utilsService.validateUser();
          this.utilsService.setUserDetail(this.user.username, storedUserDetails.token, "", storedUserDetails.loginType);
          this.utilsService.successToaster(this.constants.DELETE_SUCCESS);
          location.reload();
        }else{    
          this.utilsService.readErrorMsg(data.result);
        }
     },error => {
        this.utilsService.handleError(error, 'developer');     
    });
  } 

  //UPDATE PASSWORD
  updatePassword() {
    this.user.type = "";    
     this.myHttp.putRequestDeveloperService(AppConfig.UPDATE_DEV_PASSWORD,this.user).subscribe(
       data =>{
        if (data.status == 'success'){
          this.utilsService.successToaster(this.constants.PASSWORD_UPDATED_SUCCESS);
          this.changePasswordForm.reset();
        }else{
          this.utilsService.readErrorMsg(data.result);
        }
     },error => {
        this.utilsService.handleError(error, 'developer');     
    }); 
  }

}