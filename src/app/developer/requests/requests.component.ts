import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  
  dataList:any = {};
  constants: any = {};
  page:number;
  show:boolean;
  id:number;

  constructor(private httpservice: httpService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.constants = AppConstant;
  	if(this.utilsService.validateUser()){
      this.getDataList(1);
    }
  }

  getDataList(event){
    let url = AppConfig.GET_ALL_USER_REQUESTS + "?page=" + event + "&size=" + 10;
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
  
}