import { Component } from '@angular/core';
import  axios  from 'axios';
import { AuthService } from '../auth-service.service'; 
import { CreateListService } from '../create-list.service';

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
constructor(private authService: AuthService,private createListServ:CreateListService) {} 
resetForm(){
  this.step=0;
  this.listName='';
  this.listCatogry='';
  this.errorMessage='';
this.items = [
  { name: '', description: '', price: 0 ,photo:''},
]; 
}
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
async submit():Promise<void>{
  const registerData = {
    listname: this.listName,
    category: this.listCatogry,
    owner: this.authService.getCurrentUser().id,
    items: this.items
  };

  try {
    await this.createListServ.createAList(registerData)
    this.resetForm()
  } catch (error: any) {
    this.errorMessage = error.message;
  }
}
}
