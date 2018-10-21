import { Component, OnInit } from '@angular/core';
import { HttpModule , Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { User } from 'app/models/user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';
import { matchingPasswords } from 'app/validators/validators';

@Component({
  selector: 'app-developer-reset-password',
  templateUrl: './developer-reset-password.component.html',
  styleUrls: ['./developer-reset-password.component.css']
})

export class DeveloperResetPasswordComponent implements OnInit {
	complexForm : FormGroup;
	constants: any = {};

    constructor(private myHttp: httpService, private router:Router, fb: FormBuilder, private utilsService: UtilsService, private route: ActivatedRoute) {

  	this.complexForm = fb.group({
      'newPassword' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
      'confirmPassword' : ['', Validators.required],
    }, {validator: matchingPasswords('newPassword', 'confirmPassword')});
    this.constants = AppConstant;
}

ngOnInit() {}

user = new User;
id = this.route.snapshot.params['id'];

developerResetPassword()
{
	this.myHttp.putRequestService(AppConfig.ADMIN_RESET_PASSWORD+this.id, this.user).subscribe(
	   data =>{
	    if (data.status == 'success'){
	      this.utilsService.successToaster(AppConstant.RESET_PASSWORD);
	      this.router.navigate(['login']);
	    }
	    else{
	      this.utilsService.errorToasterBackend(data.result.message);  
	    }
	   },error => {
	    this.utilsService.internalServerError();
	});
}

}