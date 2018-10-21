import { Component, OnInit } from '@angular/core';
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
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  profileForm : FormGroup;
  changePasswordForm : FormGroup;
  user = new User;
  changePassUser = new User;
  appConfig: any = {};
  constants: any = {};

  constructor(private myHttp: httpService, private router:Router, fb:FormBuilder, private utilsService: UtilsService) { 
    this.profileForm = fb.group({
      'firstName' : [null, Validators.compose([Validators.required, Validators.maxLength(30) ]) ],
      'lastName' : [null, Validators.compose([Validators.required, Validators.maxLength(30) ]) ],
    });

    this.changePasswordForm = fb.group({
      'oldPassword' : [null, Validators.compose([Validators.required, Validators.maxLength(30) ]) ],
      'newPassword' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
      'confirmPassword' : ['', Validators.required],
    }, {validator: matchingPasswords('newPassword', 'confirmPassword')});
    this.constants = AppConstant;
    this.appConfig = AppConfig;
  }

  ngOnInit(){
    if(this.utilsService.validateAdmin()){this.getAdminProfile();}
  }
  getAdminProfile(){
    this.myHttp.getAdminRequest(AppConfig.GET_ADMIN_PROFILE_URL).subscribe(
         data =>{
          if (data.status == 'success'){        
            this.user.firstName = data.result.firstName;
            this.user.lastName = data.result.lastName;
            this.user.avatar = data.result.avatarURL;          
            this.user.email = data.result.email;   
          }else{
           this.utilsService.errorToasterBackend(data.status);      
          }
       },error => {
          this.utilsService.handleError(error, 'admin');     
      });
  }
  uploadAvatar(event){    
    var fileList: FileList = event.target.files;
    if(fileList.length > 0){
      let file: File = fileList[0];
      this.user.avatar = file;
    }else return false;
    var formData = new FormData(); 
    formData.append('file', this.user.avatar);
    formData.append('type',  'ADMIN');
    let headers = new Headers();
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateAdmin().token);
    let options = new RequestOptions({ headers: headers });
    let url = AppConfig.API_BASE_URL+AppConfig.UPLOAD_DEV_AVATAR_URL;
    this.myHttp.uploadAvatar(url, formData, options)
    .subscribe(
        data => {
          if (data.status == this.constants.SUCCESS){
            this.user.avatar = data.result.avatarURL;
            var storedUserDetails = this.utilsService.validateAdmin();
            this.utilsService.setAdminDetail(storedUserDetails.name, storedUserDetails.token, this.user.avatar);
            this.utilsService.successToaster(this.constants.APP_UPLOADED_DETAILS_SUCCESS);
          }else{
            var storedUserDetails = this.utilsService.validateAdmin();
            this.user.username = storedUserDetails.name;
            this.user.avatar = storedUserDetails.avatar;          
            this.user.email = storedUserDetails.email;  
             this.utilsService.errorToasterBackend(data.result.message);
          }
        },error => {
           this.utilsService.handleError(error, 'admin');                  
    });
  }

  updateProfileDetails(){    
    this.myHttp.putRequestAdminService(AppConfig.UPDATE_ADMIN_PROFILE_URL,this.user).subscribe(
       data =>{
        if (data.status == 'success'){
          this.user.username = this.user.firstName +' '+ this.user.lastName;
          var storedUserDetails = this.utilsService.validateAdmin();
          this.utilsService.setAdminDetail(this.user.username, storedUserDetails.token, storedUserDetails.avatar);
          this.utilsService.successToaster(this.constants.PROFILE_UPDATE_SUCCESS);          
        }else{     
           this.utilsService.errorToasterBackend(data.result.message);
        }
     },error => {
      console.log("errrr");
        this.utilsService.handleError(error, 'admin');     
    });
  }

  deleteAvatar() {
    var isConfirmed = confirm("Are you sure you want to delete your profile image?");
    if(!isConfirmed)
      return false;
    var data = {"type":"ADMIN"};
    this.myHttp.deleteServiceAdmin(AppConfig.DELETE_DEV_AVATAR_URL,data).subscribe(
       data =>{
        if (data.status == 'success'){
          this.user.avatar="assets/images/user.png";
          var storedUserDetails = this.utilsService.validateAdmin();
          this.user.username = this.user.firstName +' '+ this.user.lastName;
          this.utilsService.setAdminDetail(this.user.username, storedUserDetails.token, this.user.avatar);
          this.utilsService.successToaster(data.result.message);
          this.router.navigate(['admin-profile/profile']);
        }else{     
           this.utilsService.errorToasterBackend(data.result.message);
        }
     },error => {
      console.log("errrr");
        this.utilsService.handleError(error, 'developer');     
    });
  }

  updatePassword(){  
    this.changePassUser.type = "ADMIN";
     this.myHttp.putRequestAdminService(AppConfig.UPDATE_PASSWORD,this.changePassUser).subscribe(
       data =>{
        if (data.status == 'success'){
          this.utilsService.successToaster(this.constants.PASSWORD_UPDATED_SUCCESS);
          this.changePasswordForm.reset();
        }else{
          this.utilsService.errorToasterBackend(data.result.message);
        }
     },error => {
      console.log("errrr");
        this.utilsService.handleError(error, 'admin');     
    }); 
  }
}