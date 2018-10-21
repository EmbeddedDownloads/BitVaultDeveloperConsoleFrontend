import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Appdata } from 'app/models/appdata';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import { Http, Headers,RequestOptions } from '@angular/http';
import {ModalModule} from "ng2-modal";
import { UtilsService } from 'app/shared/utils.service';
import { httpService } from 'app/shared/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppConfig } from 'app/app.config';
import { AppConstant } from 'app/app.constant';
import { UploadAppdata } from 'app/models/uploadAppdata';

@Component({
  selector: 'app-uploadapp',
  templateUrl: './uploadapp.component.html',
  styleUrls: ['./uploadapp.component.css']
})

export class UploadappComponent implements OnInit {
  appConfig: any = {};
  constants: any = {};
  public id: any;
  appModel = new Appdata;
  UploadAppdata = new UploadAppdata;
  idparam:any;
  vName:any;
  appIcon : any;
  appImages :any = [];
  complexForm : FormGroup;
  storeListForm : FormGroup;
  selectOption: any;
  appCurrentStatus=1;
  appTypeValue=1;
  appCategoryList: any=[];
  categoryList: any=[];
  showMenuBar:boolean=false;
  
  constructor(private route: ActivatedRoute, private router:Router, private myService:httpService, fb: FormBuilder, private utilsService: UtilsService) {
    this.complexForm = fb.group({
      'title' : [null, Validators.required],
      'language': [null, Validators.required],
      'appTypeId': [null, Validators.required] ,
      'appCategoryId': [null, Validators.required]
    });

    this.storeListForm = fb.group({
      'title' : [null, Validators.required],
      'appTypeId': [null, Validators.required] ,
      'appCategoryId': [null, Validators.required],
      'email' :[null],
      'website' :[null],
      'privacyPolicyUrl':[null]
    });

    this.constants = AppConstant;
    this.appConfig = AppConfig;
    this.UploadAppdata.status = this.appCurrentStatus;
    //this.appCategoryList = appCategoryList;    
   }

  ngOnInit() {
    if(this.utilsService.validateUser())
    {
      this.getCategoryList();
      this.appIcon = false;
      this.idparam = this.route.snapshot.params['id'];	
      this.vName = this.route.snapshot.params['version']; 

      if (this.idparam != undefined && this.vName != undefined) {
        this.utilsService.devsetAppID(this.idparam, this.vName, "");
        this.appDashboardData();
      }else{
        this.utilsService.devgetAppID();
        let idparameter = this.utilsService.devgetAppID();        
        if(idparameter != undefined){
          this.appDashboardData();
        }else{          
          this.UploadAppdata.status = 1;
          this.appModel.language = "English";
          this.appModel.appTypeId = 1;
          this.appModel.appCategoryId = null;
          this.showMenuBar = true;      
        }
      }            
    }  
  }

  appDashboardData(){
    if(this.utilsService.devgetAppID().id != undefined && this.utilsService.devgetAppID().version != undefined)
      {
        document.getElementById("apk").classList.remove('active');
        document.getElementById("store-list").classList.add('active');
        document.getElementById("apkwraper").classList.remove('active');
        document.getElementById("storewraper").classList.add('active');
        
        this.appDetailById();
      }else if(this.idparam != undefined && this.vName != undefined)
      {
        document.getElementById("apk").classList.remove('active');
        document.getElementById("store-list").classList.add('active');
        document.getElementById("apkwraper").classList.remove('active');
        document.getElementById("storewraper").classList.add('active');
        
        this.appDetailById();
      }                
  }

