import { Component, OnInit } from '@angular/core';
import { HttpModule , Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { User } from 'app/models/user';
import {Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [httpService],
})
export class ForgotpasswordComponent implements OnInit {
  
  complexForm : FormGroup;
  user = new User;
  constructor(private myHttp: httpService, private utilsService: UtilsService, private router:Router, fb: FormBuilder) 
  {
    this.complexForm = fb.group({
      'email' : [null, Validators.required]
    })
  }
  
  ngOnInit() { }

  forgotPassword() {
    let body={"emailId": this.user.email, "type":""};

    this.myHttp.postRequestService(AppConfig.FORGET_PASSWORD,body).subscribe(
       data =>{   
        if (data.status == 'success')
          this.utilsService.successToaster(data.result.message);
        else
          this.utilsService.errorToasterBackend(data.result.message);
     },error => {
           this.utilsService.handleError(error, 'developer');                   
     });
  }

}