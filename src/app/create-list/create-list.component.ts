import { Component } from '@angular/core';
import  axios  from 'axios';
import { AuthService } from '../auth-service.service'; 

@Component({
  selector: 'app-create-list',
  standalone: false,
  
  templateUrl: './create-list.component.html',
  styleUrl: './create-list.component.css'
})
export class CreateListComponent {
step:number=0;
listName:string='';
listCatogry:string='';
errorMessage:string='';
items: { name: string; description: string; price: number,photo:string }[] = [
  { name: '', description: '', price: 0 ,photo:''},
]; 
constructor(private authService: AuthService) {} 

toNextStep():void{
  if (this.step<2) {
  this.step+=1
  }
}
toPreviousStep():void{
  if (this.step>0) {

  this.step-=1

  }
}
addItem() {
  this.items.push({ name: '', description: '', price: 0 ,photo:''});
}

removeItem(index: number) {
  this.items.splice(index, 1);
}
clearMessageAfterTimeout(): void {
  setTimeout(() => {
    
      this.errorMessage = '';
   
  }, 3000); // Clear message after 3 seconds
}
validateListInfo():void{
if(this.listName&&this.listCatogry){
  this.toNextStep()
}
else{
  this.errorMessage='please fill all fields'
  this.clearMessageAfterTimeout()
}
}
validateItems() {
  if (this.items.some((item) => !item.name || !item.description || item.price <= 0)) {
    this.errorMessage = 'Please fill in all item fields correctly!';
    this.clearMessageAfterTimeout()
  } else {
    this.errorMessage = '';
    this.step = 2;

   
    
  }
}
submit():void{
  const registerData = {
    listname: this.listName,
    category: this.listCatogry,
    owner: this.authService.getCurrentUser().id,
    items: this.items
  };
  axios.post('http://localhost:3500/lists', registerData)
.then(response => {
console.log(response)
})
.catch(error => {
  if (error.response) {
    // Server responded with an error
    switch (error.response.status) {
      case 400:
        this.errorMessage = "All fields are required. Please fill in all fields!";
        break;
      case 409:
        this.errorMessage = "The email is already registered. Please use a different email!";
        break;
      case 500:
        this.errorMessage = "something goes wrong please try again later";
        break;
      default:
        this.errorMessage = "An unknown error occurred. Please try again!";
        break;
    }
    this.clearMessageAfterTimeout()
  } else {
    // No response from server
    this.errorMessage = "Failed to connect to the server. Please check your internet connection!";
    this.clearMessageAfterTimeout()

  }
})
}
}
