import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3500';

  constructor() {}

  async getNotifications(id: string): Promise<any> {
    const response=await axios.get(`${this.apiUrl}/notification/${id}`);
    return response.data
  }

  async markAsRead(notificationId: string): Promise<any> {
    const response=await axios.put(`${this.apiUrl}/notification/${notificationId}`, { isRead: true });
    return response.data

  }
}
