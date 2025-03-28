import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './base-app.component.html',
  styleUrl: './base-app.component.css',
})
export class BaseAppComponent {}
