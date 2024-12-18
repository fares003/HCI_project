import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  notification:boolean=false;
  notifications:any=[]
constructor(private authServ:AuthService,private router: Router,private notifi:NotificationService){}
ngOnInit() {
  this.loadNotifications();
}
logOut():void{
  this.authServ.logout()
  window.location.reload()
}
checkNotification(){

}
async loadNotifications() {
  this.notifications=await  this.notifi.getNotifications(this.authServ.getCurrentUser().id)
  if(this.notifications.notifications.length>0){
    this.notification=true
  }
}


}
