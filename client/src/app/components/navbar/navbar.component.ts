import { Component } from '@angular/core';
import { LinkComponent } from '../link/link.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [LinkComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
