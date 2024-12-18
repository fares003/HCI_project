import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AuthService } from '../auth-service.service';
@Component({
  selector: 'app-notifications',
  standalone: false,
  
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications:any = [];

  constructor(private notificationService: NotificationService,private auth:AuthService) {}

  ngOnInit() {
    this.loadNotifications();
    this.startPolling();
  }

   async loadNotifications() {
    this.notifications=await  this.notificationService.getNotifications(this.auth.getCurrentUser().id)
  }

  startPolling() {
    setInterval(() => {
      this.loadNotifications();
    }, 5000); 
  }

  markAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId)
  }
}
