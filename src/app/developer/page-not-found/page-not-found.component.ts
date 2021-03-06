import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private utilsService:UtilsService) { }

  ngOnInit() {
  }

  backClicked() {
    this.utilsService.backClicked();
  }

}
