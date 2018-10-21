import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { HeaderComponent } from 'app/developer/header/header.component';
import {Router, NavigationExtras} from "@angular/router";
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';
import { PagerService } from 'app/shared/pager.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  appList:any ={};
  page:number;
  show:boolean = false;
  constants: any = {};
  total: any;
  searchString:string="";

  pager: any = {};
  pageSize:number=10;

  constructor(private myHttp:httpService, private utilsService: UtilsService, private router: Router, private pagerService: PagerService) {
    if(this.utilsService.validateUser()){
     this.appListing(1);
    }
  }

  ngOnInit() {
     this.constants = AppConstant;
  }

  appListing(event){
    if(this.searchString ==""){
        let path = AppConfig.DEV_DASHBOARD + "?page=" + event + "&size=" + this.pageSize;
        this.myHttp.getUserRequest(path).subscribe(
        data =>{   
          if(data.status == 'success' && data.result.length > 0){
            this.appList = data.result;
            this.total = data.totalRecords;
            this.show = true;
            if (event < 1 || event > this.pager.totalPages) {
              return;
            }
            this.pager = this.pagerService.getPager(this.total, event, this.pageSize);
          }else if(data.status == 'success' && data.result.length == 0){
            this.show = false;
            this.appList = [];
          }else{
            this.utilsService.errorToaster("Something went wrong!");
          }
        },error => {
          this.utilsService.handleError(error, 'developer');
      });
    }else{
      this.search(event);
    }

  }

  //SEARCH FUNCTION
  search(page){
    this.searchString = this.searchString.trim();
    if(this.searchString.length > 1){       
        let dataUrl = AppConfig.APP_SEARCH + "?name=" + this.searchString + "&page=1" + "&size=" + this.pageSize;
        this.myHttp.getUserRequest(dataUrl).subscribe(
           data =>{
              if(data.status == 'success' && data.result.length > 0){
              this.appList = data.result;
              this.total = data.totalRecords;
              this.show = true;
              if (page < 1 || page > this.pager.totalPages) {
                return;
              }
              this.pager = this.pagerService.getPager(this.total, page, this.pageSize);
            }else if(data.status == 'success' && data.result.length == 0){
              this.show = false;
              this.appList = [];
            }else{
              this.utilsService.errorToaster("Something went wrong!");
            }
         },error => {
            this.utilsService.handleError(error, 'developer');     
        });
        return event;
      }
  }

  clearStorge(){
    localStorage.removeItem('devcurrentAppId');
  }
  
}