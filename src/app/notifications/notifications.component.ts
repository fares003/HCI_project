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

   loadNotifications() {
     this.notificationService.getNotifications(this.auth.getCurrentUser().id).subscribe((data: any) => {
      this.notifications = data.notifications;
    });
  }

  startPolling() {
    setInterval(() => {
      this.loadNotifications();
    }, 5000); // Check for new notifications every 5 seconds
  }

  markAsRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      this.loadNotifications(); // Reload notifications after marking one as read
    });
  }
}
