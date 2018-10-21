import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css']
})
export class UserTransactionsComponent implements OnInit {

  dataList:any = {};
  constants: any = {};
  page:number;
  show:boolean = false;
  id:number;
  
  formAction:string;
  payment:number = 1;
  amount:number;
  token:string;
  userId:string;

  constructor( private httpservice: httpService, private router: Router, private utilsService: UtilsService ) { 
	this.constants = AppConstant;
  }

  ngOnInit() {
  	if(this.utilsService.validateUser()){
  		this.getDataList(1);      
  	}
  }

  getDataList(event){
	  let url = AppConfig.GET_USER_TRANSACTIONS + "?page=" + event + "&size=" + 10;
  	this.httpservice.getUserRequest(url).
  	subscribe(data => {   
		if (data.status == 'success' && data.result.length > 0)
        {
          this.dataList = data; 
          this.show = true;
        }else  if (data.status == 'success' && data.result.length == 0)
          this.show = false;
        else{
          this.utilsService.errorToasterBackend(data.status);      
        }
	}, error => {
        this.utilsService.handleError(error, 'developer');     
    });
	return event;
  }

  paymentDetails(userId, amount)
  {
    this.formAction = AppConfig.SERVER_URL+'gourl/index.php';
    this.token = this.utilsService.validateUser().token;
    this.userId = userId;
    this.amount = amount;
  }

  submitPayment(){
    if(this.payment==1){
     this.httpservice.postRequestService(AppConfig.PAYPAL_PAYMENT_SUB_DEV,{"userId":this.userId, "paybleAmount":this.amount}).subscribe(
       data =>{
        if (data.status == 'success') {
          window.location.href=data.result.paymentURL;  
        }else{
         document.getElementById("paymentOptions").click();
         this.utilsService.errorToasterBackend(data.result.message);      
        }
     },error => {
        this.utilsService.stopLoader(); 
        this.utilsService.errorToasterBackend(this.constants.INTERNAL_SERVER_ERROR);        
      });
    }
  }

}