import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { Category } from 'app/models/category';
import { AppConfig } from 'app/app.config';
import { AppConstant, catStatus } from 'app/app.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-app-category',
  templateUrl: './add-app-category.component.html',
  styleUrls: ['./add-app-category.component.css']
})
export class AddAppCategoryComponent implements OnInit {
	complexForm : FormGroup;
	status:any={};
	categoryModel = new Category;
	catStatus:string;
	
  constructor(private myHttp:httpService, private router: Router, private route: ActivatedRoute, private utilsService: UtilsService, fb: FormBuilder) { 

  	this.complexForm = fb.group({
		  'categoryType' : [null, Validators.required],
		  'description' : [null, Validators.required]
	});
	this.status = catStatus;
  }
  
  
  ngOnInit() {  
  	this.categoryModel.status = "Active";
  	this.categoryModel.appTypeId = 1;
  }
  
  

  	fileChange(event) {
	    var fileList: FileList = event.target.files;
	    if(fileList.length > 0) {

	        let file: File = fileList[0];
	        this.categoryModel.file = file;
	    }
	}


	addAppCategory() {
		
		console.log(this.categoryModel);
		let formData:FormData = new FormData();
		formData.append('appTypeId', this.categoryModel.appTypeId);
		formData.append('categoryType', this.categoryModel.categoryType);
		formData.append('categoryIcon', this.categoryModel.file);
		formData.append('status', this.categoryModel.status);
		formData.append('description', this.categoryModel.description);
		console.log(formData);
		let url =  AppConfig.ADD_APP_CATEGORY;
		this.myHttp.adminPostFormDataService(url, formData).subscribe(
			data=>{
				console.log(data.result);
				if(data.status == 'success'){
					this.catStatus = data.status;
					this.utilsService.successToaster('Category Added Successfully!');
					this.goBack();
				}else{
					this.utilsService.errorToaster(data.result.message);
				}
			},error=>{
				//this.utilsService.internalServerError();
				this.utilsService.errorToaster('Internal server error!');  
			});
		
	}

	goBack(){
		this.router.navigate(['/app-category']);
	}

}
