import { Component, OnInit } from '@angular/core';
import { HttpModule , Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';

@Component({
  selector: 'app-notification-server',
  templateUrl: './notification-server.component.html',
  styleUrls: ['./notification-server.component.css']
})
export class NotificationServerComponent implements OnInit {
  RegistrationForm : FormGroup;
  servicesModel:any ={};
  constants:any ={};
  page:number;
  show:boolean = false;
  constructor(private myHttp: httpService, private utilsService: UtilsService, fb:FormBuilder) {
    if(this.utilsService.validateUser()){
      this.getAllDeveloperAddonServices(1);
    }
  }

  ngOnInit() {
    this.constants = AppConstant;
  }

  getAllDeveloperAddonServices(event) {
  	let dataUrl = AppConfig.GET_ADDON_SERVICES_LIST + "?page=" + event + "&size=" + 10;
    this.myHttp.getUserRequest(dataUrl).subscribe(
       data =>{
        if (data.status == 'success' && data.result.length > 0)
        {
          this.servicesModel = data; 
          this.show = true;
        }else  if (data.status == 'success' && data.result.length == 0)
          this.show = false;
        else{
          this.utilsService.errorToasterBackend(data.status);      
        }
    }, error => {
        this.utilsService.handleError(error, 'developer');     
    });
    return event;
  }

}