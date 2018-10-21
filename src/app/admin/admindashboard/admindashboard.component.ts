import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import {Router} from '@angular/router'
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';
import { User } from 'app/models/user';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

	accountData = [];
  applicationData = [];
  accountRequestAction:any;
  constants: any = {};

  constructor(private myHttp:httpService, private utilsService: UtilsService, private router: Router) { this.constants = AppConstant; }
  userCount:any;
  ngOnInit() {    
    if(this.utilsService.validateAdmin()){
      this.accountRequest();
      this.applicationRequest();
      this.getCountDashboard();
    }
  }

  showAccountMessage:boolean = false;
  accountRequest(): void {
    let dataUrl = AppConfig.ACC_ACT_REQ_DASHBOARD; 
    this.myHttp.getAdminRequest(dataUrl).subscribe(
      data =>{   
      if (data.status == 'success' && data.result != ''){
        this.accountData = data.result;
      }else if(data.status == 'success' && data.result == ''){
        this.showAccountMessage = true;
      }
      else {
        this.utilsService.errorToasterBackend(data.result.message);
      }
    },error => {
        this.utilsService.stopLoader();         
    });
  }

  showAppMessage:boolean = false;
  applicationRequest() {
  let dataUrl = AppConfig.PENDING_APPLICATION_LIST; 
    this.myHttp.getAdminRequest(dataUrl).subscribe(
      data =>{   
      if (data.status == 'success' && data.result != ''){
        this.applicationData = data.result;
      } else if(data.status == 'success' && data.result == ''){
        this.showAppMessage = true;
      }else {
        this.utilsService.errorToasterBackend(data.result.message);
      }
    },error => {
        this.utilsService.stopLoader();         
        
    });
  }
  getCount = new User;
    getCountDashboard() {
    let dataUrl = AppConfig.GET_COUNT_DASHBOARD;
      this.myHttp.getAdminRequest(dataUrl).subscribe(
        data => {
          if(data.status == 'success'){
            this.getCount = data.result;
          }else{
            this.utilsService.errorToaster(data.result.message);
          }
        },error => {
          this.utilsService.handleError(error, 'admin');
        });
    }
  }
