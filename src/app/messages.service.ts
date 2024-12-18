import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiBaseUrl: string = 'http://localhost:3500';

  constructor() { }
  async getMessages(userId: string,targetUserId:string) {
    return await axios.get(`${this.apiBaseUrl}/chat/${userId}/${targetUserId}`)
      .then(response => response.data)  // Return the data from the response
      .catch(error => {
        console.error('Error fetching messages', error);
        throw error;
      });
  }

  // Send a message
  async sendMessage(senderId: string, receiverId: string, message: string | null ) {
    return await axios.post(`${this.apiBaseUrl}/chat`, {
      senderId,
      receiverId,
      message,
    })
    .then(response => response.data)  // Return the data from the response
    .catch(error => {
      console.error('Error sending message', error);
      throw error;
    });
  }
}
