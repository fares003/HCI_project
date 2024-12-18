import { Component,OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  lists:any=[]
  reviews:any=[]


constructor(private profileServ:ProfileService,private authServ:AuthService,private router: Router){}

ngOnInit(): void {
this.getAllLits()
this.getAllFeedback()
}

async getAllLits():Promise<void>{
  try {
    this.lists = await this.profileServ.getList(this.authServ.getCurrentUser().id);
    
  } catch (error:any) {
    console.error('Error fetching product:', error.message);
    
  }
}
toCreateList():void{
  this.router.navigate(['/create-list'])
  
}
async getAllFeedback():Promise<void>{
  try {
    this.reviews = await this.profileServ.getFeedback(this.authServ.getCurrentUser().id);
    
  } catch (error:any) {
    console.error('Error fetching product:', error.message);
    
  }
}
async deleteList(id:string):Promise<void>{
await this.profileServ.deleteList(id)
window.location.reload()
}
}
