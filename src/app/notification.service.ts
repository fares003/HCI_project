import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'; // Import 'map' from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3500'; // Your API URL

  constructor() {}

  // Fetch notifications for the current user
  getNotifications(id: string): Observable<any> {
    return from(axios.get(`${this.apiUrl}/notification/${id}`)).pipe(
      // Access the 'data' property from the Axios response
      map((response) => response.data) // Map the response to get the 'data' property
    );
  }

  // Mark a notification as read
  markAsRead(notificationId: string): Observable<any> {
    return from(axios.put(`${this.apiUrl}/notification/${notificationId}`, { isRead: true }));
  }
}
