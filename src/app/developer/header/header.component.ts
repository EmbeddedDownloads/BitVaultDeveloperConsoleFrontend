import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/shared/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[]
})
export class HeaderComponent implements OnInit {

  avatarName:string;
  avatar:string;
  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    if(this.utilsService.validateUser()) {
      this.utilsService.validateUser();
      var userDetails = this.utilsService.getUserName();
      this.avatarName = userDetails.name;
      this.avatar = userDetails.avatar;
    }
  }

  logout() {
  	this.utilsService.logout();
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
