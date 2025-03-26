import { Component } from '@angular/core';
import { LinkComponent } from "../link/link.component";

@Component({
  selector: 'app-signup-form',
  imports: [LinkComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  showPassword() {
    var passwordField = document.getElementById('pass') as HTMLInputElement;
    if (passwordField && passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }
}
