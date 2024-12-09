import { Component } from '@angular/core';
import  axios  from 'axios';
@Component({
  selector: 'app-login-register-component',
  standalone: false,
  
  templateUrl: './login-register-component.component.html',
  styleUrl: './login-register-component.component.css'
})
export class LoginRegisterComponentComponent {
  isRegisterMode: boolean = false; // Default to login mode
  firstName:string='';
  lastName:string='';
  email:string='';
  password:string='';
  confirmPassword:string='';
  loginEmail:string='';
  loginPassword:string='';
  errorMessage:string='';
  successMessage:string='';
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  // Called when the toggle changes
  onToggleChange(): void {
    if (this.isRegisterMode) {
      console.log('Register mode');
    } else {
      console.log('Login mode');
    }
  }
  clearMessageAfterTimeout(type: 'error' | 'success'): void {
    setTimeout(() => {
      if (type === 'error') {
        this.errorMessage = '';
      } else if (type === 'success') {
        this.successMessage = '';
      }
    }, 3000); // Clear message after 3 seconds
  }
  handleRegister():void{
if (this.isRegisterMode){
if(!this.firstName||!this.lastName||!this.email||!this.password||!this.confirmPassword){
this.errorMessage="all fields are required please fill all felids!";
return;
}
else if(this.password!==this.confirmPassword){
  this.errorMessage="please confirm password correctly!";
  return;
}
else if(!this.regex.test(this.password)){
  this.errorMessage = `
  Password must have:
  <br/> - At least one uppercase letter
  <br/> - At least one lowercase letter
  <br/> - At least one special character
  <br/> - At least 8 characters
`;
return;
}

const registerData = {
  firstname: this.firstName,
  lastname: this.lastName,
  email: this.email,
  password: this.password
};

axios.post('http://localhost:3500/register', registerData)
.then(response => {
  this.successMessage="Registration successfully done"
  this.resetForm();
  this.clearMessageAfterTimeout('success')

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
    this.clearMessageAfterTimeout('error')
  } else {
    // No response from server
    this.errorMessage = "Failed to connect to the server. Please check your internet connection!";
    this.clearMessageAfterTimeout('error')

  }
});
}else{
console.log("stop hack me i can see you")
}

  }
  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.loginEmail = '';
    this.loginPassword = '';
    this.errorMessage = ''; // Reset error message
  }
  handleLogin():void{
  if(!this.isRegisterMode){
    if(!this.loginEmail||!this.loginPassword){
      this.errorMessage="all fields are required please fill all felids!";
      return;
      }
      const loginData={
        email:this.loginEmail,
        password:this.loginPassword
      }
      axios.post('http://localhost:3500/login', loginData)
.then(response => {
  this.successMessage="login successfully done"
  this.resetForm();
  this.clearMessageAfterTimeout('success')

})
.catch(error => {
  if (error.response) {
    // Server responded with an error
    switch (error.response.status) {
      case 400:
        this.errorMessage = "All fields are required. Please fill in all fields!";
        break;
      case 401:
        this.errorMessage = "email or password are wrong";
        break;
      case 500:
        this.errorMessage = "something goes wrong please try again later";
        break;
      default:
        this.errorMessage = "An unknown error occurred. Please try again!";
        break;
    }
    this.clearMessageAfterTimeout('error')
  
  }})
  }
  }
  
}



