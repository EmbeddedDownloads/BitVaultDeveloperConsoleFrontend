import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-pending-account',
  templateUrl: './pending-account.component.html',
  styleUrls: ['./pending-account.component.css']
})
export class PendingAccountComponent implements OnInit {
  msg:string;
  id:number;

  constructor(private myHttp:httpService, private utilsService: UtilsService, private route: ActivatedRoute) { }
   
  ngOnInit() { 
  	this.id = this.route.snapshot.queryParams["iam"];
    console.log(this.id);
  	if(this.id != undefined){
  		this.verifyMailId();
  	}
  }

  verifyMailId(){
		let ids = this.id;
		console.log(ids);
    	let filename = AppConfig.VERIFY_MAIL_ID+ids;
	    this.myHttp.getAdminRequestWithoutToken(filename)
	      .subscribe(data =>{
	      	if(data.status=='success'){
	      		console.log(data.result);
	          this.msg = data.result.message;
	      	}else{
	      		this.msg = data.result.message;
	      	}	          
	     },error => {
        		this.utilsService.handleError(error, 'admin');         
        });
  	};
}