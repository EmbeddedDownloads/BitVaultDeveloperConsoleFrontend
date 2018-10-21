import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AddUserDetails } from 'app/models/adduserdetails';
import { AppConfig } from 'app/app.config';
import { AppConstant, rejectionReasonTemplate } from 'app/app.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resource-requests-action',
  templateUrl: './resource-requests-action.component.html',
  styleUrls: ['./resource-requests-action.component.css']
})
export class ResourceRequestsActionComponent implements OnInit {
complexForm : FormGroup;
  rejectionTemplte: any={};
  accountRequestAction:any;
  id = this.route.snapshot.params['id'];
  count:number = 0;
  model = new AddUserDetails;
    
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
	
	

	changedValue(value){if(value){	this.count = 0;	}}
	accAprovalRejection(uid, id, action, reason) {
		let body:any={};
		if(this.model.currentStatus != action){
			if(action == "REJECTED" && this.model.temp_status != undefined && this.model.reason == undefined){
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
			if(action == "REJECTED" && reason != undefined && this.model.payment == undefined){
				body = {
					"requestAction":action,
					"rejectionReason":reason,
					"payment": 0
				};
			}else{
			if(this.model.payment == undefined && action == "APPROVED"){
				this.utilsService.warnToaster("Please enter the account fee!");
				return false;
			}
				body = {
					"requestAction":action,
					"rejectionReason":'',
					"payment": this.model.payment
				};
			}
  			let dataUrl = AppConfig.RESOURCE_REQUESTS_ACTION+'/'+uid+'/'+id;
		    this.myHttp.putRequestAdminService(dataUrl, body).subscribe(
		      data =>{   
		      if (data.status == 'success'){
		        this.accountRequestAction = data;
		        if(action == 'APPROVED'){
					this.utilsService.successToaster(" Approved Successfully!");
					this.goToList();         
		        }else{
					this.utilsService.successToaster(" Rejected Successfully!");
					this.goToList();
				}
		      }else {
		        this.utilsService.errorToaster(data.result.message);
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
    	let filename = AppConfig.RESOURCE_REQUESTS+'/'+this.id;
	    this.myHttp.getAdminRequest(filename)
	      .subscribe(data =>{
	          this.model = data.result;
	          this.model.currentStatus = data.result.status;
		if(data.result.status == "REJECTED"){
          	for(let i = 0; i<=this.rejectionTemplte.length; i++){
	          	if(data.result.rejectionReason == this.rejectionTemplte[i].key){
	          		this.model.temp_status = data.result.rejectionReason;
	          		break;
	          	}else{
	          		this.model.temp_status = "others";
	          		this.model.reason = data.result.rejectionReason;
	          	}
          	}
        }
	       },error => {
        		this.utilsService.handleError(error, 'admin');         
        });
  	};
	goToList(){this.router.navigate(['/resource-requests']);}
	backClicked() {this.utilsService.backClicked();}
}
