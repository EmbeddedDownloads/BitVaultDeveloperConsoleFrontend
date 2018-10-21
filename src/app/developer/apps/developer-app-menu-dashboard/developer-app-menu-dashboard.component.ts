import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';

@Component({
  selector: 'app-developer-app-menu-dashboard',
  templateUrl: './developer-app-menu-dashboard.component.html',
  styleUrls: ['./developer-app-menu-dashboard.component.css']
})
export class DeveloperAppMenuDashboardComponent implements OnInit {

  avatarName:string;
	avatar:string;
	constructor(private utilsService: UtilsService) { }

	ngOnInit() {
		if(this.utilsService.validateUser()){
			this.avatarName = this.utilsService.getUserName().name;
			this.avatar = this.utilsService.getUserName().avatar;
		}
	}

}
