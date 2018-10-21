import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConstant } from 'app/app.constant';
import { AppConfig } from 'app/app.config';
import { PagerService } from 'app/shared/pager.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-adminapps',
  templateUrl: './adminapps.component.html',
  styleUrls: ['./adminapps.component.css']
})
export class AdminappsComponent implements OnInit {
  constants: any = {};
  searchString:string='';
  appRequests:any=[];
  page:number;
  show:boolean = false;
  total: any;
  pager: any = {};
  pageSize:number=5;

  constructor(private myHttp: httpService, private utilsService: UtilsService, private pagerService: PagerService) { 
    this.constants = AppConstant;
    if(this.utilsService.validateAdmin()){
    this.applicationRequest(1);
    }
  }
  ngOnInit() { }

  applicationRequest(page){

    if(this.searchString ==""){
        let path = AppConfig.APP_LIST_BY_STATUS+ "?page=" + page + "&size=" + this.pageSize + "&status="+ 'PUBLISHED,UNPUBLISHED'+"&orderBy="+ 'updatedAt';
          this.myHttp.getAdminRequest(path).subscribe(
        data =>{   
        if(data.status == 'success' && data.result.length > 0){
          this.appRequests = data.result;
          this.total = data.totalRecords;
                this.show = true;
                if (page < 1 || page > this.pager.totalPages) {
                  return;
              }
              this.pager = this.pagerService.getPager(this.total, page, this.pageSize);
        }else if(data.status == 'success' && data.result.length == 0){
          this.show = false;
          this.appRequests = [];
        }else{
          this.utilsService.errorToaster(data.result.message);
        }
        },error => {
          this.utilsService.handleError(error, 'admin');
      });
    }else{
      this.searchString = this.searchString.trim();
     
      if(this.searchString.length > 1){        
        let dataUrl = AppConfig.ADMIN_APP_SEARCH+"?name="+this.searchString+"&page="+page+"&size="+this.pageSize;
        this.myHttp.getAdminRequest(dataUrl).subscribe(
           data =>{
            if(data.status == 'success' && data.result.length > 0){
              this.appRequests = data.result;
              this.total = data.totalRecords;
                this.show = true;
                if (page < 1 || page > this.pager.totalPages) {
                  return;
              }
              this.pager = this.pagerService.getPager(this.total, page, this.pageSize);
            }else if(data.status == 'success' && data.result.length == 0){
              this.show = false;
              this.appRequests = [];
            }else{
              this.utilsService.errorToasterBackend(data.status);
            }
         },error => {
            this.utilsService.handleError(error, 'admin');     
        });
      }
    }

    

  }



    
  
}