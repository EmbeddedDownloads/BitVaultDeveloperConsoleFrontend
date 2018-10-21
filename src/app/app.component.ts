import { Component } from '@angular/core';
import { LoaderService } from 'app/shared/loader.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	showLoader: boolean;
  public toasterconfig : ToasterConfig = new ToasterConfig({timeout: {success:1000}})

	constructor(
    private router: Router,
    private loaderService: LoaderService
   ) { }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
    });
  }
}
