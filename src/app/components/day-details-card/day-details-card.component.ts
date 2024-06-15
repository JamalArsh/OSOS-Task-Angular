import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-day-details-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-details-card.component.html',
  styleUrl: './day-details-card.component.scss',
})
export class DayDetailsCardComponent {
  @Input({ required: true }) date: any;
  @Input({ required: true }) dayOfWeek!: string;
  @Input({ required: true }) isHoliday!: boolean;
}
