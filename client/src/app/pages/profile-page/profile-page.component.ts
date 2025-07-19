import { Component } from '@angular/core';
import { AuthStateService } from '../../services/auth-state.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  private authStateService = inject(AuthStateService);
  private router = inject(Router);

  protected user: User | null = null;

  ngOnInit() {
    if (!this.authStateService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.user = this.authStateService.getUser();
    
  }
}
