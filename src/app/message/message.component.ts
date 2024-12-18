import { Component } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-message',
  standalone: false,
  
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  userId = ''; // Replace with actual user ID
  messages:any = [];
  messageText = '';
  reciverId: any;

  constructor(private chatService: MessagesService,private router: Router,private route: ActivatedRoute,private auth:AuthService) {}

  ngOnInit() {
    this.reciverId = this.route.snapshot.paramMap.get('id');
    this.setUsersId()

    this.loadMessages();
  }
setUsersId():void{
  this.userId=this.auth.getCurrentUser().id
}
  loadMessages() {
    this.chatService.getMessages(this.userId,this.reciverId)
      .then((data: any) => {
        this.messages = data.messages;
      })
      .catch(error => {
        console.error('Error loading messages:', error);
      });
  }
  isSentMessage(message: any): boolean {
    return message.sender._id === this.userId;
  }
  sendMessage() {
    if (this.messageText.trim()) {
      const receiverId = this.reciverId; // Replace with the actual receiver ID
      this.chatService.sendMessage(this.userId, receiverId, this.messageText)
        .then(() => {
          this.messageText = ''; // Clear the input
          this.loadMessages(); // Reload messages after sending
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  }
}
