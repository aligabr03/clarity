import { Component } from '@angular/core';
import { LinkComponent } from '../link/link.component';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { LucideAngularModule, UserIcon } from 'lucide-angular';
import { AuthStateService } from '../../services/auth-state.service';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { CtaButtonComponent } from '../cta-button/cta-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CtaButtonComponent, LinkComponent, RouterLink, RouterLinkActive, LucideAngularModule, OverlayModule, UserMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authStateService = inject(AuthStateService);

  readonly UserIcon = UserIcon;

  menuOpen: boolean = false;

  isLoggedIn: boolean = this.authStateService.isLoggedIn();
  user: any = this.authStateService.getUser();
  fname: string = this.user ? this.user.fname : 'Unknown';

  constructor() {
    this.authStateService.loginState$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.user = this.authStateService.getUser();
        this.fname = this.user ? this.user.fname : 'Unknown';
      } else {
        this.isLoggedIn = false;
        this.user = null;
        this.fname = 'Unknown';
        this.menuOpen = false; 
      }
    });
  }
}
