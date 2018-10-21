import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UtilsService } from 'app/shared/utils.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
   public id: any;
  constructor(private route: ActivatedRoute, private utilsService:UtilsService) { }

  ngOnInit() {
    if(this.utilsService.validateUser())
    {
    	this.route.queryParams.subscribe(params => {
      	this.id = params["id"];
      });
    }
  }

}
