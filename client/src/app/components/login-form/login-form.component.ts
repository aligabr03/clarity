import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LinkComponent } from "../link/link.component";
import { AuthApiService } from '../../services/api/auth-api.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, LinkComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private authApiService = inject(AuthApiService);

  username: string = '';
  password: string = '';
  usernameEmpty: boolean = false;
  passwordEmpty: boolean = false;

  showPassword() {
    var passwordField = document.getElementById('pass') as HTMLInputElement;
    if (passwordField && passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }

  submitForm() {
    this.authApiService.login({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log('Login successful', response);
        // Handle successful login, e.g., redirect to a different page
      },
      error => {
        console.error('Login failed', error);
        // Handle login failure, e.g., show an error message
      }
    );
  }
}
