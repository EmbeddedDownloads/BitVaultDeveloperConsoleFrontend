import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';

@Component({
  selector: 'app-apps-menu-dashboard',
  templateUrl: './apps-menu-dashboard.component.html',
  styleUrls: ['./apps-menu-dashboard.component.css']
})
export class AppsMenuDashboardComponent implements OnInit {

  	@Input() profileImage: string;
	@Input() profileName: string;

 	avatarName:string;
	avatar:string;
	constructor(private utilsService: UtilsService) {}

	ngOnInit() {
		if(this.utilsService.validateAdmin()){	
			this.avatarName = this.utilsService.getAdminName().name;
			this.avatar = this.utilsService.getAdminName().avatar;
		}
	}

}
