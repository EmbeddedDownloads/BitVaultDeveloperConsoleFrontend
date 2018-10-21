import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConstant } from 'app/app.constant';
import { AppConfig } from 'app/app.config';
import { PagerService } from 'app/shared/pager.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-admin-app-requests',
  templateUrl: './admin-app-requests.component.html',
  styleUrls: ['./admin-app-requests.component.css']
})
export class AdminAppRequestsComponent implements OnInit {
  constants: any = {};
  appRequests:any=[];
  page:number;
  searchString:string='';
  show:boolean = false;
  total: any;
  pager: any = {};

  constructor(private myHttp: httpService, private utilsService: UtilsService, private pagerService: PagerService) { 
    this.constants = AppConstant;
    if(this.utilsService.validateAdmin()){
      this.applicationRequest(1);  
    }
  }
  ngOnInit() {  }  

  applicationRequest(page){
    let path = AppConfig.REQUEST_APPLICATION_LIST+ "?page=" + page + "&size=" + 10 + "&status="+ 'PENDING,REJECTED';
    this.myHttp.getAdminRequest(path).subscribe(
      data =>{   
      if(data.status == 'success' && data.result.length > 0){
        this.appRequests = data.result;
        this.total = data.totalRecords;
        this.show = true;
        if (page < 1 || page > this.pager.totalPages) {
          return;
        }
        this.pager = this.pagerService.getPager(this.total, page, 10);
      }else if(data.status == 'success' && data.result.length == 0){
        this.show = false;
      }else{
        this.utilsService.errorToaster("Something went wrong!");
      }
      },error => {
          this.utilsService.handleError(error, 'admin'); 
      });
  }

}
