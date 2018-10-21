import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  @Input() profileImage: string;
  @Input() profileName: string;
  avatarName:string;
  avatar:string;
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  	if(this.utilsService.validateAdmin()){
      var adminDetails = this.utilsService.getAdminName();
      this.avatarName = adminDetails.name;
      this.avatar = adminDetails.avatar;
    }
  }
  logoutAdmin(){
    this.utilsService.logoutAdmin();  
  }
  toggle() {
    var x = document.getElementById('toggle_menu');
    if (x.style.display == '') {
        x.style.display = 'block';
    } else if (x.style.display == 'none') {
      x.style.display = 'block';
    }else if (x.style.display == 'block') {
      x.style.display = 'none';
    }
  }

}
