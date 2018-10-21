import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConstant } from 'app/app.constant';
import { AddUserDetails } from 'app/models/adduserdetails';
import { AppConfig } from 'app/app.config';
import { PagerService } from 'app/shared/pager.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-resource-requests',
  templateUrl: './resource-requests.component.html',
  styleUrls: ['./resource-requests.component.css']
})
export class ResourceRequestsComponent implements OnInit {
  accountRequestss:any=[];
  constants: any = {};
  page:number;
  total: any;
  pager: any = {};
  show:boolean = false;
  resstatus = 'PENDING';
  constructor(private myHttp: httpService, private router: Router, private utilsService: UtilsService, private pagerService: PagerService) { 
    this.constants = AppConstant;
    if(this.utilsService.validateAdmin()){
      this.accountRequest(1);    
    }
    
  }
  ngOnInit() { 
    this.resstatus = 'PENDING'; 
  }

  accountRequest(page){
    if (this.resstatus == "ALL") {
      this.resstatus = 'APPROVED,PENDING,REJECTED';
    }
    let URL = AppConfig.RESOURCE_REQUESTS + "?page=" + page + "&size=" + 10 + "&status="+ this.resstatus;
    this.myHttp.getAdminRequest(URL).subscribe(
      data =>{
      this.accountRequestss.result = [];   
      if(data.status == 'success' && data.result.length >0 ){
        this.accountRequestss = data.result;
        this.total = data.totalRecords;
        this.show = true;       
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.pagerService.getPager(this.total, page, 10);

      }else if(data.status == 'success' && data.result.length ==0){
        this.show = false;
        this.accountRequestss=[];
      }
      else{this.utilsService.errorToaster("Something went wrong!");}
      },error => {this.utilsService.handleError(error, 'admin'); });
  }

}
