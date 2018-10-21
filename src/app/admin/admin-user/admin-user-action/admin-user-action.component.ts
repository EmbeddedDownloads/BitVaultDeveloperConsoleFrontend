import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AddUserDetails } from 'app/models/adduserdetails';
import { AppConfig } from 'app/app.config';
import { rejectionReasonTemplate } from 'app/app.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-user-action',
  templateUrl: './admin-user-action.component.html',
  styleUrls: ['./admin-user-action.component.css']
})
export class AdminUserActionComponent implements OnInit {
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
  	if(this.utilsService.validateAdmin()){if(this.id){this.getSingleUser(this.id);}}
}

	model = new AddUserDetails;
	id = this.route.snapshot.params['id'];
	count:number = 0;
	changedValue(value){if(value){this.count = 0;}}

	accAprovalRejection(id, action, reason) {
		let body:any={};
		if(this.model.currentStatus != action){
			if(action == "INACTIVE" && this.model.temp_status != "undefined" && this.model.rejectionReason == ""){
				if(reason == '' || reason == undefined){
					reason = this.model.temp_status;
				}
			}
			if(action == "INACTIVE" && this.model.temp_status == "undefined" && this.model.rejectionReason == ""){
				this.utilsService.errorToaster("Please select rejection reason!");
				return false;
			}
			if(action == "INACTIVE" && this.model.temp_status == 'others' && this.model.rejectionReason == ""){
				this.utilsService.errorToaster("Please mention rejection reason!");
				return false;
			}
			if(action == "INACTIVE" && reason != undefined){
				body = {"requestAction":action, "reason":reason};
			}else{
				body = {"requestAction":action, "reason":''};
			}
			if(action == "NOT"){
				body = {"requestAction":'ACTIVE', "reason":reason};
			}
  			let dataUrl = AppConfig.UPDATE_SINGLE_USER_DETAILS + id;
		    this.myHttp.adminPostRequestService(dataUrl, body).subscribe(
		      data =>{   
		      if (data.status == 'success'){
		        this.accountRequestAction = data;
		        if(action == 'ACTIVE' || action == 'NOT'){
					this.utilsService.successToaster(this.model.username+" Activated Successfully!");        
		        }else{
					this.utilsService.successToaster(this.model.username+" Deactivated Successfully!");        
		        }
				this.goBack();
		      }else{
		        this.utilsService.errorToaster('Bad Request!');
		        }
		    },error => {
          		this.utilsService.internalServerError(); 
     		 });		
		}else{
			this.count++;
			if(this.count == 1) {
				if(this.model.temp_status == "undefined" && this.model.currentStatus != action){
					this.utilsService.errorToaster("Please select rejection reason!");
				}else{
					this.utilsService.errorToaster("Please change existing status!");
				}
			}
		}
	}

	orgDetail(pid){this.getSingleUser(pid);}
	options:boolean=false;
	getSingleUser(ids){
		//let ids = this.id;
    	let filename = AppConfig.GET_SINGLE_USER_DETAILS+ids;
	    this.myHttp.getAdminRequest(filename)
	      .subscribe(data =>{
	          this.model = data.result;
	          this.model.childCount = data.result.childCount;
	          this.model.currentStatus = data.result.status;
	          this.model.txnStatus = data.result.txnStatus.toUpperCase();
	          console.log(this.model.txnStatus);
	          if(data.result.txnStatus == 'PENDING' && data.result.status == 'ACTIVE'){
	          	this.model.status = 'NOT';
	          }	          
	     if(data.result.status == "INACTIVE"){			
          	for(let i = 0; i<=this.rejectionTemplte.length; i++){
	          	if(data.result.rejectionReason == this.rejectionTemplte[i].key){
	          		this.model.temp_status = data.result.rejectionReason;
	          		break;
	          	}else{
	          		this.model.temp_status = "others";
	          	}
          	}
          }else{
          	console.log("error");
          }
	    },error => {
          this.utilsService.handleError(error, 'admin');
      	});
  	};
	goBack(){this.router.navigate(['/admin-users-list']);}
	backClicked(){this.utilsService.backClicked();}
}
