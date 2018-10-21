import { Component, OnInit } from '@angular/core';
import { HttpModule , Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { User } from 'app/models/user';
import {Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-adminforgetpass',
  templateUrl: './adminforgetpass.component.html',
  styleUrls: ['./adminforgetpass.component.css']
})
export class AdminforgetpassComponent implements OnInit {
  complexForm : FormGroup;
  user = new User;
  constructor(private myHttp: httpService, private utilsService: UtilsService, private router:Router, fb: FormBuilder) {
    this.complexForm = fb.group({
        'email' : [null, Validators.required]
    })
  }
    ngOnInit() { }


  forgotPassword(){
    let dataUrl=AppConfig.FORGET_PASSWORD;
    let body={"emailId": this.user.email, "type":"ADMIN"};   

    this.myHttp.postRequestService(dataUrl,body).subscribe(
       data =>{   
        if (data.status == 'success'){
          this.utilsService.successToaster(data.result.message);
          this.router.navigate(['adminlogin']);
        }
        else{
          this.utilsService.errorToasterBackend(data.result.message);
        }
     },error => {
        this.utilsService.errorToaster("Internal Server Error occured Please try Again!");                    
       });
  }
}