  appDetailById() {
    if(this.utilsService.devgetAppID().id != undefined){
      var dataUrl = AppConfig.GET_APP_DETAIL+'?applicationId='+this.utilsService.devgetAppID().id+'&appVersionName='+this.utilsService.devgetAppID().version;
    }else{
       dataUrl = AppConfig.GET_APP_DETAIL+'?applicationId='+this.idparam+'&appVersionName='+this.vName;
    }
    this.myService.getUserRequest(dataUrl).subscribe(
       data =>{
        if (data.status == 'success' && data.result != null)
        {                
            this.UploadAppdata.applicationId = data.result.appDetail.application.appApplicationId;
            this.UploadAppdata.versionName = data.result.appDetail.application.latestVersionName;
            this.UploadAppdata.website = data.result.appDetail.application.website;
            this.UploadAppdata.language = data.result.appDetail.application.language;
            this.UploadAppdata.privacyPolicyUrl = data.result.appDetail.application.privacyPolicyUrl;
            this.UploadAppdata.email = data.result.appDetail.application.email;
            this.UploadAppdata.shortDescription = data.result.appDetail.shortDescription;
            this.UploadAppdata.fullDescription = data.result.appDetail.fullDescription;
            this.UploadAppdata.title = data.result.appDetail.application.title;
            this.UploadAppdata.packageName = data.result.appDetail.application.packageName;
            this.UploadAppdata.status = this.getStatusId(data.result.appDetail.application.status);
            this.UploadAppdata.createdAt = data.result.appDetail.createdAt;
            this.UploadAppdata.appTypeId = data.result.appDetail.application.applicationType.appTypeId;
            this.UploadAppdata.appCategoryId = data.result.appDetail.application.appCategory.appCategoryId;
            this.appCurrentStatus = this.UploadAppdata.status;
            
            this.utilsService.devsetAppID(this.UploadAppdata.applicationId, this.UploadAppdata.versionName, this.UploadAppdata.title);

            if(data.result.appDetail.application.apkUrl != undefined)
              this.UploadAppdata.appIconUrl = data.result.appDetail.application.appIconUrl;

            if(data.result.appDetail.appImage != undefined)
            {
              for (var i = 0; i < data.result.appDetail.appImage.length; i++) 
              {
                if(data.result.appDetail.appImage[i].imageType == 'BANNER')
                  this.UploadAppdata.appBannerUrl = data.result.appDetail.appImage[i].appImageUrl;
                else if(data.result.appDetail.appImage[i].imageType == 'IMAGE')
                 this.UploadAppdata.listImagesUrls.push(data.result.appDetail.appImage[i]);
              }
              this.updateCategoryList(this.UploadAppdata.appTypeId, true);
            }              
        }else{
         this.utilsService.errorToasterBackend(data.status);      
        }
     },error=>{
        this.utilsService.handleError(error, 'developer');
     });
  }

