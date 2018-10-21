import { Component, OnInit } from '@angular/core';
import { httpService } from 'app/shared/http.service';
import { AppConfig } from 'app/app.config';
import { UtilsService } from 'app/shared/utils.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-menudashboard',
  templateUrl: './menudashboard.component.html',
  styleUrls: ['./menudashboard.component.css']
})
export class MenudashboardComponent implements OnInit {
	avatarName:string;
	avatar:string;
	loginType:string;

	constructor(private httpservice:httpService, private utilsService: UtilsService) { }

	ngOnInit() {
		if(this.utilsService.validateUser()){
			this.avatarName = this.utilsService.getUserName().name;
			this.avatar = this.utilsService.getUserName().avatar;
			this.loginType = this.utilsService.getUserName().loginType;
		}
	}

	downloadBvkfile()
	{
		this.httpservice.getUserRequest(AppConfig.DOWNLOAD_BVK_KEY_FILE)
		.subscribe(data => {
			if(data.status="success")
				this.downloadFile(data.result);
			else
	          this.utilsService.readErrorMsg(data.result);
		}, error => {
			this.utilsService.handleError(error, 'developer');     
	    });
	}
	
	downloadFile(data: any){	
		var blob = new Blob([data], {type: 'text/plain'});
		let x_filename = 'key.bitvault';
	    saveAs(blob, x_filename);
	}
}