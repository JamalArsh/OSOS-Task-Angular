import { Component } from '@angular/core';
import { GetEndDatePageComponent } from './components/get-end-date-page/get-end-date-page.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [GetEndDatePageComponent],
})
export class AppComponent {}
