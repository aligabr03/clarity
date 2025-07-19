import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LinkComponent } from '../link/link.component';
import { AuthApiService } from '../../services/api/auth-api.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, LinkComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private authApiService = inject(AuthApiService);
  private router = inject(Router);

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
    this.authApiService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
