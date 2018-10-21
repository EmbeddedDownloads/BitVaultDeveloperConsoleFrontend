import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-release-management',
  templateUrl: './release-management.component.html',
  styleUrls: ['./release-management.component.css']
})
export class ReleaseManagementComponent implements OnInit {
	productionArtifact:any=[];
	draftPendingArtifact:any=[];
	unpublishedArtifact:any=[];
	rejectedArtifact:any=[];
	artifact:any=[];
	msg1:boolean=false;
	msg2:boolean=false;
	msg3:boolean=false;
	msg4:boolean=false;
	title:string;

	constructor(private myHttp:httpService, private router: Router, private route: ActivatedRoute, private utilsService: UtilsService) { }

	ngOnInit() {
		if(this.utilsService.validateAdmin()){
			this.relMgmt();
			this.title = this.utilsService.getAppID().title;
		}
	}

	relMgmt() {
		let body:any;
		body = {"applicationId": +this.utilsService.getAppID().id, "status": "UNPUBLISHED,DRAFT,PENDING,REJECTED"}
		this.myHttp.adminPostRequestService(AppConfig.RELEASE_MGMT,body).subscribe(
		   data =>{
		    if (data.status == 'success'){
		    	this.productionArtifact = data.result.production;
		    	if(this.productionArtifact == null){
		    		this.msg1 = true;
		    	}
		    this.artifact = data.result.artifact.appDetailList;
		    if(this.artifact.length > 0){
		    	for(let i=0; i<=this.artifact.length; i++){
			   		if(this.artifact[i].status == 'UNPUBLISHED'){
			   			this.unpublishedArtifact.push(this.artifact[i]);
			   			console.log(this.unpublishedArtifact);
			   		}else{
			   			this.msg2 = true;
			   		}
			   		if(this.artifact[i].status == 'PENDING'){
			   			this.draftPendingArtifact.push(this.artifact[i]);
			   		}else{
			   			this.msg3 = true;
			   		}
			   		if(this.artifact[i].status == 'REJECTED'){
			   			this.rejectedArtifact.push(this.artifact[i]);
			   		}else{
			   			this.msg4 = true;
			   		}
		   		}
		    }else{
		    	this.msg2 = true;this.msg3 = true;this.msg4 = true;
		    }		   	

			}else{     
		       this.utilsService.errorToasterBackend(data.result.message);
		    }
		 },error => {
		    this.utilsService.handleError(error, 'admin');     
		});

	}

}
