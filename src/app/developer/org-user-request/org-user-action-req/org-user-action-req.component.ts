import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { HttpModule , Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-org-user-action-req',
  templateUrl: './org-user-action-req.component.html',
  styleUrls: ['./org-user-action-req.component.css']
})
export class OrgUserActionReqComponent implements OnInit {
  complexForm : FormGroup;
  orgUser= {count: null};
  id:number;

  constructor(private myHttp: httpService, private utilsService: UtilsService, fb:FormBuilder, private router: Router, private route: ActivatedRoute,) { 
  	this.complexForm = fb.group({
	  'count' : [0, Validators.required]
	  });
  }

  ngOnInit() {
  	if(this.utilsService.validateUser()){  	
      if(this.utilsService.getUserName().loginType == 'ROLE_ORGANIZATION')
        console.log("action");
      else this.router.navigate(['dashboard']);
    }
  }

  addOrgUserReq(){
  	if(this.orgUser.count <= 0){
      this.utilsService.errorToaster("Count value should be greater than 0");
      return false;
    }else {
      this.myHttp.putRequestDeveloperService(AppConfig.ORG_ADD_USER_REQ+this.orgUser.count, "").subscribe(
          data =>{
          if (data.status == 'success'){
             this.utilsService.successToaster(data.result.message);
            this.router.navigate(['users']);
          }else
            this.utilsService.errorToaster(data.result.message);
       },error => {
         this.utilsService.handleError(error, 'developer');         
      }); 
    }
  }

}