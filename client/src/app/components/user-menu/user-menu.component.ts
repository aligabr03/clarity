import { Component } from '@angular/core';
import { AuthStateService } from '../../services/auth-state.service';
import { inject } from '@angular/core';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-user-menu',
  imports: [LinkComponent],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  private authStateService = inject(AuthStateService);
  logout() {
    this.authStateService.logout();
  }
}
