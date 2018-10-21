import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AddUserDetails } from 'app/models/adduserdetails';
import { AppConfig } from 'app/app.config';
import { AppConstant, rejectionReasonTemplate } from 'app/app.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-apps-list-action',
  templateUrl: './apps-list-action.component.html',
  styleUrls: ['./apps-list-action.component.css']
})
export class AppsListActionComponent implements OnInit {
	complexForm : FormGroup;
	id:number;
  	vName:any; 
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
	  this.id = this.route.snapshot.params['id'];	
	  this.vName = this.route.snapshot.params['version'];
	  	if (this.id != undefined && this.vName != undefined) {
	      this.utilsService.setAppID(this.id, this.vName, 'xyz');
	      this.getSingleAppDetailsById();
	    }else{
	      this.utilsService.getAppID();
	      this.getSingleAppDetailsById();
	    }
	}
}
	model = new AddUserDetails();
	count:number = 0;
	changedValue(value){
		if(value){this.count = 0;}
	}
	accAprovalRejection(action, reason) {
		let body:any={};
		if(this.model.currentStatus != action){
			if(action == "UNPUBLISHED" && this.model.temp_status != "undefined" && this.model.appDetail.application.reason == ""){
				if(reason == '' || reason == undefined){
					reason = this.model.temp_status;
				}
			}

			if(action == "UNPUBLISHED" && this.model.temp_status == "undefined" && this.model.appDetail.application.reason == ""){
			this.utilsService.errorToaster("Please select rejection reason!");
			return false;
			}

			if(action == "UNPUBLISHED" && this.model.temp_status == 'others' && this.model.appDetail.application.reason == ""){
			this.utilsService.errorToaster("Please mention rejection reason!");
			return false;
			}

			if(action == "UNPUBLISHED" && reason != undefined){
				body = {"requestAction":action, "reason":reason}
			}else{
				body = {"requestAction":action, "reason":''}
			}
			
			var appId =  this.id != undefined? this.id: this.utilsService.getAppID().id; 
			let dataUrl = AppConfig.UPDATE_APP_STATUS_ADMIN+ appId;
		    this.myHttp.adminPostRequestService(dataUrl, body).subscribe(
		      data =>{
		      if (data.status=='success'){
		        this.accountRequestAction = data;
		        if(action == 'PUBLISHED'){
		        	this.utilsService.successToaster(this.model.appDetail.application.title+" Published Successfully!");
		        }else{
		        	this.utilsService.successToaster(this.model.appDetail.application.title+" Unpublished Successfully!");
		        }
		        this.goBack();
		      }else {
		        this.utilsService.errorToaster('Bad Request!');
		        }
		   },error => {
		    	console.log(error);                 
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


  getSingleAppDetailsById(){

  	if (this.id != undefined && this.vName != undefined) {
      var filename = AppConfig.GET_APP_DETAIL+'?applicationId='+this.id+'&appVersionName='+this.vName;
    }else{
      filename = AppConfig.GET_APP_DETAIL+'?applicationId='+ this.utilsService.getAppID().id+'&appVersionName='+ this.utilsService.getAppID().version;
    }

		//let filename = AppConfig.GET_APP_DETAIL+'?applicationId='+this.id+'&appVersionName='+this.vName;
	    this.myHttp.getAdminRequest(filename)
	      .subscribe(data =>{
	      if(data.status == 'success'){
	      	  this.model = data.result;
	      	  this.model.currentStatus = data.result.appDetail.application.status;
	      	  this.utilsService.setAppID(data.result.appDetail.application.appApplicationId, data.result.appDetail.application.latestVersionName, data.result.appDetail.application.title);
	      }
	      if(data.result.appDetail.application.status == "UNPUBLISHED"){
          	for(let i = 0; i<=this.rejectionTemplte.length; i++){
	          	if(data.result.appDetail.application.reason == this.rejectionTemplte[i].key){
	          		this.model.temp_status = data.result.appDetail.application.reason;
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
	goBack(){this.router.navigate(['/admin-apps-list/adminappdashboard']);}
	backClicked(){this.utilsService.backClicked();}

}
