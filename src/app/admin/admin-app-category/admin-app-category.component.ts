import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConstant } from 'app/app.constant';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-admin-app-category',
  templateUrl: './admin-app-category.component.html',
  styleUrls: ['./admin-app-category.component.css']
})
export class AdminAppCategoryComponent implements OnInit {
	catList = [];
  constants: any = {};
  constructor(private myHttp: httpService, private utilsService: UtilsService) { 
    this.constants = AppConstant;
  }
ngOnInit() {
  if(this.utilsService.validateAdmin()){
  	this.adminAppCategoryListing();  	
  }
}
  showCategoryMessage:boolean = false;
  adminAppCategoryListing(){
    let path = AppConfig.ALL_CATEGORY_LIST;
    this.myHttp.getAdminRequest(path).subscribe(
      data =>{   
      if(data.status == 'success' && data.result != ''){
        this.catList = data.result;

      }else if(data.status == 'success' && data.result == ''){
        this.showCategoryMessage = true;
      }
      else{
        this.utilsService.errorToaster("Something went wrong!");
      }
      },error => {
        this.utilsService.handleError(error, 'admin');
    });
  }
}