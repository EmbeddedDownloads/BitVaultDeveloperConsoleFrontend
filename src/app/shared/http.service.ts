import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {AppConfig} from 'app/app.config';
import { LoaderService } from 'app/shared/loader.service';
import { UtilsService } from 'app/shared/utils.service';

@Injectable()
export class httpService{
  private baseUrl ="" ; 
  constructor(private http : Http, private loaderService: LoaderService, private utilsService:UtilsService){
    window.addEventListener('offline', () => {
      this.utilsService.errorToaster("No connection found, Please check your Internet connection");
    });
  }

  getUserRequest(url:string) {
    this.baseUrl = AppConfig.API_BASE_URL+url;
    this.loaderService.display(true);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateUser().token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseUrl,options)
      .map(data => {
       this.loaderService.display(false);
       return data.json();              
      },error => {
        if (error.status == 0){ //or whatever condition you like to put
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }else{
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }
      });
  }

  /** GET Admin request **/
  getAdminRequest(url:string) {
    if(this.utilsService.validateAdmin()){
      this.loaderService.display(true);
    }
    this.baseUrl = AppConfig.API_BASE_URL+url;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateAdmin().token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseUrl,options)
      .map(data => {
      this.loaderService.display(false);
       return data.json();                 
      },error => {
        if (error.status == 0){//or whatever condition you like to put
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }else{
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }
      });
  }


  /** GET Admin request without token **/
  getAdminRequestWithoutToken(url:string) {    
    this.baseUrl = AppConfig.API_BASE_URL+url;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseUrl,options)
      .map(data => {
      this.loaderService.display(false);
       return data.json();                 
      },error => {
        if (error.status == 0){//or whatever condition you like to put
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }else{
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }
      });
  }

  adminPostFormDataService(url,requestdata) {
    console.log(requestdata);
    this.loaderService.display(true);
    this.baseUrl = AppConfig.API_BASE_URL+url;  

    let headers = new Headers();
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateAdmin().token);
      let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, requestdata, options)
            .map(data => {
               this.loaderService.display(false);
               return data.json();
        },error => {
        if (error.status == 0){//or whatever condition you like to put
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }else{
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }
      });
    }
	
  /* Without Token */
  postRequestService(url,requestdata) {
    this.loaderService.display(true);
    this.baseUrl = AppConfig.API_BASE_URL+url;  
  
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl, requestdata, options)
          .map(data => {
             this.loaderService.display(false);
             return data.json();
      },error => {
      if (error.status == 0){//or whatever condition you like to put
        this.loaderService.display(false);
        alert("Server Connection Error occured...Please try after some time");
      }else{
        this.loaderService.display(false);
        alert("Server Connection Error occured...Please try after some time");
      }
    });
  }

  /* PUT Without Token */
  putRequestService(url,requestdata) {
    this.loaderService.display(true);
    this.baseUrl = AppConfig.API_BASE_URL+url;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
      
      return this.http.put(this.baseUrl, requestdata, options)
        .map(data => {
           this.loaderService.display(false);
           return data.json();
      },error => {
        if (error.status == 0){ //or whatever condition you like to put
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }else{
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }
      });
  }

  /* PUT With Token for DEVELOPER*/
  putRequestDeveloperService(url,requestdata) {
    this.loaderService.display(true);
    this.baseUrl = AppConfig.API_BASE_URL+url;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateUser().token);
    let options = new RequestOptions({ headers: headers });
    
    return this.http.put(this.baseUrl, requestdata, options)
      .map(data => {
         this.loaderService.display(false);
         return data.json();
      },error => {
        this.loaderService.display(false);
        if (error.status == 0)
          alert("Server Connection Error occured...Please try after some time");
        else
          alert("Server Connection Error occured...Please try after some time");
    });
  }

  adminPostRequestService(url,requestdata) {
    this.loaderService.display(true);
    this.baseUrl = AppConfig.API_BASE_URL+url;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateAdmin().token);
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(requestdata);
        return this.http.post(this.baseUrl, body, options)
            .map(data => {
               this.loaderService.display(false);
               return data.json();
        },error => {
        if (error.status == 0){ //or whatever condition you like to put
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }else{
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }
      });
    }


  devPostRequestService(url,requestdata) {
    this.loaderService.display(true);
    this.baseUrl = AppConfig.API_BASE_URL+url;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateUser().token);
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(requestdata);
        return this.http.post(this.baseUrl, body, options)
            .map(data => {
               this.loaderService.display(false);
               return data.json();
        },error => {
        if (error.status == 0){//or whatever condition you like to put
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }else{
          this.loaderService.display(false);
          alert("Server Connection Error occured...Please try after some time");
        }
      });
    }

  postAuthRequestService(url,requestdata) {
   if(this.utilsService.validateSession() || this.utilsService.validateAdminSession()){   
      this.loaderService.display(true);
      this.baseUrl = AppConfig.API_BASE_URL+url;
      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateAdmin().token);
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(requestdata);
        return this.http.post(this.baseUrl, body, options)
          .map(data => {
             this.loaderService.display(false);
             return data.json();
        });
    }else
    {
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(requestdata);
      return this.http.post('', body, options)
          .map(data => {
             this.loaderService.display(false);
             return data;
      });
    }
  }

  uploadfileinfo(url, info, options){
    this.loaderService.display(true);
    return this.http.post(url, info, options)
      .map(data => {
         this.loaderService.display(false);
         return data.json();
    });
  }

  uploadAvatar(url, info, options){
   this.loaderService.display(true);
    return this.http.post(url, info, options)
      .map(data => {
         this.loaderService.display(false);
         return data.json();
    });
  }

  postRequestForNotificationServer(url,requestdata) {
    this.loaderService.display(true);
    this.baseUrl = url;  
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl, requestdata, options)
      .map(data => {
           this.loaderService.display(false);
           return data.json();
    },error => {
      if (error.status == 0){//or whatever condition you like to put
        this.loaderService.display(false);
        alert("Server Connection Error occured...Please try after some time");
      }else{
        this.loaderService.display(false);
        alert("Server Connection Error occured...Please try after some time");
      }
    });
  }


