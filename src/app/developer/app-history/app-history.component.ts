import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';
import { PagerService } from 'app/shared/pager.service';

@Component({
  selector: 'app-app-history',
  templateUrl: './app-history.component.html',
  styleUrls: ['./app-history.component.css']
})

export class AppHistoryComponent implements OnInit {

  dataList:any = [];
  constants: any = {};
  id: any;
  page:number;
  show:boolean = false;
  total: any;
  pager: any = {};
  pageSize:number=10;
  idparam:any;
  appTitle:any;
  
  constructor(private route: ActivatedRoute, private router:Router, private myHttp: httpService, private utilsService: UtilsService, private pagerService: PagerService) { }

  ngOnInit() {
	if(this.utilsService.validateUser()){
	  this.constants = AppConstant;

	  this.idparam = this.route.snapshot.params['id'];

	  if (this.idparam != undefined) {
        this.getAudiTrail(1);
      }
    }
  }


  getAudiTrail(event){
   let path = AppConfig.APP_AUDIT_TRAIL + "?applicationId="+this.idparam+"&page=" + event + "&size=" + this.pageSize;
    this.myHttp.getUserRequest(path).subscribe(
    responseData =>{   
    	console.log(responseData.result);
      if(responseData.status == 'success' && responseData.result.length > 0){
         this.dataList = responseData.result; 
         this.total = responseData.totalRecords;
         this.show = true;
         if(responseData.result[0].title)
           this.appTitle = responseData.result[0].title;

         if (event < 1 || event > this.pager.totalPages) {
           return;
         }
         this.pager = this.pagerService.getPager(this.total, event, this.pageSize);
      }else if(responseData.status == 'success' && responseData.result.length == 0){
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
