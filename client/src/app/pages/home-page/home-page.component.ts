import { Component } from '@angular/core';
import { BasicButtonComponent } from '../../components/basic-button/basic-button.component';

@Component({
    selector: 'app-home-page',
    imports: [BasicButtonComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
