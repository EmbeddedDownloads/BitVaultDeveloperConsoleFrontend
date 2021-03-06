import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AddUserDetails } from 'app/models/adduserdetails';
import { AppConfig } from 'app/app.config';
import { AppConstant, rejectionReasonTemplate } from 'app/app.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-action',
  templateUrl: './request-action.component.html',
  styleUrls: ['./request-action.component.css']
})
export class RequestActionComponent implements OnInit {
complexForm : FormGroup;
  rejectionTemplte: any={};
  accountRequestAction:any;
  
  constructor(private myHttp:httpService, private router: Router, private route: ActivatedRoute, private utilsService: UtilsService, fb: FormBuilder) {
  	this.rejectionTemplte = rejectionReasonTemplate;
  	this.complexForm = fb.group({
		  'temp_status' : [null, Validators.required]
		}); 
	}
	ngOnInit() {
		if(this.utilsService.validateAdmin()){
		  	if(this.id){this.getSingleUser();}
		}
	}
	model = new AddUserDetails;
	id = this.route.snapshot.params['id'];
	count:number = 0;

	changedValue(value){if(value){	this.count = 0;	}}
	accAprovalRejection(id, action, reason) {
		let body:any={};
		if(this.model.currentStatus != action){
			if(action == "REJECTED" && this.model.temp_status != undefined && this.model.reason == ""){
				if(reason == '' || reason == undefined){
					reason = this.model.temp_status;
				}
			}
			if(action == "REJECTED" && this.model.temp_status == undefined && this.model.reason == null){
				this.utilsService.errorToaster("Please select rejection reason!");
				return false;
			}
			if(action == "REJECTED" && this.model.temp_status == 'others' && this.model.reason == null){
				this.utilsService.errorToaster("Please mention rejection reason!");
				return false;
			}
			if(action == "REJECTED" && reason != undefined){
				body = {
					"requestAction":action,
					"rejectionReason":reason,
					"noOfChild": 0,
					"payment": 0
				};
			}else{
			if(this.model.noOfChild == undefined){
				this.model.noOfChild = 0;
			}
			if(this.model.payment == undefined){
				//this.model.payment = 0;
				this.utilsService.warnToaster("Please enter the account fee!");
				return false;
			}
				body = {
					"requestAction":action,
					"rejectionReason":'',
					"noOfChild": this.model.noOfChild,
					"payment": this.model.payment
				};
			}
  			let dataUrl = AppConfig.REJECT_AC_ACT + id;
		    this.myHttp.adminPostRequestService(dataUrl, body).subscribe(
		      data =>{   
		      if (data.status == 'success'){
		        this.accountRequestAction = data;
		        if(action == 'APPROVED'){
					this.utilsService.successToaster(this.model.username+" Approved Successfully!");
					this.goApproveList();         
		        }else{
					this.utilsService.successToaster(this.model.username+" Rejected Successfully!");
					this.goRejectList();
				}
		      }else {
		        this.utilsService.errorToaster('Bad Request!');
		        } 
		    },error => {
        			this.utilsService.internalServerError();         
        });
		}else{
			this.count++;
			if(this.count == 1) {
				if(this.model.temp_status == undefined && this.model.currentStatus != action){
					this.utilsService.errorToaster("Please select rejection reason!");
				}else{
					this.utilsService.errorToaster("Please change existing status!");
				}
			}
		}
	}
	getSingleUser(){
		let ids = this.id;
    	let filename = AppConfig.ACC_REQUEST_DETAILS+ids;
	    this.myHttp.getAdminRequest(filename)
	      .subscribe(data =>{
	          this.model = data.result;
	          this.model.currentStatus = data.result.status;
		if(data.result.status == "REJECTED"){
          	for(let i = 0; i<=this.rejectionTemplte.length; i++){
	          	if(data.result.reason == this.rejectionTemplte[i].key){
	          		this.model.temp_status = data.result.reason;
	          		break;
	          	}else{
	          		this.model.temp_status = "others";
	          	}
          	}
        }
	       },error => {
        		this.utilsService.handleError(error, 'admin');         
        });
  	};
	goRejectList(){this.router.navigate(['/account-requests']);}
	goApproveList(){this.router.navigate(['/admin-users-list']);}
	backClicked() {this.utilsService.backClicked();}
}
