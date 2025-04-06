import { Component } from '@angular/core';
import { AuthStateService } from '../../services/auth-state.service';
import { inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
  private authStateService = inject(AuthStateService);

  logout() {
    this.authStateService.logout();
  }
}
