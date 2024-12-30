import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './base-app.component.html',
  styleUrl: './base-app.component.css',
})
export class BaseAppComponent {}
