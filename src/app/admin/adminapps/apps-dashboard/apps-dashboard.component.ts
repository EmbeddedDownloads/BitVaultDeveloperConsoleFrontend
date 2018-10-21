import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { User } from 'app/models/user';

@Component({
  selector: 'app-apps-dashboard',
  templateUrl: './apps-dashboard.component.html',
  styleUrls: ['./apps-dashboard.component.css']
})
export class AppsDashboardComponent implements OnInit {

  constructor(private myHttp:httpService, private utilsService: UtilsService, private router: Router, private route: ActivatedRoute) {  }
  id:number;
  vName:any;
  title:any; 
  ngOnInit() {
    if(this.utilsService.validateAdmin()){
      this.title = this.route.snapshot.params['title'];  
      this.id = this.route.snapshot.params['id'];  
      this.vName = this.route.snapshot.params['version'];
      if (this.id != undefined && this.vName != undefined && this.title != undefined) {
        this.utilsService.setAppID(this.id, this.vName, this.title);
      }else{
        this.utilsService.getAppID();
        this.title = this.utilsService.getAppID().title;
      }
      this.getActiveAppCount();
    }
  }

  ActiveAppCount= new User;
  getActiveAppCount(){
    var URL = AppConfig.APP_ACTIVE_COUNT + "?applicationId="+this.utilsService.getAppID().id;
    this.myHttp.getAdminRequest(URL).subscribe(
         data =>{
          if (data.status == 'success'){        
            this.ActiveAppCount = data.result;
          }else{
           this.utilsService.errorToasterBackend(data.result.message);      
          }
       },error => {
          this.utilsService.handleError(error, 'admin');     
      });
  }





}
