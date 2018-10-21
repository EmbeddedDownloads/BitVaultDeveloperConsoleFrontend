import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';
import { PagerService } from 'app/shared/pager.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {		
	orgUserListing:any=[];
	constants: any = {};
	page:number;
  	show:boolean = false;
	id:number;
	searchString:string="";
	pager: any = {};
	total: any;
    pageSize:number=10;
	
	constructor( private myHttp: httpService, private router: Router, private utilsService: UtilsService, private pagerService: PagerService ) { 
		this.constants = AppConstant;
	}

	ngOnInit() {
		if(this.utilsService.validateUser()){
    		if(this.utilsService.getUserName().loginType == 'ROLE_ORGANIZATION')
	    		this.getUsersList(1);
	    	else this.router.navigate(['dashboard']);
		}
	}

	getUsersList(event){
		if(this.searchString ==""){
        let path = AppConfig.GET_SUB_DEV_LIST + "?page=" + event + "&size=" + this.pageSize;
        this.myHttp.getUserRequest(path).subscribe(
        data =>{   
          if(data.status == 'success' && data.result.length > 0){
            this.orgUserListing = data.result;
            this.total = data.totalRecords;
            this.show = true;
            if (event < 1 || event > this.pager.totalPages) {
              return;
            }
            this.pager = this.pagerService.getPager(this.total, event, this.pageSize);
          }else if(data.status == 'success' && data.result.length == 0){
            this.show = false;
            this.orgUserListing = [];
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


	search(event){
      this.searchString = this.searchString.trim();

      if(this.searchString.length > 1){        
        let dataUrl = AppConfig.DEV_USER_SEARCH + "?username=" + this.searchString + "&page=1" + "&size=" + 10;
        this.myHttp.getUserRequest(dataUrl).subscribe(
           data =>{
            if(data.status == 'success' && data.result.length > 0){
              this.orgUserListing = data.result;
              this.total = data.totalRecords;
              this.show = true;
              if (event < 1 || event > this.pager.totalPages) {
                return;
              }
              this.pager = this.pagerService.getPager(this.total, event, this.pageSize);
              }else if(data.status == 'success' && data.result.length == 0){
              this.show = false;
              this.orgUserListing = [];
              }else{
              this.utilsService.errorToaster("Something went wrong!");
              }
          },error => {
            this.utilsService.handleError(error, 'developer');     
        });
        return event;
      }
    }  

}