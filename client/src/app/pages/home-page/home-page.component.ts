import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CtaButtonComponent } from '../../components/cta-button/cta-button.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RouterLinkActive, CtaButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
