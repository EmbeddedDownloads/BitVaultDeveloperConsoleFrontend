import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { User } from 'app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchingPasswords } from 'app/validators/validators';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';

@Component({
  selector: 'app-users',
  templateUrl: './useraction.component.html',
  styleUrls: ['./useraction.component.css']
})
export class UserActionComponent implements OnInit {
	complexForm : FormGroup;
	complexForm1 : FormGroup;
	accountRequestAction:any;
	user = new User;
	constants: any = {};
	id:number;

	constructor(private myHttp:httpService, private router: Router, private route: ActivatedRoute, private utilsService: UtilsService, fb: FormBuilder) {
		this.complexForm = fb.group({
		  'username' : [null, Validators.compose([Validators.required, Validators.maxLength(30) ]) ],
		  'email': [null, Validators.required],
      	  'password' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
		  'confirmPassword' : [null, Validators.required],
		  'status' : [null]
		}, {validator: matchingPasswords('password', 'confirmPassword')});

		this.complexForm1 = fb.group({
		  'username' : [null, Validators.compose([Validators.required, Validators.maxLength(30) ]) ],
		  'email': [null, Validators.required],
      	  'newPassword' : [null],
		  'newConfirmPassword' : [null],
		  'status' : [null]
		}, {validator: matchingPasswords('newPassword', 'newConfirmPassword')});

		this.constants = AppConstant;
	}

	ngOnInit() {
		if(this.utilsService.getUserName().loginType == 'ROLE_ORGANIZATION'){
			this.id = this.route.snapshot.params['id'];
			if(this.id != undefined){
				this.getUserDetail();
			}else{
				this.user.signupAs="Individual";
				this.user.signupReason="Org Devloper";
			}
		}else{
		 	this.router.navigate(['dashboard']);
		}
	}

	getUserDetail(){
    	this.myHttp.getUserRequest(AppConfig.GET_SUB_DEVELOPER+"/"+this.id)
	      .subscribe(data =>{
	          if(data.status == "success"){
	          	this.user = data.result;
	          	console.log(this.user);
	          }else
	          	this.utilsService.errorToaster(data.result.message);
	    },error => {
          this.utilsService.handleError(error, 'developer');
      	});
  	};

	addUser(){
	 this.myHttp.devPostRequestService(AppConfig.DEV_ADD_USER,this.user).subscribe(
       data =>{
        if (data.status == 'success'){
            this.utilsService.successToaster(this.constants.DEV_USER_ADDED_SUCCESS);
      		this.router.navigate(['users']);
        }else this.utilsService.errorToaster(data.result.message);
	  },error => {
	  	 this.utilsService.handleError(error, 'developer'); 	  		
      }); 
	}

	updateUser(){
		console.log(this.user);
		if(this.user.newPassword != undefined)
			this.user.password = this.user.newPassword;
		
		this.myHttp.putRequestDeveloperService(AppConfig.PUT_SUB_DEVELOPER+"/"+this.id,this.user).subscribe(
        data =>{
        if (data.status == 'success'){
           this.utilsService.successToaster(this.constants.DEV_USER_ADDED_SUCCESS);
      		this.router.navigate(['users']);
        }else
          this.utilsService.errorToaster(data.result.message);
	   },error => {
	  	 this.utilsService.handleError(error, 'developer'); 	  		
       }); 
	}
}