import { Component, OnInit } from '@angular/core';
import { HttpModule , Http} from '@angular/http';
import { Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';

@Component({
  selector: 'app-org-user-request',
  templateUrl: './org-user-request.component.html',
  styleUrls: ['./org-user-request.component.css']
})
export class OrgUserRequestComponent implements OnInit {
  orgUserReqListing:any=[];
  show:boolean;
  page:number;

  constructor(private httpservice: httpService, private utilsService: UtilsService, private router: Router) {    
  }

  ngOnInit() {
  	if(this.utilsService.validateUser()){
      if(this.utilsService.getUserName().loginType == 'ROLE_ORGANIZATION'){
        this.getOrgUserReqList(1);
      }else this.router.navigate(['dashboard']);
    }
  }

  getOrgUserReqList(event){
    let url = AppConfig.ORG_USER_REQ_LIST + "?status=PENDING,APPROVED,REJECTED&page=" + event + "&size=" + 10;
    console.log(url);
    this.httpservice.getUserRequest(url)
    .subscribe(data => {
      if (data.status == 'success' && data.result.length > 0)
      {
        this.orgUserReqListing = data; 
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

}