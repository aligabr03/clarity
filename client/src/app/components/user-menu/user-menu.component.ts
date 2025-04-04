import { Component } from '@angular/core';
import { AuthStateService } from '../../services/auth-state.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  imports: [],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  private authStateService = inject(AuthStateService);
  logout() {
    this.authStateService.logout();
  }
}
