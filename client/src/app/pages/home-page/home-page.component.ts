import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-home-page',
    imports: [ButtonModule, Card],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
