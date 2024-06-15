import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DateDataService } from './services/date-data.service';
import { Observable } from 'rxjs';
import { DateResponseDto } from './dtos/date-response-dto';
import { DateRequestDto } from './dtos/date-request-dto';
import { CommonModule } from '@angular/common';
import { DayDetailsCardComponent } from './components/day-details-card/day-details-card.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    NzFormModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzGridModule,
    NzButtonModule,
    ReactiveFormsModule,
    CommonModule,
    DayDetailsCardComponent,
    NzSpinModule,
    NzNotificationModule,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  dateForm!: FormGroup;
  endResponse: DateResponseDto | null | undefined;

  constructor(
    private fb: FormBuilder,
    private dateDataService: DateDataService,
    private notification: NzNotificationService
  ) {}
  ngOnDestroy(): void {
    // this.dateDataService.getEndDate().unsubscribe();
  }

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      date: [null, [Validators.required]],
      days: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.dateForm.valid) {
      console.log(this.dateForm.value);
      this.getEndDate(this.dateForm.value.date, this.dateForm.value.days);
    } else {
      Object.values(this.dateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getEndDate(startDate: Date, workingDays: number): void {
    const d = new Date(startDate);
    d.setHours(0, 0, 0, 0);

    const timeZoneOffset = d.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(d.getTime() - timeZoneOffset);

    const finalDate =
      adjustedDate.toISOString().split('T')[0] + 'T00:00:00.000Z';

    const dateRequest: DateRequestDto = {
      startDate: finalDate,
      workingDays,
    };
    this.dateDataService.getEndDate(dateRequest).subscribe({
      next: (res) => {
        console.log(res);
        this.endResponse = res;
      },
      error: (err) => {
        console.log(err);
        this.notification.error(
          'Error',
          'Error while getting response from server'
        );
      },
    });
  }
}
