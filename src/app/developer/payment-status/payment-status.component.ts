import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {

  status:any;
  transactionId:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.transactionId = this.route.snapshot.params['id'];
  	this.status = this.route.snapshot.params['status'];  	
    console.log(this.transactionId + ' : '+this.status);
  }

}
