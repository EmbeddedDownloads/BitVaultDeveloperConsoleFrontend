import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';
import { httpService } from 'app/shared/http.service';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-developer-rating-review',
  templateUrl: './developer-rating-review.component.html',
  styleUrls: ['./developer-rating-review.component.css']
})
export class DeveloperRatingReviewComponent implements OnInit {

  rateReviewCount:any=[];
  appTitle:string;
  constructor(private myHttp : httpService, private utilsService: UtilsService) {}

  ngOnInit() {
    if(this.utilsService.validateUser())
    {
      if(this.utilsService.devgetAppID().id != undefined){
        this.getRatingReview();
        this.appTitle = this.utilsService.devgetAppID().title;
      }
    }
  }

  ratingReview=[];
  getRatingReview(){
    var URL = AppConfig.GET_RATINGS_REVIEW + "?applicationId="+this.utilsService.devgetAppID().id;
    this.myHttp.getUserRequest(URL).subscribe(
         data =>{
          if (data.status == 'success'){        
            this.ratingReview = data.result.appList;
            this.rateReviewCount = data.result;
            console.log(this.ratingReview);
          }else{
           this.utilsService.errorToasterBackend(data.status);      
          }
       },error => {
          this.utilsService.handleError(error, 'admin');     
      });
  }

  replyReview(reviewId, reply) {
    let body:any;
    body = {"appRateReviewId": +reviewId, "replyResponse": reply}
    this.myHttp.devPostRequestService(AppConfig.REPLY_REVIEW,body).subscribe(
       data =>{
        if (data.status == 'success'){
          console.log(data);
          this.utilsService.successToaster("Reply submitted successfully!");
        }else{     
           this.utilsService.errorToasterBackend(data.result.message);
        }
     },error => {
        this.utilsService.handleError(error, 'admin');     
    });
  }
}
