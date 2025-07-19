import { Component, inject } from '@angular/core';
import { LinkComponent } from "../link/link.component";
import { FormsModule } from '@angular/forms';
import { SignupRequest } from '../../models/user.model';
import { UserApiService } from '../../services/api/user-api.service';
import { AuthStateService } from '../../services/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [LinkComponent, FormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  private userApiService = inject(UserApiService);
  private router = inject(Router);
  private authStateService = inject(AuthStateService);

  fname: string = '';
  lname: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  dob: Date = new Date();

  passwordsMatch: boolean = true;

  fnameEmpty: boolean = false;
  lnameEmpty: boolean = false;
  usernameEmpty: boolean = false;
  passwordEmpty: boolean = false;
  passwordValid: boolean = true;
  confirmPasswordEmpty: boolean = false;
  dobInvalid: boolean = false;

  ngOnInit() {
    if (this.authStateService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  showPassword() {
    var passwordField = document.getElementById('pass') as HTMLInputElement;
    if (passwordField && passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
    // TODO dont just swap the type
  }

  submitForm() {
    var today = new Date();
    var birthDate = new Date(this.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.dobInvalid = age < 18 || age > 100;

    this.passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(this.password);

    this.fnameEmpty = this.fname === '';
    this.lnameEmpty = this.lname === '';
    this.usernameEmpty = this.username === '';
    this.passwordEmpty = this.password === '';
    this.confirmPasswordEmpty = this.confirmPassword === '';
    this.passwordsMatch = this.password === this.confirmPassword;

    if (!this.fnameEmpty && !this.lnameEmpty && !this.usernameEmpty && !this.passwordEmpty &&
      !this.confirmPasswordEmpty && this.passwordsMatch && this.passwordValid && !this.dobInvalid) {
      const userData: SignupRequest = {
        fname: this.fname,
        lname: this.lname,
        username: this.username,
        password: this.password,
        dob: this.dob
      };
      this.userApiService.signup(userData).subscribe(
        response => {
          console.log('User signed up successfully:', response);
          // TODO Handle successful signup (e.g., redirect to login page)
        },
        error => {
          console.error('Error signing up user:', error);
          alert(error.error.message);
          // TODO Handle error (e.g., show error message to user)
        }
      );
    }
    
  }
}