  fileChange(event) {  
    var fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.appModel.file = file;
    }else{
     this.appModel.file = undefined;
     return false;
    }
  }

  fileChangeIcon(event) {
    var fileList: FileList = event.target.files;
    
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.appIcon = file;
    }else{
      return false;
    }

    var formData = new FormData();    
    formData.append('appIcon', this.appIcon);
    formData.append('applicationId',  this.UploadAppdata.applicationId);
    formData.append('arrayKey',  '');    
    let headers = new Headers();
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateUser().token);
      
    let options = new RequestOptions({ headers: headers });
    let url = AppConfig.API_BASE_URL+AppConfig.UPLOAD_APP_ICON_URL+'/'+this.UploadAppdata.applicationId;
    
    this.myService.uploadfileinfo(url, formData, options)
    .subscribe(
        data => {
          if (data.status == this.constants.SUCCESS)
          {
            this.UploadAppdata.appIconUrl = data.result.imageUrl+"?"+Math.floor(Date.now() / 1000);
            this.utilsService.successToaster(this.constants.APP_UPLOADED_DETAILS_SUCCESS);
          }else
          {
            (<HTMLInputElement>document.getElementById("app-icon")).value ="";  
            this.utilsService.readErrorMsg(data.result);
          }
        },error => {
           this.utilsService.handleError(error, 'developer');                  
        });
  }


  /** UPLOAT APP IMAGES AND BANNER**/
 uploadAppBannerAndImages(event, imgType) {
    var fileList: FileList = event.target.files;
        
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.appImages = file;
    }else return false;

    var formData = new FormData();    
    formData.append('appImages', this.appImages);
    formData.append('imageType', imgType);
    formData.append('applicationId',  this.UploadAppdata.applicationId);   
    let headers = new Headers();
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateUser().token);
      
    let options = new RequestOptions({ headers: headers });
    let url = AppConfig.API_BASE_URL+AppConfig.UPLOAD_APP_IMAGE_URL+this.UploadAppdata.applicationId;
    
    this.myService.uploadfileinfo(url, formData, options)
    .subscribe(
        data => {
          if (data.status == this.constants.SUCCESS)
          {
            if(imgType =="IMAGE")
              this.UploadAppdata.listImagesUrls.push(data.result[0]);              
            else if(imgType =="BANNER")
              this.UploadAppdata.appBannerUrl = data.result[0].appImageUrl;

            this.utilsService.successToaster(this.constants.APP_UPLOADED_DETAILS_SUCCESS);          
          }else
          {
            if(imgType =="BANNER")
              (<HTMLInputElement>document.getElementById("app-banner")).value ="";               
            if(imgType =="IMAGE")
              (<HTMLInputElement>document.getElementById("files")).value ="";
            this.utilsService.readErrorMsg(data.result);           
          }
        },error => {
          this.utilsService.handleError(error, 'developer');                    
        });
 }

  //UPLOAD APK FILE
  uploadAPK() {
    if(this.appModel.file == undefined)
    {
      this.utilsService.errorToaster("Please select an APP file to upload");      
      document.getElementById("uploadAppProd").click();
      return false;
    }
    var formData = new FormData();

    if(this.UploadAppdata.applicationId != undefined)
      formData.append('applicationId', this.UploadAppdata.applicationId);
    
    formData.append('title', this.appModel.title);
    formData.append('language', this.appModel.language);
    formData.append('appTypeId', this.appModel.appTypeId);
    formData.append('appCategoryId', this.appModel.appCategoryId);   
    formData.append('apkFile', this.appModel.file);    
    let headers = new Headers();
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateUser().token);
      
    let options = new RequestOptions({ headers: headers });
    let url = AppConfig.API_BASE_URL+AppConfig.UPLOAD_APP_URL;   
    
    this.myService.uploadfileinfo(url, formData, options)
    .subscribe(
        data => {
          if (data.status == this.constants.SUCCESS)
          {
            document.getElementById("apk").classList.remove('active');
            document.getElementById("store-list").classList.add('active');
            document.getElementById("apkwraper").classList.remove('active');
            document.getElementById("storewraper").classList.add('active');

            this.UploadAppdata.applicationId = data.result.appApplicationId;
            this.UploadAppdata.versionName = data.result.latestVersionName;
            this.UploadAppdata.title = data.result.title;
            this.UploadAppdata.appTypeId = data.result.applicationType.appTypeId;
            this.UploadAppdata.appCategoryId = data.result.appCategory.appCategoryId;
            this.UploadAppdata.createdAt = data.result.appDetail.application.createdAt;             

            this.UploadAppdata.status = this.getStatusId(data.result.status);
            this.appCurrentStatus = this.UploadAppdata.status;
            this.utilsService.successToaster(this.constants.APP_UPLOADED_DETAILS_SUCCESS);
          }else
          {
            var value = '';
            if(data.result.bpk != undefined)
            {             
              for (var key in data.result.bpk)
              {
                if(value != '') value = value+' , '+ data.result.bpk[key];
                else value = data.result.bpk[key];
                break;
              }                        
            }else if(data.result.message != undefined)
            {
              if( typeof data.result.message === 'string' ) {
                value = data.result.message;
              }else{
                for (var key in data.result.message)
                {
                  if(value != '')
                    value = value+' , '+ data.result.message[key];
                  else
                    value = data.result.message[key];
                  break;
                }
              }
            }
            
            document.getElementById("uploadAppProd").click();
            this.utilsService.errorToaster(value);
          }
       },error => {
           this.utilsService.handleError(error, 'developer');                   
        }
    );
  }

  updateAppDetails() {
    let dataUrl =  AppConfig.UPDATE_UPLOADED_APP_DETAILS;
    this.myService.devPostRequestService(dataUrl, this.UploadAppdata).subscribe(
       data =>{
        if (data.status == 'success')
        {
          this.utilsService.successToaster(this.constants.APP_UPLOADED_DETAILS_SUCCESS);          
        }else
        {          
          this.utilsService.readErrorMsg(data.result);
        }
     },error => {
           this.utilsService.handleError(error, 'developer');                   
      });
  }

  UpdateAppStatus(appStatus) {
    if(this.UploadAppdata.applicationId != undefined && this.UploadAppdata.status != 1 && this.UploadAppdata.status != 1)
    { 
      let dataUrl =  AppConfig.PUBLISH_DEV_APP_URL+this.UploadAppdata.applicationId;      
      let status = this.getStatusNameById(this.UploadAppdata.status);

      let body = {"status":status};
      this.myService.devPostRequestService(dataUrl, body).subscribe(
       data =>{
        if (data.status == 'success')
        {
          this.UploadAppdata.status = 4;
          this.utilsService.successToaster(this.constants.APP_CHANGE_STATUS_SUCCESS);
           this.router.navigate(['dashboard']);
        }else
        {
          this.UploadAppdata.status = this.appCurrentStatus;
          var value = '';
          if( typeof data.result === 'string')
          {
              value = data.result.message;
          }else
          {
            for (var key in data.result)
            {
              if(value != '') value = value+' , '+ data.result[key];
              else value = data.result[key];
              break;
            }
          }
          this.utilsService.errorToasterBackend(value);
        }
                
      },error => {
           this.utilsService.handleError(error, 'developer');                   
      });
    }else
    {
      this.UploadAppdata.status = this.appCurrentStatus;
    }

  }

  updateCategoryList(appTypeId, value) {    
    this.categoryList = [];
    if(value==false)
    {
      this.appModel.appCategoryId=null;
      this.UploadAppdata.appCategoryId=null;
    }

    for(var i=0;i<this.appCategoryList.length;i++)
    {
      if(this.appCategoryList[i].appTypeId == appTypeId)
        this.categoryList.push(this.appCategoryList[i]);       
    }
  }

  updateExistingVersion() {
    if(this.UploadAppdata.applicationId != undefined)
    {
      this.appModel.language = this.UploadAppdata.language;
      this.appModel.title = this.UploadAppdata.title;
      this.appModel.appTypeId = this.UploadAppdata.appTypeId;
      this.appModel.appCategoryId = this.UploadAppdata.appCategoryId;
      this.updateCategoryList(this.UploadAppdata.appTypeId, true);    
    }  
  }

  getStatusId(status) {
      if(status == "DRAFT")
        return 1;
      else if(status == "PUBLISHED")
        return 2;
      else if(status == "UNPUBLISHED")
        return 3;
      else if(status == "PENDING")
        return 4;
      else if(status == "REJECTED")
        return 5;
  }

  getStatusNameById(status) {
    if(status == 1)
      return "DRAFT";
    else if(status == 2)
      return "PUBLISHED";
    else if(status == 3)
      return "UNPUBLISHED";
    else if(status == 4)
      return "PENDING";
    else if(status == 5)
      return "REJECTED";
  }
  

  deleteImage(appImagesId){
    console.log(appImagesId);
    this.myService.deleteServiceDeveloper(AppConfig.DELETE_APP_IMAGE+'/'+appImagesId,'').subscribe(
       data =>{
        if (data.status == 'success')
        {
         for (var i = 0; i < this.UploadAppdata.listImagesUrls.length; i++){
            if(this.UploadAppdata.listImagesUrls[i].appImagesId == appImagesId){
              this.UploadAppdata.listImagesUrls.splice(i, 1);
            }
         }        
          this.utilsService.successToaster("Deleted Successfully!");         
        }else
        {          
          this.utilsService.readErrorMsg(data.result);
        }
     },error => {
           this.utilsService.handleError(error, 'developer');                   
      });
  }

  getCategoryList()
  {
    let dataUrl = AppConfig.GET_ACTIVE_CATEGORIES_LIST+'?status=ACTIVE';
      this.myService.getUserRequest(dataUrl).subscribe(
      data =>{
        if (data.status == 'success' && data.result != null)
        { 
          this.appCategoryList = data.result;
          this.updateCategoryList(1, true);
        }else{
         this.utilsService.errorToasterBackend(data.status);      
        }
      },error=>{
        this.utilsService.handleError(error, 'developer');
      }); 
  }

}