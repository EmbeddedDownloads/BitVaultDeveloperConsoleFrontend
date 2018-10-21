import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';
import { httpService } from 'app/shared/http.service';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-review-ratings',
  templateUrl: './review-ratings.component.html',
  styleUrls: ['./review-ratings.component.css']
})
export class ReviewRatingsComponent implements OnInit {
  rateReviewCount:any=[];
  title:string;
	constructor(private myHttp : httpService, private utilsService: UtilsService) {}

ngOnInit() {
  if(this.utilsService.validateAdmin()){
  	if(this.utilsService.getAppID().id != undefined){
      this.title = this.utilsService.getAppID().title;
  		this.getRatingReview();
  	}
  }
}

  ratingReview=[];
  getRatingReview(){
  	var URL = AppConfig.GET_RATINGS_REVIEW + "?applicationId="+this.utilsService.getAppID().id+'&size='+20;
    this.myHttp.getAdminRequest(URL).subscribe(
         data =>{
          if (data.status == 'success'){        
            this.ratingReview = data.result.appList;
            this.rateReviewCount = data.result;
          }else{
           this.utilsService.errorToasterBackend(data.result.message);      
          }
       },error => {
          this.utilsService.handleError(error, 'admin');     
      });
  }

  replyReview(reviewId, reply) {
    let body:any;
    body = {"appRateReviewId": +reviewId, "replyResponse": reply}
    this.myHttp.adminPostRequestService(AppConfig.REPLY_REVIEW,body).subscribe(
       data =>{
        if (data.status == 'success'){
          this.utilsService.successToaster("Reply submitted successfully!");
        }else{     
           this.utilsService.errorToasterBackend(data.result.message);
        }
     },error => {
        this.utilsService.handleError(error, 'admin');     
    });

  }

  deleteReply(replyId) {
    var isConfirmed = confirm("Are you sure you want to delete?");
    if(!isConfirmed)
      return false;
    let dataUrl = AppConfig.DELETE_REVIEW+'/'+replyId;
    this.myHttp.deleteReviewReply(dataUrl).subscribe(
       data =>{
        if (data.status == 'success'){
          this.utilsService.successToaster("Deleted Successfully!");
          this.getRatingReview();
        }else{     
           this.utilsService.errorToasterBackend(data.result.message);
        }
     },error => {
      this.utilsService.handleError(error, 'admin');     
    });
  }

}
