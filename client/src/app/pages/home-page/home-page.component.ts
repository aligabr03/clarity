import { Component } from '@angular/core';
import { BasicButtonComponent } from '../../components/basic-button/basic-button.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  imports: [BasicButtonComponent, NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
