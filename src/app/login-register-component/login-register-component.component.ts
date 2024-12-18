import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register-component',
  standalone: false,
  
  templateUrl: './login-register-component.component.html',
  styleUrl: './login-register-component.component.css'
})
export class LoginRegisterComponentComponent {
  isRegisterMode: boolean = false; 
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

  constructor(private authService: AuthService,private router: Router) {} 
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

this.authService
.registerUser(registerData)
.then(() => {
  this.successMessage = 'Registration successfully done';
  this.resetForm();
  this.clearMessageAfterTimeout('success');
  this.router.navigate(['home'])
})
.catch((error) => {
  this.errorMessage = error.message;
  this.clearMessageAfterTimeout('error');
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
      this.authService
        .loginUser(loginData)
        .then(() => {
          this.successMessage = 'Login successfully done';
          this.resetForm();
          this.clearMessageAfterTimeout('success');
          this.router.navigate(['home'])

        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.clearMessageAfterTimeout('error');
        });
  }
  }
  
}



