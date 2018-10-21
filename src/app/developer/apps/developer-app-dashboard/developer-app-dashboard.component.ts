import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { User } from 'app/models/user';

@Component({
  selector: 'app-developer-app-dashboard',
  templateUrl: './developer-app-dashboard.component.html',
  styleUrls: ['./developer-app-dashboard.component.css']
})
export class DeveloperAppDashboardComponent implements OnInit {
  
  constructor(private myHttp:httpService, private utilsService: UtilsService, private router: Router, private route: ActivatedRoute) {  }
  id:number;
  vName:any;
  appTitle:string;

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];  
    this.vName = this.route.snapshot.params['version'];
     this.appTitle = this.utilsService.devgetAppID().title;
    //if (this.id != undefined && this.vName != undefined) {
      //this.utilsService.devsetAppID(this.id, this.vName, '');
    //}else{
      //this.utilsService.devgetAppID();
    //}
    this.getActiveAppCount();

  }

  ActiveAppCount= new User;
  getActiveAppCount(){
    var URL = AppConfig.APP_ACTIVE_COUNT + "?applicationId="+this.utilsService.devgetAppID().id;
    this.myHttp.getUserRequest(URL).subscribe(
         data =>{
          if (data.status == 'success'){        
            this.ActiveAppCount = data.result;
          }else{
           this.utilsService.errorToasterBackend(data.status);      
          }
       },error => {
          this.utilsService.handleError(error, 'developer');     
      });
  }

}
