import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { httpService } from 'app/shared/http.service';
import { UtilsService } from 'app/shared/utils.service';
import { AppConfig } from 'app/app.config';

@Component({
  selector: 'app-average-rating-line-chart',
  templateUrl: './average-rating-line-chart.component.html',
  styleUrls: ['./average-rating-line-chart.component.css']
})
export class AverageRatingLineChartComponent implements OnInit {

  label:any=[];
  lineChartLabels:any=[];
  data:any=[];
  today:string;
  todayDate:string;
  priorDate:string;
  dd:any;
  mm:any;
  newdd:any;
  newmm:any;
  sumCount4:number;

  constructor(private myHttp:httpService, private router: Router, private route: ActivatedRoute, private utilsService: UtilsService) { }

  ngOnInit() {
    this.graphData();
  }

  graphData(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

      if(dd<10){ this.dd='0'+dd; }else{this.dd = dd;} 
        if(mm<10){ this.mm='0'+mm; }else{this.mm = mm;} 
        this.today = yyyy+'-'+this.mm+'-'+this.dd;
        this.todayDate = this.today;

      today.setDate(dd - 30);

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
  }

  installLineGraph(): void {
    let body:any;
    body = {"applicationId": +this.utilsService.getAppID().id, "startDate":this.priorDate, "endDate":this.todayDate}

    let dataURL = AppConfig.AVERAGE_RATING_GRAPH;
    this.myHttp.adminPostRequestService(dataURL,body).subscribe(
       data =>{
        if (data.status == 'success'){
          for (var i = 0; i < data.result.length; i++) {
            this.label.push(data.result[i].label);
            this.data.push(data.result[i].average);
          }
          this.sumCount4 = this.data.reduce(this.getSum);
          this.lineChartLabels = this.label;
        }else{     
           this.utilsService.errorToasterBackend(data.result.message);
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
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
  public lineChartData:Array<any> = [
    {data: this.data, label: 'Average Rating'}
  ];
  public lineChartOptions:any = {
    responsive: true
  };
  getSum(total, num) {
    return total + num;
  }

}
