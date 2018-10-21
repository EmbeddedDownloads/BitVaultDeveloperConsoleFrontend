import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConstant } from 'app/app.constant';
import { AppConfig } from 'app/app.config';
import { PagerService } from 'app/shared/pager.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  adminUsers:any=[];
  page:number;
  constants: any = {};
  searchString:string='';
  show:boolean = false;
  total: any;
  pager: any = {};
  pageSize:number=10;

  constructor(private myHttp: httpService, private utilsService: UtilsService, private pagerService: PagerService) { 
    this.constants = AppConstant;
    if(this.utilsService.validateAdmin()){this.adminUserListing(1);}
  }
  ngOnInit() {  }
    
    adminUserListing(page){

      if(this.searchString ==""){
            let path = AppConfig.ALL_DEVELOPER_LIST + "?page=" + page + "&size=" + this.pageSize + "&status="+ 'inactive,active'+"&orderBy="+'updatedAt';
            this.myHttp.getAdminRequest(path).subscribe(
            data =>{   
              if(data.status == 'success' && data.result.length > 0){
                this.adminUsers = data.result;
                this.total = data.totalRecords;
                this.show = true;
                if (page < 1 || page > this.pager.totalPages) {
                  return;
                }
                this.pager = this.pagerService.getPager(this.total, page, this.pageSize);
              }else if(data.status == 'success' && data.result.length == 0){
                this.show = false;
                this.adminUsers = [];
              }else{
                this.utilsService.errorToaster("Something went wrong!");
              }
            },error => {
              this.utilsService.handleError(error, 'admin');
          });
      }else{
          this.searchString = this.searchString.trim();     
          if(this.searchString.length > 1){        
            let dataUrl = AppConfig.ADMIN_USER_SEARCH+"?username="+this.searchString+"&page="+page+"&size="+this.pageSize;
            this.myHttp.getAdminRequest(dataUrl).subscribe(
               data =>{
                if(data.status == 'success' && data.result.length > 0){
                  this.adminUsers = data.result;
                  this.total = data.totalRecords;
              this.show = true;
              if (page < 1 || page > this.pager.totalPages) {
                return;
            }
            this.pager = this.pagerService.getPager(this.total, page, this.pageSize);
                }else if(data.status == 'success' && data.result.length == 0){
                  this.show = false;
                  this.adminUsers = [];
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