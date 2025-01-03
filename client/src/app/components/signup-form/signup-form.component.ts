import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  showPassword() {
    var x = document.getElementById('pass') as HTMLInputElement;
    if (x && x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
}
