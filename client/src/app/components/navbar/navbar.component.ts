import { Component } from '@angular/core';
import { LinkComponent } from '../link/link.component';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { LucideAngularModule, UserIcon } from 'lucide-angular';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { CtaButtonComponent } from '../cta-button/cta-button.component';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CtaButtonComponent,
    LinkComponent,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    OverlayModule,
    UserMenuComponent,
    AsyncPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly UserIcon = UserIcon;
  private authStateService = inject(AuthStateService);

  menuOpen: boolean = false;

  isLoggedIn$ = this.authStateService.loginState$;
  user$ = this.authStateService.user$;

  fname$ = this.user$.pipe(map((user: User | null) => user?.fname || 'Unknown'));

  constructor() {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.menuOpen = false;
      }
    });
  }
}
