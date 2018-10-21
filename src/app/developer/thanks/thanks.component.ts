import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {
  msg:boolean;
  id:number;
  isGoUrl:string;
  paymentStatus:any={};

  constructor(private myHttp:httpService, private utilsService: UtilsService, private route: ActivatedRoute, private router:Router) { }
   
  ngOnInit() {
  	this.id = this.route.snapshot.queryParams["txnId"];
    this.isGoUrl = this.route.snapshot.queryParams["gourlId"];
  	this.verifyStatus();
  }

  verifyStatus(){
    if(this.id != undefined)
      var url = AppConfig.GET_TXN_ID+this.id;
    else
      var url = AppConfig.GET_TXN_ID+"txnid?iam="+this.isGoUrl;

	  this.myHttp.getAdminRequestWithoutToken(url)
      .subscribe(data =>{
      	if(data.status=='success'){
          this.msg = true;
          this.paymentStatus = data.result;
      	}else{
      		this.router.navigate(['login']); 
      	}	          
      },error => {
      		this.utilsService.handleError(error, 'developer');         
      });
  };

}