//DELETE SERVICE DEVELOPER
  deleteServiceDeveloper(url,requestdata){
    this.baseUrl = AppConfig.API_BASE_URL+url;  
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateUser().token);
    let options = new RequestOptions({ headers: headers, body : requestdata });
    
    this.loaderService.display(true);
    return this.http.delete(this.baseUrl, options)
      .map(data =>{
        this.loaderService.display(false);
        return data.json();
      },error => {
          this.loaderService.display(false);
        if (error.status == 0)
          alert("Server Connection Error occured...Please try after some time");
        else
          alert("Server Connection Error occured...Please try after some time");
      });
  }

//DELETE SERVER ADMIN
  deleteServiceAdmin(url,requestdata){
      this.baseUrl = AppConfig.API_BASE_URL+url;
      let headers = new Headers({ 'Content-Type': 'application/json'});    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateAdmin().token);
      let options = new RequestOptions({ headers: headers, body : requestdata });
      this.loaderService.display(true);
      return this.http.delete(this.baseUrl, options).map(data =>{        
          this.loaderService.display(false);        
          return data.json();      
      },error => {          
        this.loaderService.display(false);        
        if (error.status == 0)
          alert("Server Connection Error occured...Please try after some time");  
        else
         alert("Server Connection Error occured...Please try after some time");
    });
  }

  /* PUT REQUEST With Token for ADMIN*/
  putRequestAdminService(url,requestdata) {
    this.loaderService.display(true);
    this.baseUrl = AppConfig.API_BASE_URL+url;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateAdmin().token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.baseUrl, requestdata, options)
      .map(data => {
         this.loaderService.display(false);
         return data.json();
      },error => {
        this.loaderService.display(false);
        if (error.status == 0)
          alert("Server Connection Error occured...Please try after some time");
        else
          alert("Server Connection Error occured...Please try after some time");
    });
  }

  //DELETE REVIEW REPLY ADMIN
  deleteReviewReply(url){
      this.baseUrl = AppConfig.API_BASE_URL+url;
      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('X-Authorization', 'Bearer ' + this.utilsService.validateAdmin().token);
      let options = new RequestOptions({ headers: headers });
      this.loaderService.display(true);
      return this.http.delete(this.baseUrl, options).map(data =>{        
          this.loaderService.display(false);        
          return data.json();      
      },error => {          
        this.loaderService.display(false);        
        if (error.status == 0)
          alert("Server Connection Error occured...Please try after some time");  
        else
         alert("Server Connection Error occured...Please try after some time");
    });
  }
    
}
