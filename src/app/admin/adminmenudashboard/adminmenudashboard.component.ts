import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';

@Component({
  selector: 'app-adminmenudashboard',
  templateUrl: './adminmenudashboard.component.html',
  styleUrls: ['./adminmenudashboard.component.css']
})
export class AdminmenudashboardComponent implements OnInit {
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