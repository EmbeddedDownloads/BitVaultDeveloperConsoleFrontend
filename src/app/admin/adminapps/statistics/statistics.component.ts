import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { httpService } from 'app/shared/http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';
import { User } from 'app/models/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  today:string;
  todayDate:string;
  priorDate:string;
  dd:any;
  mm:any;
  newdd:any;
  newmm:any;
  year:any;
  sumCount1:number;
  sumCount2:number;
  sumCount3:number;
  sumCount4:number;
  title:string;

  label:any=[];
  data1:any=[];
  lineChartData:any=[];
  lineChartLabels:any=[];
  uninstalllineChartData:any=[];
  uninstalllineChartLabels:any=[];
  downloadlineChartData:any=[];
  downloadlineChartLabels:any=[];
  avgRatinglineChartData:any=[];
  avgRatinglineChartLabels:any=[];
  graphDuration:string='7 days';

constructor(private myHttp:httpService, private utilsService: UtilsService, private router: Router, private route: ActivatedRoute) {  }
ngOnInit() {
  if(this.utilsService.validateAdmin()){ 
    this.title = this.utilsService.getAppID().title;
    this.getActiveAppCount();
    this.graphData('month');

  }
}
 
  public lineChartOptions:any = {responsive: true};
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

ActiveAppCount= new User;
  getActiveAppCount(){
    var URL = AppConfig.APP_ACTIVE_COUNT + "?applicationId="+this.utilsService.getAppID().id;
    this.myHttp.getAdminRequest(URL).subscribe(
         dataRes =>{
          if (dataRes.status == 'success'){        
            this.ActiveAppCount = dataRes.result;
          }else{
           this.utilsService.errorToasterBackend(dataRes.result.message);      
          }
       },error => {
          this.utilsService.handleError(error, 'admin');     
      });
}


  graphData(duration){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10){ this.dd='0'+dd; }else{this.dd = dd;} 
    if(mm<10){ this.mm='0'+mm; }else{this.mm = mm;} 
    this.today = yyyy+'-'+this.mm+'-'+this.dd;
    this.todayDate = this.today;

    if (duration == 'day') {
      this.graphDuration ='7 days';
      this.year = undefined;
      today.setDate(dd - 7);
    }
    if (duration == 'month') {
      this.graphDuration ='30 days';
      this.year = undefined;
      today.setDate(dd - 30);
    }
      var newDate = today;
      var newdd = newDate.getDate();
      var newmm = newDate.getMonth()+1; 
      var newyyyy = today.getFullYear();

         if(newdd<10 && newmm<10){ 
             this.newdd='0'+newdd;
             this.newmm='0'+newmm;
            this.priorDate =  newyyyy+'-'+this.newmm+'-'+this.newdd;
         }else if(newdd<10){ 
             this.newdd='0'+newdd;
            this.priorDate =  newyyyy+'-'+newmm+'-'+this.newdd;
         }else if(newmm<10){ 
             this.newmm='0'+newmm;
            this.priorDate =  newyyyy+'-'+this.newmm+'-'+newdd;
         }else{
             this.priorDate =  newyyyy+'-'+newmm+'-'+newdd;
         }  
        this.installLineGraph();
        this.unInstallLineGraph();
        this.downloadLineGraph();
        this.avgRatingLineGraph();

    if (duration == 'year') {
      this.graphDuration ='1 year';
      var now = new Date();
      var currentYear = now.getFullYear();
      this.year = currentYear;
      this.installLineGraph();
      this.unInstallLineGraph();
      this.downloadLineGraph();
      this.avgRatingLineGraph();
    }
  }

  body:any={};
   installLineGraph() {
     if(this.year != undefined){
       this.body = {"applicationId": +this.utilsService.getAppID().id, "year":this.year, "status": "install"}
     }else{
      this.body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate, "status": "install"}
     }
    //this.body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate, "status": "install"}
    let dataURL = AppConfig.Graph;
    this.myHttp.adminPostRequestService(dataURL,this.body).subscribe(
       res =>{
        if (res.status == 'success'){
           this.label = [];
            this.data1 = [];
          for (var i = 0; i < res.result.length; i++) {
            this.label.push(res.result[i].label);
            this.data1.push(res.result[i].count);           
          }
          this.sumCount1 = this.data1.reduce(this.getSum);
            this.lineChartData = [
               {"data": this.data1, "label": 'Installs'}
             ];
            this.lineChartLabels = this.label;
        }else{     
           this.utilsService.errorToasterBackend(res.result.message);
        }
     },error => {
        this.utilsService.handleError(error, 'admin');     
    });
  }

  unInstallLineGraph() {
     if(this.year != undefined){
       this.body = {"applicationId": +this.utilsService.getAppID().id, "year":this.year, "status": "uninstall"}
     }else{
      this.body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate, "status": "uninstall"}
     }
    //this.body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate, "status": "uninstall"}
    let dataURL = AppConfig.Graph;
    this.myHttp.adminPostRequestService(dataURL,this.body).subscribe(
       res =>{
        if (res.status == 'success'){
           this.label = [];
            this.data1 = [];
          for (var i = 0; i < res.result.length; i++) {
            this.label.push(res.result[i].label);
            this.data1.push(res.result[i].count);           
          }
          this.sumCount2 = this.data1.reduce(this.getSum);
            this.uninstalllineChartData = [
               {"data": this.data1, "label": 'Uninstalls'}
             ];
            this.uninstalllineChartLabels = this.label;
        }else{     
           this.utilsService.errorToasterBackend(res.result.message);
        }
     },error => {
        this.utilsService.handleError(error, 'admin');     
    });
  }

  downloadLineGraph() {
     if(this.year != undefined){
       this.body = {"applicationId": +this.utilsService.getAppID().id, "year":this.year, "status": "download"}
     }else{
      this.body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate, "status": "download"}
     }
    //this.body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate, "status": "download"}
    let dataURL = AppConfig.Graph;
    this.myHttp.adminPostRequestService(dataURL,this.body).subscribe(
       res =>{
        if (res.status == 'success'){
           this.label = [];
            this.data1 = [];
          for (var i = 0; i < res.result.length; i++) {
            this.label.push(res.result[i].label);
            this.data1.push(res.result[i].count);           
          }
          this.sumCount3 = this.data1.reduce(this.getSum);
            this.downloadlineChartData = [
               {"data": this.data1, "label": 'Downloads'}
             ];
            this.downloadlineChartLabels = this.label;
        }else{     
           this.utilsService.errorToasterBackend(res.result.message);
        }
     },error => {
        this.utilsService.handleError(error, 'admin');     
    });
  }

  avgRatingLineGraph() {
     if(this.year != undefined){
       this.body = {"applicationId": +this.utilsService.getAppID().id, "year":this.year}
     }else{
      this.body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate}
     }
    //this.body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate}
    let dataURL = AppConfig.AVERAGE_RATING_GRAPH;
    this.myHttp.adminPostRequestService(dataURL,this.body).subscribe(
       res =>{
        if (res.status == 'success'){
           this.label = [];
            this.data1 = [];
          for (var i = 0; i < res.result.length; i++) {
            this.label.push(res.result[i].label);
            this.data1.push(res.result[i].average);           
          }
          this.sumCount4 = this.data1.reduce(this.getSum);
            this.avgRatinglineChartData = [
               {"data": this.data1, "label": 'Agerage Rating'}
             ];
            this.avgRatinglineChartLabels = this.label;
        }else{     
           this.utilsService.errorToasterBackend(res.result.message);
        }
     },error => {
        this.utilsService.handleError(error, 'admin');     
    });
  }

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  getSum(total, num) {
    return total + num;
  }


}
