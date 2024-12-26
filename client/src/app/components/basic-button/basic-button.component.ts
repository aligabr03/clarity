import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-basic-button',
  imports: [NgClass],
  templateUrl: './basic-button.component.html',
  styleUrl: './basic-button.component.css',
})
export class BasicButtonComponent {
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() isDisabled: boolean = false;
  @Input() variant: 'standard' | 'confirm' | 'danger' = 'standard';
  @Input() isLoading: boolean = false;
}
