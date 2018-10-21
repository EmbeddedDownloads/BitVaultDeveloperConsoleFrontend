import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscribeNotification } from 'app/models/subscribenotification';
import {Router} from '@angular/router'
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  notificationModel = new SubscribeNotification;
  complexForm : FormGroup;
  constants: any = {};
  notficationServerData: any = {};
  
  constructor(private myHttp: httpService,  private router:Router, private utilsService: UtilsService, fb:FormBuilder) {
    this.complexForm = fb.group({
      'packageName' : [null, Validators.required],
      'webServerKey': [null, Validators.required],    
      'applicationKey': [null, Validators.required],
      'description': [null, Validators.required],
      'serviceId': [null, Validators.required],
    });
     this.constants = AppConstant;
  }

  ngOnInit() {
    this.utilsService.validateUser();
    
    //GENERATE RANDOM STRING FOR webserverKey and applicationKey
    this.notificationModel.serviceId = 1;
    this.notificationModel.webServerKey =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.notificationModel.applicationKey =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);    
  }
  

  /** Registration Function **/
  AppRegistrationForAppStore() {    
    this.myHttp.devPostRequestService(AppConfig.REGISTER_NOTIFICATION_SERVICE,this.notificationModel).subscribe(
       data =>{
        if (data.status == 'success')
        {
          this.registerFornotificationServer();
        }else
        {          
          if(data.result.message != undefined) {
              var value = '';
              if( typeof data.result.message === 'string' ) {
                value = data.result.message;
              }else{
                for (var key in data.result.message)
                {
                  if(value != '')
                    value = value+' And '+ key+" : "+ data.result.message[key];
                  else
                    value = key+" : "+data.result.message[key];
                }
              }
              this.utilsService.errorToasterBackend(value);    
            }  
        }
     },error => {
        this.utilsService.handleError(error, 'developer');     
    });
  }

  /** NOTIFICATION SERVER REGISTRATRION**/
  registerFornotificationServer()
  {
    this.notficationServerData.package_name = this.notificationModel.packageName;
    this.notficationServerData.web_server_key = this.notificationModel.webServerKey;
    this.notficationServerData.application_key = this.notificationModel.applicationKey;
    this.notficationServerData.description = this.notificationModel.description;
    console.log(this.notficationServerData);
    this.myHttp.postRequestForNotificationServer(AppConfig.NOTIFICATIO_SERVER_NOTIFICATION_URL,this.notficationServerData).subscribe(
       data =>{
          if (data.status == true)
          {
            this.utilsService.successToaster(data.message);
            this.router.navigate(['addon-services']);

          }else if(data.message != undefined)
          {
            this.utilsService.errorToasterBackend(data.message);
          }else
          {
            if(typeof data.error === 'string' )
            {
              this.utilsService.errorToasterBackend(data.error);
            }else
            {
              var value = '';
              for (var key in data.error)
              {
                if(value != '')
                  value = value+' And '+ key+" : "+ data.error[key];
                else
                  value = key+" : "+data.error[key];
              }
              this.utilsService.errorToasterBackend(value);
            }
          }
       },error => {
          this.utilsService.handleError(error, 'developer');     
    });
  }

}