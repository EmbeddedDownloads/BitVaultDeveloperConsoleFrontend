import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';
import { PagerService } from 'app/shared/pager.service';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.css']
})

export class AuditTrailComponent implements OnInit {
  dataList:any = {};
  constants: any = {};
  page:number;
  show:boolean = false;
  id:number;
  total: any;
  searchString:string="";
  pager: any = {};
  pageSize:number=10;
  
  constructor(private myHttp: httpService, private utilsService: UtilsService, private pagerService: PagerService) { }

  ngOnInit() {
    this.constants = AppConstant;
  	if(this.utilsService.validateUser()){
      this.getAudiTrail(1);
    }
  }

  getAudiTrail(event){
   let path = AppConfig.GET_AUDIT_TRAIL_LIST + "?page=" + event + "&size=" + this.pageSize;
      this.myHttp.getUserRequest(path).subscribe(
      responseData =>{   
        if(responseData.status == 'success' && responseData.result.data.length > 0){
           this.dataList = responseData.result; 
           this.total = responseData.totalRecords;
           this.show = true;
           if (event < 1 || event > this.pager.totalPages) {
             return;
           }
           this.pager = this.pagerService.getPager(this.total, event, this.pageSize);
        }else if(responseData.status == 'success' && responseData.result.data.length == 0){
          this.show = false;
          this.dataList = [];
        }else{
          this.utilsService.errorToasterBackend(responseData.status);
        }
      },error => {
        this.utilsService.handleError(error, 'developer');
    });
  }

}