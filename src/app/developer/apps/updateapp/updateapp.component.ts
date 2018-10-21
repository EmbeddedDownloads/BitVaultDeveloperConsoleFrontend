import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-updateapp',
  templateUrl: './updateapp.component.html',
  styleUrls: ['./updateapp.component.css']
})
export class UpdateappComponent implements OnInit {

  public id: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["id"];	    
	    console.log(this.id);
	});
  }

}
