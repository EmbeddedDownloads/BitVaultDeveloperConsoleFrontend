import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { Category } from 'app/models/category';
import { AppConfig } from 'app/app.config';
import { AppConstant, catStatus } from 'app/app.constant';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-app-category',
  templateUrl: './app-category-action.component.html',
  styleUrls: ['./app-category-action.component.css']
})
export class AppCategoryActionComponent implements OnInit {
	complexForm : FormGroup;
	status:any={};
	categoryModel = new Category;
	checkedItem = new Category;
	catStatus:string;
	makeEditable = false;
	buttonEditable = false;
	updateText = false;
	names: any;
	//obj ={'checked':[],'x':0};
  	selectedAll: any;
  	constants: any = {};
  	id:number;
  	
  constructor(private myHttp:httpService, private router: Router, private route: ActivatedRoute, private utilsService: UtilsService, fb: FormBuilder) { 
	this.complexForm = fb.group({
		  'categoryType' : [null, Validators.required],
		  'description' : [null, Validators.required]
	});
	this.constants = AppConstant;
	this.status = catStatus;
  }
  
	ngOnInit() {
	  if(this.utilsService.validateAdmin()){
		this.url.result = "";
		this.bannerUrl.result = "";
	  	this.id = this.route.snapshot.params['id'];
		if(this.id != undefined){
	  		this.getCategoryById();  
	  	}else{
	  		this.getApplicationTypeList();
	  	}
	  }
	}
	url:any={};
	readUrl(event) {   
	    if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = (event) => {
	          this.url = event.target;
	        }
			this.categoryModel.file = event.target.files[0];
			reader.readAsDataURL(event.target.files[0]);
	    }  
    }

    bannerUrl:any={};
	readBannerUrl(event) {
	    if (event.target.files && event.target.files[0]) {
	    	var reader = new FileReader();
			reader.onload = (event) => {
	          this.bannerUrl = event.target;
	        }
			this.categoryModel.bannerFile = event.target.files[0];
			reader.readAsDataURL(event.target.files[0]);
	    }  
    }

	showMsg:string;
	appCategoryAction() {
		let formData:FormData = new FormData();
		if(this.id != undefined){
			formData.append('appCategoryId', this.categoryModel.appCategoryId);
		}
		formData.append('appTypeId', this.categoryModel.appTypeId);
		formData.append('categoryType', this.categoryModel.categoryType);
		formData.append('categoryIcon', this.categoryModel.file);
		formData.append('categoryBanner', this.categoryModel.bannerFile);		
		formData.append('status', this.categoryModel.status);
		formData.append('description', this.categoryModel.description);
		let url =  AppConfig.ADD_APP_CATEGORY;
		this.myHttp.adminPostFormDataService(url, formData).subscribe(
			data=>{
				if(data.status == 'success'){
					this.catStatus = data.status;
					if(this.id != undefined){
						this.utilsService.successToaster('Category Updated Successfully!');
					}else{
						this.utilsService.successToaster('Category Added Successfully!');
					}					
					this.goBack();
				}else{
					this.utilsService.errorToaster(data.result.message);
					this.showMsg = this.records;
				}
			},error=>{
				this.utilsService.handleError(error, 'admin');
			});		
	}
	applicationList:any=[];
	catList = [];
	records:string;
	getCategoryById(){
		this.buttonEditable = true;
		let ids = this.id;
    	let filename = AppConfig.GET_CATEGORY_BY_ID+"?appCategoryId="+ids+"&size="+10;
	    this.myHttp.getAdminRequest(filename)
	      .subscribe(data =>{
	      	if(data.status == 'success'){
	          this.categoryModel = data.result.categoryDetail;
	          this.applicationList = data.result.application.appList;
	          this.catList = data.result.categoryByAppType;
	          for(var i=0;i<this.catList.length;i++){
	          	if(this.id == this.catList[i].appCategoryId){
	          		this.catList.splice(i, 1);
	          	}
	          }
	          this.records = data.result.application.totalRecords;
	          this.updateText = true;
	          if(data.result.categoryDetail.categoryIconUrl != ""){
	          	this.url.result = data.result.categoryDetail.categoryIconUrl;
	          }
	          if(data.result.categoryDetail.categoryBannerUrl != ""){
	          	this.bannerUrl.result = data.result.categoryDetail.categoryBannerUrl;
	          }
	        }else{
	        	this.utilsService.errorToaster(data.result.message);
	        }	          
		},error => {
        		this.utilsService.handleError(error, 'admin');         
        });
  	};
  	getApplicationListByCategoryId(){
		let ids = this.id;
    	let filename = AppConfig.GET_APPLICATION_LIST_BY_CATEGORY_ID+"?categoryIdList="+ids+"&size="+10;
	    this.myHttp.getAdminRequest(filename)
	      .subscribe(data =>{
	      	if(data.status == 'success'){
	          this.applicationList = data.result;
	          this.showMsg = data.totalRecords;
	          this.records = data.totalRecords;
	          console.log(this.showMsg);
	        }else{
	        	this.utilsService.errorToaster(data.result.message);
	        }
	     },error => {
        		this.utilsService.handleError(error, 'admin');         
        });
  	};
  	getApplicationTypeList(){
    	let filename = AppConfig.GET_APP_TYPE_LIST;
	    this.myHttp.getAdminRequest(filename)
	      .subscribe(data =>{
	      	if(data.status == 'success'){
	          this.categoryModel.appList = data.result;
	          this.categoryModel.appTypeId = 1;
  			  this.categoryModel.status = "ACTIVE";
	        }else{
	        	this.utilsService.errorToaster(data.result.message);
	        }
	     },error => {
        		this.utilsService.handleError(error, 'admin');         
        });
  	};
	goBack(){this.router.navigate(['/app-category']);}

	demo=[];
	tick=[];
	temp:boolean=false;
	checkedOrNot:boolean = false;

	selectAll(value){
		this.demo=[];
	    if(value==true){
	    	this.checkedOrNot = true;
		    for(let i=0;i<this.applicationList.length;i++){
		    	this.demo.push(this.applicationList[i].appApplicationId);
		    	this.tick[this.demo[i]] = true;
		    }		        
		  }else{
			this.demo.splice(0,this.applicationList.length);

			for(let j=0;j<this.applicationList.length;j++){    
				this.tick[this.applicationList[j].appApplicationId] = false;
			}
			this.checkedOrNot = false;
		}
		this.checkedItem.checked = this.demo;     
		console.log(this.checkedItem);
	}

	update(value,event){
		if(event.target.checked){
		  this.demo.push(value);
		  this.checkedOrNot = true;
		}else{
		  let indexx = this.demo.indexOf(value);
		  this.demo.splice(indexx,1);
		  	if(this.checkedItem.checked.length==0){
		  		this.checkedOrNot = false;	
		  	}		  
		}
		this.checkedItem.checked = this.demo;
		console.log(this.checkedItem);
		
		if(this.demo.length == this.applicationList.length){
		  this.selectedAll =true;
		}else{
		  this.selectedAll =false;
		}
	}

	moveApplicationToCat(){
		this.checkedItem.appTypeId = this.categoryModel.appTypeId;
		console.log(this.checkedItem);

		if(this.checkedItem.checked.length >0 && this.checkedItem.appCategoryId){
			let url =  AppConfig.MOVE_CATEGORY;
		this.myHttp.putRequestAdminService(url, this.checkedItem).subscribe(
			data=>{
				if(data.status == 'success'){
					this.utilsService.successToaster(data.result.message);
					this.getApplicationListByCategoryId();
					this.selectedAll =false;
					this.demo.splice(0,this.applicationList.length);
					this.checkedOrNot = false;
					this.count=1;
				}else{
					this.utilsService.errorToaster(data.result.message);
				}
			},error=>{
				this.utilsService.errorToaster('Internal server error!');  
			});
		}else{
			this.utilsService.errorToaster("Please select the desired application(s) to move");
		}
	}
	count=1;
	loadMoreAppList:any=[];
	loadMore(){
	this.count++;
		console.log(this.count);
		let ids = this.id;
    	let filename = AppConfig.GET_APPLICATION_LIST_BY_CATEGORY_ID+"?categoryIdList="+ids+"&size="+10+"&page="+this.count;
	    this.myHttp.getAdminRequest(filename)
	      .subscribe(data =>{
	      	if(data.status == 'success'){
	          this.loadMoreAppList = data.result;
	          console.log(this.loadMoreAppList.length);
	          for(let i=0; i<this.loadMoreAppList.length; i++){
	          	this.applicationList.push(this.loadMoreAppList[i]);
	          }
	          this.selectedAll =false;
	        }else{
	        	this.utilsService.errorToaster(data.result.message);
	        }
	     },error => {
        		this.utilsService.handleError(error, 'admin');         
        });
	}
}
