import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConstant } from 'app/app.constant';
import { AppConfig } from 'app/app.config';
import { PagerService } from 'app/shared/pager.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-admin-account-requests',
  templateUrl: './admin-account-requests.component.html',
  styleUrls: ['./admin-account-requests.component.css']
})
export class AdminAccountRequestsComponent implements OnInit {
  accountRequestss:any=[];
  page:number;
  constants: any = {};
  searchString:string='';
  show:boolean = false;
  total: any;
  pager: any = {};

  constructor(private myHttp: httpService, private utilsService: UtilsService, private pagerService: PagerService) { 
    this.constants = AppConstant;
    if(this.utilsService.validateAdmin()){
      this.accountRequest(1);    
    }
  }
  ngOnInit() {  }

  accountRequest(page){
    let path = AppConfig.ACC_ACT_REQ + "?page=" + page + "&size=" + 10 + "&status="+ 'pending,rejected';
    this.myHttp.getAdminRequest(path).subscribe(
      data =>{   
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
      }
      else{this.utilsService.errorToaster("Something went wrong!");}
      },error => {this.utilsService.handleError(error, 'admin'); });
  }
}